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
    record_id: IF-native-context
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
  reason: 原生生效凭持久证据核验；平台格式是外部间接前置
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
    record_id: IF-graph
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
  reason: 固定来源和权威状态
---

# Core / 固定上游与原生上下文

跨会话引用固定来源版本和已完成回复截止。首次准备优先包含被引用回复所在问答，长材料给出未读范围和继续位置；更早上下文通过上游 read/search 工具读取。历史记录不递归全量复制。

图接续先查询权威关系。合法已提交关系可以恢复轻量读取授权，保留原版本与截止；Core 不伪造原提交回执。归档、删除或撤销停止后续披露，未知状态和断线保留待核查状态。

原生 DSH 工具管理当前会话的图、请求索引、窗口、来源状态、保留标记与材料。释放先 pending-next-step，再由下一次 pre-step 写入原生 replace 事件；Maintenance 核验持久证据后才 applied。当前新增释放不覆盖 Codex 托管引擎。

看 [当前实现与限制](../../implementation/context.md) 了解能力停用时的阻断和预算；看 [[EXT-maintenance|平台 Adapter]] 了解宿主持久证据责任。

外部提供方合同以 Maintenance 的 IF-graph（固定来源/图关系）与 IF-native-context（实际生效）为准，项目 ID 0d05f813-7097-47d9-9e88-3d523bb537d6。Core 调用领域能力，平台原生格式由外部项目处理，不能把 Core 注册成 Harness Adapter。
