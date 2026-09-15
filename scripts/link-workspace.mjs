import { lstat, mkdir, readFile, readlink, realpath, rename, symlink } from "node:fs/promises";
import { dirname, isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Development aliases only. Every target is inspected before the first write.
// A shared Protocol checkout is explicit; no sibling checkout is manufactured.
const dependencies = {
  "dsh-obsidian-bridge-lifecycle": ["dsh-annotation-core", "dsh-obsidian-bridge-protocol"],
  "dsh-obsidian-reference-adapter": ["dsh-annotation-core", "dsh-obsidian-bridge-protocol", "dsh-obsidian-bridge-lifecycle"],
  "dsh-session-sticker-board": ["dsh-annotation-core", "dsh-obsidian-bridge-protocol", "dsh-obsidian-bridge-lifecycle"],
  "obsidian-deepharness-bridge": ["dsh-annotation-core", "dsh-obsidian-bridge-protocol"],
  "dsh-obsidian-session-reference-suite": ["dsh-annotation-core", "dsh-obsidian-bridge-protocol", "dsh-obsidian-bridge-lifecycle", "dsh-obsidian-reference-adapter", "dsh-session-sticker-board"],
};
const exists = async (path) => lstat(path).catch((error) => { if (error.code === "ENOENT") return null; throw error; });
const samePath = (left, right) => process.platform === "win32" ? resolve(left).toLowerCase() === resolve(right).toLowerCase() : resolve(left) === resolve(right);
const readManifest = async (root) => JSON.parse(await readFile(join(root, "package.json"), "utf8"));

export async function linkWorkspace({ suiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), ".."), protocolRoot, dryRun = false, dshOnly = false } = {}) {
  suiteRoot = resolve(suiteRoot);
  const workspace = dirname(suiteRoot);
  if (!samePath(await realpath(workspace), workspace)) throw new Error("Suite workspace may not be redirected");
  const members = JSON.parse(await readFile(join(suiteRoot, "suite.members.json"), "utf8"));
  const versions = new Map(members.members.map((member) => [member.name, member.version]));
  const contained = (path) => {
    const suffix = relative(workspace, path);
    if (!suffix || suffix.startsWith("..") || isAbsolute(suffix) || !samePath(resolve(workspace, suffix), path)) throw new Error(`Path is outside the suite workspace: ${path}`);
    return path;
  };
  const assertLocalParents = async (path) => {
    for (let parent = dirname(path); !samePath(parent, workspace); parent = dirname(parent)) {
      contained(parent);
      if (await exists(parent)) {
        if (!samePath(await realpath(parent), parent)) throw new Error(`Refusing redirected dependency parent: ${parent}`);
      }
    }
  };
  const providersByName = new Map();
  for (const provider of new Set(Object.values(dependencies).flat())) {
    const target = provider === "dsh-obsidian-bridge-protocol" && protocolRoot ? resolve(protocolRoot) : contained(join(workspace, provider));
    const actual = await realpath(target), manifest = await readManifest(actual);
    if (manifest.name !== provider || manifest.version !== versions.get(provider)) throw new Error(`Unexpected provider name/version at ${target}; expected ${provider}@${versions.get(provider)}`);
    if (!(provider === "dsh-obsidian-bridge-protocol" && protocolRoot) && !samePath(actual, target)) throw new Error(`Unexpected redirected provider: ${target}; external Protocol requires --protocol-root`);
    providersByName.set(provider, { path: actual, version: manifest.version });
  }
  const plans = [], inspected = [];
  for (const [consumer, providers] of Object.entries(dependencies)) {
    if (dshOnly && consumer === "obsidian-deepharness-bridge") continue;
    const consumerRoot = contained(join(workspace, consumer)), manifest = await readManifest(consumerRoot);
    if (manifest.name !== consumer || manifest.version !== versions.get(consumer)) throw new Error(`Unexpected consumer name/version at ${consumerRoot}`);
    if (!samePath(await realpath(consumerRoot), consumerRoot)) throw new Error(`Unexpected redirected consumer: ${consumerRoot}`);
    for (const provider of providers) {
      const target = providersByName.get(provider), alias = contained(join(consumerRoot, "node_modules", provider));
      await assertLocalParents(alias);
      const existing = await exists(alias), actual = existing ? await realpath(alias).catch((error) => { if (error.code === "ENOENT") return null; throw error; }) : null;
      inspected.push({ consumer, provider, version: target.version, target: target.path, alias });
      if (actual && samePath(actual, target.path)) continue;
      if (existing && !existing.isSymbolicLink()) throw new Error(`Refusing to replace a real dependency directory: ${alias}`);
      let backup = null;
      if (existing) {
        const backupBase = contained(join(consumerRoot, "node_modules", ".suite-originals", provider));
        backup = backupBase;
        for (let suffix = 1; await exists(backup); suffix++) backup = contained(`${backupBase}.${suffix}`);
        await assertLocalParents(backup);
      }
      plans.push({ consumer, provider, version: target.version, target: target.path, alias, backup, previousLink: existing ? await readlink(alias) : null, previousInode: existing?.ino ?? null });
    }
  }
  // Complete preflight before any mkdir, rename, or symlink. Repeat identity checks.
  for (const plan of plans) {
    const current = await exists(plan.alias);
    if ((current?.ino ?? null) !== plan.previousInode || (current && !current.isSymbolicLink())) throw new Error(`Dependency alias changed during preflight: ${plan.alias}`);
    if (current && await readlink(plan.alias) !== plan.previousLink) throw new Error(`Dependency target changed during preflight: ${plan.alias}`);
    await assertLocalParents(plan.alias);
    if (plan.backup) await assertLocalParents(plan.backup);
    if (plan.backup && await exists(plan.backup)) throw new Error(`Backup target appeared during preflight: ${plan.backup}`);
  }
  if (!dryRun) for (const plan of plans) {
    if (plan.backup) { await mkdir(dirname(plan.backup), { recursive: true }); await rename(plan.alias, plan.backup); }
    await mkdir(dirname(plan.alias), { recursive: true });
    await symlink(plan.target, plan.alias, process.platform === "win32" ? "junction" : "dir");
  }
  if (!dryRun) for (const item of inspected) if (!samePath(await realpath(item.alias), item.target)) throw new Error(`Linked dependency did not resolve to the inspected provider: ${item.alias}`);
  return { workspace, protocolRoot: providersByName.get("dsh-obsidian-bridge-protocol").path, dryRun, dshOnly, preflightComplete: true,
    inspectedAliases: inspected.length, linked: dryRun ? [] : plans.map(({ consumer, provider, version, target, backup }) => ({ consumer, provider, version, target, backup })),
    plannedChanges: plans.length };
}

if (process.argv[1] && samePath(fileURLToPath(import.meta.url), process.argv[1])) {
  let protocolRoot, dryRun = false, dshOnly = false;
  for (let index = 2; index < process.argv.length; index++) {
    const arg = process.argv[index];
    if (arg === "--dry-run" && !dryRun) dryRun = true;
    else if (arg === "--dsh-only" && !dshOnly) dshOnly = true;
    else if (arg === "--protocol-root" && !protocolRoot && process.argv[index + 1] && !process.argv[index + 1].startsWith("--")) protocolRoot = process.argv[++index];
    else throw new Error("Usage: node scripts/link-workspace.mjs [--protocol-root PATH] [--dsh-only] [--dry-run]");
  }
  process.stdout.write(`${JSON.stringify(await linkWorkspace({ protocolRoot, dryRun, dshOnly }), null, 2)}\n`);
}
