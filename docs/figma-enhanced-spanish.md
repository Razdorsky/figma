# Figma Enhanced in Spanish

The owner, 2026-11-10: after the Figma PR edition, translate Figma Enhanced into the approved Spanish and publish it at
once. The approved Spanish is Latin American Spanish (es-LA), as in the Blueprint edition. Before the translation the
Figma texts were checked against the designer's file (2026-11-10): the layout had not changed and every text of the
frames is on the pages.

## Where it lives

- Every page exists in English at `/figma-enhanced/<page>/` and in Spanish at `/figma-enhanced/es/<page>/`, the home
  page at `/figma-enhanced/es/`. 56 pages in all.
- The Spanish pages say `<html lang="es">` from the first byte (`src/hooks.server.ts`, `scripts/write-route-index.mjs`);
  on client navigation the layout sets the document language (`src/routes/figma-enhanced/+layout.svelte`).
- Each page names its other-language version (`<link rel="alternate" hreflang="en|es">`), and its title and
  description are in its language.

## How the text is translated

English is the source. The Spanish is a dictionary keyed by the English text: `src/lib/enhanced/content/es.json`.

- `tr(locale, text)` (`src/lib/enhanced/i18n.ts`) returns the Spanish when the page is Spanish and the English
  otherwise. Every visible text of the 28 page components, and their `alt`, `aria-label`, `title` and `placeholder`,
  goes through it; the page components take a `locale` property.
- `msg('…')` marks English kept in data (menu groups in `navigation.ts`, next-page lines in `next.ts`, footer labels)
  so the coverage check finds it; it returns the text unchanged.
- `say('…')` in `interactions.js` gives the controller's words (pause and sound buttons, the gallery's labels, the
  placeholder notice) in the document's language.
- Internal links keep the reader's language: page links are written `{base}/{edition}/{lp}…`, where `lp` is `es/` on
  Spanish pages; components build theirs with `route(edition, slug, base, locale)`.
- `node scripts/spanish-strings.mjs` (part of `npm run check`; it checks Figma and Figma PR too, see
  `docs/figma-spanish.md`) lists every English string the edition shows (973 on 2026-11-10) and fails when the
  dictionary misses one or keeps one that is no longer used. A changed English text therefore shows up as untranslated
  instead of going stale. `--list figma-enhanced` prints the strings.

## The language switch

The designer's "EN | ES" in the header and the footer, and the globe with "EN" or "ES" in the menu, are links to the
same page in the other language (`hreflang`, an `aria-label` that names the current language and the switch). The
current language is underlined. The switch loads the page afresh (`data-sveltekit-reload`): some mechanics rebuild
their words (the text that changes with the photograph, step 2.7), and a fresh page never mixes the two languages.

## Booking

The booking buttons open Orbe in the reader's language: `bookingFor(locale)` in `src/lib/enhanced/site.ts` gives
`…/Search/Init/PAS6c/en/` or `…/Search/Init/PAS6c/es/` (owner, 2026-11-09). The designer's booking buttons on pages
01–06 write `…/PAS6c/{locale}/` (corrected 2026-11-10: on the first Spanish publication they still opened `/en/`).

## Translation

Translated from the English directly into es-LA with the `translate-to-es-la` skill, then the mandatory second pass:
every one of the 972 pairs reread against its English, and a typography and placeholder sweep. On 2026-11-10 the
navigation's label for screen readers ("Main navigation" → "Navegación principal") was added; it had stayed English.

Decisions, following the approved Blueprint Spanish (`src/lib/blueprint/content/es.json`, 253 identical strings
reused as they are):
- The reader is addressed as `tú`, as in Blueprint; a couple or a group (weddings, a private evening for two) as
  `ustedes`.
- Venue and programme names stay in English: The Frequency Dome, The Harmonic Hearth, The Frequency Experience,
  The Vessyl Presents, Arenal After Dark, El Rancho, Moloka. The generic names are translated: Las villas, La casa del
  árbol, Tiendas de glamping, El día y el medio día, Caballos y el río. "the Dome" is "el Domo", "the Hearth" is
  "el Hearth".
- Units are "alojamientos", the land "la finca", the pool "la piscina", the cold plunge "la tina de agua fría",
  headphones "audífonos", a film button "video". 118 acres stay in acres; feet, miles and pounds stay as written.
- The designer's placeholders keep their brackets with the words inside translated (`[oferta]`, `[precio]`,
  `[horas]`); `[x]` stays. The designer's "Button", "button" and the "— destination not supplied" labels are
  translated too ("Botón: destino no proporcionado").
- Capitals stay capitals where the designer wrote them; Spanish typography: `¿…?`, `« »`, the full stop after the
  closing quotation mark.

## Checks

- `npm run check`: types, the routes (148 then, 204 after Figma and Figma PR got Spanish), the frozen Figma
  edition, the Spanish coverage of every edition.
- No English string of the dictionary is left on a Spanish page (built HTML).
- In the browser: the Spanish home page hydrates in Spanish, a click to another page stays in Spanish, EN | ES goes to
  the English page and back, the booking button opens Orbe's `/es/`, the gallery and the placeholder notice speak
  Spanish, no page errors.
- Layout: the 28 Spanish pages at 69 widths (360–2560) in Chromium, WebKit and Firefox, as for the English pages.
- Accessibility: axe (WCAG 2.2 AA) on the 28 Spanish pages at 1440, 768 and 375: no violations.
