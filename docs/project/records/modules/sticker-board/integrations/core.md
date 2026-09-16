---
id: INT-sticker-core
kind: integration
title: Sticker Board 接入 Core
status: current
summary: 跨会话引用、来源引用动作和关联笔记气泡使用 Core；普通 Markdown 贴纸的保存与删除由 Sticker workspace 处理。
sources:
- path: ../../../dsh-session-sticker-board/src/client/linked-notes.tsx
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/index.tsx
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/README.md
  role: current-workspace-source
relations:
- relation: consumes
  to:
    record_id: IF-core-client
  reason: 跨会话引用、来源引用动作和关联笔记气泡调用 Core；普通贴纸保存与删除走 Sticker workspace
- relation: consumes
  to:
    record_id: IF-companion-knowledge
  reason: 准备与回执
---

# Sticker Board 接入 Core

契约为 [Core Client API](../../annotation-core/interfaces/client.md)，提供方目录为 [Core 已知接入者](../../annotation-core/overview.md)。会话选区通过 addCrossSessionReference 添加固定上游；来源蓝色标记使用 Core 的引用解析与精确解除能力；关联笔记调用 addReference，把 Companion 准备结果加入当前会话。普通 Markdown 贴纸的保存与删除走 Sticker workspace，不归入这些 Core 引用调用。

关联笔记引用时先从 Maintenance 重读对象与逻辑会话，拒绝已删除或换 owner 的关联；Companion 准备后再确认页面仍处于目标会话。Core 添加或 Companion 写回执失败时使用 discardPendingOperation，补偿包括添加响应丢失的情况。

输入框正文不替换，操作不自动发送。Core 修改能力名、返回身份或操作补偿时，需要核查此路径以及会话来源蓝色标记和图动作；ThoughtDAG 的实际调用范围由其独立地图核对。
