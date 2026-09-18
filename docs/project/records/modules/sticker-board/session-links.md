---
id: MOD-sticker-session
kind: module
title: Sticker / 关联笔记与会话功能迁移
status: current
summary: 关联笔记保留；会话贴纸和蓝色来源标记转交 ThoughtDAG。
sources:
- path: ../../../dsh-session-sticker-board/README.md
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/knowledge-panel.tsx
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/linked-notes.tsx
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/docs/2026-09-15-source-marker-context-menu.md
  role: current-workspace-source
relations:
- relation: consumes
  to:
    record_id: IF-companion-knowledge
  reason: 关联气泡消费者
  reasons:
  - 关联气泡消费者
  - 直接准备和回执
- relation: implements
  to:
    record_id: XR05
  reason: 真实目标会话
- relation: implements
  to:
    record_id: ST08
  reason: 删除对象有别
- relation: implements
  to:
    record_id: REQ-linked-note
  reason: 关联笔记明确动作
---

# Sticker / 关联笔记与会话功能迁移

会话贴纸的创建、列表、删除恢复及蓝色来源标记已移至 ThoughtDAG，使用原有对象和引用数据。旧记录 ID 保留用于回查；本页现在描述留在 Sticker Board 的关联笔记能力。迁移决定见 [[DEC-selection-ownership-20260918]]。

关联笔记气泡通过 conversation.input.dock 挂载。展示只读取链接元数据；点击“引用到本轮”才准备材料、核对当前会话并调用 Core。此路径直接绑定实例/会话/引用集，绕过自动领取队列。详见 [笔记直接引用合同](../obsidian-companion/interfaces/knowledge.md)。

入口：[普通贴纸与笔记链接](../../../../../../dsh-session-sticker-board/src/client/knowledge-panel.tsx)、[关联笔记](../../../../../../dsh-session-sticker-board/src/client/linked-notes.tsx)。
