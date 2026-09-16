---
id: MOD-companion-viewer
kind: module
title: Companion / Viewer 与 Bridge
status: current
summary: Viewer 是真实 DSH 会话界面；Bridge 核对页面与实例并保存可恢复交接。
sources:
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/README.md
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/webviewer/adapter.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/webviewer/launch-url.ts
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/bridge/server.ts
  role: current-workspace-source
relations:
- relation: implements
  to:
    record_id: REQ-selection
  reason: 页面隔离
- relation: provides
  to:
    record_id: IF-companion-reference
  reason: 队列租约交接
---

# Companion / Viewer 与 Bridge

Viewer 复用已打开的完整 DSH 会话页面。surfaceId 放在登录跳转仍保留的位置；Bridge 在读取队列、领取和重试时共同核对页面与 dshInstanceId。独立窗口仍可导航、回链和删除，但不能抢新投递。

Lifecycle 持续提供真实 DSH Web 地址与运行租约，适应动态端口。Companion 的 Bridge 监听本机并处理状态/租约与引用/知识操作。配置改变后需要“应用”；Web 和 Bridge 地址不能混用。

DSH 回跳经过 Obsidian 官方协议进入插件；打开笔记只复用主编辑区 Markdown 页签，不替换 Viewer。源代码入口 [Viewer adapter](../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/webviewer/adapter.ts)、[启动地址](../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/webviewer/launch-url.ts)、[本机服务](../../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/bridge/server.ts)。
