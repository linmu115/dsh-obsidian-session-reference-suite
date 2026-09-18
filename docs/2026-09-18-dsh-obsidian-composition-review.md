# Core 引用归属、桥接插件收敛与未来操作通道评估

日期：2026-09-18。状态：基于当前源码的架构建议，尚未确认实施。本文不修改已确认需求，不改变现有安装结构，也不授权迁移历史数据。

## 判断

Core 已经承载引用状态和提交的主干，但“所有与引用有关的代码”没有也不适合全部进入 Core。Obsidian 的来源读取和笔记写回应由来源适配负责，ThoughtDAG 的业务入口仍可调用 Core 的通用能力。

当前更明确的组合问题在 DSH 侧桥接层：共享传输已经存在，连接的使用、队列消费、笔记关联与维护 UI 仍散布于 Lifecycle、Reference Adapter 和 Sticker。建议收敛为一个对外安装的 DSH Obsidian Bridge 插件，保留内部模块；Core、普通贴纸和 Maintenance 继续独立。

未来专门操作通道需要 DSH 发起端与 Obsidian 执行端。两端能力可以扩展现有桥插件；不必从第一天就再引入两个独立安装包。

## 核查范围

本次读取当前工作树源码与既有职责决定，未运行产品测试，未验证已安装进程是否已加载对应代码。查到的版本／提交为：Core 0.3.12-rc2.19／56c424a，Lifecycle 0.3.3-rc2.16／383125d，Reference Adapter 0.3.4-rc2.16／c5c8236，Sticker 0.7.3-rc2.19／4898f4e，Companion 工作树 01ec0b3，Protocol 工作树 ac12527，ThoughtDAG dsh 包 0.4.14-rc2.14／d11d924。Suite 清单仍有旧配套版本，不能把清单版本当作全部源码或运行副本的版本。

## Core 已经收敛的能力与合理的外部职责

| 能力 | 当前代码位置与判断 |
| --- | --- |
| 引用条目、状态、编号、草稿、发送与删除 | Core 的 domain、store 和 remote；属于通用引用能力，应继续由 Core 统一拥有。 |
| 提交接受、提交日志、取消补偿、回链与删除重试 | Core 的 submission coordinator 与各 outbox；外部插件调用其接口，未在本次核查范围内发现另一个完整提交引擎。 |
| 原生引用气泡、输入区接入、主会话划选和扩展动作注册 | Core 的 Client；其他业务插件注册动作，不自行接管同一主会话的整套划选流程。 |
| 跨会话引用的添加、目标输入区准备和固定来源使用 | Core 暴露 addCrossSessionReference 等能力，维护系统提供固定来源／会话映射；ThoughtDAG 负责业务入口及图。 |
| Obsidian 选文、定位、刷新、标记和笔记回链写入 | Companion 执行 Vault 操作，Reference Adapter 接入 Core 的来源合同；保持在来源适配层合理。 |
| 普通贴纸、笔记关联入口和会话贴纸 | 普通贴纸在 Sticker，笔记关联入口目前也在 Sticker，会话贴纸在 ThoughtDAG；笔记关联接入值得进一步收敛，见下文。 |

源码依据：[Core Host 接口](../../dsh-annotation-core/src/public/host-api.ts)、[Core Client 接口](../../dsh-annotation-core/src/public/client-api.ts)、[Core 启动与 outbox](../../dsh-annotation-core/src/index.ts)、[来源注册与固定来源接入](../../dsh-annotation-core/src/host/source-registry.ts)、[Obsidian 来源适配](../../dsh-obsidian-reference-adapter/src/host/obsidian-source-adapter.ts)、[ThoughtDAG 接入](../../../../repositories/thoughtdag/dsh/lib/client.js)。

“引用核心唯一”应约束数据状态、提交结果、删除与补偿的所有权，而不是要求所有按钮、来源解析和宿主操作都写进 Core。否则 Core 会被迫依赖 Vault、桥连接和各业务界面，失去独立复用能力。

Core 目前也不是完全开放的任意来源框架：SourceType 显式列出 dsh-message 与 obsidian-note，协议导出包含 Obsidian 领取和回链 DTO。若将来拆独立协议库，应区分通用引用模型与桥传输封装；保留兼容出口和唯一类型来源，不能先复制第二套定义。这属于后续整理，不能据此认定当前存在两个引用核心。

