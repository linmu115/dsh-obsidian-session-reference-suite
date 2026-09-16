---
id: MOD-core
kind: module
title: Annotation Core：共享引用基础
status: current
summary: 消费插件共享一份气泡、提交事务和历史详情；Core 没有独立侧栏或画布。
sources:
- path: ../../../dsh-annotation-core/README.md
  role: current-workspace-source
- path: ../../../dsh-annotation-core/src/public/client-api.ts
  role: current-workspace-source
- path: ../../../dsh-annotation-core/src/public/host-api.ts
  role: current-workspace-source
- path: ../../../dsh-annotation-core/README.md
  heading: 与其他组件的职责
  role: original-module-authority
aliases:
- Annotation Core：引用事务与上下文
relations:
- relation: contains
  to:
    record_id: MOD-core-context
  reason: 固定来源读取层
  reasons:
  - 固定来源读取层
  - 固定授权与原生执行边界
- relation: provides
  to:
    record_id: IF-core-client
  reason: 唯一提供方
  reasons:
  - 唯一提供方
  - 前端公共能力
- relation: provides
  to:
    record_id: IF-core-host
  reason: Host 约定由 Core 定义
  reasons:
  - Host 约定由 Core 定义
  - 宿主来源与删除能力
- relation: contains
  to:
    record_id: MOD-core-submit
  reason: 不同提交生命周期
  reasons:
  - 不同提交生命周期
  - 共享基础内的事务层
- relation: contains
  to:
    record_id: MOD-core-sources
  reason: 来源扩展边界
  reasons:
  - 来源扩展边界
  - 统一来源扩展
- relation: provides
  to:
    record_id: IF-core-directory
  reason: 宿主只读目录
  reasons:
  - 宿主只读目录
  - 目录仍属于 Core；镜像不接管事务
- relation: references
  to:
    project_id: 9b066b81-bb0e-4c2a-b528-56c24499f886
    record_id: IF-integration
  reason: ThoughtDAG 自己维护接入合同；本次未重审其全部调用
---

# Annotation Core：共享引用基础

Core 提供统一气泡、注解、历史详情及目标会话里的读取工具。Sidechat、Sticker 和 ThoughtDAG 是入口或展示消费者；Core 本身没有独立侧栏或画布。

## 内部维护边界

- [输入框与持久提交](submission.md)：保留草稿、并发版本、持久回执和后台清理。
- [来源 Adapter 注册](source-adapters.md)：Host 准备/回链与 Client 打开来源，双方权限不同。
- [固定上游与上下文工具](context.md)：维护获准来源读取及原生材料释放。
- [轻量目录](../../../../../../dsh-annotation-core/docs/changes/2026-09-15-reference-directory-mirror.md)：独立只读边界，提供方合同保留在 Core 文档。

## 已知接入者

| 接入者 | 使用能力 | 状态与回到接入说明 |
| --- | --- | --- |
| Reference Adapter | obsidian-note 来源注册、添加/补偿、后台删除 | 当前源码核实；[接入 Core](../reference-adapter/integrations/core.md) |
| Sticker Board | 跨会话引用、来源引用动作与关联笔记气泡 | 当前源码与 README 核实；[接入 Core](../sticker-board/integrations/core.md) |
| Maintenance | 有界引用目录与持久变更通知 | 文档及公开类型核实；[镜像接入](../../dependencies/session-maintenance/core-directory-consumer.md) |
| Sidechat / ThoughtDAG | 跨会话选择与图关系动作 | README 确认的消费者；本次未扩大核查其全部调用，ThoughtDAG 接入由独立地图维护 |

本目录是已核实范围，不是全局消费者扫描结果。接口变更从 [Client API](interfaces/client.md)、[Host API](interfaces/host.md) 或 [目录合同](../../../../../../dsh-annotation-core/docs/changes/2026-09-15-reference-directory-mirror.md) 出发，核对相应消费者及版本。
