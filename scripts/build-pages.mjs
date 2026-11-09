// GitHub Pages artifact for one edition, published like the legacy Blueprint:
// a project site whose URL prefix is the repository name.
//
//   node scripts/build-pages.mjs figma       -> outputs/github-pages (served at /figma/)
//   node scripts/build-pages.mjs blueprint   -> outputs/github-pages (served at /blueprint/)
//   node scripts/build-pages.mjs figma-enhanced -> outputs/github-pages (served at /figma-enhanced/)
//   node scripts/build-pages.mjs blueprint4  -> outputs/github-pages (served at /blueprint4/)
//
// The argument is the repository's name. A further copy of the Blueprint edition (blueprint4, …)
// serves the same edition under its own name: its page links, and the client router's route
// with them, are moved from /blueprint/ to that name.
//
// Run after `npm run build`. The normal build keeps every route under /figma/ or
// /blueprint/, which is exactly the project-site prefix, so page links stay as they
// are. Only references that point at the site root (/_app, /media, /brand, /bp) are
// moved under the prefix. Source files of either edition are untouched. (Headings are live
// text since 2026-11-07, so there is no /typography folder any more.)
import fs from 'node:fs/promises';
import path from 'node:path';

const target = process.argv[2] || '';
const edition = /^blueprint\d*$/.test(target) ? 'blueprint' : target;
if (edition !== 'figma' && edition !== 'blueprint' && edition !== 'figma-enhanced') {
  console.error('Usage: node scripts/build-pages.mjs figma|figma-enhanced|blueprint|blueprint<n>');
  process.exit(1);
}

const dist = path.resolve('dist');
const out = path.resolve('outputs/github-pages');
// bp holds the Blueprint edition's own photographs and films; enhanced holds files only Figma Enhanced uses (the phone
// versions of its clips, docs/figma-enhanced-speed.md, stage 3).
const roots = ['_app', 'media', 'brand', ...(edition === 'blueprint' ? ['bp'] : []), ...(edition === 'figma-enhanced' ? ['enhanced'] : [])];

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });
await fs.cp(path.join(dist, edition), out, { recursive: true });
for (const root of roots) await fs.cp(path.join(dist, root), path.join(out, root), { recursive: true });

async function* files(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* files(full);
    else yield full;
  }
}

// The enhanced edition plays a few of the brand films cut for Blueprint (docs/figma-enhanced-step2.md, 2.3) and
// shows a few of its approved photographs (2.7): copy only the files its pages name, not the whole bp folder.
if (edition === 'figma-enhanced') {
  const used = new Set();
  for await (const file of files(out)) {
    if (file.endsWith('.html')) for (const [, name] of (await fs.readFile(file, 'utf8')).matchAll(/\/bp\/((?:video|img)\/[\w.-]+)/g)) used.add(name);
  }
  for (const name of used) {
    await fs.mkdir(path.dirname(path.join(out, 'bp', name)), { recursive: true });
    await fs.copyFile(path.join(dist, 'bp', name), path.join(out, 'bp', name));
  }
}

const prefix = `/${target}`;
// For a further copy: /blueprint/ wherever it opens a path, in markup and in the client's code.
const moved = target === edition ? text => text : text => text.replace(new RegExp(`(["'\`(,}=\\s])/${edition}(?=/)`, 'g'), `$1${prefix}`);
let html = 0;
let js = 0;
for await (const file of files(out)) {
  if (file.endsWith('.html')) {
    const source = await fs.readFile(file, 'utf8');
    const result = moved(source
      // SvelteKit's relative asset paths (../../_app/...) assume the site root.
      .replace(/(["'(])(?:\.\.\/)+(_app|brand|media|typography|bp|enhanced)\//g, `$1${prefix}/$2/`)
      // Static media and typography written as root paths by the page components, and font
      // preloads, which take their address from the bundler as a root path.
      .replace(/(["'(,])\/(media|typography|brand|bp|enhanced|_app)\//g, `$1${prefix}/$2/`)
      // srcset lists: every candidate after a comma and space.
      .replace(/(, )\/(media|bp)\//g, `$1${prefix}/$2/`));
    if (result !== source) {
      await fs.writeFile(file, result);
      html += 1;
    }
  } else if (file.endsWith('.js') && file.includes(`${path.sep}_app${path.sep}`)) {
    const source = await fs.readFile(file, 'utf8');
    // Client-rendered pages build the same root paths at runtime (`${base}/media/...`).
    const result = moved(source.replace(/(["'`}])\/(media|typography|brand|bp|enhanced)\//g, `$1${prefix}/$2/`));
    if (result !== source) {
      await fs.writeFile(file, result);
      js += 1;
    }
  }
}

// Every reference must now resolve inside the artifact.
const problems = [];
for await (const file of files(out)) {
  if (!file.endsWith('.html')) continue;
  const text = await fs.readFile(file, 'utf8');
  // Addresses in src, href, data-src (the stage's deferred pictures), poster and data-full (the film),
  // and every candidate of a srcset or data-srcset list.
  const refs = [...text.matchAll(/(?:src|href|poster|data-full)="([^"#?]+)/g)].map(match => match[1]);
  for (const [, list] of text.matchAll(/srcset="([^"]+)"/g)) refs.push(...list.split(',').map(candidate => candidate.trim().split(/\s+/)[0]));
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:)/.test(ref)) continue;
    const absolute = ref.startsWith('/') ? ref : path.posix.join(path.posix.dirname('/' + path.relative(out, file).split(path.sep).join('/')), ref);
    const normalized = ref.startsWith('/') ? absolute : prefix + absolute;
    if (!normalized.startsWith(prefix + '/')) {
      problems.push(`${path.relative(out, file)}: ${ref} leaves ${prefix}/`);
      continue;
    }
    let target = path.join(out, normalized.slice(prefix.length));
    if (normalized.endsWith('/')) target = path.join(target, 'index.html');
    try { await fs.access(target); } catch { problems.push(`${path.relative(out, file)}: missing ${ref}`); }
  }
}
if (problems.length) {
  console.error(problems.slice(0, 40).join('\n'));
  process.exit(1);
}

await fs.writeFile(path.join(out, '.nojekyll'), '');
console.log(`GitHub Pages artifact for ${prefix}/ (the ${edition} edition): outputs/github-pages (${html} pages and ${js} scripts re-rooted, all references resolve)`);
