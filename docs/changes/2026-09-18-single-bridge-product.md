# 单一 DSH Bridge 产品更正与验收

2026-09-18。用户在交付核查中指出：将实现收进桥、但继续安装 Suite wrapper 与旧桥包，不符合“桥接层合一”。本轮据此更正产品形态。当前副本已安装单桥包组，真实 Start 与新启动浏览器基本加载检查通过；此前客户端加载故障只能确认当前恢复，根因尚未确定。Vault 绑定和完整 Stop/Restart 仍有阻塞，不能将第一阶段整体标为全部通过。

## 当前交付形态

| 对象 | 候选版本 | 用户安装/启用 |
| --- | --- | --- |
| Annotation Core | 0.3.12-rc2.19 | DSH 独立插件 |
| DSH Obsidian Bridge (`dsh-obsidian-bridge`) | 0.4.1-rc2.1 | 唯一 DSH 桥插件 |
| Session Sticker Board | 0.7.4-rc2.3 | DSH 独立普通贴纸插件 |
| Obsidian Companion | 0.7.0-rc2.1 | Obsidian 插件 |
| Session Maintenance | plugin 0.2.26-rc2.29 / Engine 0.1.33-rc2.38 | 独立可选 |
| Bridge Protocol | 0.4.0-rc2.1 | 内部开发依赖，不单独安装/启用 |
| Suite 工作区 / 旧 Adapter | 不作为产品版本 | Suite 私有开发验收；Adapter 历史退役 |

旧 Lifecycle 物理 Git 目录暂保留以维护历史，`obsidianBridgeLifecycle` 服务 key 保留内部兼容。新 profile 独立加载 Core、Bridge、Sticker 各一次，无 Suite 父组，也不同时启用旧 Lifecycle 或 Adapter。

## 最新确认的组合与归属

- 普通 Sticker 使用 **Core + Bridge + Better Sidebar**；缺少所需能力显示不可用或等待，不以启动异常代替状态。普通贴纸数据、业务校验和笔记关联仍归 Sticker。
- **Core + Bridge** 直接支持跨 Obsidian 引用。Bridge 管笔记来源、传输、定位、绑定及路由，Core 管引用运行状态、上下文组织注入、UI/样式/气泡以及提交、撤销和恢复。
- **Core + ThoughtDAG** 直接支持跨会话引用和会话贴纸；ThoughtDAG 管会话来源关系，不能把会话贴纸归回普通 Sticker，也不能把所有引用挪进 Bridge。
- 可选 Maintenance 通过各业务 Adapter 保存、恢复对应的历史消息/业务类型，并提供分类工作区范围及信息页；它不接管 Core 运行时引用。范围保存影响下次启动，当前 run 按快照完成写入；已托管数据不回退旧副本写入。
- 未来专用操作通道仍归同一个 Bridge，复用实例/Vault 绑定；具体笔记、模板、样式、面板等操作仍未实施。

## 替代关系与保留事实

[上一轮内部整合、绑定与范围交付](2026-09-18-binding-scope-delivery.md)记录旧包名和旧 Suite 父组的构建及合成结果，这些测试事实保留，但安装方案被本轮替代。历史七成员、六部署成员和 Core→Lifecycle→Adapter→Sticker 顺序只描述当时状态，不再是当前安装说明。

## 本轮检查与真实部署

