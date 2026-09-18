---
id: IF-core-client
kind: interface
title: Core Client 合同：添加、打开与解除引用
status: current
summary: UI 消费者交付来源和目标身份，得到引用身份或明确失败；添加不会自动发送。
sources:
- path: ../../../dsh-annotation-core/src/public/client-api.ts
  role: current-workspace-source
- path: ../../../dsh-annotation-core/README.md
  role: current-workspace-source
---

# Core Client 合同：添加、打开与解除引用

提供方是 Annotation Core。Sticker 或 Reference Adapter 将目标 sessionId、来源、稳定操作身份交给 Core，得到 setId、referenceId 与是否新建；添加产生目标会话中的待发送引用，是否发送仍由用户确认；打开来源等读取操作不会因此自动添加或发送。

例：同一次操作断线重试，保留 operationId，Core 应复用相同引用。来源图动作可带固定版本保护；失败或取消由 Core 的 fence/discard 入口补偿，消费方不自行删除整套引用存储。

完整 API 以 [AnnotationCoreClient 类型定义](../../../../../../../dsh-annotation-core/src/public/client-api.ts) 为唯一技术权威，能力名和适用范围见 [Core README](../../../../../../../dsh-annotation-core/README.md)。新增可选能力先协商 features；会话切换、旧输入框和并发版本变更必须被拒绝或重新核对。

## 已知接入与返回

- [Reference Adapter 接入](../../reference-adapter/integrations/core.md)：添加 obsidian-note、取消失败操作、打开来源。
- [Sticker 接入](../../sticker-board/integrations/core.md)：跨会话固定上游、来源引用解析/解除、关联笔记直接引用。
- [[EXT-sidechat|Sidechat 独立接入]]：普通来源与跨会话目标选择、侧聊 composer/历史投影、fence/discard 核对；实际 consumes 由 Sidechat 地图声明。
- [Core 接入目录](../overview.md)：包含仅由资料确认的其他消费者。

协议或返回值变更影响上述调用方、输入框状态和历史详情。不得把此 Client 权限当成 Maintenance 的任意对象写接口。
