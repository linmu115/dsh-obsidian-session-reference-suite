---
id: IMP-cohort
kind: implementation
title: 当前工作区：组件版本与适用边界
status: current
summary: 以工作区 Suite 成员清单为组合事实；历史报告与当前声明之间的版本差异分别保留。
progress: implemented
gap: 未在本次任务验证目标实例安装、模型交付和整套实际运行兼容性。
sources:
- path: ../../suite.members.json
  role: current-workspace-source
- path: ../../README.md
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/README.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/README.md
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/docs/2026-09-14-shared-marker-cleanup.md
  role: current-workspace-source
- path: ../2026-09-15-graph-reference-lifecycle-cohort.md
  role: current-workspace-source
relations:
- relation: implements
  to:
    record_id: MOD-suite
  reason: 记录组合实际声明
- relation: qualified_by
  to:
    record_id: VER-source-evidence
  reason: 源报告适用版本
- relation: qualified_by
  to:
    record_id: VER-map-repair
  reason: 历史地图检查
- relation: qualified_by
  to:
    record_id: VER-vault-binding-implementation
  reason: 当前候选的构建与分阶段组合验证
---

# 当前工作区：组件版本与适用边界

适用宿主为 DSH 0.1.5-rc.2。以下为当前单桥产品候选；开发源码见 [成员清单](../../../../suite.members.json)，不能把开发依赖当安装项；基础协议仍为 Annotation 2 / Lifecycle 3 / Sticker 1，显式 Vault 绑定另外要求 bindingProtocolVersion 1 和对应能力声明。

| 组件 | 当前候选版本 | 组合身份 |
| --- | --- | --- |
| Annotation Core | 0.3.12-rc2.19 | 通用引用事务与补偿 |
| DSH Obsidian Bridge (`dsh-obsidian-bridge`) | 0.4.1-rc2.1 | 唯一桥安装项，整合连接、来源接入、绑定及多 Vault 路由 |
| Sticker Board | 0.7.4-rc2.3 | 普通贴纸及笔记关联业务，共享 Bridge 通道 |
| Bridge Protocol（内部依赖） | 0.4.0-rc2.1 | 两侧共享合同，用户不单独安装或启用 |
| Obsidian Companion | 0.7.0-rc2.1 | Vault 绑定唯一写入口、来源及回链回执 |

可选 Session Maintenance 当前候选为 Engine **0.1.33-rc2.38**、DSH 维护插件 **0.2.26-rc2.29**。该项目独立维护分类工作区策略、运行快照与公共信息页；缺席不阻断基础绑定、路由与引用，已托管数据仍不得回退到旧副本写入。

Suite 不再是可安装插件，旧 Adapter 退役。Profile 独立加载 Core、Bridge、Sticker 各一次，以服务发现支持可选与晚加载；新包本地验证已由主任务回报：Bridge 102、Sticker 123、Suite 21 项通过；Suite 源码为 2480db1，Maintenance 精确门禁修复 2e84ec3 另有 32 项及类型/构建检查通过；构件、安装前备份与部署边界见 [[VER-single-bridge-delivery]]。

此前内部整合、绑定与维护接入已完成 TypeScript 检查、构建和合成验证；该证据适用上一轮包名和版本，不自动证明本轮单桥产品已验收。当前实现见 [[IMP-bridge-consolidation]]、[[IMP-vault-binding-routing]]；各组件及 Suite 的测试数字、提交和覆盖边界见 [[VER-vault-binding-implementation]]。Maintenance 的分组验证见其 [范围与公开信息页验证记录](../../../../../dsh-session-maintenance/docs/project/records/verification/scope-business-pages.md)。各组可能交叠，不相加为统一总测试数。

本记录的文档刷新未部署或重启用户实例、改写真实 Vault/会话或调用模型；真实 DSH / Obsidian 窗口交互与新包安装结果由本轮验收记录续填。版本列表、地图校验和本地构件指纹不能代替这些验证。

旧 Suite 生命周期、Graph 与其他历史报告保留各自原版本和执行时点，不作为当前候选的新执行回执。Companion 曾在同版本下产生后续修复构建，复现还应核对构件哈希。历史证据边界见 [[VER-source-evidence]]，历史地图修复见 [[VER-map-repair]]；当前组合以本记录链接的实现与验证为准。
