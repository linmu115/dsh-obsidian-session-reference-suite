---
id: EXP-acceptance-blockers
kind: experience
title: 验收卡点：加载故障、错误归因、页面层级与安装门禁
status: current
date: 2026-09-18
task_id: HIST-vault-instance-binding
summary: 按故障保留用户反馈、误判纠偏、修复和待验证边界。
modules: [Bridge, Companion, Maintenance, Launcher]
applicability: 本任务DSH 0.1.5-rc.2副本及math Vault，2026-09-18。
coverage_note: Codex依据本任务公开会话9至5944行及脱敏安装回执整理。
related_records: [VER-long-session-acceptance, IMP-long-session-status]
categories: [debugging, verification, human-correction]
results: [failed, passed, pending]
outcome: UI与安装多项修复；外部浏览器根因和新版引擎激活未闭环
---

# 验收卡点：加载故障、错误归因、页面层级与安装门禁

本次不是单一故障：浏览器脚本加载、绑定运行代次、维护引擎、UI层级和安装激活具有不同证据。

| 现象/卡点 | 当时尝试与纠偏 | 已有结果/剩余边界 |
| --- | --- | --- |
| Launcher/Edge Failed to load plugins | GPT浏览器首页及bundle成功后过早概括可用；缺凭据解释被用户反例推翻 | 保留原错误与两次loader身份；外部浏览器根因未闭环 |
| 无法检查Edge | 用户已装扩展仍无法控制，要求改用Chrome | 工具连接失败不是用户页面正常；不能再次让用户替代可用浏览器检查 |
| math绑定失败 | 修复在磁盘，Obsidian运行旧代码；重载后核验真实绑定 | revision1已成功；新folder action仍需独立真实验收 |
| 扩展页层级错误 | 新开外层栏目不符合需求；用户明确嵌入Obsidian系列 | 修正为扩展→插件→数据/信息；避免把所有Adapter塞平铺页 |
| 同步挤在一起/31条历史范围 | 并列标签、补padding、详情折叠；Engine改在线判定 | UI.1.5已验收，Engine.39未激活，不能假去重掩盖错误 |
| 引擎未启动/双击入口坏 | 补启动即看板，后发现桌面cmd与lnk路径错位 | 已修路径、运行中连接验证；未称冷启动复测成功 |
| 假定Launcher内部方法等于CLI | 直接runtime退出导致recovered而非closed | 禁止把202/进程消失当正常停止；正式外部Stop仍未接通 |
| 升Bridge触发peer冲突 | Sticker精确依赖旧桥；拒绝忽略peer | 仅兼容发布.4，strict隔离安装通过 |
| 安装期间配置并发变化 | hash守卫阻止覆盖新增gpt插件 | 保留最新节点，精确更改两版本字段，其他配置不变 |
| 源码完成被误读为安装完成 | 多包“候选组合”引发用户追问单桥安装 | 单桥边界明确，源码/安装/激活/UI分别记录 |

原始反馈与过程依据统一从 [[HIST-vault-instance-binding]] 展开；验收回执见 [[VER-long-session-acceptance]]。经验适用于本机本次版本，不能扩展为所有浏览器或所有实例的结论。


## 安装后启动续记

用户从Launcher正常停止后，两包安装与closed/finalized守卫已通过。随后正式Start在2026-09-18 08:32 UTC的prepare阶段两次返回exit=1 / invalid-json；当时Status为stopped，Engine仍ready。具体原因正在排查，不把安装成功写成实例恢复；依据Launcher runtime-lifecycle.trace.log及本次公开执行结果。


### 接入指纹修复（保留失败前因）

2026-09-18 08:40 UTC，确认prepare拒绝原因为保存的Maintenance接入fingerprint仍对应旧插件/profile配置；不是attestation构件失败。插件及patch升级使其失配，provider在stderr报错而stdout为空，外层才记录invalid-json。备份后通过正式integrations repair验证本目标，恢复connected/issues=[]，其他绑定、同步范围、profile包与配置均不变。证据：D:/AI/DeepSeekHarness-Plugin/artifacts/bridge-folder-binding-20260918/start-binding-repaired.json。随后单一控制方执行Start，08:41:53 prepare已成功；后续running身份仍需单独核验，不能以prepare成功替代。


### 正式启动结果

