# Figma Enhanced — step 2, signature features

Each feature is studied before it is built, then reviewed by the owner before the next one starts (`docs/figma-enhanced-plan.md`, step 2).

## 2.1 Header and mega menu (2026-11-08)

### What the references do

**`/blueprint/` header, commit 452c7d0** (owner's reference 1). Code: `src/lib/blueprint/components/Header.svelte`, `styles/base.css` 46–72, `motion.ts` 175–190.
- Layout: Menu with a two-line icon on the left, the logo in the middle, EN/ES and a copper "Check availability" pill on the right.
- The header is fixed and floats over the page with no background.
- It takes the colour of the section under it: light text over forest, petrol and night sections, ink over paper. The section is read at 36px from the top.
- After 40px of scrolling it gets a solid background (paper or night) with a hairline under it.
- Past 320px, while you scroll down, it slides up out of view (`translateY(-101%)`). Any scroll up brings it back. It never hides while the menu is open.
- A copper reading-progress line, 1px high, runs along its bottom edge and grows with the page.
- On phones the Menu label and the booking button are hidden.

**Legacy Blueprint "The Experience" mega menu** (owner's reference 10). Code in `vessyl-website-blueprint`: `app/components/SiteNavigation.tsx` 120–235, `app/globals.css` 2996–3045, `app/motion.css` 46–80, `app/blueprint-cinematic.css` 62–85.
- A trigger with a chevron sits in the header's navigation.
- It opens a full-width panel under the header: four photo cards (4:3, rounded) with a label under each, and "Overview ↗" in a narrow last column.
- The panel is frosted glass in the site's dark brown.
- It enters with a fade and a 10px drop (300 and 440ms) and leaves faster.
- Hovering a card enlarges its photo by 6% and underlines the label. Hovering "Overview" enlarges it.
- Keyboard and pointer:
  - Arrow Down or Tab on the trigger opens the panel and moves focus into it.
  - Escape closes it and returns focus to the trigger.
  - A click or focus outside closes it.
  - Shift+Tab from the first card goes back to the trigger.
  - Tab from "Overview" closes the panel and moves on.
- Phones get an accordion inside the menu dialog instead.

### What we take, what stays, what we leave

**Taken from `/blueprint/`:**
- the fixed header that takes the light of the section under it;
- the background after 40px;
- hiding while reading down and returning on the way up;
- the copper progress line.

**What stays the designer's:**
- the header's own layout and elements (MENU, centred logo, EN | ES, "Check availability");
- its two colourings: copper on light sections, light on photographs and dark sections.

**Taken from Legacy:**
- the mega menu: its panel, cards, motion and keyboard behaviour;
- two triggers, Where you sleep and Experiences, beside MENU on wide screens;
- each panel ends with "Overview ↗" to the overview page (02 or 07).

**Left out:**
- Legacy's glass pill around the navigation: the designer's header has no pill.
- The language popover: the designer's EN | ES stays.
- Mobile accordion: the designer's full menu already lists every page.

### Decisions

- **Which sections count as dark:** photo heroes, overlays, galleries, the map, the closing photograph and newsletter, the events newsletter, and the footer. Everything else is light. The section under the middle of the header decides.
- **Logo:** both versions, white and copper, are in the markup, so the logo changes colour without loading.
- **Background after 40px:**
  - On light sections: white at 92%, blurred, with the light rule under it.
  - On dark sections: the footer night colour at 86%, blurred.
- **The panels:**
  - **Where you sleep:** The Villas, The Treehouse, Glamping Tents, Rates and offers.
  - **Experiences:** The Day and the Half Day, The Frequency Experience, Arenal After Dark, For Two, Horses and the River, The Vessyl Presents.
  - Each card shows the page's own opening photograph, 4:3 with a 10px radius, on the frames' dark brown glass.
- **Width:** the triggers show from 1180px, where they fit beside MENU without reaching the centred logo. Below that the MENU dialog does the job.
- **Reduced motion:** the header does not slide and the panels appear without moving.

### Built (2026-11-08), waiting for the owner's review

- `src/lib/enhanced/components/Header.svelte`: the designer's header with two mega triggers beside MENU, two logos, two panels and the progress line.
- `src/lib/enhanced/styles/header.css`: the floating header, its two tones, the background after 40px, stepping away, the progress line, the panels.
- `src/lib/enhanced/interactions.js`:
  - `updateHeader` reads the section under the header on every scroll frame.
  - `openMega` and `closeMegas` handle the pointer and the keys described above.
  - Any open overlay closes on navigation.
- The cards show each page's opening photograph. Two pages are exceptions:
  - Glamping Tents shares the Villas' opener, so its card shows a tent.
  - Rates and offers opens on text, so its card shows its first photograph.
- Checked:
  - in Chrome, WebKit and Firefox: hides on the way down, returns on the way up, light and dark tones, panels open and close by click, Arrow Down, Escape and a click outside;
  - layout at 69 widths in three engines;
  - axe on 28 pages at three widths;
  - gallery, menu and newsletter tests.

## 2.2 Smooth scrolling and page transitions (2026-11-08)

### What the references do

**Lenis on `/blueprint/`, commit 452c7d0.** Code: `src/lib/blueprint/motion.ts` 25–33, `src/routes/blueprint/+layout.svelte` 49–58.
- Wheel scrolling is smoothed with `lerp: 0.09` and `wheelMultiplier: 0.9`. Touch stays native. The page keeps its inertia: text and photographs glide to a stop instead of stepping.
- It is not started when the visitor prefers reduced motion.
- Scrolling stops while the menu or the photo viewer is open, and starts again when they close.
- After every page change Lenis is resized and moved to the browser's position at once, so it never scrolls the new page back to where the old one was.

**Legacy Blueprint page transitions** (owner's reference 11, commit 437572a). Code in `vessyl-website-blueprint`: `app/page-transitions.css`, `public/page-transitions.js`, `app/motion.css` 1–40.
- The whole page dissolves: the old one fades out in 450ms, the new one fades in over 600ms (`cubic-bezier(0.4, 0, 0.2, 1)`).
- When the departing page's opening photograph is still on screen, the photographs travel together:
  - The old one stays fully visible while the new one dissolves over it in 800ms.
  - Inside the new frame the photograph settles from 110% to 100% scale over the same 800ms. This is "the hero arriving smoothly".
- The hero text leaves in 120ms. The new text arrives 240ms later, rising 7px and fading in over 400ms.
- The header, when visible, cross-fades in 750ms instead of blinking.
- Menus and dropdowns are hidden before the old page is captured.
- With reduced motion there is no transition.

### Decisions

- Lenis with the `/blueprint/` settings, wheel only:
  - It is skipped with reduced motion.
  - It stops while the menu dialog or the photo viewer is open.
  - It is synced after every navigation.
  - The mega panels and dialogs scroll on their own (`data-lenis-prevent`).
- The edition's existing View Transition gets the Legacy choreography:
  - The opening sections share a transition name when the departing one is visible.
  - The new photograph settles from 110% once its image is decoded. The wait is capped at 400ms, so a slow image never holds the page.
  - The header cross-fades when it is on screen.
  - Hero text arrives after the photograph.
- Text-hero pages take part too: their opening panel dissolves the same way, without the zoom.

### Built (2026-11-08), waiting for the owner's review

- **Lenis** (`interactions.js`):
  - Settings: `lerp 0.09`, `wheelMultiplier 0.9`, wheel only. Not started with reduced motion.
  - It stops while the menu or the photo viewer is open.
  - The menu, the viewer and the mega panels scroll on their own (`data-lenis-prevent`).
  - `lenis/dist/lenis.css` is imported by the layout.
- **Navigation** (`src/routes/figma-enhanced/+layout.svelte`):
  - A glide still running stops when any navigation starts, so Back right after a wheel does not carry the old page's glide over.
  - After the page changes, Lenis is resized and moved to the position SvelteKit chose. Back and Forward restore positions exactly.
- **Transition** (`+layout.svelte`, `styles/motion.css`):
  - The page dissolves (450 / 600ms).
  - When the departing opening is on screen, the openings share a name: the old one stays while the new one dissolves over 800ms.
  - The new photograph settles from 110% to 100% in 800ms. The new page waits for it to decode, at most 400ms.
  - The hero text leaves in 120ms, and the new text rises 7px and fades in over 400ms after 240ms.
  - The visible header cross-fades in 750ms.
  - Mega panels are never captured.
- **Checked:**
  - In Chrome, WebKit and Firefox:
    - one wheel step glides about 330px over half a second;
    - scrolling stops while the menu is open;
    - the transition timings above, measured from the running animations;
    - the new page opens at the top;
    - Back and Forward restore 0 and 809px.
  - With reduced motion there is no Lenis and no transition.
  - Layout at 69 widths in three engines, axe, and the gallery, menu and newsletter tests.

## 2.3 Films (2026-11-08)

### What the references do

**Legacy Blueprint films** (owner's reference 12). Code in `vessyl-website-blueprint`: `app/components/EditorialFilm.tsx`, `lib/films.ts`.
- Every film starts as a silent loop, playing only while at least 15% of it is on screen and the tab is visible. It pauses with reduced motion.
- A click anywhere on the film restarts it from the beginning, with sound, and stops the looping.
- After that, two small controls appear, pause/play and mute/unmute, and the film no longer resumes by itself.

**`/blueprint/` home opening, commit 452c7d0** (owner's reference 2). Code: `src/lib/blueprint/blocks/Hero.svelte`, `styles/blocks.css` 15–35, `motion.ts` 195–205; the clip is `public/bp/video/loop-pool.mp4`.
- Layout: a large EB Garamond title and actions on the left; on the right a looping film inside an arch the shape of the Dome. The arch starts under the header, and its top is a half circle.
- The block is 185svh tall and its stage is sticky. As you scroll, the arch's clip opens until the film fills the screen:
  - inset and radius go to zero;
  - the film slides so the subject that sat in the arch's middle ends centred;
  - it settles from 112% to 100%.
- The copy fades, rises and blurs away as the arch opens, so nothing is written over the open film. The header turns light past 55%.
- On screens narrower than 900px the arch does not open: the copy stands above a 76svh arch.

**The footage.** `public/bp/video` holds loops and films cut by `scripts/blueprint-media/*.sh`. They come only from the brand's approved footage:
- the VESSYL hero film;
- the property overview reel;
- the programming and events reels;
- for the villas, the rates and the main house, a slow "breathing" camera move over an approved photograph.

The scripts state that nothing about a place is invented.

### Decisions

- **Home opening:** the `/blueprint/` arch with `loop-pool`, as in the owner's reference.
  - It is a fragment of the brand film, so the "Watch the film" control plays that film, `film-vessyl.mp4` (61s, with sound), from the start. Legacy behaviour.
  - The designer's title and actions stay as they are and move to the left of the arch.
  - The night photograph of the Dome remains the page's closing photograph.
- **Silent loops in the openings.** Six are cut from the approved footage and show the same subject as the designer's photograph. Three are not footage: they are the designer's own photograph with a slow camera move ("animated photos"), because no footage shows that subject:
  - The Treehouse: `loop-treehouse`, the treehouse from the air.
  - Glamping Tents: `loop-tents`. The tents from the air, which also ends the reuse of the Villas photograph.
  - For Two: `loop-evening`, an animated photo of the same table for two at sunset.
  - Horses and the River: `loop-river`.
  - The Harmonic Hearth: `loop-hearth`, the same room.
  - Horses and the Land: `loop-pasture`, an animated photo of the horses on the track.
  - The Recording Studio: `loop-studio`, the console.
  - Take the Whole Property: `loop-house`, an animated photo of the property from the air, made from the drone still.
- **Openings that keep their photograph:** the footage shows a different subject or time of day (the Villas interior, the Dome by day, the day pool).
- **Placement map (2026-11-08):** the owner found these placements too narrow. `docs/figma-enhanced-plan.md` points to the map of where every liked technique goes on all 28 pages; the loops above are revised there (more openings and sections from real footage, sound on click, `loop-house` replaced with footage).
- **Loop behaviour:**
  - Loops have no sound, so they stay silent.
  - They play only while on screen and visible, and not with reduced motion; the poster stands in.
  - Phones get the 1280px cut where one exists.
- **Text on photographs:** checked again on the loops' frames, since the picture changed.

### Built (2026-11-08), waiting for the owner's review

- **Home** (`pages/P01.svelte`, `styles/films.css`, `interactions.js` `setupArch`/`updateArch`):
  - The designer's title and two buttons sit left of the arch with `loop-pool`.
  - From 900px the block is 185svh and its stage sticks. The arch opens with the scroll, following it with a short lag. The copy fades, rises and blurs away. The header turns light past 55%.
  - Below 900px, and with reduced motion, the copy stands above an arch that does not open.
  - The page's header starts copper (`photo: false` for page 01).
- **The film** (`playFilm`, `filmControls`):
  - "Watch the film" on frosted glass, inside the arch's corner, swaps the loop for `film-vessyl.mp4` and plays it from the start with sound.
  - Pause/play and sound on/off controls take its place, and focus moves to them.
  - After that the film plays only on the visitor's taps, and pauses when scrolled away.
- **Silent loops** in eight openings (`pages/P04, P05, P11, P12, P15, P17, P18, P22`):
  - Each covers the designer's photograph, which stays as the fallback. Phones get the 1280px cut where one exists.
  - They play only while 15% or more is on screen in a visible tab, and not with reduced motion.
  - The openings' alt texts now describe what the loops show (tents from the air, a rider in the river, steam over the Hearth's stones, the studio console).
- **Text on the loops**, checked by eye at 1440 and 375:
  - Glamping Tents moves to frosted glass (tents from the air).
  - For Two and The Harmonic Hearth keep their text on calm parts.
  - The other loop pages were already on glass.
- **Publishing:** `scripts/build-pages.mjs` copies into the enhanced artifact only the `bp/video` files its pages name: 26 files, 59 MB.
- **Checked:**
  - In Chrome, WebKit and Firefox: the arch opens and the header turns; the film plays with sound from the start; the loops play.
  - With reduced motion the arch stays closed and the loops show their posters.
  - Layout at 69 widths in three engines, axe, and the gallery, menu and newsletter tests.

## 2.1–2.3 corrected to the placement map (2026-11-08)

The owner found the techniques of 2.1–2.3 placed in single spots. The placement map (`docs/figma-enhanced-plan.md`) decides where each one goes; these are the corrections. Footage replaces a photograph only where it shows the same subject, checked frame by frame against the photograph.

- **Mega menu, all six groups of the designer's menu** (`navigation.ts`, `components/Header.svelte`, `components/Menu.svelte`):
  - The groups and the photograph for each page (its opening photograph, or the first one on a text page) live in `navigation.ts`.
  - Measured: beside MENU there is room for four groups at most, because that space stops growing at the header's edge. Where you sleep and Experiences show from 1180px, The Property from 1500px and Eating here from 1940px (`header.css`, `data-rank`). The Property has no overview page, so its panel has no Overview link. Cards are at most 260px wide.
  - The menu lists every group. From 1180px the photograph of the page under the pointer or focus shows beside the lists, crossfading once decoded (`previewMenu`); it starts on the current page.
- **The arch opening on Experiences and The Vessyl Presents** (owner, 2026-11-08: yes). The designer's eyebrow, heading and lede stay on the left. Experiences: the Dome with a forest on its ceiling, and "Watch the film" plays Amenities and Experiences (`film-programming.mp4`, 79 s). The Vessyl Presents: a violinist under blue light, and the film is the Events reel (`film-events.mp4`).
- **Loops** (`scripts/blueprint-media/loops-map.sh`; every range sits inside one shot, short shots slowed with motion interpolation):
  - New openings: The Day and the Half Day (El Rancho and the pool), The Frequency Experience (the Dome against the sky), The Frequency Dome (the Dome at night under the Milky Way), El Rancho (the table under its roof), Retreats (a group facing two teachers in the Dome), Arenal (the volcano above the rainforest).
  - Take the whole property: footage of the main house and pool from the drone replaces the animated photograph.
  - Sections: "Where you actually are" on Home, "Into the Dome", "A bond.", the cold plunge on the Hearth page, the yoga callout and the tuning fork on Sound and movement, the stable callout and the swim on Horses and the land, the handpan on the studio page.
  - Kept as photographs, because no footage shows their subject: the Villas, Arenal After Dark, Eating here, Moloka, Groups and offsites, Weddings, Things to do, and the path to the Dome on Home (a man walks through that shot, and a loop would double him). For Two and Horses and the land keep their animated photographs.
- **Sound** (Legacy reference 12, `playFilm`, `endScene`): every loop cut from footage with sound has a "Play with sound" button on frosted glass. It plays that scene of the source film from the start, 6–17 s with the sound fading in and out, then the silent loop returns; pause and sound controls take its place meanwhile. Take the whole property plays the whole Overview reel (`film-overview.mp4`, 140 s). One film sounds at a time. Loops cut from footage without sound (vessyl-web) stay silent and have no button. Callouts get a round button. Playback starts inside the tap, which iOS Safari requires for sound; a scene's start travels in the address as a media fragment (`#t=`), with a seek as the fallback. Films and scenes load by byte range, which GitHub Pages serves (the local preview server learned it too).
- **The founder on Home** (owner's choice, 2026-11-08: the third fragment, 11 s). "Hear Josh" on the callout's photograph plays the end of the Events reel with sound: the Dome and the hills under his voice, then Josh on camera. His last words run over the reel's closing logo, which the portrait frame would crop, so the photograph returns for them while the sound plays on (`data-photo-after`). `film-events.mp4` now runs to the reel's end instead of stopping mid-sentence at 55.8 s.
- **The closing photograph** (`components/Newsletter.svelte`, `styles/closing.css`): it belongs to the page's world and never repeats a photograph already on the page. Arenal After Dark and Eating here close on Moloka's candlelit table, Moloka on the long table under lanterns, Weddings on a candlelit table, the Frequency Dome on the musician by lamplight, Getting here on Arenal, the rest on the Dome at night (El Rancho and Things to do since step 2.6, so the closing never repeats the next-page block's subject). Each has a dark lower edge; the newsletter and the footer take that edge's colour (night, candle, amber).
- **Checked:** layout at 69 widths in Chrome, WebKit and Firefox (nothing beyond the 56 shell items); axe 0 on all 28 pages at 1440, 768 and 375; gallery, menu and newsletter tests; scenes play, pause and return to the loop in all three engines; reduced motion keeps the loops on their posters and the arches closed; every sound button is reachable at 1440 and 390.

## 2.4 The drifting gallery (2026-11-08)

### What the reference does

`/blueprint/` 452c7d0, the `land` block on Home (owner's reference 3): `blocks/Land.svelte`, `styles/blocks.css` 265–291, `motion.ts` 209–212 and 250–258.
- A short title and lede hold the middle of the screen (sticky, 100svh tall, centred, 34vw of padding on each side) while six 4:5 photographs, 24vw wide, pass along the edges, alternating left and right at 0/10/33/43/66/76% of a 212svh run.
- Each photograph moves from (depth − 1) to (1 − depth) × 35% of the screen's height as the run crosses the screen (GSAP ScrollTrigger, scrub); depths are 1.2, 1.2, 0.8, 0.8, 1.2, 1.2, so the first and last rows are nearer and never drift into the neighbouring blocks. Lenis gives the motion its inertia. The owner: "you feel the motion, the inertia, the text flies between the photo cards".
- Each photograph arrives once from a slightly smaller rounded mask (clip-path inset 7% → 0, scale 1.14 → 1, 1.7 s) when its top passes 92% of the screen.
- Below 900px the run is a static grid of two columns.

### Decisions

- **Where** (placement map): every heading with a run of card photographs under it. Home "You do not have to stay here to come here" with the six experience cards; Sound and movement "Private sessions"; Eating here "Breakfast, lunch and one dinner"; Take the whole property, both runs; Groups and offsites "Small groups, whole teams…". Horses and the land waits for photographs that match its cards (they show a massage and headphones). Places with a single photograph are not galleries (owner, 2026-11-08).
- **The designer's parts stay**: the eyebrow, heading and lede become the held title; the cards keep their square photograph, title and text. Only their placement and motion change.
- **Positions and depths as in the reference**: six cards at 0/22/72.6/94.6/145.2/167.2 svh of a 220svh run; three cards at 0/45/90 svh of 150svh, depths 1.2, 0.8, 1.2. Cards are min(24vw, 44svh) wide and sit on the page's edges; the title column is min(32vw, 30em), so text never runs under a card.
- **Phones and narrow screens** keep the designer's grid with the photographs' arrival. A shift inside one column would push the cards into each other, so below 900px they do not drift (the reference does not drift there either).

### Built (2026-11-08), waiting for the owner's review

- Markup: each heading and its card grids are wrapped in `<div class="drift" data-drift>`; cards carry `data-depth`, `data-side` and `--y` (`pages/P01, P16, P19, P22, P24`). The section rules of `styles/system.css` also reach sections inside a drift, and the header reads its tone from it.
- Styles: `styles/drift.css`. The arrival is armed by the script, so without it the photographs show plainly; reduced motion keeps cards still and unmasked.
- Behaviour: `setupDrift` and `updateDrift` in `interactions.js`, on the same scroll frame as the arch and the header.
- Checked: layout at 69 widths in Chrome, WebKit and Firefox (nothing beyond the shell items); axe 0; drift, held title, arrival and header tone identical in the three engines; phones, 899px and reduced motion.

## 2.5 The arch over a full-screen photograph (2026-11-08)

### What the reference does

`/blueprint/` 452c7d0, the `nightfall` block on Home (owner's reference 5): `blocks/Nightfall.svelte`, `styles/blocks.css` 315–328, `motion.ts` 220–223.
- A dusk photograph sticks to the screen (100svh) inside the block, and the next panel, 30svh over its lower edge, rises over it.
- The panel is clipped to the Dome's shape: `clip-path: inset(0 (1−g)·19vw 0 (1−g)·19vw round (1−g)·31vw (1−g)·31vw 0 0)`, with `--g` going from 0 to 1 as its top climbs from the bottom of the screen to 10% (GSAP ScrollTrigger, scrub 0.6). The ground changes at the arch's edge, never in a gradient. The owner: "the big photo starts to be covered by the next block, which floats up from below with a soft motion".
- The arch was dark there; the owner set no colour (2026-11-08): the technique is the panel rising in the Dome's shape.

### Decisions

- **Where** (placement map): every opening with a photograph, where the description rises over it (21 pages: 03–05, 08–12, 14, 15, 17–26, 28), and Home, where the drifting gallery rises over the photograph of the Dome ("The Dome is the reason this place exists"). The openings that took the Home arch keep it.
- **Colour**: the rising block's own surface (white for the descriptions and the gallery).
- **The designer's openings start whole.** The reference panel overlaps its photograph from the start; here that would cover the page's title on load. So `--g` follows how far the block covers the photograph: 0 while it only meets it, 1 once it covers 60%.
- **No line is ever cut.** The description's copy spans the page, so a narrow arch would clip it. The photograph's text dissolves under the rising arch (as on the Home opening), and the block's text appears only as the arch reaches the edges.
- **Phones** run the same arch; reduced motion keeps the blocks still and square.

### Built (2026-11-08)

- Markup: each photograph and its rising block are wrapped in `<div class="rise" data-rise>`; the block carries `data-rise-panel`. The photograph sticks inside the pair, so it lets go once the block has passed.
- Styles: `styles/rise.css`. The section rules, the header's tone, the page transition and the opening's film button also reach sections inside a pair.
- Behaviour: `setupRise` and `updateRise` in `interactions.js`, on the scroll frame, with the Home arch's lag.
- Checked: layout at 69 widths in Chrome, WebKit and Firefox (nothing beyond the shell items); axe 0 on all pages; the arch, the hold and the header identical in the three engines; page transitions, Back and Forward; galleries, menu and newsletter.

## 2.6 The next-page block (2026-11-09)

### What the reference does

`/blueprint/` 452c7d0, the `Next` block at the end of every page, before the newsletter (owner's reference 7): `components/Next.svelte`, `styles/blocks.css` 236–254, `motion.ts` 226–229.
- The next page's name, large, with a round copper arrow after the last word; one line about that page on the right; below, that page's own opening picture, large (`min(78svh, 56vw)`, 64svh on phones).
- The picture opens from the Dome's arch as it arrives: `clip-path: inset(0 (1−g)·16% 0 (1−g)·16% round …)`, with `--g` from 0 when its top meets the foot of the screen to 1 when its middle reaches 62% (scrub 0.6). The whole block is one link.
- The owner: "a very pleasant block… it appears in a very interesting way… very smoothly". What it lacked: the button to the next page belongs inside the photo or film, not as the arrow beside the title.

### Decisions

- **Where** (placement map): the 25 pages before the newsletter, each leading to the next in the site's order, the last one home. The three places to stay end on the designer's own links to the other two, so they have no block.
- **What it shows** (`src/lib/enhanced/next.ts`): the next page's name; one line in the designer's words from that page's opening (its H1, or the first sentence of its description where the H1 is still a placeholder); that page's opening film or photograph. A page that opens on text shows its first photograph. Getting here's first photograph (the golf cart) already ends the Arenal page's last row of cards, so its block shows the page's other photograph.
- **The button inside the picture**: frosted glass (prototype reference 16) in the designer's button type and radius, with the reference's round arrow, which fills with copper when the block is pointed at, focused or pressed. It stands on the threshold of the arch and arrives as the arch opens. It is named the way the designer names links to a page: "See the treehouse", "See Moloka", "Explore the Dome", "See what is on"; from the last page, "Back to the home page".
- **The arch's edge**: while the arch is narrow its edge is drawn in a hairline that fades as it opens, so the shape reads against a pale sky (the Dome loop is almost white at the top).
- **The click continues the movement** (as the reference meant it): when the block's picture is on screen and the navigation goes to its page, the picture grows into that page's opening picture (a shared view transition) and the opening's text arrives after it has settled. A page that opens on text receives the block as a dissolve. Reduced motion keeps the picture open and still and skips the transition.
- **The closing photograph never repeats the block's subject.** El Rancho's block shows Moloka's table and Things to do's block the pool under Arenal, so both now close on the Dome at night.

### Built (2026-11-09)

- Markup: `components/Next.svelte` before `Newsletter` on pages 01, 02 and 06–28; data in `next.ts`.
- Styles: `styles/next.css`; the transition in `styles/motion.css` (`vt-next`) and `+layout.svelte` (`throughDoor`).
- Behaviour: `setupNext` and `updateNext` in `interactions.js`, on the scroll frame, with the other arches' lag. The block's loop plays only on screen, like every loop.
- Also fixed: since step 2.5 the opening's page transition missed the 21 openings inside a rising pair (the selector asked for the opening as a direct child of the page). The transition names now reach them again.
- Checked: layout at 69 widths in Chrome, WebKit and Firefox; axe 0 on all pages; the arch, the loop and the transition in the three engines at 1440 and 390; keyboard (focus ring, the button visible, Enter); reduced motion; galleries, menu and newsletter.

## 2.7 The rail and the text-and-photo change (2026-11-09)

### What the references do

`/blueprint/` 452c7d0 (owner's references 4 and 6):
- **The rail** (`blocks/Doors.svelte` with `rail: true`, `styles/blocks.css` `.doors.rail*`, `motion.ts` 268–274): from 1024px the block pins and vertical scrolling walks a row of cards sideways (scrub 0.5); on phones it is a row you swipe. The owner: an interesting idea, but it looks like every other block.
- **The change** (`blocks/Projection.svelte`, `styles/blocks.css` 330–352, `motion.ts` 230–247): the block pins for about 60% of a screen per state; the paragraph on the left and the shot in a circle on the right change at each threshold, while the circle slowly comes closer. The owner: a great approach, but the change is hard to feel (the photo just dissolves, the text swaps without impact).

### The owner's answers (2026-11-09)

- The rail: "it should stand out somehow, but minimally"; no piling on details.
- The change: no numbering of mine, and no step counters ("these numberings of everything don't suit me"). Corrected the same day: the designer's own numbers stay, because they are his decision, and the number must visibly change at every step, with impact; every picture in the scroll must have exactly the same impact, zoom included.

### Decisions

- **The rail on Experiences**: the six experiences (the designer's two rows of three) on one band of the designer's own forest pattern, the panel The Vessyl Presents uses for its events. The tone changes through the painted pattern, and nothing else is added: no counter, no progress line. The designer's cards have no surface of their own, so on the band their words take the light ink of the pattern panels. From 1024px the band holds the screen while the page's scroll walks the cards sideways, with the arches' short lag; a card reached with the keyboard brings the page to where it is in view. Below 1024px the cards are a row you swipe; reduced motion keeps the designer's grid on the band. Home shows the same six as a drifting gallery, so the two pages do not repeat each other.
- **The change on the Harmonic Hearth** ("Heat first, then cold, then sound") and **the Frequency Dome** ("Three things, mostly"): the designer's heading and steps, with a circle beside them. The block holds the screen; each step owns an equal stretch of the scroll. At each threshold the new picture opens in the circle like an iris over the last and settles from a slight zoom, and the step's words rise line by line through a mask while the last ones leave; scrolling back runs it the other way. Each change is its own beat.
- **The designer's numbers** ("1. Heat", "2. Cold", "3. Session", and "4. Capacity" below as a fact) stay as he set them. At every change the number turns over first, in a mask of its own: the old one leaves upwards while the new one rises with a slight overshoot, like the click of a counter; then the word, then the text. The Dome's steps have no numbers in the frames, so none are added there.
- **The same impact for every picture**: before each change the incoming picture returns to its starting place (closed iris, zoomed in, words below the mask), so going back to the picture that was just underneath runs the same iris and zoom as going forwards (it used to appear at once). The first step enters the same way when the block reaches half the screen. Measured on both blocks for every change, forwards and back: the iris and the zoom follow the same curve (1% → 22% → 48% → 51%, 1.08 → 1.00).
- **Pictures in the circle**, none repeated on its page: the Hearth: flames among the hot stones (approved photo from the Blueprint bank), the cold plunge (the designer's photograph, which the loop of the next section otherwise covers), and a new silent loop of the Hearth's round room with its benches and speakers around the stones (Amenities and Experiences film, 0:55.85, one shot). The Dome: guests lying under a blue projection while a musician plays, a morning class with arms raised, and the violinist under a projected night sky (an unused loop).
- **Short screens and reduced motion**: when the held screen cannot show the whole of the longest step, or without motion, the steps are listed beside the first picture.

### Built (2026-11-09)

- Markup: `div[data-rail]` around one band (`data-rail-band`, `data-rail-track`) on P07; `div[data-change]` with `data-state` and `data-shot` on P14 and P15 (`scratchpad` script, as in earlier steps).
- Styles: `styles/rail.css`, `styles/change.css`. Behaviour: `setupRail`, `updateRail`, `railFocus`, `setupChange`, `updateChange`, `splitLines` in `interactions.js`; a loop in the circle plays only while its picture is the current one.
- Media: `loop-benches` cut by `scripts/blueprint-media/loops-map.sh`; `scripts/build-pages.mjs` now also copies the Blueprint photographs a page names.
- Checked: layout at 69 widths in Chrome, WebKit and Firefox; axe 0 on all pages; the rail and the three steps forwards and back in the three engines at 1440 and 390; the held screen fits from 375×667 to 2560×1440; keyboard through the rail; reduced motion; the iris, zoom and number curves of every change, forwards and back.

## Booking address (2026-11-09)

The owner's booking engine replaces the old link everywhere: `https://reservations.orbebooking.com/Search/Init/PAS6c/en/` and `/es/`, by language. Figma Enhanced is in English, so it uses `/en/` (`site.ts` and the designer's booking buttons on pages 01–06). Blueprint follows the page's language (`booking(locale)` in `src/lib/blueprint/site.ts`). The frozen `/figma/` changes too, on the owner's word (see `docs/figma-adaptation.md`), with `/en/`.

## 2.8 Photo portals and frosted glass (2026-11-09)

### What the reference does

The early prototype (owner's references 15 and 16; `~/Documents/Questionarie/Vessyl-Prototype`, commit 5dc5649):
- **Portals** (`app/globals.css` `.photo-portal` 1129–1215, `.reveal` 646–666): two geometric frames, one with an arch above, one rounded below. A thin light border, an inner border 0.7rem inside, a deep shadow and a gradient that darkens the far end. On arrival the frame rises 2rem as it appears and the photograph comes in from 130% to 100% over six seconds. The owner: the captions inside ("Landscape / 10.5321° N") are superfluous.
- **Frosted glass** (`.journey-path::after` 1030–1043): `linear-gradient(135deg, rgba(7,9,8,.56), rgba(7,9,8,.14) 78%)` with `backdrop-filter: blur(10px)`. The owner likes the fill, not the numbering and lines.

### Decisions

- **Where** (my proposal in the placement map; the owner said "2.8 приступай" without choosing another): the three tall 50/50 photographs that look into the Dome. Frequency Experience, "Into the Dome" (guests under the projection, with its loop and sound scene): the arch. Arenal After Dark, "Lit from inside" (the Dome at night): the arch, the Dome's own outline. For Two, "A private session in the Dome": the rounding below, the prototype's second shape. One portal a page, so each page keeps one shape.
- **Kept from the reference**: both shapes, the inner frame at 0.7rem, the deep soft shadow, the gradient on the far end, the rise of 2rem and the six-second zoom from 130%. **Changed**: no captions (the owner); the straight corners take the site's 10px; the prototype's darkening filter on the photograph is left out (on a light page it dulls the picture), only the gradient remains.
- **Phones**: the designer turns these photographs landscape (4:3) on phones, where an arch comes out low and wide (the owner's worry about wide photographs); a portal keeps an upright 4:5 frame.
- **Glass**: the fill was already on the text of twelve openings, every film button and the mega menu, and since 2.6 on the next-page button. New: the two loops in the change circles that come from footage with sound (the violinist on the Dome, Amenities overview 70.3–80.5; the Hearth's round room, programming 48.7–56.5 from its own shot) get the same frosted button, round at the foot of the circle; only the current picture's button can be pressed, and a scene playing with sound ends when its step leaves. Every loop from footage with sound now has its button; the loops without one come from silent cuts. The 3D scene's caption follows in 2.10.

### Built (2026-11-09)

- Markup: `data-portal="arch"` or `"bowl"` on the designer's media figure (P09, P10, P11); `data-film-box`, the scene and the buttons on the two circle shots (P14, P15).
- Styles: `styles/portal.css`. Behaviour: `setupPortals` in `interactions.js` (arrives once at a fifth on screen; the waiting state is set without motion, so nothing fades on load); `showChange` ends a scene whose picture leaves.
- Checked: layout at 69 widths in Chrome, WebKit and Firefox (nothing new); axe 0 on all pages; arrival, zoom, shape and proportion in the three engines at 1440 and 390, and still under reduced motion; the circle buttons play their scene with sound and stop when the step changes; galleries, menu and newsletter.

## 2.9 The artistic layer of the Atlas (2026-11-09)

### What the reference does

The "Atlas" prototype (owner's references 17–20; `VESSYL/local-source-backups/0-app-content-raw/marketing-site/brand-everything/2026-11-02/blueprint-preview/2026-11-03-scenes/prototype/index.html`):
- **The engraving develops into the film** (shader 142–247, timing 380–397): a plate drawn from the film's first frame; while the scene holds, a front with a noisy edge climbs from the foot with the scroll, and near the front the plate's lines linger over the picture. The film stands on the same frame; scrolling back brings the lines back. The owner singled this one out.
- **Engraved plates develop into photographs** (CSS 50–55, JS 362–366): from the point where the pointer enters (a radial mask). The owner: there is no hover on a phone, so it needs its own mechanism.
- **Drawings in the margins** (CSS 57–68): morpho, toucan, heliconia, monstera, drawing themselves with the scroll (`--draw`), multiplied onto the paper.
- **Fireflies** (`canvas.flies`, JS 368–372): few, slow, warm, over the forest at night.

### The trial and the owner's choice

One plate was drawn first, for the opening of Arenal, in two styles, each with a recording of its development. The owner chose **variant A** (2026-11-09): fine steel-engraving line in warm sepia on cream paper. It lies on the frame almost without double contours; B was denser and drifted in the clouds.

### Decisions

- **Every plate is drawn from the real frame or photograph it covers** (codex image generation from the source, composition kept so the plate lies on the picture), nothing added, no night invented. Plates for photographs shown cropped are drawn from the crop every screen shares, so they line up at every width.
- **The engraving develops into the film**: on Arenal's opening the screen holds while the plate develops (70svh more before the description rises over it); on Home, "Where you actually are", the pool and the volcano develop as the section crosses the screen. The canvas holds only two still images (the plate and the film's first frame), since the film waits on that frame; once the plate has gone the film plays, and scrolling back brings the lines back. Pressing "Play with sound" before that shows the film at once.
- **Plates develop into photographs**: the map on Where you sleep develops with the scroll, from the middle, and keeps the designer's labels (the engraving also leaves out the Google labels of the designer's satellite picture until it develops). The three cards on Arenal (Getting here, Things to do around here, When to come) open from the point where the pointer enters and close when it leaves; on a touch screen they open from the middle when the card reaches the middle of the screen, or on a tap; a keyboard focus opens them too. Things to do around here waits for its right photographs (step 3).
- **Drawings in the margins — removed on the owner's word the same day** ("the small images, the butterfly, the parrot, the plants, we remove with everything connected to them; the engravings stay"). They were: monstera (Where you sleep), kiskadee (Horses and the land, from that page's photograph), scarlet macaw (Arenal, from the overview film), morpho (Getting here), toucan and torch ginger (Things to do around here, the ginger from that page's photograph). Morpho, monstera and toucan are the Atlas's own drawings, in the same style. No Latin names: a wrong one would be worse than none. Each stands in the margin it is measured to have, centred, and stays away where the margin is under 72px; phones have no margins, so none there.
- **Fireflies** over the two real night pictures: the Dome under the Milky Way (Frequency Dome opening) and the Dome at night in the portal of Arenal After Dark, kept to the foliage.
- **Reduced motion**: no canvas, no plates and no fireflies; the drawings stand complete.

### Built (2026-11-09)

- Images: `public/media/atlas/` (plates, first frames, drawings), from `scratchpad` generation runs.
- Markup: `data-develop="hold|pass"` with `data-plate` and `data-life` on the opening figures (P26, P01); `data-plate-card` and an `img.plate-img` on the map (P02, "scroll") and the three cards (P26); `data-fireflies` (P14, P10). (The margin drawings and their code were removed the same day.)
- Styles: `styles/atlas.css`. Behaviour in `interactions.js`: `setupDevelop`, `drawDevelop`, `updateDevelop` (WebGL), `setupPlates`, `updatePlates`, `plateFrom`, `setupFireflies`, `drawFireflies`; the film under a developing plate waits on its first frame (`syncVideo`).
- Checked: layout at 69 widths in Chrome, WebKit and Firefox; axe 0 on all pages; the development, the cards, the drawings and the fireflies in the three engines at 1440 and 390 and under reduced motion; the drawings never touch text and never leave their section at eight widths from 900 to 2560.

## 2.10 The 3D Dome — cancelled (2026-11-09)

Built and published the same day (aeae673): a three.js scene in the slot of the shingles photograph beside "Geometry, not mysticism" on the Frequency Dome, the prototype's Dome and cladding in the site's copper, waves in the site's other colours, Arenal behind. The owner then cancelled it ("we cancel the 3D scene with the Dome and skip this step"). The commit was reverted: the scene, its cladding, styles and the `three` dependency are gone, and the designer's photograph stands in its slot again.

## Opening mark and moderate prewarming (2026-11-09)

The owner: one of the site's versions opens with the Vessyl logo appearing smoothly, and Figma Enhanced lacks both that screen and some prewarming, "not a full one, but at least a moderate one". The proposal was accepted with one correction: prewarming is never switched off for data saver or a slow connection ("this should not be done").

### Opening mark

- Taken from /blueprint/ 452c7d0 (`src/lib/blueprint/components/Intro.svelte`): the symbol builds from the bottom up as it is drawn, then the word appears out of a blur, then the whole screen lifts away. Here it is white, like the site's pages, with the mark in the designer's copper (`#a2551b`, `public/brand/logo-copper.svg`).
- It leaves when the page is ready: the fonts are in and the page's first picture is decoded. It never leaves before the mark has played and held a moment (2.1s from the start of the load) and never stays past 3s; if the page script comes late or not at all, the head script lifts it by itself at 3.6s. Scrolling waits for it.
- Once per visit (sessionStorage `vessyl:intro`, set as soon as it shows), and never under reduced motion.
- Built: `components/Intro.svelte`, `styles/intro.css`, the head script in `src/routes/figma-enhanced/+layout.svelte`, and the exit in `interactions.js` (`installInteractions`).

### Moderate prewarming

- **Fonts:** Roboto is now WOFF2 (`src/lib/enhanced/fonts/roboto-{400,500,600,700}.woff2`, from the same TTF files with fontTools: each ~124 KB → ~56 KB). EB Garamond and Roboto 400/500, the faces of the first screen, are preloaded.
- **The mega menu:** its panels are hidden with `visibility`, so their pictures loaded at once even though they stand in the viewport: about 19 covers at 2400px, ~22 MB on every first load. They now use 640px thumbnails (`public/media/thumbs/`, 27 files; the menu dialog uses them too) and load only when a panel is pointed at, focused or opened.
- **The page's own first picture** (the same list) is preloaded at high priority in the page head, so it is asked for before the stylesheets and scripts reveal it.
- **A page's first picture** loads at low priority when a link to it is pointed at, focused or touched (`warmPage`, the list in `src/lib/enhanced/heroes.json`: the poster of a page's opening film, or its opening photograph; text openings have none). SvelteKit also fetches the page's data on hover (`data-sveltekit-preload-data="hover"`).
- **The next page:** once the current page has loaded and the browser is idle, the first picture of the page behind the next-page block is fetched (`warmNext`).
- **No films are prefetched.** Nothing depends on data saver or the connection speed.
