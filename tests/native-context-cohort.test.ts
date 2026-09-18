import { readFile } from 'node:fs/promises';
import { expect, it } from 'vitest';

it('distinguishes installable plugins from development sources and retired wrappers', async () => {
  const members = JSON.parse(await readFile(new URL('../suite.members.json', import.meta.url), 'utf8'));
  expect(members.protocols).toEqual({ annotationProtocolVersion: 2, bridgeLifecycleProtocolVersion: 3, stickerProtocolVersion: 1 });
  expect(members.members.filter((item: {target: string}) => item.target === 'dsh-profile').map((item: {name: string}) => item.name)).toEqual([
    'dsh-annotation-core', 'dsh-obsidian-bridge', 'dsh-session-sticker-board',
  ]);
  expect(members.members.find((item: {name: string}) => item.name === 'dsh-obsidian-bridge-protocol').target).toBe('development-only');
  expect(members.members.find((item: {name: string}) => item.name === 'dsh-obsidian-session-reference-suite').target).toBe('development-only');
  expect(members.members.some((item: {name: string}) => item.name === 'dsh-obsidian-reference-adapter')).toBe(false);
});
