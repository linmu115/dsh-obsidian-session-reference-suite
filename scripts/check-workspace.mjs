import { spawn } from "node:child_process";
import { mkdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { memberRoot } from "./member-root.mjs";

const suiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workspace = dirname(suiteRoot);
const spec = JSON.parse(await readFile(join(suiteRoot, "suite.members.json"), "utf8"));
const outputRoot = join(suiteRoot, ".artifacts", "checks");
await mkdir(outputRoot, { recursive: true });
const summary = [];
const roots = new Map(await Promise.all(spec.members.map(async (member) => [member.name, await memberRoot(workspace, member)])));

for (const member of spec.members) {
  if (!/^[a-z][a-z0-9-]+$/.test(member.name)) throw new Error("Invalid member path");
  const root = roots.get(member.name);
  const manifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
  if (manifest.name !== member.name || manifest.version !== member.version) throw new Error(`Unexpected source: ${root}`);
  for (const dependency of spec.members) {
    if (!manifest.devDependencies?.[dependency.name]) continue;
    if (await realpath(join(root, "node_modules", dependency.name)) !== roots.get(dependency.name)) {
      throw new Error(`${member.name}: link the suite workspace before checking ${dependency.name}`);
    }
  }
  let log = "";
  const run = async (tool, args) => {
    const toolRoot = join(root, "node_modules", tool);
    const toolManifest = JSON.parse(await readFile(join(toolRoot, "package.json"), "utf8"));
    const bin = typeof toolManifest.bin === "string" ? toolManifest.bin : toolManifest.bin[tool === "typescript" ? "tsc" : tool];
    const code = await new Promise((accept, reject) => {
      const child = spawn(process.execPath, [join(toolRoot, bin), ...args], { cwd: root, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
      child.stdout.on("data", (chunk) => { log += chunk; });
      child.stderr.on("data", (chunk) => { log += chunk; });
      child.on("error", reject);
      child.on("close", accept);
    });
    await writeFile(join(outputRoot, `${member.name}.log`), log);
    if (code !== 0) throw new Error(`${member.name}: ${tool} failed (${code}). See ${outputRoot}\n${log.slice(-5000)}`);
  };
  if (manifest.scripts.typecheck) await run("typescript", ["--noEmit"]);
  if (manifest.scripts.build) {
    if (member.target !== "obsidian-vault") {
      const lib = join(root, "lib");
      const actual = await realpath(lib).catch((error) => { if (error.code === "ENOENT") return lib; throw error; });
      if (actual !== join(await realpath(root), "lib")) throw new Error(`Refusing to clean redirected build output: ${lib}`);
      await rm(lib, { recursive: true, force: true });
      await run("typescript", ["-p", "tsconfig.build.json"]);
    }
    await run("tsdown", ["--config-loader", "unrun", "--config", "tsdown.config.ts"]);
  }
  const report = join(outputRoot, `${member.name}.json`);
  await run("vitest", ["run", "--pool=threads", "--maxWorkers=1", "--reporter=default", "--reporter=json", `--outputFile.json=${report}`]);
  const tests = JSON.parse(await readFile(report, "utf8"));
  summary.push({ name: member.name, version: member.version, tests: tests.numPassedTests, passed: tests.success });
  process.stdout.write(`${member.name} ${member.version}: ${tests.numPassedTests} passed\n`);
}
await writeFile(join(outputRoot, "summary.json"), `${JSON.stringify({ checkedAt: new Date().toISOString(), members: summary }, null, 2)}\n`);
