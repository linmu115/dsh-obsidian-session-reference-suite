---
id: MOD-suite
kind: module
title: Suite：开发工作区与组合边界
status: current
summary: 私有开发、文档和跨仓验收工作区；Core、单一 Bridge 与 Sticker 独立安装，Protocol 内部依赖，旧 Adapter 退役。
sources:
- path: ../../README.md
  role: current-workspace-source
- path: ../../suite.members.json
  role: current-workspace-source
- path: ../../package.json
  role: current-workspace-source
- path: ../../README.md
  heading: 整套组件
  role: original-module-authority
aliases:
- 组合加载与成员清单
relations:
- relation: implements
  to:
    record_id: REQ-vault-instance-binding
  reason: 已实现独立安装与组合兼容，合成验收见 VER-vault-binding-implementation
- relation: contains
  to:
    record_id: MOD-core
  reason: 共享引用基础
- relation: contains
  to:
    record_id: MOD-lifecycle
  reason: 单一 Bridge 产品，统一桥接层
- relation: contains
  to:
    record_id: MOD-reference
  reason: 保留旧条目身份，当前实现已归入 Bridge 内部
- relation: contains
  to:
    record_id: MOD-sticker
  reason: 贴纸与关系交互
- relation: contains
  to:
    record_id: MOD-companion
  reason: 独立部署到 Obsidian，非 DSH 插件
- relation: depends_on
  to:
    record_id: EXT-maintenance
  reason: 可选协作者；已托管会话与扩展的真源，非基础启动依赖
- relation: contains
  to:
    record_id: MOD-protocol
  reason: 共享库成员，不作为独立运行插件加载
- relation: implements
  to:
    record_id: REQ-suite-boundary
  reason: 维护开发组合范围，不再创建运行父组
---

# Suite：开发工作区与组合边界

Suite 仓库维护 DSH 与 Obsidian 之间的引用、双向打开和贴纸协作的开发资料、成员源码与跨仓验收。它是私有工作区，没有可安装 plugin wrapper、运行父组或独立数据真源。当前边界由 [[DEC-single-bridge-product]] 取代旧装配方案。

| 对象 | 内部职责与入口 |
| --- | --- |
| [Annotation Core](../annotation-core/overview.md) | 独立插件；通用 UI、引用事务、来源扩展、上下文 |
| [DSH Obsidian Bridge](../bridge-lifecycle/overview.md) | 单一桥插件；稳定身份、实例/Vault 绑定路由、租约、共享交接及桥管理 |
| [Bridge 内部引用接入](../reference-adapter/overview.md) | 原 Adapter 职责已合入；旧独立包退役 |
| [Sticker Board](../sticker-board/overview.md) | 独立插件；普通贴纸、定位、笔记关联业务与界面 |
| [Obsidian Companion](../obsidian-companion/overview.md) | Obsidian 插件；Vault 绑定写入口、Viewer、选区、链接及标记 |
| [[MOD-protocol|Bridge Protocol]] | 两侧内部开发依赖；控制、数据、绑定与发现合同，用户不单独启用 |

Profile 独立加载 Core、`dsh-obsidian-bridge`、Sticker 各一次。Core → Bridge → Sticker 描述通用引用、跨宿主交接和业务消费关系，不再是 Suite 父组的强制启动顺序；服务可选、晚加载与卸载由 Cordis 接入处理。旧 Lifecycle 物理目录及 `obsidianBridgeLifecycle` 服务 key 保留历史兼容，不是额外产品。

Maintenance 是独立可选协作者。它提供已托管真源、分类工作区范围、运行快照和公开信息页；缺席不阻断独立基础能力，已托管对象不回退旧副本写入。保存范围影响下次启动，当前 run 按原快照完成写入。见 [外部依赖入口](../../dependencies/session-maintenance/overview.md)。

## 修改组合时

以 [开发成员清单](../../../../../suite.members.json) 和各包 metadata、源码及构件摘要核验实际候选。清单不是安装清单，Protocol 无用户启用项，Suite 和旧 Adapter 不安装。不要只凭版本号认定已经发布、安装或验收。

安装要求与当前候选见 [[IMP-cohort]] 和 [组装合同](interfaces/composition.md)。旧阶段构建与合成结果保留在 [[VER-vault-binding-implementation]]；新单桥包组及真实部署另见 [[VER-single-bridge-delivery]]。

## 业务与未来扩展边界

[[REQ-vault-instance-binding]] 的唯一绑定、动态端口和多 Vault 路由继续由两侧 Bridge 承担。普通贴纸与笔记关联业务仍归 Sticker，遵守 [[DEC-selection-ownership-20260918]]。未来通用直连笔记、样式等通道归同一 Bridge，但业务实现后置，不能作为当前已有功能宣传。
