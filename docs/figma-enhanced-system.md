# Figma Enhanced — design system (step 1, second pass, 2026-11-08)

This is the system under all 28 pages of `/figma-enhanced/`. It was built in step 1 of `docs/figma-enhanced-plan.md`.

## Principle

The designer's frames come first: their components, eyebrows, capitals, proportions and full-width photographs stay. The system improves the frames without replacing them.
- One 12-column grid and one section rhythm.
- A type scale where H1 stands above H2 and text grows on wide screens.
- Rules for text on photographs.
- Descriptive `alt` texts.
- States for every control.
- The closing photograph that melts into the footer.

The first pass of step 1 (commits 229dc26, ce2439b) went too far:
- It removed the designer's eyebrows and capitals.
- It rounded and inset the heroes.
- It changed tones at flat edges.
- It replaced the designer's panels and cards.
- It moved the map labels off the map.

The same day the owner found it worse than the frames in places and corrected the rules:
- **Text on photographs.** Text is wrong only on a highly detailed part of a photograph. Check every photograph by eye.
- **Tones.** A tone changes through a photograph or through a tinted pattern, as on the Legacy Blueprint.
- **Eyebrows and capitals.** The designer's eyebrows and capitals are the designer's decision.
- **Heroes.** A hero photograph is a full-width card with no rounding.

The second pass starts again from the designer's markup (step 0, e2fd33c) and follows these corrections.

## Files

| File | What it holds |
| --- | --- |
| `src/lib/enhanced/styles/tokens.css` | Colour roles, the type scale, grid, spacing, radii, shadow, motion. |
| `src/lib/enhanced/styles/system.css` | Every section role in the designer's styling, on the grid and the tokens, with tablet and phone layouts; the closing photograph, the newsletter, the footer colour, the header margin. |
| `src/lib/enhanced/styles/focus.css` | Where each photograph's subject sits (`object-position`), from the designer's crops. |
| `src/lib/enhanced/styles/shell.css`, `shell-edition.css` | Header, menu and footer layout from the Figma edition. |

