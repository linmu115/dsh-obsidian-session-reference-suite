import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, realpath, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { memberRoot } from "./member-root.mjs";

const suiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspace = dirname(suiteRoot);
const hash = (data) => createHash("sha256").update(data).digest("hex");
const json = async (path) => JSON.parse(await readFile(path, "utf8"));
const git = (root, args) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8", windowsHide: true });
const buildDirectory = (manifest) => manifest.main?.startsWith('dist/') ? 'dist' : 'lib';

export async function fileDigests(root, paths) {
  const result = {};
  for (const path of [...new Set(paths)].sort()) result[path] = hash(await readFile(join(root, path)));
  return result;
}

// The companion packer normalizes these text files; JavaScript is copied byte
// for byte. Compare the same deployable content in checkouts, archives and Vaults.
export function artifactDigest(path, data) {
  return hash(["manifest.json", "styles.css", "versions.json"].includes(path)
    ? data.toString("utf8").replace(/\r\n?/g, "\n") : data);
}

async function filesUnder(root, prefix) {
  const result = [];
  for (const entry of await readdir(join(root, prefix), { withFileTypes: true })) {
    const path = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) result.push(...await filesUnder(root, path));
    else if (entry.isFile()) result.push(path);
    else throw new Error(`Unexpected linked build output: ${path}`);
  }
  return result;
}

export function compareMembers(expected, actual) {
  const issues = [];
  if (JSON.stringify(expected.protocols) !== JSON.stringify(actual.protocols)) issues.push("Protocol combination differs");
  for (const member of expected.members) {
    const current = actual.members.find((candidate) => candidate.name === member.name);
    if (!current) { issues.push(`${member.name}: missing member`); continue; }
    for (const field of ["version", "baseCommit", "sourceSha256", "lockSha256", "artifactSha256"]) {
      if (member[field] !== current[field]) issues.push(`${member.name}: ${field} differs`);
    }
  }
  for (const member of actual.members) if (!expected.members.some((candidate) => candidate.name === member.name)) issues.push(`${member.name}: unexpected member`);
  return issues;
}

