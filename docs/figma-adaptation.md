# Figma edition adaptation

The editable source is Figma file `TUJWRVApGPYhc7CXhdJFNF`, Website 2.0 page `814:6489`: the supplied Home and 12 supplied inner-page frames. Original responses, native screenshots and original media remain exclusively in the external Vessyl raw-source bank. The generated `src/pages/p01.tsx`–`p13.tsx` are local presentation inputs prepared by the owner, with optimized `/media/` references.

`scripts/adapt-figma.py RAW_HTML PAGE_INDEX OUTPUT_HTML` reads React SSR HTML using Python's standard `html.parser`. It reconstructs semantic HTML from the actual source nodes, copy and image references. It does not render a page screenshot as a website, install a Tailwind runtime, mutate Figma or read another website repository. The same resulting fragment serves both editions. All edition-specific appearance is in CSS; the fragment contains no inline style attributes.

## Structure contract

- Exactly one `<!--SITE_HEADER-->`, `<!--SITE_NEWSLETTER-->` and `<!--SITE_FOOTER-->` marker per source page. The owner supplies functional shared shells. Page 13 uses the separately supplied green events newsletter and its own source text.
- Direct semantic sections use `data-role`: `photo-hero`, `text-hero`, `split`, `cards`, `overlay`, `gallery`, `copy`, `quote`, `facts`, `amenities`, `comparison`, `map`, `introduction`, `logos`, `callout`, `events`.
- Original source `data-name` / `data-node-id` identifiers remain on sections, cards and identifiable text/control nodes.
- Inner hooks include `data-part="hero-image|hero-copy|copy|heading|eyebrow|paragraph|highlight|media|actions|action|card-grid|card|facts|fact|rate|table-scroll|map-key|artwork|callout-panel|event|gallery-open"`.
- `split` has `data-variant="description|editorial"`, `data-layout="image-first|copy-first"`. Description sections retain their prose column and beige rate/cannot-decide column. Callout panels preserve the source image first and source copy second.
- Cards use `article > figure[data-part=media] + div[data-part=copy]`. Source experience cards use their actual titles as internal links; room cards retain supplied explicit CTA text. Adjacent primary/link controls remain grouped as `data-part=actions`.
- One real H1 per page. Display headings use H1/H2/H3 and `.c-heading`; long source Telugu prose retains paragraph semantics with `.display-prose`. Source eyebrow labels remain Roboto paragraphs. The owner may use `.c-heading` for branded vector text rendering while preserving semantic text.
- Room amenities are real `dl/dt/dd` pairs (12 items). Room comparison is a real table with header associations and mobile cell labels. Four events remain four separate event rows and preserve their editable placeholders.
- Gallery sections have `data-gallery`, real `img[data-gallery-image]`, and an accessible `button[data-gallery-open]`. The supplied gallery frame contains only one actual photograph per page; the adapter does not invent further slides. The owner supplies modal, swipe, keyboard and edge-click behavior.

## Source content and corrections

All intentional source placeholders remain visible, including bracketed rates, schedules, capacities, policies, descriptions, contact details, offers and visible generic `Button` controls. Unknown actions remain focusable `button[data-pending-link]` with a clear accessible label. No fabricated booking, event checkout, contact URL, newsletter submission or successful subscription is produced.

The following unambiguous corrections are applied, without revising the original archived sources:

| Source | Presentation correction |
| --- | --- |
| `STAY WE US` | `STAY WITH US` |
| `the frecuency dome` | `the frequency dome` |
| `May to NOvember` | `May to November` |
| `From [rate] a nigh` | `From [rate] a night` |
| `for guest staying with us` | `for guests staying with us` |
| `the lights goes` | `the light goes` |
| `book tHE TREEHOUSE` | `Book the Treehouse` |
| Treehouse / Glamping / For Two / Horses pages: pasted `about the villas` | `About the Treehouse` / `About the tents` / `About the experience` / `About the ride` |
| Glamping: `book this villa`, `The Villas Gallery` | `Book a tent`, `Glamping Tents Gallery` |
| Day/Half Day card: pasted `Four nights or more, [offer]` | `[offer]`, preserving its unprovided value |
| Home Dome section: pasted room CTA `SEE WHERE YOU WILL SLEEP` | `Explore the Dome`, linked to the supplied Frequency Experience page |
| For Two: the Dusk sentence copied to Dinner and The Dome | Dinner: `Dinner is included.`; Dome: `A private session in the Dome, just the two of you.` Both facts are already supplied on that same page; Dusk retains the grammatical correction only |

Shared-shell obvious spelling corrections are coordinated with the owner: `best time to visiting us` → `Best time to visit us`, `Whatsap Contact` → `WhatsApp Contact`, `Adress Info` → `Address Info`. Visible generic `Button` placeholders are preserved according to the user's latest instruction, superseding the earlier artifact-removal proposal.

## Links

Internal links use the owner's `__EDITION_ROOT__` marker and exact supplied `src/data/pages.json` slugs. Availability and room-booking CTAs use `__BOOKING_URL__`. `BOOK AN EXPERIENCE` leads to the supplied Experiences index. Experience booking/session/ride/night/event controls without supplied partner destinations stay explicitly pending. No route is invented for About Josh, retreat/group inquiries, table reservations, or the as-yet-unprovided visit pages.

