---
id: EXT-maintenance
kind: dependency
title: 外部依赖：Session Maintenance
status: current
summary: 仅保留 Suite 所需的会话身份、固定来源、结构真源和接口定位，不归入 Suite 内部实现。
sources:
- path: ../../../dsh-session-maintenance/docs/project/project.yaml
relations:
- relation: references
  to:
    record_id: IF-extension
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
  reason: 业务结构合同在独立地图
- relation: references
  to:
    record_id: IF-graph
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
  reason: 固定来源与图关系合同
- relation: references
  to:
    record_id: IF-native-context
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
  reason: 实际原生生效合同
---

# 外部依赖：Session Maintenance

Session Maintenance 是独立项目，ID 为 0d05f813-7097-47d9-9e88-3d523bb537d6。它不属于七成员组合；会话真源、稳定身份和已迁入业务结构在该地图维护。

本组合具体消费方：[[MOD-core-context|Core 固定来源与原生上下文]] → IF-graph / IF-native-context；[[INT-sticker-maintenance|Sticker 会话与贴纸]]及[[INT-companion-maintenance|Companion 知识关联]] → IF-extension。反向消费是 [[INT-maintenance-directory|Maintenance 读取 Core 轻量目录]]。

这里只保存边界和定位，不展开对方的两类 Adapter、Engine 或内部存储。历史 EXT-harness-adapters / EXT-business-adapters 身份及后继仍可检索。

## 公开扩展页与有效范围（待实现）

新增接入由 [[INT-suite-extension-pages]] 维护，分别消费 Maintenance 的页面栏目注册与实例有效范围合同。有效绑定仍在 Bridge，Maintenance 保存登记／回执并承载集中 UI。两组插件分别安装仍应正常运行；本段为新需求，不将尚未补齐的降级路径写成已验收。
