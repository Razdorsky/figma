# Figma Enhanced — work plan (2026-11-07)

The owner's decision, 2026-11-07:
- https://razdorsky.github.io/figma/ stays frozen. It changes only when the designer supplies something new.
- The improved Figma edition lives at its own address. The owner proposed `/figma-ehanced/`; the spelling is to be confirmed (see Step 0.1).
- Work order: first a basic design-system foundation, then the signature features.

Inputs:
- `docs/figma-design-audit.md`: the audit numbers, the "what to change / what to add" lists, the owner's 20 liked references and the rejections.
- Owner memory: liked elements and rejections.

Every step below is reviewed by the owner before the next one starts. Every step is committed on its own and published as soon as it is done, without asking; the owner is told which step can be seen on the live site (owner, 2026-11-08).

## Rules for every step

- **`/figma/` is not touched.** The freeze manifest (`scripts/figma-freeze.mjs`) must keep passing. The enhanced edition has its own pages, components and styles; it imports nothing from `src/lib/pages`, `src/lib/components`, `src/figma.css` or `src/lib/interactions.js`. The Blueprint edition is not touched either.
- **Designer updates** land in `/figma/` first, exactly as before. Then they are ported to the enhanced edition, adapted to its system.
- **Content stays the designer's:** the same 28 pages, texts, facts, placeholders and corrected typos. Headings use EB Garamond and text uses Roboto, with all text properties from the frames, as in `/figma/` today. Text selection and copying stay blocked.
- **The owner's rejections apply** (memory `site-design-rejections`):
  - no page or section counters ("01 / 18"); the designer's eyebrows and capitals stay (owner, 2026-11-08);
  - no text on a highly detailed part of a photograph; on a calm part text is fine, checked by eye for each photograph (owner, 2026-11-08);
  - a tone changes through a photograph or through a tinted pattern, as on the Legacy Blueprint, not at a flat edge and not through a gradient stripe (a photo melting into a matching footer is fine);
  - hero photographs and films are full-width cards without rounding (owner, 2026-11-08);
  - one photo shape per group;
  - no generated fake versions of real places;
  - every change must be seen while its picture fills the screen.
- **QA per step:**
  - layout at 69 widths (360–2560) in Chrome, WebKit and Firefox (WebKit and Firefox through a second server, because port 4190 is blocked);
  - axe at 1440, 768 and 375;
  - `prefers-reduced-motion` respected;
  - no console errors;
  - the text-property check against the frames;
  - `npm run check`;
  - `npm run build:pages` on a clean copy of the commit;
  - the owner reviews screenshots at their window width (about 2000 CSS px) and on a phone.

## Step 0 — The new address and a baseline

0.1 **Name confirmed: `figma-enhanced`** (owner, 2026-11-07). Decisions taken by default, for the owner to overrule: EB Garamond headings, Roboto text and the copy block carry over, and the edition is English only for now.

0.2 **Done 2026-11-07.** Added the edition to the repository as `src/routes/figma-enhanced/` and `src/lib/enhanced/`:
- It starts as an exact copy of the Figma edition: pages P01–P28, components, styles and interactions.
- `hooks.server.ts`, the chooser page, `build-pages.mjs`, `check.mjs` and the Pages workflow learn the third edition. The workflow already deploys the edition named after the repository.

0.3 **Create the GitHub repository `Razdorsky/<name>`** (public, like the others) and add a remote. This is an outward action: done only after the name is confirmed.

0.4 **First publish as a baseline.**
- The site must match `/figma/` at every width: compare screenshots of all 28 pages.
- From here on, every step is measured against this baseline.

## Step 1 — Design-system foundation

Goal: one system under all 28 pages, so that pages stop looking assembled from hand-sized templates. The audit's numbers are the before state.

**First pass 2026-11-08 (229dc26, ce2439b), published; the same day the owner found it worse than the frames in places and corrected the rules.** It removed the designer's eyebrows and capitals, inset and rounded the heroes, changed tones at flat edges, replaced the designer's panels and cards and moved the map labels off the map. The owner's corrections are in `docs/figma-enhanced-system.md` (Principle) and in the rules below.

**Second pass 2026-11-08, waiting for the owner's review (Checkpoint 1).**
- It starts again from the designer's markup and keeps the frames' components, eyebrows, capitals, proportions and full-width photographs.
- It adds the grid, the rhythm, a type scale with H1 above H2, fluid sizes, descriptive `alt` texts, control states and the closing photograph.
- Text on photographs was checked by eye. Twelve heroes put their text on frosted glass.
- The system is described in `docs/figma-enhanced-system.md`.