## Responsive adaptation

The source provides 1440px desktop frames, without mobile frames. `src/figma.css` preserves their white pages, source copper labels, green actions, beige rate cards, photograph/copy section order, dark photographic panels, room-card proportions and serif hierarchy. All rules are scoped to `body[data-edition="figma"]`.

The responsive interpretation targets 360px and larger: one-column layouts below 760px; equal 16px text/photo alignment; content-driven heights; no fixed page-frame widths; wrapping actions; two-column compact facts/amenities; stacked labeled comparison rows; legible map keys below the entire aerial photo. On small screens an overlay's prose moves below its image so source copy is readable without hiding the photograph or clipping long placeholders. Desktop map labels retain their relative positions on the supplied aerial image. Reduced motion disables the local control transition; the owner governs all shared movement behavior.

## Verification scope

Adapter checks were run against rendered SSR for all 13 source pages: exactly one H1, one set of shared-shell markers, no empty controls, no inline edition styles, and identical occurrence counts for every bracketed source token after excluding the replaced shell nodes. The owner separately verifies shell copy/placeholders, media assets, routes, runtime interactions, typography rendering and responsive behavior in a browser for both editions. Source photographs repeated in Figma are retained; source statements of operational availability remain design copy rather than verified business facts.

## Final SvelteKit integration

The source fragments were converted into native `src/lib/pages/P01.svelte`–`P13.svelte`, with no runtime HTML injection. Shared shell components and client navigation use SvelteKit. Word-art spaces are explicit Svelte text expressions to preserve typography. Owner QA corrected inherited quote paragraph overrides, reserved card image ratios before lazy loading and kept the Presents newsletter at its source position. Blueprint desktop card groups use three columns, or two for a supplied two-card group. Native page content and placeholders are unchanged.

## Frame-fidelity pass — 2026-11-02

The `/figma/` edition was re-checked against the 13 Website 2.0 frames at 1440px, section by section. Specifications came from the archived `get_design_context` responses for the 13 frames and the shared library in the raw-source bank. Comparisons used native 1:1 frame renders beside full-page renders of the build, plus a per-section height match keyed to the frames' instance order.

- **Shell (Figma edition only).** 96px menu with 166px logo, 13px MENU, an `EN | ES` label and a 166px CHECK AVAILABILITY. Text-only pages use the frames' copper variant (`/brand/logo-copper.svg`, copper language label, copper CTA). Desktop has no extra photo-header gradient. The newsletter is 300px with the 1440px pattern at native scale. The footer is 657px: a 120px bar, right-aligned 160/210px columns and a 100px legal bar.
- **Sections.** Desktop geometry now follows the frames for every role:
  - home opening at 860px with the joined 60px double button;
  - Symbol + Text, with the right half of the symbol on the left edge;
  - 40/60, 60/40 and 50/50 splits;
  - overlay panels (598 × 690);
  - experience tiles at 400px square;
  - room and half cards at 540px;
  - description rows, amenities, comparison, map pills, facts rows, events table, heading titles (36/46, or 28/38 on Presents), quote and callouts.
  
  Headings use the frames' colours. Link arrows are the frames' chevrons. Text-only openings reserve the in-flow 96px menu.
- **Photo framing.** Image fills reuse the frames' crop rectangles wherever the delivered asset has the same aspect ratio as the frame's source (26 placements, desktop only). Inner openings use the frames' vertical focus.
- **Markup, Figma branch only.** The changes are:
  - explicit line breaks the frames use, in three headings, two paragraphs and the experience and half-card captions;
  - the Day page's "The half day / The full day" terms as display lines;
  - chevron gallery controls, plus decorative dots on the two gallery sliders.

  The first chevron is the accessible "Open … gallery" control. The second is a mouse-only duplicate with `tabindex="-1"` and `aria-hidden="true"`. Blueprint markup is unchanged.

Result at 1440px: every section height is within ±3px of its frame. The only exceptions are those listed below and the frame-clipped footers. Page heights match the frames' section stacks.

### Deliberate differences from the frames

| Frame | Implementation | Reason |
| --- | --- | --- |
| Home combo placeholders `BUTTON` are drawn in #f5ebe7 on white (invisible) | Library master colour #733a11 | Keeps the supplied placeholder visible and readable |
| Experiences opening label in #d3a079 on white | #a2551b, as on the other paper openings | Text contrast |
| Card Grid frames are fixed at 508/510px while their copy overflows | Natural height (+3px) | Copy is never clipped or overlapped |
| OFFER ribbon label is 17.5px SemiBold, white on #d57e3d | 18.7px Bold on the same colours | 3.05:1 contrast passes only as WCAG large text |
| Slider/gallery chevrons and six dots | Chevrons open the full-screen gallery; dots are decorative | Each source supplies one photograph |
| Some photos differ in aspect from the frame source (Villas/Treehouse/Day sliders, Frequency and For Two 50/50, glamping card) | Cover framing | The frame's crop rectangle cannot be transferred exactly |
| Text corrections and `Explore the Dome` | Retained from the change register above | Clear-error policy |

