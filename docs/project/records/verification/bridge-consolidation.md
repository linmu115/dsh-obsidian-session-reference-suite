---
id: VER-bridge-consolidation
kind: verification
title: 第一阶段桥整合的本地验收
status: current
summary: 实际源码组合的类型检查、构建、生命周期和HTTP交接测试通过；未做真实应用视觉或部署验收。
relations:
- relation: verifies
  to:
    record_id: IMP-bridge-consolidation
---

# 第一阶段桥整合的本地验收

2026-09-18，首阶段版本组合在当前工作树验证：

| 范围 | 结果 |
| --- | --- |
| Bridge | 类型检查、Host／Client 构建通过；14 文件、79 测试通过。 |
| 普通贴纸 | 类型检查、Host／Client 构建通过；19 文件、114 测试通过。 |
| 旧 Adapter 兼容入口 | 类型检查、Host／Client 构建通过；2 文件、3 测试通过。 |
| Suite | 6 文件、16 测试通过，含真实 Core 存储与合成 Obsidian HTTP 服务的 6 条组合测试。 |
| Obsidian Companion | 类型检查、构建通过；动态 Viewer、控制租约、定向领取、删除与回链等 6 文件、105 测试通过。 |
| 组合来源 | `.artifacts/phase1-combination.json` 记录并立即核验通过；比较源码、锁文件、实际依赖及构件摘要，不只比较版本号。 |

真实 Cordis fiber 用例覆盖 Core／Maintenance 缺席、Core 晚挂载、卸载与重挂，来源和动作处理者不重复。补修 Sticker 的未注入属性读取；共享队列忽略非当前 Profile 请求且不确认，避免占满重试容量。确认失败只重试确认，不重复普通导航副作用。

来源核验发现 Companion 原开发依赖仍是 Core `0.3.12-rc2.7`，Bridge 和 Sticker 的 Protocol 仍指归档包。原别名可逆保留后，将它们链接到当前 Core `0.3.12-rc2.19` 与实际 Protocol 工作树，重新做相关类型检查、测试及 Companion 构建，组合核验通过。

所有验证使用内存、合成服务或临时夹具。没有部署／重启用户实例，没有对真实会话或 Vault 做测试写入。桥健康面板尚未做真实 UI 视觉验收；测试不能证明真实应用长期运行和多窗口体验。多 Vault 及新增维护能力属于后续阶段，不能由本记录推定已经实现。
