---
id: MOD-sticker
kind: module
title: Sticker Board：贴纸、会话入口与关联笔记
status: current
summary: 普通贴纸和真实会话入口分别维护；来源标记与关联笔记只是交互视图。
sources:
- path: ../../../dsh-session-sticker-board/README.md
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/index.tsx
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/README.md
  heading: 三种入口
  role: original-module-authority
aliases:
- Sticker Board：三类入口
relations:
- relation: consumes
  to:
    record_id: IF-lifecycle
  reason: 贴纸和导航传输
  reasons:
  - 贴纸和导航传输
  - Bridge 外部附件
- relation: consumes
  to:
    record_id: MOD-lifecycle
  reason: 挂载外部贴纸同步
- relation: contains
  to:
    record_id: INT-sticker-core
  reason: 消费方说明
- relation: contains
  to:
    record_id: INT-sticker-maintenance
  reason: 业务接入
- relation: contains
  to:
    record_id: MOD-sticker-ordinary
  reason: 普通贴纸
  reasons:
  - 普通贴纸
  - Markdown 贴纸生命周期
- relation: contains
  to:
    record_id: MOD-sticker-session
  reason: 真实会话与关系交互
  reasons:
  - 真实会话与关系交互
  - 知识关系 UI
- relation: consumes
  to:
    record_id: IF-core-client
  reason: 统一引用
- relation: consumes
  to:
    record_id: IF-companion-knowledge
  reason: 笔记按需引用
- relation: consumes
  to:
    record_id: EXT-business-adapters
  reason: 结构真源
---

# Sticker Board：贴纸、会话入口与关联笔记

普通贴纸使用 Markdown、标签和红色符号；会话贴纸进入真实原生会话；蓝色符号指出哪些会话引用当前完成回复。三者删除范围不同。内部职责按 [普通贴纸与镜像](ordinary.md)、[会话/来源标记与笔记气泡](session-links.md) 拆分。

Annotation Core 提供气泡与引用动作，详见 [接入 Core](integrations/core.md)。Maintenance 提供会话身份和已迁入结构，详见 [接入 Maintenance](integrations/maintenance.md)。Lifecycle 提供外部 Bridge 挂载和重试，契约为 [Lifecycle 接口](../bridge-lifecycle/interface.md)；Companion 提供笔记打开、关联及回链。

## 扩展与可替换部分

Better Sidebar 是可选详情容器，缺失可用浮层。ThoughtDAG 是可选主干图 UI，当前 sources 未包含其仓库；只记录与 Suite 的接口依赖，不重建其内部模块。普通贴纸本地保存和已迁移结构写入的要求不同，Bridge 离线不等于 Maintenance 可写。
