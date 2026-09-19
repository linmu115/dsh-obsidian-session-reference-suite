---
id: HIST-vault-instance-binding
kind: history
title: Vault 单实例绑定、公开扩展页与动态端口的需求收敛
date: 2026-09-18
status: current
modules:
- Bridge Lifecycle
- Obsidian Companion
- Reference Adapter
- Bridge Protocol
- Sticker Board
outcome: 桥整合、绑定、信息页与同步UI已分步实现；安装及生效分层记录，外部浏览器加载故障和Engine .39激活尚未闭环。
summary: 从维护面板中的绑定讨论收敛为 Bridge 独立配对、可选维护页、共享实例范围及动态端口自动续接。
applicability: 本机 Obsidian Vault 与 DSH 实例；首版不扩展到跨机器或未来操作插件的具体业务。
coverage_note: 整理者Codex，2026-09-18；本任务公开来源9–5944行，1559事件，704对工具及1个截点未配对调用；仅事件定位与指纹，不复制正文。安装后续以独立回执续记；隐藏推理/非文本块不收录。
history:
  path: history/20260918-long-session-acceptance
  sha256: 11b23d87d51c00137a498a8c95e7a48d4667bf677424ba3388b7e135b0e6b344
  capture_sha256: 29729cd575fd4d8684472efd9b14b8ba467c4753099cf6160621c2ce6d2908a2
related_records:
- REQ-vault-instance-binding
- IF-vault-binding
- IF-obsidian-operation-channel
- VER-vault-binding-design
- REQ-integration-complete
- EXP-bridge-consolidation
- VER-requirements-consolidation
- DEC-bridge-refactor-sequence
- DEC-single-bridge-product
- EXT-better-sidebar
- VER-single-bridge-delivery
- REQ-long-session-consolidated
- IMP-long-session-status
- VER-long-session-acceptance
---

# Vault 单实例绑定、公开扩展页与动态端口的需求收敛

## 2026-09-18 地图回查后的需求纠正（新任务续记）

用户在回查未来专门操作通道后指出：“这个插件我不是整合进桥了吗，地图没有更新吗”，并针对目标 Vault 能力识别要求明确修订：“这个不用识别，只需要提供直接操作权限就行，更新地图里的需求”。核对当前 Obsidian 侧 manifest/package 后确认，Companion 就是既有 `obsidian-deepharness-bridge` / DeepHarness Bridge 的旧称；原模块页“未来专门操作插件”及评估中的打包待定表述未随单桥决定完全收敛。

本次同步 R09、VB11、[[IF-obsidian-operation-channel]]、最终需求、模块入口和架构图称呼：在现有两侧 Bridge 内追加操作功能，不新增操作插件；复用绑定与路由，提供直接操作权限，取消逐 Vault 操作能力识别、声明、查询与协商前置。既有身份/绑定鉴权及引用协议兼容检查保持各自职责。实现状态纠正为“待设计和实现”，不把它与已实现但未验收的项目混写。用户还询问技术路线及 Obsidian 官方接口；技术建议与本次已确认需求分开，未开始产品代码施工或安装。

用户在同一任务继续要求确认“当前桥接功能被收口到 dsh 和 Obsidian 侧各一个插件上”；据此在地图总入口、R12、最终需求及单桥产品决定中显式保存“两端各一”的产品约束，列出两侧实际插件 ID，不仅依赖 Companion 别名推断。

技术讨论核对官方 CLI 与 Plugin API 后，用户追加“那你也可以在桥插件中加入 skill 提示 dsh 在操作时优先走被绑定 Vault 的 cli”。新增 [[DEC-obsidian-operation-route]] 保存 CLI 优先与桥交付 DSH skill 的要求；显式绑定目标、CLI 原生身份映射及 HTTP / Plugin API 补充执行作为工程建议说明。未安装或运行官方 CLI、未写真实 Vault、未实现 skill 分发或通用操作业务。

来源为当前地图回查任务的两项用户批注、技术路线提问及“两端各一”确认要求；本节晚于本文件原 history 索引的来源范围，尚未绑定新的事件索引，不能冒充已有 history-event 的原始记录。此次仅文档维护，不新增用户未要求的“更新记录”。下文保留此前任务及其原始依据。

### 同一任务继续：必须提供 CLI 与开始实施

