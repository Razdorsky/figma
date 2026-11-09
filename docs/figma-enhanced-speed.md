# Figma Enhanced — speed and loading

The owner's priority (2026-11-09): **a clip starts moving as soon as it is on the visitor's screen; everything else loads after it.** This document describes every loading mechanic of the edition and is kept current with the code. The opening mark, the font preloads, the mega-menu thumbnails and link-intent warming came first; they are described in `docs/figma-enhanced-step2.md` ("Opening mark and moderate prewarming").

Terms: a **clip** is a short silent looping video (`public/bp/video/loop-*.mp4`, 3–11 s; the code calls them films: `films.css`, `data-film`). A **film** is a full video with sound behind a "Watch the film" button (`film-*.mp4`, 54–140 s). A clip's **first frame** is the still that stands in its place until it moves (`loop-*.webp`, the video's `poster`).

## The plan, agreed with the owner on 2026-11-09

1. Stop loading photographs that a clip covers.
2. Clips first: the clip of the first screen at the highest priority; everything below the first screen waits until it moves; clips further down start loading about a screen and a half before they appear; the opening mark leaves once the first clip moves.
3. Phone versions for the clips that have none (16 of 35 in the folder; 15 of them play on this edition's pages, five of those open pages).
4. Photographs in sizes for the screen.

Dropped while planning, with the reason: "first the still, then the clip" (it put the clip second); re-encoding or cropping the existing phone versions (the conclusion came from Lighthouse's worst test profile, not from a real problem: 1.5 MB for a 3.4 s clip is normal); separate phone-sized first frames (a gain of 0.1–0.2 MB on a few pages).

## Before (live site, 0a1bbbc, 2026-11-09)

What a phone (390×844, 3×) downloads without scrolling:

| Page | Total | Largest items |
|---|---|---|
| Frequency Experience | 8.2 MB | desktop clip 5.7 MB (no phone version), photos 0.9 + 0.4 + 0.4 MB |
| Treehouse | 4.5 MB | clip 1.5 MB, photo under the clip 1.2 MB, photo further down 1.1 MB, first frame 0.3 MB |
| The Frequency Dome | 3.8 MB | desktop clip 1.9 MB (no phone version), photo under the clip 0.8 MB, photo 0.6 MB |
| Home | 3.4 MB | photos far down 1.0 + 0.4 MB, clip 0.9 MB, engraving plates for a section 8,000 px down 0.5 MB (the Atlas, removed since) |
| Villas | 1.3 MB | one 2400px photo 0.9 MB |

When the first clip starts moving on a phone (no opening mark), and the same with the competing photos blocked:

| Page, connection | Now | Without the hidden and lower photos |
|---|---|---|
| Treehouse, fast 4G (9 Mbit/s, 60 ms) | 1.15 s | 0.85 s |
| Frequency Experience, fast 4G | 1.45 s | 0.85 s |
| Frequency Experience, slow 4G (1.6 Mbit/s, 150 ms) | 8.0 s | 4.3 s |
| Treehouse, slow 4G | 5.4 s | 5.2 s |

Clips further down the page started loading only once 15% of them was on screen (`interactions.js`, `filmObserver`), so the visitor first saw the still.

## Stage 1. No hidden photographs under clips (2026-11-09)

**What was wrong.** In 23 figures the designer's photograph lay under a clip: the clip is positioned over the whole figure (`films.css`: `video[data-loop]` `position:absolute; inset:0; object-fit:cover`), so the photograph was never seen, yet it was downloaded — in the 14 openings eagerly and at high priority, beside the clip. 18.5 MB across the pages, 0.4–1.25 MB per photograph.

**The mechanic.** The figure's `<img>` now shows the clip's first frame: its `src` is the same file as the video's `poster`, so the browser downloads it once and both show the same picture. Such images carry `data-clip-frame`.
- The designer's description stays as the image's `alt` (the video itself is `aria-hidden`).
- `width`/`height` are the frame's real size; the figure's size comes from the stylesheet, not from the picture, so nothing on the page moves (checked: the position and size of every clip figure and the height of every page, 28 pages × 8 widths from 360 to 1920, identical before and after).
- `loading` and `fetchpriority` are unchanged: openings `eager` + `high`, figures further down `lazy`.
- The frame is what shows wherever the clip does not move: while it loads, where autoplay is blocked (iOS Low Power Mode), without JavaScript, under reduced motion. Before, the video's poster covered the photograph in all these cases too, so the visitor sees the same as before.
- The page-arrival transition (`+layout.svelte`, `photoReady`) waits for this frame instead of the hidden photograph.

**The 23 figures** (page — part — clip):
Home — section — poolview; The Treehouse — opening — treehouse; Glamping Tents — opening — tents; The Day and the Half Day — opening — rancho-pool; The Frequency Experience — opening — dome, section — inside; For Two — opening — evening; Horses and the River — opening — river, section — saddle; The Frequency Dome — opening — stars; The Harmonic Hearth — opening — hearth, section — plunge; Sound and movement — sections — yoga, tuning; Horses and the land — opening — pasture, sections — halter, swim; The recording studio — opening — studio, section — handpan; El Rancho — opening — rancho; Take the whole property — opening — estate; Retreats — opening — retreat; Arenal — opening — arenal.

The designer's photographs stay in `public/media/` and in the frozen /figma/ edition; the commit of this stage shows which photograph each figure held, should a clip ever be taken out.

## Stage 2. Clips first (2026-11-09)

**What was wrong.** The clip of the first screen shared the connection with everything else from the first moment: the pictures further down (a lazy picture still loads early, as soon as it lies within a screen or two of the view), the stills and data of the clips further down, and the next page's warming. It also loaded its data only after the page script had arrived and called it to play (`preload="metadata"`). The clips further down started loading only when 15% of them was on screen, so the visitor saw a still first.

**The mechanics, in the order they act.**

1. **The clip of the first screen loads at once.** The openings' clips are `preload="auto"` in the markup (14 opening figures; the arch films of Home, Experiences and The Vessyl Presents already were), so the browser asks for the clip while it reads the page, beside its first frame and the fonts.
2. **It starts before the page script arrives.** A small script in the head of every page (`src/lib/enhanced/clips-first.js`, inlined by `+layout.svelte`) starts a clip on screen the moment it can play (`canplay`). Once the page script has arrived (`window.vessylClips.app`), `syncVideo` in `interactions.js` decides as before: on screen, visible tab, no reduced motion.
3. **Everything below the first screen waits until that clip moves.** As the page is read, the same head script takes the address off every lazy picture (`data-held-src`) before the browser could ask for it, and gives them all back when the first clip on screen fires `playing`. A lazy picture is asked for only after layout, so this stops it in time; a video's `poster` is asked for the moment it is read, so the stills of clips further down are lazy pictures beneath the clip instead (`img[data-clip-frame]`, the stage 1 figures and the next-page block) and the clips have no `poster`. The pictures are given back at once when the first screen has no clip, under reduced motion (clips stand still), and in any case after 4s. While a picture is held its description is kept unseen (`img[data-held-src]{color:transparent}`, added by the same script), so its box looks like a lazy picture that has not arrived yet. The event `vessyl:first-clip` tells the page script.
4. **Clips further down load a screen and a half ahead.** They are `preload="none"` in the markup (sections and the next-page block). Once the first clip moves, an observer with a margin of 150% of the screen above and below (`setupClipsFirst`, `approach`) switches each to `preload="auto"` as it comes near, so it is ready when it comes into view and `syncVideo` starts it at once.
5. **The next page is warmed after that** (`warmNext`, from `docs/figma-enhanced-step2.md`), no longer as soon as the page has loaded.
6. **The opening mark** (first visit) leaves once the fonts are in, the first frame is decoded and the first clip moves (`firstClipMoving`), still between 2.1s and 3s.
7. **Navigation inside the site** puts the new page through the same: `setupClipsFirst` calls `window.vessylClips.page()`, which holds the new page's lazy pictures and waits for its first clip.

**Without JavaScript** none of this runs: the clips stand on their first frames and the lazy pictures load as the browser decides.

**Measured** (phone 390×844, the moment the first clip starts moving, two runs each, both builds served locally and compressed like GitHub Pages; fast 4G 9 Mbit/s 60 ms, slow 4G 1.6 Mbit/s 150 ms). "Before" is the published site after stage 1 and the removal of the Atlas (ab49416):

| Page | Before, fast | Stage 2, fast | Before, slow | Stage 2, slow |
|---|---|---|---|---|
| Home | 0.82 s | 0.68 s | 3.93 s | 2.92 s |
| The Day and the Half Day | 0.79 s | 0.68 s | 3.65 s | 2.97 s |
| The Treehouse | 1.29 s | 1.07 s | 6.49 s | 5.61 s |
| The Frequency Experience | 1.37 s | 1.01 s | 6.90 s | 5.85 s |

Checked as well: the pictures held at the start are all given back (none left without an address), on a first load and after a navigation inside the site; a clip further down is loaded (`readyState` 4) before it comes into view; with the clips' files blocked, the first frame stands beneath each clip in Chrome, WebKit and Firefox, so no clip box is ever empty; the position and size of every clip figure and the height of every page are unchanged (28 pages × 8 widths).

On slow connections the rest of what the clip waits for is the page itself (its scripts, styles and fonts) and its first frame; on The Frequency Experience the phone still loads the 5.7 MB desktop clip (stage 3).

## Stage 3. Phone versions for every clip (2026-11-09)

**What was wrong.** Phones (up to 767px wide) play a lighter version of a clip, `<source media="(max-width: 767px)" src="…-m.mp4">`, but 15 of the clips on this edition's pages had none, so a phone downloaded the version made for large screens: on The Frequency Experience the 5.7 MB Dome clip, ahead of everything else.

**The mechanic.** Each of the 15 now has a phone version made the way the existing ones are: 1280×720, 30 frames a second, H.264 High, x264 `-preset slow -crf 27` (the existing ones are CRF 26–31), no sound track, a key frame every 2s, `+faststart` so it can play before it has fully arrived. They are cut from the large-screen clips (1920×1080). The phone source stands first in each `<video>`; screens from 768px keep the large version.

| Clip | Page | Large | Phone |
|---|---|---|---|
| dome | The Frequency Experience (opening) | 5,677 KB | 3,370 KB |
| violin | The Frequency Dome | 2,219 KB | 788 KB |
| stars | The Frequency Dome (opening) | 1,873 KB | 769 KB |
| river | Horses and the River (opening) | 1,569 KB | 785 KB |
| saddle | Horses and the River | 1,520 KB | 1,042 KB |
| hearth | The Harmonic Hearth (opening) | 1,449 KB | 682 KB |
| studio | The recording studio (opening); Horses and the land, next page | 1,345 KB | 533 KB |
| handpan | The recording studio | 1,133 KB | 774 KB |
| poolview | Home | 1,004 KB | 677 KB |
| swim | Horses and the land | 833 KB | 555 KB |
| benches | The Harmonic Hearth | 398 KB | 268 KB |
| halter | Horses and the land | 361 KB | 251 KB |
| yoga | Sound and movement | 348 KB | 258 KB |
| plunge | The Harmonic Hearth | 289 KB | 165 KB |
| tuning | Sound and movement | 133 KB | 95 KB |

One clip had a phone version that its page never named: the inside of the Dome on The Frequency Experience (`loop-inside-m.mp4`, 563 KB instead of 1,169 KB); its phone source was added the same day.

**Where they live.** `public/enhanced/clips/`, a folder only this edition publishes: `scripts/build-pages.mjs` copies `enhanced/` into the Figma Enhanced artifact alone and re-roots its paths like the others. The shared `public/bp/video/` (Blueprint's films, also used here) is untouched. The next-page block takes each clip's phone path from `src/lib/enhanced/next.ts` (`loop()`): the fifteen in `enhancedPhone` from this folder, the rest from `/bp/video/`.

**Checked.** At 390px every one of the 15 plays its phone version (`currentSrc`), at 1440px the large one; frames compared side by side show the same picture. When the first clip starts moving on a phone (same method as stage 2):

| Page | Stage 2, fast | Stage 3, fast | Stage 2, slow | Stage 3, slow |
|---|---|---|---|---|
| The Frequency Experience | 1.01 s | 0.92 s | 5.85 s | 4.37 s |
| The Frequency Dome | 0.87 s | 0.82 s | 4.02 s | 3.70 s |
| The Harmonic Hearth | 0.88 s | 0.77 s | 4.10 s | 3.56 s |
| Horses and the River | 0.93 s | 0.82 s | 4.56 s | 3.76 s |
| The recording studio | 0.74 s | 0.68 s | 3.37 s | 3.03 s |

## Stage 4. Photographs in sizes for the screen (2026-11-09)

**What was wrong.** The designer's photographs are 1800–2400px wide and 0.4–1.25 MB each (WebP at quality 92), and every screen downloaded them whole, although a card on a large screen is drawn 300–600px wide and a photograph on a phone often fills only the screen's width.

**The files.** Each of the 86 photographs on this edition's pages has smaller copies 800, 1200 and 1600px wide (only those narrower than the photograph itself), made with ImageMagick: `magick webp:public/media/<hash>.webp -filter Lanczos -resize <w>x -quality 85 -define webp:method=6 public/enhanced/photos/<hash>-<w>.webp`. 232 files, 47 MB, in `public/enhanced/photos/` (published only with this edition, like the clips of stage 3). Side by side at the same size the copies cannot be told from the photograph. `src/lib/enhanced/photo-widths.json` lists, per photograph, its own width and the copies it has.

**The mechanic.** Every `<img>` of a photograph that has copies carries `srcset` (the copies and the photograph itself, by width) and `sizes` (how wide it is drawn), and the browser takes the smallest file that is sharp on that screen, its pixel density included. `src` stays the photograph itself.
- `sizes` was measured, not guessed: every photograph on every page drawn at ten screen widths from 360 to 2560, and where it covers its frame (`object-fit: cover`) by the width it is really drawn at, so a wide photograph in a tall frame on a phone counts as wider than the screen. Per occurrence: phones up to 599px, 600–767, 768–1023, 1024–1279, 1280–1919, and from 1920 either a share of the screen or the fixed width it stops growing at; the largest share within each band, rounded up. Photographs not drawn at load (some gallery pictures) take `100vw`.
- The next-page block computes its own `sizes` from the photograph's proportions (`next.ts`, `coverSizes`): its frame is 89% of the screen wide (at most 1680px) and 64svh tall below 900px, `min(78svh, 56vw)` above, and the photograph covers it.
- An opening photograph is preloaded with the same `imagesrcset` and `imagesizes` (`+layout.svelte`, `hero-photos.json`), the opening mark waits for that same size, and warming on link intent asks for that same size (`interactions.js`, `firstPicture`), so no photograph is fetched in two sizes.
- The gallery shows the photograph itself, not the size the card took (`fullPhoto`).
- A held lazy photograph (stage 2) has its `srcset` held with its `src`, or the browser would load it from the `srcset` alone.
- `scripts/build-pages.mjs` re-roots `/enhanced/` paths after a comma too, so every candidate of a `srcset` points into /figma-enhanced/.

**A new photograph** (step 3) needs its copies made with the command above, an entry in `photo-widths.json`, and `srcset`/`sizes` on its `<img>`: the same three candidates and the photograph, and `sizes` measured the same way.

**Checked.** On every page at 390px (2× and 3×), 768px (2×), 1440px (1× and 2×) and 1920px (1×), 798 photographs in all: every one took a file at least as wide as the screen needs, except the Blueprint picture of the Dome in blue on The Frequency Dome (its own older `srcset`, 1080px where 1332 would be exact on a 3× phone). The villas' opening photograph is fetched once (1600px at 1440, the photograph itself on a 3× phone). The gallery opens the photograph itself. Positions and sizes on all pages unchanged.

Photographs downloaded when a page is read top to bottom:

| Page | Before | Phone 390 @3× | Screen 1440 @1× | Screen 1440 @2× |
|---|---|---|---|---|
| Home | 9.2 MB | 3.3 MB | 2.4 MB | 4.3 MB |
| Where you sleep | 5.5 MB | 3.0 MB | 2.0 MB | 3.1 MB |
| The Villas | 4.7 MB | 2.7 MB | 1.7 MB | 3.5 MB |
| Arenal | 5.7 MB | 3.1 MB | 1.9 MB | 3.8 MB |
| Eating here | 7.3 MB | 2.4 MB | 1.7 MB | 3.6 MB |

An opening photograph that covers a tall phone screen still needs the photograph itself on a 3× phone, so the first screen of a photo-opening page weighs the same there as before.

## Result on the live site (2026-11-10, after stage 4, ded49b8)

What a phone (390×844, 3×) downloads without scrolling:

| Page | Before (0a1bbbc) | After |
|---|---|---|
| The Frequency Experience | 8.2 MB | 5.5 MB (the phone Dome clip is 3.4 MB of it) |
| The Treehouse | 4.5 MB | 2.8 MB |
| The Frequency Dome | 3.8 MB | 1.6 MB |
| Home | 3.4 MB | 1.4 MB |
| The Villas | 1.3 MB | 1.3 MB (its opening photograph covers a tall phone screen and needs the full file) |

Lighthouse 12, median of three runs (mobile is Lighthouse's simulated slow 4G). Lighthouse measures the still first frame, not the moment a clip starts moving; that is measured in the stage tables above.

| Page | Before: score / LCP / weight | After: score / LCP / weight |
|---|---|---|
| Home, desktop | 98 / 0.7 s / 7.5 MB | 98 / 0.6 s / 3.6 MB |
| Home, mobile | 91 / 3.1 s / 4.2 MB | 93 / 2.7 s / 1.7 MB |
| Treehouse, desktop | 90 / 1.8 s / 9.3 MB | 97 / 0.8 s / 5.3 MB |
| Treehouse, mobile | 72 / 10.5 s / 6.8 MB | 82 / 4.3 s / 2.6 MB |

Speed Index stays about 4 s on mobile and 1.6 s on desktop: the opening mark covers the first visit for 2.1–3 s by design.