Mobile and tablet have no frames. Their responsive interpretation is retained, with the new controls repositioned over the photograph below 761px.

### Mobile and tablet review — 2026-11-02

All 13 pages were reviewed at 375px page by page, with spot checks at 360, 414, 768 and 1024px. The review led to these fixes:

- Frame line breaks are marked `br[data-frame-break]` and hidden at 1100px and below. The preceding space keeps words apart, so headings and captions wrap naturally instead of leaving one-word lines.
- The Home hero buttons keep the joined frame style at every width. They stack centred below 761px.
- Text-only openings reserve room below the in-flow header, at 156px from the top on tablet and 128px on mobile. Before this the label sat inside the header area.
- Facts and amenities use the 16px mobile gutter. The earlier `:where()` rule lost to the 1100px `:is()` rule and left 40px. Fact labels drop to 12px with 2px tracking, so "TRANSPORTATION" and "CANCELLATION" no longer break mid-word. "3 col info" stacks into one column.
- Heading titles are 28/36px on mobile (Presents 24/32). The Rates callout copy is 19/29px.
- The Frequency callout keeps the frame's crop at every width, so the wordmark fragment no longer shows.
- Tablet footer uses three columns with 40px gutters. Tablet newsletter stacks with a full-width field.

Checks: 13 pages × 13 widths (360–1920) show no document overflow, no shell or content element outside the viewport, and no text-opening label under the header. axe-core reports 0 violations at 1440 and 375px. The mobile menu (scroll lock, Esc, focus return), the gallery (opens from the chevron, photo fits 375×812, Esc and focus return) and newsletter validation with its local-preview status were exercised at 375px.

Checks after this pass: `npm run build` and `npm run check` pass. No document overflow occurs on any of the 13 Figma pages at 360, 375, 414, 768, 1024, 1101, 1280 and 1920px. axe-core 4.14 (WCAG 2A/2AA/2.1AA/2.2AA) reports 0 violations on all 13 Figma pages at 1440 and 375px.

## Designer update — 2026-11-02 (file `lI5gmyztqh4RGBA1bLo1KV`)

The designer supplied an updated file with the same Website 2.0 page `814:6489` and library `748:267`. The source intake is archived outside Git in the raw-source bank at `marketing-site/current-website/2026-11-02-update/`. It holds the user's message, 1:1 renders of all 18 frames, per-page specs, design-context responses and original assets.

### Changes to existing pages

1:1 renders of frames 01–13 were compared against the earlier intake. Frames 02–08 and 13 are pixel-identical. Every other difference comes from one library change: the copy-block heading of the 50/50 sections and the Home overlay panels is now Heading-3xl, Telugu MN 42/46 instead of 52/60. Frames 01, 09, 10, 11 and 12 are affected.

What changed in this edition:
- The heading is 42/46 at 1440px. Below that it is 38/44, and 32/38 on mobile.
- The frames' explicit breaks were added to the two For Two headings.
- The 50/50 bodies got the frames' trailing empty line, and stacked paragraphs now have 30px between them.
- Callout copy spacing is 30px, and callout body paragraphs are green as in the frames. This slightly changes the callouts on Home, Rates and Frequency Experience.

### New pages 14–18

| Page | Route | Frame |
| --- | --- | --- |
| 14 The Frequency Dome | `/figma/the-frequency-dome/` | `862:15932` |
| 15 The Harmonic Hearth | `/figma/the-harmonic-hearth/` | `862:15944` |
| 16 Sound and movement | `/figma/sound-and-movement/` | `862:15978` |
| 17 Horses and the land | `/figma/horses-and-the-land/` | `862:15955` |
| 18 The recording studio | `/figma/the-recording-studio/` | `862:15968` |

The pages reuse the existing roles. New section variants are styled per instance:
- Hero text only at 173, 241, 242, 341 and 354px. The 173px one is left-aligned with a 42/46 heading.
- included at 137px and 227px (numbered labels), each with four columns.
- 3 col info at 386px.
- Amenities with two rows.
- Rooms Comparison with session columns.
- Callouts at 440, 492 and 718px, with or without CTA. Their copy is a Telugu statement, a 28/38 statement, or Roboto 18/30 body paragraphs.
- 50/50 sections at 900px.

Photo framing reuses the frames' crop rectangles. Where the asset keeps the crop's aspect ratio, the crop is exact at ≥1101px. At every width the crop window's centre becomes the object position.

Navigation:
- The footer's "The Property" links now open pages 14–18. "The gallery" stays a placeholder.
- The mobile menu has a third column, "The Property".
- Desktop Stay and Experiences groups stay on pages 2–6 and 7–13.
- Home "Explore the Dome" and "What the Dome is" now open The Frequency Dome.
- On page 14, "Book the Frequency Experience" and "See what is on" open the Frequency Experience and Vessyl Presents pages.
- Other new buttons have no supplied destination and remain explicit placeholders. This includes the generic "button" / "Button" pair on the studio page.

Corrections, added to the change register above:

