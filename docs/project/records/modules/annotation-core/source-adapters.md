---
id: MOD-core-sources
kind: module
title: Core / Host 与 Client 来源扩展
status: current
summary: Host 负责准备和写回来源，Client 负责打开来源；两种注册共享来源类型。
sources:
- path: ../../../dsh-annotation-core/src/public/host-api.ts
  role: current-workspace-source
- path: ../../../dsh-annotation-core/src/public/client-api.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/host.ts
  role: current-workspace-source
- path: ../../../dsh-obsidian-bridge-lifecycle/src/reference/client.ts
  role: current-workspace-source
relations:
- relation: provides
  to:
    record_id: IF-core-host
  reason: Host 回调合同
- relation: provides
  to:
    record_id: IF-core-client
  reason: Client 来源导航合同
---

# Core / Host 与 Client 来源扩展

HostSourceAdapter 接入准备、取消待处理、提交回链和解除已提交关系；ClientSourceAdapter 接入打开来源和可选的复制来源链接。二者按 sourceType 注册，释放注册不会把来源数据视为已删除。

Obsidian 实现在 [Reference Adapter / Host](../reference-adapter/host.md) 与 [Reference Adapter / 浏览器](../reference-adapter/client.md)。Core 定义合同，Adapter 不另维护一份 Core 参数表。详见 [Host 合同](interfaces/host.md)、[Client 合同](interfaces/client.md)。

此处的“来源 Adapter”服务引用事务，与外部 Maintenance 的平台格式 Adapter、业务扩展数据 Adapter 是三个不同接入点，不能互换权限或对象。
