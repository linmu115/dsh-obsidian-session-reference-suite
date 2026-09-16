---
id: EXT-maintenance
kind: dependency
title: 外部依赖：Session Maintenance
status: current
summary: 仅保留 Suite 所需的会话身份、固定来源、结构真源和接口定位，不归入 Suite 内部实现。
sources:
- path: ../../../dsh-session-maintenance/README.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/adapters/contract.md
  role: current-workspace-source
- path: ../../../dsh-session-maintenance/docs/extensions/plugin-data-integration.md
  role: current-workspace-source
relations:
- relation: provides
  to:
    record_id: EXT-business-adapters
  reason: 外部扩展提供方
  reasons:
  - 外部扩展提供方
  - 扩展对象合同
- relation: contains
  to:
    record_id: INT-maintenance-directory
  reason: 消费者由外部项目维护
- relation: provides
  to:
    record_id: EXT-harness-adapters
  reason: 外部提供方
  reasons:
  - 外部提供方
  - 平台格式合同
- relation: depends_on
  to:
    record_id: IF-core-directory
  reason: 选配只读镜像源
- relation: references
  to:
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
  reason: 按需定位正式维护地图
---


# 外部依赖：Session Maintenance



Maintenance 独立管理会话稳定身份、版本、原生空间和扩展结构。Suite 消费固定来源读取、真实工作区/会话目录、关系生命周期、知识结构与轻量镜像；这里不是 Maintenance 全项目地图。



## 两类 Adapter



| 分支 | 适配对象 | Suite 关注点 |
| --- | --- | --- |
| [Harness / 平台 Adapter](harness-adapters.md) | 宿主原生格式、投影、追加和持久证据 | stable session/message、固定回复截止、原生 replace 实际生效 |
| [业务扩展 Adapter](business-adapters.md) | 贴纸、引用、知识链接、图对象的 schema、写入方和归属 | 安装兼容、namespace 权限、对象版本和业务领域操作 |



同一 Engine 加载不代表两种 Adapter 可以互换。Core 自身的来源 Adapter 又是另一个接口族。



已核实的 Suite 接入者：[Sticker](../../modules/sticker-board/integrations/maintenance.md)、[Companion](../../modules/obsidian-companion/integrations/maintenance.md)、[Core 固定上下文](../../modules/annotation-core/context.md)；反向 [Core 轻量目录镜像](core-directory-consumer.md) 由 Maintenance 消费。



外部正式地图 ID 为 `0d05f813-7097-47d9-9e88-3d523bb537d6`，由本机位置登记解析；此页只保留 Suite 所需的合同与接入解释。平台和业务 Adapter 是独立分支，不复制 Maintenance 全部规格。
