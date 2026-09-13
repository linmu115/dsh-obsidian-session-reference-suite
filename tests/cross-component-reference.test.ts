import { readFile } from "node:fs/promises";
import { afterEach, describe, expect, it } from "vitest";

// These are deliberately combination tests of the current sibling workspaces.
// Public release pins are checked separately by the suite release manifest.
import { AnnotationStore } from "../../dsh-annotation-core/src/host/store.ts";
import { PendingDiscardOutbox } from "../../dsh-annotation-core/src/host/pending-discard-outbox.ts";
import type { HostSourceRegistry } from "../../dsh-annotation-core/src/host/source-registry.ts";
import { consumeObsidianReferenceCapture, type ObsidianAnnotationCore } from "../../dsh-obsidian-reference-adapter/src/client/annotation-consumer.ts";
import { createObsidianSourceAdapter } from "../../dsh-obsidian-reference-adapter/src/host/obsidian-source-adapter.ts";
import { startReferencePolling, type ReferencePollingHandle } from "../../dsh-obsidian-reference-adapter/src/bridge/reference-polling.ts";
import { createBridgeHttpClient, type BridgeHttpClient } from "../../dsh-obsidian-reference-adapter/src/bridge/http-client.ts";
import { startBridgeServer, type RunningBridge } from "../../obsidian-deepharness-bridge/src/bridge/server.ts";
import { createObsidianReferenceCapture } from "../../obsidian-deepharness-bridge/src/vault/reference-source.ts";
import type { ReferenceClaimV2 } from "../../obsidian-deepharness-bridge/src/protocol.ts";

const cleanup: Array<() => void | Promise<void>> = [];
const obsidianSurface = "7b31f255-d087-4f8e-bdd6-d09a61860819";
afterEach(async () => { for (const dispose of cleanup.splice(0).reverse()) await dispose(); });
function deferred() { let resolve!: () => void; const promise = new Promise<void>((done) => { resolve = done; }); return { promise, resolve }; }
function capture(id: string) {
  return createObsidianReferenceCapture({ actionId: `action-${id}`, referenceId: `reference-${id}`, vaultId: "memory-vault", notePath: "fixture.md", blockId: "fixture-block", occurrence: 0, selectedText: "quote", markdown: "quote ^fixture-block\n", capturedAt: 1 });
}
async function fixture() {
  const claims: ReferenceClaimV2[] = [];
  const discarded: string[] = [];
  const server = await startBridgeServer({
    port: 0,
    referenceSurfaceId: obsidianSurface,
    onClaimReference: async (claim) => { claims.push(claim); },
    onDiscardReference: async (request) => { discarded.push(request.referenceId); },
  });
  cleanup.push(() => server.close());
  const store = new AnnotationStore(AnnotationStore.memoryTable(), { profileId: "web" });
  return { server, store, claims, discarded };
}
function client(server: RunningBridge, id: string, dshInstanceId?: string, surfaceId: string | null = obsidianSurface) {
  const transport = createBridgeHttpClient({ origin: server.origin, clientId: id, requestTimeoutMs: 2_000,
    ...(surfaceId ? { surfaceId } : {}), ...(dshInstanceId ? { dshInstanceId } : {}) });
  cleanup.push(() => transport.dispose());
  return transport;
}
/** Only adapts the public client-shaped arguments; all identity and rollback logic is Core's. */
function core(store: AnnotationStore, afterPersist: () => void | Promise<void> = () => {}): ObsidianAnnotationCore {
  return {
    async addReference(sessionId, source, options) {
      const result = await store.addReference(sessionId, { ...options, expectedRevision: store.readPendingState(sessionId).revision, setId: `set-${sessionId}`, source, createdAt: 1 });
      await afterPersist();
      return result;
    },
    async discardPendingOperation(sessionId, operationId, options) {
      await store.discardPendingOperation(sessionId, { expectedRevision: store.readPendingState(sessionId).revision, operationId, ...options });
    },
  };
}
async function flushDiscards(store: AnnotationStore, transport: BridgeHttpClient, sessionId: string) {
  const adapter = createObsidianSourceAdapter(transport);
  const registry = { get: () => adapter } as unknown as HostSourceRegistry;
  const outbox = new PendingDiscardOutbox(store, registry);
  try { await outbox.runPending(sessionId); } finally { outbox.dispose(); }
}

