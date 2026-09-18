# 桥整合、Vault 绑定与 Maintenance 范围交付记录

2026-09-18。本轮依据用户确认的需求及施工授权，依次完成已有桥能力整合、普通贴纸重新接入、双侧 Vault 绑定与路由、Maintenance 实例分类工作区范围，以及公开业务信息页。本记录对应本地候选源码和构建，未安装、重启真实实例，未改写用户 Vault 或会话，未 push。

## 完成的行为

- DSH 运行装配收敛为 Core → Bridge → Sticker。原 Reference Adapter 的引用来源、领取、回链、删除和导航接入并入 Bridge，旧包仅保留兼容能力检查。Core 继续负责引用状态、事务与补偿；普通贴纸保留笔记关联业务、界面与数据。
- Bridge 与 Obsidian Companion 共同实现一 Vault 至多一实例、一实例多 Vault。稳定身份与端口分离，本机登记发现当前端点；保持实际 DSH Web 端口及已鉴权 Viewer 地址。Launcher 不是硬依赖。
- Companion 是绑定的唯一持久写入口，设置页与 Maintenance 贡献页共用 revision/CAS 和 operationId 幂等规则。每个 Vault 有独立连接、队列与租约；改绑后不改变历史引用或旧任务目标。
- 普通贴纸按 Vault 搜索、定位与同步。多 Vault 删除保存剩余目标，成功后逐个确认；重启或新 Vault 上线不会把旧删除请求扩展到新目标。
- Maintenance 提供自己的实例同步策略，选择对象是会话分类工作区。未配置默认全部，明确空选择表示全部不选，未分类可单独选择。保存后下次实例启动生效，当前运行按原范围快照完成保存；出站投影与入站回收均核验范围。
- 同实例所有 Vault 共用有效范围。取消同步保留旧链接，区分未同步、离线、映射等待及已删除，恢复同步后核验原身份。
- Maintenance 公开业务注册与结构化栏目：摘要、状态、键值、数据目录和带回执的动作。插件独立贡献信息页，卸载不覆盖其他贡献；Bridge 提供实例及 Vault 管理页。纯类型入口为 `dsh-session-maintenance/business-pages`。
- Maintenance 单独安装、桥系列单独安装、服务晚加载与卸载均有覆盖；已纳管数据不因可选服务缺席而退回旧副本写入。

## 候选组合

| 成员 | 版本 | 实现提交 |
| --- | --- | --- |
| Annotation Core | 0.3.12-rc2.19 | 56c424a，保持现有实现 |
| Bridge Protocol | 0.4.0-rc2.1 | 829215e |
| Bridge Lifecycle | 0.4.0-rc2.2 | 0629de2 |
| Reference Adapter（仅兼容测试） | 0.3.5-rc2.2 | 2040bb1 |
| Sticker Board | 0.7.4-rc2.2 | 365aa69 |
| Obsidian Companion | 0.7.0-rc2.1 | 6791643 |
| Suite | 0.4.0-rc2.2 | 本交付记录所在提交 |
| Maintenance Engine / DSH plugin | 0.1.33-rc2.38 / 0.2.26-rc2.29 | eb7e9fa、0c8efca、b32c594、7dc2067、d3695f6 |

Suite 成员清单和实际本地源码链接已核对。候选构件一致性由 `scripts/combination.mjs record/verify` 检查，回执保存到忽略目录 `.artifacts/phase2-combination.json`，不等同于安装回执。

## 验证

最终 Suite 工作区检查逐成员重新执行适用的类型检查、构建与测试，全部通过：Protocol 13、Core 257、Bridge 100、兼容 Adapter 3、Sticker 119、Companion 246、Suite 19，共 857 项。回执为 `.artifacts/checks/summary.json` 和各成员日志。Suite 中包含三项使用 Maintenance 正式 schema 的跨仓信息页测试。

Maintenance 另完成以下分组验证，分组可能交叠，不相加为唯一总数：

| 分组 | 结果 |
| --- | --- |
| Store、投影生命周期、运行代理、实例工作区 | 44 文件、164 项通过 |
| 实际 HTTP 组合接线与原 API | 2 文件、4 项通过 |
| 全 Dashboard 与 host plugin | 48 文件、195 项通过 |
| 公共信息页聚焦验证 | 20 项通过，含响应丢失重试 |
| 知识数据组合 | 新版本迁移、部分删除、CAS 冲突及禁止改投通过 |
| 构建 | Contracts、Store、Projection Lifecycle、Local Client、Engine、Dashboard、DSH plugin 通过，Engine 可导入 |

关键组合场景使用真实协议客户端与两个合成 Companion HTTP 服务，覆盖同名笔记、独立绑定和租约、动态端口、改绑旧队列及恢复后只重试剩余目标。可选依赖测试使用实际 Cordis Context，覆盖服务晚注册、缺席退化与卸载停止重试。审查发现的公共页请求身份丢失和多 Vault 快照超限均已修复并加入回归。

## 边界

- 本轮只做本地源码、构建和合成验收；真实应用窗口、安装升级与真实数据运行尚未验证。
- 已持久化的 Bridge 身份与后加载 Maintenance 身份不一致时明确阻断，不自动重命名或改绑；联用时需配置相同稳定实例身份。
- Maintenance 的大量 Vault 页面采用有限展示预算，完整列表仍由 DSH 桥面板提供。公共动作回执容量为 2000，满后拒绝新动作以保留幂等证据，尚未提供归档入口。
- 通用笔记写入、模板、样式、面板以及插件操作管道仍后置；本轮只保留扩展边界。

## 文档入口

- [完整需求](../2026-09-18-dsh-obsidian-confirmed-requirements.md)
- [分阶段实施计划](../2026-09-18-bridge-implementation-plan.md)
- [Suite 项目地图](../project/map.md)
- [Maintenance 项目地图](../../../dsh-session-maintenance/docs/project/map.md)
- [Maintenance 验证记录](../../../dsh-session-maintenance/docs/project/records/verification/scope-business-pages.md)

两张项目地图沿用原项目身份，更新模块、接口、实现、验证和图形，并保留公开讨论的可定位历程证据。历史记录保留原时点，不用新结论改写旧事件。