1.1 **Tokens**, written in `src/lib/enhanced/styles/tokens.css` and described in `docs/figma-enhanced-system.md`:
- **Grid:** 12 columns at 1440 with fixed outer margins; the same grid at 1024, 768 and 375.
- **Spacing:** a scale of section paddings (3–4 steps) and stack gaps.
- **Type styles:** about 10, in EB Garamond and Roboto. The display scale is tuned for EB Garamond, which reads smaller than Telugu MN. H1 is clearly larger than H2. The body sizes are 18/30 and 22/32.
- **Colour roles:** ink, muted, accent (copper), surface (beige), dark surface, on-dark. Contrast is checked for every pair.
- **Radii**, the owner's liked values from the Legacy Blueprint: photos 10px, controls 12px, panels 18px.
- **Shadows and motion:** durations and easings, plus the reduced-motion rule.

1.2 **Grid and spacing pass.** Every section template snaps to the grid and takes its padding from the scale. The per-instance heights go away.
- Before: 11 text left edges, and "Hero text only" in 23 heights.
- Target: text on grid columns only; section heights from content.

1.3 **Hierarchy pass.**
- H1 is larger than H2. Eyebrows stay only where they carry meaning, fewer than 3 a page (today about 9).
- Body styles are unified: no more 18/30 against 18/24 by accident.

1.4 **Components and states.**
- **Buttons:** primary, the Legacy translucent gradient button on photos, and a text link with arrow.
- **Cards** and **photo frames:** one shape per group, three aspect ratios.
- **States:** hover, focus, pressed, disabled; newsletter error and success.
- **Clean-up:** remove the "Button" placeholders, the empty "+" topics and the gallery dots without photos. Write alt texts that describe the pictures.

1.5 **Surfaces and rhythm.**
- Light, beige and dark bands meet at clean edges. Each page opens with one of a few hero types instead of one template.
- The footer melts into the closing photo (Legacy reference 13).

1.6 **Responsive specs.** Each template gets designed layouts at 375, 768 and 1024, instead of the fallbacks we improvised for `/figma/`.

**Checkpoint 1:**
- The owner reviews all 28 pages on desktop and mobile.
- The audit metrics are measured again.
- Publish on request.

## Step 2 — Signature features

One at a time, each reviewed before the next. References are numbered as in `docs/figma-design-audit.md`.

The owner likes these as techniques, not as the places where they first appeared (owner, 2026-11-08: the arch is not only for dinners and has no set colour; the drifting gallery fits any continuous run of pictures). Where each one is used is decided page by page, by what the composition needs, and shown to the owner. The only limits are the ones the owner set: the 3D Dome is a small scene, not a page; no captions inside the portals; the rail stands out, minimally; the photo change gets decisive transitions and no numbering; the next-page button sits inside the media; no generated night versions of real places.

