---
id: IF-protocol-control
kind: interface
title: Protocol 控制合同：身份、租约与状态
status: current
summary: Lifecycle 与 Companion 用同一规则解释连接身份和控制请求。
sources:
- path: ../../../../rc2-adapt-20260912/dsh-obsidian-bridge-protocol/src/index.ts
  role: source-reviewed-2026-09-16
- path: ../../../../rc2-adapt-20260912/dsh-obsidian-bridge-protocol/README.md
  role: source-reviewed-2026-09-16
relations: []
---

# Protocol 控制合同：身份、租约与状态


调用者提供握手、预期 bootId、租期、允许的浏览器 origin 和可选 Viewer URL；校验器返回合法类型或解析错误。服务端实际建立租约、验证控制权与排空请求，Lifecycle 负责续租、观察和恢复。

例如 Bridge 重启后 bootId 变化，旧控制请求不能沿用旧启动身份。库声明 BOOT_MISMATCH 等错误结构，是否拒绝及如何恢复由各端执行。OFFLINE 是客户端观察状态，不是服务端在线状态的值。

完整字段、边界和版本常量只在提供方原文件维护，不在消费者重抄。当前 Lifecycle 3 仅允许完整本机 HTTP origin，Viewer 为本机根 URL，可携一个启动 token；修改这些约束影响连接双方。

## 已知接入与返回

- [[INT-lifecycle-protocol|Lifecycle]]：control-client 解析响应并建立、续订、释放租约；runtime 用状态辅助挂载。
- [[INT-companion-protocol|Companion]]：Bridge server 校验握手/租约/控制输入，持有实际租约与状态。

类型校验通过不证明令牌有效、服务在线或消息完成执行。数据操作另见 [[IF-protocol-data]]。

技术权威：[提供方源码](../../../../../../../../rc2-adapt-20260912/dsh-obsidian-bridge-protocol/src/index.ts)。返回 [[MOD-protocol|Protocol 目录]]。
