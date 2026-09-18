---
id: IF-companion-reference
kind: interface
title: Companion 合同：排队、领取、来源与回链
status: current
summary: 本机 Bridge 接收配置内嵌页的领取，交接选段与真实提交后的回链绑定。
sources:
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/bridge/server.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/protocol.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/bridge/http-client.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/client/annotation-consumer.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/host/obsidian-source-adapter.ts
  role: current-workspace-source
---

# Companion 合同：排队、领取、来源与回链

提供方 Companion 暴露本机 HTTP Bridge。Lifecycle 使用状态/租约；Reference Adapter 使用待处理队列、claim、refresh、backlink commit、discard 与 delete commit。调用方交付页面/实例和目标引用身份，获得限定目标的 capture、来源结果或持久回执。

例：笔记选段捕获后仍 pending；目标页面将它先加入 Core，再提交同一 referenceId/setId 的 claim。另一窗口 claim 冲突不能清除赢家。准备 refresh 明确区分离线快照和来源变更；真实 Core 消息提交后才写回链。

实现合同入口为 [服务端路由、检查与回执](../../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/bridge/server.ts)，消息类型经 [Protocol 导入](../../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/protocol.ts) 使用。共享控制/数据合同见 [[MOD-protocol]]；此处新引用消息的基础模型由 [[IF-core-annotation-protocol]]维护，Companion 的实际扩展见 [[INT-companion-protocol]]。当前协议版本以 [组合清单](../../../implementation/cohort.md) 为准。

失败与恢复：未有合格接收页时保留队列；幂等冲突不改绑；持久删除记录可重试，迟到的回链不能复活已删除关系。状态和身份改变影响 [Client 领取](../../reference-adapter/client.md)、[Host 删除](../../reference-adapter/host.md)、[租约](../../bridge-lifecycle/overview.md) 与 Companion 的恢复记录。
