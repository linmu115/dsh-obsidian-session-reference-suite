---
id: MOD-core-context
kind: module
title: Core / 固定上游与原生上下文
status: current
summary: 维护固定版本和完成截止内的按需读取，借助 Maintenance 核验实际释放。
sources:
- path: ../../../dsh-annotation-core/README.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-15-native-agent-context-management.md
  role: current-workspace-source
relations:
- relation: consumes
  to:
    record_id: EXT-business-adapters
  reason: 专门领域能力
- relation: consumes
  to:
    record_id: EXT-harness-adapters
  reason: 间接依赖稳定来源与原生持久证据
- relation: implements
  to:
    record_id: CUT05
  reason: 不扩大旧上限
- relation: implements
  to:
    record_id: NC02
  reason: 授权窗口材料分离
- relation: implements
  to:
    record_id: NC07
  reason: 原生范围
- relation: consumes
  to:
    record_id: EXT-maintenance
  reason: 固定来源和权威状态
---

# Core / 固定上游与原生上下文

跨会话引用固定来源版本和已完成回复截止。首次准备优先包含被引用回复所在问答，长材料给出未读范围和继续位置；更早上下文通过上游 read/search 工具读取。历史记录不递归全量复制。

图接续先查询权威关系。合法已提交关系可以恢复轻量读取授权，保留原版本与截止；Core 不伪造原提交回执。归档、删除或撤销停止后续披露，未知状态和断线保留待核查状态。

原生 DSH 工具管理当前会话的图、请求索引、窗口、来源状态、保留标记与材料。释放先 pending-next-step，再由下一次 pre-step 写入原生 replace 事件；Maintenance 核验持久证据后才 applied。当前新增释放不覆盖 Codex 托管引擎。

看 [当前实现与限制](../../implementation/context.md) 了解能力停用时的阻断和预算；看 [平台 Adapter](../../dependencies/session-maintenance/harness-adapters.md) 了解宿主持久证据责任。
