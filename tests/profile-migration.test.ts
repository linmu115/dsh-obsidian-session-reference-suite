import { expect, it } from 'vitest';
import { migrateBridgeProfile } from '../scripts/migrate-bridge-profile.mjs';

function fixture() {
  const manifest = { dependencies: { 'dsh-obsidian-session-reference-suite': 'old-suite', 'dsh-obsidian-bridge-lifecycle': 'old-bridge', 'dsh-obsidian-reference-adapter': 'old-adapter', 'unrelated': 'keep' },
    dsh: { profile: { bundles: ['base', 'dsh-obsidian-session-reference-suite', 'dsh-better-sidebar', 'dsh-session-maintenance', 'dsh-thoughtdag'], patchReload: 'live' } } };
  const patch = [{ id: 'maintenance', config: { dshInstanceId: 'trusted-instance', scope: 'keep' } }, { id: 'obsidian-session-reference-suite', config: [
    { id: 'annotation-core', name: 'dsh-annotation-core', config: { profileId: 'web', custom: 'keep' } },
    { id: 'obsidian-bridge-lifecycle', name: 'dsh-obsidian-bridge-lifecycle', config: { profileId: 'web', dshInstanceId: 'trusted-instance', bridgeOrigin: 'http://127.0.0.1:18473' } },
    { id: 'obsidian-reference-adapter', name: 'dsh-obsidian-reference-adapter' },
    { id: 'session-sticker-board', name: 'dsh-session-sticker-board', inject: ['obsidianBridgeLifecycle'] },
  ] }, { id: 'unrelated', config: { protected: true } }];
  return { manifest, patch };
}

it('preserves instance identity and other plugins while removing the actual legacy wrapper', () => {
  const before = fixture(), frozen = structuredClone(before);
  const result = migrateBridgeProfile(before.manifest, before.patch);
  expect(before).toEqual(frozen);
  expect(result.manifest.dsh.profile.bundles).toEqual(['base', 'dsh-annotation-core', 'dsh-obsidian-bridge', 'dsh-session-sticker-board', 'dsh-better-sidebar', 'dsh-session-maintenance', 'dsh-thoughtdag']);
  expect(result.patch.find(row => row.id === 'obsidian-bridge').config).toEqual(before.patch[1].config[1].config);
  expect(result.patch[0]).toEqual(before.patch[0]);
  expect(result.patch.at(-1)).toEqual(before.patch.at(-1));
  expect(JSON.stringify(result)).not.toContain('old-suite');
  const second = migrateBridgeProfile(result.manifest, result.patch);
  expect(second).toEqual(result);
});

it('does not silently drop an unknown child or replace a conflicting standalone configuration', () => {
  const input = fixture();
  input.patch.push({ id: 'annotation-core', config: { profileId: 'another' } } as never);
  expect(() => migrateBridgeProfile(input.manifest, input.patch)).toThrow('Conflicting standalone override');
  const unknown = fixture(); unknown.patch[1].config.push({ id: 'unknown', name: 'unknown' } as never);
  expect(() => migrateBridgeProfile(unknown.manifest, unknown.patch)).toThrow('Unexpected or duplicate Suite child');
});
