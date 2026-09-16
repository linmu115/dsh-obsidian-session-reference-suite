---
id: VER-source-evidence
kind: verification
title: 原资料验证：覆盖、版本与不可外推范围
status: current
summary: 保留已有合成检查与已记录失败；这些均未在本次任务重跑。
sources:
- path: ../../tests/cross-component-reference.test.ts
  role: current-workspace-source
- path: ../2026-09-15-graph-reference-lifecycle-cohort.md
  role: current-workspace-source
- path: ../../../dsh-annotation-core/docs/changes/2026-09-14-reference-submit-revision.md
  role: current-workspace-source
- path: ../../../dsh-annotation-core/docs/changes/2026-09-15-reference-directory-mirror.md
  role: current-workspace-source
- path: ../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/docs/2026-09-14-shared-marker-cleanup.md
  role: current-workspace-source
- path: ../../../dsh-session-sticker-board/README.md
  role: current-workspace-source
relations:
- relation: verifies
  to:
    record_id: IMP-delivery
  reason: 仅上述报告版本和合成覆盖
- relation: verifies
  to:
    record_id: MOD-core-submit
  reason: 历史输入框检查
- relation: verifies
  to:
    record_id: IF-core-directory
  reason: 历史目录检查
- relation: verifies
  to:
    record_id: MOD-companion-vault
  reason: 历史标记检查
---

# 原资料验证：覆盖、版本与不可外推范围

这里记录来源报告的证据，不是本次地图维护执行的测试。所有报告保留自己的版本和时间，不合并为一个“全部通过”。

| 来源 | 原报告或源码可确认的范围 | 限制 |
| --- | --- | --- |
| [组合测试源码](../../../../tests/cross-component-reference.test.ts) | 真实 Core 内存存储、Adapter、合成 HTTP 服务；定向投递、竞争失败补偿、停止后重连和取消不再投递 | 只读测试源码；本次未执行，不是真实 Obsidian UI |
| [rc2.15 组合报告](../../../2026-09-15-graph-reference-lifecycle-cohort.md) | 报告 4 文件/12 测试；并行构建曾缺 lib/client.js，顺序重跑通过 | 比当前 rc2.18 旧，安装和宿主探针另验 |
| [Core 提交修复报告](../../../../../dsh-annotation-core/docs/changes/2026-09-14-reference-submit-revision.md) | 报告 33 文件/182 测试，输入框相关17项 | 较早 rc2.7 修复；不验证当前运行实例 |
| [Core 目录报告](../../../../../dsh-annotation-core/docs/changes/2026-09-15-reference-directory-mirror.md) | 13项目录场景；随后5文件/38项检查业务目录修订和持久通知 | 报告明确合成范围；不是实际镜像启用 |
| [共享标记报告](../../../../../../rc2-adapt-20260912/obsidian-deepharness-bridge/docs/2026-09-14-shared-marker-cleanup.md) | 33文件/231测试；重启清理、失败重试、共享占用与同名块隔离 | 同版本修复以构件哈希区分；本次不修改笔记 |
| [Sticker README](../../../../../dsh-session-sticker-board/README.md) | 声明140项合成测试；多目标、精确删除、键盘菜单 | 不代替真实删除/归档和公开发布 |

没有读取资料指向的真实安装目录、旧地图、历史会话或 artifacts 运行回执；那些结果未独立确认。当前源码和文档有版本时间差，详见 [快照组合](../implementation/cohort.md)。
