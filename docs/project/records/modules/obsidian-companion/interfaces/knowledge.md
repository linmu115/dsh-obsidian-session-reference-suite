---
id: IF-companion-knowledge
kind: interface
title: Companion 合同：笔记关联的直接引用
status: current
summary: 显示关联只读元数据；用户显式点击后才核对材料并绑定当前会话回执。
sources:
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/linked-reference.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/main.ts
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/linked-notes.tsx
  role: current-workspace-source
- path: ../2026-09-14-linked-note-rail.md
  role: current-workspace-source
relations:
- relation: implements
  to:
    record_id: REQ-linked-note
  reason: 直接目标绑定
---

# Companion 合同：笔记关联的直接引用

提供方 Companion 通过 Bridge 知识操作处理 note-open、link-reference-prepare 与 link-reference-commit。Sticker 交付链接对象、操作身份和明确的 native/logical session/profile，得到有界笔记材料与 referenceId；Core addReference 后再把 setId 回执保存到 Companion。

这个协议服务“引用到本轮”，不进入自动 capture 队列。展示关联或 note-open 不传正文给模型。来源不唯一、关联已解除、实例/profile/会话变化或材料超限会拒绝；未完成准备只短暂保存在内存。添加后失败用 Core 补偿，不伪造已提交消息。

权威实现入口是 [来源准备与目标校验](../../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/linked-reference.ts) 及 [知识操作接入](../../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/main.ts)，消费方实际顺序在 [关联气泡](../../../../../../../dsh-session-sticker-board/src/client/linked-notes.tsx)。本页解释交接，具体字段保持在提供方源码一处。

已知接入：[Sticker 直接引用](../../sticker-board/integrations/core.md)；返回 [Companion 接口目录](../overview.md)。共享知识结构的写入约定仍在 [[EXT-maintenance|Maintenance]]。
