---
id: OBJ-knowledge
kind: object
title: 贴纸、知识链接与主干图的归属
status: current
summary: 对象可关联多处，但只有一个明确所属逻辑会话；笔记正文留在 Vault。
sources:
- path: ../../../dsh-session-sticker-board/README.md
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/README.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-15-extension-ownership-and-session-reader.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/packages/contracts/src/extension-data.ts
  role: current-workspace-source
relations:
- relation: derived_from
  to:
    record_id: REQ-directory-owner
  reason: 明确归属规则
- relation: governed_by
  to:
    record_id: IF-extension
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
  reason: 业务对象语义
- relation: related
  to:
    record_id: REQ-marker-cleanup
  reason: 共享标记占用
---

# 贴纸、知识链接与主干图的归属

普通贴纸保存 Markdown、标签和选区；会话贴纸保存通往真实会话的入口。笔记链接把 Vault note/block 与逻辑会话联系起来。X → Y 的引用和从 X 创建的会话贴纸 Y 属于 Y，X 作为来源。图以 ownerSessionId 为所属会话，披露记录附属该图。

Maintenance 用 instanceId、profileId、namespace、objectId 隔离扩展对象；写入方和对象版本控制更新。references 数组描述关联，不能取第一项作为 owner。没有明确归属的旧对象进入“待绑定／待核验”；工作区归属跟随真实逻辑会话，不重写扩展正文。

Owned 标记是另一类小型维护对象：Companion 记录自己写入的 dsh-note 块归属和后续清理责任。它不是会话数据，也不因单条关系删除就可以立即清理。

旧伴生贴纸有单独迁移路径；已迁移对象由 Maintenance 管理，兼容旧对象不等于允许两个真源同时无条件写入。
