---
id: EXT-sidechat
kind: integration
title: Sidechat 独立地图与 Core 接入
status: current
summary: Sidechat 单独维护侧聊并向 Core 注册侧聊动作；直接消费 Core 的部分客户端能力，属于外部项目。
relations:
- relation: references
  to:
    project_id: 25fd2611-cf80-4bef-8900-984f9376b28d
    record_id: INT-core
  reason: 消费方维护具体调用范围；合同唯一保留在本项目的 IF-core-client
- relation: references
  to:
    record_id: IF-core-client
  reason: Core 是公共客户端能力的提供方
---

# Sidechat 独立地图与 Core 接入

Sidechat 已按用户指定建立独立项目地图，稳定项目 ID 为 `25fd2611-cf80-4bef-8900-984f9376b28d`，消费方说明为 `INT-core`。它不属于本 Suite 的内部组件，也不并入 ThoughtDAG。

本次对照 Sidechat 0.4.7-rc2.12 的源码，核实了普通 DSH 来源添加、跨会话目标选择、嵌入输入框与历史、回答回链、fence/discard/pending-state 核对。完整调用范围与消费者源码入口由其独立地图维护。

[[IF-core-client|提供方合同]] 仍只维护一份；本页不另写反向 consumes 关系，系统目录从 Sidechat 的实际声明派生消费者。与 DAG / Maintenance 的间接关联也留在对应接入说明中。

当前配套 0.4.7-rc2.14：通用选区与菜单迁至 Core，跨会话入口迁至 ThoughtDAG，Sidechat 仅注册侧聊动作。旧版本调用核查保留为历史依据。
