---
id: INT-suite-extension-pages
kind: implementation
title: Obsidian 系列接入公开扩展页与实例范围
status: current
progress: planned
gap: 公共栏目注册、有效范围接入和多 Vault 绑定均待实现及组合验收。
summary: 插件贡献自己的栏目，Maintenance 汇总展示；有效绑定由 Bridge 确认，各 Vault 共用实例同步范围。
sources:
- path: ../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-18-extension-pages-and-instance-scope.md
- path: ../2026-09-18-vault-instance-binding-design.md
relations:
- relation: consumes
  to:
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
    record_id: IF-extension-pages
  reason: 计划贡献绑定、状态、数据目录和同步栏目
- relation: consumes
  to:
    project_id: 0d05f813-7097-47d9-9e88-3d523bb537d6
    record_id: IF-instance-workspace-scope
  reason: 计划统一读取实例已选择的工作区并在操作时复核
- relation: consumes
  to:
    record_id: IF-vault-binding
  reason: 管理页使用与 Obsidian 设置页相同的绑定入口
- relation: implements
  to:
    record_id: REQ-vault-instance-binding
  reason: 可选维护集成与双侧独立运行
---

# Obsidian 系列接入公开扩展页与实例范围

此页为待实施消费说明。提供方的唯一合同见 [Maintenance 扩展注册与实例范围设计](../../../../../../dsh-session-maintenance/docs/superpowers/specs/2026-09-18-extension-pages-and-instance-scope.md)；有效配对、动态端点和多 Vault 路由见 [[IF-vault-binding]]。

Obsidian 系列贡献绑定仓库、连接状态、数据目录及同步栏目。数据目录是可复用栏目，页面可以聚合多个插件和 namespace；各插件只注册自己的贡献，由 Maintenance 汇总，Suite 只负责装配。具体贡献代码跟随其能力提供方，不能为了 UI 将绑定真源移入 Maintenance。

用户从 Maintenance 改绑时，操作经过 Bridge 的同一修订检查，获得确认后才保存生效登记。Companion 设置页也调用这个入口。维护页不可用不会阻止独立 Bridge 配对，Bridge 不在线也不使 Maintenance 的会话维护及其他扩展停止运行。

所有绑定同一实例的 Vault 使用相同有效同步范围。取消勾选后保留历史引用并显示当前实例未同步，恢复后按原身份核验；不自动导航到其他实例。列表缓存按范围修订失效，提交动作再次检查。无 Maintenance 的独立模式使用原生实例目录，已托管对象继续遵守原写入责任。

改接口时核对 Reference Adapter、Sticker 的关联笔记、Companion 会话选择，以及当前由 ThoughtDAG 提供的会话贴纸。Core 保持通用来源与引用身份职责；不因多 Vault 将其变成连接管理器。状态、操作失败和版本兼容的产品测试尚未执行。
