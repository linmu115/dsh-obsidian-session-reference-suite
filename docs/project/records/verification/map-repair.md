---
id: VER-map-repair
kind: verification
title: 原地图修复：来源与身份保留
status: current
summary: 核查已有修订与真实来源、旧 ID、接口互链和图绑定；本次未执行插件功能测试。
sources:
- path: provenance/map-repair-20260916.json
  role: source-comparison
relations:
- relation: verifies
  to:
    record_id: IMP-current
- relation: verifies
  to:
    record_id: INT-sticker-core
---

# 原地图修复：来源与身份保留

日期：2026-09-16。修复位置是原工作区的 docs/project，沿用 project_id 和所有 19 个原记录 ID，当时共 64 项可查询记录。模块和图源来自之前完成的定向修订，正式规格仍绑定原工作区；没有从头重新建图。

## 来源与组织

核对 53 份已有依据：51 份规范化换行后正文一致，Suite 与 Maintenance README 仅增加地图入口。实际版本和文件摘要见 [来源核对记录](../../provenance/map-repair-20260916.json)。模块目录、唯一提供方合同、消费者具体能力和已知来源范围据此整理；候选验证日志没有冒充正式地图的新验收结果。

所有旧入口继续有效，Suite 概览与它的接口合入同一目录。Core Client/Host、Reference Adapter、Sticker、Companion 及 Maintenance 两类 Adapter 分开说明，正文相互链接。关系只有一个规范声明，反向入口由阅读器生成。两处表格的多余空行已修正。

## 本次地图检查

- 地图身份、绑定、记录与节点关联检查通过；声明的本地来源存在，内部文档链接及章节目标均可解析。
- 117 条关系规范化后仍是 117 条，没有重复反向声明。Maintenance 与 ThoughtDAG 使用已登记的项目/条目 ID；本轮没有遍历对方全图。
- 现有架构图与流程图交付成功，保留内部职责边界、负责方泳道和原生节点身份。原图的部分交叉/走线提示保留，不以格式有效代替视觉完美。
- 浏览器实查模块展开、Core 合同到 Sticker 接入说明的互链、章节定位和图加载。当前阅读入口仅保留项目概览与项目条目；连续文档已按用户决定从安装版模板和导出参数移除。

本次未运行产品插件构建、真实 Vault/会话操作或后续开发效果对照。源码观察、历史报告与目标实例的实际验收是不同证据。

后续七成员边界校正及当前统计见 [[VER-suite-boundary]]。上文两类外部 Adapter 展开是该次整理的历史状态，现已收缩为独立地图链接。
