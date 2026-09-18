import { readFile, realpath } from "node:fs/promises";
import { join } from "node:path";

// Protocol is a shared development asset and need not be a sibling checkout.
// Resolve the same provider already linked by workspace:link, and validate it
// before any build or source snapshot is allowed to use it.
export async function memberRoot(workspace, member) {
  if (!/^[a-z][a-z0-9-]+$/.test(member.name)) throw new Error("Invalid member path");
  const directory = member.directory ?? member.name;
  if (!/^[a-z][a-z0-9-]+$/.test(directory)) throw new Error("Invalid member directory");
  let root;
  try { root = await realpath(join(workspace, directory)); }
  catch (error) {
    if (error.code !== "ENOENT" || member.name !== "dsh-obsidian-bridge-protocol") throw error;
    root = await realpath(join(workspace, "dsh-obsidian-session-reference-suite", "node_modules", member.name));
  }
  const manifest = JSON.parse(await readFile(join(root, "package.json"), "utf8"));
  if (manifest.name !== member.name || manifest.version !== member.version)
    throw new Error(`Unexpected provider name/version at ${root}; expected ${member.name}@${member.version}`);
  return root;
}
