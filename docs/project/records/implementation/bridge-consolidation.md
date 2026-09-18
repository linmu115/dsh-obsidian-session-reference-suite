---
id: IMP-bridge-consolidation
kind: implementation
title: 第一阶段：整合 Bridge 与普通贴纸共用通道
status: current
progress: implemented
summary: 引用接入并入 Bridge，普通贴纸保留业务并借用通道，Suite 收敛为三个运行子插件。
relations:
- relation: implements
  to:
    record_id: DEC-bridge-refactor-sequence
- relation: implements
  to:
    record_id: REQ-integration-complete
---

# 第一阶段：整合 Bridge 与普通贴纸共用通道

原 Lifecycle 包保留升级身份，内部整合引用来源、领取、回链、删除和导航。Bridge 统一拥有每个宿主／页面的动作轮询、确认与重试，对业务提供借用传输、动作处理者注册及引用交接。Core 继续管理引用状态、持久事务和补偿。

普通贴纸保留笔记关联界面、业务核验与数据，改为调用公共交接并注册普通定位处理者。通用桥健康入口已归 Bridge。已纳管的数据仍遵守 Maintenance 所有权限制；基础服务支持可选插件缺席和晚挂载。

旧 Reference Adapter 包仅检查增强桥能力。Suite 加载 Core → Bridge → Sticker，旧 Adapter 只在开发组合中以 compatibility-test 身份验证，不进入新的运行安装或候选登记。提供方接口见 [[IF-lifecycle]]，原引用模块条目身份保留并指向 Bridge 内部实现。

首阶段源码提交：Bridge `3b16e92`，兼容 Adapter `e8b6285`，Sticker `bdc814c`。对应候选版本为 `0.4.0-rc2.1`、`0.3.5-rc2.1`、`0.7.4-rc2.1`，Core 使用 `0.3.12-rc2.19`。后续阶段会在此基础上继续修改，不将这些版本号视为发布或真实部署证据。

第一阶段 Suite 1e73bc6 已验收。后续 Vault 绑定、多 Vault 路由和 Maintenance 贡献接入已完成本地构建与合成联测；见 [[IMP-vault-binding-routing]] 与 [[VER-vault-binding-implementation]]。实例工作区双向同步选择为用户在施工中新增的 Maintenance 要求，详见 [[REQ-integration-complete]]。
