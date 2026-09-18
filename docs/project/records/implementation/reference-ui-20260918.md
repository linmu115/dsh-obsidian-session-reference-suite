---
id: IMP-reference-ui-20260918
kind: implementation
title: Codex 风格引用 UI 与仅引用发送
status: current
---

用户来源：2026-09-18 当前任务明确要求并授权开始修改；完整会话来源索引待绑定。

## 当前要求

引用气泡仅显示数量，悬停展开列表，点击编辑评论。被引用原文只读，选错删除重选。
整体样式模仿 Codex；编辑 Enter 保存、Shift+Enter 换行、Esc 取消，中文输入法选词不提交；编辑期间不因失焦丢失。
提供垃圾桶与已有来源跳转（上下文、跨会话、Obsidian），不提供麦克风。选区操作改纵向菜单。
有有效引用时允许空正文和空评论发送；没有正文也没有引用时不能发送；失败保留草稿。

## 本次历程草稿

已定位 Annotation Core 与 Sidechat；发现客户端、Host 与用户消息构造均存在正文非空限制。
按用户纠正将修改范围限定为评论，不改所选原文。已完成实现与本地安装；没有重启运行中的实例。版本为 Core 0.3.12-rc2.18、Sidechat 0.4.7-rc2.13。

## 实现与验证

Core 改为数量气泡、悬停列表、明确保存评论与来源图标跳转；Sidechat 改为纵向选区菜单。
客户端及 Host 只对有引用的提交放行空正文，空普通消息继续拒绝，不添加虚构正文。
原生 rc.2 输入框还存在发送按钮禁用和空正文附件提前退出两个限制，使用显式 allowEmpty claim 的小范围兼容补丁。
补丁位于 Core scripts/patch-native-reference-input.mjs，拒绝未知构建。已安装在目标 profile 的独立 native 包副本，原共享 runtime 未改变。

两包类型检查与构建通过。Core 251 项、Sidechat 102 项回归通过；包括空引用正文的持久化、无引用空消息拒绝、Enter/Shift+Enter/中文输入确认。
真实 React 组件浏览器预览验证数量收起、展开列表、编辑回车保存、纵向菜单外观、方向键和 Esc。
三类跳转沿用既有 source adapter；本轮未逐一对真实 Obsidian/跨会话目标做端到端跳转或调用真实模型发送。

安装位置：Launcher 的 0.1.5-rc.2 副本 / web profile。安装归档字节核对通过，Maintenance 19 项现有 attestation 校验保持有效。
部署回执与回退文件：D:/AI/DeepSeekHarness-Plugin/artifacts/reference-ui-20260918/。
生效边界：需要重启该 DSH 实例并刷新页面；本次未中断会话，不能将安装完成表述为运行时验收通过。