| Source | Presentation |
| --- | --- |
| `The temezcal` (15) | `The temazcal` |
| `x] minutes | Included for guests…` (16, two rows) | `[x] minutes | …` |
| `[[x], [x] nights a week` (16) | `[x], [x] nights a week` |
| `LIVE ROO` (18) | `Live room` |

Deliberate differences:
- Card Grid on page 17 is 583px instead of 575px. The frame's copy overflows its fixed height, and the site keeps the copy inside.
- The hero on page 17 is framed with object-fit cover instead of the frame's 7.7% horizontal stretch.
- Included values used Roboto Regular, so "Vibro-tactile, no furniture" wrapped. Since 2026-11-04 they use Roboto Light, as in the frames.
- The word artwork keeps "twenty-minute" whole, so that heading on page 17 breaks one word earlier than the frame.
- Combo buttons stay on one row from 1200px, as in the frames, and wrap below that.

Checks:
- At 1440px every new section is within ±3px of its frame, except the Card Grid noted above.
- Every Figma text node on pages 14–18 appears on the site, except the four corrected strings.
- No overflow across 18 pages × 13 widths (360–1920).
- axe reports 0 violations on pages 14–18 at 1440 and 375px.
- The Blueprint edition is unchanged: normalized DOM and computed-style fingerprints are identical for all 26 captures.

## Designer update — 2026-11-04 (file `RmyMB2Jd9AuxZ6XRkjqtCm`)

The designer supplied a new file with the same Website 2.0 page `814:6489` and library `748:267`. The source intake is archived outside Git in the raw-source bank at `marketing-site/current-website/2026-11-04-update/`. It holds the user's message, 1:1 renders of all 24 frames, per-page specs, design-context responses and original assets.

### Changes to existing pages

None. 1:1 renders of frames 01–18 are pixel-identical to the previous intake: 0 differing pixels at 2% fuzz. The library holds the same 45 symbols as before.

The library page also holds designer drafts that are not part of this update and were not built: eight variants of page 14 and raster placeholders for pages 25–37 (Weddings to Rates, policies and the fine print).

### New pages 19–24

| Page | Route | Frame |
| --- | --- | --- |
| 19 Eating here | `/figma/eating-here/` | `882:8107` |
| 20 El Rancho | `/figma/el-rancho/` | `884:8330` |
| 21 Moloka | `/figma/moloka/` | `884:8529` |
| 22 Take the whole property | `/figma/take-the-whole-property/` | `884:8730` |
| 23 Retreats | `/figma/retreats/` | `884:8986` |
| 24 Groups and offsites | `/figma/groups-and-offsites/` | `884:9222` |

The pages reuse the existing roles. New section variants are styled per instance:
- Hero text only at 226, 234, 239, 286, 295, 302 and 333px.
- Card grids at 524, 558 and 582px.
- Callouts at 430 and 547px.
- 2 Rooms cards on white, 585px, without the price line.
- included with five columns at 152px.
- On El Rancho, the rate card keeps the frame's two empty lines after its body, so that section is 516px.
- 3 col info at 195 and 213px.
- The Retreats gallery at 696px.
- The Table master on Retreats without its heading, two rows, 231px.

Photo framing follows the same rule as pages 14–18.

Navigation:
- The mobile menu has two more groups: "Eating here" (pages 19–21) and "Take the whole property" (22–24).
- The desktop Stay and Experiences groups and the footer are unchanged. The frames' footer has no place for these pages.
- On Eating here, "See El Rancho" and "See Moloka" open pages 20 and 21.
- On Take the whole property, the Retreats and Groups and offsites cards open pages 23 and 24. Weddings has no page yet.
- On Home, "Reserve a table" opens Eating here. "Plan a retreat" and "Inquire about a group", in the Take the whole property panel, open Retreats and Groups and offsites.
- Other new buttons have no supplied destination and remain explicit placeholders. These include the generic "button" / "Button" pair on Moloka, the "Button" link arrows on pages 22 and 23, and "The people here" on El Rancho.

Correction, added to the change register above:

| Source | Presentation |
| --- | --- |
| `ompany, dates, headcount…` (24) | `Company, dates, headcount…` |

Deliberate differences:
- The heroes on pages 22 and 24 and the photo in Moloka's "The other room" use object-fit cover. The frames stretch them by about 12.5%.
- The "Button" link arrows on pages 21–23 are brown and readable, like every link arrow on the site. In the frames they are `#f5ebe7` on white and nearly invisible.
- The Retreats table's DETAILS buttons stay inside their rows. In the frame they hang about 48px into the right padding.

Checks:
- At 1440px every new section is within ±2px of its frame.
- All 182 Figma text nodes of pages 19–24 appear on the site; the one corrected string appears in its corrected form.
- No overflow across 24 pages × 13 widths (360–1920).
- axe-core 4.14 (WCAG 2A/2AA/2.1AA/2.2AA) reports 0 violations on pages 19–24 and Home at 1440 and 375px.
- The Blueprint edition is unchanged: 72 captures (36 routes at 1440 and 375px) have identical normalized DOM. Computed styles are identical too, except for one script-set margin on The Frequency Dome stage. That margin also varies between two loads of the same build.

### Deep QA against the current file — 2026-11-04

