// Figma Enhanced edition: its own page list and media aliases, copied from the frozen Figma edition.
import sourcePages from './site-data.json';
import media from './media.json';
export type Edition = 'figma-enhanced';
export type PageMeta = {index:number;id:string;name:string;slug:string;photo:boolean};
export const pages:PageMeta[]=sourcePages;
import type {Locale} from './i18n.ts';
// Orbe's booking page in the reader's language (owner, 2026-11-09: the Spanish booking page is /es/).
export const bookingFor=(locale:Locale='en')=>`https://reservations.orbebooking.com/Search/Init/PAS6c/${locale}/`;
export const booking=bookingFor('en');
// Spanish pages live under /figma-enhanced/es/ (docs/figma-enhanced-spanish.md).
export const route=(edition:Edition,slug='',base='',locale:Locale='en')=>`${base.replace(/\/$/,'')}/${edition}/${locale==='es'?'es/':''}${slug?slug+'/':''}`;
/** A route parameter such as "es/villas" split into its language and page slug. */
export function parseSlug(param=''):{locale:Locale;slug:string}{const clean=param.replace(/^\/|\/$/g,'');return clean==='es'||clean.startsWith('es/')?{locale:'es',slug:clean.slice(3)}:{locale:'en',slug:clean};}
export function photo(index:number){const aliases=(media.find(p=>p.index===index)?.aliases||{}) as Record<string,string>;return Object.entries(aliases).find(([key,url])=>!/Logo|Wordmark|Symbol|Pattern|Color|Group|Vector/i.test(key)&&!url.endsWith('.svg'))?.[1]||Object.values(aliases).find(u=>!u.endsWith('.svg'))||'';}
export const canvas=(_edition:string,_index:number)=>'#ffffff';

export const base=__SITE_BASE__;
