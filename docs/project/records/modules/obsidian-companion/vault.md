---
id: MOD-companion-vault
kind: module
title: Companion / Vault 定位、回执和标记
status: current
summary: 笔记正文保留在 Vault；稳定身份和同步记录承担恢复及延后清理责任。
sources:
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/README.md
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/docs/2026-09-14-shared-marker-cleanup.md
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/owned-markers.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/pending-reference-cleanup.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/knowledge-store.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/main.ts
  role: current-workspace-source
relations:
- relation: implements
  to:
    record_id: REQ-marker-cleanup
  reason: 最后使用方和归属验证
- relation: related
  to:
    record_id: OBJ-knowledge
  reason: 结构与标记有不同所有者
---

# Companion / Vault 定位、回执和标记

noteId 让笔记移动后仍可定位，blockId 与选区用于核对来源；块缺失、重复或文字改变时不猜测另一来源。知识登记保存有界选文、身份与回执，不采集全库正文。

删除 DSH 引用标签先解除本地关系，再持久记录 Core 端删除请求；断线可重试。删除一处贴纸回链只解除该处，保留贴纸本体及其他笔记。Owned 标记记录独立保留清理责任，直到所有有效引用、回链、笔记关联和未完成选择都释放后才尝试删除。

写笔记前重新核对占用；失败/歧义保留记录。原笔记存在而标记已消失时不跨笔记搜索删除。用户已有块 ID、升级前无法证明归属的孤立标记保留。

入口：[归属记录](../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/owned-markers.ts)、[清理](../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/pending-reference-cleanup.ts)、[知识记录](../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/knowledge-store.ts)、[持久交接和恢复入口](../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/main.ts)。
