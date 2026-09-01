# Obsidian Session Reference Suite

This is the single profile Bundle for the Obsidian reference system. Its `dsh.bundle.patch` inserts one visible `cordis:group` parent with four ordered children:

1. Annotation Core — durable context-reference state and transactions.
2. Bridge Lifecycle Controller — external Bridge identity, exact Launcher browser-origin and Viewer-target leases, drain, and hot attachment state.
3. Obsidian Reference Adapter — note captures, refresh, deletion, and backlinks.
4. Sticker Board — DSH-local durable sticker notes, UI, and reconnectable Obsidian backlink mirroring.

When the Bridge is offline, Core and Sticker Board's local notes remain mounted and writable. Bridge-dependent transports are attached only in READY/DEGRADED, pending note/backlink work is resumed after reconnect, and attachments are disposed in reverse registration order on drain or disconnect.
