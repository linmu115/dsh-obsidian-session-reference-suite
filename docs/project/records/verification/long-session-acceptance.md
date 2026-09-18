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
