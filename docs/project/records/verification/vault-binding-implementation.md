---
id: VER-vault-binding-implementation
kind: verification
title: 桥整合与双侧绑定的分阶段验证
status: current
relations:
- relation: verifies
  to:
    record_id: IMP-vault-binding-routing
- relation: verifies
  to:
    record_id: IMP-bridge-consolidation
---

# 桥整合与双侧绑定的分阶段验证

> 本记录保留原阶段的版本、结构和验证时点；当前单桥安装形态按 [[DEC-single-bridge-product]]，新包与部署结果按 [[VER-single-bridge-delivery]]，不把旧测试扩大为新版本已验收。

2026-09-18 当前工作树证据；无真实部署、用户 Vault 改写或 push。

| 对象 | 已确认范围 | 尚待补齐 |
| --- | --- | --- |
| 第一阶段 Suite | 1e73bc6，整合 Bridge 与普通贴纸共享通道已验收；Bridge 3b16e92、Adapter e8b6285、Sticker bdc814c | 不将该验收扩大为后续多 Vault 验收 |
| Protocol | 829215e，0.4.0-rc2.1；typecheck/build，3 文件 13 tests | 后续 DTO 如再修改需补对应结果 |
| Companion | 6791643，0.7.0-rc2.1；typecheck/build，35 文件 246 tests | 真实 Obsidian UI/用户数据未演练 |
| Bridge 多 Vault | 0629de2，0.4.0-rc2.2；typecheck/build，20 文件 100 tests | 真实 DSH 窗口未演练 |
| Sticker 多 Vault | 365aa69，0.7.4-rc2.2；typecheck/build，19 文件 119 tests | 合成多 Vault 与恢复用例，不改用户数据 |
| 兼容 Adapter | 2040bb1，0.3.5-rc2.2；typecheck/build，2 文件 3 tests | 只保留兼容壳，不进入运行装配 |
| Suite 跨仓组合 | 7 文件 19 tests；包含 3 项正式 Maintenance schema 的贡献页合同测试 | 本地候选，真实安装验收另行执行 |

Companion 新测试覆盖双 Vault 同名路径、持久 CAS/幂等、失败落盘、authenticated unbind 重放、旧 boot/token、其他实例不能抢 Viewer、改绑旧队列、占用与浏览器禁用端口、显式设置交互。测试结果不等于真实运行部署。

Bridge 测试覆盖真实协议客户端与两个合成 Companion HTTP 服务、独立绑定/租约/解绑、动态实际端口、稳定身份恢复和可选维护服务。Sticker 覆盖部分删除成功后重启，只重试原剩余 Vault。跨仓贡献页测试覆盖两个 Vault 的 CAS 动作、45 个长名称 Vault 的快照预算，以及 Maintenance 晚加载身份核验。

本轮源码报告分别位于 Bridge、Sticker、Adapter、Companion 的 docs/changes；Suite 总交付报告为 docs/changes/2026-09-18-binding-scope-delivery.md。当前会话来源已保存于 history/20260918-binding-scope-implementation，历史 events 不因结论修订而改写。构建组合指纹回执由 scripts/combination.mjs 生成在忽略目录 .artifacts/phase2-combination.json，仅代表本地源码与构件一致性。