The markup is the designer's, with these changes:
- the gallery dots are removed. (The nine "Button" placeholders and the three "+" controls of the Weddings topics were removed too, and restored on 2026-11-10 at the owner's word: every text and control of the frame stays. They answer as pending controls.)
- frame line breaks are removed;
- `alt` texts describe the photographs;
- twelve heroes carry `data-hero-text="glass"`.

## Type

EB Garamond for headings and display prose, Roboto for text. At 1440px every size equals the frames, except H1. Above 1440 sizes grow to about +15% at 2000px; on phones they have a floor.

| Token | At 1440 | Role in the frames |
| --- | --- | --- |
| `--t-hero` | 68 / 73 | Home H1 (frames 60) |
| `--t-h1` | 60 / 66 | Page H1 (frames 52, equal to H2) |
| `--t-h2` | 52 / 60 | H2 in 40/60 and 60/40 splits, the gallery panel, text heroes |
| `--t-h2m` | 42 / 46 | H2 in 50/50 splits and overlay panels |
| `--t-h2s` | 36 / 46 | Callout, heading titles, newsletter |
| `--t-h3` | 32 / 44.8 | Card titles, the introduction and the quote, the events heading |
| `--t-h3s` | 28 / 38 | Description and rate card headings, terms inside descriptions |
| `--t-h4` | 26 / 38 | Titles in the 3- and 4-card grids |
| `--t-lede` | 22 / 32 | Hero and opening paragraphs, the quote's attribution |
| `--t-highlight` | 20 / 24 | Price lines (600), fact values (300) |
| `--t-body` | 18 / 30 | Text (18/24 in the card grids) |
| `--t-button` | 16 / 20 | Buttons and link arrows |
| `--t-label` | 14 / 20 | Eyebrows, capitals tracked 0.32em; map labels |

## Grid, rhythm, shape

- **Grid:**
  - 12 columns at every width. The outer margin `--edge` runs from 20 to 104px and centres the content at 1680px.
  - Text starts on column lines.
  - The header and footer use the same margin.
- **Rhythm:**
  - 106px between two sections at 1440 (`--section`).
  - Beige bands use `--section-band`.
  - The first section after the hero gets the full step.
- **Radii:**
  - Photographs, cards and panels: 10px, as in the frames.
  - Buttons: 12px (owner's Legacy reference 8).
  - Full-width photographs (heroes, overlays, galleries, the map, the closing photograph): no radius.

## Surfaces and tones

- White by default.
- The designer's beige bands (the room cards on Villas, Treehouse and Glamping Tents) sit between two full-width photographs, so the tone changes through a photograph.
- The events newsletter on The Vessyl Presents keeps the frames' forest pattern panel.
- **Closing (owner's reference 13):**
  - Every page except The Vessyl Presents ends on a full-width night photograph of the Dome.
  - Over its last two header heights it fades into the footer colour, `#161a11`, the darkest tone of the photograph.
  - The newsletter sits below the photograph, on that colour.
  - The Frequency Dome opens on that photograph, so it closes on the other night photograph.

## Text on photographs

Every hero was checked by eye at 2000 and 375px on 2026-11-08.
- **Text straight on the photograph,** where the part under the title is calm (dark or plain): Home, The Villas, Glamping Tents, The Frequency Experience, For Two, The Frequency Dome, The Harmonic Hearth, Moloka, Retreats, Weddings.
- **Text on frosted glass** (owner's prototype reference 16) on twelve heroes. Under the title these photographs have detail: foliage, people at dinner, set tables, a grey horse, gravel, a mixing desk, river rocks. The glass blurs the photograph under the text calm.
  - The pages: The Treehouse, The Day and the Half Day, Arenal After Dark, Horses and the River, Horses and the Land, The Recording Studio, Eating Here, El Rancho, Take the Whole Property, Groups and Offsites, Arenal, Things to Do Around Here.
  - In the markup they carry `data-hero-text="glass"`.
- **Overlay panels** keep the frames' translucent brown panel, so their text never sits on the photograph.

When a hero photograph changes, check it again and set or remove the attribute.

## Components (the frames' look, on the system)

- **Photo hero:**
  - Full width with the frames' left-to-right shade. The eyebrow, H1 and paragraph sit low on the left.
  - Home is centred over a 50% shade.
  - Buttons on photographs use the Legacy translucent gradient (reference 9).
- **Text hero:** white and centred, eyebrow, H1 or H2, lede.
- **Description:** text on columns 1–7, the beige rate card on 9–12.
- **Editorial splits:** the frames' 603:638 photograph beside the copy (50/50, 40/60, 60/40).
- **Overlay:** a full-width photograph with the frames' translucent brown panel (80%). The panel is full height, left or right.
- **Gallery:** a full-width photograph with the frames' arrows.
- **Cards:**
  - White cards with a 400:251 photograph; room cards have the frames' shadow.
  - Offers carry the copper ribbon and brown titles.
  - The 3- and 4-card grids use square photographs with the title under them.
- **Introduction and quote:** the designer's fan artwork beside the introduction and running off the quote's right edge.
- **Callout:** the beige panel with a portrait.
- **Facts:** copper 4px rules over capital labels and light values. Amenities have no rules.
- **Comparison, events, topics:** the frames' tables and rows.
- **Map:**
  - Full width with the frame's crop of the aerial photograph.
  - The place labels sit on their buildings at the designer's positions.
  - On phones they become a two-column list under the map.
- **Controls:**
  - Hover, pressed (1px down), focus (2px copper outline, light on photographs) and disabled states.
  - The frames' brown link arrows.
  - Newsletter error and notice messages.

## Responsive

The breakpoints are 1023 and 767px, and the phone layout follows the Figma edition's mobile adaptation.
- Heroes keep the full width.
- Splits stack with the photograph first at 4:3.
- Card grids stack.
- Overlays and galleries put the photograph on top at 4:3, with the solid panel under it.
- Facts go two to a row.
- The table becomes cards.
- The map labels become a list.

## QA for the second pass

- Layout was checked at 69 widths from 360 to 2560 in Chrome, WebKit and Firefox.
- axe ran at 1440, 768 and 375.
- The gallery, menu and newsletter states were tested.
- The copy block was checked in three engines.
- `npm run check` passed, and `/figma/` is unchanged.