## 已核实的组合交叉点

### 连接使用和动作队列没有完全收敛

Reference Adapter 与 Sticker 的 http-client 文件均转导出 Lifecycle 的 transport，说明 HTTP 传输实现已经共享，不能说它们各自复制了一套底层传输。

但 Reference Adapter 的 Host／Client 与 Sticker Client 仍分别创建客户端。Reference 的 reference-polling 和 Sticker 的 bridge-polling 各自管理动作游标、确认和重试；业务处理依赖各自识别动作类型。多 Vault 改造若继续由各消费者自行扩展，目标选择与队列语义会散落到更多入口。

建议统一 Bridge 运行注册和动作分发，按 Vault、运行代次及 surface／controller 角色管理消费。这里不等于把 Host 与所有浏览器强行变成一个全局轮询器：后台删除必须在没有浏览器时可用，选文领取仍要限定目标 Viewer，多个 surface 之间也必须保持当前身份隔离。

依据：[共享 transport](../../dsh-obsidian-bridge-lifecycle/src/transport.ts)、[Reference Host](../../dsh-obsidian-reference-adapter/src/index.ts)、[Reference Client](../../dsh-obsidian-reference-adapter/src/client/index.ts)、[Reference 轮询](../../dsh-obsidian-reference-adapter/src/bridge/reference-polling.ts)、[Sticker Client](../../dsh-session-sticker-board/src/client/index.tsx)、[Sticker 轮询](../../dsh-session-sticker-board/src/client/bridge-polling.ts)。

### 通用桥状态面板放在 Sticker 中

BridgeHealthPanel 展示整体连接、引用接收、引用删除和贴纸同步，并调用 Lifecycle 的通用 retry；它由 Sticker 侧栏注册。整体桥诊断的可见入口因此跟随贴纸插件。

建议将通用状态、绑定与恢复 UI 的提供方迁入统一 Bridge。Sticker 只贡献自己的健康项；其侧栏可以继续放入口，但不再拥有整个桥诊断页面。

依据：[状态面板](../../dsh-session-sticker-board/src/client/bridge-health-panel.tsx)、[侧栏注册](../../dsh-session-sticker-board/src/client/sticker-sidebar.tsx)。

### 笔记关联引用同时跨越 Sticker 与 Reference Adapter

Sticker 的 LinkedNotes 当前自己完成：解析维护身份 → 读取关联对象 → 调用 Bridge 准备来源 → Core.addReference → Bridge 确认；失败时再调用 Core.discardPendingOperation。Reference Adapter 的选文领取是另一条入口，也调用 Core 添加与取消接口。

这不是 Sticker 重写了 Core 的引用状态机，Core 仍拥有补偿和持久状态；但两条 Obsidian 来源接入流程分属两个插件。建议将“把一个 Obsidian 来源加入当前引用”的编排收敛到 Bridge 内的引用适配模块，对 UI 暴露简单入口。笔记关联面板可由 Bridge 提供，或原位置只保留调用入口。

依据：[Sticker 关联笔记引用](../../dsh-session-sticker-board/src/client/linked-notes.tsx)、[Reference 选文领取](../../dsh-obsidian-reference-adapter/src/client/annotation-consumer.ts)、[Companion 来源准备与确认](../../../rc2-adapt-20260912/obsidian-deepharness-bridge/src/vault/linked-reference.ts)。

将笔记关联从 Sticker 移入 Bridge 会调整 [现有职责决定](project/records/decision/selection-ownership-20260918.md) 的一部分，因此这里只提出建议。用户确认后再更新决定与迁移计划，不能借本次评估直接移走功能。

### 通用桥传输与具体业务能力绑得较紧

Lifecycle 的 createBridgeHttpClient 在握手时统一要求引用刷新、回链提交、引用删除和贴纸回链删除等能力；transport 同时导入 Core 的引用协议和贴纸数据协议。这对现有整套安装可用，但未来“只操作 Obsidian 笔记”的调用不应以贴纸和引用能力全部存在为前提。

建议拆开基础连接握手与具体能力协商。引用、关联笔记、贴纸和未来操作分别声明需要哪些能力。这里只调整内部合同和依赖方向，不要求再造四个运行插件。

## 建议的收敛结构

