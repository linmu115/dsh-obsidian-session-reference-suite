# Vault 与 DSH 实例绑定、动态连接及可选维护接入

日期：2026-09-18。需求与合同设计入口。下文保留设计初期的源码观察；双侧绑定与路由已完成前阶段实现及合成验收，见 [阶段记录](changes/2026-09-18-binding-scope-delivery.md)。当前单桥安装形态及新包/部署验收见 [更正记录](changes/2026-09-18-single-bridge-product.md)。

跨项目的完整产品要求统一阅读 [需求完整稿](2026-09-18-dsh-obsidian-confirmed-requirements.md)。本页需求表保留原编号作为摘要；Bridge 接口草案仍在本页维护。原插件合并讨论保留在[职责评估](2026-09-18-dsh-obsidian-composition-review.md)；当前按完整稿 R12/R13 执行单桥产品与独立业务组合。

本文拥有 Bridge 绑定、发现、路由及操作管道预留的设计。Maintenance 的公开扩展注册与实例有效范围合同由 [Maintenance 设计](../../dsh-session-maintenance/docs/superpowers/specs/2026-09-18-extension-pages-and-instance-scope.md) 维护；双方通过接口协作，不复制对方内部实现。

## 已确认需求

| 编号 | 要求 | 验收含义 |
| --- | --- | --- |
| VB01 | 仓库指 Obsidian Vault，实例指 DSH 实例；一个 Vault 至多绑定一个实例，一个实例可以绑定多个 Vault。 | 未绑定是合法状态；同一 Vault 不能同时存在两个有效绑定。 |
| VB02 | 绑定能力属于 Bridge，单独安装 Obsidian–DSH 系列时仍然成立。 | Maintenance 和 Launcher 都不成为基础配对与运行的必需依赖。 |
| VB03 | Obsidian 插件设置页提供当前 Vault 的实例选择和绑定管理；Maintenance 扩展业务页提供实例视角的集中管理。 | 两个入口使用同一绑定接口和修订，不能各自维护可独立覆盖的绑定。 |
| VB04 | Launcher 每次启动可能分配不同 DSH Web 端口，自动连接能力必须保留。 | 绑定稳定实例 ID；同实例重启、换端口及登录信息更新无需重新绑定。 |
| VB05 | 各 Vault 共用绑定实例勾选的全部同步工作区。 | 不增加 Vault 自己的工作区筛选名单；实例 A 与 B 的同步范围可以不同。 |
| VB06 | 工作区取消同步后保留旧链接，提示“当前绑定实例未同步此工作区”。 | 不删除引用、笔记或会话；不自动改绑或切换另一实例；相关会话访问和投递暂停。 |
| VB07 | 重新勾选工作区后按原身份核验并恢复解析。 | 不重建引用；真正删除、未同步、离线和映射未就绪分别表达。 |
| VB08 | 改绑只改变后续操作的目标。 | 历史引用保留原实例、逻辑会话、Vault 及引用身份；历史迁移另走明确维护操作。 |
| VB09 | 两组插件可分别独立安装并正常运行。 | 基础功能不以可选插件存在为启动条件；缺席不产生持续失败重试；已托管数据不恢复旧副本写入。 |
| VB10 | Maintenance 公开扩展业务注册；数据目录只是插件信息页的一个可选栏目。 | Obsidian 系列通过公开接口贡献自己的绑定、状态、数据与同步栏目。 |
| VB11 | 保留后续 DSH → Obsidian 专门操作管道的可扩展性，并提供直接操作权限。 | 复用身份、绑定、路由及请求结果合同；不要求逐 Vault 能力识别、登记或协商。笔记、样式、模板、面板和插件注册功能以后实施。 |

来源：当前 Codex 任务 01a0b244-91e1-7c60-9d88-0b67eed0f0e9。初始要求、八项批注、两个范围选择以及动态端口问题分别可从 [本次设计历程](project/records/history/vault-instance-binding.md) 展开；用户来源与工程建议分开保存。

## 设计起点的实现与缺口（历史观察）

- Lifecycle 从宿主 webServer 的实际监听端口生成 Web origin，再通过 connection.authenticatedUrl 取得 Viewer URL，随控制租约传给 Companion。Companion 优先使用活动控制连接提供的 Viewer URL。这条动态地址链路已存在，不能退化为把某次端口写死在绑定里。
- 当前 Lifecycle、Reference Adapter 和 Sticker 的连接入口仍以单个 bridgeOrigin 为中心。多 Vault 需要让连接、来源读取、导航、回链与删除都按 vaultId 路由。
- Companion 当前从控制租约选择最近附着的实例，未形成持久的 Vault 独占绑定。新设计使用绑定身份选择控制方；另一实例后来上线不改变已有归属。
- Maintenance 已有业务 namespace、面板分组、修订和冲突存储；插件自行注册完整信息页及栏目仍待补齐。
- 2026-09-18 的 [划选与会话贴纸归属修订](project/records/decision/selection-ownership-20260918.md) 继续有效：Core 管原生主会话划选，ThoughtDAG 管跨会话入口与会话贴纸，Sticker Board 管普通贴纸、迁移及 Obsidian 双向链接。本设计不把这些职责移回旧提供方。

