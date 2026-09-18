---
id: INT-sticker-protocol
kind: integration
title: Sticker Board 接入共享数据与引用协议
status: current
summary: 具体说明本组件消费的协议出口和自身适配责任。
sources:
- path: ../../../dsh-session-sticker-board/src/protocol.ts
  role: source-reviewed-2026-09-16
- path: ../../../dsh-session-sticker-board/src/host/local-store.ts
  role: source-reviewed-2026-09-16
- path: ../../../dsh-session-sticker-board/src/client/linked-notes.tsx
  role: source-reviewed-2026-09-16
relations:
- relation: consumes
  to:
    record_id: IF-protocol-data
  reason: 源码核实的协议消费
- relation: consumes
  to:
    record_id: IF-core-annotation-protocol
  reason: 源码核实的协议消费
---

# Sticker Board 接入共享数据与引用协议

Sticker 直接使用 [[IF-protocol-data]] 的 stickerSchema、sessionNoteDocumentSchema 与稳定逻辑目标形状，支持普通贴纸/笔记同步和兼容数据解析。自身 localStickerStateSchema 将文档与待删除回链队列组合成 DSH 所有的 outbox；共享协议不拥有此队列，也不改变已迁入 Maintenance 对象的真源。

新引用相关类型来自 [[IF-core-annotation-protocol]]。引用添加/跨会话操作见 [[INT-sticker-core]]；存储、会话入口和知识结构见 [[INT-sticker-maintenance]]。关联笔记引用经 Companion 直接准备再 Core 添加，不由旧 session-note 数据类型隐式启动。

源码入口：[protocol.ts](../../../../../../../dsh-session-sticker-board/src/protocol.ts)、[local-store.ts](../../../../../../../dsh-session-sticker-board/src/host/local-store.ts)、[linked-notes.tsx](../../../../../../../dsh-session-sticker-board/src/client/linked-notes.tsx)。

返回 [[MOD-protocol|共享协议接入目录]]；Annotation 2 返回 [[IF-core-annotation-protocol]]。
