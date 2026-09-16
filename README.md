# Obsidian Session Reference Suite

本补丁配套 Annotation Core **0.3.12-rc2.12**，跨会话引用选择器使用 DSH 会话栏的可读标题。见[组合兼容说明](docs/changes/2026-09-15-picker-title-cohort.md)。

当前版本 **0.3.4-rc2.18**，面向 **DSH 0.1.5-rc.2**。这是 DSH 与 Obsidian 引用系统的统一 Bundle：用一个父组加载四个有顺序的子插件，提供笔记引用、双向打开、会话关联、贴纸和断线恢复。

## 整套组件

以下是 [suite.members.json](suite.members.json) 记录的当前源码组合，不能据此推定这些候选版已经发布到 npm 或 GitHub Releases。

| 组件 | 当前版本 | 职责 |
| --- | --- | --- |
| Annotation Core | 0.3.12-rc2.12 | 引用气泡、准备与提交、引用状态、按需上下文工具 |
| Bridge Lifecycle | 0.3.3-rc2.16 | Bridge 地址和实例身份、Viewer 连接租约、同步挂载及重试 |
| Obsidian Reference Adapter | 0.3.4-rc2.16 | 笔记来源核对、定向领取、回链与双向删除 |
| Session Sticker Board | 0.7.3-rc2.18 | 贴纸、真实会话入口、关联笔记气泡及对应管理界面 |
| Bridge Protocol | 0.3.3-rc2.1 | 共享消息与数据协议 |
| Obsidian DeepHarness Bridge | 0.6.4-rc2.6 | Vault 侧选区、笔记定位、内嵌会话、回链和同步记录 |
| 本 Suite | 0.3.4-rc2.18 | 单一父组与组合验证 |