| 检查项 | 当前证据与边界 |
| --- | --- |
| 完整需求、地图职责与安装入口 | 111 条地图记录，0 错误/警告；架构与流程结构检查通过；隔离无界面 Chrome 打开概览、架构、流程和新决定页，无横向溢出 |
| 单一 Bridge 包及独立 profile 接线 | 主任务回报：Bridge `b3cad82`，21 文件 102 tests 通过并生成隔离产物；Suite 私有工作区 `2480db1`，8 文件 21 tests 通过，覆盖独立节点、退役边界及保留身份的可重复配置迁移 |
| 普通 Sticker 三项业务依赖及晚加载 | 主任务回报：Sticker `50a8c13`，20 文件 123 tests 通过；按当前 Core + Bridge + Better Sidebar 组合接入 |
| Core 与 ThoughtDAG / Bridge 的职责边界 | 已记录；已有 Core/来源模块边界继续保留，不以安装重命名迁移运行时引用责任 |
| 可选 Maintenance 发布出口与精确门禁 | 前次 public business-pages 出口修复已有 12 tests/Engine build；后续 `2e84ec3` 修正 Engine .38 / plugin .29 精确白名单，32 tests、typecheck/build 通过。两批结果不相加为唯一总数 |
| 隔离 official install | 严格 peer 检查完成；暂存核验 state=verified、importsPassed=true、failures=[]，Core/Bridge/Sticker 为独立业务根，旧 Suite/Adapter/Lifecycle/Protocol 安装项缺席。仅为隔离安装证据 |
| 当前副本备份与回退 | 备份回执时间 2026-09-18 06:11:46 UTC；Engine 已停，会话数据库及维护状态、profile metadata、完整 Companion 插件目录已备份。此回执不表示新版已安装 |
| 当前副本实际安装 | `installed.json`：2026-09-18 06:21:21.734 UTC 已切换 RC2 副本 `profiles/web`；Bridge 0.4.1-rc2.1、Sticker 0.7.4-rc2.3、SM plugin 0.2.26-rc2.29 / Engine 0.1.33-rc2.38、Companion 0.7.0-rc2.1。回执含包哈希；旧 Suite、Adapter、Lifecycle、Protocol 四个安装项退役缺席，其他插件保留，Companion data 未变 |
| 真实 Start 与运行身份 | 执行主任务核验：origin `http://127.0.0.1:36928`，boot `85e3889c-b9f6-4624-a734-f5d4bbed4371`，run `run-68b9a983-155c-47d7-a94a-2c104b710b96` 为 running；SM ready，实际范围 all / revision 0。地址仅为本次证据，不能固定端口 |
| 浏览器客户端与插件清单 | 主任务使用 BrowserUse 检查新启动及禁用缓存刷新：同一 revision `9c1aa9e06508` HTTP 200 + loadingFinished，传输计数 5,212,329 bytes；另两个 bundle 均 200 + finished，分别 372,610 / 6,726 bytes；没有 loadingFailed 或 runtime exception。设置插件列表只有一个 `dsh-obsidian-bridge` 且运行中；Core 和普通 Sticker 各显示已启用/运行中 |
| 基本只读界面检查 | 打开一个已有托管会话，历史消息、40 轮导航与编辑器可加载；普通贴纸及笔记链接面板可以打开/关闭。未记录会话标题或正文，未发送消息、调用模型、编辑笔记或执行绑定；不等于引用双向业务、气泡样式和全部真实交互已验收 |
| 原 Failed load 问题 | 当前加载恢复，原失败根因未确定；后端曾正确返回同一 revision，不能把重开页面成功写成已定位并修复根因。仍观察到未映射草稿的普通 Sticker warn，以及可选 performance SSE 404，两者未被证明是原加载失败原因 |
| Stop / Restart | 当前拒绝执行，错误 `LAUNCHER_STOP_UNAVAILABLE`，无退出副作用。首次真实 Restart 的旧 run 最终 finalized / recovered：直接 appExit 未经 Launcher beforeStop，requestedStop=false，无法达到正常关闭合同；恢复检查已完成。正式外部停止入口接通前不能提供完整命令重启 |
| Companion / Vault 真实绑定 | 已安装 Companion .1；.2 的源码修复已测试但未部署。当前 Vault binding revision 0、target=null，renderer fetch 失败导致绑定未完成，仍待处理。不得宣布两侧绑定或引用往返通过 |
| 用户 Vault/会话及模型调用 | 本文档任务未执行写入或模型调用；任何后续真实操作按执行方记录 |

本轮公开来源已增量整理并挂到 [既有开发历程](../project/records/history/vault-instance-binding.md)，使用新不可变范围索引 `history/20260918-single-bridge-product-correction`；覆盖第 9–3209 行、777 个公开事件，352 组调用/返回全部配对，旧 ledger 保留。来源截点为 2026-09-18 06:14:13 UTC，不覆盖后续安装。

## 地图阅读检查

原 project_id、record_id 和 source_id 全部保留，新增 DEC-single-bridge-product、EXT-better-sidebar、VER-single-bridge-delivery。架构图保留已有节点身份，增加 Better Sidebar 依赖，Suite 节点改为非运行开发工作区；引用模块在单一 Bridge 边界内，Core 与 ThoughtDAG 职责分别表示。

阅读页输出在 `docs/project/views/index.html`，架构/流程源在 `docs/project/diagrams/`。派生回执为 `views/single-bridge-render.json`、`reader-browser-check.json` 和两图 receipt，四张 `reader-*.png` 截图供本地核对；这些派生文件不是产品源码或安装证据。项目阅读服务地址以 `views/index.preview.json` 为准，文件内容变化后需重导出。

架构仍有 109 项连线交叉/共享走线等布局提示，流程有 4 项；硬检查均通过。原生图单页 visual-check 因页面纵向滚动报告 viewport overflow，文本与控件间距检查通过；不能宣称该检查全通过。实际嵌入阅读页已视觉核对全图和记录，整体图可缩放并使用聚焦视图。未修改技能阅读器以掩盖提示。

## 安装准备的本地回执

只读核对的 [备份完成回执](D:/AI/DeepSeekHarness-Plugin/artifacts/single-bridge-20260918/backup-complete.json) 与 [隔离安装核验](D:/AI/DeepSeekHarness-Plugin/artifacts/single-bridge-20260918/staged-install-verification.json)保存在本机交付归档。它们分别证明备份/隔离构件检查；后续 [实际安装回执](D:/AI/DeepSeekHarness-Plugin/artifacts/single-bridge-20260918/installed.json) 才证明真实 profile 切换，包含精确版本和包哈希。

[客户端合并包只读检查](D:/AI/DeepSeekHarness-Plugin/artifacts/single-bridge-20260918/client-bundle-readonly-review.md)保留旧 55977 时点的服务端证据；[恢复检查](D:/AI/DeepSeekHarness-Plugin/artifacts/single-bridge-20260918/restart-recovery-review.md)保留首次重启未达到正常关闭的负结果。新 36928 启动与 BrowserUse 数字由执行主任务回报，来源晚于既有公开 ledger 截点，未伪造为旧事件，也未将网络传输计数混作服务端解压后字节数。

执行主任务另已保存 [浏览器启动与恢复摘要](D:/AI/DeepSeekHarness-Plugin/artifacts/single-bridge-20260918/browser-startup-recovery.json)，用于回查新运行身份、禁用缓存加载与基本只读交互；不包含用户会话标题或正文。
