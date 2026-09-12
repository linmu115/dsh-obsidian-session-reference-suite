# Changelog

## 0.3.4-rc2.1 — 2026-09-12

固定 DSH 0.1.5-rc.2 的七个套件成员版本；组合验证接受逐文件校验过的本地发布包。生命周期配置需要真实 Launcher `dshInstanceId` 和 `profileId`，保留单组挂载和反向卸载。旧数据协议不变，新增实例字段为可选值。验证涵盖真实 Core + 引用适配器 + Obsidian HTTP，包括相同 profile 的两个独立实例。


## 0.3.3 - 2026-09-07

- Coordinate Core 0.3.9, Reference Adapter 0.3.3 and Obsidian Bridge 0.6.3.
- Retain captured references across unavailable Viewer navigation and report
  recovery actions without holding the plugin state queue.
- Confirm pending relationship deletions through the existing deletion protocol,
  including durable retry jobs from earlier installations.
- Validate the same identity on both sides before acknowledging a deletion.

## 0.3.2 - Unreleased

- Keep Bridge origin in the Lifecycle row and let downstream members inherit it.
- Add a seven-member compatibility specification, ordered local build/check
  tooling, source/lock/artifact provenance and read-only installed comparison.
- Cover actual Core/Adapter/Obsidian claim, cancellation and reconnection seams.
- Keep the Bundle a light ordered group. Runtime health and targeted retries
  remain in Lifecycle and are displayed by Sticker Board's Obsidian sidebar tab.
- Record this as a local development combination until its source commits and
  public dependency pins are published together.

## 0.3.1 - 2026-09-04

- Package the RC1 Core, Bridge lifecycle/protocol, reference adapter, and
  Sticker Board as the existing ordered Cordis group.
- Keep startup order, reverse teardown order, injection names, profile ID, and
  Bridge origin unchanged.
- Resolve every suite development package from a public full Git commit, so
  clean-checkout verification no longer depends on the private sibling
  worktree layout.
