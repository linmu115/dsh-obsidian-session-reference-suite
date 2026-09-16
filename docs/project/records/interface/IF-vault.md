---
id: IF-vault
kind: interface
title: Vault 与 DSH 之间交付什么
status: current
summary: Companion 交付选段定位、稳定身份和回执；DSH 返回认领、提交或清理结果。
relations:
- relation: consumes
  to:
    record_id: IF-extension
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
- relation: derived_from
  to:
    record_id: REQ-delete
sources:
- file: ../../README.md
- file: ../../../obsidian-deepharness-bridge/README.md
---

# Vault 与 DSH 之间交付什么

只有已配置 Vault 的对应内嵌会话页面可以认领其投递。登录跳转后身份应保持；独立 DSH 页面不能抢走另一页面的材料。找不到接收方时保持待处理，不猜测目标。

回链与自动生成标记的删除需核对拥有权：只有最后一个有效声明消失，且确认标记是本桥接创建，才清理相应 dsh-note-* 标记。用户自己建立的块 ID 保留；无法确认时留待核验。

笔记内容以 Vault 为准，Core 保存引用事务，Maintenance 保存已迁移的贴纸、关联和图数据；Companion 不成为第二份会话或整篇笔记历史仓库。断线使用持久回执和重试恢复，不能把部分组件可用当作整组可写。
