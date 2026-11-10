import type {Handle} from '@sveltejs/kit/hooks';
import {base} from '#lib/site.ts';
import * as figma from '#lib/site.ts';
import * as blueprint from '#lib/blueprint/site.ts';
import * as enhanced from '#lib/enhanced/site.ts';
import * as pr from '#lib/pr/site.ts';
// Each edition supplies its own page list and canvas colour.
export const handle:Handle=async({event,resolve})=>{const [edition='',...parts]=event.url.pathname.slice(base.length).split('/').filter(Boolean);// Figma, Figma Enhanced and Figma PR pages also exist in Spanish under <edition>/es/.
const spanish=(edition==='figma'||edition==='figma-enhanced'||edition==='figma-pr')&&parts[0]==='es';const slug=(spanish?parts.slice(1):parts).join('/');const chosen=edition==='blueprint'||edition==='figma'||edition==='figma-enhanced'||edition==='figma-pr'?edition:'';const page=(chosen==='blueprint'?blueprint.pages:chosen==='figma-enhanced'?enhanced.pages:chosen==='figma-pr'?pr.pages:figma.pages).find(p=>p.slug===slug);const color=chosen==='blueprint'?blueprint.canvas(page?.index||0):chosen==='figma-enhanced'?enhanced.canvas(chosen,page?.index||0):chosen==='figma-pr'?pr.canvas(chosen,page?.index||0):figma.canvas(chosen,page?.index||0);return resolve(event,{transformPageChunk:({html})=>html.replaceAll('__CANVAS__',color).replaceAll('__EDITION__',chosen).replaceAll('__PAGE__',page?.slug||'home').replaceAll('__HERO__',page?.photo?'photo':'paper').replace('<html lang="en"',spanish?'<html lang="es"':'<html lang="en"')});};
