import { readFile } from "node:fs/promises";

import { parse } from "yaml";
import { describe, expect, it } from "vitest";

describe("Obsidian Session Reference Suite bundle", () => {
  it("inserts exactly one parent Cordis group with ordered child plugins", async () => {
    const patch = parse(await readFile(new URL("../cordis.patch.yml", import.meta.url), "utf8")) as Array<{
      insert: Array<{ id: string; name: string; group: boolean; config: Array<{ id: string; name: string }> }>;
    }>;
    expect(patch).toHaveLength(1);
    expect(patch[0]?.insert).toHaveLength(1);
    const suite = patch[0]?.insert[0];
    expect(suite).toMatchObject({
      id: "obsidian-session-reference-suite",
      name: "cordis:group",
      group: true,
    });
    expect(suite?.config.map((row) => [row.id, row.name])).toEqual([
      ["annotation-core", "dsh-annotation-core"],
      ["obsidian-bridge-lifecycle", "dsh-obsidian-bridge-lifecycle"],
      ["obsidian-reference-adapter", "dsh-obsidian-reference-adapter"],
      ["session-sticker-board", "dsh-session-sticker-board"],
    ]);
  });

  it("declares the dsh.bundle.patch contract", async () => {
    const manifest = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
    expect(manifest.dsh?.bundle?.patch).toBe("./cordis.patch.yml");
    expect(Object.keys(manifest.peerDependencies)).toEqual([
      "dsh-annotation-core",
      "dsh-obsidian-bridge-protocol",
      "dsh-obsidian-bridge-lifecycle",
      "dsh-obsidian-reference-adapter",
      "dsh-session-sticker-board",
    ]);
  });
});
