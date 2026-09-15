import { readFile } from "node:fs/promises";
import { expect, it } from "vitest";

it("declares the native context cohort without altering the supported profile contract", async () => {
  const manifest = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  expect(manifest.version).toBe("0.3.4-rc2.18");
  expect(manifest.peerDependencies["dsh-annotation-core"].split(" || ")).toContain("0.3.12-rc2.12");
  expect(manifest.peerDependenciesMeta["dsh-annotation-core"]).toEqual({ optional: true });
  expect(manifest.files).toContain("docs/changes");
  const members = JSON.parse(await readFile(new URL("../suite.members.json", import.meta.url), "utf8"));
  expect(Object.fromEntries(members.members.filter((item: {name: string}) => item.name !== "obsidian-deepharness-bridge" && item.name !== "dsh-obsidian-bridge-protocol").map((item: {name: string; version: string}) => [item.name, item.version]))).toEqual({
    "dsh-annotation-core": "0.3.12-rc2.12", "dsh-obsidian-bridge-lifecycle": "0.3.3-rc2.16",
    "dsh-obsidian-reference-adapter": "0.3.4-rc2.16", "dsh-session-sticker-board": "0.7.3-rc2.18",
    "dsh-obsidian-session-reference-suite": "0.3.4-rc2.18",
  });
  for (const item of members.members) if (manifest.peerDependencies[item.name]) expect(manifest.peerDependencies[item.name].split(" || ")).toContain(item.version);
});
