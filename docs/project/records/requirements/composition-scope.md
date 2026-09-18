---
id: REQ-suite-boundary
kind: requirement
title: 组合范围：七成员与独立外部项目
status: current
summary: 按用户确认名单维护一张组合地图；Core 包括引用状态、提交、上下文注入和通用 UI。
sources:
- path: ../../suite.members.json
  role: source-reviewed-2026-09-16
- path: ../../cordis.patch.yml
  role: source-reviewed-2026-09-16
relations: []
---

# 组合范围：七成员与独立外部项目

## 当前要求与来源

2026-09-16 用户确认：组合入口为 dsh-obsidian-session-reference-suite，成员包含 dsh-annotation-core、dsh-obsidian-bridge-protocol、obsidian-deepharness-bridge、dsh-obsidian-bridge-lifecycle、dsh-session-sticker-board、dsh-obsidian-reference-adapter。此名单与现有 suite.members.json 七项一致；本页保存当前任务的用户决定，成员文件提供独立核对依据。

Core 的范围包括引用状态与提交、上下文注入、通用引用 UI，不能缩成双链。Companion 缩进位置按真实依赖解释：它消费共享 Protocol，并非由 Protocol 创建、加载或拥有的子插件。

Session Maintenance 与 ThoughtDAG 各自已有地图，不属于本组合。组合保留自己使用哪些外部能力以及提供接口的已知外部消费者；对方内部平台/业务 Adapter 档案归回独立地图。已有需求编号、身份与后继继续可查。

## 验收条件

- 入口说明七成员与各自部署位置；图框按组件归属容纳内部功能。
- 两侧分别消费共享协议；Annotation 2 合同归 Core，Lifecycle 3 / Sticker 1 归 Protocol。
- Core 的通用 UI、提交和注入职责均有记录与源码；其他成员保留内部职责、具体接入与返回合同的链接。
- 外部项目用稳定项目/记录 ID 引用，不画成本组合子模块；旧重复记录只保留身份、原因与后继。
- 保留 A/B、语义护照条目按钮、更新记录入口；本次没有新增 kind:update 的要求。

实现观察见 [[IMP-cohort]]；地图核对结果见 [[VER-suite-boundary]]。本要求不代表对真实部署作出验收。