describe("actual Core + Adapter + Obsidian HTTP reference delivery", () => {
  it("delivers a queued reference only to the Obsidian session while a standalone client polls the same instance", async () => {
    const { server, store, claims } = await fixture();
    const message = { ...capture("embedded-only"), dshInstanceId: "copy" }; server.enqueue(message);
    const desktop = client(server, "desktop", "copy", null), embedded = client(server, "obsidian", "copy");
    for(let i=0;i<3;i++)expect((await desktop.nextActions(0)).actions).toEqual([]);
    const page = await embedded.nextActions(0);
    expect(page.actions.map(entry => entry.message.actionId)).toEqual([message.actionId]);
    await consumeObsidianReferenceCapture({ capture: message, sessionId: "obsidian-session", profileId: "web",
      logicalTarget: { dshInstanceId: "copy" }, annotationCore: core(store), bridge: embedded });
    expect(store.readPendingState("obsidian-session").pendingCount).toBe(1);
    expect(store.readPendingState("desktop-session").pendingCount).toBe(0);
    expect(claims).toHaveLength(1);expect(claims[0]!.sessionId).toBe("obsidian-session");
    await expect(desktop.claimReference(message.actionId,claims[0]!)).rejects.toMatchObject({status:409});
    expect(store.readPendingState("obsidian-session").pendingCount).toBe(1);
  });

  it("keeps the winning claim intact when two persisted consumers race and the loser flushes cleanup", async () => {
    const { server, store, claims, discarded } = await fixture();
    const message = capture("race"); server.enqueue(message);
    const first = client(server, "consumer-one"); const second = client(server, "consumer-two");
    const bothPersisted = deferred(); let persisted = 0;
    const annotationCore = core(store, async () => { if (++persisted === 2) bothPersisted.resolve(); await bothPersisted.promise; });
    const results = await Promise.allSettled([
      consumeObsidianReferenceCapture({ capture: message, sessionId: "one", profileId: "web", annotationCore, bridge: first }),
      consumeObsidianReferenceCapture({ capture: message, sessionId: "two", profileId: "web", annotationCore, bridge: second }),
    ]);
    expect(results.map((result) => result.status).sort()).toEqual(["fulfilled", "rejected"]);
    const failure = results.find((result) => result.status === "rejected") as PromiseRejectedResult;
    expect(failure.reason).toMatchObject({ code: "idempotency-conflict" });
    expect(claims).toHaveLength(1);
    const winner = claims[0]!.sessionId; const loser = winner === "one" ? "two" : "one";
    expect(store.readPendingState(winner).pendingCount).toBe(1);
    expect(store.readPendingState(loser).pendingCount).toBe(0);
    await flushDiscards(store, second, loser);
    expect(store.listPendingDiscardJobs(loser)).toEqual([]);
    expect(discarded).toEqual([]);
    // The completed claim remains idempotently claimable by the winner; if loser
    // cleanup had hit /discard, the actual server would reject this with 404.
    await first.claimReference(message.actionId, claims[0]!);
    expect(claims).toHaveLength(1);
    expect((await second.nextActions(0)).actions).toEqual([]);
  });

  it("retains an add that finishes while polling stops and claims it idempotently on reconnect", async () => {
    const { server, store, claims, discarded } = await fixture();
    const message = capture("stop"); server.enqueue(message);
    const first = client(server, "before-stop"); const handlerFinished = deferred();
    let polling!: ReferencePollingHandle;
    const annotationCore = core(store, () => polling.stop());
    polling = startReferencePolling(first, async (action, signal) => {
      if (action.type !== "reference-capture") return "ignored";
      try {
        await consumeObsidianReferenceCapture({ capture: action, sessionId: "session", profileId: "web", annotationCore, bridge: first, signal });
        return "handled";
      } finally { handlerFinished.resolve(); }
    });
    cleanup.push(() => polling.stop());
    await handlerFinished.promise;
    expect(store.readPendingState("session").pendingCount).toBe(1);
    expect(store.listPendingDiscardJobs("session")).toEqual([]);
    expect(claims).toEqual([]);
    const reconnected = client(server, "after-stop");
    expect((await reconnected.nextActions(0)).actions.map((entry) => entry.message.actionId)).toEqual([message.actionId]);
    const resumed = await consumeObsidianReferenceCapture({ capture: message, sessionId: "session", profileId: "web", annotationCore: core(store), bridge: reconnected });
    expect(resumed.created).toBe(false);
    expect(resumed.referenceId).toBe(message.referenceId);
    expect(store.readPendingState("session").pendingCount).toBe(1);
    expect(claims).toHaveLength(1);
    expect(discarded).toEqual([]);
    expect((await reconnected.nextActions(0)).actions).toEqual([]);
  });

  it("does not redeliver a cancelled capture or its navigation to a new HTTP consumer", async () => {
    const { server, discarded } = await fixture(); const message = capture("discard");
    server.enqueue(message);
    server.enqueue({ protocolVersion: 1, type: "deep-link", actionId: "550e8400-e29b-41d4-a716-446655440010", sessionId: "session", anchorId: "anchor", referenceId: message.referenceId });
    const original = client(server, "before-discard");
    expect((await original.nextActions(0)).actions).toHaveLength(2);
    await original.discardReference(message.referenceId);
    const reconnected = client(server, "after-discard");
    expect((await reconnected.nextActions(0)).actions).toEqual([]);
    expect(discarded).toEqual([message.referenceId]);
    await expect(reconnected.claimReference(message.actionId, { annotationProtocolVersion: 2, type: "reference-claim", referenceId: message.referenceId, profileId: "web", sessionId: "session", setId: "set-session" })).rejects.toMatchObject({ status: 404 });
  });
});

