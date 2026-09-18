---
id: EXT-thoughtdag
kind: dependency
title: 外部消费者：ThoughtDAG
status: current
summary: 会话主干图在独立项目维护；此处只保留 Core 消费关系与稳定入口。
relations:
- relation: references
  to:
    record_id: IF-suite-consumer
    project_id: 9b066b81-bb0e-4c2a-b528-56c24499f886
  reason: Core 与图权威服务的具体接入由消费者维护
sources:
- path: ../../../../../repositories/thoughtdag/docs/project/records/interface/IF-integration.md
---

# 外部消费者：ThoughtDAG

ThoughtDAG 项目 ID 为 9b066b81-bb0e-4c2a-b528-56c24499f886，消费说明 IF-suite-consumer 由该独立地图维护。独立地图源码核对说明其使用 Core 的 addCrossSessionReference、prepareGraphReferences、resolveReferenceLink / deleteReferenceLink、openAnnotationInSession，以及 Maintenance 的图领域服务，是独立消费者，不是 Bridge 内部模块。

用户当前明确 Core + ThoughtDAG 直接实现跨会话引用和会话贴纸，ThoughtDAG 维护会话来源关系；普通 Sticker 不拥有这些业务。

Core 的提供方入口为 [[IF-core-client]] / [[IF-core-host]]；主干图交互、画布数据和对方运行方式由独立地图维护。本次未遍历其全部调用，也不从 README 的消费者名单推断所有画布动作都直接调用 Core。
