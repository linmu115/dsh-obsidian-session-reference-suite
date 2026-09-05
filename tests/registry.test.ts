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