用户随后取消桥内插件构建/完整管理，只要求已有插件重载，并明确“开始下一步”“必须要有 cli”。这覆盖本节早期“仅文档、未实施”的时点。本轮在原 DSH Bridge 增加 skill、工具、目标解析及 CLI 执行回执；Obsidian 侧复用既有身份/路径证明，不增加第三个桥插件。实现和独立验证见 [[IMP-obsidian-cli]]、[[VER-obsidian-cli]]。

本机核查发现应用内容虽自动更新到 1.13.7，安装器仍是 1.8.4，未提供 CLI 原生入口。验证官方签名及摘要、备份后，正常关闭 Obsidian 并安装 1.13.7。第一次关闭主窗口后仍出现 Vault 选择窗口，随后再次正常关闭，未强杀。启用 CLI 后真实版本与绑定路径检查通过。

新源码 144 项测试通过，并在现有绑定上执行真实只读和一次 Obsidian 侧桥重载；重载完成回执及恢复身份一致。重载后的单独版本报告采集曾短暂报错，后续只读核对通过，没有重放重载。首次候选包随后因加入自重载确认而重新构建到新的输出目录，避免旧构建文件混入最终候选。

候选未部署到运行中的 DSH：普通 Sticker 严格 peer 仍需纳入新版本，且正式 Launcher Stop/Restart 命令缺失。没有绕过停止或将源码验证标为部署完成；笔记写入和 UI 未验收。本续记来源仍是当前任务公开上下文，尚未新增可展开的 history-event 索引，不改变下文旧任务来源范围。

### 同一任务继续：用户正常停止后安装与启动

用户批注“继续处理依赖，我已经停止实例”。只读核验最新 run closed、Launcher finalized/closed 和 shutdownAccepted 后，Sticker 增加对 Bridge .3 的 peer 兼容；123 项测试、类型检查及 28 个运行源码文件不变核验通过。

暂存严格依赖安装暴露两个原有 GPT 包 override 落后于当前 manifest/lock，若照旧安装会回选旧包。在真实实例未写前对齐当前更新并复验；运行包只替换 Bridge .3 与 Sticker .5。重复暂存安装的 package map 丢少量既有边，故保留原运行 map 并只添加物理路径核验通过的 skill/tools 依赖，不覆盖其他插件关系。

备份、再次停止核验及事务安装通过，正式 integration repair 更新升级后的指纹，然后正式 Start 成功。插件目录中 Bridge、Sticker、skills、tools active，无失败插件；现有会话只读 skill 目录确认 obsidian-bound-vault 可由模型调用。没有发模型请求或写笔记。结果见 [[IMP-obsidian-cli]]、[[VER-obsidian-cli]] 及 obsidian-cli-deploy-20260918/activated.json；这替代上方候选未部署状态，不表示 Agent 调用和 UI 已验收。来源为同一任务的后续公开消息与执行结果，仍未绑定新的 history-event 索引。

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

## 安装请求暴露交付形态差距

用户先要求检查地图文档与图形，并将成果安装到当前副本作第一阶段验收。读取候选版本表后，用户指出 Suite、Adapter、Lifecycle 仍列为多个包，与之前期待的“一个桥插件”不符。

[查看依据：地图核查与安装请求](history-event:EVT-f17eeaa88bf870afa1f0)

[查看依据：用户指出多桥包交付差距](history-event:EVT-d95234028788f2b31e0e)

主任务承认内部实现合并与安装形态收敛不是同一件事，暂停原安装推进。用户随后明确：桥接层合一，实例/Vault 绑定和后续专用通道也全部属于同一插件。Core、普通贴纸与可选 Maintenance 保持独立。

[查看依据：确认单桥安装边界](history-event:EVT-645ea6e7a60c78250d79)

[[DEC-single-bridge-product]] 据此明确 `dsh-obsidian-bridge` 为唯一桥安装项；Suite 退为私有开发、文档和组合验收工作区，旧 Adapter 退役，Protocol 作为内部依赖。旧目录和内部服务 key 可保留兼容。地图不删除旧记录，而把先前报告的安装解释标为被替代。

## 普通贴纸组合和 Core 引用职责

用户进一步明确普通 Sticker 同时依赖 Core、Bridge 与 Better Sidebar；Core + Bridge 直接实现跨 Obsidian 引用，Core + ThoughtDAG 直接实现跨会话引用和会话贴纸。Maintenance 通过对应 Adapter 维护各自历史消息类型，不能把会话贴纸重新归给普通 Sticker。

