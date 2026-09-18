---
id: VER-long-session-acceptance
kind: verification
title: 长会话验收记录与未关闭问题
status: current
---

# 长会话验收记录与未关闭问题

证据目录均为本机脱敏回执，不含连接令牌或历史正文。

- `D:/AI/DeepSeekHarness-Plugin/artifacts/bridge-folder-binding-20260918/installed.json` 与 `installed-verification.json`：两包安装、严格peer、导入、7份元数据哈希、正常停止证据、其他配置保留。源码Bridge122项测试；Sticker123项；不累加为跨端业务测试。
- `D:/AI/DeepSeekHarness-Plugin/artifacts/single-bridge-20260918/companion-vault-folder-installed.json`：Companion.3安装备份，data未改，用户重载后live proof/identity一致。Companion261项源码测试不是点击绑定验收。
- `D:/AI/DeepSeekHarness-Plugin/artifacts/single-bridge-20260918/dashboard-sync-sections-installed.json` 与 `dashboard-sync-sections-ui-verified.json`：Dashboard.1.5静态安装，两个子栏目切换与布局实查，未保存同步名单。
- `D:/AI/DeepSeekHarness-Plugin/artifacts/maintenance-engine39-install-20260918/installed.json`：.39独立安装27文件校验，8份配置备份，activated=false。Dashboard/Engine范围回归89项、类型/构建通过，不代表.39正在服务。

用户多次报告 Launcher/Edge仍出现 Failed to load plugins。曾见 loader entry 4ff96c4d、800a9aa0 和合并 `/plugins/??…client.js` 失败；GPT浏览器bundle200/首页可用只能证明当时该浏览器恢复。曾将外部失败概括为缺登录凭据，被用户“Launcher自己的入口也不行”纠正；登录303/cookie200不证明脚本执行正常。根因未闭环，维持待修复，不以只读检查通过关闭问题。

旧 [[VER-single-bridge-delivery]] 内的target=null、Companion.2未部署是历史时点，现由本记录及 [[IMP-long-session-status]] 续记替代，不抹掉当时失败。地图校验/Archify渲染属于文档验证，不能代替产品验收。


## 安装后启动续记

用户从Launcher正常停止后，两包安装与closed/finalized守卫已通过。随后正式Start在2026-09-18 08:32 UTC的prepare阶段两次返回exit=1 / invalid-json；当时Status为stopped，Engine仍ready。具体原因正在排查，不把安装成功写成实例恢复；依据Launcher runtime-lifecycle.trace.log及本次公开执行结果。


### 接入指纹修复（保留失败前因）

2026-09-18 08:40 UTC，确认prepare拒绝原因为保存的Maintenance接入fingerprint仍对应旧插件/profile配置；不是attestation构件失败。插件及patch升级使其失配，provider在stderr报错而stdout为空，外层才记录invalid-json。备份后通过正式integrations repair验证本目标，恢复connected/issues=[]，其他绑定、同步范围、profile包与配置均不变。证据：D:/AI/DeepSeekHarness-Plugin/artifacts/bridge-folder-binding-20260918/start-binding-repaired.json。随后单一控制方执行Start，08:41:53 prepare已成功；后续running身份仍需单独核验，不能以prepare成功替代。


### 正式启动结果

本轮正式Start最终成功：RC2副本/web为running，新origin为http://127.0.0.1:27583，boot为05c53aef-7f18-465e-b773-1fc7750b66e7，run-2f0d3ad7-9778-43fc-857b-c6258c9ecc22为running，Engine ready，all/revision0。端口仅本次证据，不写入固定绑定。准备完成至web入口约40秒；旧boot日志不能归入新启动故障。运行恢复不代表外部浏览器bundle根因、真实folder绑定或所有引用交互已通过。Engine仍.38，.39未激活。


### 引擎升级门禁修复与旧进程退出限制

2026-09-18 用户要求激活升级时，核验发现已打包.39的attestation engineVersion白名单仍截止.38，直接切换将被新版自身拒绝。最小修复92eca79加入.39/.40精确白名单，版本推进.40；32项回归及类型/构建/可移植性检查通过，新发行目录独立安装27文件校验通过。当前.38运行未变，.40尚未激活；旧.39保留作证据。

旧PID40736无控制台（AttachConsole错误6），.38无正式Engine stop/HTTP drain/IPC；不能把Windows process.kill(SIGTERM)冒充优雅退出。隔离fixture验证Start-Process Hidden保留console并能正常触发SIGINT；双击入口冷启动改用既有隐藏控制台启动脚本。CheckOnly仅验证当前连接；新引擎真实启动/退出还需后续核验。已做SQLite只读在线快照，但有一个active run，该快照不等于关闭后的全状态备份。一次性退出旧后台进程需明确例外授权，不自动执行。


## Engine .40 已激活（2026-09-18 最终续记）

当前运行版本为 **0.1.33-rc2.40**，PID51548，健康检查ready。以下结果替代本记录较早的“.38仍运行/.39或.40未激活”状态；旧段落保留为排错过程。原.39的版本枚举门禁只接受到.38，故没有激活.39；.40补齐.39/.40并包含在线activeScopes过滤。构建提交92eca79，32项测试、类型检查、构建及发行包校验通过。

用户正常停止副本后，确认会话closed、Launcher finalized/closed、无活动任务并完成最终备份，按用户明确的一次性例外结束旧.38 PID40736。这不是正常退出，授权不延续到后续重启。新.40 PID57996随后实际通过隐藏控制台SIGINT正常退出，取得requested、drained、owner.released、completed回执，再正常启动为PID51548；没有删锁或改运行状态数据库。正常Engine停止脚本仅支持可核验且未共享的控制台，并要求无活动托管run或任务；不能据此宣称DSH Launcher Stop/Restart已接通。

同步接口实测：原离线实例activeScopes为0，当前RC2副本为1。看板实际显示Maintenance与Codex并列子栏目，离线实例显示无在线运行；未修改同步名单、Vault绑定或笔记。通过正式integration repair刷新升级后失配的接入指纹，其他绑定、范围、包及配置保留。Launcher正式Start成功：副本/web running，boot 51386209-f905-4c6f-95d2-33b2b28e71e8，run-8a67195d-e8b0-4dc2-85f5-04767d91770e running，scope all/revision0。

本次看板地址http://127.0.0.1:58529/dashboard/，DSH地址http://127.0.0.1:17118；均为动态端口证据，不写入固定绑定。最终证据：D:/AI/DeepSeekHarness-Plugin/artifacts/maintenance-engine40-install-20260918/activated.json；最终备份位于同目录final-state-backup；正常退出回执C:/Users/19717/AppData/Local/DSH-Session-Maintenance/logs/engine-lifecycle/57996.jsonl。外部浏览器插件bundle故障根因、完整引用往返及真实folder绑定交互不属于本次已通过项。


### 后续并行任务事故（09:19 UTC）

CPA并行任务报告运行进程诊断动态import导致DSH fatal退出。主任务只读确认本轮run为recovered，Launcher handle finalized且finalReceipt.disposition=recovered（09:19:07.206Z）；Engine .40仍ready。先前running是升级完成时证据，事故后副本stopped，不伪装为正常closed。已将正式Start恢复交给该并行任务单一负责，本任务没有再次启动或注入进程。后续状态应以该任务恢复回执为准。证据已追加到activated.json的subsequentEvent。
