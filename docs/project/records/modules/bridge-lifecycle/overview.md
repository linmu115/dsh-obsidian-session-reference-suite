---
id: MOD-lifecycle
kind: module
title: DSH Bridge：连接、引用交接与维护
status: current
summary: 单一 dsh-obsidian-bridge 产品统一原桥接层、绑定路由、动作分派、引用交接、桥管理与未来专用通道。
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
    record_id: IF-vault-binding
  reason: 双侧绑定设计入口；当前实现与组合验证见 IMP-vault-binding-routing
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

# DSH Bridge：连接、引用交接与维护

当前产品为 `dsh-obsidian-bridge@0.4.1-rc2.1`。旧 `dsh-obsidian-bridge-lifecycle` 物理目录及 `obsidianBridgeLifecycle` 服务名保留兼容；它们不是另一安装项。原 Adapter 已内置，Suite 不再创建运行父组。Core、普通 Sticker 与可选 Maintenance 独立，通过 Cordis 服务处理晚加载及卸载；新包验收见 [[VER-single-bridge-delivery]]。

## 实例和 Viewer 连接

宿主取得实际 DSH Web 地址，携带 Launcher 实例和 profile 身份连接 Companion Bridge。运行层观察 bootId，获取并续期租约；Bridge 重启或身份变化使旧附件失效。Web origin 与 Bridge origin 是两个服务地址。

## 附属工作挂载和诊断

mountWhenReady 只在 READY/DEGRADED 挂载外部传输；连接不可用或排空时按注册逆序释放附件。已挂载工作跨异步返回后仍核对 generation 和 bootId，迟到 mount 的 disposer 立即执行。状态来源汇集到 Obsidian 面板，支持按组件 retry。

Core 的宿主存储和本地草稿不由此生命周期卸载。外部连接可恢复，不意味着已迁入 Maintenance 的结构能绕过后端离线写入。

## 提供接口与已知接入

[连接与挂载合同](interface.md) 唯一维护公共 API。[内部引用接入](../reference-adapter/overview.md) 注册 Host 删除与 Client 领取处理者；[Sticker](../sticker-board/overview.md) 注册普通导航业务并借用共享传输。统一 action channel 持有队列和确认责任，普通贴纸不再维护独立轮询。源码入口为 [运行状态与附件队列](../../../../../../dsh-obsidian-bridge-lifecycle/src/runtime.ts)、[Host 入口](../../../../../../dsh-obsidian-bridge-lifecycle/src/index.ts) 与 [浏览器配置入口](../../../../../../dsh-obsidian-bridge-lifecycle/src/client.ts)。

## 共享协议接入

[[INT-lifecycle-protocol]]说明本组件实际消费哪些控制、数据及 Annotation 2 出口，返回 [[MOD-protocol|提供方接入目录]]。

## 已实现的绑定与多 Vault 路由

[[REQ-vault-instance-binding]] 要求一 Vault 至多绑定一个实例，并由本模块自登记当前端点、按 vaultId 管理多个连接。[[IF-vault-binding]] 将稳定实例身份与端口、bootId、租约分开；继续从宿主取得实际端口和有效 Viewer 地址，重启换端口无需改绑。单 Vault 断开只释放对应附件。Maintenance 接入与 Launcher 发现都属于可选能力。

当前实现状态：[[IMP-vault-binding-routing]]；分阶段验证与未结项：[[VER-vault-binding-implementation]]。未来专用通道继续归同一个桥插件；通用笔记、模板和样式业务仍后置。
