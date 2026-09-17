---
{
  "id": "IMP-reference-send",
  "kind": "implementation",
  "title": "引用重试和压缩前预算修复",
  "status": "current",
  "modules": [
    "Annotation Core"
  ]
}
---

Core src/host/submission-budget.ts 先运行宿主上下文选择，再计选中请求；submit-annotated.ts 在允许检查点变更的同时继续检查模型与会话竞态。Obsidian Bridge src/main.ts 修复旧快照重试，保留真实选区校验。

需求：先压缩旧历史，再原样注入本次引用与正文；不因单纯设置操作新增会话。

[开发过程、测试与部署边界](../history/reference-send.md)。

当前边界以请求中本次用户消息 ID 为准，避免把已完成旧轮次当作草稿保护。准备阶段还包含四类内部上下文事件；这些事件本身不触发派生。版本与真实验证状态见开发历程。
