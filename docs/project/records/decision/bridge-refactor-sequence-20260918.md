---
id: DEC-bridge-refactor-sequence
kind: decision
title: 桥先整合、贴纸保留业务、绑定与维护分期推进
date: 2026-09-18
status: current
progress: in_progress
summary: 用户已明确授权施工；先整合既有桥与引用通道，贴纸保留笔记关联，再依序验收两侧绑定路由与新的维护 Adapter，未来操作后置。
relations:
- relation: derived_from
  to:
    record_id: REQ-integration-complete
  reason: 用户进一步确认职责、先后顺序及不开工边界
- relation: derived_from
  to:
    record_id: DEC-selection-ownership-20260918
  reason: 继续保留普通贴纸及其笔记关联业务
---

# 桥先整合、贴纸保留业务、绑定与维护分期推进

## 本轮确认

用户修正此前建议：笔记关联是普通贴纸的业务，继续保留在 Sticker Board。桥对外暴露共用双向引用通道，普通贴纸自行适配，其他跨 DSH／Obsidian 的业务需要引用时也接入这条通道。Core 仍拥有通用引用状态、提交和补偿。

用户确认纯笔记操作不必经过 Core 引用流程，也不必经过 Maintenance；未来专门操作通道后置，不混入此次既有能力整合。

## 分阶段目标

| 阶段 | 目标 | 验收范围 |
| --- | --- | --- |
| 计划阶段 | 完成职责、任务顺序、兼容迁移、测试及交付计划 | 计划可评审，不视为产品开工 |
| 第一阶段 | 整合 DSH Bridge 的既有能力，普通贴纸重新接入共用通道 | 引用、回链、定位、解除、普通贴纸与笔记关联、当前动态连接及现有 Maintenance 接入继续工作 |
| 第二阶段 | 在 DSH Bridge 与 Obsidian Bridge 实现 Vault／实例绑定与路由 | 一 Vault 至多一实例、一实例多 Vault、目标隔离、动态端口续接、改绑保留历史 |
| 第三阶段 | 补新的 Maintenance 业务 Adapter、扩展信息页与绑定登记 | 调用桥的已有能力，共用实例有效同步范围，两组插件仍可分别运行 |
| 后续阶段 | 再展开 DSH → Obsidian 专门操作通道 | 另行确定具体笔记、模板、样式和面板等能力 |

用户对本轮两项追问均已确认：第一阶段只整合现有能力并保留扩展接口；现有 Maintenance 接入必须保留，新的 Adapter 后置。顺序确定不等于完整实施计划已完成。

## 路由与维护责任

- DSH Bridge 选择目标 Vault 及其当前连接，负责跨宿主交接与运行恢复。
- Obsidian Bridge 核验本 Vault 与已绑定实例的身份，执行本地操作并返回结果；两端共同防止请求串入错误 Vault。
- 有效绑定仍遵循唯一写入与确认机制，不能让两端或 Maintenance 各自生效一份互相覆盖的关系。
- Maintenance 提供会话维护范围、登记、回执和集中管理，调用桥的绑定入口；不接管实际 Vault 路由。
- 新的绑定 Adapter 不接管普通贴纸自身数据。贴纸继续维护自身业务及已有维护接入。

第一阶段可以整理目标上下文与接口位置，保留已经存在的身份字段，避免新通道写死在普通贴纸内部；不提前实现第二阶段的多 Vault 行为。已有维护接入的兼容调整可以随重构发生，新的公开注册与绑定页另阶段验收。

## 实施边界

此前用户要求先核实并等待其下令。2026-09-18 用户已明确下令按需求和执行规划施工，并要求由 Astra 子代理（思考强度不超过 high）分工执行。已进入第一阶段，详见[实施计划](../../../2026-09-18-bridge-implementation-plan.md)。代码、合成测试与本地构件按阶段推进，真实数据迁移和应用部署的完成情况另行记录。

原评估中把笔记关联功能／面板迁入 Bridge 的建议已经撤回，详见 [[EXP-bridge-consolidation]] 的修订；其他已有引用与会话贴纸职责保持。来源与两项选择见 [[HIST-vault-instance-binding]]。
