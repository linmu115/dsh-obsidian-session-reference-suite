---
id: IF-lifecycle
kind: interface
title: Lifecycle 合同：就绪挂载、排空与重试
status: current
summary: 消费者注册一段连接工作并返回释放函数；Lifecycle 根据当前 Bridge 状态启停。
sources:
- path: ../../../dsh-obsidian-bridge-lifecycle/src/api.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/runtime.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-reference-adapter/src/index.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-reference-adapter/src/client/index.ts
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/index.tsx
  role: current-workspace-source
---

# Lifecycle 合同：就绪挂载、排空与重试

提供方 Lifecycle 将当前 Bridge 地址、运行身份和就绪状态交给消费者。消费者注册命名 mount 回调并返回 disposer；Lifecycle 在可用连接上挂载，在断线、排空、重启或撤销注册时释放。

例：Adapter 注册引用删除轮询，Bridge 断线后轮询停止；Core 保留持久删除作业，恢复后重新挂载并重试。调用方可订阅快照、提交健康状态、请求 drain/resume 或针对某组件 retry。

参数与类型以 [ObsidianBridgeLifecycle](../../../../../../dsh-obsidian-bridge-lifecycle/src/api.ts) 为唯一合同，状态/逆序实现以 [runtime.ts](../../../../../../dsh-obsidian-bridge-lifecycle/src/runtime.ts) 为依据。改变就绪判定、释放顺序或身份格式会影响 Adapter 与 Sticker，不能仅测试单个连接对象。

已知接入者与返回：[Adapter 的 Host/Client 挂载](../reference-adapter/overview.md)、[Sticker 的外部同步](../sticker-board/overview.md)；提供方介绍在 [Lifecycle 模块](overview.md)。
