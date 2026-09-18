---
id: MOD-suite
kind: module
title: Suite：装配与组合边界
status: current
summary: 组合入口和四个DSH运行子插件、共享Protocol、Obsidian Companion共同组成七成员。
sources:
- path: ../../README.md
  role: current-workspace-source
- path: ../../suite.members.json
  role: current-workspace-source
- path: ../../cordis.patch.yml
  role: current-workspace-source
- path: ../../package.json
  role: current-workspace-source
- path: ../../README.md
  heading: 整套组件
  role: original-module-authority
aliases:
- 组合加载与成员清单
relations:
- relation: contains
  to:
    record_id: MOD-core
  reason: 共享引用基础
- relation: contains
  to:
    record_id: MOD-lifecycle
  reason: 连接生命周期
- relation: contains
  to:
    record_id: MOD-reference
  reason: Obsidian 来源接入
- relation: contains
  to:
    record_id: MOD-sticker
  reason: 贴纸与关系交互
- relation: contains
  to:
    record_id: MOD-companion
  reason: 组合成员；独立部署到Obsidian，非Cordis子插件
- relation: depends_on
  to:
    record_id: EXT-maintenance
  reason: 会话和扩展真源
- relation: contains
  to:
    record_id: MOD-protocol
  reason: 共享库成员，不作为独立运行插件加载
- relation: implements
  to:
    record_id: REQ-suite-boundary
  reason: 已确认七成员边界
---

# Suite：装配与组合边界

Suite 为 DSH 与 Obsidian 之间的引用、双向打开和贴纸协作提供统一组合。它维护成员兼容性与加载拓扑，没有单独的引用数据库或会话引擎。

| 成员 | 内部职责与入口 |
| --- | --- |
| [[MOD-protocol|Bridge Protocol]] | 控制与数据两个协议出口，DSH/Obsidian 两侧消费 |
| [Annotation Core](../annotation-core/overview.md) | 气泡、引用事务、来源扩展、上下文读取 |
| [Bridge Lifecycle](../bridge-lifecycle/overview.md) | 当前实例身份、租约、连接挂载、健康重试 |
| [Reference Adapter](../reference-adapter/overview.md) | 浏览器定向领取、Host 来源核对与删除同步 |
| [Sticker Board](../sticker-board/overview.md) | 普通贴纸、真实会话入口、来源标记、关联笔记气泡 |
| [Obsidian Companion](../obsidian-companion/overview.md) | Vault 侧 Viewer、选区、链接回执与自有标记 |

Core → Lifecycle → Reference Adapter → Sticker 是装载顺序；整个父组卸载时逆序释放。这只是四个运行子插件的装载顺序；本页 Suite 入口自身也是成员清单中的第七项。Protocol 是共享库成员，Companion 是 Obsidian 成员，两者不是父子产品。Maintenance 提供会话、固定来源及扩展结构真源，见 [外部依赖入口](../../dependencies/session-maintenance/overview.md)。

## 修改组合时

以 [成员清单](../../../../../suite.members.json) 和 [父子拓扑](../../../../../cordis.patch.yml) 为准，并核对 package 元数据与构件摘要。版本号相同也可能有后续修复构建。不要仅因源码版本列出就认定已发布、已安装或已验证。

只装配为一个父组；重复根插件会破坏共享 Core 和连接所有权。运行状态、具体能力与已验证边界分别见 [当前快照组合](../../implementation/cohort.md) 与 [来源中的验证证据](../../verification/source-evidence.md)。

## 组合接口

[Vault 与 DSH 之间的交接入口](interfaces/composition.md)说明各提供方的分工，并链接到相应权威接口。
