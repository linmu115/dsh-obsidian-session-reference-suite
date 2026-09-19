---
id: MOD-companion
kind: module
title: Obsidian 侧 Bridge：Vault 侧会话与引用协作
status: current
summary: 运行在 Obsidian：Viewer 页面、Bridge HTTP、笔记定位、关联回执和持久重试。
sources:
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/README.md
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/bridge/server.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/protocol.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/README.md
  heading: 数据保存在哪里
  role: original-module-authority
aliases:
- Obsidian Companion：Vault 一侧
- Companion：Vault 侧会话与引用协作
- DeepHarness Bridge
relations:
- relation: provides
  to:
    record_id: IF-obsidian-operation-channel
  reason: 后续操作扩展的合同预留
- relation: provides
  to:
    record_id: IF-vault-binding
  reason: 双侧绑定设计入口；当前实现与组合验证见 IMP-vault-binding-routing
- relation: contains
  to:
    record_id: INT-companion-maintenance
  reason: 消费方说明
- relation: provides
  to:
    record_id: IF-companion-knowledge
  reason: 笔记来源权威
  reasons:
  - 笔记来源权威
  - 知识/来源动作
- relation: provides
  to:
    record_id: IF-companion-reference
  reason: Companion 为 HTTP 服务方
  reasons:
  - Companion 为 HTTP 服务方
  - 本机 HTTP 引用交接
- relation: contains
  to:
    record_id: MOD-companion-viewer
  reason: 跨应用 Viewer 与传输
  reasons:
  - 跨应用 Viewer 与传输
  - 界面与传输边界
- relation: contains
  to:
    record_id: MOD-companion-vault
  reason: Vault 数据归属
  reasons:
  - Vault 数据归属
  - Vault 维护责任
---

# Obsidian 侧 Bridge：Vault 侧会话与引用协作

本模块就是现有 Obsidian 侧桥插件 `obsidian-deepharness-bridge`，显示名 DeepHarness Bridge；Companion 是地图及内部文档的旧称，不是桥之外另需安装的插件。它与 DSH 侧 `dsh-obsidian-bridge` 分别运行于两个宿主，共同组成桥；Suite 只作开发验收工作区。它让笔记选区投递到内嵌 DSH，会话链接与笔记可双向打开，并管理本侧持久同步责任。

- [Viewer 与 Bridge 交接](viewer.md)：稳定页面、租约、定向队列与双向导航。
- [Vault 身份、标记与恢复](vault.md)：正文归属、笔记定位、回链/删除记录与标记清理。

## 提供方合同与已知接入

[引用 HTTP 交接](interfaces/references.md) 给 DSH Bridge 的连接和内部引用模块使用；[知识链接与直接引用](interfaces/knowledge.md) 给 Sticker 的关联气泡和 Companion 内部会话选择使用。消费者分别返回 [Adapter](../reference-adapter/overview.md)、[Lifecycle](../bridge-lifecycle/overview.md) 与 [Sticker 关系 UI](../sticker-board/session-links.md)。

Maintenance 结构集成见 [消费方接入说明](integrations/maintenance.md)。同步记录是身份和回执，不能被当作第二套完整会话备份。共享协议源码已按 Suite 依赖绑定核对；控制、数据及 Annotation 2 的具体消费见 [[INT-companion-protocol]]。Protocol 是 Companion 和 DSH Bridge 的内部构建依赖，不是需要另启用的产品。

## Vault 绑定与独立运行（已有合成验证，新包验收另记）

Obsidian 侧 Bridge 按 [[REQ-vault-instance-binding]] 提供设置页实例选择及有效绑定的唯一写入口；Maintenance 管理页通过 [[IF-vault-binding]] 调用同一入口。按绑定身份选择当前控制租约并自动更新动态 Web 地址，不能再由另一实例最近上线抢占。未来专门操作通道通过本插件内部执行模块及 [[IF-obsidian-operation-channel]] 扩展，向已绑定 DSH 提供直接操作权限，不要求逐 Vault 操作能力识别，不新增操作插件；本轮只修订合同，不实现其业务。

当前实现状态：[[IMP-vault-binding-routing]]；分阶段验证与未结项：[[VER-vault-binding-implementation]]。未来通用直连操作仍 deferred。
