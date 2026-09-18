---
id: IF-composition
kind: interface
title: 整套插件怎样组装和升级
status: current
summary: Core、单一 Bridge 和 Sticker 独立启用一次；Suite 只作开发验收，Protocol 是内部依赖，Companion 安装在 Obsidian。
sources:
- path: ../../README.md
- path: ../../suite.members.json
---

# 整套插件怎样组装和升级

用户安装的 DSH 桥只有 `dsh-obsidian-bridge`。Core、普通 Sticker 和可选 Maintenance 保持独立；Companion 安装在 Obsidian。Profile 中每个独立插件只加载一次，不创建 Suite 父组，不另启用旧 Lifecycle 或 Reference Adapter。Protocol 随消费者构建提供，无用户单独安装/启用项。

Cordis 服务承载 Core → Bridge → Sticker 的能力依赖与晚加载。Bridge 独立提供绑定、路由和桥管理；引用接入在 Core 可用时挂载，普通贴纸业务需要 Core、Bridge 和 Better Sidebar，缺少所需能力时等待或显示不可用，不造成启动错误。可选能力消失后释放对应附件，已托管数据不回退旧副本写入。

升级必须保留稳定实例身份、Profile、Vault 绑定和既有数据；旧队列不得重定向。移除旧 Suite 父组与旧桥包的运行登记后，核验新独立项没有重复注册来源或消费动作。旧物理目录和内部服务 key 的保留只是兼容实现。

开发清单 `suite.members.json` 用于源码与构件核对，不表示用户应逐项启用。源码组合仍需精确的提交、锁文件及构件摘要；新包测试和真实部署分开记录于 [[VER-single-bridge-delivery]]。ThoughtDAG 为独立可选消费者，Maintenance 接入需核对既有 writerId、schema 与运行身份。
