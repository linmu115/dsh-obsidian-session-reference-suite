---
id: MOD-sticker
kind: module
title: Sticker Board：普通贴纸与关联笔记
status: current
summary: 普通贴纸、迁移和 Obsidian 双向链接；会话贴纸与来源标记已迁至 ThoughtDAG。
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
    record_id: IF-vault-binding
  reason: 计划接入按 Vault 路由和绑定修订
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
    record_id: IF-extension
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
  reason: 结构真源
---

# Sticker Board：普通贴纸与关联笔记

普通贴纸使用 Markdown、标签和红色符号，保留旧数据迁移及 Obsidian 双向链接。会话贴纸和蓝色来源标记自本轮起由 ThoughtDAG 提供。参见 [普通贴纸与镜像](ordinary.md)、[关联笔记与迁移边界](session-links.md)。

Annotation Core 提供气泡与引用动作，详见 [接入 Core](integrations/core.md)。Maintenance 提供会话身份和已迁入结构，详见 [接入 Maintenance](integrations/maintenance.md)。Lifecycle 提供外部 Bridge 挂载和重试，契约为 [Lifecycle 接口](../bridge-lifecycle/interface.md)；Companion 提供笔记打开、关联及回链。

## 扩展与可替换部分

Better Sidebar 是可选详情容器，缺失可用浮层。ThoughtDAG 是可选主干图 UI，当前 sources 未包含其仓库；只记录与 Suite 的接口依赖，不重建其内部模块。普通贴纸本地保存和已迁移结构写入的要求不同，Bridge 离线不等于 Maintenance 可写。

## 共享协议接入

[[INT-sticker-protocol]]说明本组件实际消费哪些控制、数据及 Annotation 2 出口，返回 [[MOD-protocol|提供方接入目录]]。

## 绑定改造的影响（当前实现，组合验证进行中）

[[REQ-vault-instance-binding]] 与 [[IF-vault-binding]] 要求普通贴纸和关联笔记按 Vault 路由，实例取消工作区同步时保留链接并显示原因。已托管对象不恢复旧副本写入。沿用 [[DEC-selection-ownership-20260918]]，本任务不把会话贴纸和跨会话入口从 ThoughtDAG 移回 Sticker。

当前实现状态：[[IMP-vault-binding-routing]]；分阶段验证与未结项：[[VER-vault-binding-implementation]]。未来通用直连操作仍 deferred。
