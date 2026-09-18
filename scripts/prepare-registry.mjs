import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseDocument } from "yaml";

export function prepareRegistry(text, workspace, members) {
  const document = parseDocument(text);
  if (document.errors.length) throw document.errors[0];
  const existing = document.toJS();
  if (existing.schemaVersion !== 1 || !Array.isArray(existing.plugins)) throw new Error("Unsupported maintenance registry");
  const changes = [];
  for (const member of members) {
    if (member.target === "compatibility-test") continue;
    if (!/^[a-z][a-z0-9-]+$/.test(member.name)) throw new Error("Invalid member name");
    const matches = existing.plugins.flatMap((plugin, index) => plugin.name === member.name ? [index] : []);
    if (matches.length > 1) throw new Error(`Duplicate registered member: ${member.name}`);
    const path = join(workspace, member.name);
    if (matches.length) {
      const index = matches[0];
      changes.push({ name: member.name, previous: existing.plugins[index].repository.path, source: path });
      document.setIn(["plugins", index, "repository", "path"], path);
      document.setIn(["plugins", index, "repository", "packagePath"], ".");
    } else {
      changes.push({ name: member.name, previous: null, source: path });
      document.addIn(["plugins"], {
        name: member.name, kind: "local", classification: "homemade",
        tier: member.name === "dsh-annotation-core" || member.name === "dsh-obsidian-bridge-protocol" ? 0 : 1,
        repository: { path, packagePath: "." },
        documentation: { changesDir: "docs/changes", incidentsDir: "docs/incidents", compatibilityDir: "docs/compatibility" },
        commands: { test: member.name === "dsh-obsidian-session-reference-suite" ? "node scripts/check-workspace.mjs" : "pnpm check" },
      });
    }
  }
  return { candidate: String(document), changes };
}

async function main() {
  const suiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const input = process.argv[2];
  if (!input) throw new Error("Pass the existing plugins.yaml path; this command only writes a candidate under .artifacts");
  const text = await readFile(input, "utf8");
  const { members } = JSON.parse(await readFile(join(suiteRoot, "suite.members.json"), "utf8"));
  const result = prepareRegistry(text, dirname(suiteRoot), members);
  const output = join(suiteRoot, ".artifacts", "registry");
  await mkdir(output, { recursive: true });
  await writeFile(join(output, "plugins.candidate.yaml"), result.candidate);
  await writeFile(join(output, "source.json"), `${JSON.stringify({ source: resolve(input), sourceSha256: createHash("sha256").update(text).digest("hex"), changes: result.changes, activated: false }, null, 2)}\n`);
  process.stdout.write(`${join(output, "plugins.candidate.yaml")}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