DSH 中的加载顺序为 **Core → Lifecycle → Reference Adapter → Sticker**，卸载顺序相反。Protocol 作为依赖提供；Companion 安装在 Obsidian，不能作为 DSH 插件加载。新会话贴纸、知识链接和结构管理还要求已接通的 [Session Maintenance](https://github.com/linmu115/dsh-session-maintenance/blob/codex/rc2-session-context-graph/README.md) 及对应扩展能力。

## 日常使用

### 笔记选段引用

在 Obsidian 的内嵌 DSH Web Viewer 打开目标会话，在笔记选取文字并点击 **引用到 DSH**。选段经过“等待接收 → DSH 已领取 → 随提问提交”的流程；目标输入框出现引用气泡后，由用户检查并发送，原草稿不会被替换。

新引用只允许该 Vault 配置的内嵌页面领取。稳定页面身份在登录重定向后仍保留，领取也校验实例；同一实例的独立 DSH 窗口不会抢走投递。尚未打开目标内嵌会话时，待处理引用保留，恢复连接后继续处理。

### 笔记关联和会话贴纸

- 在 Obsidian 使用 **将当前笔记关联到会话** 命令，或笔记菜单中的 **关联到 DSH 会话**，先选择工作区，再选择已有会话或新建独立会话。
- 对笔记选段使用 **创建或挂接会话贴纸**，可以把选段连接到真实会话；创建和关联本身不自动发送模型请求。
- DSH 会话输入区域会显示常驻的关联笔记气泡。**在 Obsidian 打开**只定位笔记/块；**引用到本轮**才核对材料并加入 Annotation 的待发送引用气泡。
- “引用到本轮”直接绑定当前实例、会话和引用集，不进入自动领取队列。会话切换、关联删除或来源改变时会重新核对，不能把旧操作交给另一个窗口。
- Obsidian 的会话链接打开完整 DSH 会话；已提交引用的标签可进一步定位到对应提问和引用详情。DSH 打开笔记时复用 Markdown 编辑页签，不替换当前 Viewer。

**关联不是上下文。** 显示关联、打开笔记或打开会话不会自动把整篇笔记加入模型请求。需要模型使用材料时，显式引用并发送；整篇材料超出传输预算时应改为在 Obsidian 选段。

## 删除与数据归属

从 DSH 删除待发送气泡会取消其待处理引用；删除已提交引用会清理对应回链。在 Obsidian 删除“DSH 引用”时，本地关系先解除，Core 端的对应注释/引用通过持久删除记录继续同步，失败可重试。解除关联只删除该关系，不删除会话或笔记正文。

同一个笔记位置可以被多个引用、回链、会话关联或尚未确认的选段共同使用。只有最后一个有效使用方解除后，Companion 才清理它自己创建并记录归属的 `dsh-note-*` 块标记。用户已有块 ID 不清理；定位不唯一或写入失败时保留清理记录等待重试。移除一个笔记中的“DSH 贴纸”回链只解除该处关系，不删除贴纸本体或其它笔记中的回链。

在当前 Maintenance 集成流程中，**会话与新增贴纸、知识链接、图结构由 Maintenance 管理真源，Vault 继续管理笔记正文**。Companion 保存笔记身份、链接回执、待处理操作和标记归属；Core 管理当前引用事务。这些记录服务于定位和同步，不是第二套完整会话备份。旧伴生格式有独立迁移流程，不能通过删本地文件或重建标记强制完成迁移。

## 安装与配置

首次手动部署时，先准备同一验证组合的本地构件，并在目标 DSH profile 安装表中的六个 DSH 包。已有 Launcher/套件管理的实例沿用其安装与更新流程，不重复安装第二套。只把 Suite 作为这组功能的 Bundle 加载；不要再把 Core、Lifecycle、Reference Adapter、Sticker 各自重复挂载为根 Bundle。[cordis.patch.yml](cordis.patch.yml) 定义唯一父组和子节点。

| 配置位置 | 要求 |
| --- | --- |
| Lifecycle 子节点 `obsidian-bridge-lifecycle.config` | `bridgeOrigin` 与 Obsidian Bridge 端口一致；`dshInstanceId` 填当前 Launcher 实例 ID；`profileId` 填当前 profile。 |
| Core / Reference Adapter 子节点 | `profileId` 与 Lifecycle 和 Maintenance 一致。Adapter 的 `bridgeOrigin` 通常留空，继承 Lifecycle。 |
| Maintenance 插件 | 使用该实例已登记的 Engine 连接及 Launcher 启动绑定；为需要的扩展登记对应插件版本。只填 JSON 不能替代可信安装与启动绑定。 |
| Obsidian 设置 | 配置本机 DSH Web 地址、Bridge 端口、伴生笔记目录；编辑后点击 **应用**。优先使用 Lifecycle 提供的当前 Viewer 地址。 |

Lifecycle 配置内容示例：

```json
{
  "bridgeOrigin": "http://127.0.0.1:18473",
  "dshInstanceId": "<当前 Launcher 实例 ID>",
  "profileId": "web"
}
```

当前三项相关扩展在 Maintenance 的 `extensionPlugins` 中对应如下，供核对配置使用。由 Launcher/套件管理的实例应通过其配置流程维护；只有首次手动配置时才合入需要的条目，并保留其它已启用扩展。`writerId` 沿用该实例已经登记的实际值，示例占位符不能直接粘贴使用，也不能换成包名覆盖原写入者。安装版本变化时同步核对，不用固定示例覆盖整份实例配置。

```json
[
  {
    "namespace": "annotation-upstream",
    "pluginVersion": "0.3.12-rc2.12",
    "writerId": "<沿用该实例 annotation-upstream 已登记的 writerId>"
  },
  {
    "namespace": "stickers",
    "pluginVersion": "0.7.3-rc2.18",
    "writerId": "<沿用该实例 stickers 已登记的 writerId>"
  },
  {
    "namespace": "obsidian-links",
    "pluginVersion": "0.6.4-rc2.6",
    "writerId": "<沿用该实例 obsidian-links 已登记的 writerId>"
  }
]
```

ThoughtDAG 是另一项可选扩展，按它自己的配套版本和配置接入，不由本 Suite 自动安装。跨会话上游引用的选区入口由配套 Annotation/Sidechat 提供。

## 连接恢复

DSH 的 Better Sidebar **Obsidian** 面板展示连接、投递及贴纸同步状态，提供针对性的重试。Obsidian 的 **DeepHarness Bridge** 设置展示待处理引用与写回状态，可打开笔记、重试或取消。Sticker 冲突需要在相应编辑器中选择保留哪一侧。

Bridge 离线时，Core 与贴纸模块仍保留已保存的本地工作；外部连接只在 READY/DEGRADED 时挂载。迁入 Maintenance 的结构编辑仍需要其后端能力，不能把“Bridge 离线可恢复”理解为可以绕过真源写入。

## 从源码构建与核对

将七个成员仓库按名称放在同一个父目录，版本与成员清单一致。各仓库当前含本地 `file:` 开发构件，Companion 还依赖 Maintenance contracts；先准备这些依赖路径或在新的开发分支更新路径与锁文件，再安装各仓库依赖。公开 Git 源码不等于本机归档自动可用。

成员依赖已安装后，在本 Suite 目录执行已有脚本：

```powershell
pnpm workspace:link
pnpm suite:check
pnpm suite:record
pnpm suite:verify
```

链接脚本只调整开发 `node_modules` 的成员别名，原别名保存在 `.suite-originals`；不修改 profile 或 Vault。重新安装依赖后需要再次链接。检查脚本按成员顺序执行类型检查、构建与测试，结果写入 `.artifacts/checks`。不要在成员构建尚未完成时并行运行 Suite 的跨组件测试。

组合记录包含源码、锁文件、依赖路径和构件摘要，并明确记录 `publicReleaseReady: false`。提交源码、打包和部署是不同步骤；当前版本号不能替代精确构件摘要。只读核对已安装组合可运行：

```powershell
node scripts/combination.mjs verify --profile="C:/path/to/profile" --vault="D:/path/to/vault"
```

如使用本仓库的 registry 候选生成流程：

```powershell
node scripts/prepare-registry.mjs "D:/path/to/state/registry/plugins.yaml"
```

该脚本生成 `.artifacts/registry` 候选及原文件摘要，不激活候选，也不部署 DSH 或 Obsidian。激活前应核对原始摘要和整套来源，保留可回退的旧构件。

## 验证范围与进一步说明

协议版本保持 Annotation 2 / Sticker 1 / Lifecycle 3。组合测试覆盖真实 Core 存储、Adapter 与合成 Obsidian HTTP 服务、目标领取、重连和删除；它们不能替代实际双应用交互、真实模型调用或 Vault 性能验收。

参阅 [CHANGELOG](CHANGELOG.md)、[关联笔记与按需引用](docs/2026-09-14-linked-note-rail.md)、[当前图谱引用生命周期组合](docs/2026-09-15-graph-reference-lifecycle-cohort.md)及 [Companion 使用说明](https://github.com/linmu115/obsidian-deepharness-bridge/blob/codex/dsh-0-1-5-rc2/README.md)。

本次配套更新支持 Maintenance 的轻量引用目录，详见[兼容变更说明](docs/changes/2026-09-15-maintenance-reference-directory.md)。

## 项目维护地图

从[项目地图](docs/project/map.md)查当前能力、设计、接口与实现；验证记录独立保存。机器检索入口为 [project.yaml](docs/project/project.yaml)。资料改变时只维护相关条目，页面按需生成。