The owner asked for a full check before publishing: every page against the current file, in text, design, elements and components, and every resolution.

What was compared:
- **Code.** A fresh `get_design_context` of all 24 frames and all 45 library components was captured. It is archived in the intake's `existing-frames/context/` and `library/children/`.
  - Frames 02–08 and 13–18 are line-for-line identical to the responses the pages were built from, including node ids, styles and image hashes.
  - Frames 01 and 09–12 and four components differ only by the 52/60 → 42/46 copy-block heading. That change was already implemented on 2026-11-02.
  - A second capture later in the day matched the first for frames 19–24, the page structure and the library.
- **Text.** Every text node of the 24 frames (614 unique strings) was checked against the rendered pages with word boundaries. It was also passed through the macOS spelling and grammar checker and read in full.
- **Design.**
  - All 211 sections were compared at 1440px with the frames' 1:1 renders: height, pixels, and every text line located by Vision OCR (2,073 lines matched after the fixes). Shifts were confirmed on pixel row profiles.
  - Explicit frame line breaks and paragraph gaps were checked one by one.

Corrections added to the change register:

| Source | Presentation |
| --- | --- |
| `[Fans, air conditioning, cross ven]` (03–05) | `[Fans, air conditioning, cross ventilation]` |
| `[Which tents are most private, and which are the easiest walk.` (05) | closing `]` added |
| `Free Up to [hours] before` (08) | `Free up to [hours] before` |
| `if you are pregnant, …` (09) | `If you are pregnant, …` |

Fixed to match the frames:
- **Missing line breaks.** These are now applied at 1101px and wider:
  - the Treehouse and Glamping hero ledes;
  - the Day, Frequency Experience and Horses and the River H1s.
- **Hero ledes.** The Treehouse and Glamping ledes are 22/32, not 18/30.
- **Paragraph gaps.** The Treehouse and Glamping gallery overlays use one empty line (30px), not 60px. For Two's description uses 30px, and its paragraphs are 666px wide.
- **Wrapping.** Figma breaks a line a few pixels before the browser does. Widths reproduce its breaks in five places:
  - Home "Fourteen units": 492px;
  - Where you sleep "cannot decide?": 538px;
  - Villas hero lede: 570px;
  - Hearth description: 662px;
  - the river 50/50: 492px.
- **Events newsletter.** The copy is 544px and the form runs 15px into the padding.
- **Groups and offsites.** The 50/50 body has no extra line before its button.
- **Press logos.** Each logo has its frame size (for example dwell 61×26, NYT 119×20). They keep those proportions on tablet (one row) and mobile.
- **Property map.** The aerial photograph uses the frame's crop, so the pins sit on their buildings.
- **Events and retreats tables.**
  - The columns are the frames' 123/319/491/230px.
  - At 1440px and wider the button runs into the row padding, as in the frames.
- **Facts values.** They use Roboto Light (`src/assets/fonts/roboto-300.woff2`, from `@fontsource/roboto` 5.3.0). Before, the browser fell back to Regular.
- **Footer.** It reads "Rates and Offers" and "Privacy • Terms & Conditions", as in the frames.

Remaining differences:
- **Wraps from corrections.** "cross ventilation]" wraps in the 275px amenity cell, so the lower amenity rows sit 29px lower. "Glamping Tents Gallery" takes two lines in its overlay.
- **Heading position.** Word-art headings sit 2–4px lower than Figma's text, within the ±3px section tolerance except one 4px case (Sound and movement opening).
- **Minimum width.** The edition is laid out for 360px and wider (`body { min-width: 360px }`). At 320–359px the page scrolls sideways.
- **Shell.** The newsletter field keeps the frames' placeholder `ronnie@aave.com`.

Checks:
- At 1440px all 211 sections are within ±3px of their frames. The exception is Card Grid on page 17 (+8px), which is deliberate.
- Layout was audited on 24 pages × 69 widths (360–2560) in Chrome, WebKit and Firefox. The audit looked for page overflow, elements outside the viewport, clipped text, overlapping text lines, text at the screen edge and broken images. The only findings are intentional hidden elements:
  - the skip link;
  - the 0px "Menu" label below 681px;
  - visually hidden table headers below 761px.
- axe-core 4.14 (WCAG 2A/2AA/2.1AA/2.2AA) reports 0 violations on all 24 pages at 1440, 768 and 375px.
- On pages 19–24 at 1440 and 375px, the gallery opens and closes, Esc works and focus returns. The menu opens and closes, and the newsletter shows its local-preview status.
- `npm run build` and `npm run check` pass.
- The Blueprint edition is unchanged on all 72 captures, the one script-set stage margin aside.

## Designer update — 2026-11-05 (file `Scz6tT11lH8yDhtz20EGXj`)

The designer supplied another copy of the file with the same Website 2.0 page `814:6489` and library `748:267`. The intake is archived outside Git in the raw-source bank at `marketing-site/current-website/2026-11-05-update/`.

### What changed in the file

- **Existing pages: no content change.**
  - A fresh `get_design_context` of frames 01–24 is line-for-line identical to the 2026-11-04 capture.
  - 1:1 renders show 0 differing pixels.
