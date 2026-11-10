# Vessyl Current — SvelteKit

Four independent editions of the Vessyl website:

- `/blueprint/` — the free edition: the same 18 pages rebuilt as one story with one design system, new layout, photography, film and motion, in English and Spanish (`/blueprint/es/…`). See [docs/blueprint-edition.md](docs/blueprint-edition.md).
- `/figma/` — a close match of the designer's supplied frames: 13 pages from the first file, property pages 14–18 from the designer's update of 2026-11-02, the eating and whole-property pages 19–24 from the update of 2026-11-04, Weddings and Arenal (25–26) from the update of 2026-11-05, and Getting here and Things to do around here (27–28) from the update of 2026-11-07. Its headings are set in EB Garamond by the owner's decision of 2026-11-07, instead of the frames' Telugu MN; text stays in the frames' Roboto. By the owner's request its text cannot be selected or copied, except in form fields. In English and, since 2026-11-10, Latin American Spanish (`/figma/es/…`): [docs/figma-spanish.md](docs/figma-spanish.md). Changed only on owner request.

- `/figma-enhanced/` — the Figma edition improved step by step: started on 2026-11-07 as an exact copy of `/figma/` (`src/lib/enhanced/`, `src/routes/figma-enhanced/`) and grows its own design system and features. Plan: [docs/figma-enhanced-plan.md](docs/figma-enhanced-plan.md); the design system from step 1: [docs/figma-enhanced-system.md](docs/figma-enhanced-system.md). In English and Latin American Spanish (`/figma-enhanced/es/…`, 2026-11-10): [docs/figma-enhanced-spanish.md](docs/figma-enhanced-spanish.md).
- `/figma-pr/` — the Figma edition for the PR team (owner, 2026-11-10): a copy of `/figma/` (`src/lib/pr/`, `src/routes/figma-pr/`) converted into the design system of the references the PR team chose (Rosewood Mayakoba, with Four Seasons Bangkok's motion and booking bar), with the designer's texts and the clips chosen for Figma Enhanced. See [docs/figma-pr-system.md](docs/figma-pr-system.md). In English and Latin American Spanish (`/figma-pr/es/…`, 2026-11-10): [docs/figma-spanish.md](docs/figma-spanish.md).

This project is separate from `vessyl-website-blueprint` and `vessyl-website`.

Published like the legacy Blueprint (https://razdorsky.github.io/vessyl-website-blueprint/):

- Figma edition: **https://razdorsky.github.io/figma/** — repository `Razdorsky/figma`
- Blueprint edition: **https://razdorsky.github.io/blueprint/** — repository `Razdorsky/blueprint`
- Figma Enhanced edition: **https://razdorsky.github.io/figma-enhanced/** — repository `Razdorsky/figma-enhanced`
- Figma PR edition: **https://razdorsky.github.io/figma-pr/** — repository `Razdorsky/figma-pr`

## Local preview

```sh
npm install
npm run build
npm run check
npm run preview
```

Open http://127.0.0.1:4180/. The preview also exposes the two independent entry URLs above. Node.js22.17+ is required. The project uses SvelteKit3, Svelte5 and adapter-static. Normal builds compile the checked-in native Svelte components and assets; no Figma account, React renderer or Python intake pipeline is required.

Dependencies are installed independently in this project. The old preliminary JSX renderer is no longer a production input. Use `npm ci` for the exact locked toolchain; `npm run dev` provides the SvelteKit development server.

## Source and scope

Editable source: Figma `The Vessyl`, file `TUJWRVApGPYhc7CXhdJFNF`, completed Website2.0 page814:6489. The13frames and45shared library children are independently archived outside Git in the Vessyl raw-source bank, with original text, screenshots, exported assets and provenance. Production assets here are web presentation derivatives; original tool responses and full-frame design screenshots are excluded.

The user requests correction of clear errors and preservation of placeholders. `[rate]`, `[x]`, `[inclusion]`, schedules and similar fields remain explicit source placeholders. These are local design prototypes, not approved published prices or live availability.

The Figma source frames contain English copy only; English is the source of every translation. The Blueprint edition adds Latin American Spanish, translated from its English copy (see docs/blueprint-edition.md). Figma Enhanced adds Latin American Spanish too, translated from the Figma English (see docs/figma-enhanced-spanish.md), and on 2026-11-10 the owner asked for the same Spanish on Figma and Figma PR (see docs/figma-spanish.md). Booking actions hand off to the existing partner website; no payment or booking is performed by this project. Newsletter and footer destinations without supplied integrations remain clearly identified preview placeholders and never claim a successful subscription or store an email address.

See docs/figma-adaptation.md and docs/blueprint-edition.md for the separate visual contracts.

## Implementation

The two editions share no source. They were separated on 2026-11-02; the separation is described in [docs/edition-separation.md](docs/edition-separation.md).

| | Figma edition (frozen) | Blueprint edition (free) |
|---|---|---|
| Route and layout | `src/routes/figma/` | `src/routes/blueprint/` (English and `/es/`) |
| Pages | `src/lib/pages/P01`–`P28` | data: `src/lib/blueprint/content/pages.ts`, Spanish in `content/es.json` |
| Building blocks and shell | `src/lib/components/` | `src/lib/blueprint/blocks/`, `src/lib/blueprint/components/` |
| Site data | `src/lib/site.ts`, `site-data.json`, `src/data/media.json` | `src/lib/blueprint/site.ts`, `site-data.json`, `data/photos.json` |
| Interactions and motion | `src/lib/interactions.js` | `src/lib/blueprint/motion.ts` (GSAP, Lenis) |
| Styles, fonts and media | `src/shared.css`, `src/figma.css` (EB Garamond and Roboto in `src/assets/fonts`), `src/assets/`, `public/media` | `src/lib/blueprint/styles/`, EB Garamond and Roboto packages, `public/bp/` |

Each edition's layout imports only its own CSS and JavaScript, so neither edition's stylesheet reaches the other. The root layout is edition-neutral. The chooser page (`src/routes/+page.svelte`, `src/lib/chooser.css`) links to each edition with a full page load. `src/hooks.server.ts` takes page lists and canvas colours from each edition's own site module. Media in `public/` is shared read-only: add new files rather than changing existing ones. `npm run check` includes `scripts/figma-freeze.mjs`, which fails on any change to a Figma-edition file.

SvelteKit manages client navigation, pre-rendered HTML and hydration. Each edition's layout connects transitions and delegated controls with lifecycle cleanup. The source metadata, actual media and all supplied placeholders are retained.

The original Figma JSX was used only during the preliminary intake. It is excluded from production source and dependencies. `scripts/convert-pages-to-svelte.mjs` was a one-time intake utility, not part of the normal build. It needs the word-art catalog that was removed on 2026-11-07 (see Git history).

See `docs/qa.md`, `docs/placeholders.md` and the two adaptation notes for verification and remaining source placeholders.

Full responsive and interaction audit: [docs/deep-audit-2026-11-02.md](docs/deep-audit-2026-11-02.md).

## Publication

User decision, 2026-11-02: publish exactly as the legacy Blueprint is published. The verbatim request is in the raw-source bank, `marketing-site/current-website/2026-11-02-publication/`.

- One local repository on `main` has two remotes: `figma` → `Razdorsky/figma` and `blueprint` → `Razdorsky/blueprint`. Both are public and receive the same commits.
- In each repository, GitHub Actions (`.github/workflows/pages.yml`) runs on every push to `main`. It installs the locked dependencies, builds both editions and runs `npm run check`. It then prepares the edition named after the repository and deploys it to GitHub Pages. Pull requests are validated but not deployed.
- `npm run build:pages -- figma|blueprint` writes `outputs/github-pages`. Routes are already `/figma/…` and `/blueprint/…`, which match the project-site prefixes. The script only moves root-level references (`/_app`, `/media`, `/brand`, and for Blueprint `/bp`) under the prefix, then verifies that every reference resolves inside the artifact. Source files are not changed.
- The script also accepts `blueprint<n>`, a further copy of the Blueprint edition under that repository's name. Such a copy (`/blueprint4/`) was retired on 2026-11-07.

To publish, push `main` to both remotes:

```sh
git push figma main
git push blueprint main
```

Both editions are versioned together; the original website repositories remain separate.
