---
id: MOD-reference
kind: module
title: Bridge 引用接入：把 Obsidian 来源接入 Core
status: current
summary: 原独立 Adapter 已并入 Bridge 内部；Host 与浏览器职责保持分开，旧包仅为兼容入口。
sources:
- path: ../../../dsh-obsidian-reference-adapter/README.md
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/host.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/client.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-reference-adapter/README.md
  heading: 使用流程
  role: original-module-authority
aliases:
- Reference Adapter：笔记引用入口
relations:
- relation: consumes
  to:
    record_id: IF-vault-binding
  reason: 计划接入按 Vault 路由和绑定修订
- relation: consumes
  to:
    record_id: IF-lifecycle
  reason: 引用传输
  reasons:
  - 引用传输
  - 就绪挂载
- relation: consumes
  to:
    record_id: MOD-lifecycle
  reason: 挂载投递与删除
- relation: consumes
  to:
    record_id: IF-companion-reference
  reason: 来源和引用事务交接
  reasons:
  - 来源和引用事务交接
  - 投递与回链
- relation: contains
  to:
    record_id: MOD-reference-client
  reason: 页面和领取事务
  reasons:
  - 页面和领取事务
  - 页面与目标会话绑定
- relation: contains
  to:
    record_id: MOD-reference-host
  reason: 宿主工作
  reasons:
  - 宿主工作
  - 宿主持续工作
- relation: contains
  to:
    record_id: INT-reference-core
  reason: 此为消费方接入说明
- relation: implements
  to:
    record_id: REQ-selection
  reason: 内嵌定向投递
---

# Bridge 引用接入：把 Obsidian 来源接入 Core

此模块现位于 DSH Bridge 内部，把 obsidian-note 接入共享 Core，并使用桥统一的连接与动作分派。原 dsh-obsidian-reference-adapter 包只检查增强桥能力，不再注册来源或轮询；新 Suite 不加载该兼容入口。边界分成 [Host 来源准备与删除](host.md)、[Client 定向领取与导航](client.md)：前者可以在浏览器关闭后继续完成删除，后者负责当前页面和目标会话。

配置统一来自 Bridge，profile 与 Core 及已接入的 Maintenance 一致。接入的唯一合同分别是 [Core Host](../annotation-core/interfaces/host.md)、[Core Client](../annotation-core/interfaces/client.md)、[Lifecycle](../bridge-lifecycle/interface.md) 与 [Companion 引用交接](../obsidian-companion/interfaces/references.md)。

提供方合同不复制到 Adapter；本模块的接入细节集中于 [接入 Core](integrations/core.md)。删除关系不删除会话或笔记，Companion 的标记清理再按共享使用方判断。

## 共享协议接入

[[INT-reference-protocol]]说明本组件实际消费哪些控制、数据及 Annotation 2 出口，返回 [[MOD-protocol|提供方接入目录]]。

## 多 Vault 与可选维护接入（待实现）

依据 [[REQ-vault-instance-binding]]，保留单一 obsidian-note 来源类型，在 Bridge 内按 vaultId 选择连接，覆盖 Host 来源准备、Client 领取与导航、回链和删除；同名笔记不能串入另一 Vault。消费 [[IF-vault-binding]] 以及 [[INT-suite-extension-pages]] 所链接的 Maintenance 有效范围；缺少 Maintenance 时基础原生引用继续运行。
