---
{
  "id": "IMP-reference-identity-recovery",
  "kind": "implementation",
  "title": "重启后引用身份恢复与旧链接定位",
  "status": "current",
  "modules": [
    "Annotation Core"
  ]
}
---

需求与验收：恢复原有引用及旧链接，重启后继续有效；保留原文、明确删除状态和实例隔离。

Core 从当前会话的 dsh-annotation 消息恢复 sent set：目标用户消息必须同时存在，快照摘要必须匹配，恢复保持原 set/reference/message 身份及引用原文。已有明确删除记录继续生效，不生成发送 admission 或新的反向链接任务。读取注释、解析引用链接及列出会话注释时执行幂等恢复；工具读取不再把 inheritedEventCount=0 的持久引用排除。

真实恢复初次暴露 Obsidian 快照含 documentKey 而存储采用严格 schema 的问题；剥离序列化关联字段，并按来源类型恢复合法 backlinkState。新增包含 Obsidian 文档快照的测试，避免仅用 DSH-message 样例误判通过。Core 发布为 0.3.12-rc2.17，Maintenance 配套插件 0.2.26-rc2.28、引擎 0.1.33-rc2.35；Obsidian 插件本次未修改。

[开发历程与真实验证](../history/reference-identity-recovery.md)。
