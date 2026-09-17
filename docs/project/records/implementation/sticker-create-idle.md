---
id: IMP-sticker-create-idle
kind: implementation
title: 首次保存接入安全迁移，几何监听按需启用
status: current
summary: Sticker Board 客户端修复已部署到当前副本并推送源码；保留旧数据保护和侧边栏配置。
progress: implemented
relations:
- relation: implements
  to:
    record_id: REQ-sticker-create-idle
  reason: 恢复首次创建并减少空覆盖层计算
- relation: qualified_by
  to:
    record_id: VER-sticker-create-idle
  reason: 测试和实际部署证据边界
---

# 首次保存与覆盖层更新

原流程在普通贴纸保存前读取 Maintenance 数据，但任何没有 active 迁移记录的会话均被拒绝，创建入口没有迁移恢复路径。现在客户端通过已有同源授权接口读取 `legacy-state`，保留结构化错误码；只有显式保存遇到 `STICKER_MIGRATION_REQUIRED` 时才调用现有迁移逻辑。迁移完成后重新读取权威版本并保存，网络等其他错误不触发迁移。冲突提示指向“会话贴纸 → 迁移旧贴纸”，保留编辑内容。首次迁移依赖 Obsidian Bridge 在线。

普通贴纸覆盖层仅在存在贴纸或文字选区时监听几何变化；来源标记层仅在存在标记时监听。没有选区时跳过共享工具栏查找，相同属性重复写入不安排新一轮几何计算。已有标记的滚动、尺寸变化和范围缓存逻辑继续工作。

源码为 [Sticker Board 提交 e744bec](https://github.com/linmu115/dsh-session-sticker-board/commit/e744bec)，分支 `codex/sticker-create-and-idle-geometry-20260917`。构建依赖对齐已部署的 Annotation Core 0.3.12-rc2.12 与 Lifecycle 0.3.3-rc2.16；没有修改这两个依赖插件源码，也没有改变提供方接口。

部署为 0.7.3-rc2.18 上的客户端本地补丁，更新六个客户端源文件及 client.js/source map，已备份原文件。没有发布新的 npm 版本，不能把原 0.7.3-rc2.18 安装包等同于已含此修复。当前实例继续保留 Better Sidebar 的 nativeSurface=false；该开关不是本提交内容。

## 本次开发历程（公开上下文草稿）

2026-09-17，用户补充准确报错后，检查确认阻断点是迁移回执保护，修复选择复用已有安全迁移，而非删除保护或伪造回执。性能检查确认两个空覆盖层仍监听全页，随后增加按需监听和无变化属性过滤。构建时发现本地开发依赖比部署版本旧，已对齐部署归档。首次完整检查曾因测试与重建并行读取构建目录而失败，构建结束后串行重跑通过。最终部署并核验服务器提供的可执行代码；实际用户点击延迟仍待反馈。

本段由当前任务的公开消息、工具结果和代码提交整理，只覆盖此次修复和推送，不追补更早的侧边栏适配历史。尚未绑定原会话事件索引，属于过程草稿，不作为可展开的正式 history 记录。
