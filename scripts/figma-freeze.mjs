// The Figma edition is finished and frozen. This guard fails `npm run check` when any file
// that the /figma/ output depends on changes. Blueprint lives in src/lib/blueprint and
// src/routes/blueprint and is not covered. Refresh the manifest only on an explicit owner
// decision to change the Figma edition: node scripts/figma-freeze.mjs --update
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const manifestPath = 'scripts/figma-freeze.json';
const sourceRoots = ['src/lib/pages', 'src/lib/components', 'src/lib/content', 'src/assets', 'src/routes/figma'];
const sourceFiles = ['src/lib/site.ts', 'src/lib/site-data.json', 'src/lib/i18n.ts', 'src/lib/interactions.js', 'src/data/media.json', 'src/shared.css', 'src/figma.css', 'src/app.html', 'src/hooks.server.ts', 'src/routes/+layout.svelte', 'src/routes/+layout.ts', 'vite.config.ts'];

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(full));
    else out.push(full);
  }
  return out;
}

async function tracked() {
  const files = new Set(sourceFiles);
  for (const root of sourceRoots) for (const file of await walk(root)) files.add(file);
  // Public assets referenced by Figma sources (media, typography, brand).
  const refs = new Set();
  for (const file of files) {
    if (!/\.(svelte|ts|js|css|json)$/.test(file)) continue;
    const text = await fs.readFile(file, 'utf8');
    for (const m of text.matchAll(/\/(media|typography|brand)\/[\w.-]+\.(?:webp|svg|png|jpg)/g)) refs.add('public' + m[0]);
  }
  for (const ref of refs) files.add(ref);
  return [...files].sort();
}

async function digest(file) {
  return crypto.createHash('sha256').update(await fs.readFile(file)).digest('hex');
}

const files = await tracked();
if (process.argv.includes('--update')) {
  const manifest = {};
  for (const file of files) manifest[file] = await digest(file);
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Figma freeze manifest updated: ${files.length} files`);
} else {
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  const problems = [];
  for (const file of new Set([...Object.keys(manifest), ...files])) {
    if (!(file in manifest)) { problems.push(`new file in a frozen Figma path: ${file}`); continue; }
    let hash;
    try { hash = await digest(file); } catch { problems.push(`missing: ${file}`); continue; }
    if (hash !== manifest[file]) problems.push(`changed: ${file}`);
  }
  if (problems.length) {
    console.error('The Figma edition is frozen. These changes would alter /figma/:\n  ' + problems.join('\n  '));
    process.exitCode = 1;
  } else console.log(`Figma edition unchanged: ${files.length} frozen files verified`);
}
