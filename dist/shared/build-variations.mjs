import fs from 'node:fs/promises';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),read=p=>fs.readFile(new URL(p,root),'utf8');
const css=await read('shared/fonts-embedded.css')+'\n'+await read('shared/style.css')+'\n'+await read('shared/variations.css')+'\n'+await read('shared/fidelity.css')+'\n'+await read('shared/catalogue-upgrade.css')+'\n'+await read('shared/brand-refinement.css')+'\n'+await read('shared/career-import.css')+'\n'+await read('shared/tokenworks-designs.css')+'\n'+await read('shared/reference-pack.css');
const core=(await read('shared/app.js')).split('const originalRender=render;')[0];
const variations=await read('shared/variations.js');
const bootAt=variations.lastIndexOf("shell();$('.skip')");
const script=core+'\n'+variations.slice(0,bootAt)+'\n'+await read('shared/fidelity.js')+'\n'+await read('shared/catalogue-upgrade.js')+'\n'+await read('shared/brand-refinement.js')+'\n'+'window.CAREER_IMPORT='+JSON.stringify(JSON.parse(await read('shared/career-import/selected-sections.json'))).replaceAll('</','<\\/')+';\n'+await read('shared/career-import.js')+'\n'+await read('shared/tokenworks-designs.js')+'\n'+'window.REFERENCE_PACK='+JSON.stringify(JSON.parse(await read('shared/reference-pack.json'))).replaceAll('</','<\\/')+';\nwindow.REFERENCE_CLONES='+JSON.stringify(JSON.parse(await read('shared/reference-clones.json'))).replaceAll('</','<\\/')+';\n'+await read('shared/reference-pack.js')+'\n'+variations.slice(bootAt);new vm.Script(script);
const names=['Marketplace Index','Skills Hub','MCP Market','Technical Registry','AI Templates','Inference Utility','Open Intelligence'];
const refs=['https://claudemarketplaces.com/','https://claudeskills.info/mcp/','https://mcpmarket.com/tools/skills','https://www.claudemarketplace.net/mcp/claude-skills-mcp','https://www.aitmpl.com/','../../Token Works/index.html','../../Token Works/variation-02.html'];
let entries=[];
for(const folder of ['someone-lawyer','ai-company-market']){
 let original;try{original=await read(folder+'/original-design.html')}catch{original=await read(folder+'/index.html');await fs.writeFile(new URL(folder+'/original-design.html',root),original)}
 const brand=JSON.parse(original.match(/window.BRAND=([\s\S]*?);window.CATALOGUE=/)[1]);
 if(brand.id==='lawyer'){brand.tagline='Legal technology infrastructure';brand.headline='Legal technology. Connected.';brand.intro='Research infrastructure, document automation, skills and integrations for modern legal teams.';}
 const data=JSON.parse(await read(folder+'/data.json'));
 for(let v=1;v<=7;v++){
 const page=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${brand.name} · ${names[v-1]}</title><meta name="description" content="${brand.intro}"><style>${css}</style></head><body><div id="app"></div><noscript>Enable JavaScript to browse this local directory.</noscript><script src="../shared/catalogue/manifest.js"></script><script src="../shared/catalogue/icons.js"></script><script>window.BRAND=${JSON.stringify(brand).replaceAll('</','<\\/')};window.CATALOGUE=${JSON.stringify(data).replaceAll('</','<\\/')};window.VARIATION=${v};</script><script>${script}</script></body></html>`;
 await fs.writeFile(new URL(folder+`/variation-0${v}.html`,root),page);if(v===1)await fs.writeFile(new URL(folder+'/index.html',root),page);
 entries.push({brand:brand.name,folder,variation:v,name:names[v-1],file:folder+`/variation-0${v}.html`,reference:refs[v-1]});
 }
}
const hub=await read('shared/review-hub.html');
await fs.writeFile(new URL('design-studio.html',root),hub);
await fs.writeFile(new URL('shared/variations-manifest.json',root),JSON.stringify(entries,null,2));
console.log('Built 14 catalogue-connected variations, 2 default entry points, and comparison hub. Scripts compile.');

await import('./build-merged-brands.mjs');