| 对外安装项／共享资产 | 建议职责 |
| --- | --- |
| Annotation Core | 通用引用状态、提交、取消、删除、渲染和来源扩展接口。保持独立。 |
| DSH Obsidian Bridge（名称待定） | 接收现有 Lifecycle 与 Reference Adapter 的职责，统一连接、绑定、路由、动作分发、状态 UI、Obsidian 来源适配与可选维护接入。 |
| Obsidian Bridge | 保留现有 Companion，在 Obsidian 进程中负责 Vault 绑定、Viewer、笔记来源与操作执行；内部拆模块即可。 |
| Sticker Board | 普通贴纸和其业务交互；桥连接和通用笔记接入通过 Bridge 调用。 |
| ThoughtDAG、Sidechat | 保留各自业务职责，通过 Core 使用引用能力。 |
| Session Maintenance | 保持独立，提供维护、有效范围、数据归属与公开扩展页；Bridge 作为可选消费者。 |
| Bridge Protocol | 两侧共享协议库，独立于运行插件的安装数量；可以同仓维护，保持可复用出口。 |
| Suite | 可继续作为选装组合／安装预设，不增加自己的运行状态和数据归属。 |

建议 DSH Bridge 内部至少分开运行连接、Obsidian 引用适配、笔记关联、维护接入和未来操作工具。内部模块只向自己需要的能力接入：无 Core 时基础连接和未来笔记操作可运行，无 Maintenance 时基础桥能力可运行，无 Sticker 时桥状态与笔记入口仍可用。

从维护收益看，优先合并 Lifecycle 与 Reference Adapter 的运行包装，并移入通用桥 UI 和接入编排。Core 与 Bridge 不同职责且存在其他消费者；普通贴纸也有不使用 Obsidian 的价值，继续独立更合适。Obsidian 与 DSH 是不同宿主进程，不能仅靠合并安装包消除两端适配。

## 未来专门操作通道放在哪一侧

两侧都需要相应能力，但可以分别放在现有两侧 Bridge 内：

1. DSH 侧向 LLM 暴露有名称和结构化参数的工具，选择绑定 Vault，检查目标能力，发出请求并解释结果。
2. Bridge 使用已有实例／Vault 身份和路由，关联请求与响应，处理离线、重试和绑定变化。
3. Obsidian 侧执行器在 Obsidian 进程中调用笔记与工作区能力，创建／修改笔记，后续再提供模板、样式、面板及插件生命周期能力。
4. Obsidian 返回实际结果，如已写入笔记的身份、内容修订或失败原因；DSH 据此继续工作。

建议调用链：DSH 工具 → 统一 DSH Bridge → 绑定 Vault 的 Obsidian Bridge → 对应操作模块。Maintenance 可选参与维护记录，不在每次笔记操作的必经路径中；纯笔记操作也不以 Core 引用运行能力为前提。

笔记操作应尽量由 DSH Host 发起，不依赖内嵌 Viewer 恰好打开在某个会话；需要 Obsidian UI 的操作仍要求目标宿主与相应能力处于可用状态。具体插件注册和启停采用哪种受支持的宿主接口，留到该功能实施时核验。

首阶段可把操作执行器写成 Obsidian Bridge 的可选内部模块，DSH 工具写成 DSH Bridge 的内部模块。以后某类操作需要独立安装、独立发布，或有多个不同实现时，再通过已预留的能力注册接口做独立插件。不能为新操作再建立第二套配对、端口发现和路由。

## 若采纳建议，后续实施应保留什么

- 先确定运行能力归属，再合并包装；保留公开接口兼容过渡，避免旧套件同时加载新旧 Bridge。
- 继续只有一个 Core 状态所有者；统一引用接入不重建 referenceId、Vault 身份和历史定位。
- 以 Vault、运行代次和 surface 角色核验路由，保留 Host 后台删除、Viewer 定向领取和动态端口续接。
- 公共桥管理页由 Bridge 自己运行，向 Maintenance 的信息页仅作可选贡献。
- 把基础握手与业务能力分开；测试无 Core、无 Sticker、无 Maintenance 的相应基础能力，以及两个 Vault 并行。
- 保持普通贴纸与会话贴纸的既有区分。笔记关联接入是否迁入 Bridge 是待确认变化，不伪装成已经实施。

上述均为本轮建议。当前已经确认的产品需求以 [完整需求稿](2026-09-18-dsh-obsidian-confirmed-requirements.md) 为准；本次没有改动产品代码、插件名称、包依赖、加载顺序或部署。
