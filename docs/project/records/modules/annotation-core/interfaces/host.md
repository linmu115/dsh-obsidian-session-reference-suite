---
id: IF-core-host
kind: interface
title: Core Host 合同：来源准备、回链与后台删除
status: current
summary: Core 调用注册来源回调；后端集成可通过可选删除入口完成无浏览器同步。
sources:
- path: ../../../dsh-annotation-core/src/public/host-api.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-reference-adapter/src/host/obsidian-source-adapter.ts
  role: current-workspace-source
---

# Core Host 合同：来源准备、回链与后台删除

提供方是 Core。来源插件注册对应 sourceType 后，Core 在准备或持久提交相关动作发生时调用它：提交当前引用项，获取已核对来源；提交真实用户消息绑定，取得回链回执；提交持久删除绑定，让来源侧解除关系。

完整 HostSourceAdapter、SentReferenceBinding、DeletedReferenceBinding 和 AnnotationCoreHost 定义只在 [Core Host API](../../../../../../../dsh-annotation-core/src/public/host-api.ts) 维护。该文件也声明可选 deleteReferenceLink，可让宿主后台同步在浏览器关闭时继续运行。

来源明确变化/缺失须返回失败；Bridge 离线可由来源 Adapter 返回带 offline 标记的已有快照，不能将所有错误伪装成刷新成功。Core 拥有提交状态，回调成功不等于模型理解。

已核实接入者为 [Reference Adapter](../../reference-adapter/integrations/core.md)。新增来源类型需同时说明 Client 如何打开原文，见 [双端扩展](../source-adapters.md)。轻量目录是相邻的独立只读能力，完整合同见 [目录接口](../../../../../../../dsh-annotation-core/docs/changes/2026-09-15-reference-directory-mirror.md)。
