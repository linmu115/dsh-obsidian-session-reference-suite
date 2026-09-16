---
id: EXT-harness-adapters
kind: interface
title: 外部合同入口：Harness / 平台 Adapter
status: current
summary: 宿主格式适配由 Maintenance 提供方维护；它处理原生会话和运行证据。
sources:
- path: ../../../dsh-session-maintenance/docs/adapters/contract.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/README.md
  role: current-workspace-source
---

# 外部合同入口：Harness / 平台 Adapter

这是 [Maintenance](overview.md) 的平台层接口，不是 Suite 内部模块。Engine 将规范会话交给 Adapter 投影为原生空间，并由 Adapter 解释新增事件、引用锚点、持久水位和恢复元数据。Runtime Bridge 负责 attach、drain、detach，drain 失败后 detach 仍应安全。

完整合同只引用 [Adapter contract v1](../../../../../../dsh-session-maintenance/docs/adapters/contract.md)，不复制方法表。当前 README 确认 DSH 0.1.5-rc.2 的配套和 Codex 只读导入边界。快照还列有其他旧版本 Adapter；本地图不审计它们是否可替换当前 RC2。

平台格式家族 ID 不等于产品补丁号。原生展开事件数可能不同于规范行数，持久水位必须由 Adapter 验证；因此 Core 的“准备完成”不能替代真正写入证据。

接入目录：当前 DSH 版本 Adapter 是提供方实现；Suite 的 [固定上游/原生上下文](../../modules/annotation-core/context.md) 间接依赖其正确身份和证据。业务插件注册对象应去 [另一类扩展接口](business-adapters.md)。
