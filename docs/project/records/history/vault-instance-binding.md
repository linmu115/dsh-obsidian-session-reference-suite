---
id: HIST-vault-instance-binding
kind: history
title: Vault 单实例绑定、公开扩展页与动态端口的需求收敛
date: 2026-09-18
status: current
modules: [Bridge Lifecycle, Obsidian Companion, Reference Adapter, Bridge Protocol, Sticker Board]
outcome: 已按授权实施桥整合、双侧绑定与路由、实例分类范围及公共信息页；本地合成验收与真实部署分别记录。
summary: 从维护面板中的绑定讨论收敛为 Bridge 独立配对、可选维护页、共享实例范围及动态端口自动续接。
applicability: 本机 Obsidian Vault 与 DSH 实例；首版不扩展到跨机器或未来操作插件的具体业务。
coverage_note: 当前任务公开来源第 9–2203 行，共 536 事件；包含开工、分类工作区与下次启动生效的确认，以及实施和分组验收。截点有一条工具调用尚未配对；旧索引保留，不收录隐藏推理。
history:
  path: history/20260918-binding-scope-implementation
  sha256: 7d4f56b79277d188358d1564805861b64df0f9faf856a90ebd47e3649e5ba338
  capture_sha256: 1906245268ee125af34796362ab9d17cee02b7ba44e6d9fbad0b6cbc407987bf
related_records: [REQ-vault-instance-binding, IF-vault-binding, IF-obsidian-operation-channel, VER-vault-binding-design, REQ-integration-complete, EXP-bridge-consolidation, VER-requirements-consolidation, DEC-bridge-refactor-sequence]
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

## 完整需求稿与新的架构问题

用户要求将已确认讨论整理为一个完整文档，并询问 Core 是否收拢引用职责、桥接插件是否应合并，以及未来 DSH → Obsidian 操作通道的两侧归属。新增 [[REQ-integration-complete]] 作为完整阅读入口；原 VB／EP 编号保持可追溯。

[查看依据：完整文档与桥接职责提问](history-event:EVT-1ff80cd98322df6cdb24)

核查当前源码确认 Core 拥有通用引用状态与提交；Reference 与 Sticker 已共享 Lifecycle 的 transport，但各自消费动作队列，通用状态 UI 和一部分笔记引用编排仍在 Sticker。[[EXP-bridge-consolidation]] 据此提出统一 DSH Bridge 的建议，分开已核实事实与尚未确认的职责迁移。未来操作通道建议由两侧 Bridge 的内部模块协作，不将这个建议写成已确认安装结构。

本次扩展为新范围索引并保留原索引；完整稿及评估的文档检查见 [[VER-requirements-consolidation]]。没有修改运行插件或部署。

## 桥公共能力收敛与实施顺序确认

用户明确笔记关联是普通贴纸业务，应继续保留；Bridge 暴露共用双向引用通道，由普通贴纸适配。用户同时确认纯笔记操作不必经过 Core 引用流程或 Maintenance。此前迁移笔记关联功能的建议撤回。

[查看依据：职责修正、分期及等待开工要求](history-event:EVT-7001997878bc8d33bea6)

顺序确定为先整合 DSH Bridge 和普通贴纸的已有接入，再在两侧 Bridge 实现 Vault 绑定与路由，之后新增 Maintenance 的业务 Adapter 和扩展信息页，未来专门操作通道最后再展开。新追问确认第一阶段只统一已有引用、回链、定位和解除能力，保留扩展位置。

[查看依据：第一阶段只整合现有能力](history-event:EVT-adbd0f0aa425de5f0771)

现有 Maintenance 贴纸、引用和会话定位接入必须在重构阶段保持可用，新 Adapter 后置不等于移除旧能力。先落实实施计划，只有用户明确下令后才开始产品代码施工；本次只修订文档与地图。

[查看依据：保留现有维护接入](history-event:EVT-fd7a27be9c986eb9d8e3)

## 开工、第一阶段验收与新增同步策略

用户明确下令按需求和执行规划开始施工，由主代理指挥 Astra 子代理，思考强度不超过 high。此前等待开工的约束已经满足，不能继续作为停工条件。

[查看依据：明确开工与代理配置](history-event:EVT-a4b93285e8682a319461)

施工核查发现当前源码没有每 DSH 目标实例的工作区选择，只有全部投影及独立的 Codex 来源名单。用户明确授权 Maintenance 新增自己的实例工作区会话同步选择，只有选中内容在 DSH 与真源间双向同步。它成为有效范围权威来源，Bridge 不另建名单。

[查看依据：新增每实例双向同步范围](history-event:EVT-7c5cd785972fbe658088)

首阶段将引用接入整合进 Bridge，普通贴纸保留关联业务并使用共享通道。聚焦修复独立 Sticker 可选服务访问和共享队列的跨 Profile 重试容量；Core 仍负责事务与补偿。桥、贴纸、兼容入口、Suite 和 Companion 相关本地测试通过，组合来源检查发现并修正了旧开发依赖，未部署真实应用。

[查看依据：首阶段验收与进入后续阶段](history-event:EVT-a059a28e5421ba36e9f7)

## 继续施工：分类范围与启动生效

用户明确选择保存后在实例下次启动时应用新的同步范围，当前运行继续使用启动快照，允许正在进行的会话完整保存。界面同时展示当前范围与已保存范围。

[查看依据：下次启动生效](history-event:EVT-dc47647e43307ad82c2f)

进一步核实后，用户确认同步对象为 Maintenance 自己的会话分类工作区，区别于 DSH 按文件夹路径显示的项目。未分类会话有独立选择；同实例所有 Vault 共用这一范围。

[查看依据：分类工作区语义](history-event:EVT-853cc1946e5b3ca9e0a7)

实施采用持久绑定修订、动态发现与端口重连、每运行范围快照、投影筛选及事务内回写复核。公开业务页使用声明式栏目与有界动作回执，绑定写入仍交给 Companion。实际改动和后续验证的提交、测试数与限制见 implementation / verification 记录；本历程截点不代表后续工具工作已停止。
