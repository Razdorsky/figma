import fs from 'node:fs/promises';
const sources={blueprint:'src/lib/blueprint/site-data.json',figma:'src/lib/site-data.json','figma-enhanced':'src/lib/enhanced/site-data.json','figma-pr':'src/lib/pr/site-data.json'};
const pagesFor={};for(const [edition,file] of Object.entries(sources))pagesFor[edition]=JSON.parse(await fs.readFile(file,'utf8'));
const base=(process.env.SITE_BASE_PATH||'').replace(/\/$/,'');
// Blueprint pages also exist in Spanish under /blueprint/es/.
const localesFor={blueprint:['en','es'],figma:['en'],'figma-enhanced':['en'],'figma-pr':['en']};
const routes=['blueprint','figma','figma-enhanced','figma-pr'].flatMap(edition=>localesFor[edition].flatMap(locale=>pagesFor[edition].map(p=>{const slug=[locale==='en'?'':locale,p.slug].filter(Boolean).join('/');return {edition,locale,index:p.index,slug,path:`${base}/${edition}/${slug?slug+'/':''}`};})));
await fs.writeFile('dist/routes.json',JSON.stringify(routes,null,2)+'\n');
// The shared page shell says lang="en"; the Spanish pages say what they are.
for(const route of routes.filter(r=>r.locale==='es')){const file=`dist/${route.edition}/${route.slug}/index.html`;const html=await fs.readFile(file,'utf8');await fs.writeFile(file,html.replace('<html lang="en"','<html lang="es"'));}
console.log(`SvelteKit prerendered ${routes.length} edition pages`);
