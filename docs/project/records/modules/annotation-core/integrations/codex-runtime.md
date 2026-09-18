---
{
  "id": "INT-core-codex-runtime",
  "kind": "integration",
  "title": "Core 接入 Codex Runtime：预算、用量与工具",
  "status": "current",
  "summary": "明确三项直接消费能力，并链接独立的接收状态扩展口。",
  "module_id": "MOD-core",
  "relations": [
    {
      "relation": "consumes",
      "to": {
        "record_id": "IF-reference-budget",
        "project_id": "2d462ab6-8636-477a-9a26-0f3c8549f421"
      },
      "reason": "提交前初始引用预算"
    },
    {
      "relation": "consumes",
      "to": {
        "record_id": "IF-live-context",
        "project_id": "2d462ab6-8636-477a-9a26-0f3c8549f421"
      },
      "reason": "引用工具按真实 session 查询当前轮用量"
    },
    {
      "relation": "consumes",
      "to": {
        "record_id": "IF-managed-tools",
        "project_id": "2d462ab6-8636-477a-9a26-0f3c8549f421"
      },
      "reason": "固定上游读取和搜索工具的显式导出"
    }
  ],
  "sources": [
    {
      "path": "../../../dsh-annotation-core/src/host/submission-budget.ts",
      "role": "current-workspace-source"
    },
    {
      "path": "../../../dsh-annotation-core/src/host/reference-tools.ts",
      "role": "current-workspace-source"
    },
    {
      "path": "../../../dsh-annotation-core/src/host/upstream-tools.ts",
      "role": "current-workspace-source"
    }
  ]
}
---

# Core 接入 Codex Runtime：预算、用量与工具

Core 对 Codex 的接入按具体功能划分，不把整套引用功能都声明为 Runtime 的能力。

| Core 能力 | 实际调用 | 作用 |
|---|---|---|
| 提交前初始引用准备 | codexRuntime.prepareReferenceBudget | 只读核实本次完整输入容量；配置或输入变化保留草稿后重试 |
| 执行中的引用材料扩展 | dshRuntimeSupport.contextUsageFor | 仅用当前 session 的可信轮次采样；没有采样就不可猜测容量 |
| 固定上游读取与搜索 | managedTools.exportTool | 先注册真实 Core 工具，再显式导出，并在卸载时撤销 |

三个合同由独立 Codex Runtime 地图维护，下面的 consumes 关系登记提供方身份；在 DSH 系统地图的“接口与关联”可直接打开合同和本接入说明。预算准备不创建执行，实时用量也不能代替下一轮初始预算。

反向扩展是 Core 提供 [[IF-core-input-acceptance|输入接收状态注册口]]，Support 登记回执判断。接受输入、完成回答与交付最终消息不同，未知状态不能使待发送草稿被错误消费。

Maintenance 的原生上下文材料释放不自动适用于 Codex 受管上下文。Core 与 Runtime 已核实的这些调用，也不证明贴纸、DAG 或 Sidechat 的全部功能直接依赖 Runtime。

## 原始依据

- [submission-budget.ts](../../../../../../../dsh-annotation-core/src/host/submission-budget.ts)
- [reference-tools.ts](../../../../../../../dsh-annotation-core/src/host/reference-tools.ts)
- [upstream-tools.ts](../../../../../../../dsh-annotation-core/src/host/upstream-tools.ts)