本轮正式Start最终成功：RC2副本/web为running，新origin为http://127.0.0.1:27583，boot为05c53aef-7f18-465e-b773-1fc7750b66e7，run-2f0d3ad7-9778-43fc-857b-c6258c9ecc22为running，Engine ready，all/revision0。端口仅本次证据，不写入固定绑定。准备完成至web入口约40秒；旧boot日志不能归入新启动故障。运行恢复不代表外部浏览器bundle根因、真实folder绑定或所有引用交互已通过。Engine仍.38，.39未激活。


## Engine .40 已激活（2026-09-18 最终续记）

当前运行版本为 **0.1.33-rc2.40**，PID51548，健康检查ready。以下结果替代本记录较早的“.38仍运行/.39或.40未激活”状态；旧段落保留为排错过程。原.39的版本枚举门禁只接受到.38，故没有激活.39；.40补齐.39/.40并包含在线activeScopes过滤。构建提交92eca79，32项测试、类型检查、构建及发行包校验通过。

用户正常停止副本后，确认会话closed、Launcher finalized/closed、无活动任务并完成最终备份，按用户明确的一次性例外结束旧.38 PID40736。这不是正常退出，授权不延续到后续重启。新.40 PID57996随后实际通过隐藏控制台SIGINT正常退出，取得requested、drained、owner.released、completed回执，再正常启动为PID51548；没有删锁或改运行状态数据库。正常Engine停止脚本仅支持可核验且未共享的控制台，并要求无活动托管run或任务；不能据此宣称DSH Launcher Stop/Restart已接通。

同步接口实测：原离线实例activeScopes为0，当前RC2副本为1。看板实际显示Maintenance与Codex并列子栏目，离线实例显示无在线运行；未修改同步名单、Vault绑定或笔记。通过正式integration repair刷新升级后失配的接入指纹，其他绑定、范围、包及配置保留。Launcher正式Start成功：副本/web running，boot 51386209-f905-4c6f-95d2-33b2b28e71e8，run-8a67195d-e8b0-4dc2-85f5-04767d91770e running，scope all/revision0。

本次看板地址http://127.0.0.1:58529/dashboard/，DSH地址http://127.0.0.1:17118；均为动态端口证据，不写入固定绑定。最终证据：D:/AI/DeepSeekHarness-Plugin/artifacts/maintenance-engine40-install-20260918/activated.json；最终备份位于同目录final-state-backup；正常退出回执C:/Users/19717/AppData/Local/DSH-Session-Maintenance/logs/engine-lifecycle/57996.jsonl。外部浏览器插件bundle故障根因、完整引用往返及真实folder绑定交互不属于本次已通过项。


## Dashboard .1.6 导航纠错（2026-09-18）

用户再次验收指出：Obsidian专属信息页被前端错误套用到GPT与ThoughtDAG，顶部选择仍为气泡样式，整页内容被大卡片包裹。原因是ExtensionCategoryView以全局listBusinessPages能力存在作为显示通用信息入口的条件，而不是检查当前Adapter注册。现已改为固定数据页加实际namespace/provider注册页；移除两个未注册的空信息入口，自定义页面使用注册标题；顶部平直一级/二级导航，正文整页切换，保留草稿与幂等回执。此修订替代此前“所有插件都有数据与信息两页”的错误概括。

11项针对性测试、Dashboard类型检查及构建通过。当前Engine .40静态部署Dashboard .1.6，17个文件逐项哈希一致，旧静态资源备份并保留；未重启Engine或DSH，同一boot 5c70b708-f8f4-43e7-842d-9419ab58d142 / run-cf18aaf6-8b8f-4ef7-aba6-37fbca6859ca持续running，Engine PID51548。工作区范围、接入登记和Launcher hook内容未变。真实浏览器分别打开GPT、ThoughtDAG、Obsidian信息页以及Maintenance/Codex同步页，确认入口归属、两层底线导航和无外层卡片的正文切换；没有执行绑定、解除或保存名单。

证据与备份：D:/AI/DeepSeekHarness-Plugin/artifacts/dashboard-0.1.6-navigation-20260918/installed.json及dashboard-before。两次部署脚本校验故障也保留说明：第一次Windows basename处理错误发生在覆盖前；第二次覆盖后误用inspect返回结构导致回执写入失败，随后按live.bootId/run.id完成独立哈希和持续运行核验。未用脚本成功代替视觉验收。用户本次要求不用子代理，收到后立即停止已派出的代理，后续代码、测试、安装与浏览器检查均由主任务完成。
