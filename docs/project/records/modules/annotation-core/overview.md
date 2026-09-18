---
id: MOD-core
kind: module
title: Annotation Core：引用状态、提交、上下文与通用 UI
status: current
summary: 通用共享引用基础：状态与事务、上下文注入、统一气泡与历史详情、来源扩展。
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
    record_id: IF-suite-consumer
  reason: ThoughtDAG 维护自己的接入说明，本图按稳定项目和条目 ID 引用
- relation: contains
  to:
    record_id: MOD-core-ui
  reason: 共享UI及输入框绑定
- relation: provides
  to:
    record_id: IF-core-annotation-protocol
  reason: Annotation 2 模型唯一提供方
- relation: implements
  to:
    record_id: REQ-suite-boundary
  reason: Core 保留完整通用职责
---

# Annotation Core：引用状态、提交、上下文与通用 UI

Core 提供统一气泡、注解、历史详情及目标会话里的读取工具。Sidechat、Sticker 和 ThoughtDAG 是入口或展示消费者；Core 本身没有独立侧栏或画布。

## 内部维护边界

- [[MOD-core-ui|通用引用 UI 与输入框绑定]]：统一气泡、注解编辑、历史详情和引用定位。
- [[IF-core-annotation-protocol|Annotation 2 协议]]：引用对象、捕获、快照与生命周期消息的唯一模型。

- [输入框与持久提交](submission.md)：保留草稿、并发版本、持久回执和后台清理。
- [来源 Adapter 注册](source-adapters.md)：Host 准备/回链与 Client 打开来源，双方权限不同。
- [固定上游与上下文工具](context.md)：维护获准来源读取及原生材料释放。
- [轻量目录](../../../../../../dsh-annotation-core/docs/changes/2026-09-15-reference-directory-mirror.md)：独立只读边界，提供方合同保留在 Core 文档。

## 已知接入者

| 接入者 | 使用能力 | 状态与回到接入说明 |
| --- | --- | --- |
| Reference Adapter | obsidian-note 来源注册、添加/补偿、后台删除 | 当前源码核实；[接入 Core](../reference-adapter/integrations/core.md) |
| Sticker Board | 跨会话引用、来源引用动作与关联笔记气泡 | 当前源码与 README 核实；[接入 Core](../sticker-board/integrations/core.md) |
| Maintenance | 有界引用目录与持久变更通知 | 文档及公开类型核实；[[INT-maintenance-directory|镜像接入]] |
| ThoughtDAG | 创建固定引用、准备合法入向引用、解除关系与打开已有注释 | 独立地图核对了当前调用；[[EXT-thoughtdag|ThoughtDAG 接入入口]] |
| Sidechat | DSH 来源添加、跨会话选择、嵌入输入框/历史、回答回链与添加保护 | 0.4.7-rc2.12 源码核实；[[EXT-sidechat|独立地图与接入入口]] |

本目录是已核实范围，不是全局消费者扫描结果。接口变更从 [Client API](interfaces/client.md)、[Host API](interfaces/host.md) 或 [目录合同](../../../../../../dsh-annotation-core/docs/changes/2026-09-15-reference-directory-mirror.md) 出发，核对相应消费者及版本。

## Codex 执行器接入

[[INT-core-codex-runtime|预算、实时用量与受管工具接入]] 分别描述直接调用范围；[[IF-core-input-acceptance|输入接收扩展口]] 的定义归 Core，执行器只提供准确接收判断。

## 2026-09-18 引用交互修订

数量气泡、悬停列表、评论明确保存与仅引用发送见 [实现与验收](../../implementation/reference-ui-20260918.md)。原文只读；选错时删除并重选。

## 原生划选入口

0.3.12-rc2.19 起，Core 独立安装主会话选区捕获及唯一划选菜单，原生提供会话内引用，不依赖 Sidechat 或 Better Sidebar。消费者通过 native-selection-actions-v1 注册并注销动作，合同见源码 docs/native-selection-actions.md。