async function snapshot() {
  const spec = await json(join(suiteRoot, "suite.members.json"));
  const members = [];
  const roots = new Map(await Promise.all(spec.members.map(async (member) => [member.name, await memberRoot(workspace, member)])));
  for (const member of spec.members) {
    if (!/^[a-z][a-z0-9-]+$/.test(member.name)) throw new Error("Invalid member path");
    const root = roots.get(member.name);
    const manifest = await json(join(root, "package.json"));
    if (manifest.name !== member.name || manifest.version !== member.version) throw new Error(`Unexpected version/source: ${root}`);
    for (const [key, value] of Object.entries(manifest.dshKnowledge ?? {})) {
      if (key in spec.protocols && value !== spec.protocols[key]) throw new Error(`${member.name}: incompatible ${key}`);
    }
    const localDependencies = {};
    for (const dependency of spec.members) {
      const pin = manifest.devDependencies?.[dependency.name];
      if (!pin) continue;
      const installed = await realpath(join(root, "node_modules", dependency.name));
      const checkout = roots.get(dependency.name);
      const linked = installed === checkout;
      if (!linked) {
        const installedManifest = await json(join(installed, "package.json"));
        if (installedManifest.name !== dependency.name || installedManifest.version !== dependency.version)
          throw new Error(`${member.name}: unexpected installed ${dependency.name}`);
        const dependencyManifest = await json(join(checkout, 'package.json'));
        const artifactPaths = (await filesUnder(checkout, buildDirectory(dependencyManifest))).filter(path => !path.endsWith(".map"));
        for (const path of artifactPaths) {
          if (hash(await readFile(join(installed, path))) !== hash(await readFile(join(checkout, path))))
            throw new Error(`${member.name}: installed ${dependency.name}/${path} differs from the tested candidate`);
        }
      }
      localDependencies[dependency.name] = { developmentPin: pin, testedSource: dependency.name, mode: linked ? "checkout" : "verified-artifact" };
    }
    const tracked = git(root, ["ls-files", "--cached", "--others", "--exclude-standard", "-z"]).split("\0").filter(Boolean);
    const deleted = new Set(git(root, ['ls-files', '--deleted', '-z']).split('\0').filter(Boolean));
    const sources = await fileDigests(root, tracked.filter((path) => !deleted.has(path) && !path.startsWith("lib/") && !path.startsWith("dist/") && path !== "main.js"));
    const artifacts = member.target === "obsidian-vault"
      ? ["main.js", "manifest.json", "styles.css", "versions.json"]
      : member.name === "dsh-obsidian-session-reference-suite"
        ? ["suite.members.json"] : [...(await filesUnder(root, buildDirectory(manifest))).filter((path) => !path.endsWith(".map")), ...(manifest.dsh?.bundle?.patch ? [manifest.dsh.bundle.patch.replace(/^\.\//, '')] : [])];
    const artifactFiles = {};
    for (const path of artifacts.sort()) artifactFiles[path] = artifactDigest(path, await readFile(join(root, path)));
    members.push({
      ...member,
      repository: manifest.repository?.url ?? manifest.repository,
      sourcePath: root,
      baseCommit: git(root, ["rev-parse", "HEAD"]).trim(),
      branch: git(root, ["branch", "--show-current"]).trim(),
      workingTreeChanges: git(root, ["status", "--porcelain"]).trim().split("\n").filter(Boolean),
      sourceSha256: hash(JSON.stringify(sources)),
      lockSha256: hash(await readFile(join(root, "pnpm-lock.yaml"))),
      artifactSha256: hash(JSON.stringify(artifactFiles)),
      artifactFiles,
      localDependencies,
    });
  }
  return { schemaVersion: 1, recordedAt: new Date().toISOString(), kind: "local-development-combination", publicReleaseReady: false, protocols: spec.protocols, members };
}

async function installedIssues(expected, options) {
  const issues = [];
  for (const member of expected.members) {
    if (member.target === "compatibility-test" || member.target === "development-only") continue;
    const target = member.target === "obsidian-vault" ? options.vault : options.profile;
    if (!target) continue;
    const root = member.target === "obsidian-vault" ? join(target, ".obsidian", "plugins", member.name) : join(target, "node_modules", member.name);
    try {
      const manifest = await json(join(root, "package.json"));
      if (manifest.name !== member.name || manifest.version !== member.version) issues.push(`${member.name}: installed package version differs at ${root}`);
      for (const [path, digest] of Object.entries(member.artifactFiles)) {
        if (artifactDigest(path, await readFile(join(root, path))) !== digest) issues.push(`${member.name}: installed ${path} differs`);
      }
    } catch (error) {
      issues.push(`${member.name}: cannot verify ${root} (${error.code ?? error.message})`);
    }
  }
  return issues;
}

async function main() {
  const [mode = "verify", ...args] = process.argv.slice(2);
  const options = {};
  for (const argument of args) {
    const match = /^--(profile|vault|output)=(.+)$/.exec(argument);
    if (!match) throw new Error(`Unknown argument: ${argument}`);
    options[match[1]] = resolve(match[2]);
  }
  const output = options.output ?? join(suiteRoot, ".artifacts", "combination.json");
  if (mode === "record") {
    const data = await snapshot();
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, `${JSON.stringify(data, null, 2)}\n`);
    process.stdout.write(`${output}\n`);
    return;
  }
  if (mode !== "verify") throw new Error("Use record or verify");
  const expected = await json(output);
  const issues = [...compareMembers(expected, await snapshot()), ...await installedIssues(expected, options)];
  process.stdout.write(`${JSON.stringify({ passed: issues.length === 0, issues }, null, 2)}\n`);
  if (issues.length) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
