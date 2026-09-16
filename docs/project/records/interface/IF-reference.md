---
id: IF-reference
kind: interface
title: 插件怎样创建、提交和撤销引用
status: current
summary: Core 接收外部来源与目标身份，维护待发送、提交和撤销；宿主负责真实模型请求。
relations:
- relation: consumes
  to:
    record_id: IF-graph
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
sources:
- file: ../../README.md
- file: ../../../dsh-annotation-core/README.md
---

# 插件怎样创建、提交和撤销引用

## 对用户意味着什么

引用先放进真实会话的气泡，草稿和附件保留。用户可以检查、取消，或随问题发送。插件不得另开模型通道，也不得用一次普通打开笔记替代引用动作。

## 交接与失败

Lifecycle 识别有效实例、profile 与内嵌页面；Reference Adapter 把对应候选交给 Core。Core 维护稳定引用身份、目标会话和可靠提交状态；提交成功再由桥接写回来源。ThoughtDAG 和 Sticker 同样复用 Core 的统一创建、准备和撤销能力。

撤销必须阻断后续读取并同步图/来源标记。投递超时保留可核对的事务，不能自动改投另一个会话；重复事件通过身份去重。固定范围及暂停等限制由权威后端执行，不由页面隐藏实现。

当前组合协议为 Annotation 2 / Lifecycle 3 / Sticker 1，包版本仍以 suite.members.json 与明确 peer 范围共同校验。
