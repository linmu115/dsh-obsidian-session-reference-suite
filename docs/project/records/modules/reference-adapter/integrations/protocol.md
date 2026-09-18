---
id: INT-reference-protocol
kind: integration
title: Reference Adapter 接入协议与来源合同
status: current
summary: 具体说明本组件消费的协议出口和自身适配责任。
sources:
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/protocol.ts
  role: source-reviewed-2026-09-16
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/client/annotation-consumer.ts
  role: source-reviewed-2026-09-16
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/host/obsidian-source-adapter.ts
  role: source-reviewed-2026-09-16
relations:
- relation: consumes
  to:
    record_id: IF-core-annotation-protocol
  reason: 源码核实的协议消费
---

# Reference Adapter 接入协议与来源合同

Adapter 的 protocol.ts 从 [[IF-core-annotation-protocol]] 导入并转导出 Annotation 2 捕获、claim、refresh、提交和删除类型；Client 领取事务与 Host 来源回调使用这些类型。[[INT-reference-core]]说明添加、补偿和来源注册等运行时调用。

同一文件转导出 [[IF-protocol-data]]，这是已核实的编译依赖；本次不把转导出写成每项功能都直接调用数据校验器。Lifecycle 提供传输/连接，Companion 提供 [[IF-companion-reference]] HTTP 行为。格式校验、页面认领、Core 持久提交各自有负责方。

源码入口：[protocol.ts](../../../../../../../dsh-obsidian-bridge-lifecycle/src/reference/protocol.ts)、[annotation-consumer.ts](../../../../../../../dsh-obsidian-bridge-lifecycle/src/reference/client/annotation-consumer.ts)、[obsidian-source-adapter.ts](../../../../../../../dsh-obsidian-bridge-lifecycle/src/reference/host/obsidian-source-adapter.ts)。

返回 [[MOD-protocol|共享协议接入目录]]；Annotation 2 返回 [[IF-core-annotation-protocol]]。
