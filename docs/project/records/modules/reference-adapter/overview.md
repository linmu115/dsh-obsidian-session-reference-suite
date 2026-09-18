---
id: MOD-reference
kind: module
title: Reference Adapter：把 Obsidian 来源接入 Core
status: current
summary: Host 来源协作和浏览器领取分别维护；相同引用身份贯穿 Core 与 Companion。
sources:
- path: ../../../dsh-obsidian-reference-adapter/README.md
  role: current-workspace-source
- path: ../../../dsh-obsidian-reference-adapter/src/index.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-reference-adapter/src/client/index.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-reference-adapter/README.md
  heading: 使用流程
  role: original-module-authority
aliases:
- Reference Adapter：笔记引用入口
relations:
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

# Reference Adapter：把 Obsidian 来源接入 Core

它把 obsidian-note 接入共享 Core，同时消费 Lifecycle 和 Companion。边界分成 [Host 来源准备与删除](host.md)、[Client 定向领取与导航](client.md)：前者可以在浏览器关闭后继续完成删除，后者负责当前页面和目标会话。

配置 profile 与 Core/Lifecycle/Maintenance 一致；bridgeOrigin 默认继承 Lifecycle。接入的唯一合同分别是 [Core Host](../annotation-core/interfaces/host.md)、[Core Client](../annotation-core/interfaces/client.md)、[Lifecycle](../bridge-lifecycle/interface.md) 与 [Companion 引用交接](../obsidian-companion/interfaces/references.md)。

提供方合同不复制到 Adapter；本模块的接入细节集中于 [接入 Core](integrations/core.md)。删除关系不删除会话或笔记，Companion 的标记清理再按共享使用方判断。

## 共享协议接入

[[INT-reference-protocol]]说明本组件实际消费哪些控制、数据及 Annotation 2 出口，返回 [[MOD-protocol|提供方接入目录]]。
