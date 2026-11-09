// Step 2.6 (docs/figma-enhanced-step2.md): the next-page block, /blueprint/ 452c7d0 reference 7, on the 25 pages of
// the placement map (not the three places to stay, which end on the designer's own links to the other two). Each
// page leads to the next in the site's order; the last leads home. The block shows that page's name, one line in the
// designer's words from its opening (its H1, or the first sentence of its description where the H1 is still a
// placeholder), and that page's opening film or photograph; a page that opens on text shows its first photograph.
// The button inside the picture is named the way the designer names links to a page ("See the treehouse").
import { pages, type PageMeta } from '#lib/enhanced/site.ts';

type Media = { loop: string; mobile: string } | { photo: string; width: number; height: number; position?: string };
export type Door = { page: PageMeta; name: string; line: string; label: string; media: Media };

// Every clip has a phone version (speed, stage 3, docs/figma-enhanced-speed.md): the ones cut for Blueprint sit beside
// their clips in /bp/video/, the fifteen made for this edition in /enhanced/clips/.
const enhancedPhone = new Set(['loop-benches', 'loop-dome', 'loop-halter', 'loop-handpan', 'loop-hearth', 'loop-plunge', 'loop-poolview', 'loop-river', 'loop-saddle', 'loop-stars', 'loop-studio', 'loop-swim', 'loop-tuning', 'loop-violin', 'loop-yoga']);
const loop = (name: string): Media => ({ loop: name, mobile: enhancedPhone.has(name) ? `/enhanced/clips/${name}-m.mp4` : `/bp/video/${name}-m.mp4` });
// position: the subject's place in the photograph, as that page crops it (focus.css).
const photo = (src: string, width: number, height: number, position?: string): Media => ({ photo: src, width, height, position });

const doors: Record<number, Omit<Door, 'page' | 'name'> & { name?: string }> = {
  1: { name: 'The Vessyl', line: 'A dome, a river and fourteen places to sleep, on 118 acres above Arenal.', label: 'Back to the home page', media: loop('loop-pool') },
  2: { line: 'Fourteen units, spread across 118 acres.', label: 'See where you will sleep', media: photo('0b6f7938d784334e4a7e', 2400, 1513) },
  3: { line: 'Six villas, each facing something different, each far enough from the next that you will not hear anyone.', label: 'See the villas', media: photo('2b61d0b9909a48665218', 2400, 1600) },
  7: { line: 'You do not have to stay here to come here.', label: 'See the experiences', media: loop('loop-experiences') },
  8: { line: 'Spend the day here without staying the night.', label: 'See the day and the half day', media: loop('loop-rancho-pool') },
  9: { line: 'You lie down on the floor of the Dome. The lights go low.', label: 'See the Frequency Experience', media: loop('loop-dome') },
  10: { line: 'The valley is better at night, and almost nobody sees it.', label: 'See Arenal after dark', media: photo('217d8eafeb5342a6cc73', 1800, 2400) },
  11: { line: 'An evening built for two people and nobody else.', label: 'See the evening for two', media: loop('loop-evening') },
  12: { line: 'You ride out from the stables across the property and down toward the river.', label: 'See the ride to the river', media: loop('loop-river') },
  13: { line: 'Whoever is playing, in the best room we have.', label: 'See what is on', media: loop('loop-presents') },
  14: { line: 'The Dome is the reason this place exists.', label: 'Explore the Dome', media: loop('loop-stars') },
  15: { line: 'The heat, the cold, and the sound you feel through the bench.', label: 'See the Hearth', media: loop('loop-hearth') },
  16: { line: 'Everything we run that is not a meal or a horse.', label: 'See the sessions', media: photo('b4c9be4660b101bab3d7', 2400, 1800) },
  17: { line: 'The property runs from the ridge down to the water.', label: 'See the land', media: loop('loop-pasture') },
  18: { line: 'A working room, not an amenity.', label: 'See the studio', media: loop('loop-studio') },
  19: { line: 'You find out what is for dinner when you sit down.', label: 'See where you eat', media: photo('fb2fb92538ca4c2ce0c1', 2400, 1350) },
  20: { line: 'The long table.', label: 'See El Rancho', media: loop('loop-rancho') },
  21: { line: 'Moloka is the smaller room.', label: 'See Moloka', media: photo('9203238de1f599aa3053', 2400, 1603, '50% 30.4%') },
  22: { line: 'Fourteen units, the Dome, the Hearth and 118 acres, and nobody else here.', label: 'See the whole property', media: loop('loop-estate') },
  23: { line: 'Bring your people, use our dome.', label: 'See retreats', media: loop('loop-retreat') },
  24: { line: 'For companies that have had enough of hotel ballrooms.', label: 'See groups and offsites', media: photo('698de65973782acf1018', 2400, 1800) },
  25: { line: 'Small, private, and outdoors.', label: 'See weddings', media: photo('c52099090a2b2ca82d49', 2400, 1601, '50% 34.1%') },
  26: { line: 'Where you actually are.', label: 'See Arenal', media: loop('loop-arenal') },
  // Getting here opens on text, and its first photograph (the golf cart) already closes the Arenal page's last
  // row of cards, so the door shows the page's other photograph.
  27: { line: 'Three hours by car from San José, two and a half from Liberia, or fly Sansa into La Fortuna.', label: 'See how to get here', media: photo('11358b370ad895b42644', 2400, 1798) },
  28: { line: 'What is worth leaving the property for.', label: 'See what to do around here', media: photo('c497476865b545968151', 2400, 1350) }
};

export function door(index: number): Door {
  const page = pages[index % pages.length];
  const entry = doors[page.index];
  return { page, name: entry.name || page.name, line: entry.line, label: entry.label, media: entry.media };
}
