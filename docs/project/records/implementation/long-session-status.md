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
| DSH Bridge | 0.4.1-rc2.2，已在正常停止副本后安装；文件夹绑定入口真实交互待验收 |
| 普通 Sticker | 0.7.4-rc2.4，已安装；仅新增 Bridge .1/.2 peer兼容，28个运行源码文件保持原实现 |
| Obsidian Companion | 0.7.0-rc2.3，math已安装、用户重载；live路径证明和在线身份一致已核验 |
| Dashboard | 0.1.5，当前引擎静态页已更新；Maintenance/Codex并列标签及卡片间距经过实际浏览器检查 |
| Maintenance Engine | 0.1.33-rc2.39已安装到独立目录；尚未激活，当前运行与启动配置仍为.38 |
| Core / SM DSH plugin | 本次没有升级；此前为Core .3.12-rc2.19 / SM plugin .2.26-rc2.29 |

math先前revision1绑定RC2副本成功；本轮新路径proof核验没有重新绑定或写笔记。引擎.39修复activeScopes错误包含离线历史run，单更新看板不能使此后端修复生效。当前详情折叠限高只解决展示长度，不伪造去重。

Bridge安装保留新增gpt-compat-accounts配置。停止回执确认旧run closed、Launcher handle finalized/closed、live identity消失；本轮正式启动与后续运行状态见验收续记。引擎.39切换仍缺安全停止链路，未绕过。桌面维护看板入口缺失/路径错位已补齐，CheckOnly能连接现运行引擎，不代表验证从零启动。

双侧Bridge通用操作通道、真实文件夹选择→绑定交互、完整引用往返及外部浏览器故障根因仍未验收。源码、安装与UI证据分开见 [[VER-long-session-acceptance]]。


## 安装后启动续记

用户从Launcher正常停止后，两包安装与closed/finalized守卫已通过。随后正式Start在2026-09-18 08:32 UTC的prepare阶段两次返回exit=1 / invalid-json；当时Status为stopped，Engine仍ready。具体原因正在排查，不把安装成功写成实例恢复；依据Launcher runtime-lifecycle.trace.log及本次公开执行结果。


### 接入指纹修复（保留失败前因）

2026-09-18 08:40 UTC，确认prepare拒绝原因为保存的Maintenance接入fingerprint仍对应旧插件/profile配置；不是attestation构件失败。插件及patch升级使其失配，provider在stderr报错而stdout为空，外层才记录invalid-json。备份后通过正式integrations repair验证本目标，恢复connected/issues=[]，其他绑定、同步范围、profile包与配置均不变。证据：D:/AI/DeepSeekHarness-Plugin/artifacts/bridge-folder-binding-20260918/start-binding-repaired.json。随后单一控制方执行Start，08:41:53 prepare已成功；后续running身份仍需单独核验，不能以prepare成功替代。


### 正式启动结果

本轮正式Start最终成功：RC2副本/web为running，新origin为http://127.0.0.1:27583，boot为05c53aef-7f18-465e-b773-1fc7750b66e7，run-2f0d3ad7-9778-43fc-857b-c6258c9ecc22为running，Engine ready，all/revision0。端口仅本次证据，不写入固定绑定。准备完成至web入口约40秒；旧boot日志不能归入新启动故障。运行恢复不代表外部浏览器bundle根因、真实folder绑定或所有引用交互已通过。Engine仍.38，.39未激活。
