---
id: IF-composition
kind: interface
title: 整套插件怎样组装和升级
status: current
summary: Suite 是单一加载入口；协议包是共享依赖，Companion 安装到 Obsidian。
sources:
- file: ../../README.md
- file: ../../suite.members.json
---

# 整套插件怎样组装和升级

加载顺序为 Core → Lifecycle → Reference Adapter → Sticker，卸载反向执行。不要又把四个子成员作为独立根插件重复加载。

七成员版本和目标位置来自 suite.members.json；协议包提供约定，不作为第五个运行子插件。ThoughtDAG 是外部可选消费者，并不包含在 Suite 里。Maintenance 通过扩展声明接管已迁移业务对象，需要匹配 writerId、schema 和兼容条件。

源码组合使用本地路径依赖，开发清单还记录源码提交、锁文件和产物信息。它不是已经可从公共 npm 重现的发行版，publicReleaseReady 仍须由实际发布检查确认。升级时先构建成员，再检查组合与宿主，不能把兼容版本号相同当成真实安装通过。