源码定位：

- [Lifecycle 启动与实际地址](../../dsh-obsidian-bridge-lifecycle/src/index.ts)、[租约续期](../../dsh-obsidian-bridge-lifecycle/src/runtime.ts)。
- [Companion 控制连接](../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/bridge/server.ts)、[Viewer 地址解析](../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/webviewer/launch-url.ts)。
- [Reference Adapter 来源接入](../../dsh-obsidian-reference-adapter/src/index.ts)、[浏览器导航](../../dsh-obsidian-reference-adapter/src/client/index.ts)。
- [Sticker 单连接入口](../../dsh-session-sticker-board/src/index.ts)。

## 绑定与连接合同草案

本节保留设计职责和行为；最终字段以 Protocol 与各提供方源码为准，当前实现见 [[IMP-vault-binding-routing]]。共享传输形状由 Bridge Protocol 唯一维护，数据语义由各提供方维护。

### 身份与写入责任

- Companion 持久保存 vaultId、有效目标实例、选定运行 Profile 和绑定修订；解除绑定保留必要的修订或撤销证据。配对、解绑和改绑都在同一写入口处理。
- DSH Bridge 维护当前实例身份及按 vaultId 索引的已确认连接。实例与 Profile 身份必须同 Maintenance 对齐，Profile 不提供绕过“一个 Vault 一个实例”的第二个绑定入口。
- Maintenance 通过业务接入保存维护登记、确认修订和同步回执。登记是已确认绑定的投影，不能离线独自改成另一份有效绑定。
- Web 端口、Bridge 端口、bootId、租约和 Viewer surfaceId 各有运行语义，不替代实例或 Vault 身份。移动路径、重命名和重启不自动生成新身份。
- 同 vaultId 同时由两个独立副本发布、同实例 ID 出现无法区分的运行归属时，显示身份冲突并暂停有歧义的写入；不按名称或“最后上线”猜测。跨机器发现不属于首版范围。

绑定变更携带预期修订和操作身份，重复提交返回同一结果；并发改绑明确冲突。Maintenance 发起操作后只有收到 Bridge 确认才显示生效。Vault 离线时显示未完成或等待连接，不能提前展示成功。已绑定情况下更换目标必须是明确改绑意图。

### 本机发现

建议首版采用 DSH Bridge 自登记与手动配对，Launcher 目录作为可选发现来源；这是工程方案，不把 Launcher 适配列为首版阻塞项。

1. DSH Bridge 启动并确认实际监听地址后，在约定的用户级本机登记目录发布实例 ID、显示名、Profile、无登录令牌的连接地址、协议及能力、运行代次和有效期。每个发布者维护自己的条目，原子更新。
2. Obsidian 读取目录，核验候选实例的身份与当前能力，再显示可连接、离线、尚未安装 Bridge 等状态。发现条目只提供候选，不产生授权或绑定。
3. 用户从设置页选择实例，或使用手动地址／配对信息，经 Bridge 配对后保存稳定绑定。没有唯一可核验目标时保留未绑定状态。
4. 可选 Launcher 发现模块补充已安装、未运行实例的名称与身份。Launcher 缺席、未运行或目录不可识别不阻断其他来源；核心不解析 Launcher 私有配置。

已有 Launcher 实例应复用真实 instanceId；当前源码中 DSH_LAUNCHER_INSTANCE 是实例名称，不能将它当稳定 ID。若已有可信运行配置没有提供 ID，可由独立 Bridge 在实例配置域持久生成 ID；后续接入 Maintenance 时核验身份一致，不能静默另建第二个身份。

### 动态端口与重连

持久关系是“Vault → instanceId”，运行映射是“instanceId + Profile + 当前运行代次 → endpoint”。DSH Web origin 与 Obsidian Bridge origin 分开登记。

必须保留以下时序：

1. Launcher 启动实例并分配端口；Lifecycle 等待宿主公布实际 Web 地址。
2. 发布当前端点；按已绑定 vaultId 建立控制连接，传递当前允许的 origin 和有效 Viewer 登录地址。
3. Companion 按绑定实例选择控制租约，更新 Viewer 和通信目标，继续保留原 surfaceId 与历史引用。
4. 实例重启、端口变化或 Bridge 重启后重新核验身份并续接。旧代次的延迟响应、租约、令牌和轮询不能覆盖新连接。

