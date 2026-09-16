---
id: IMP-context
kind: implementation
title: 当前上下文能力与故障边界
status: current
summary: 固定截止与原生释放已在快照中描述；真实交付、范围收缩和模型理解是不同结论。
progress: implemented
gap: 本次不运行原生或托管模型；不能确认真实请求中的材料释放及部署启用状态。
sources:
- path: ../../../dsh-annotation-core/README.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-15-native-agent-context-management.md
  role: current-workspace-source
relations:
- relation: implements
  to:
    record_id: NC02
  reason: 三层状态
- relation: implements
  to:
    record_id: NC07
  reason: 仅原生引擎
- relation: implements
  to:
    record_id: CUT05
  reason: 固定旧范围
- relation: implements
  to:
    record_id: NC08
  reason: 复用真源
---

# 当前上下文能力与故障边界

当前 Core README 声明：跨会话选区只接已完成 assistant 回复；初始問答材料占用同一累计预算，更早上下文按需读取；prepareGraphReferences 复用原版本和截止，合法 sent 关系可恢复读取授权。

原生管理工具包括 graph inspect/edit、request list、context status/window/release/source/pin/discover。它们绑定当前执行会话，不接受他人的 owner/profile/run。管理写操作保留短回执；读材料及目录分页各有有界计费，释放不返还累计额度。

释放先 pending-next-step，原生 replace 写入和持久证据核验后 applied。混合材料按片段处理，保留其他片段、工具配对及真实用户正文与 userComment；其他压缩已改变材料时明确失败，不重新装回旧全文。

能力在运行中停用：普通聊天若无插件材料可继续并移除相关工具；仍保留材料或正要注入引用时暂停请求，恢复能力后继续。此行为防止绕过窗口或待释放约束。新增管理只支持 DSH 原生 Agent，不能外推到托管 Codex。

“已准备 / 已交付 / 失败”来自披露日志；不把任何状态描述为模型已经理解。接续、撤销与归档详见 [模块](../modules/annotation-core/context.md)，历史合成检查见 [来源证据](../verification/source-evidence.md)。
