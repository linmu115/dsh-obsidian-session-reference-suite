---
id: REQ-suite-boundary
kind: requirement
title: 组合范围：整合 Bridge 与独立外部项目
status: current
summary: 桥接层为单一 Bridge 安装项；Suite 是开发验收工作区，Core、普通 Sticker、可选 Maintenance 保持独立。
sources:
- path: ../../suite.members.json
  role: source-reviewed-2026-09-16
relations: []
---

# 组合范围：整合 Bridge 与独立外部项目

## 当前要求与替代关系

2026-09-18 用户在交付核查中明确：Lifecycle、原 Reference Adapter、Suite 桥接包装必须收敛成一个 `dsh-obsidian-bridge` 用户安装项。实例/Vault 绑定、路由与未来专用通道均归这个桥；Core 与普通 Sticker 继续独立，Maintenance 可选。具体确认见 [[DEC-single-bridge-product]]。

Suite 仓库是私有开发、文档和组合验收工作区，不再作为运行插件或父组。Protocol 是内部开发库，不需用户单独安装或启用；旧 Adapter 退役，不列当前候选安装成员。Obsidian Companion 仍独立运行在 Obsidian，不是 Protocol 或 DSH 插件的子组件。

2026-09-16 的七成员组合名单，以及 2026-09-18 初阶段的六部署成员/三子插件父组方案，均保留历史定位，但其安装边界被本轮确认取代。原项目、记录和来源身份保持；引用内部模块仍沿用旧 Adapter 条目 ID。

Core 继续拥有通用引用 UI、状态、提交、补偿和上下文，普通 Sticker 保留业务与数据。Maintenance 与 ThoughtDAG 有各自地图；组合仅保留消费和提供关系，不复制其内部设计。

## 验收条件

- 当前入口与图明确一个桥产品、三个独立 DSH 插件、可选 Maintenance 和 Obsidian Companion；Suite 无运行父组。
- Profile 中 Core、Bridge、Sticker 各加载一次；缺席、晚加载、卸载不会重复注册或持续失败。
- Protocol 随构件提供；旧 Lifecycle 名称仅物理历史路径/内部兼容 key，旧 Adapter 不列候选安装项。
- 两侧共用绑定与路由；Annotation 2 归 Core，Lifecycle 3 / Sticker 1 / binding 1 归内部 Protocol。
- 保存所有项目和记录 ID、旧设计和报告时点；新包及真实部署以 [[VER-single-bridge-delivery]] 另行验收。
- A/B 阅读、图节点语义护照与条目跳转保留；不新增 kind:update。