新端口被另一个实例占用时，不可因地址相同接入错误实例；同实例被分配新端口时，不可要求重新绑定。带登录信息的 Viewer 地址只经受控连接传递，不写入公开发现条目或展示日志。未受核验的旧配置／启动日志不能覆盖已绑定实例的当前地址。

多 Vault 同时运行时各 Bridge 应取得独立可用端口并自行发布；固定默认端口不能成为多 Vault 并行的前提。单个 Vault 关闭只释放该 Vault 的连接，不停止同实例其他 Vault 的工作。

### 按 Vault 路由与历史操作

引用来源、打开笔记、回链、删除和后续写入都携带或可唯一解析 vaultId。两个 Vault 的同名笔记必须路由到正确来源。公共来源类型仍可保持 obsidian-note，由 Reference Adapter 内部路由，不为每个 Vault 新建一套 Core。

改绑前停止旧目标的新投递，并确认或暂停仍未完成的作业。队列保留其原目标、绑定修订和操作身份；不能把旧队列改写成新目标继续提交。历史链接的原归属保持；旧实例当前不可用时显示明确状态，另行维护不隐含在“改绑”里。

## 维护范围与插件缺席

维护模式下，所有绑定同一实例的 Vault 共用实例的有效同步范围，消费 [Maintenance 实例有效范围合同](../../dsh-session-maintenance/docs/superpowers/specs/2026-09-18-extension-pages-and-instance-scope.md#实例有效范围合同草案)。Bridge 不保存第二份工作区选择策略；可以缓存带修订的显示结果，写入前仍须核验。

| 情况 | 约定 |
| --- | --- |
| 仅安装 Obsidian–DSH 系列 | 发现、配对、路由、基础引用与导航正常，使用原生实例目录及独立存储能力。未安装 Maintenance 时不启动对它的持续失败重试。 |
| 仅安装 Maintenance | 会话维护及其他业务扩展正常；不启动 Obsidian 轮询。保留历史扩展元数据。 |
| 两者都安装 | 通过可选能力接入维护登记、逻辑身份解析、有效范围和信息页。 |
| Maintenance 暂时离线 | 显示暂不可用，保留未确认编辑与作业；已托管对象不退回旧本地副本写入。 |
| 取消工作区同步 | 保留旧链接与定位，显示“当前绑定实例未同步此工作区”；相关会话访问、投递和修复暂停。 |
| 恢复工作区同步 | 按原逻辑身份核验映射后恢复；不创建替代引用。 |
| 会话真正删除或映射不明 | 分别显示已删除或尚不可解析，不能用“未同步”吞掉其他状态，也不能将一次目录缺席当删除。 |

能力出现和消失均可重新挂载或释放，启动顺序不影响独立运行。缺少功能提供方是正常状态，已安装但暂时离线才按其恢复策略重试。

## 操作管道扩展预留

专门操作通道扩展现有 DSH Bridge 与 Obsidian 侧 Bridge 的内部模块，不新增操作插件安装项。Obsidian 侧 Bridge 即 `obsidian-deepharness-bridge` / DeepHarness Bridge，旧称 Companion。DSH 通过同一绑定及路由获得直接操作权限；Bridge 负责目标、连接、请求身份和结果关联，Obsidian 侧执行器调用宿主的笔记、模板、样式、面板等接口。

操作请求必须确定 vaultId，并关联当前绑定修订及请求鉴权。不要求每个 Vault 声明、识别或协商操作能力，不以能力目录、查询或逐项启用为前置；实际不支持的操作返回明确错误。请求支持幂等或明确声明不可重试，改绑后未完成请求保持原目标。

本节最初只预留合同；后续用户要求开始实现并明确必须有 CLI。当前 .3 源码候选已实现 skill、绑定目标封装、CLI 派发与回执；本机 CLI 和桥重载已验证。Bridge .3 / Sticker .5 已部署并 active，skill 目录已核验；面板/任意脚本/Plugin API 补充执行器未实现。插件业务仅重载已有插件，生成、构建和安装由本地工具承担。见 [[IMP-obsidian-cli]]、[[VER-obsidian-cli]]。

用户追加由桥交付操作 skill，指导 DSH 优先走绑定 Vault 的官方 CLI；具体目标必须显式核验，不依赖活动 Vault，也不将桥 vaultId 直接假定为 CLI 的原生 Vault ID。CLI 未覆盖功能建议由同一 Obsidian 侧桥的公开 Plugin API 执行器补充。路线、依据和实现边界见 [[DEC-obsidian-operation-route]]。

修订来源：2026-09-18 当前地图核对任务的用户批注“这个不用识别，只需要提供直接操作权限就行，更新地图里的需求”。它替代本节此前逐 Vault 能力声明与查询的方案；既有引用协议与运行身份的兼容性检查不因本次未来操作通道的需求修订被删除。

## 改动范围与项目责任

| 项目或组件 | 范围判断 | 需要处理的内容 |
| --- | --- | --- |
| dsh-obsidian-bridge-lifecycle | 必须改动 | 稳定实例身份、自登记、按 Vault 管连接、动态端口重连和可选维护接入。 |
| obsidian-deepharness-bridge | 必须改动 | 设置页配对、绑定唯一写入口、绑定控制方选择、发现消费、范围状态和操作扩展预留。 |
| dsh-obsidian-bridge-protocol | 必须改动，共享库 | 绑定／发现／能力与多 Vault 路由形状，代次、修订及兼容声明。 |
| dsh-obsidian-reference-adapter | 必须改动 | Host／Client 按 vaultId 路由来源、领取、导航、回链与删除，保留独立运行。 |
| dsh-session-sticker-board | 必须改动 | 普通贴纸和关联笔记的多 Vault 路由、范围提示、可选维护能力；不接回 ThoughtDAG 已拥有的会话贴纸。 |
| Session Maintenance 项目 | 必须改动 | DSH 接入插件、Engine、contracts 和 Dashboard 的公共扩展页注册、实例有效范围及回执；详见其设计。 |
| dsh-obsidian-session-reference-suite | 装配与兼容同步 | 配套版本、依赖声明、可选集成和组合矩阵；不成为绑定真源。 |
| dsh-annotation-core | 兼容核查，必要时小改 | 保持 vaultId／引用身份和通用来源接口；不放入实例发现、Vault 绑定 UI 或路由实现。 |
| ThoughtDAG | 已知消费者核查，必要时小改 | 当前会话贴纸与会话选择消费 Maintenance 目录，验证有效范围和未同步状态；可按公共接口迁入自己的扩展栏目。 |
| Sidechat 及其他扩展 | 公共接口兼容回归 | 不因这次绑定方案主动重写业务；需要迁移的消费者单独说明依据。 |
| Launcher | 可选增强 | 需要时提供稳定 ID 和目录发现支持；随机端口本身不要求新增硬依赖。 |

首版不新增必装插件。Maintenance 侧与双侧插件之间的集成放入可选模块；具体页面贡献落点以数据／能力提供方为准，Suite 只负责装配。

## 验收清单

以下是后续实施必须验证的场景，本次没有执行产品验收。

- 一个实例绑定两个 Vault，同时处理同路径同文件名的引用和笔记操作，结果分别落入正确 Vault；关闭一个不影响另一个。
- 同一 Vault 的两个并发绑定／改绑请求只能有一个有效结果；两个 UI 看到一致修订。
- 同一实例从端口 P1 重启到 P2，登录信息变化后自动重连；Vault 绑定、surfaceId 和引用身份不变。
- 另一实例占用旧端口、较旧租约迟到、旧进程延迟响应和 Bridge 重启均不能劫持新连接；取消待处理操作不误删原引用。
- 不运行 Launcher、不安装 Maintenance 时，Bridge 自登记／手动配对及基础引用和导航正常。
- 同实例多个 Vault 的工作区选择器同步刷新；取消勾选后旧链接保留且提示未同步，提交时再次检查范围；重新勾选经原身份核验恢复。
- 改绑保留历史归属，旧队列不改投新实例；重复回链与删除仍保持幂等。
- 分别只安装一组插件、两组都安装、启停顺序相反、禁用再启用、版本不匹配及已托管后离线，均符合独立运行和写入归属约定。
- 现有 Core、Reference、Sticker、ThoughtDAG、Sidechat 的相关引用入口按其当前职责回归。
- 验证操作 skill 与工具注册/注销、显式绑定目标调用、CLI 缺席明确失败及不重复写入；不要求逐 Vault 能力注册/查询。源码测试不代替真实笔记写入和 UI 验收。

## 实施前核查与非目标

没有剩余的产品行为问题需要用户再次确认。以下是实现任务中的技术核查，不是已经完成的工作：

1. 选定登记目录、租约时间、字段及协议版本；明确已安装版本的升级与未绑定状态呈现。
2. 核对 Launcher 或已有运行配置向 Bridge 传递真实 instanceId 的方式，保证与 Maintenance 身份闭合；不能使用名字、端口或路径哈希临时代替。
3. 在实际工作区同步实现中定位每实例／Profile 的有效范围来源，并验证取消与恢复的真实语义。当前发现的历史 Codex 原生回写名单不能直接当作这个接口。
4. 核对实际运行包与工作区差异，再固定组合版本进行测试。本文的源码观察不代表已安装副本验收。

不实现跨机器发现、跨实例自动重路由、历史数据自动迁移、每 Vault 工作区筛选或未来操作插件的具体业务。
