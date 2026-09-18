---
id: MOD-protocol
kind: module
title: Bridge Protocol：两端共享类型与校验
status: current
summary: 独立库提供控制及数据两个出口；不拥有 Companion、不保存引用事务。
sources:
- path: ../../../../rc2-adapt-20260912/dsh-obsidian-bridge-protocol/README.md
  role: source-reviewed-2026-09-16
- path: ../../../../rc2-adapt-20260912/dsh-obsidian-bridge-protocol/package.json
  role: source-reviewed-2026-09-16
- path: ../../../../rc2-adapt-20260912/dsh-obsidian-bridge-protocol/src/index.ts
  role: source-reviewed-2026-09-16
- path: ../../../../rc2-adapt-20260912/dsh-obsidian-bridge-protocol/src/data.ts
  role: source-reviewed-2026-09-16
relations:
- relation: provides
  to:
    record_id: IF-protocol-control
  reason: 控制类型与校验唯一提供方
- relation: provides
  to:
    record_id: IF-protocol-data
  reason: 数据类型与校验唯一提供方
---

# Bridge Protocol：两端共享类型与校验

Protocol 是七成员之一，以依赖库随消费者构建。它没有 UI，不启动 HTTP 服务，也不创建 Companion；Companion 是运行在 Obsidian 的并列组件。DSH 侧 Lifecycle 与 Obsidian 侧 Bridge 服务共同消费控制协议，贴纸与导航组件消费数据协议。

## 两个维护边界

- [[IF-protocol-control|控制协议]]：Bridge 启动身份、状态、握手、租约、允许的本机 origin 与 Viewer 地址、排空和恢复请求。
- [[IF-protocol-data|数据协议]]：贴纸、回链、打开笔记、深链与旧消息兼容；提供稳定逻辑目标的可选形状。

两个出口具有不同对象和消费者，分别保留合同入口；无需把每个校验函数再拆成子模块。Annotation 2 引用模型属于 [[IF-core-annotation-protocol|Core 的引用协议]]，Protocol 不复制该模型。

## 已核对源码与版本

包版本 0.3.3-rc2.1；控制协议 Lifecycle 3、数据协议 Sticker 1。Suite node_modules 的 Junction 实际指向 rc2-adapt-20260912/dsh-obsidian-bridge-protocol；本次读取的是该真实源码工作树，未用旧归档路径代替源码。

[[INT-lifecycle-protocol|Lifecycle 接入]]、[[INT-reference-protocol|Reference Adapter 接入]]、[[INT-sticker-protocol|Sticker 接入]]、[[INT-companion-protocol|Companion 接入]]分别说明实际调用范围。安装清单、源码导入与运行实例是否启用是不同事实。