- **Frame bounds.** The designer resized frames to their content:
  - 01, 03, 04 and 05 now include the footer they used to clip;
  - 20–23 lost empty canvas below the footer.
- **Library.** All 45 components are identical, and the 47 symbols keep their ids and geometry. The library page lost drafts: the raster placeholders for pages 25 and 26, a copy of 03 and two page-14 variants.
- **New pages** 25 Weddings (`944:7523`) and 26 Arenal (`944:7742`).

The Figma MCP allows 10 calls a minute on this seat. Parallel captures hit that limit, and the remaining 21 components were captured one at a time.

### New pages 25–26

| Page | Route | Frame |
| --- | --- | --- |
| 25 Weddings | `/figma/weddings/` | `944:7523` |
| 26 Arenal | `/figma/arenal/` | `944:7742` |

New section variants:
- Hero text only at 370 and 450px.
- 3 col info with the frames' line breaks.
- included at 148px.
- Card Grid at 612px.
- Arenal's rate card keeps the frame's four empty lines after its text, so that section is 576px.
- **Weddings "The paperwork".** The Rooms Comparison master is used as a list of three topics, each with a "+". The rows have no content yet, so each "+" is a placeholder control: it is focusable and announces "details not supplied".

Navigation:
- The mobile menu adds Weddings to "Take the whole property" and a "Plan your visit" group with Arenal.
- The footer's "Plan your visit" heading opens Arenal, as Stay and Experiences open their overview pages.
- Home's "plan your visit" button, in the "Where you actually are" section, opens Arenal. Arenal's own hero heading is "Where you actually are".
- The Weddings card on Take the whole property opens Weddings.
- Arenal's "Getting here", "Things to do around here" and "When to come" have no pages yet and stay unlinked.

Corrections, added to the change register:

| Source | Presentation |
| --- | --- |
| `or the night before and the morning after.` (25) | `For the night before and the morning after.` |
| `san jose (sjo)` (26) | `san josé (sjo)`, as the same page writes San José |

Kept as supplied, for the owner to decide:
- Arenal's "Hero text only" lede repeats the Rates text "Booking here directly is always the cheapest way to stay…".
- Arenal gives travel times as `[x] hours` in its description, `[x] minutes` in its facts, and "Three hours by car… two and a half from Liberia" in its Getting here card.
- Weddings keeps the visible note "TO SUPPLY: legal requirements, residency rules…".

Deliberate differences:
- The Weddings 50/50 photo and the Arenal hero use object-fit cover. The frames stretch them by about 18% and 4%.

Checks:
- At 1440px every section of all 26 pages is within ±3px of its frame, except the deliberate Card Grid on page 17. Vision OCR matched 2,249 text lines.
- Every text node of pages 25–26 appears on the site, except the two corrections. Their explicit line breaks and paragraph gaps match the frames.
- axe-core 4.14 (WCAG 2A/2AA/2.1AA/2.2AA) reports 0 violations on all 26 pages at 1440, 768 and 375px.
- Layout passes 26 pages × 69 widths (360–2560) in Chrome, WebKit and Firefox. The only findings are the known intentional hidden elements.
- On pages 25–26 the gallery, menu and newsletter work at 1440 and 375px.
- The Blueprint edition is unchanged on all 72 captures, the one script-set stage margin aside.
- `npm run build` and `npm run check` pass. The freeze manifest covers 347 files.

## Designer update — 2026-11-07 (file `EpZtYw0Tb4P4N714QcXfDM`)

The designer supplied another copy of the file with the same Website 2.0 page `814:6489` and library `748:267`. The intake is archived outside Git in the raw-source bank at `marketing-site/current-website/2026-11-07-update/`.

### What changed in the file

- **Existing pages: no visual change.**
  - 1:1 renders of frames 01–26 show 0 differing pixels against the 2026-11-05 capture, at the same sizes.
  - In the design context of 19 frames, only type-token names changed and every value stayed the same. For example, the 50/50 heading `size/8xl,42px` became `size/6xl,42px`, and `size/8xl,36px` became `size/5xl,36px`. With tokens resolved, the code is identical apart from class order.
- **Library.** All 45 components keep their values. Four of them (750:1923, 750:1924, 750:966, 750:968) carry the same token renames. The drafts of pages 27 and 28 and their raster placeholders left the library page.
- **New pages:** 27 Getting here (`965:7503`) and 28 Things to do around here (`965:7711`).

### New pages 27–28

| Page | Route | Frame |
| --- | --- | --- |
| 27 Getting here | `/figma/getting-here/` | `965:7503` |
| 28 Things to do around here | `/figma/things-to-do-around-here/` | `965:7711` |

New section variants:
- Getting here opens on white: the menu sits above a 248px "Hero text only", whose content is centred 2px above the frame's padding as in the frame.
- Hero text only at 408px with top padding, and at 216px without.
- The Liberia rate card keeps the frame's two empty lines after its text.
- Card Grids at 644 and 612px.
- Callout at 430px.
- "Driving yourself" keeps its two lines in one paragraph, with no empty line between them.
- The address keeps one empty line before the GPS line, no trailing line before its button, and the frame's break "The pin that / actually works".

