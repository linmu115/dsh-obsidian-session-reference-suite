---
id: IMP-delivery
kind: implementation
title: 笔记选段投递：实际顺序与恢复
status: current
summary: 自动队列流程按 Companion、Lifecycle、Adapter、Core 分责；直接关联引用另走专门入口。
progress: implemented
gap: 静态核对与来源合成测试覆盖；本次未执行双应用投递。
sources:
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/client/annotation-consumer.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/host/obsidian-source-adapter.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/runtime.ts
  role: current-workspace-source
- path: ../../tests/cross-component-reference.test.ts
  role: current-workspace-source
- path: ../../../dsh-annotation-core/README.md
  role: current-workspace-source
relations:
- relation: implements
  to:
    record_id: REQ-selection
  reason: 投递时序
- relation: implements
  to:
    record_id: XR08
  reason: 重试不重复
- relation: uses
  to:
    record_id: MOD-reference-client
  reason: 先添加后 claim
- relation: uses
  to:
    record_id: MOD-core-submit
  reason: 持久提交确认
- relation: related
  to:
    record_id: IF-companion-knowledge
  reason: 区分直接路径
---

# 笔记选段投递：实际顺序与恢复

1. Companion 保存用户选段 capture 与本侧定位责任，等待配置的内嵌页。
2. Lifecycle 确认可用 Bridge 与当前实例，挂载 Client 外部连接。
3. Adapter 将相同操作和引用身份持久加入目标 Core；随后向 Companion claim。
4. 用户检查气泡与原草稿并发送。Core 校验目标、引用版本、来源及请求预算。
5. 执行器接受并持久确认后 Core 标记 sent；Host 来源 Adapter 执行回链写回。
6. Companion 保存绑定和可见回链；失败保留对应任务供重试。

自动领取和发送是两个阶段：claim 不证明模型已收到材料。取消操作及领取冲突经 Core 补偿；Bridge 断线时保留已经持久加入的同一操作，重连不重复添加。反向删除有独立 Host 轮询，因此不要求目标浏览器一直打开。

内置流程图选择这条队列路径说明时序与负责方。关联笔记气泡的直接路径没有 capture/自动 claim，见 [直接引用合同](../modules/obsidian-companion/interfaces/knowledge.md)；删除和上下文释放是另外的生命周期，正文记录而不硬塞入同一长流程。
