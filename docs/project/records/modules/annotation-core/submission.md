---
id: MOD-core-submit
kind: module
title: Core / 输入框与提交事务
status: current
summary: 在正确的输入框、引用版本与持久回执之间完成一次发送。
sources:
- path: ../../../dsh-annotation-core/README.md
  role: current-workspace-source
- path: ../../../dsh-annotation-core/docs/changes/2026-09-14-reference-submit-revision.md
  role: current-workspace-source
relations:
- relation: implements
  to:
    record_id: XR08
  reason: 草稿与幂等
- relation: consumes
  to:
    record_id: IF-core-host
  reason: 来源回调执行边界
- relation: provides
  to:
    record_id: IF-core-input-acceptance
  reason: Core 定义输入接收核对注册口，外部执行器提供准确回执
---

# Core / 输入框与提交事务

输入框显示统一引用气泡，正文和附件保持用户当前草稿。发送入口按当前会话与输入框身份取最新后端引用版本；准备期间再发生变更时保留草稿，刷新气泡并要求重试。

执行器接受且持久化确认后才转为 sent。响应丢失先查原提交回执，同样消息不重复发送；正文或附件变化使用新的提交身份。回链与删除的后台作业由 Core 所有，Adapter 实现来源侧动作。

该层修改应同时考虑异步刷新乱序、组件重新绑定、文件回执、容量预算和重复点击。当前证据来自 [发送冲突修复](../../../../../../dsh-annotation-core/docs/changes/2026-09-14-reference-submit-revision.md)；其历史测试结果不是本次重跑结果。

## Codex 执行器接入

[[INT-core-codex-runtime|预算、实时用量与受管工具接入]] 分别描述直接调用范围；[[IF-core-input-acceptance|输入接收扩展口]] 的定义归 Core，执行器只提供准确接收判断。
