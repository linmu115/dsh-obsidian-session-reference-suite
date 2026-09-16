---
id: IF-vault
kind: interface
title: Vault 与 DSH 之间交付什么
status: current
summary: 分别查选段队列与关联笔记直接引用的合同；保留 Vault、引用事务和已迁入业务结构的归属边界。
sources:
- path: ../../README.md
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/README.md
relations:
- relation: consumes
  to:
    record_id: IF-extension
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
- relation: derived_from
  to:
    record_id: REQ-delete
---

# Vault 与 DSH 之间交付什么

Vault 持有笔记正文；Companion 保存定位、待处理操作和回执；Core 管理引用事务，Maintenance 管理已迁入的业务结构。

- [[IF-companion-reference|排队、领取与回链接口]]用于笔记选段队列。只有配置的合格内嵌页可领取，找不到接收方时保留待处理。
- [[IF-companion-knowledge|关联笔记直接引用接口]]服务用户明确选择的“引用到本轮”。展示关联或打开笔记不提交正文；该路径不经过自动 capture 队列。
- [[MOD-companion-vault|Vault 与自有标记]]解释最后使用方解除后的清理；用户已有块 ID 保留，来源不明确时等待重试。

从 [[MOD-companion|Companion 模块目录]]查看提供方职责，通过 [[INT-reference-core]]、[[INT-sticker-core]] 查看使用这些能力的接入范围。正式接口定义仍由对应提供方文档或源码维护。
