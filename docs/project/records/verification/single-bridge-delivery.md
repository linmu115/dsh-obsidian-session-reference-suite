---
id: VER-single-bridge-delivery
kind: verification
title: 单桥产品、地图与安装验收边界
status: current
summary: 区分本轮产品形态修正、地图检查、新包回归与真实副本安装；未执行项待主任务补齐。
sources:
- path: ../changes/2026-09-18-single-bridge-product.md
relations:
- relation: verifies
  to:
    record_id: DEC-single-bridge-product
- relation: verifies
  to:
    record_id: REQ-suite-boundary
- relation: qualifies
  to:
    record_id: IMP-cohort
---

# 单桥产品、地图与安装验收边界

本轮用户纠正安装形态后，当前要求为一个 DSH Bridge 插件，Core、普通 Sticker 和可选 Maintenance 独立；Suite 是私有开发工作区，Protocol 内部依赖，旧 Adapter 退役。普通 Sticker 还需要 Better Sidebar 业务能力，缺席应等待/不可用而非启动异常。

本轮候选、替代关系、检查表和真实部署续填入口：[单桥更正与验收报告](../../../changes/2026-09-18-single-bridge-product.md)。旧 [[VER-vault-binding-implementation]] 的测试数字只覆盖当时包组，不能直接充当本轮新包回归或真实窗口证据。

文档任务将核对地图 ID、当前链接、图源及导出阅读页。主任务已回报新包源码阶段：Bridge b3cad82，21 文件 102 tests；Sticker 50a8c13，20 文件 123 tests；Suite 私有工作区 2480db1，8 文件 21 tests；Maintenance 发布出口修复 12 tests 及 Engine build，后续发行门禁 2e84ec3 的精确白名单另通过 32 tests、typecheck/build。隔离 official install 严格 peer 检查和备份已完成，真实 profile 安装与哈希、宿主探针和窗口验证仍由主任务续填。本文不宣称已部署或调用模型。

## 本次地图检查结果

- project_map：111 条记录，0 错误、0 警告；原项目、记录及来源身份保留。
- 架构与流程结构检查通过；分别保留 109/4 项布局提示，未将“通过硬检查”写成无交叉布局。
- 现有 A/B 阅读页已刷新。隔离 headless Chrome 打开概览、架构、流程及新决定页，页面无横向溢出；截图人工核对嵌入图和记录正文可见，不控制用户浏览器。
- 原生图 visual-check 对独立页面的纵向滚动报告 overflow；文本与控件间距通过，完整 visual-check 并非全通过。派生回执与截图路径见单桥报告。
- 本任务没有运行产品服务、部署副本、写用户 Vault 或调用模型；这些项目仍由主任务记录实际结果。

## 公开来源与安装前证据补齐

[[HIST-vault-instance-binding]] 现绑定新范围索引 `history/20260918-single-bridge-product-correction`，保留原事件身份和旧索引。777 个公开事件、352 组工具调用/返回全部配对，排除隐藏推理和非文本内容。用户对单桥产品、三项贴纸依赖、Core 上下文/UI 责任的原始确认可分别展开。

只读检查的暂存回执确认独立业务根与旧安装项缺席，公开入口导入成功且 failures 为空；备份回执确认 2026-09-18 06:11:46 UTC 的维护数据库、状态、profile 元数据和 Companion 完整目录已保存。两者不等于真实安装，来源截点后的部署由主任务继续记录。
