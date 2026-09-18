const retired = new Set(['dsh-obsidian-session-reference-suite', 'dsh-obsidian-reference-adapter', 'dsh-obsidian-bridge-lifecycle']);
const runtime = ['dsh-annotation-core', 'dsh-obsidian-bridge', 'dsh-session-sticker-board'];

/** Pure migration plan. The installer owns backups, quiescence, package archives and atomic writes. */
export function migrateBridgeProfile(manifest, patch) {
  const next = structuredClone(manifest), rows = structuredClone(patch);
  if (!Array.isArray(rows) || !Array.isArray(next.dsh?.profile?.bundles)) throw new Error('Unsupported profile shape');
  const oldGroups = rows.filter(row => row.id === 'obsidian-session-reference-suite');
  if (oldGroups.length > 1) throw new Error('Duplicate legacy Suite override');
  if (oldGroups.length) {
    const group = oldGroups[0];
    if (!Array.isArray(group.config) || Object.keys(group).some(key => !['id', 'config'].includes(key))) throw new Error('Unsupported legacy Suite configuration');
    const recognized = new Set(['dsh-annotation-core', 'dsh-obsidian-bridge-lifecycle', 'dsh-obsidian-reference-adapter', 'dsh-session-sticker-board']);
    const names = group.config.map(row => row.name);
    if (new Set(names).size !== names.length || names.some(name => !recognized.has(name))) throw new Error('Unexpected or duplicate Suite child');
    const children = group.config.filter(row => row.name !== 'dsh-obsidian-reference-adapter').map(row => {
      if (row.name === 'dsh-obsidian-bridge-lifecycle') return { ...row, id: 'obsidian-bridge', name: 'dsh-obsidian-bridge' };
      return row;
    });
    const childIds = new Set(children.map(row => row.id));
    if (rows.some(row => row !== group && childIds.has(row.id))) throw new Error('Conflicting standalone override; resolve explicitly');
    rows.splice(rows.indexOf(group), 1, ...children);
  }
  if (rows.some(row => row.name && retired.has(row.name))) throw new Error('Unexpected retired root plugin');
  const existing = next.dsh.profile.bundles;
  const position = existing.findIndex(name => retired.has(name) || runtime.includes(name));
  const bundles = existing.filter(name => !retired.has(name) && !runtime.includes(name));
  bundles.splice(position < 0 ? bundles.length : Math.min(position, bundles.length), 0, ...runtime);
  next.dsh.profile.bundles = bundles;
  for (const name of retired) if (next.dependencies) delete next.dependencies[name];
  // The provider library may still be required by another installed plugin. Its
  // dependency pin is managed separately after the installer audits consumers.
  return { manifest: next, patch: rows, retiredPackages: [...retired] };
}