Navigation:
- The mobile menu's "Plan your visit" group lists Arenal, Getting here and Things to do around here.
- The footer's "Getting here" and "Things to do in Arenal" now open the new pages. "When to visit", "FAQ" and "Policies" have no pages yet.
- On Arenal, the "Getting here" button and the "Getting here" and "Things to do around here" cards open the new pages. "When to come" stays unlinked.
- The new pages' own buttons ("Book a transfer", "Open in Google Maps", "Ask us to book any of this") have no destination in the file and stay placeholders.

Correction, added to the change register:

| Source | Presentation |
| --- | --- |
| `raTransfer from San Josétes` (27) | `Transfer from San José`, as the card above reads "Transfer from Liberia" |

Kept as supplied, for the owner to decide:
- Getting here says "Three hours by car from San José, two and a half from Liberia" in its lede and "[x] hours by road" from Liberia below.
- On page 28 the card photos do not show their subjects. Waterfalls reuses the hero photo of the river. Hanging bridges shows horses, Lake Arenal the property from above, Caves a ginger flower, and La Fortuna town a riding arena.

Deliberate differences:
- **Early arrival.** On page 27, "We hold your bags; use the Hearth, the river and the trails" takes three lines. The frame clips the third line ("the trails") at the row's 100px height. The site shows the whole value, so that row is 24px taller.
- **Stretched photos.** The frames stretch four photos: the golf cart, about 16% vertically; the aerial view, 12% horizontally; the hot springs, 16%; and the Waterfalls card, about 2.4 times. The site keeps their proportions with object-fit cover. The hot-springs photo keeps the frame's 135% width and its centre.

Checks:
- At 1440px every section of pages 27–28 is within ±3px of its frame, except the early-arrival row. Rows of ink in every section match to ±3px, and Vision OCR matched 209 text lines. Pages 01–26 are unchanged: Home and Arenal screenshots match the previous build to the pixel, and the other pages' files are untouched.
- Every text node of pages 27–28 appears on the site, except the one correction. NSSpellChecker flags only that typo and the Spanish names Río, Tabacón and Venado.
- axe-core 4.14 (WCAG 2A/2AA/2.1AA/2.2AA) reports 0 violations on all 28 pages at 1440, 768 and 375px.
- Layout passes 28 pages × 69 widths (360–2560) in Chrome, WebKit and Firefox. The only findings are the known intentional hidden elements. Port 4190 is on the browsers' blocked-port list, so WebKit and Firefox run against a second preview on 8090.
- On pages 27–28 and Arenal, the menu (28 links) and the newsletter work at 1440 and 375px, and so does Arenal's gallery. All 28 internal routes answer 200.
- Blueprint does not import any changed file: it has its own site data, menu and footer, and `src/figma.css` loads only in the `/figma/` layout.
- `npm run build` and `npm run check` pass (64 routes). The freeze manifest covers 371 files.

## Typefaces — 2026-11-07 (owner decision)

The owner replaced the frames' heading typeface in this edition. A first pass also set text in Lato (published as f8b3205). The owner then kept the frames' Roboto for text: «заменяем заголовки Telugu на EB Garamond, для текстов остаётся Roboto». Everything else follows the frames: sizes, line heights, weights, tracking, case, colours and layout. This section supersedes earlier mentions of Telugu MN and of word-art headings above.

| Role in the frames | Frames | Site |
| --- | --- | --- |
| Headings, display prose, rate values, menu and newsletter headings | Telugu MN Regular | EB Garamond Regular 400 |
| Body text, lists, tables, footer | Roboto Regular 400 | Roboto Regular 400 |
| Facts values | Roboto Light 300 | Roboto Light 300 |
| Buttons and small calls to action | Roboto Medium 500 | Roboto Medium 500 |
| Labels and eyebrows | Roboto SemiBold 600 | Roboto SemiBold 600 |
| The "[Date]" column of the event rows (pages 13 and 23, the Table master) | Roboto Bold 700 | Roboto Bold 700 |

The frames use no italics, underlines or strikethroughs. Uppercase and tracking follow the frames.

Files:
- `src/assets/fonts/eb-garamond-latin-wght-normal.woff2` and `…-latin-ext-…` hold EB Garamond, variable 400–800, from `@fontsource-variable/eb-garamond` 5.3.0, split by Unicode range. Its SIL OFL 1.1 licence is `EB-Garamond-OFL.txt`, beside them.
- `src/figma.css` declares EB Garamond and Roboto Light and sets `--font-display` on `body[data-edition="figma"]`. Roboto Regular, Medium, SemiBold and Bold come from `src/shared.css`, as before.
- The shell, the chooser page and the Blueprint edition keep their own fonts.

Headings:
- Telugu MN is an Apple system font that may not be served on the web, so headings were drawn as SVG word outlines. EB Garamond is free to serve, so all 207 headings on the 28 pages are live text again.
- The frames' 17 explicit line breaks inside headings are kept.
- EB Garamond sets about 20% narrower than Telugu MN at the same cap height. `text-wrap: pretty` keeps a heading from ending on a single word.
- The outline assets were removed: `public/typography/` (194 SVG files, 5 MB), `src/data/type-art.json`, `scripts/type-art.mjs` and `scripts/outline-headings.swift`. They are in Git history.
- `scripts/build-pages.mjs` no longer copies `typography`. `scripts/convert-pages-to-svelte.mjs`, the one-time intake utility, read that catalog and no longer runs as is.