it("keeps Core, Protocol and Zod imports inside the built browser bundles", async () => {
  for (const name of ["dsh-obsidian-bridge-lifecycle", "dsh-obsidian-reference-adapter", "dsh-session-sticker-board"]) {
    const source = await readFile(new URL(`../../${name}/lib/client.js`, import.meta.url), "utf8");
    const unresolved = [...source.matchAll(/\brequire\s*\(\s*["']((?:dsh-annotation-core|dsh-obsidian-bridge-protocol|dsh-obsidian-bridge-lifecycle|zod)(?:\/[^"']*)?)["']\s*\)/g)].map((match) => match[1]);
    expect(unresolved, `${name} runtime dependencies`).toEqual([]);
    expect(source).not.toMatch(/(?:^|\n)\s*import\s/);
  }
});

it("keeps independent same-profile stores isolated through the real scoped bridge transport", async () => {
  const { server, store, claims, discarded } = await fixture();
  const otherStore = new AnnotationStore(AnnotationStore.memoryTable(), { profileId: "web" });
  const message = { ...capture("instances"), dshInstanceId: "rc2" }; server.enqueue(message);
  const owner = client(server, "owner-web", "rc2"); const foreign = client(server, "other-web", "old");
  expect((await foreign.nextActions(0)).actions).toEqual([]);
  await consumeObsidianReferenceCapture({ capture: message, sessionId: "same-native-id", profileId: "web", annotationCore: core(store), bridge: owner,
    logicalTarget: { dshInstanceId: "rc2", logicalSessionId: "logical" } });
  await expect(consumeObsidianReferenceCapture({ capture: message, sessionId: "same-native-id", profileId: "web", annotationCore: core(otherStore), bridge: foreign,
    logicalTarget: { dshInstanceId: "old" } })).rejects.toMatchObject({ code: "idempotency-conflict" });
  expect(store.readPendingState("same-native-id").pendingCount).toBe(1);
  expect(otherStore.readPendingState("same-native-id").pendingCount).toBe(0);
  expect(claims).toHaveLength(1); expect(claims[0]).toMatchObject({ dshInstanceId: "rc2", logicalSessionId: "logical" });
  await flushDiscards(otherStore, foreign, "same-native-id"); expect(discarded).toEqual([]);
});
