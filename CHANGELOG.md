# Changelog

## 0.3.1 - 2026-09-04

- Package the RC1 Core, Bridge lifecycle/protocol, reference adapter, and
  Sticker Board as the existing ordered Cordis group.
- Keep startup order, reverse teardown order, injection names, profile ID, and
  Bridge origin unchanged.
- Resolve every suite development package from a public full Git commit, so
  clean-checkout verification no longer depends on the private sibling
  worktree layout.