[查看依据：用户明确功能组合与历史维护](history-event:EVT-5317d245917dd1926ca9)

用户再次强调 Core 自己维护上下文引用、引用样式与 UI、气泡和上下文。运行引用状态、上下文组织注入、提交撤销恢复继续归 Core；Bridge 提供 Obsidian 来源、传输、定位和绑定，ThoughtDAG 管会话来源关系，普通 Sticker 调用 Core，Maintenance 不接管运行时引用。

[查看依据：Core 自己拥有引用、样式、气泡与上下文](history-event:EVT-9f43f5ddaedba44b5ecf)

此前“桥可选”“Sidebar 缺席可退回浮层”的普通贴纸说明随之修正为三项业务依赖；缺失能力显示等待/不可用，不以启动异常代替状态。已托管数据不因可选维护服务缺席回退旧副本写入。当前要求映射到 [[REQ-integration-complete]] 的 R12/R13、[[OBJ-reference]]、[[OBJ-knowledge]]、[[MOD-core]]、[[MOD-sticker]] 与 [[EXT-better-sidebar]]。

## 新包验证、发行修复与安装前备份

单一 Bridge 构件完成隔离加载检查，普通 Sticker 按三项依赖重新接入；Suite 的私有工作区与独立 profile 迁移后来保存为 2480db1。相关组件的新版本、提交和测试数字分开登记于 [[VER-single-bridge-delivery]]，旧 857 项组合验证不冒充新包回归。

[查看依据：单桥隔离检查与普通贴纸依赖验证](history-event:EVT-1f61a9a1cedd6777e15f)

[查看依据：Suite 工作区与迁移源码提交](history-event:EVT-b23a8f097262211daf41)

安装准备又发现 Maintenance 发行门禁未接纳新版本，以及暂存安装路径不能直接搬到真实副本。主任务先修正并核验精确包组，再备份会话维护状态与 Obsidian 插件状态；保持零活动 run/job 的前置条件。公开进度在本次来源截点确认备份完成，仍在最终安装包核验阶段，不能据此写成副本已安装或窗口验收成功。

[查看依据：发行门禁与暂存路径问题](history-event:EVT-4d12c72d05407c13a6ba)

[查看依据：备份完成，安装包继续核验](history-event:EVT-dc037f83d2e8e05462c6)

本次沿用 HIST-vault-instance-binding 身份，创建新的不可变范围索引覆盖第 9–3209 行以保持旧引用可展开；旧索引原样保留。新增事实只从此前截点后的公开消息整理，没有导入隐藏推理，也没有伪造原始消息或补写图片内容。后续安装事实由执行主任务另行扩展来源与验收记录。

## 后续安装、加载恢复与停止入口纠正

既有事件索引截点之后，主任务完成单桥包组安装，installed.json 保存精确版本与哈希，旧四个安装项退役。随后用户报告客户端 Failed load；同一 revision 的服务端检查通过，但不能说明当时浏览器失败原因。首次命令 Restart 暴露直接 appExit 未走 Launcher beforeStop 的缺口，旧 run 以 recovered 完成恢复；包装脚本遂在写操作前禁用 Stop/Restart，保留 Status/Start。

之后正式 Start 成功，新运行端口为 36928。主任务 BrowserUse 新启动及禁用缓存刷新均完整加载 bundle，Core/Bridge/Sticker 已启用运行；托管历史会话及普通贴纸/笔记链接面板完成基本只读检查。当前恢复不等于原加载故障根因已修复；Vault 仍未绑定，Companion .2 修复未部署，双向引用与完整停止链路没有通过验收。详见 [[VER-single-bridge-delivery]] 和 [真实验收及本机回执](../../../changes/2026-09-18-single-bridge-product.md)。

本节只整理执行主任务的回报和真实 artifact，不将晚于截点的事实伪造为既有 history-event。原索引、事件与所有身份保持不变；本次未写用户会话标题/正文。


## 多轮用户验收与纠偏日志（续记）

以下记录保留每次失败的环境与边界，不能用后来某个检查通过覆盖此前用户反馈。问题专题见 [[EXP-acceptance-blockers]]；最终需求见 [[REQ-long-session-consolidated]]，实际状态见 [[IMP-long-session-status]]。

