---
id: INT-sticker-maintenance
kind: integration
title: Sticker Board 接入 Maintenance
status: current
summary: 真实会话身份、会话贴纸和已迁入贴纸由外部真源提供，UI 保留未确认编辑。
sources:
- path: ../../../dsh-session-sticker-board/README.md
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/knowledge.ts
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/linked-notes.tsx
  role: current-workspace-source
relations:
- relation: consumes
  to:
    record_id: IF-extension
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
  reason: 贴纸
  reasons:
  - 贴纸
  - stickers 及知识对象
  - 逻辑身份与真实会话
---

# Sticker Board 接入 Maintenance

外部提供方为 [Session Maintenance](../../../dependencies/session-maintenance/overview.md)，接入点为 [[EXT-maintenance|业务扩展和知识操作]]。Sticker 消费身份解析、工作区/会话目录、stickers 和 obsidian-links 相关操作；Core 负责引用，图关系由对应领域服务核验。

Sticker 的维护范围是选择器、会话入口、标记与关系管理界面。可信宿主保留 Engine 凭据，浏览器通过授权路由，不能提交可执行 Adapter。实例/profile/版本/写入者配置必须一致；冲突与断线保留未确认编辑。

旧贴纸迁移只对明确选定会话执行；引擎侧已迁入对象不再由浏览器缓存强行覆盖。源码消费者入口 [知识请求](../../../../../../../dsh-session-sticker-board/src/client/knowledge.ts) 与 [笔记链接](../../../../../../../dsh-session-sticker-board/src/client/linked-notes.tsx)；提供方版本以 [当前组合](../../../implementation/cohort.md) 的差异说明为准。
