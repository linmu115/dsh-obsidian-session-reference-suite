---
{
  "id": "IMP-context-progress",
  "kind": "implementation",
  "title": "长历史发送预览与压缩进度",
  "status": "current",
  "modules": [
    "Annotation Core"
  ]
}
---

验收：先展示待发送输入；显示真实压缩段数与等待时间；失败保留原因和草稿；正式提交不重复消息；保持当前引用原文及并行迁移接口。

Core 的 Remote 提交入口新增可选 gptSubmissionProgress 通知，覆盖引用提交及普通 claim 的完整准备过程。通知仅用于展示，不改变消息接纳、预算、引用注入或回执；展示回调异常不改变正式发送结果。客户端引用气泡、划选、Sidechat 和思维图接口未由本任务修改。源码改动在 src/host/submission-progress.ts、src/remote/service.ts。运行实例基于已有 0.3.12-rc2.18 界面构建 0.3.12-rc2.18-progress.1 增量包；并行任务正在准备 .19，后续整包须保留此接口。

[开发历程与验证边界](../history/context-progress.md)。
