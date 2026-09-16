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
  reason: 本次地图检查
---


# 当前工作区：组件版本与适用边界



适用宿主为 DSH 0.1.5-rc.2。以下版本直接核对 Suite [成员清单](../../../../suite.members.json)；协议为 Annotation 2 / Lifecycle 3 / Sticker 1。



| 组件 | 当前声明版本 |
| --- | --- |
| Suite | 0.3.4-rc2.18 |
| Annotation Core | 0.3.12-rc2.12 |
| Lifecycle | 0.3.3-rc2.16 |
| Reference Adapter | 0.3.4-rc2.16 |
| Sticker Board | 0.7.3-rc2.18 |
| Protocol | 0.3.3-rc2.1 |
| Companion | 0.6.4-rc2.6 |



Maintenance 工作区 README 的 Engine / 插件为 0.1.33-rc2.26 / 0.2.26-rc2.22；Sticker README 的“本轮验收版本”仍列较早 0.1.33-rc2.19 / 0.2.26-rc2.15。地图保留这项差异，不能推出新组合已完成联合实测。ThoughtDAG 两处版本也不同，且本次未核对其源码，未将旧配套值当成当前唯一版本。



旧 Suite 生命周期报告为 rc2.15 组合，不能当 rc2.18 的新执行回执。Companion 同版本号曾有后续修复构建，因此复现应核对构件哈希。本次未扩展核查 Protocol 独立源码、安装构件或真实运行回执。



本次修复工作区内原有地图，未安装、构建或测试产品插件，未部署、操作真实会话/Vault或调用模型。正文功能为资料与必要源码观察，不把版本列表或地图检查视为功能验收。来源验证与本次地图验证分别见 [历史证据范围](../verification/source-evidence.md)、[[VER-map-repair|本次地图检查]]。
