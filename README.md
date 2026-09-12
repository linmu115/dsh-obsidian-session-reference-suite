# Obsidian Session Reference Suite

## 0.3.4-rc2.1 — 2026-09-12

固定 DSH 0.1.5-rc.2 的七个套件成员版本；组合验证接受逐文件校验过的本地发布包。生命周期配置需要真实 Launcher `dshInstanceId` 和 `profileId`，保留单组挂载和反向卸载。旧数据协议不变，新增实例字段为可选值。验证涵盖真实 Core + 引用适配器 + Obsidian HTTP，包括相同 profile 的两个独立实例。


This is the single profile Bundle for the Obsidian reference system. Its `dsh.bundle.patch` inserts one visible `cordis:group` parent with four ordered children:

1. Annotation Core — durable context-reference state and transactions.
2. Bridge Lifecycle Controller — external Bridge identity, exact Launcher browser-origin and Viewer-target leases, drain, and hot attachment state.
3. Obsidian Reference Adapter — note captures, refresh, deletion, and backlinks.
4. Sticker Board — DSH-local durable sticker notes, UI, and reconnectable Obsidian backlink mirroring.

When the Bridge is offline, Core and Sticker Board's local notes remain mounted and writable. Bridge-dependent transports are attached only in READY/DEGRADED, pending note/backlink work is resumed after reconnect, and attachments are disposed in reverse registration order on drain or disconnect.

The Suite's Lifecycle row owns `bridgeOrigin`. Reference Adapter and Sticker
Board inherit it; the Lifecycle host sends that same setting to its browser
service. Change this row and Obsidian's Bridge port together. Obsidian settings
are edited as a draft and activated by **Apply**.

Runtime recovery is available in Better Sidebar's **Obsidian** tab: current
connection, reference delivery, sticker synchronization and targeted retry.
Sticker conflicts require an explicit choice in the affected sticker's editor.
Obsidian's **DeepHarness Bridge** settings show current delivery/writeback
activity and pending references with open, retry and cancellation actions.
Lifecycle's optional `getHealth`, `registerHealthSource` and `retry` API owns
aggregation; the Suite remains a Bundle and has no second network poller.

## Development combination

`suite.members.json` lists all seven required source checkouts and versions,
including the Obsidian companion. Place them alongside this repository. Install
each checkout's development dependencies using its lockfile, then run:

```powershell
node scripts/link-workspace.mjs
node scripts/check-workspace.mjs
node scripts/combination.mjs record
node scripts/combination.mjs verify
```

The linker validates names and changes only package aliases in development
`node_modules`, retaining original aliases under `.suite-originals`. The checker
uses the installed tool executables directly, builds in dependency order and
writes per-member test reports under `.artifacts/checks`. It refuses dependencies
that resolve to a different checkout. Run the linker again after reinstalling
dependencies; package-manager wrappers can replace these development aliases.

The recorded combination includes repository, base commit, uncommitted source
digest, lock digest, artifact digests and tested local dependency paths. It is
explicitly a **local development combination**, with `publicReleaseReady: false`.
The public Git development pins still refer to the preceding release. Before a
public source release, publish the coordinated source commits, update their pins
and locks, and repeat checks from clean checkouts. A package version alone does
not identify this development build.

Executable digests compare exact bytes. Companion JSON metadata and CSS use the
same newline normalization as its packer; source maps are not activation inputs.

Installed comparison is read-only. Supply the exact profile directory and Vault
root; a stale version, different binary or missing member fails verification:

```powershell
node scripts/combination.mjs verify --profile="C:/path/to/profile" --vault="D:/path/to/vault"
node scripts/prepare-registry.mjs "D:/path/to/state/registry/plugins.yaml"
```

The second command writes a registry **candidate** and the original registry's
digest under `.artifacts/registry`; it changes only these seven source entries
and preserves the existing Obsidian deployment target and unrelated resources.
It does not activate the candidate or deploy either application. Confirm source
release readiness and the original registry digest before activating it.
Keep both applications' previous artifacts with the release record for rollback.

## Verification limits

Wire versions remain annotation 2 / sticker 1 / lifecycle 3. Combination tests
exercise real Core storage, Adapter handling and an ephemeral Obsidian HTTP
server with an in-memory Vault. They verify single ownership, local-only losing
claim cleanup, stop/reconnect recovery and cancellation. They do not replace a
real two-application acceptance run or a real Vault/browser performance measure.
