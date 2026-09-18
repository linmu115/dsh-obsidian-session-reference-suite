---
id: OBJ-identities
kind: object
title: 身份：实例、页面、会话与笔记
status: current
summary: 区分运行位置、稳定会话和来源定位，避免把同名对象或另一窗口当作目标。
sources:
- path: ../../README.md
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/README.md
  role: current-workspace-source
- path: ../../../dsh-annotation-core/src/public/client-api.ts
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-15-extension-ownership-and-session-reader.md
  role: current-workspace-source
relations:
- relation: constrains
  to:
    record_id: IF-companion-reference
  reason: 页面和实例隔离
- relation: constrains
  to:
    record_id: IF-core-client
  reason: 目标与操作身份
- relation: derived_from
  to:
    record_id: CUT03
  reason: 固定截止的身份要求
---

# 身份：实例、页面、会话与笔记

| 身份 | 用途和所有者 | 不能替代它的东西 |
| --- | --- | --- |
| dshInstanceId + profileId | Lifecycle 传递当前 Launcher 实例与 profile；Maintenance 据此分区 | 包名、浏览器窗口名 |
| Viewer surfaceId | Companion 配置的内嵌页面身份；登录跳转后仍保留，Bridge 校验 | 同实例的独立 DSH 窗口 |
| logicalSessionId | Maintenance 的持久会话身份；通过解析服务对应当前原生会话 | 临时 runId、磁盘目录名 |
| nativeSessionId / messageId / anchorId | 当前宿主定位及原生消息证据 | 图的展示节点序号、消息数组下标 |
| vaultId / noteId / blockId | Vault 笔记与块来源；路径可以移动 | 看起来相似的选文、同名块 |
| actionId / operationId / referenceId | 投递、幂等操作与独立引用关系的身份 | 目标会话标题 |

例：来源 X 被 Y 引用，X 是来源，Y 是所有者。固定来源同时保存来源版本和完成回复截止；重开 Y 不得重新捕获 X 的最新历史。笔记重命名可按 noteId 解析；存在重复块时停止准备或清理。

变更任何身份映射时，同时查 [Core 添加/解除入口](../modules/annotation-core/interfaces/client.md)、[Companion 领取合同](../modules/obsidian-companion/interfaces/references.md) 和 [[INT-maintenance-directory|目录镜像映射]]。

## 绑定身份与当前可用性（已有合成验证，新包验收另记）

[[IF-vault-binding]] 追加绑定修订与运行代次的区别：实例 ID 是持久目标，端口和当前登录地址是运行位置。各 Vault 共用实例有效同步范围；未同步、离线、映射未就绪与会话已删除分开表达。改绑不重写历史实例、逻辑会话和 Vault 身份，也不重新投递旧队列。

当前实现状态：[[IMP-vault-binding-routing]]；分阶段验证与未结项：[[VER-vault-binding-implementation]]。未来通用直连操作仍 deferred。
