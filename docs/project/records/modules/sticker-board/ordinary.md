---
id: MOD-sticker-ordinary
kind: module
title: Sticker / 普通贴纸与旧数据迁移
status: current
summary: Markdown 编辑、高亮与笔记回链；旧本地对象经显式迁移后切换写入所有者。
sources:
- path: ../../../dsh-session-sticker-board/README.md
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/sticker-workspace.ts
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/client/sticker-store.ts
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/src/host/local-store.ts
  role: current-workspace-source
relations:
- relation: implements
  to:
    record_id: ST11
  reason: 保护普通符号与高亮
- relation: consumes
  to:
    record_id: IF-lifecycle
  reason: 外部同步可恢复
---

# Sticker / 普通贴纸与旧数据迁移

普通贴纸为 user 或 assistant 选区保存 Markdown、标签和颜色，使用真实文本锚点恢复跨行、列表和格式节点的选区。红色普通贴纸入口不被蓝色上下文引用覆盖。

复制笔记链接后，Obsidian 原生索引发现回链。删除先提交 DSH 本地状态，再在线清理或保留待同步任务。已有本地与 Vault 内容冲突必须选择保留哪侧；迁移按会话显式执行，切换到 Maintenance 后避免继续双写。

代码维护入口为 [工作区](../../../../../../dsh-session-sticker-board/src/client/sticker-workspace.ts)、[浏览器记录](../../../../../../dsh-session-sticker-board/src/client/sticker-store.ts) 与 [旧本地存储](../../../../../../dsh-session-sticker-board/src/host/local-store.ts)。这里只用来定位职责，没有把每个私有函数建成地图模块。
