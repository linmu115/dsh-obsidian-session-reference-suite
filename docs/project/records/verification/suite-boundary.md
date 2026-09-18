---
id: VER-suite-boundary
kind: verification
title: 七成员边界核对：范围、来源与图
status: current
summary: 核对当前组合身份、协议实际源码、消费范围与外部独立地图；产品运行验收另行区分。
relations:
- relation: verifies
  to:
    record_id: REQ-suite-boundary
- relation: verifies
  to:
    record_id: IMP-cohort
- relation: verifies
  to:
    record_id: MOD-protocol
---
# 七成员边界核对：范围、来源与图

日期：2026-09-16。仅维护本地图，保留 project_id dd46311f-d98d-49ff-ae13-fef0a8a6f9c3，不重新初始化、不改产品代码、不新增 kind:update。

## 已核对的源证据

- Suite 的 suite.members.json 正好七成员；cordis.patch.yml 只加载 Core、Lifecycle、Reference Adapter、Sticker 四个运行子插件。
- Suite node_modules/dsh-obsidian-bridge-protocol 的 Junction 指向 rc2-adapt-20260912 下真实协议源码；其 HEAD 为 ac12527106d556b3d688d1e3eb51adcccdac1d04，初始 Git 干净，版本 0.3.3-rc2.1。
- Protocol README 和 src/index.ts / src/data.ts 区分 Lifecycle 3 / Sticker 1；Core src/protocol/schema.ts 定义 Annotation 2。已核对 Lifecycle control-client/transport、Adapter protocol/来源回调、Sticker protocol/local-store、Companion server/protocol 的实际使用。
- Core 的通用 UI、输入绑定及公开 Client API 与 README 相符。源码和文档观察支持职责划分，未把依赖名单当全部能力证据。
- 外部 Maintenance 和 ThoughtDAG 项目 ID、现有接口记录已查清；完整合同仍归提供方。本地图仅保留自己的接入说明、已知消费者和外部薄链接。

## 地图范围与历史身份

本轮前 64 个记录 ID 保留。两类外部 Adapter 档案移入历史入口并指向独立地图后继；Core 目录消费者说明移到 Core 目录下沿用 INT-maintenance-directory。原图 5 个 Maintenance 内部节点合并到外部端点，真实跨边界依赖保留，旧节点后继见 provenance/boundary-node-successors.json。

架构新增 Suite 装配、Core 通用 UI / Annotation 2、Protocol 两个出口，按所属组件框住相关功能。工作流保留真实执行顺序与恢复分支，原生 DSH 执行器明确标为外部宿主；协议库不作为执行泳道。

## 检查结果与局限

- project_map validate：76 项记录、0 错误、0 警告，原 64 个 ID 全部保留；源码文件存在和 Markdown/Wiki 本地链接检查无缺失。
- 原生 Archify 架构与流程均通过硬检查并成功导出。架构保留 23 个节点、36 条连接、7 个成员职责框；流程保留 16 个节点与原有执行/恢复语义。
- 布局提示：架构 81 项、流程 4 项（交叉、共享走线等）。未为消除提示删去真实依赖；全局架构仍较密，可按五个聚焦视图阅读。这是可读性局限，不宣称布局已无问题。
- 已导出同一 A/B 阅读页面、原生图与语义护照记录映射；本次仅通过产物检查确认现有控件保留，没有将上次浏览器点击测试写成本轮重新实测。
- 来源摘要与链接核对回执见 [来源与链接审计](../../provenance/boundary-source-link-audit.json)，图检查见 [架构校验](../../provenance/boundary-architecture-validation.json)，旧图节点后继见 [后继登记](../../provenance/boundary-node-successors.json)。

历史 VER-map-repair 的统计与当时浏览器检查不冒充本轮结果。

本轮未构建或测试产品插件，没有操作真实 Vault、会话、模型或运行实例。源码状态、地图机械检查和实际部署兼容性分别判断。图的布局提示不构成业务缺陷证明。
