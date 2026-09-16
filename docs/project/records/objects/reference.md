---
id: OBJ-reference
kind: object
title: 引用：待发送、已提交与恢复授权
status: current
summary: 引用气泡、持久提交、固定上游关系和恢复授权有不同生命周期。
sources:
- path: ../../../dsh-annotation-core/README.md
  role: current-workspace-source
- path: ../../../dsh-annotation-core/src/public/host-api.ts
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-10-session-context-graph-requirements.md
  role: current-workspace-source
aliases:
- 一条引用与一条笔记关联的区别
relations:
- relation: governed_by
  to:
    record_id: MOD-core-submit
  reason: 提交事实
- relation: governed_by
  to:
    record_id: MOD-core-context
  reason: 固定授权
- relation: constrained_by
  to:
    record_id: ST08
  reason: 删除语义
---

# 引用：待发送、已提交与恢复授权

## 引用与导航的区别

例如：在 Obsidian 选中一段笔记，投递到 DSH 后先出现待发送气泡；只有用户发送问题时才提交引用并写回对应回链。保存“这个笔记关联会话 Y”只建立导航，不自动把整篇笔记送给模型。



普通 Markdown 贴纸是笔记式内容；会话贴纸指向一段真实独立会话；跨会话引用固定来源版本和截止位置。它们可以共享来源锚点，但删除时按各自身份处理，不能按屏幕上的同一段文字批量删。



接收方逻辑会话拥有引用；笔记路径、块定位和来源会话是来源，不作为另一个所有者。

## 引用生命周期

Core 管理按会话组织的 ReferenceSet 和其中的 ReferenceItem。来源可以是 DSH 消息或 obsidian-note。选区和用户注解不改变原问题正文。setId / referenceId 用于对应历史详情、回链和精确删除。

| 状态或对象 | 含义 |
| --- | --- |
| 待处理 capture | Companion 已保存投递意图，尚待合格内嵌页领取 |
| Core pending 引用 | 已加入目标气泡，尚未等于用户发送 |
| committing / sent | 提交正在核对；只有执行器接受并持久确认后才能 sent |
| 固定上游关系 | Maintenance 持有来源版本、回复完成上限及活动/撤销状态 |
| 恢复的图授权 | 合法 sent 关系仍在、本地注释缺失时恢复读取；不制造旧用户消息或提交回执 |
| deleted tombstone | 明确解除的记录，防止迟到回链或镜像把关系恢复 |

取消 pending、解除 sent 关系和释放模型材料分别处理。删除关系保留已提交消息；撤销也不能让模型忘记已收到的正文。离线或一页目录缺席不代表删除。

固定上游只接受当前实现可确认完整结束的 assistant 回复。早期规格允许讨论“待完成引用”的交互选择，该提议不作为当前已实现能力。见 [当前上下文行为](../implementation/context.md)。
