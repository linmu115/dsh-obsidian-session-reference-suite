---
id: VER-obsidian-cli
kind: verification
title: 官方 CLI、候选代码与真实桥重载验证
status: current
summary: 144 项源码测试通过；本机 CLI 1.13.7 与绑定目标只读、一次桥重载通过，Bridge .3 / Sticker .5 已部署，live active 与 skill 目录已核验。
relations:
- relation: verifies
  to:
    record_id: IMP-obsidian-cli
---

# 官方 CLI、候选代码与真实桥重载验证

2026-09-18，本机证据目录：`D:/AI/DeepSeekHarness-Plugin/artifacts/obsidian-cli-20260918`。只保留版本、身份、状态、计数和请求摘要，不含笔记正文或登录令牌。

| 对象 | 结果与范围 |
| --- | --- |
| DSH Bridge 0.4.1-rc2.3 源码 | 类型检查、依赖 peer 检查、构建通过；24 个测试文件、144 项测试通过，新增 CLI 与工具注册测试共 22 项。包含幂等/不明回执、目标错配、CLI 缺席、绑定变化、符号链接越界、自重载恢复及托管工具撤销。 |
| 隔离发行包边界 | 测试覆盖不安装 Core/Sticker/Maintenance 的 Host 加载、公开类型、浏览器导出无 Node 依赖；不证明真实 profile 注册成功。 |
| 官方安装器 | 原安装器 1.8.4，应用自动更新内容 1.13.7。官方 1.13.7 安装器 Authenticode Valid / Dynalist Inc. 且 SHA256 对应官方 release asset。备份后正常关闭 Obsidian、安装退出码 0；没有强杀进程。 |
| CLI 启用 | 开启已核实的全局 CLI 配置并补充用户 PATH；返回 `1.13.7 (installer 1.13.7)`，帮助含 plugin:reload。旧 DSH 进程不继承新 PATH，部署建议配置官方 .com 绝对路径。 |
| 真实绑定目标只读 | 候选源码 resolver 核验当前实例/web、math Vault 的 revision 1 与原生 ID；CLI 返回路径一致，0 个写回执。见 bridge-cli-readonly.json。 |
| 真实插件重载 | 候选源码执行器通过 CLI 对现有 Obsidian 侧桥重载一次；新 boot 身份及原路径/原生 ID/绑定修订满足条件才写 completed。reload-receipts.json 中仅 1 个请求，bridge-cli-reload.json 的恢复身份检查通过。 |

重载已完成后，首次报告采集的独立 version 调用短暂报 CLI 错误；completed 回执已持久化。随后仅再次读取版本和身份均通过，没有重复重载。此负结果保留在 bridge-cli-reload.json，不能把报告采集失败误报为插件重载失败或据此重放写请求。

候选在独立输出目录构建并打包，文件为 `dsh-obsidian-bridge-0.4.1-rc2.3.tgz`；最终包哈希及文件清单见 package-verification.json。源码测试与本机直接执行器验证不等于 DSH 部署验收。

升级前完整安装器、全局配置、math .obsidian 插件状态及 PATH 备份保留在上述证据目录 backup 中。没有修改 Vault 绑定、同步名单或笔记。

首轮打包时未部署；下方后续记录替代这一时点。尚未验收：Agent 实际选择 skill/调用工具、真实笔记写入、多 Vault 真实并发、面板/样式视觉与完整引用往返。当前 Launcher 没有已核验 Stop 协议，未绕过停止流程。Obsidian 侧插件源码未改；本次重载仍是已有版本。

## 2026-09-18 真实 DSH 部署续记

用户授权继续处理依赖，并告知实例已停止。新证据目录 `D:/AI/DeepSeekHarness-Plugin/artifacts/obsidian-cli-deploy-20260918`。

- 正常停止：最新 `run-83194c81-16d4-4ca4-8c89-62a1804ba654` 为 closed，Launcher finalized/closed，shutdownAccepted 已记录，live 端点不再发布实例身份。安装前再次核验。
- Sticker 0.7.4-rc2.5 类型检查和 123 项测试通过；追加 Bridge .3 peer，28 个运行源码文件哈希与旧版一致。暂存严格 peer 安装和两包真实 import 通过。
- 暂存曾发现 GPT 兼容/账号插件的旧 override 指向先前归档，可能回退现有更新；真实实例未写入前已对齐当前 manifest/lock，并重新安装验证。其运行包未替换。最终 map 保留现有所有包，仅添加已核验物理路径的 Bridge skill/tools 依赖。
- `installed.json` / `installed-verification.json`：两包安装及元数据哈希通过；其他 manifest、patch 节点、cordis 配置、Maintenance attestation 保留。补充桥 CLI 绝对路径和 Sticker 维护登记版本。
- `start-binding-repaired.json`：正式 integration repair 后 connected/issues=[]；其他绑定、同步范围、Launcher hook 和 profile 配置均保持。
- `activated.json`：正式 Start 后 RC2/web running，boot `bf41f5c7-94dc-4fc8-be28-6d252cfd110c`，run `run-41db22cc-cc51-4e8b-ae67-d94444068ec7` running、Engine ready。动态端口只作为本次证据，不固化为绑定。
- 鉴权后的正式 pluginInventory/list 返回 Bridge、Sticker、skills、tools 均 active，失败插件计数 0；对一个已有会话只读查询 skills/list，包含 `obsidian-bound-vault` 且 modelInvocable=true。没有发模型请求、读取会话正文、激活会话或写笔记。
- 启动后官方 CLI 再次返回 1.13.7，显式目标路径与 math 一致。这仍不等于 Agent 已实际调用 dsh_obsidian_cli；真实工具调用、笔记写入、UI 和完整引用往返待验收。

首次只读 API 探测因缺 RPC envelope/args 被拒，按本地官方协议补齐后成功；未造成写入。部署阶段不以健康检查代替业务验收。备份位于新证据目录 backup、before-integration-repair，以及 profile 内 `.obsidian-cli-install-20260918` 事务目录。
