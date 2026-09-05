import { lstat, mkdir, readFile, realpath, rename, symlink } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Only development aliases in these sibling checkouts are changed. Published
// manifests, the Launcher profile and Obsidian Vault are never modified here.
const workspace = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const dependencies = {
  "dsh-obsidian-bridge-lifecycle": ["dsh-annotation-core", "dsh-obsidian-bridge-protocol"],
  "dsh-obsidian-reference-adapter": ["dsh-annotation-core", "dsh-obsidian-bridge-protocol", "dsh-obsidian-bridge-lifecycle"],
  "dsh-session-sticker-board": ["dsh-annotation-core", "dsh-obsidian-bridge-protocol", "dsh-obsidian-bridge-lifecycle"],
  "obsidian-deepharness-bridge": ["dsh-annotation-core", "dsh-obsidian-bridge-protocol"],
  "dsh-obsidian-session-reference-suite": ["dsh-annotation-core", "dsh-obsidian-bridge-protocol", "dsh-obsidian-bridge-lifecycle", "dsh-obsidian-reference-adapter", "dsh-session-sticker-board"],
};
const exists = async (path) => lstat(path).catch((error) => { if (error.code === "ENOENT") return null; throw error; });
const contained = (path) => {
  const suffix = relative(workspace, path);
  if (!suffix || suffix.startsWith("..") || resolve(workspace, suffix) !== path) throw new Error(`Path is outside the suite workspace: ${path}`);
  return path;
};
const changes = [];
for (const [consumer, providers] of Object.entries(dependencies)) {
  const consumerRoot = contained(join(workspace, consumer));
  await readFile(join(consumerRoot, "package.json"), "utf8");
  for (const provider of providers) {
    const target = contained(join(workspace, provider));
    const manifest = JSON.parse(await readFile(join(target, "package.json"), "utf8"));
    if (manifest.name !== provider) throw new Error(`Unexpected provider at ${target}`);
    const alias = contained(join(consumerRoot, "node_modules", provider));
    if (await realpath(alias).catch(() => null) === await realpath(target)) continue;
    const existing = await exists(alias);
    if (existing) {
      if (!existing.isSymbolicLink()) throw new Error(`Refusing to replace a real dependency directory: ${alias}`);
      const backupBase = contained(join(consumerRoot, "node_modules", ".suite-originals", provider));
      let backup = backupBase;
      for (let suffix = 1; await exists(backup); suffix++) backup = contained(`${backupBase}.${suffix}`);
      await mkdir(dirname(backup), { recursive: true });
      await rename(alias, backup);
    }
    await mkdir(dirname(alias), { recursive: true });
    await symlink(target, alias, process.platform === "win32" ? "junction" : "dir");
    changes.push({ consumer, provider, version: manifest.version });
  }
}
process.stdout.write(`${JSON.stringify({ workspace, linked: changes }, null, 2)}\n`);
