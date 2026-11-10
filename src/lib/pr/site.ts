// Figma PR edition (owner, 2026-11-10): a copy of the frozen Figma edition converted into the design system of the
// PR team's references (Rosewood Mayakoba, with Four Seasons Bangkok's motion). See docs/figma-pr-system.md.
import sourcePages from './site-data.json';
import media from './media.json';
export type Edition = 'figma-pr';
export type PageMeta = {index:number;id:string;name:string;slug:string;photo:boolean};
export const pages:PageMeta[]=sourcePages;
import type {Locale} from './i18n.ts';
// Orbe's booking page in the reader's language: /en/ or /es/ (owner, 2026-11-09).
export const bookingPage=(locale:Locale='en')=>`https://reservations.orbebooking.com/Search/Init/PAS6c/${locale}/`;
export const booking=bookingPage('en');
// Orbe opens its results for given dates and guests at this address (docs/figma-pr-system.md, "Booking bar").
export const bookingFor=(checkIn:string,checkOut:string,adults:number,locale:Locale='en')=>`https://reservations.orbebooking.com/Search/SearchAvailability/PAS6c/${locale}/${checkIn.replaceAll('-','')}/${checkOut.replaceAll('-','')}/${adults}/0/`;
// Spanish pages live under /figma-pr/es/ (docs/figma-spanish.md).
export const route=(edition:Edition,slug='',base='',locale:Locale='en')=>`${base.replace(/\/$/,'')}/${edition}/${locale==='es'?'es/':''}${slug?slug+'/':''}`;
/** A route parameter such as "es/villas" split into its language and page slug. */
export function parseSlug(param=''):{locale:Locale;slug:string}{const clean=param.replace(/^\/|\/$/g,'');return clean==='es'||clean.startsWith('es/')?{locale:'es',slug:clean.slice(3)}:{locale:'en',slug:clean};}
export function photo(index:number){const aliases=(media.find(p=>p.index===index)?.aliases||{}) as Record<string,string>;return Object.entries(aliases).find(([key,url])=>!/Logo|Wordmark|Symbol|Pattern|Color|Group|Vector/i.test(key)&&!url.endsWith('.svg'))?.[1]||Object.values(aliases).find(u=>!u.endsWith('.svg'))||'';}
export const canvas=(_edition:string,_index:number)=>'#FAFBF5';

export const base=__SITE_BASE__;
