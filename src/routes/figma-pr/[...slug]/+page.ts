import {error} from '@sveltejs/kit';
import {pages,type Edition} from '#lib/pr/site.ts';
export const entries=()=>pages.map(page=>({slug:page.slug}));
export function load({params}:{params:{slug?:string}}){const page=pages.find(p=>p.slug===(params.slug||'').replace(/^\/|\/$/g,''));if(!page)error(404,'Page not found');return {edition:'figma-pr' as Edition,page};}
