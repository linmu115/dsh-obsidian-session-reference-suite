import { parse } from "yaml";
import { expect, it } from "vitest";
import { prepareRegistry } from "../scripts/prepare-registry.mjs";

it("aligns only selected sources, preserving the registered Vault and unrelated engine companions", () => {
  const input = `schemaVersion: 1
plugins:
  - name: unrelated
    repository: {path: original}
    companions: [{deployment: {targetPath: engine-target}}]
  - name: bridge
    repository: {path: obsolete, packagePath: old}
    companions: [{deployment: {targetPath: vault-target}}]
`;
  const result = prepareRegistry(input, "D:/suite", [{ name: "bridge" }, { name: "protocol" }]);
  const current = parse(result.candidate);
  expect(current.plugins[0]).toEqual(parse(input).plugins[0]);
  expect(current.plugins[1].companions).toEqual(parse(input).plugins[1].companions);
  expect(current.plugins[1].repository.path.replaceAll("\\", "/")).toBe("D:/suite/bridge");
  expect(current.plugins[2].name).toBe("protocol");
  expect(current.plugins).toHaveLength(3);
});

it("does not promote a legacy compatibility test package into the runtime registry", () => {
  const result = prepareRegistry("schemaVersion: 1\nplugins: []\n", "D:/suite", [
    { name: "dsh-obsidian-bridge", target: "dsh-profile", directory: "dsh-obsidian-bridge-lifecycle" },
    { name: "dsh-obsidian-reference-adapter", target: "compatibility-test" },
    { name: "dsh-obsidian-bridge-protocol", target: "development-only" },
    { name: "dsh-obsidian-session-reference-suite", target: "development-only" },
  ]);
  expect(parse(result.candidate).plugins.map((plugin: { name: string }) => plugin.name)).toEqual(["dsh-obsidian-bridge"]);
  expect(parse(result.candidate).plugins[0].repository.path.replaceAll('\\', '/')).toBe('D:/suite/dsh-obsidian-bridge-lifecycle');
});
