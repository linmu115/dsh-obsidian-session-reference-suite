# RC2 upstream reference cohort

Release 0.3.4-rc2.3 accepts Core 0.3.12-rc2.1, Lifecycle 0.3.3-rc2.3, Reference Adapter 0.3.4-rc2.3 and Sticker Board 0.7.3-rc2.3 in the explicit peer ranges, preserving the previously accepted RC2 versions. The packaged suite.members.json declares the new seven-member combination; Protocol and the Obsidian Bridge keep their existing versions.

Runtime feature behavior, persisted object ownership and the existing Annotation 2 / Lifecycle 3 / Sticker 1 wire protocols remain unchanged. This release supplies compatibility for Session Maintenance P1; independent session stickers and the Obsidian extension-data migration remain later work.

Validation performed in the isolated session-context-graph-20260913 worktrees:

- All 11 Suite tests passed, including the actual sibling Core, Reference Adapter and Obsidian HTTP integration.
- The cross-component browser-bundle check uses the newly rebuilt sibling packages.
- Development dependencies and the lockfile identify the four new local package archives. The standalone test workspace does not install the host-owned Better Sidebar or React peers; their final resolution is checked in the complete RC2 profile.
- Test fixtures are synthetic. No user profile, Vault or canonical Maintenance state was changed by these checks.

The paired installation report records the final RC2-copy strict peer and host-identity checks separately. These source checks do not constitute manual UI or live-model acceptance.
