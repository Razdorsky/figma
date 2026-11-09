// Every English string Figma Enhanced shows, for the Spanish dictionary and its coverage check
// (docs/figma-enhanced-spanish.md).
//   node scripts/enhanced-strings.mjs          -> fails if content/es.json misses a string or keeps a stale one
//   node scripts/enhanced-strings.mjs --list   -> prints the strings as JSON, in the order the pages show them
// Strings are the literals of tr(locale, '…') in pages and components, msg('…') in data, say('…') in the
// controller, and the page names.
import fs from 'node:fs/promises';
import path from 'node:path';

const strings = new Set();
const literal = /\b(?:tr\(\s*[\w.]+\s*,\s*|msg\(\s*|say\(\s*)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')\s*\)/g;
const read = quoted => quoted.startsWith('"') ? JSON.parse(quoted) : JSON.parse('"' + quoted.slice(1, -1).replace(/\\'/g, "'").replace(/"/g, '\\"') + '"');

async function* files(dir) {
  for (const entry of (await fs.readdir(dir, {withFileTypes: true})).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* files(full);
    else if (/\.(svelte|ts|js)$/.test(entry.name)) yield full;
  }
}
for (const page of JSON.parse(await fs.readFile('src/lib/enhanced/site-data.json', 'utf8'))) strings.add(page.name);
for (const dir of ['src/lib/enhanced/pages', 'src/lib/enhanced/components', 'src/lib/enhanced', 'src/routes/figma-enhanced']) {
  for await (const file of files(dir)) {
    if (dir === 'src/lib/enhanced' && /\/(pages|components)\//.test(file)) continue;
    const source = await fs.readFile(file, 'utf8');
    for (const [, quoted] of source.matchAll(literal)) { const text = read(quoted); if (text.trim()) strings.add(text); }
  }
}

if (process.argv.includes('--list')) { console.log(JSON.stringify([...strings], null, 1)); process.exit(0); }

const es = JSON.parse(await fs.readFile('src/lib/enhanced/content/es.json', 'utf8'));
const missing = [...strings].filter(text => !(text in es) || !es[text].trim());
const stale = Object.keys(es).filter(text => !strings.has(text));
if (missing.length || stale.length) {
  console.error(`Figma Enhanced Spanish: ${missing.length} of ${strings.size} strings untranslated, ${stale.length} stale`);
  for (const text of missing.slice(0, 10)) console.error(`  missing: ${text.slice(0, 100)}`);
  for (const text of stale.slice(0, 10)) console.error(`  stale: ${text.slice(0, 100)}`);
  process.exit(1);
}
console.log(`Figma Enhanced Spanish covers all ${strings.size} strings`);
