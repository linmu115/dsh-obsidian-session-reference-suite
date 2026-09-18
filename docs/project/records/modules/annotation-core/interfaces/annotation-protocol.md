---
id: IF-core-annotation-protocol
kind: interface
title: Core Annotation 2 合同：引用捕获与生命周期消息
status: current
summary: Annotation Core 拥有新引用类型，Bridge Protocol 不复制它的模型。
sources:
- path: ../../../dsh-annotation-core/src/protocol/schema.ts
  role: source-reviewed-2026-09-16
- path: ../../../dsh-annotation-core/src/protocol/index.ts
  role: source-reviewed-2026-09-16
relations: []
---

# Core Annotation 2 合同：引用捕获与生命周期消息

提供方 Core 的 /protocol 出口定义 DSH/Obsidian 来源、定位、快照、捕获、claim、refresh、backlink 和删除消息及序列化辅助函数。消费者交付待解析的消息，得到符合 Annotation 2 的对象或失败；格式通过不表示 Core 已准备、已持久提交或已写回来源。

例：Companion 捕获笔记，Adapter 携引用与目标身份 claim；真正进入 sent 仍由 Core 提交事务决定。跨应用共享声明不会把状态数据库或 Vault 写权限转给协议库。

完整技术合同以 [Core schema.ts](../../../../../../../dsh-annotation-core/src/protocol/schema.ts) 和 [公开出口](../../../../../../../dsh-annotation-core/src/protocol/index.ts) 为唯一权威。[[IF-protocol-control]]的 Lifecycle 3 与[[IF-protocol-data]]的 Sticker 1 是另外两套协议版本。

## 已知接入与返回

[[INT-reference-protocol|Reference Adapter]]消费新引用生命周期类型；[[INT-lifecycle-protocol|Lifecycle transport]]校验跨应用新引用消息；[[INT-sticker-protocol|Sticker]]使用引用/删除类型；[[INT-companion-protocol|Companion]]使用并扩展稳定目标形状。具体可选字段、严格校验与兼容行为须核对对应消费文件，不由包版本一致自动推断兼容。

运行时方法归 [[IF-core-client]] / [[IF-core-host]]；HTTP 操作实现归 [[IF-companion-reference]]。返回 [[MOD-core|Core 目录]]。
