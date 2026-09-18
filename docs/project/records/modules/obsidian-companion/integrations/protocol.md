---
id: INT-companion-protocol
kind: integration
title: Companion 接入共享控制、数据及 Annotation 2
status: current
summary: 具体说明本组件消费的协议出口和自身适配责任。
sources:
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/bridge/server.ts
  role: source-reviewed-2026-09-16
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/protocol.ts
  role: source-reviewed-2026-09-16
relations:
- relation: consumes
  to:
    record_id: IF-protocol-control
  reason: 源码核实的协议消费
- relation: consumes
  to:
    record_id: IF-protocol-data
  reason: 源码核实的协议消费
- relation: consumes
  to:
    record_id: IF-core-annotation-protocol
  reason: 源码核实的协议消费
---

# Companion 接入共享控制、数据及 Annotation 2

Companion 是 Obsidian 插件，Bridge server 直接导入 [[IF-protocol-control]] 校验控制请求并管理实际租约、状态和服务；它是协议消费者与 HTTP 服务提供者，不是 Protocol 的子产品。

本地 protocol.ts 从 [[IF-protocol-data]] 导出数据消息，使用 stableLogicalTargetShape 扩展 claim/删除目标；Annotation 2 的 capture、快照、claim、refresh、回链和删除基础模型来自 [[IF-core-annotation-protocol]]。扩展严格校验保留目标边界，但不会为旧记录发明逻辑身份。

实际笔记队列与回链服务见 [[IF-companion-reference]]，直接关联引用见 [[IF-companion-knowledge]]；协议定义不保存 Vault 正文、Owned 标记或同步回执，这些属于 [[MOD-companion-vault]]。

源码入口：[server.ts](../../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/bridge/server.ts)、[protocol.ts](../../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/protocol.ts)。

返回 [[MOD-protocol|共享协议接入目录]]；Annotation 2 返回 [[IF-core-annotation-protocol]]。
