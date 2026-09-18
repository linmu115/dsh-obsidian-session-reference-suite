# DSH–Obsidian 引用与贴纸组合

当前职责修订见 [[DEC-selection-ownership-20260918|划选与会话贴纸归属]]；旧版入口说明以此修订为准。

已确认、待实现的绑定与扩展设计：[[REQ-vault-instance-binding]]、[[IF-vault-binding]]、[[INT-suite-extension-pages]]；动态端口自动连接作为必保留能力，文档验证见 [[VER-vault-binding-design]]。

完整需求阅读入口：[[REQ-integration-complete]]。最新 [[DEC-bridge-refactor-sequence]] 明确先整合桥、贴纸保留笔记关联、再做绑定路由和新的维护 Adapter；当前尚未开工。源码评估 [[EXP-bridge-consolidation]] 已撤回迁移笔记关联业务的建议，原职责决定继续有效。文档检查见 [[VER-requirements-consolidation]]。

## 目标：让笔记与真实会话相互引用

这套组合把 Obsidian 选段、笔记链接、DSH 引用气泡和会话贴纸连起来。用户保留原草稿，自行发送；内嵌 Viewer 打开的是目标实例的真实 DSH 会话。入口：[Suite 结构](records/modules/suite/overview.md)、[当前版本与限制](records/implementation/cohort.md)。

## 先区分三件事

| 用户动作 | 发生什么 | 查哪里 |
| --- | --- | --- |
| 打开或关联笔记/会话 | 保存关系或导航，不自动读取正文、不自动发送 | [关联笔记](../2026-09-14-linked-note-rail.md) |
| 引用到 DSH / 本轮 | 核对来源，形成目标会话的待发送气泡 | [笔记投递](records/implementation/note-delivery.md)、[直接引用](records/modules/obsidian-companion/interfaces/knowledge.md) |
| 固定上游与图上下文 | 固定版本及回复截止，在授权和预算内按需读取 | [Core 上下文](records/modules/annotation-core/context.md)、[当前行为](records/implementation/context.md) |

## 对象与数据归属

[身份](records/objects/identities.md) 连接实例、页面、逻辑会话和笔记；[引用](records/objects/reference.md) 区分 pending、sent、图恢复授权与删除；[知识对象](records/objects/knowledge.md) 区分普通贴纸、会话入口、关系和标记。

Vault 拥有笔记正文，Maintenance 拥有会话和已迁入结构，Core 拥有当前引用事务。Companion 保存定位、回执和可恢复同步。为什么不复制完整历史，见 [唯一写入责任](records/decisions/ownership.md) 和 [逐步授权与发送](records/decisions/explicit-context.md)。

## 模块、提供方合同与接入者

- [Suite 入口](records/modules/suite/overview.md)：七成员兼容清单，四个 DSH 子插件的单一装配组。
- [Annotation Core](records/modules/annotation-core/overview.md)：通用引用 UI、引用状态与提交、上下文注入、Host/Client 来源扩展、轻量目录。
- [Bridge Protocol](records/modules/bridge-protocol/overview.md)：两侧共享的控制/数据类型与校验；Annotation 2 单独归 Core。
- [Bridge Lifecycle](records/modules/bridge-lifecycle/overview.md)：身份租约、实际 Viewer 地址、就绪挂载与重试。
- [Reference Adapter](records/modules/reference-adapter/overview.md)：Client 领取与 Host 来源/删除分别维护。
- [Sticker Board](records/modules/sticker-board/overview.md)：普通贴纸与真实会话/来源符号、关联笔记气泡。
- [Obsidian Companion](records/modules/obsidian-companion/overview.md)：Viewer/Bridge 与 Vault 身份/标记/回执分别维护。

以上六项加 Companion 共七成员，成员清单与当前用户确认一致。Companion 运行于 Obsidian，Protocol 是被两侧消费的库；源码依赖不表示两者存在产品父子关系。

[Session Maintenance](records/dependencies/session-maintenance/overview.md) 与 [ThoughtDAG](records/dependencies/thoughtdag.md) 是独立项目，详情按稳定 ID 到各自地图。本组合保留自己的消费范围，不展开对方内部 Adapter。

提供方只留一份技术合同入口，消费者页说明自己的接入和受影响功能。Core → Adapter/Sticker → Core 的链接与关系可双向追查。项目条目提供可展开的模块目录；正文链接可直达接口、接入说明及其章节。可从 [[IF-core-client#已知接入与返回|Core Client 的接入目录]] 进入已知消费者，再返回合同。

## 图怎么读

架构图按 Suite 入口、DSH 组件、共享 Protocol 和 Obsidian Companion 框住各自内部功能，外部 Maintenance / ThoughtDAG 仅保留接口端点。Core 的 UI、事务和上下文都可独立定位；共享协议的依赖线与 HTTP 调用分开标注。可选“Core 的完整职责”“两端共享协议”“外部依赖与消费”等聚焦视图。

流程图只展开有源码证据的笔记选段队列路径：Companion 保存 → Lifecycle 就绪 → Adapter 加入 Core / claim → 用户发送 → Core 持久确认 → 回链。离线、冲突和来源/预算错误留在各自负责方。直接笔记引用、删除与上下文释放另有记录，不混成一条假定时序。

## 查需求与继续开发

保留原需求编号 XR05 / XR07 / XR08、CUT03 / CUT05、ST08 / ST11、NC02 / NC07 / NC08；它们直接绑定原规格表行。笔记投递、关联气泡、标记清理与目录归属绑定原有标题。修改需求先回到其权威来源；本地图已连接实际来源工作区，需求仍在原文件修订。

LLM 可对 project.yaml 使用 search / read / related；中文词面和别名查询不等于语义检索。读长条目应沿 offset 与 fingerprint 续读，不把摘要当全文。实现与验证分开：[版本](records/implementation/cohort.md)、[交接](records/implementation/note-delivery.md)、[上下文](records/implementation/context.md)、[既有报告](records/verification/source-evidence.md)、[[VER-suite-boundary|当前边界核对]]。

## 当前限制与维护方法

这是工作区正式维护地图，沿用原 project_id 与全部旧记录 ID。模块、接口和图形来自已有修订的定向合入，来源已接回真实项目文件；不依赖临时 candidate/revised 目录继续维护。

Maintenance 与 ThoughtDAG 通过已登记项目 ID 轻量关联。Protocol 真实工作树和四个成员消费文件已核对；其他外部消费者全部调用和真实部署兼容性未扩大核查。来源版本与地图修复范围见 [[VER-map-repair]]，初次接入和旧报告保留各自时间范围。

地图正文、记录与 diagrams 是维护源；views 是按需更新的阅读快照。继续开发时在原规格修订相关要求，按影响范围检查合同与消费者。实现与验证分开维护；旧接口入口 [[IF-reference]]、[[IF-vault]] 和 [[IF-composition]] 继续可查。


七成员范围及验收条件见 [[REQ-suite-boundary]]。旧外部档案保留身份与后继；[[VER-map-repair]]保留上次修复的历史验证，当前结果见 [[VER-suite-boundary]]。
