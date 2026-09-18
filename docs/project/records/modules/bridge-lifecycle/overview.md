---
id: MOD-lifecycle
kind: module
title: Lifecycle：连接租约与外部挂载
status: current
summary: 连接身份与连接附属工作分层管理；离线时保留 Core 和持久业务数据。
sources:
- path: ../../../dsh-obsidian-bridge-lifecycle/README.md
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/api.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/runtime.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/index.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/client.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/README.md
  heading: 它负责什么
  role: original-module-authority
aliases:
- Lifecycle：连接与认领身份
relations:
- relation: provides
  to:
    record_id: IF-lifecycle
  reason: 连接服务提供方
  reasons:
  - 连接服务提供方
  - 就绪连接和诊断
- relation: consumes
  to:
    record_id: IF-companion-reference
  reason: Bridge 状态与租约
  reasons:
  - Bridge 状态与租约
  - Bridge 身份租约
---

# Lifecycle：连接租约与外部挂载

## 实例和 Viewer 连接

宿主取得实际 DSH Web 地址，携带 Launcher 实例和 profile 身份连接 Companion Bridge。运行层观察 bootId，获取并续期租约；Bridge 重启或身份变化使旧附件失效。Web origin 与 Bridge origin 是两个服务地址。

## 附属工作挂载和诊断

mountWhenReady 只在 READY/DEGRADED 挂载外部传输；连接不可用或排空时按注册逆序释放附件。已挂载工作跨异步返回后仍核对 generation 和 bootId，迟到 mount 的 disposer 立即执行。状态来源汇集到 Obsidian 面板，支持按组件 retry。

Core 的宿主存储和本地草稿不由此生命周期卸载。外部连接可恢复，不意味着已迁入 Maintenance 的结构能绕过后端离线写入。

## 提供接口与已知接入

[连接与挂载合同](interface.md) 唯一维护公共 API。[Reference Adapter](../reference-adapter/overview.md) 注册 Host 删除轮询与 Client 投递连接；[Sticker](../sticker-board/overview.md) 注册 Bridge 贴纸/导航同步。源码入口为 [运行状态与附件队列](../../../../../../dsh-obsidian-bridge-lifecycle/src/runtime.ts)、[Host 入口](../../../../../../dsh-obsidian-bridge-lifecycle/src/index.ts) 与 [浏览器配置入口](../../../../../../dsh-obsidian-bridge-lifecycle/src/client.ts)。

## 共享协议接入

[[INT-lifecycle-protocol]]说明本组件实际消费哪些控制、数据及 Annotation 2 出口，返回 [[MOD-protocol|提供方接入目录]]。
