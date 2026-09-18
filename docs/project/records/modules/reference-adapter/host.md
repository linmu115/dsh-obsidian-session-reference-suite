---
id: MOD-reference-host
kind: module
title: Reference Adapter / Host 来源与删除
status: current
summary: 准备时核对 Vault 来源，提交后写回链，通过持续轮询处理反向删除。
sources:
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/host/obsidian-source-adapter.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/host.ts
  role: current-workspace-source
relations:
- relation: consumes
  to:
    record_id: IF-core-host
  reason: 来源注册和后端删除
- relation: consumes
  to:
    record_id: IF-lifecycle
  reason: 删除轮询挂载
- relation: consumes
  to:
    record_id: IF-companion-reference
  reason: 准备、回链、删除 HTTP
---

# Reference Adapter / Host 来源与删除

Host 向 Core 注册 obsidian-note 来源适配器，在线准备时调用 Companion refresh。BridgeUnavailable 或显式 offline 保留已捕获快照并标记离线；source-changed、note/block missing、protocol mismatch 等明确阻断。

真实提交后，commitBacklink 把用户消息、引用集与引用身份交给 Companion。取消待发送通过 discard，已提交删除通过 deleteCommitted。反向删除通过 Lifecycle 挂载 Host 轮询，调用 Core 可选 deleteReferenceLink；若有逻辑会话身份，优先经 Maintenance 解析。

源码 [来源 Adapter](../../../../../../dsh-obsidian-bridge-lifecycle/src/reference/host/obsidian-source-adapter.ts) 与 [宿主注册和轮询](../../../../../../dsh-obsidian-bridge-lifecycle/src/reference/host.ts) 是当前观察依据。返回 [消费方接入](integrations/core.md) 或 [提供方合同](../annotation-core/interfaces/host.md)。
