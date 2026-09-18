import { expect, it, vi } from 'vitest';
import { registerBridgeBusinessPage, type BusinessPageService } from '../../dsh-obsidian-bridge-lifecycle/src/business-page.ts';
import { resolveInstanceIdentity } from '../../dsh-obsidian-bridge-lifecycle/src/host-identity.ts';
import type { VaultConnectionSnapshot } from '../../dsh-obsidian-bridge-lifecycle/src/api.ts';
import { dshInstanceIdentitySchema } from 'dsh-obsidian-bridge-protocol/binding';
import { businessPageSnapshotSchema, businessPageRegistrationSchema, businessPageActionRequestSchema } from '../../dsh-session-maintenance/packages/contracts/src/business-pages.ts';

// In-memory provider/consumer contract test: no server, registry or user data.
const identity = dshInstanceIdentitySchema.parse({ discoveryProtocolVersion: 1, kind: 'dsh', instanceId: 'i'.repeat(256), profileId: 'web', origin: 'http://127.0.0.1:31415', bootId: crypto.randomUUID(), publisherId: crypto.randomUUID(), displayName: 'Fixture', capabilities: ['vault-instance-binding-v1'] });
function vault(index: number, state: VaultConnectionSnapshot['state'] = 'available', long = false): VaultConnectionSnapshot {
  const vaultId = `vault-${index}-` + (long ? 'v'.repeat(240) : 'fixture');
  return { vaultId, displayName: long ? 'n'.repeat(256) : `Vault ${index}`, origin: 'http://127.0.0.1:31416', state,
    binding: { bindingProtocolVersion: 1, vaultId, revision: index + 2, updatedAt: 1, target: state === 'available' ? null : { instanceId: state === 'foreign' ? 'foreign' : identity.instanceId, profileId: 'web' } } };
}
function fixture(vaults: VaultConnectionSnapshot[]) {
  let provider!: Parameters<BusinessPageService['register']>[0];
  const change = vi.fn(async (_vaultId, request) => ({ ...vaults[0]!.binding, revision: request.expectedRevision + 1, target: request.target }));
  const service: BusinessPageService = { identity, register(value) { provider = value; return () => undefined; } };
  const dispose = registerBridgeBusinessPage(service, { listVaults: () => vaults, changeVaultBinding: change } as never, identity);
  return { provider, change, dispose, owner: { instanceId: identity.instanceId, profileId: identity.profileId, namespace: 'obsidian-bridge', providerId: 'vault-bindings', bootId: crypto.randomUUID() } };
}
it('validates a two-Vault registration and roundtrips declared bind/rebind/unbind CAS through the real Maintenance schemas', async () => {
  const rows = [vault(0), vault(1, 'foreign')], f = fixture(rows);
  try {
    const first = businessPageRegistrationSchema.parse({ owner: f.owner, snapshot: await f.provider.snapshot() });
    const descriptors = first.snapshot.sections.flatMap(section => section.kind === 'actions' ? section.actions : []);
    expect(descriptors).toHaveLength(2); expect(new Set(descriptors.map(action => action.id)).size).toBe(2);
    for (const [index, action] of descriptors.entries()) {
      const request = businessPageActionRequestSchema.parse({ owner: f.owner, operationId: crypto.randomUUID(), actionId: action.id, expectedRevision: action.expectedRevision, input: {} });
      await f.provider.handleAction(request, new AbortController().signal);
      expect(f.change).toHaveBeenLastCalledWith(rows[index]!.vaultId, expect.objectContaining({ operationId: request.operationId, expectedRevision: rows[index]!.binding.revision, intent: index ? 'rebind' : 'bind', target: { instanceId: identity.instanceId, profileId: identity.profileId }, candidate: { origin: identity.origin, bootId: identity.bootId } }));
    }
    rows[0] = vault(0, 'bound'); rows[0].binding.revision++;
    const current = businessPageSnapshotSchema.parse(await f.provider.snapshot());
    expect(current.revision).toBeGreaterThan(first.snapshot.revision);
    const unbind = current.sections.flatMap(section => section.kind === 'actions' ? section.actions : []).find(action => action.id.startsWith('unbind:'))!;
    await f.provider.handleAction(businessPageActionRequestSchema.parse({ owner: f.owner, operationId: crypto.randomUUID(), actionId: unbind.id, expectedRevision: unbind.expectedRevision, input: {} }), new AbortController().signal);
    expect(f.change).toHaveBeenLastCalledWith(rows[0].vaultId, expect.objectContaining({ intent: 'unbind', target: null, expectedRevision: rows[0].binding.revision }));
    await expect(f.provider.handleAction({ owner: f.owner, operationId: crypto.randomUUID(), actionId: unbind.id, expectedRevision: unbind.expectedRevision - 1, input: {} }, new AbortController().signal)).rejects.toThrow();
    expect(f.change).toHaveBeenCalledTimes(3);
  } finally { f.dispose(); }
});
it('keeps a full multi-Vault page within the formal field, count and serialized-size limits', async () => {
  const f = fixture(Array.from({ length: 45 }, (_, index) => vault(index, 'bound', true)));
  try {
    const snapshot = businessPageSnapshotSchema.parse(await f.provider.snapshot());
    expect(snapshot.sections).toHaveLength(3);
    expect(snapshot.sections.flatMap(section => section.kind === 'key-values' ? section.items : []).length).toBeLessThanOrEqual(40);
    expect(snapshot.sections.flatMap(section => section.kind === 'actions' ? section.actions : []).length).toBeLessThanOrEqual(16);
  } finally { f.dispose(); }
});

it('keeps the configured stable identity regardless of Maintenance load order and rejects a mismatched page owner', async () => {
  let stored: { instanceId?: string } = {};
  const storage = { open: async () => ({ global: { get: () => stored, set: async (value: { instanceId: string }) => { stored = value; } }, close: async () => undefined }) };
  const config = { configuredId: identity.instanceId, profileId: 'web', origin: identity.origin, storage };
  const beforeMaintenance = await resolveInstanceIdentity(config);
  const afterMaintenance = await resolveInstanceIdentity({ ...config, maintenance: { instanceId: identity.instanceId, profileId: 'web' } });
  try {
    expect(beforeMaintenance.identity.instanceId).toBe(afterMaintenance.identity.instanceId);
    expect(beforeMaintenance.identity.bootId).not.toBe(afterMaintenance.identity.bootId);
    const register = vi.fn(() => () => undefined);
    expect(() => registerBridgeBusinessPage({ identity: { instanceId: 'other', profileId: 'web' }, register }, {} as never, beforeMaintenance.identity)).toThrow('identity mismatch');
    expect(register).not.toHaveBeenCalled();
    await expect(resolveInstanceIdentity({ ...config, maintenance: { instanceId: 'other', profileId: 'web' } })).rejects.toThrow('conflict');
    expect(stored.instanceId).toBe(identity.instanceId);
  } finally { await beforeMaintenance.dispose(); await afterMaintenance.dispose(); }
});