1. 用户明确要求命令控制与后端检查。发现Launcher内部IPC并非外部CLI；直接宿主退出漏beforeStop，会产生requestedStop=false/recovered。Stop/Restart脚本改为操作前拒绝，正常停止需用户Launcher操作；不能称完整自动重启已交付。
[查看依据：命令与后端要求](history-event:EVT-29ad4a52f0972cc333f0)
2. 用户反复报告启动Failed to load plugins，并要求直接看右侧浏览器。GPT浏览器可用不能推广到Launcher和Edge；未经充分验证归因为缺登录凭据后，用户指出Launcher登录入口也失败。Edge/Chrome控制接口不可用同样不说明浏览器已正常。
[查看依据：实际loader报错](history-event:EVT-4a2ffab39cb99f8fe39f)
[查看依据：用户纠正登录归因](history-event:EVT-c6794616e1986e5fcdc9)
3. 扩展数据页面异常；信息接入放错层级，用户明确“扩展→各插件→Obsidian内数据/信息并列”，随后修正。math仍绑定失败；修复安装后需要Obsidian重载，后续绑定revision1/READY，不能拿此前target=null当现状。
[查看依据：层级纠正](history-event:EVT-94d26715699378ff3594)
[查看依据：math绑定失败](history-event:EVT-a0d40034ed0ead9315e9)
4. 用户报告维护引擎未启动，要求双击未启动则启动、已启动则开看板。已实现入口；后续安装发现桌面路径指向缺失脚本，补齐并CheckOnly验证连接。引擎正常停止协议仍是独立未结项。
[查看依据：引擎未启动](history-event:EVT-cdef157b7dd6def498ab)
[查看依据：双击入口](history-event:EVT-0bd494e551b3d9eb8a19)
5. 用户追加文件夹绑定。实现目录/插件检查及live路径证明，防止复制Vault同ID误绑定；Companion.3已安装重载核验，DSH两包安装回执已生成，真实对话框到绑定尚未验收。
[查看依据：目录选择绑定需求](history-event:EVT-60abc37ff900a61e4a0f)
6. 同步页卡片无内边距、两个选择区堆叠、大量历史run显示为当前范围。用户要求两个并列子栏目；.1.5修复布局及切换，.39新增在线判定但未激活。用户禁止使用已卸载UI skill，此后不再加载。
[查看依据：同步子栏目纠正](history-event:EVT-c65481b741437769a9e0)
[查看依据：禁止UI skill](history-event:EVT-4b923b4d426c5a813cfa)
7. 安装遇Sticker严格peer锁旧Bridge，新增仅兼容peer发布.4后严格安装通过；运行时patch新增其他插件，守卫拒绝覆盖，最终保留新增节点，仅更新已确认版本。用户正常停止后核验closed/finalized再安装。引擎.39仅独立安装，不冒充激活。
[查看依据：用户授权安装](history-event:EVT-fdc2b67dbe9877f8d298)
[查看依据：用户已正常停止](history-event:EVT-f78a89a34e77aa67568b)


### 接入指纹修复（保留失败前因）

2026-09-18 08:40 UTC，确认prepare拒绝原因为保存的Maintenance接入fingerprint仍对应旧插件/profile配置；不是attestation构件失败。插件及patch升级使其失配，provider在stderr报错而stdout为空，外层才记录invalid-json。备份后通过正式integrations repair验证本目标，恢复connected/issues=[]，其他绑定、同步范围、profile包与配置均不变。证据：D:/AI/DeepSeekHarness-Plugin/artifacts/bridge-folder-binding-20260918/start-binding-repaired.json。随后单一控制方执行Start，08:41:53 prepare已成功；后续running身份仍需单独核验，不能以prepare成功替代。


### 正式启动结果

本轮正式Start最终成功：RC2副本/web为running，新origin为http://127.0.0.1:27583，boot为05c53aef-7f18-465e-b773-1fc7750b66e7，run-2f0d3ad7-9778-43fc-857b-c6258c9ecc22为running，Engine ready，all/revision0。端口仅本次证据，不写入固定绑定。准备完成至web入口约40秒；旧boot日志不能归入新启动故障。运行恢复不代表外部浏览器bundle根因、真实folder绑定或所有引用交互已通过。Engine仍.38，.39未激活。
