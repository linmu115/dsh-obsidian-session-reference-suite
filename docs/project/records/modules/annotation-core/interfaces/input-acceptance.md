---
{
  "id": "IF-core-input-acceptance",
  "kind": "interface",
  "title": "Core 输入接收状态扩展接口",
  "status": "current",
  "summary": "执行器向 Core 登记接收判断；Core 仍拥有草稿与提交事务。",
  "interface_family": "input-acceptance-extension",
  "module_id": "MOD-core-submit",
  "relations": [
    {
      "relation": "references",
      "to": {
        "record_id": "INT-core",
        "project_id": "2d462ab6-8636-477a-9a26-0f3c8549f421"
      },
      "reason": "Runtime Support 对本注册口的接入说明"
    }
  ],
  "sources": [
    {
      "path": "../../../dsh-annotation-core/src/public/host-api.ts",
      "role": "current-workspace-source"
    }
  ]
}
---

# Core 输入接收状态扩展接口

这个扩展口让 Core 分清“引用还在准备中”和“模型已经接收本次输入”。例如 Codex 连接中断后，Core 不能仅凭前端没有看到回复就再次提交同一份引用。

提供方为 Annotation Core Host 的 `inputAcceptance.register(provider)`；扩展方提供 preview、read、activeInputIds、subscribe，按真实输入身份回报 accepted / not-accepted / waiting 等受限状态。完整类型只维护在所链接 public/host-api.ts。

当前已核实扩展方是 Codex Runtime Support 的 annotation.ts：以持久 execution 与原生 turnId 核对输入接受事实，等待或未知时保持保护。它不接管 Core 的草稿、引用正文与来源权限。

本模块的消费侧关系说明见 [[INT-core-codex-runtime|Core 与 Codex Runtime 接入]]，对端身份见下方跨项目关系；从 DSH 系统地图的“接口与关联”可打开对端接入说明。

## 原始依据

- [host-api.ts](../../../../../../../dsh-annotation-core/src/public/host-api.ts)
