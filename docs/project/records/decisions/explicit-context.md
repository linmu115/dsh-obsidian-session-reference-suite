---
id: DEC-explicit-context
kind: decision
title: 关联、导航、授权与发送逐步发生
status: current
summary: 点击链接只导航；引用先形成待发送气泡；实际提交后才交付材料。
sources:
- path: ../../README.md
  role: current-workspace-source
- path: ../../../dsh-annotation-core/README.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-10-session-context-graph-requirements.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-15-native-agent-context-management.md
  role: current-workspace-source
relations:
- relation: derived_from
  to:
    record_id: XR07
  reason: 不自动发送
- relation: derived_from
  to:
    record_id: NC02
  reason: 三种上下文状态
- relation: derived_from
  to:
    record_id: REQ-linked-note
  reason: 笔记导航与引用分离
---

# 关联、导航、授权与发送逐步发生

用户可以长期关联笔记，也可以打开会话或来源。只有显式引用才准备正文并加入 Core 气泡，正式发送仍由目标会话执行。目标的 Agent、工具、权限和项目配置保持自己的定义。

固定上游先带入预算内的来源问答，再按需读取获准范围。授权最大范围、活动窗口与当前保留材料分开；窗口扩大只允许后续读取，不自动灌入全文。释放不返还本轮累计预算。

“准备完成”“已交付”“失败”是可核验事实；页面显示一条边不能证明材料被交付，更不能证明模型已经理解。见 [实现边界](../implementation/context.md)。
