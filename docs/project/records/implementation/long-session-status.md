---
id: IMP-long-session-status
kind: implementation
title: 长会话交付状态：已安装、已生效与待验收
status: current
---

# 长会话交付状态：已安装、已生效与待验收

截至本轮安装回执：

| 组件 | 版本与实际状态 |
| --- | --- |
| DSH Bridge | 0.4.1-rc2.3，CLI/skill 版本已安装并 active；skill 目录通过，Agent 调用待验收 |
| 普通 Sticker | 0.7.4-rc2.5，已安装并 active；新增 Bridge .3 peer 兼容，28 个运行源码文件保持原实现 |
| Obsidian Companion | 0.7.0-rc2.3，math已安装、用户重载；live路径证明和在线身份一致已核验 |
| Dashboard | 0.1.5，当前引擎静态页已更新；Maintenance/Codex并列标签及卡片间距经过实际浏览器检查 |
| Maintenance Engine | 0.1.33-rc2.40已安装并激活，ready；.39因版本门禁缺陷未激活，由.40替代 |
| Core / SM DSH plugin | 本次没有升级；此前为Core .3.12-rc2.19 / SM plugin .2.26-rc2.29 |

math先前revision1绑定RC2副本成功；本轮新路径proof核验没有重新绑定或写笔记。引擎.39修复activeScopes错误包含离线历史run，单更新看板不能使此后端修复生效。当前详情折叠限高只解决展示长度，不伪造去重。

Bridge安装保留新增gpt-compat-accounts配置。停止回执确认旧run closed、Launcher handle finalized/closed、live identity消失；本轮正式启动与后续运行状态见验收续记。引擎.39切换仍缺安全停止链路，未绕过。桌面维护看板入口缺失/路径错位已补齐，CheckOnly能连接现运行引擎，不代表验证从零启动。

双侧 Bridge 的 CLI 专用操作已形成 DSH .3 源码候选：skill、绑定目标解析和 CLI 派发已实现；本机 CLI 已启用、真实只读与桥重载通过。Bridge .3 / Sticker .5 已部署并 active，skill 目录已核验；Plugin API 补充执行器尚未实现。见 [[IMP-obsidian-cli]]、[[VER-obsidian-cli]]。真实文件夹选择→绑定交互、完整引用往返及外部浏览器故障根因仍未验收。源码、安装与UI证据分开见 [[VER-long-session-acceptance]]。


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
