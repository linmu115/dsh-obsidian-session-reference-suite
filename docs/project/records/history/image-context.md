---
{
  "id": "HIST-image-context",
  "kind": "history",
  "title": "历史图片阻断 Obsidian 引用的修复过程",
  "date": "2026-09-17",
  "status": "current",
  "modules": [
    "Annotation Core"
  ],
  "outcome": "修复已部署，Launcher 已就绪、Maintenance 新运行正常；用户真实会话发送仍待验收",
  "summary": "历史图片阻断 Obsidian 引用的修复过程；保留失败阶段、用户纠偏与实际验证边界。",
  "applicability": "DSH 0.1.5-rc.2；Core 0.3.12-rc2.13；GPT 0.5.0-dev.4；Maintenance Engine 0.1.33-rc2.32。",
  "coverage_note": "Codex 于 2026-09-17 整理；本任务公开来源 316–1281 行。扩展为完成阶段快照，保留此前截止 966 行的索引。仅保存定位与指纹，不复制原始载荷或隐藏推理。",
  "history": {
    "path": "history/image-context-20260917-complete",
    "sha256": "407f4170a19105a32312380245772b3a1d31efb91ec704a5c233e13a1340a306",
    "capture_sha256": "d90ea2caa02f3d2caa72a0a880129b17ee38c4a3d19cc4af6d5ccec7a02462d6"
  },
  "related_records": [
    "REQ-image-context",
    "IMP-image-context",
    "VER-image-context"
  ]
}
---

# 历史图片阻断 Obsidian 引用的修复过程

问题发生于引用提交前：Core 遍历当前历史与本次输入，发现图片后强制要求提供商返回图片额度。DSH 支持图片并不意味着每个适配器都实现图片计价，因此将“缺失计价接口”当成发送失败造成了兼容故障。

用户取消过滤图片，明确批准兼容预算并保留图片。

[查看依据：用户要求保留图片并核查机制](history-event:EVT-56e43a6fde1b330a4e10)

修复区分两种情况：接口缺失时每次图片出现预留 4096 token；接口存在但结果数量、数值或文本无效时仍拒绝并保留草稿。没有删除历史图片，也没有将图片二进制大小计为文字额度。此预留是中性估算，不是精确计费或严格上界。

Core 预算与提交相关 29 项通过。全套首次 239 项通过，2 项因版本断言固定在 rc2.12 而失败；同步到 rc2.13 后，涉及的 6 项定向测试全通过。实现 24b741b 已推送并安装为 0.3.12-rc2.13。

用户随后指出需要正式开发历程：此前已有需求、实现、验证记录，但 image-context-history.md 只是未绑定来源的草稿。这次绑定第 316–966 行公开来源，转成可导航的 history 记录。原始工具载荷和隐藏推理不复制进地图。

[查看依据：用户要求更新各自项目的开发历程](history-event:EVT-a739e5b89a4ac14609e5)

归属说明：本机没有独立的 Core 项目地图，Core 是 DSH–Obsidian 引用与贴纸组合地图的子模块；GPT 插件在独立地图维护。后续 Maintenance 启动故障的恢复由其所属地图记录。此时没有替用户发送真实引用草稿。


## 后续启动验证与纠偏

用户再次点击仍失败，证明旧运行恢复不等于新实例可启动。继续检查发现实例绑定指纹未更新；执行正式修复接入时，又发现发布目录内的适配检查 worker 仍是旧版，拒绝 GPT dev.4。同步构建 worker 后，正式 repair 检查通过，接入状态 connected、issues 为空，且没有重新安装其它插件。

重新触发 Launcher 后，2026-09-17 23:05:23 报告当前副本已就绪；Maintenance 新运行 running、旧运行 recovered。使用启动地址及正常 Cookie 流程读取页面返回 HTTP 200、HTML 有效。真实用户会话发送尚未代发。

[查看依据：已认证页面验证成功](history-event:EVT-cdc23970a73efde602c4)

后续部署必须同时检查引擎、独立适配 worker、宿主格式回执及实例绑定，再以 Launcher 就绪和新运行状态验收；仅重启引擎不足以证明升级完成。
