# Obsidian Session Reference Suite

This is the single profile Bundle for the Obsidian reference system. Its `dsh.bundle.patch` inserts one visible `cordis:group` parent with four ordered children:

1. Annotation Core — durable context-reference state and transactions.
2. Bridge Lifecycle Controller — external Bridge identity, leases, drain, and hot attachment state.
3. Obsidian Reference Adapter — note captures, refresh, deletion, and backlinks.
4. Sticker Board — sticker state and UI only.

When the Bridge is offline, Core and local plugin state remain mounted. Bridge-dependent transports are attached only in READY/DEGRADED and are disposed in reverse registration order on drain or disconnect.
