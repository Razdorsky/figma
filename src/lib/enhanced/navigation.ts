// The designer's six menu groups (components/Menu.svelte) and the photograph that stands for each page in the mega
// panels and the menu preview (placement map, 2026-11-08). A page is shown by the photograph it opens with; a page
// that opens on text by the first photograph a reader meets on it. Glamping Tents shares the Villas' opener, so it
// shows a tent.
import { pages, type PageMeta } from '#lib/enhanced/site.ts';
import { msg } from '#lib/enhanced/i18n.ts';

const covers: Record<number, string> = {
  1: '81536a0be9ccf3efc5a4', 2: '0b6f7938d784334e4a7e', 3: '2b61d0b9909a48665218', 4: '38bd44acd09f7a1caa67',
  5: '1cf43cba02fcc0f90ae8', 6: '53aa5ba8e622d63f0ff1', 7: '81f157d1df8ad03594c6', 8: 'f5ec5ec1897cef56ade3',
  9: 'a32b1d05d2deb9142826', 10: '217d8eafeb5342a6cc73', 11: '52f6dfa2f4537874ca20', 12: 'ea5d3eb36b2031e294f0',
  13: 'df44479df6d2cfd7b1f9', 14: 'fe78e39c5c2e5fd2d9bc', 15: '59adbe80393e61e87dcf', 16: 'b4c9be4660b101bab3d7',
  17: 'fd2dd896fcf8cdc9c5d5', 18: '7bdd0284db793a2b6023', 19: 'fb2fb92538ca4c2ce0c1', 20: 'f5ec5ec1897cef56ade3',
  21: '9203238de1f599aa3053', 22: '11358b370ad895b42644', 23: 'd9f40ebd73fab0a92370', 24: '698de65973782acf1018',
  25: 'c52099090a2b2ca82d49', 26: '21ac2d49d2ab56699e04', 27: 'bc1c3e7f217cc52b0c86', 28: 'c497476865b545968151'
};
export const cover = (index: number) => `/media/${covers[index]}.webp`;
// The same photograph at 640px for the mega panels and the menu preview, which show it at about 260–380px.
export const thumb = (index: number) => `/media/thumbs/${covers[index]}.webp`;

export type NavGroup = { id: string; title: string; overview?: PageMeta; items: PageMeta[] };

// In the order of the designer's menu. The header shows as many as fit beside MENU (header.css, data-rank); The
// Property has no overview page.
export const groups: NavGroup[] = [
  { id: 'stay', title: msg('Where you sleep'), overview: pages[1], items: pages.slice(2, 6) },
  { id: 'experiences', title: msg('Experiences'), overview: pages[6], items: pages.slice(7, 13) },
  { id: 'property', title: msg('The Property'), items: pages.slice(13, 18) },
  { id: 'eating', title: msg('Eating here'), overview: pages[18], items: pages.slice(19, 21) },
  { id: 'whole', title: msg('Take the whole property'), overview: pages[21], items: pages.slice(22, 25) },
  { id: 'visit', title: msg('Plan your visit'), overview: pages[25], items: pages.slice(26, 28) }
];
