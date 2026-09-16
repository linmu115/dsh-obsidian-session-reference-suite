---
id: EXT-business-adapters
kind: interface
title: 外部合同入口：业务扩展 Adapter 与领域操作
status: current
summary: 外部真源保留 schema、writer、版本与归属；通用数据接口和上下文领域能力各自守边界。
sources:
- path: ../../../dsh-session-maintenance/packages/contracts/src/extension-data.ts
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/extensions/plugin-data-integration.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-15-extension-ownership-and-session-reader.md
  role: current-workspace-source
- path: ../../../dsh-annotation-core/README.md
  role: current-workspace-source
relations:
- relation: related
  to:
    record_id: REQ-directory-owner
  reason: 当前归属规则
---

# 外部合同入口：业务扩展 Adapter 与领域操作

这是 Maintenance 对业务对象的接入合同。业务宿主在可信实例绑定中报告 namespace、插件版本和 writerId，经过启用/兼容/权限核查后进行读写。Engine 保存当前对象和修订，冲突返回两侧内容，调用者保留未确认编辑。

完整类型以 [ExtensionDataAdapter 与写入类型](../../../../../../dsh-session-maintenance/packages/contracts/src/extension-data.ts) 为权威；通用持久化与恢复约定见 [公共接入说明](../../../../../../dsh-session-maintenance/docs/extensions/plugin-data-integration.md)。该说明中的初始版本表属于早期阶段，不能拿它覆盖当前配置。新增 ownership 和业务目录规则以 [2026-09-15 归属规格](../../../../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-15-extension-ownership-and-session-reader.md) 为准。

通用 ExtensionCapabilities 的 context 固定 false；这并不否认后续专门 annotation-context / graph 领域能力。Core 的原生上下文工具经匹配领域 Adapter 和会话范围授权，不由通用对象 save API 自动获得模型材料或任意图写权限。

## 已知接入者

- [Sticker](../../modules/sticker-board/integrations/maintenance.md)：stickers 及真实会话/知识链接交互。
- [Companion](../../modules/obsidian-companion/integrations/maintenance.md)：obsidian-links，笔记正文仍属 Vault。
- [Core](../../modules/annotation-core/context.md)：固定上游/annotation-context 领域功能。
- [轻量镜像](core-directory-consumer.md)：annotation-records，看板只读，撤销回到 Core。

ThoughtDAG 是 README 确认的可选接入者，源码不在本次材料范围。具体 namespace 的启用状态分别判断，不能因一个面板可见就说整组可写。
