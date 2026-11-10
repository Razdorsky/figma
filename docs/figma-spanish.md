# Figma and Figma PR in Spanish

The owner, 2026-11-10: "/figma и /figma-pr делай перевод ES". Both editions now exist in the approved Spanish:
Latin American Spanish (es-LA), as in Blueprint and Figma Enhanced. This is the owner's explicit word to change the
frozen Figma edition; its English pages keep their text and layout (see "What changed on the English pages").

## Where it lives

- Every page exists in English at `/figma/<page>/` and `/figma-pr/<page>/`, and in Spanish at `/figma/es/<page>/` and
  `/figma-pr/es/<page>/`; the home pages are `/figma/es/` and `/figma-pr/es/`. 56 pages in each edition.
- The Spanish pages say `<html lang="es">` from the first byte (`src/hooks.server.ts`, `scripts/write-route-index.mjs`);
  on client navigation each edition's layout sets the document language.
- Each page names its other-language version (`<link rel="alternate" hreflang="en|es">`), and its title and
  description are in its language.

## How the text is translated

The mechanism is the one of Figma Enhanced (`docs/figma-enhanced-spanish.md`), with each edition keeping its own files:

| | Figma | Figma PR |
|---|---|---|
| Dictionary, keyed by the English text | `src/lib/content/es.json` | `src/lib/pr/content/es.json` |
| `tr(locale, text)`, `msg()`, `other()` | `src/lib/i18n.ts` | `src/lib/pr/i18n.ts` |
| Routes and booking by language | `src/lib/site.ts` | `src/lib/pr/site.ts` |
| Controller words (`say()`) | `src/lib/interactions.js` | `src/lib/pr/interactions.js` |

- Every visible text of the 28 page components, and their `alt`, `aria-label`, `title` and `placeholder`, goes
  through `tr(locale, …)`; so do the header, menu, footer, newsletter and gallery. Internal links keep the reader's
  language (`{base}/{edition}/{lp}…`, `route(edition, slug, base, locale)`).
- The designer's line breaks (`<br data-frame-break>`, 37 in Figma, 21 in Figma PR) are placed for the English words.
  The English markup keeps them exactly; in Spanish the element shows the whole sentence and the line wraps to its
  column: `{#if locale === 'es'}{tr(locale, "…")}{:else}<the English markup>{/if}`.
- `node scripts/spanish-strings.mjs` (part of `npm run check`) lists every English string of each edition (845 in
  Figma, 858 in Figma PR on 2026-11-10) and fails when a dictionary misses one or keeps one that is no longer used.
  `--list figma` or `--list figma-pr` prints the strings.

## Translation

816 strings are the same English as in Figma Enhanced and take its approved Spanish as it is, so the three editions
read alike. The other 44 were translated from the English with the `translate-to-es-la` skill and reread in the second
pass against their English:

- descriptions of photographs written for this edition (the Enhanced ones were rewritten when its photographs were
  checked);
- the header words that Enhanced writes differently: "Rates & offers", "Overview ↗", "CHECK AVAILABILITY ↗";
- Figma PR's own words: the booking bar ("Check in" → "Entrada", "Check out" → "Salida", "Guests" → "Huéspedes",
  "2 Adults" → "2 adultos", the date message), "View gallery", the clip and carousel buttons;
- "Main navigation" ("Navegación principal"), which was also missing from Figma Enhanced's Spanish and is added there.

Names, the e-mail placeholder, "EN | ES", "VESSYL" and the copyright line stay as they are. The decisions follow the
Blueprint and Enhanced Spanish: `tú`, venue and programme names in English, "el Domo", "la tina de agua fría".

## The language switch and booking

- The designer's "EN | ES" in the header and the footer, and the globe with "EN" or "ES" in the menu, are links to the
  same page in the other language (`hreflang`, an `aria-label` that names the current language and the switch). They
  load the page afresh (`data-sveltekit-reload`). The current language is underlined; in Figma PR the utility row's
  2px rule moves from the whole link to the current language. The old notice "This preview is in English…" is gone.
- Booking opens Orbe in the reader's language: `/Search/Init/PAS6c/en/` or `/es/` from the header, the menu, the
  footer and the designer's booking buttons on pages 01–06. Figma PR's booking bar opens
  `/Search/SearchAvailability/PAS6c/es/<check-in>/<check-out>/<adults>/0/` on Spanish pages.

## Layout rules for the longer Spanish words

The frames measure some rows for English words. On Spanish pages only (`html[lang="es"]`), so the English pages stay
as they are:

- Figma (`src/figma.css`, end of file): fact labels such as "CAPACIDAD DEL HEARTH" wrap in their columns from 1366px
  instead of running into the next one; a pair of buttons wider than the 496px copy block puts the second button on
  the next row from 1200px ("Ver la programación" on the Dome page); between 681 and 760px the footer has three columns,
  as on tablets, because "EXPERIENCIAS" and "LA PROPIEDAD" do not fit five.
- Figma PR (`src/lib/pr/styles/sections.css`, end of file): a word of 12 letters or more in a fact heading breaks at a
  Spanish syllable ("Presenta-ciones" in a 220px column at 900px); shorter words and the other headings never break.

## What changed on the English pages

Compared before and after, with hydration comments and asset names set aside: the 28 English pages of each edition
are the same except the language switch (a link instead of a button, the current language underlined, the label
"Language: English. Switch to Spanish") and the two `hreflang` links in the head. Texts, layout and every other
element are unchanged. `node scripts/figma-freeze.mjs --update` was run after this check, and the guard now covers
`src/lib/i18n.ts` and `src/lib/content/` too.

## Checks (2026-11-10)

- `npm run check`: types, 204 routes, the frozen Figma edition, the Spanish coverage of Blueprint, Figma, Figma
  Enhanced and Figma PR.
- Built HTML: all 56 Spanish pages say `lang="es"`, no English string of a dictionary is left, the only links to
  English pages are the language switches, no booking link on a Spanish page goes to `/en/`.
- In Chrome: the Spanish home page hydrates in Spanish, a click to another page stays in Spanish, EN | ES goes to the
  English page and back, the booking buttons open Orbe's `/es/`, the booking bar of Figma PR fills Orbe's Spanish
  results address and answers a wrong date in Spanish, the gallery, clip and carousel buttons and the placeholder
  notice speak Spanish, no page errors and no failed requests.
- Accessibility: axe (WCAG 2.2 AA) on the 28 Spanish pages of each edition at 1440, 768 and 375: no violations.
- Layout: the 28 Spanish pages at 69 widths (360–2560) in Chromium, WebKit and Firefox, against the English pages.
  The first run found the four places described in "Layout rules for the longer Spanish words"; after them Figma's
  Spanish pages show no issue the English ones do not, and Figma PR's only one more: on phones the fixed reserve bar
  lies over a different line of text at the bottom of the screen, as it does on the English pages by design.
