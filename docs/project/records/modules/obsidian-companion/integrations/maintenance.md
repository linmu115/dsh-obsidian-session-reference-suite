---
id: INT-companion-maintenance
kind: integration
title: Companion 接入 Maintenance
status: current
summary: Vault 提供来源与链接回执，Maintenance 提供结构所有者和真实会话身份。
sources:
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/README.md
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/webviewer/knowledge-client.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/knowledge-sync.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/knowledge-store.ts
  role: current-workspace-source
relations:
- relation: consumes
  to:
    record_id: EXT-business-adapters
  reason: 笔记链接
  reasons:
  - 笔记链接
  - obsidian-links 和知识结构
---

# Companion 接入 Maintenance

外部提供方 [Maintenance](../../../dependencies/session-maintenance/overview.md) 管理 obsidian-links 等结构，通用扩展写入与知识领域规则见 [业务 Adapter 入口](../../../dependencies/session-maintenance/business-adapters.md)。Companion 保存稳定笔记身份、待同步动作、链接回执和归属标记，Vault 保留正文。

实例在 Viewer 批次之间可能改变；同步和修复须绑定同一目标，不沿用上一实例的 owner。链接和来源需要明确迁移，原生 sessionId 要通过已接通的映射解析为逻辑会话，不能伪造 logicalSessionId。

新会话贴纸或关联本身不发起模型请求。旧伴生对象迁移采用冻结、导入、核对再切换所有者；本任务没有操作真实 Vault 或迁移记录。

消费者入口 [Viewer 知识请求](../../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/webviewer/knowledge-client.ts)、[同步流程](../../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/knowledge-sync.ts) 与 [本侧身份和回执](../../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/knowledge-store.ts)。
