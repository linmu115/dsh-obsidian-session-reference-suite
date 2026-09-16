---
id: MOD-sticker-session
kind: module
title: Sticker / 真实会话、来源标记与关联气泡
status: current
summary: 先工作区后会话；蓝色标记精确解除关系，关联笔记可导航或直接引用。
sources:
- path: ../../../dsh-session-sticker-board/README.md
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/knowledge-panel.tsx
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/source-markers.ts
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

# Sticker / 真实会话、来源标记与关联气泡

会话贴纸先选工作区，再选择已有会话或创建独立会话；取消不创建。点击入口打开完整会话而不发送。来源选区仅接受已完成回复，长度 1–4000 字，绑定后保留固定版本与完成截止。

蓝色符号的导航列表对同一目标去重，但删除列表保留每条独立引用。等待服务器精确撤销成功后再更新标记；失败保留可重试菜单，同处其它引用与普通贴纸不受影响。归档后关系撤销，恢复会话不复活旧引用。

关联笔记气泡通过 conversation.input.dock 挂载。展示只读取链接元数据；点击“引用到本轮”才准备材料、核对当前会话并调用 Core。此路径直接绑定实例/会话/引用集，绕过自动领取队列。详见 [笔记直接引用合同](../obsidian-companion/interfaces/knowledge.md)。

入口：[会话选择](../../../../../../dsh-session-sticker-board/src/client/knowledge-panel.tsx)、[来源标记](../../../../../../dsh-session-sticker-board/src/client/source-markers.ts)、[关联笔记](../../../../../../dsh-session-sticker-board/src/client/linked-notes.tsx)。
