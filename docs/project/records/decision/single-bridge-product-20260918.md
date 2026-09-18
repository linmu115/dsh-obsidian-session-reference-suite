---
id: DEC-single-bridge-product
kind: decision
title: 单一桥产品与独立引用业务组合
date: 2026-09-18
status: current
summary: 桥接层统一为 dsh-obsidian-bridge；Suite 不安装，Core/普通 Sticker/ThoughtDAG 保持业务边界，Maintenance 独立可选。
sources:
- path: ../2026-09-18-dsh-obsidian-confirmed-requirements.md
  heading: R12：桥接层合为一个用户安装插件
- path: ../changes/2026-09-18-single-bridge-product.md
relations:
- relation: supersedes
  to:
    record_id: REQ-suite-boundary
  reason: 取代原七成员/六部署成员和 Suite 运行父组的安装解释，需求记录保留身份并更新
- relation: clarifies
  to:
    record_id: DEC-selection-ownership-20260918
  reason: Core 运行引用、来源提供方与普通贴纸三项业务依赖
---

# 单一桥产品与独立引用业务组合

用户明确要求桥接层在安装形态上合为一个插件，不能以内部模块合并和 Suite wrapper 代替。当前产品是 `dsh-obsidian-bridge@0.4.1-rc2.1`，统一实例/Vault 绑定、路由、共享引用交接和桥维护；未来专用通道也归该插件，具体操作业务仍后置。

Suite 仅保留私有开发、文档与组合验收；旧 Adapter 退役，Protocol 是内部依赖。物理 Lifecycle Git 目录与兼容 service key 可保留，但不增加用户安装项。Profile 中 Core、Bridge、Sticker 独立加载各一次，靠 Cordis 处理服务缺席、晚加载和卸载。

| 业务组合 | 责任 |
| --- | --- |
| Core + Bridge | 跨 Obsidian 引用；Bridge 管来源、传输、定位、绑定，Core 管引用运行与提交 |
| Core + ThoughtDAG | 跨会话引用和会话贴纸；ThoughtDAG 管会话来源关系 |
| 普通 Sticker + Core + Bridge + Better Sidebar | 普通贴纸界面与笔记关联；调用 Core 和桥，不拥有会话贴纸 |
| 可选 Maintenance + 各业务 Adapter | 保存恢复各历史类型、分类范围和信息页；不接管 Core 运行时引用 |

Core 自己负责引用状态、上下文组织与注入、引用 UI/样式/气泡，以及提交、撤销和恢复。缺少业务依赖显示不可用/等待，不造成启动报错。已托管数据不因可选 Maintenance 缺席而退回旧副本写入。

依据为本轮用户直接确认；新公开来源 ledger 待主任务导入。实现与验收状态见 [[VER-single-bridge-delivery]]，不能将此决定当作部署完成证明。
