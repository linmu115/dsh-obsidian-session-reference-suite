---
id: INT-maintenance-directory
kind: integration
title: Core 目录：已知外部消费者 Maintenance
status: current
summary: 提供方保留已知接入及返回合同；镜像实现由 Maintenance 独立地图维护。
sources:
- path: ../../../dsh-annotation-core/docs/changes/2026-09-15-reference-directory-mirror.md
- path: ../../../dsh-session-maintenance/docs/project/records/modules/adapters/business/integrations/annotation.md
relations:
- relation: references
  to:
    record_id: INT-annotation
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
  reason: 外部消费者维护目录镜像的接入说明与实现入口
- relation: consumes
  to:
    record_id: IF-core-directory
  reason: 已知外部消费者 Maintenance 的有界目录接入
---

# Core 目录：已知外部消费者 Maintenance

Core 提供 [[IF-core-directory|轻量引用目录合同]]，并在此保留已核实消费者。Maintenance 的 annotation-records 接入读取有限摘录、引用状态、定位和可见修订；订阅持久变化，只有明确 tombstone 才同步删除。该镜像只读，不接管 Core 发送、撤销或完整上下文。

镜像接入说明、所属逻辑会话映射和恢复实现的入口由 Maintenance 独立项目的 INT-annotation 维护，项目 ID 为 0d05f813-7097-47d9-9e88-3d523bb537d6。按该项目与条目 ID 定位；Core 目录的唯一合同仍在本图。该关系不证明目标实例已启用；本次没有运行镜像服务。

提供方变更应检查此消费者支持的分页、修订和删除范围。返回 [[MOD-core|Core 已知接入目录]]及[[IF-core-directory|唯一目录合同]]。此页沿用 INT-maintenance-directory 身份，原外部目录位置已归并。
