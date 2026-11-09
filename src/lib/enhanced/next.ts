// Step 2.6 (docs/figma-enhanced-step2.md): the next-page block, /blueprint/ 452c7d0 reference 7, on the 25 pages of
// the placement map (not the three places to stay, which end on the designer's own links to the other two). Each
// page leads to the next in the site's order; the last leads home. The block shows that page's name, one line in the
// designer's words from its opening (its H1, or the first sentence of its description where the H1 is still a
// placeholder), and that page's opening film or photograph; a page that opens on text shows its first photograph.
// The button inside the picture is named the way the designer names links to a page ("See the treehouse").
import { msg } from '#lib/enhanced/i18n.ts';
import { pages, type PageMeta } from '#lib/enhanced/site.ts';
import photoWidths from '#lib/enhanced/photo-widths.json';

type Media = { loop: string; mobile: string } | { photo: string; width: number; height: number; position?: string; srcset?: string; sizes: string };
export type Door = { page: PageMeta; name: string; line: string; label: string; media: Media };

// Every clip has a phone version (speed, stage 3, docs/figma-enhanced-speed.md): the ones cut for Blueprint sit beside
// their clips in /bp/video/, the fifteen made for this edition in /enhanced/clips/.
const enhancedPhone = new Set(['loop-benches', 'loop-dome', 'loop-halter', 'loop-handpan', 'loop-hearth', 'loop-plunge', 'loop-poolview', 'loop-river', 'loop-saddle', 'loop-stars', 'loop-studio', 'loop-swim', 'loop-tuning', 'loop-violin', 'loop-yoga']);
const loop = (name: string): Media => ({ loop: name, mobile: enhancedPhone.has(name) ? `/enhanced/clips/${name}-m.mp4` : `/bp/video/${name}-m.mp4` });
// position: the subject's place in the photograph, as that page crops it (focus.css).
// Speed, stage 4: the photograph in sizes for the screen (public/enhanced/photos/, listed in photo-widths.json). The
// frame (next.css) is 89% of the screen wide, at most 1680px, and 64svh tall below 900px, min(78svh, 56vw) above; the
// photograph covers it, so a wide one is drawn wider than the frame: sizes follow its proportions (phones up to about
// 2.2 times taller than wide, tablets up to 1.6).
const sizesFor = photoWidths as Record<string, { width: number; sizes: number[] }>;
const photoSet = (src: string) => sizesFor[src] && [...sizesFor[src].sizes.map(w => `/enhanced/photos/${src}-${w}.webp ${w}w`), `/media/${src}.webp ${sizesFor[src].width}w`];
const coverSizes = (width: number, height: number) => {
  const ratio = width / height;
  const vw = (frameHeight: number) => `${Math.ceil(Math.max(0.89, frameHeight * ratio) * 100)}vw`;
  return `(max-width: 599px) ${vw(1.41)}, (max-width: 899px) ${vw(1.02)}, (max-width: 1919px) ${vw(0.56)}, ${Math.max(1680, Math.round(1150 * ratio))}px`;
};
const photo = (src: string, width: number, height: number, position?: string): Media => ({ photo: src, width, height, position, srcset: photoSet(src)?.join(', '), sizes: coverSizes(width, height) });

const doors: Record<number, Omit<Door, 'page' | 'name'> & { name?: string }> = {
  1: { name: msg('The Vessyl'), line: msg('A dome, a river and fourteen places to sleep, on 118 acres above Arenal.'), label: msg('Back to the home page'), media: loop('loop-pool') },
  2: { line: msg('Fourteen units, spread across 118 acres.'), label: msg('See where you will sleep'), media: photo('0b6f7938d784334e4a7e', 2400, 1513) },
  3: { line: msg('Six villas, each facing something different, each far enough from the next that you will not hear anyone.'), label: msg('See the villas'), media: photo('2b61d0b9909a48665218', 2400, 1600) },
  7: { line: msg('You do not have to stay here to come here.'), label: msg('See the experiences'), media: loop('loop-experiences') },
  8: { line: msg('Spend the day here without staying the night.'), label: msg('See the day and the half day'), media: loop('loop-rancho-pool') },
  9: { line: msg('You lie down on the floor of the Dome. The lights go low.'), label: msg('See the Frequency Experience'), media: loop('loop-dome') },
  10: { line: msg('The valley is better at night, and almost nobody sees it.'), label: msg('See Arenal after dark'), media: photo('217d8eafeb5342a6cc73', 1800, 2400) },
  11: { line: msg('An evening built for two people and nobody else.'), label: msg('See the evening for two'), media: loop('loop-evening') },
  12: { line: msg('You ride out from the stables across the property and down toward the river.'), label: msg('See the ride to the river'), media: loop('loop-river') },
  13: { line: msg('Whoever is playing, in the best room we have.'), label: msg('See what is on'), media: loop('loop-presents') },
  14: { line: msg('The Dome is the reason this place exists.'), label: msg('Explore the Dome'), media: loop('loop-stars') },
  15: { line: msg('The heat, the cold, and the sound you feel through the bench.'), label: msg('See the Hearth'), media: loop('loop-hearth') },
  16: { line: msg('Everything we run that is not a meal or a horse.'), label: msg('See the sessions'), media: photo('b4c9be4660b101bab3d7', 2400, 1800) },
  17: { line: msg('The property runs from the ridge down to the water.'), label: msg('See the land'), media: loop('loop-pasture') },
  18: { line: msg('A working room, not an amenity.'), label: msg('See the studio'), media: loop('loop-studio') },
  19: { line: msg('You find out what is for dinner when you sit down.'), label: msg('See where you eat'), media: photo('fb2fb92538ca4c2ce0c1', 2400, 1350) },
  20: { line: msg('The long table.'), label: msg('See El Rancho'), media: loop('loop-rancho') },
  21: { line: msg('Moloka is the smaller room.'), label: msg('See Moloka'), media: photo('9203238de1f599aa3053', 2400, 1603, '50% 30.4%') },
  22: { line: msg('Fourteen units, the Dome, the Hearth and 118 acres, and nobody else here.'), label: msg('See the whole property'), media: loop('loop-estate') },
  23: { line: msg('Bring your people, use our dome.'), label: msg('See retreats'), media: loop('loop-retreat') },
  24: { line: msg('For companies that have had enough of hotel ballrooms.'), label: msg('See groups and offsites'), media: photo('698de65973782acf1018', 2400, 1800) },
  25: { line: msg('Small, private, and outdoors.'), label: msg('See weddings'), media: photo('c52099090a2b2ca82d49', 2400, 1601, '50% 34.1%') },
  26: { line: msg('Where you actually are.'), label: msg('See Arenal'), media: loop('loop-arenal') },
  // Getting here opens on text, and its first photograph (the golf cart) already closes the Arenal page's last
  // row of cards, so the door shows the page's other photograph.
  27: { line: msg('Three hours by car from San José, two and a half from Liberia, or fly Sansa into La Fortuna.'), label: msg('See how to get here'), media: photo('11358b370ad895b42644', 2400, 1798) },
  28: { line: msg('What is worth leaving the property for.'), label: msg('See what to do around here'), media: photo('c497476865b545968151', 2400, 1350) }
};

export function door(index: number): Door {
  const page = pages[index % pages.length];
  const entry = doors[page.index];
  return { page, name: entry.name || page.name, line: entry.line, label: entry.label, media: entry.media };
}