**Placement map, 2026-11-08** (shown to the owner as a private page: https://claude.ai/artifact/1F5BVydf8DdNniiQ5XF7nG). For every technique it lists the pages and sections it goes to, why, and which photograph or footage it uses. Footage replaces a photograph only where it shows the same subject. The owner's answers, 2026-11-08: yes to the arch film on the text openings of P07 and P13. A place with one photo and arrows is not a gallery, even where the designer's layer is called a gallery slider, so those places are out of the drifting-gallery map. Portals are still open: the photos in the two-card pairs are wide, so an arch comes out low and crops them; the proposal is the tall 50/50 photos that look into the Dome (P09, P10, P11), with the door pairs (P03–P05, P19) as the alternative. Steps 2.1–2.3 are corrected to the map first; 2.4–2.10 follow it.

2.1 **Header** (published 2026-11-08; study and decisions in `docs/figma-enhanced-step2.md`) from `/blueprint/` 452c7d0 (reference 1): floating, takes the light of the section beneath, steps away while you scroll down, with a reading-progress line. The Legacy mega menu (reference 10), corrected to the placement map: every menu group that fits beside MENU (four at most), and the page photographs in the menu for all six.

2.2 **Smooth scrolling and page transitions** (built 2026-11-08, waiting for review; see `docs/figma-enhanced-step2.md`).
- Lenis inertia (452c7d0).
- View Transitions between pages, with the hero arriving smoothly (Legacy reference 11).

2.3 **Films** (published 2026-11-08, corrected to the placement map the same day; see `docs/figma-enhanced-step2.md`).
- Silent loops wherever footage shows the designer's subject, openings and sections; each loop from footage with sound plays its scene with sound on click (Legacy reference 12).
- The opening with a film in the Dome's arch that opens to full screen as you scroll (reference 2): Home, Experiences and The Vessyl Presents.
- The closing photograph and the footer's colour follow each page's world.

2.4 **The drifting gallery** (reference 3; published 2026-11-08, see `docs/figma-enhanced-step2.md`): a sticky title, with photo cards at two depths passing it, on every run of card photographs under a heading (six runs on five pages; Horses and the land after its photographs).

2.5 **The arch over a full-screen photo** (reference 5; published 2026-11-08, see `docs/figma-enhanced-step2.md`): a panel shaped like the Dome rises over a full-screen photograph and widens to the edges. Its colour is chosen for each place; it was dark on `/blueprint/`, but that is not the technique. Placed on all 21 openings with a photograph (the description rises) and on Home (the drifting gallery rises over the Dome).

2.6 **The next-page block** (reference 7; published 2026-11-09, see `docs/figma-enhanced-step2.md`), improved: the button to the next page is designed inside the opening media, on frosted glass, and a click grows the picture into the next page's opening. On 25 pages in the site's order; the three places to stay keep the designer's links to the other two.

2.7 **Rethought pieces** (published 2026-11-09, see `docs/figma-enhanced-step2.md`): the rail on Experiences, the change on the Harmonic Hearth and the Frequency Dome.
- The horizontal rail (reference 4) stands out from the blocks around it, minimally (owner, 2026-11-09: "it should stand out somehow, but minimally"; no piling on details).
- The text-and-photo change (reference 6) gets decisive transitions: an iris or wipe in the circle and line-by-line text, each change on its own beat. No numbering or counters of mine; the designer's numbers stay and visibly turn over at each step, and every picture has the same impact (owner, 2026-11-09).

2.8 **Photo portals and frosted glass** from the early prototype (references 15–16; published 2026-11-09 on the tall 50/50 photographs of P09, P10 and P11, see `docs/figma-enhanced-step2.md`): arched or rounded-bottom frames with an inner border and a slow zoom-in on arrival, and frosted panels over film or 3D. No captions inside the photos.

2.9 **The artistic layer** from the "atlas" prototype (references 17–20) — **cancelled by the owner, 2026-11-09** ("roll back all the Atlas effects we made, all of them; the Atlas step is skipped"); it was published that day in the owner's chosen engraving style A and then removed entirely, see `docs/figma-enhanced-step2.md`. Planned as:
- the engraving that develops into the film as you scroll;
- margin drawings of animals and plants that draw themselves (built, then removed on the owner's word, 2026-11-09);
- engraved plates that develop into photos, with a mobile mechanic (develop at screen centre or on tap);
- fireflies over real night footage.

  No generated night versions of real places.

2.10 **The 3D Dome scene** (reference 14) — **cancelled by the owner, 2026-11-09** ("we cancel the 3D scene with the Dome and skip this step"); it was built and published that day (aeae673) and reverted. Planned as: a small scene, not a page. The copper Dome against Arenal, a scroll-driven camera and rings at its base, telling one thing about the Dome. Build it with a fallback still for weak devices and reduced motion.

**Opening mark and moderate prewarming** (owner, 2026-11-09): the Vessyl mark from /blueprint/ on the first visit; WOFF2 fonts with preload, mega-menu thumbnails loaded on intent, a page's first picture warmed on link intent, the next page's warmed when idle; no film prefetch and no data-saver gating. Details in `docs/figma-enhanced-step2.md`.

**Speed on phones** (owner, 2026-11-09): clips first, then everything else, in four stages; every loading mechanic is described in `docs/figma-enhanced-speed.md`.

**Checkpoint 2:**
- The owner reviews each feature as it lands.
- Performance budget: Lighthouse on Home and one inner page on desktop and mobile. Films and 3D load lazily.

## Step 3 — Content and the rest of the site

- **Photography with the owner:** replace the 24 reused photos and the mismatched card photos. No reuse across pages.
- **Pages 29–37** (When to come, About, Josh Stanley, The people here, Press, Gallery, FAQ, Contact, Rates & policies), plus 404, Privacy and Terms, when texts exist.
- **Booking:** keep the external link (since 2026-11-09 the owner's booking engine, `reservations.orbebooking.com/Search/Init/PAS6c/en/` or `/es/`), or add a dates-and-guests bar — the owner decides.
- **Spanish** if wanted (Blueprint has an ES pipeline).

## Open questions for the owner before Step 0

1. The address: `figma-ehanced` or `figma-enhanced`?
2. Confirm that EB Garamond for headings, Roboto for text and the copy block carry over.
3. Languages: English only for now?
