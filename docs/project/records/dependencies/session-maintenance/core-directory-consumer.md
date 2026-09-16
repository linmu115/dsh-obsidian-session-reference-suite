---
id: INT-maintenance-directory
kind: integration
title: Maintenance 接入 Core 轻量引用目录
status: current
summary: Core 是提供方；Maintenance 只同步有限业务条目，映射为所属逻辑会话。
sources:
- path: ../../../dsh-annotation-core/docs/changes/2026-09-15-reference-directory-mirror.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-15-extension-ownership-and-session-reader.md
  role: current-workspace-source
relations:
- relation: consumes
  to:
    record_id: IF-core-directory
  reason: 有界只读同步
  reasons:
  - 有界只读同步
  - Maintenance 镜像接入说明
- relation: implements
  to:
    record_id: REQ-directory-owner
  reason: 逻辑会话归属
---

# Maintenance 接入 Core 轻量引用目录

唯一提供方合同是 [Core referenceDirectory](../../../../../../dsh-annotation-core/docs/changes/2026-09-15-reference-directory-mirror.md)，提供方接入目录在 [Core 模块](../../modules/annotation-core/overview.md)。Maintenance 开启 annotation-records 后启动补齐并订阅持久变更，同步 Core 引用有限摘录、状态、定位与 sourceRevision。

通过当前运行绑定把 nativeSessionId 解析为 logicalSessionId。未建立映射就重试；分页失败或暂时缺席不删除镜像，只有 tombstone 才同步删除，旧修订不得覆盖新状态。

镜像面板只读，不复制 aggregate、文档快照、journal、outbox 或整份模型上下文。已恢复图授权不重复导出。目录游标过期重新从第一页读取；内部回链作业更新不推进可见目录修订。

本任务核对了提供方合同和最新归属规格；未运行 Maintenance 镜像服务。接口存在与源码报告成功不证明目标实例已启用此接入。返回 [外部业务接入目录](business-adapters.md)。
