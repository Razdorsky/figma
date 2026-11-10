// Every English string the Figma, Figma Enhanced and Figma PR editions show, for their Spanish dictionaries and the
// coverage check (docs/figma-spanish.md, docs/figma-enhanced-spanish.md).
//   node scripts/spanish-strings.mjs                    -> fails if a dictionary misses a string or keeps a stale one
//   node scripts/spanish-strings.mjs --list <edition>   -> prints that edition's strings as JSON, in page order
// Strings are the literals of tr(locale, '…') in pages and components, msg('…') in data, say('…') in the
// controller, and the page names.
import fs from 'node:fs/promises';
import path from 'node:path';

// Each edition: its page list, the folders and files holding its words, and its dictionary.
const editions = {
  figma: {
    pages: 'src/lib/site-data.json',
    dirs: ['src/lib/pages', 'src/lib/components', 'src/routes/figma'],
    files: ['src/lib/i18n.ts', 'src/lib/interactions.js', 'src/lib/site.ts'],
    dictionary: 'src/lib/content/es.json'
  },
  'figma-enhanced': {
    pages: 'src/lib/enhanced/site-data.json',
    dirs: ['src/lib/enhanced', 'src/routes/figma-enhanced'],
    files: [],
    dictionary: 'src/lib/enhanced/content/es.json'
  },
  'figma-pr': {
    pages: 'src/lib/pr/site-data.json',
    dirs: ['src/lib/pr', 'src/routes/figma-pr'],
    files: [],
    dictionary: 'src/lib/pr/content/es.json'
  }
};

const literal = /\b(?:tr\(\s*[\w.]+\s*,\s*|msg\(\s*|say\(\s*)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')\s*\)/g;
const read = quoted => quoted.startsWith('"') ? JSON.parse(quoted) : JSON.parse('"' + quoted.slice(1, -1).replace(/\\'/g, "'").replace(/"/g, '\\"') + '"');

async function* walk(dir) {
  for (const entry of (await fs.readdir(dir, {withFileTypes: true})).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(svelte|ts|js)$/.test(entry.name)) yield full;
  }
}

async function strings(edition) {
  const {pages, dirs, files} = editions[edition];
  const found = new Set();
  for (const page of JSON.parse(await fs.readFile(pages, 'utf8'))) found.add(page.name);
  const sources = [];
  for (const dir of dirs) for await (const file of walk(dir)) sources.push(file);
  // Pages first, then components, then the rest, as the pages show them.
  const rank = file => (/\/pages\//.test(file) ? 0 : /\/components\//.test(file) ? 1 : 2);
  for (const file of [...new Set([...sources.sort((a, b) => rank(a) - rank(b)), ...files])]) {
    const source = await fs.readFile(file, 'utf8');
    for (const [, quoted] of source.matchAll(literal)) { const text = read(quoted); if (text.trim()) found.add(text); }
  }
  return found;
}

const list = process.argv.indexOf('--list');
if (list >= 0) {
  const edition = process.argv[list + 1];
  if (!editions[edition]) { console.error(`Unknown edition: ${edition}`); process.exit(1); }
  console.log(JSON.stringify([...await strings(edition)], null, 1));
  process.exit(0);
}

let failed = false;
for (const [edition, {dictionary}] of Object.entries(editions)) {
  const found = await strings(edition);
  const es = JSON.parse(await fs.readFile(dictionary, 'utf8'));
  const missing = [...found].filter(text => !(text in es) || !es[text].trim());
  const stale = Object.keys(es).filter(text => !found.has(text));
  if (missing.length || stale.length) {
    failed = true;
    console.error(`${edition} Spanish: ${missing.length} of ${found.size} strings untranslated, ${stale.length} stale`);
    for (const text of missing.slice(0, 10)) console.error(`  missing: ${text.slice(0, 100)}`);
    for (const text of stale.slice(0, 10)) console.error(`  stale: ${text.slice(0, 100)}`);
  } else console.log(`${edition} Spanish covers all ${found.size} strings`);
}
if (failed) process.exit(1);
