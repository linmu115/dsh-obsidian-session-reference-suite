import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, it } from "vitest";
import { memberRoot } from "../scripts/member-root.mjs";

const temporaryRoots: string[] = [];
afterEach(async () => {
  // Only exact directories created by these fixtures are removed.
  for (const root of temporaryRoots.splice(0)) await rm(root, { recursive: true, force: true });
});
async function workspace() {
  const root = await mkdtemp(join(tmpdir(), "dsh-suite-member-"));
  temporaryRoots.push(root);
  return root;
}

it("checks the linked shared Protocol provider when no sibling checkout exists", async () => {
  const root = await workspace();
  const protocol = join(root, "dsh-obsidian-session-reference-suite", "node_modules", "dsh-obsidian-bridge-protocol");
  await mkdir(protocol, { recursive: true });
  await writeFile(join(protocol, "package.json"), JSON.stringify({ name: "dsh-obsidian-bridge-protocol", version: "1" }));
  await expect(memberRoot(root, { name: "dsh-obsidian-bridge-protocol", version: "1" })).resolves.toBe(protocol);
  await expect(memberRoot(root, { name: "dsh-obsidian-bridge-protocol", version: "2" })).rejects.toThrow("Unexpected provider name/version");
});

it("does not fall back to installed packages for missing runtime source checkouts", async () => {
  const root = await workspace();
  await expect(memberRoot(root, { name: "dsh-annotation-core", version: "1" })).rejects.toMatchObject({ code: "ENOENT" });
  await expect(memberRoot(root, { name: "../elsewhere", version: "1" })).rejects.toThrow("Invalid member path");
});

it('resolves the new product from its historical checkout only after validating package identity', async () => {
  const root = await workspace();
  const source = join(root, 'dsh-obsidian-bridge-lifecycle');
  await mkdir(source);
  await writeFile(join(source, 'package.json'), JSON.stringify({ name: 'dsh-obsidian-bridge', version: '1' }));
  await expect(memberRoot(root, { name: 'dsh-obsidian-bridge', version: '1', directory: 'dsh-obsidian-bridge-lifecycle' })).resolves.toBe(source);
  await expect(memberRoot(root, { name: 'dsh-obsidian-bridge', version: '1', directory: '../outside' })).rejects.toThrow('Invalid member directory');
});
