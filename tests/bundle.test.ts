import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { expect, it } from 'vitest';

it('ships one independent Bridge node without recreating the retired Suite wrapper', async () => {
  const workspace = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
  expect(workspace.private).toBe(true);
  expect(workspace.dsh).toBeUndefined();
  await expect(readFile(new URL('../cordis.patch.yml', import.meta.url))).rejects.toMatchObject({ code: 'ENOENT' });
  const bridge = JSON.parse(await readFile(new URL('../../dsh-obsidian-bridge-lifecycle/package.json', import.meta.url), 'utf8'));
  expect(bridge.name).toBe('dsh-obsidian-bridge');
  const patch = parse(await readFile(new URL('../../dsh-obsidian-bridge-lifecycle/' + bridge.dsh.bundle.patch, import.meta.url), 'utf8'));
  const nodes = patch.flatMap((row: {insert?: unknown[]}) => row.insert ?? []);
  expect(nodes).toHaveLength(1);
  expect(nodes[0].name).toBe('dsh-obsidian-bridge');
  expect(nodes[0].group).not.toBe(true);
  expect(JSON.stringify(patch)).not.toContain('dsh-session-sticker-board');
  expect(JSON.stringify(patch)).not.toContain('dsh-annotation-core');
});
