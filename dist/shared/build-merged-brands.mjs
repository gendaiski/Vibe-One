import fs from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),read=p=>fs.readFile(new URL(p,root),'utf8');
const manifest=JSON.parse(await read('shared/catalogue/manifest.json'));
const sources=await Promise.all(manifest.sources.map(s=>read('shared/catalogue/'+s.file).then(JSON.parse)));
const packed=gzipSync(JSON.stringify({manifest,sources})).toString('base64');
let worker=await read('shared/catalogue-worker.js');
const a=worker.indexOf('async function load(){'),b=worker.indexOf('ready=load();',a);
if(a<0||b<0)throw Error('Worker load markers missing');
worker=worker.slice(0,a)+'async function load(){const bytes=Uint8Array.from(atob('+JSON.stringify(packed)+'),c=>c.charCodeAt(0));const text=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).text();const data=JSON.parse(text);manifest=data.manifest;sources=data.sources;return manifest;}\n'+worker.slice(b);
new vm.Script(worker);
const cache=JSON.parse((await read('shared/catalogue/icons.js')).replace(/^window.CATALOGUE_ICON_CACHE=/,'').replace(/;\s*$/,''));
for(const key of Object.keys(cache)){const name=cache[key].split('/').pop(),ext=name.split('.').pop(),mime=ext==='jpg'?'jpeg':ext==='svg'?'svg+xml':ext;cache[key]='data:image/'+mime+';base64,'+(await fs.readFile(new URL('shared/catalogue/icons/'+name,root))).toString('base64');}
const esc=s=>s.replaceAll('</script','<\\/script');
for(const [folder,name] of [['someone-lawyer','Someone-Lawyer-All-Designs.html'],['ai-company-market','AI-Company-Market-All-Designs.html']]){
 let html=await read(folder+'/variation-01.html');
 html=html.replace('<script src="../shared/catalogue/manifest.js"></script>','<script>window.CATALOGUE_IMPORT='+JSON.stringify(manifest)+';</script>');
 // Use the actual global name emitted by manifest.js.
 html=html.replace('window.CATALOGUE_IMPORT=',(await read('shared/catalogue/manifest.js')).split('=')[0]+'=');
 html=html.replace('<script src="../shared/catalogue/icons.js"></script>','<script>window.CATALOGUE_ICON_CACHE='+JSON.stringify(cache)+';window.MERGED_BRAND=true;window.CATALOGUE_WORKER_SOURCE='+esc(JSON.stringify(worker))+';</script>');
 html=html.replace('window.VARIATION=1;','window.VARIATION=Math.max(1,Math.min(7,Math.trunc(Number(new URLSearchParams(location.search).get("design")))||1));');
 html=html.replace("new Worker('../shared/catalogue-worker.js')","new Worker(URL.createObjectURL(new Blob([window.CATALOGUE_WORKER_SOURCE],{type:'text/javascript'})))");
 for(const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(m[1]);
 await fs.writeFile(new URL(folder+'/index.html',root),html);
 await fs.writeFile(new URL(name,root),html);
 console.log(name+' '+Buffer.byteLength(html)+' bytes; seven designs and full catalogue embedded.');
}
let hub=await read('shared/review-hub.html');
hub=hub.replace("folders[brand]+'/variation-0'+v+'.html#/'","folders[brand]+'/index.html?design='+v+'#/'");
hub=hub.replace('Switch brands, explore every page, and compare the designs in one place.','Two complete brand files. Five designs each. Switch, explore and compare every page.');
hub=hub.replace('<p>Your designs stay intact. This room is for exploring and comparing.</p>','<p><a href="Someone-Lawyer-All-Designs.html">Someone.lawyer · complete HTML ↗</a> &nbsp; <a href="AI-Company-Market-All-Designs.html">AI Company Market · complete HTML ↗</a></p>');
await fs.writeFile(new URL('shared/review-hub.html',root),hub);
await fs.writeFile(new URL('design-studio.html',root),hub);
await import('./install-componentry-native.mjs');
