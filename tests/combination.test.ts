import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { artifactDigest, compareMembers, fileDigests } from "../scripts/combination.mjs";

describe("combination provenance", () => {
  it("matches the companion's text normalization while preserving exact executable identity", () => {
    expect(artifactDigest("manifest.json", Buffer.from("{}\r\n"))).toBe(artifactDigest("manifest.json", Buffer.from("{}\n")));
    expect(artifactDigest("main.js", Buffer.from("value\r\n"))).not.toBe(artifactDigest("main.js", Buffer.from("value\n")));
  });
  it("detects a changed binary even when its package version is unchanged", async () => {
    const root = await mkdtemp(join(tmpdir(), "dsh-combination-"));
    try {
      await writeFile(join(root, "main.js"), "original");
      const original = await fileDigests(root, ["main.js"]);
      await writeFile(join(root, "main.js"), "different build");
      expect(await fileDigests(root, ["main.js"])).not.toEqual(original);
    } finally {
      // This exact directory was created by mkdtemp in this test.
      await rm(root, { recursive: true, force: true });
    }
  });

  it("rejects a missing member, changed source and incompatible protocol", () => {
    const expected = { protocols: { annotationProtocolVersion: 2 }, members: [
      { name: "core", version: "1", baseCommit: "a", sourceSha256: "source", artifactSha256: "build", lockSha256: "lock" },
      { name: "bridge", version: "1" },
    ] };
    expect(compareMembers(expected, { protocols: { annotationProtocolVersion: 3 }, members: [{ ...expected.members[0], sourceSha256: "changed" }] })).toEqual([
      "Protocol combination differs", "core: sourceSha256 differs", "bridge: missing member",
    ]);
    expect(compareMembers(expected, structuredClone(expected))).toEqual([]);
  });
});
