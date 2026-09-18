---
id: MOD-core-ui
kind: module
title: Core / 通用引用 UI 与输入框绑定
status: current
summary: 共享气泡、注解编辑、历史详情及引用定位；引用状态仍由 Core 管理。
sources:
- path: ../../../dsh-annotation-core/src/client/reference-rail.tsx
  role: source-reviewed-2026-09-16
- path: ../../../dsh-annotation-core/src/client/reference-dialog.tsx
  role: source-reviewed-2026-09-16
- path: ../../../dsh-annotation-core/src/client/composer-binding.tsx
  role: source-reviewed-2026-09-16
- path: ../../../dsh-annotation-core/src/client/conversation-node.tsx
  role: source-reviewed-2026-09-16
- path: ../../../dsh-annotation-core/src/client/answer-link.ts
  role: source-reviewed-2026-09-16
relations:
- relation: consumes
  to:
    record_id: IF-core-client
  reason: 公共输入框与来源导航边界
- relation: implements
  to:
    record_id: XR08
  reason: 保留草稿和当前输入框
---

# Core / 通用引用 UI 与输入框绑定

Core 提供待发送引用条、来源/快照状态、注解编辑、删除、发送后历史详情及回答“注释 N”定位。主输入框与内嵌输入框复用状态和展示协议；侧栏、选区入口和画布由消费者提供。

ReferenceSessionStore 从后端读取/订阅当前 pending 集，忽略较旧修订；ReferenceRail 按引用身份显示气泡与来源状态；ReferenceDialog 只有 pending 可编辑，历史详情仍可读取。输入框绑定保留用户正文、附件和当前会话身份，不能把旧组件引用带到新会话。界面没有材料时不代表后端已删除。

该层与 [[MOD-core-submit|提交事务]]分开维护：展示气泡不能证明 sent；用户发送后仍须得到持久回执。对外复用接口由 [[IF-core-client]]维护，其中 EmbeddedComposerHandle 提供状态、引用条和释放绑定。[[INT-sticker-core]]与[[INT-reference-core]]各自说明入口怎么使用 Core，不能把 Core 的通用 UI 缩成 Obsidian 双链。

当前源码存在不等于本次完成真实主/侧/嵌入输入框验收。

源码入口：[reference-rail.tsx](../../../../../../dsh-annotation-core/src/client/reference-rail.tsx)、[reference-dialog.tsx](../../../../../../dsh-annotation-core/src/client/reference-dialog.tsx)、[composer-binding.tsx](../../../../../../dsh-annotation-core/src/client/composer-binding.tsx)、[conversation-node.tsx](../../../../../../dsh-annotation-core/src/client/conversation-node.tsx)、[answer-link.ts](../../../../../../dsh-annotation-core/src/client/answer-link.ts)。
