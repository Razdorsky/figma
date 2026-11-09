# Figma Enhanced — speed and loading

The owner's priority (2026-11-09): **a clip starts moving as soon as it is on the visitor's screen; everything else loads after it.** This document describes every loading mechanic of the edition and is kept current with the code. The opening mark, the font preloads, the mega-menu thumbnails and link-intent warming came first; they are described in `docs/figma-enhanced-step2.md` ("Opening mark and moderate prewarming").

Terms: a **clip** is a short silent looping video (`public/bp/video/loop-*.mp4`, 3–11 s; the code calls them films: `films.css`, `data-film`). A **film** is a full video with sound behind a "Watch the film" button (`film-*.mp4`, 54–140 s). A clip's **first frame** is the still that stands in its place until it moves (`loop-*.webp`, the video's `poster`).

## The plan, agreed with the owner on 2026-11-09

1. Stop loading photographs that a clip covers.
2. Clips first: the clip of the first screen at the highest priority; everything below the first screen waits until it moves; clips further down start loading about a screen and a half before they appear; the opening mark leaves once the first clip moves.
3. Phone versions for the clips that have none (16 of 35; first the five that open pages).
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