Corrected in the same pass:
- **Fact labels.** The labels of the "included" rows (DISTANCE, CHECK IN…) had 3px tracking since the first build. The frames use 4.48px, as on every other label, and so does the site now.
- **One line at the frame width.** Fact labels sit on one line in the frames. At 4.48px the browser also spaces out the last letter, which Figma does not, so "LA FORTUNA" in Arenal's 127px column would wrap. From 1366px fact labels do not wrap. Below that the columns are too narrow for this, and labels wrap as before.

Kept, as before: the OFFER ribbon on Rates is Bold 18.7px rather than the frames' SemiBold 17.5px. White on #d57e3d is 3.05:1, which passes only as large bold text (see "Deliberate differences").

Checks (Roboto text, EB Garamond headings):
- Chrome's report of the fonts that render each node lists only EB Garamond and Roboto Light, Regular, Medium, SemiBold and Bold on all 28 pages. There is no fallback and no synthesised bold.
- 457 text nodes carry a frame id, and each one's family, weight, italic and case match the frame.
- Every text run of the 28 frames (2,114 runs) was looked up on the site by its words, after applying the change register's corrections. For each word, family, weight, italic, case, tracking (±0.5px) and decoration were compared.
  - 2,074 runs match.
  - The five OFFER ribbons differ, as kept above.
  - The other 35 are the newsletter field's placeholder, which is an attribute rather than text, and six corrected labels. Those six were checked one by one and match.
- At 1440px every section keeps its height from the Telugu MN build, except page 13's "Heading title". It is 236px instead of 274px, because its statement now takes two lines instead of three.
- axe-core 4.14 reports 0 violations on all 28 pages at 1440, 768 and 375px.

## Text selection and copying — 2026-11-07 (owner request)

The owner asked that the edition's text cannot be selected with the mouse or copied.

- `src/figma.css` sets `user-select: none` (and `-webkit-user-select`) on `body[data-edition="figma"]`, which stops mouse, keyboard and select-all selection. It also sets `-webkit-touch-callout: none`, which hides the iOS long-press menu.
- `src/lib/interactions.js` cancels `selectstart`, `copy` and `cut` events outside form fields. A selection made some other way still copies nothing.
- The newsletter's e-mail field stays fully editable: its text can be selected, copied, cut and pasted. Links, buttons, the menu, the gallery and keyboard focus work as before. Screen readers still read every text, since only selection and the clipboard are affected.
- The Blueprint edition is unaffected.
- **Limits.** This stops casual copying only. The text is still in the page source, in the browser's reader mode, in the developer tools and in screenshots, and a visitor who switches off JavaScript and styles can copy it.

Checks:
- In Chrome, WebKit and Firefox, on Home, Getting here, Where you sleep and The Vessyl Presents, nothing is selected by dragging, by triple-clicking a paragraph, by double-clicking a heading or by select-all. Copy and cut are cancelled.
- In Chrome with the real clipboard, page text never reaches the clipboard, even after a forced selection. Text selected in the e-mail field does.
- After in-site navigation the block stays.
- The gallery, menu and newsletter work at 1440 and 375px. axe reports no violations.

## Booking address — 2026-11-09 (owner request)

The owner's booking engine replaces the old link everywhere, by language: `https://reservations.orbebooking.com/Search/Init/PAS6c/en/` and `/es/`. The owner confirmed that the frozen edition changes too ("Да, в обоих").

- The edition is in English, so every booking link uses `/en/`: `src/lib/site.ts` (header, menu, footer) and the designer's booking buttons on pages 01–06. `scripts/convert-pages-to-svelte.mjs` writes the same address, so a rebuild of the pages keeps it.
- `node scripts/figma-freeze.mjs --update` refreshed the fingerprints of exactly these seven files; the other 188 are unchanged.
- No other text, layout or behaviour changed.

## Spanish — 2026-11-10 (owner request)

The owner asked for the Figma edition in Spanish ("/figma и /figma-pr делай перевод ES"). Every page also exists under
`/figma/es/`, in the approved Latin American Spanish of Figma Enhanced and Blueprint. How it works, the translation and
the checks: [docs/figma-spanish.md](figma-spanish.md).

- The English pages keep their text and layout. The designer's "EN | ES" and the menu's globe are now links to the
  page in the other language, with the current language underlined, and each page names its Spanish alternate.
- The designer's line breaks stay in English; in Spanish the broken element shows the whole sentence.
- The booking links use `/en/` on English pages and `/es/` on Spanish pages. `scripts/convert-pages-to-svelte.mjs` still
  writes the English address; the page components now carry `/{locale}/`.
- `node scripts/figma-freeze.mjs --update` was run after comparing the English output before and after; the guard now
  also covers `src/lib/i18n.ts` and the dictionary `src/lib/content/es.json`.

