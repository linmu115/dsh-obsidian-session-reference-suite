---
id: EXT-better-sidebar
kind: dependency
title: 普通贴纸业务依赖：Better Sidebar
status: current
summary: 普通 Sticker 的侧栏承载依赖；缺席显示等待或不可用，不导致启动异常。
relations:
- relation: required_by
  to:
    record_id: MOD-sticker
  reason: 用户明确普通贴纸组合需要 Core、Bridge 与 Better Sidebar
---

# 普通贴纸业务依赖：Better Sidebar

用户明确当前普通 Sticker 同时使用 Core、Bridge 和 Better Sidebar。Better Sidebar 承载普通贴纸业务界面；这条依赖不让它拥有通用引用 UI，也不把 Core 的原生划选功能变成侧栏能力。

缺少所需服务时插件可正常启动，但对应业务显示等待或不可用；服务后来出现或卸载时按生命周期挂载/释放。此前“Better Sidebar 可选，普通贴纸可直接退回浮层”的方案被本轮要求取代，实际新行为由 [[VER-single-bridge-delivery]] 核验。
