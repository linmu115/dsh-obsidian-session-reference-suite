---
id: HIST-vault-instance-binding
kind: history
title: Vault 单实例绑定、公开扩展页与动态端口的需求收敛
date: 2026-09-18
status: current
modules: [Bridge Lifecycle, Obsidian Companion, Reference Adapter, Bridge Protocol, Sticker Board]
outcome: 已整理确认需求和待实现设计，产品实现与部署未开始
summary: 从维护面板中的绑定讨论收敛为 Bridge 独立配对、可选维护页、共享实例范围及动态端口自动续接。
applicability: 本机 Obsidian Vault 与 DSH 实例；首版不扩展到跨机器或未来操作插件的具体业务。
coverage_note: 当前 Codex 任务公开来源第 9–259 行，包含初始需求、批注、范围选择及整理请求；索引末尾一个工具调用未覆盖返回，不作为检查成功证据。后续文档验证另见 VER-vault-binding-design。
history:
  path: history/20260918-vault-binding-requirements
  sha256: 501c03390e67199271aa48d396a36db737ca1346e80887036745873bf812f53d
  capture_sha256: 4c9ab0529c2b8e078f9d665fd49d0c6148e26aed3426593d726618db4a9839cd
related_records: [REQ-vault-instance-binding, IF-vault-binding, IF-obsidian-operation-channel, VER-vault-binding-design]
---

# Vault 单实例绑定、公开扩展页与动态端口的需求收敛

用户提出一个 Vault 绑定一个 DSH 实例，一个实例可以绑定多个 Vault，集中管理入口放在 Maintenance 扩展数据中，且两组插件必须可以分别安装和正常运行。

[查看依据：初始绑定与解耦要求](history-event:EVT-81d07c27242839b95925)

用户明确仓库为 Obsidian Vault、实例为 DSH 实例，认可绑定属于 Bridge、只装双侧插件时约束仍成立。随后要求 Obsidian 设置页可选择实例，插件自行注册扩展信息页和栏目，并保留未来专门操作管道。方案据此区分有效绑定、发现候选、维护登记与页面展示：Bridge 拥有配对，Maintenance 提供可选管理能力。

[查看依据：对象确认](history-event:EVT-d5f69cc6c40486d6929a)

[查看依据：八项批注与后续操作管道](history-event:EVT-a6b6fe6fa122edaa171e)

用户选择同实例的所有 Vault 共用实例同步范围；取消工作区同步后保留旧链接并提示当前实例未同步。没有新增每 Vault 的工作区策略，也没有将另一实例的可用性解释为允许自动改绑。

[查看依据：共用实例同步范围](history-event:EVT-a193f84726285801f6dd)

[查看依据：取消同步保留链接](history-event:EVT-faf13702b32783bc1295)

用户追问 Launcher 动态分配端口是否影响连接，并要求列清组件范围、整理设计及更新地图。源码核对确认 Lifecycle 已读取实际 webServer 端口并传递 authenticated Viewer URL；设计明确保留这条链路，以稳定实例身份绑定、运行代次更新地址。取消同步和恢复时的历史身份规则再次得到认可。

[查看依据：动态端口问题与地图整理授权](history-event:EVT-55e4c3bcb5375635db5b)

本次还核对了当前地图已有的 [[DEC-selection-ownership-20260918]]，避免使用旧版“Sticker 拥有会话贴纸”的职责描述。最终范围包含 Lifecycle、Companion、Protocol、Reference Adapter、Sticker、Maintenance 项目及 Suite 装配，Core／ThoughtDAG／Sidechat 为已知消费者核查，Launcher 为可选增强。

新规格和接口草案分别由 Suite 与 Maintenance 提供方维护。登记目录、协议字段、实际有效范围接入点等留为工程核查，没有剩余产品行为问题要求用户重复确认。此次没有实施插件、重启实例、修改会话或 Vault 数据；文档检查范围见 [[VER-vault-binding-design]]。
