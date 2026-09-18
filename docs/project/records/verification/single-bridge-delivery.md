---
id: VER-single-bridge-delivery
kind: verification
title: 单桥产品、地图与安装验收边界
status: current
summary: 单桥包组已安装，真实 Start 与浏览器基本加载通过；原加载失败根因未定，Vault 绑定及 Stop/Restart 仍阻塞，双向业务未验收。
sources:
- path: ../changes/2026-09-18-single-bridge-product.md
relations:
- relation: verifies
  to:
    record_id: DEC-single-bridge-product
- relation: verifies
  to:
    record_id: REQ-suite-boundary
- relation: qualifies
  to:
    record_id: IMP-cohort
---

> 2026-09-18 后续版本、安装和验收状态已由 [[IMP-long-session-status]] / [[VER-long-session-acceptance]] 续记；下列候选、失败和未部署描述保留其当时时点，不代表最新状态。


# 单桥产品、地图与安装验收边界

本轮用户纠正安装形态后，当前要求为一个 DSH Bridge 插件，Core、普通 Sticker 和可选 Maintenance 独立；Suite 是私有开发工作区，Protocol 内部依赖，旧 Adapter 退役。普通 Sticker 还需要 Better Sidebar 业务能力，缺席应等待/不可用而非启动异常。

本轮候选、替代关系、检查表和真实部署续填入口：[单桥更正与验收报告](../../../changes/2026-09-18-single-bridge-product.md)。旧 [[VER-vault-binding-implementation]] 的测试数字只覆盖当时包组，不能直接充当本轮新包回归或真实窗口证据。

主任务已回报新包源码阶段：Bridge b3cad82，21 文件 102 tests；Sticker 50a8c13，20 文件 123 tests；Suite 私有工作区 2480db1，8 文件 21 tests；Maintenance 发布出口修复 12 tests 及 Engine build，后续发行门禁 2e84ec3 的精确白名单另通过 32 tests、typecheck/build。隔离 official install 严格 peer 检查和备份已完成；后续实际安装、启动与只读窗口检查如下，不把源码测试扩大为全部业务验收。

## 实际安装、启动与未结项

- 已只读核对本机 `artifacts/single-bridge-20260918/installed.json`：Bridge .4.1-rc2.1、Sticker .7.4-rc2.3、SM plugin .29 / Engine .38、Companion .7.0-rc2.1 已安装；回执包含包哈希，旧 Suite/Adapter/Lifecycle/Protocol 四项缺席。其他插件和 Companion data 保留。精确版本及回执链接见报告。
- 执行主任务确认真实 Start 成功：origin `http://127.0.0.1:36928`，boot `85e3889c-b9f6-4624-a734-f5d4bbed4371`，run `run-68b9a983-155c-47d7-a94a-2c104b710b96` running；SM ready，all / revision 0。端口只是此时证据。
- BrowserUse 检查新启动及禁用缓存刷新：revision `9c1aa9e06508` HTTP 200 + loadingFinished，5,212,329 bytes；另两 bundle 为 372,610 / 6,726 bytes，均成功结束；没有 loadingFailed/runtime exception。插件列表仅一个 Bridge，Core 和普通 Sticker 也已启用/运行中。
- 只读打开一个已有托管会话：历史消息、40 轮导航与编辑器可加载，普通贴纸和笔记链接面板可打开/关闭。未发送消息、调用模型、编辑笔记或绑定；不保存会话标题/正文，不代表双向引用、气泡样式和全部交互已通过。
- 原 Failed load 根因仍未确定，只能确认当前恢复。未映射草稿的普通 Sticker warn 和可选 performance SSE 404 仍存在，不能未经证据将其等同原故障或 Core 故障。
- Stop/Restart 现以 `LAUNCHER_STOP_UNAVAILABLE` 在写操作前拒绝。首次真实重启走 finalized/recovered；直接 appExit 缺 Launcher beforeStop，requestedStop=false。恢复已完成，但正常停止/重启入口尚未接通。
- Vault 当前 revision 0 / target=null，renderer fetch 失败，真实绑定仍待处理。Companion .2 源码修复已测试未部署；不能把本地修复写成当前安装行为。

因此当前结论为“安装与基本加载已验收，绑定及完整停止链路受阻，引用双向业务未验收”，不是第一阶段全部通过。以上后续事实来自主任务实际回报与本机回执，晚于现有 ledger 截点。

## 本次地图检查结果

- project_map：111 条记录，0 错误、0 警告；原项目、记录及来源身份保留。
- 架构与流程结构检查通过；分别保留 109/4 项布局提示，未将“通过硬检查”写成无交叉布局。
- 现有 A/B 阅读页已刷新。隔离 headless Chrome 打开概览、架构、流程及新决定页，页面无横向溢出；截图人工核对嵌入图和记录正文可见，不控制用户浏览器。
- 原生图 visual-check 对独立页面的纵向滚动报告 overflow；文本与控件间距通过，完整 visual-check 并非全通过。派生回执与截图路径见单桥报告。
- 文档子任务没有运行产品服务、部署副本、写用户 Vault 或调用模型；执行主任务的安装与只读检查结果单列于上文。

## 公开来源与安装前证据补齐

[[HIST-vault-instance-binding]] 现绑定新范围索引 `history/20260918-single-bridge-product-correction`，保留原事件身份和旧索引。777 个公开事件、352 组工具调用/返回全部配对，排除隐藏推理和非文本内容。用户对单桥产品、三项贴纸依赖、Core 上下文/UI 责任的原始确认可分别展开。

只读检查的暂存回执确认独立业务根与旧安装项缺席，公开入口导入成功且 failures 为空；备份回执确认 2026-09-18 06:11:46 UTC 的维护数据库、状态、profile 元数据和 Companion 完整目录已保存。两者不等于真实安装；后续安装依据为独立 installed.json，启动与窗口依据为主任务实际回报。旧事件索引和所有项目/记录/来源 ID 保留。
