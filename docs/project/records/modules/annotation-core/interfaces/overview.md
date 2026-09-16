---
id: IF-reference
kind: interface
title: 插件怎样创建、提交和撤销引用
status: current
summary: 保留原入口，分别定位 Core Client、Host 与只读目录合同；消费范围由各接入说明解释。
sources:
- path: ../../README.md
- path: ../../../dsh-annotation-core/README.md
relations:
- relation: consumes
  to:
    record_id: IF-graph
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
---

# 插件怎样创建、提交和撤销引用

引用先放进真实会话的气泡，草稿和附件保留；用户检查后随问题发送。打开来源或建立笔记关联只是导航，不自动添加、提交材料。

## 选择正确的 Core 接口

- [[IF-core-client|Client 合同]]：消费方交付来源、目标身份和操作身份，用于添加待发送引用、打开来源及精确解除。技术定义只在 Core 的公开 Client 类型维护。
- [[IF-core-host|Host 合同]]：来源提供方注册准备、回链与删除能力。具体来源行为由 [[INT-reference-core|Reference Adapter]] 实现。
- [[IF-core-directory|轻量目录合同]]：Maintenance 消费分页目录与持久变更通知，见 [[INT-maintenance-directory|镜像接入]]。

[[INT-sticker-core|Sticker 的接入说明]]区分跨会话引用、来源引用动作和关联笔记气泡；普通贴纸的保存/删除走 Sticker workspace。本页保留原接口入口 ID，完整参数、返回值及兼容约定通过上述唯一合同查阅。

提交与补偿的解释见 [[MOD-core-submit]]，固定授权与材料读取见 [[MOD-core-context]]。不能把一般关联关系当作实际调用顺序。
