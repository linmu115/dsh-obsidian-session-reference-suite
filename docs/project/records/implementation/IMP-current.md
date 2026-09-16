---
id: IMP-current
kind: implementation
title: 当前组合能做什么
status: current
summary: 笔记选段投递、真实会话引用、双向导航、贴纸与精确清理已有源码实现。
progress: implemented
gap: 完整公开发布可重现性仍受本地依赖约束；真实双窗口操作与长时间并发、离线组合体验需按实际包组验收。本轮只整理地图。
relations:
- relation: implements
  to:
    record_id: REQ-selection
- relation: implements
  to:
    record_id: REQ-links
- relation: implements
  to:
    record_id: REQ-delete
sources:
- file: ../../README.md
---

# 当前组合能做什么

从笔记选文到 DSH 气泡，再到提交与回链是一条完整流程。另有笔记关联、独立会话贴纸、蓝色来源符号与精确删除，以及断线重试和冲突提示。

现在的职责已转向 Maintenance 管理已迁移的业务对象；不能采用旧 0.3.3 文档中“Sticker 本地状态是所有对象唯一真源”的笼统解释。普通旧对象仍遵守原有迁移激活回执，不因为整理地图自动搬迁。

本图覆盖用户实际维护的七成员组合，不额外给每个成员创建一张地图。直接从模块条目阅读各仓库原文；接口关系链接到 Maintenance 与 ThoughtDAG 的项目 ID。
