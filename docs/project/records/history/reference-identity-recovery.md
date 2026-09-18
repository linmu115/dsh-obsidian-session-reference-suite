---
{
  "id": "HIST-reference-identity-recovery",
  "kind": "history",
  "title": "派生会话引用在重启后失联的修复历程",
  "date": "2026-09-18",
  "status": "current",
  "modules": [
    "Annotation Core"
  ],
  "summary": "原文仍在但身份错配；恢复四条引用并验证旧链接与重启持久性。",
  "outcome": "四条引用原文、注释和来源定位保持一致；再次重启后仍可读取，旧笔记标记可定位实际消息。",
  "applicability": "DSH 0.1.5-rc.2；Core 0.3.12-rc2.17；Maintenance 插件 0.2.26-rc2.28 / Engine 0.1.33-rc2.35。",
  "coverage_note": "Codex 整理本任务公开来源第 2783–3340 行；仅保存事件定位，不复制用户笔记内容。",
  "history": {
    "path": "history/reference-identity-recovery-20260918",
    "sha256": "4e7b2eccc9501c3b630dbde7ebdc19b5c781e5a66c0a29f5c88bd09b19f83bb2",
    "capture_sha256": "28fedfa221d2c3a4c57e9ae2bd048ec860f74d4242a271ff09facf9dfb8bde95"
  },
  "related_records": [
    "IMP-reference-identity-recovery"
  ]
}
---

用户反馈新引用发送成功后，重开 DSH 导致 Obsidian 跳转无效、DSH 注释消失，而旧测试引用正常。检查确认四条引用、用户消息及注入快照仍在；故障来自派生后的身份错配，并非恢复流程删除原文。原消息写入派生会话，Core 聚合与 Obsidian 链接仍使用派生前身份，重启后原 native ID 又指向镜像。

用户明确要求修复、恢复原引用并更新所属项目地图。本次未改写 Obsidian 笔记、未重新发送消息，未创建额外备份。
Core 从当前会话的 dsh-annotation 消息恢复 sent set：目标用户消息必须同时存在，快照摘要必须匹配，恢复保持原 set/reference/message 身份及引用原文。已有明确删除记录继续生效，不生成发送 admission 或新的反向链接任务。读取注释、解析引用链接及列出会话注释时执行幂等恢复；工具读取不再把 inheritedEventCount=0 的持久引用排除。

真实恢复初次暴露 Obsidian 快照含 documentKey 而存储采用严格 schema 的问题；剥离序列化关联字段，并按来源类型恢复合法 backlinkState。新增包含 Obsidian 文档快照的测试，避免仅用 DSH-message 样例误判通过。Core 发布为 0.3.12-rc2.17，Maintenance 配套插件 0.2.26-rc2.28、引擎 0.1.33-rc2.35；Obsidian 插件本次未修改。

验证：Core 39 个测试文件、248 项全部通过；Maintenance 28 项相关测试通过；相关类型检查和构建通过。真实实例恢复四条引用，逐条比较 selectedText、userComment 与 locator 和原记录相同。旧 Obsidian 笔记中的实际标记经定位接口返回 resolved，指向持有原消息的派生会话。正常关闭并第二次启动，run-499610e8-dec6-4c73-8f8e-a8f5a8e1ca24 中再次通过上述检查。旧错误目录四条已退役，正确归属四条有效。

验证边界：已验证真实存储及跳转使用的解析接口，没有代用户执行 Obsidian 前台点击。没有改变普通镜像会话的派生规则；无法唯一确认归属时继续拒绝猜测。
