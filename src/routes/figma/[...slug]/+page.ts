import {error} from '@sveltejs/kit';
import {pages,parseSlug,type Edition} from '#lib/site.ts';
// Every page in English and, under es/, in Spanish (docs/figma-spanish.md).
export const entries=()=>pages.flatMap(page=>[{slug:page.slug},{slug:page.slug?`es/${page.slug}`:'es'}]);
export function load({params}:{params:{slug?:string}}){const {locale,slug}=parseSlug(params.slug||'');const page=pages.find(p=>p.slug===slug);if(!page)error(404,'Page not found');return {edition:'figma' as Edition,page,locale};}
