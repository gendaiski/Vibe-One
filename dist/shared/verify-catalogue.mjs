import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const base=new URL('./',import.meta.url),manifest=JSON.parse(await fs.readFile(new URL('catalogue/manifest.json',base),'utf8'));
const pending=new Map();let serial=0;
const context=vm.createContext({self:{},Set,Map,Promise,URL,decodeURIComponent,console,fetch:async p=>({ok:true,json:async()=>JSON.parse(await fs.readFile(new URL(p,base),'utf8'))}),postMessage:m=>{const f=pending.get(m.request);if(f){pending.delete(m.request);m.error?f.reject(Error(m.error)):f.resolve(m);}}});
vm.runInContext(await fs.readFile(new URL('catalogue-worker.js',base),'utf8'),context);
const call=(action,payload={})=>new Promise((resolve,reject)=>{const request=++serial;pending.set(request,{resolve,reject});context.self.onmessage({data:{request,action,...payload}});});
const checks=[];
await call('init');
let all=await call('search');assert.equal(all.total,manifest.total);assert.equal(all.records.length,24);checks.push('All indexed records searchable with bounded 24-card pages');
for(const source of manifest.sources){const r=await call('search',{source:source.id});assert.equal(r.total,source.count);assert(r.records.every(d=>d.sourceId===source.id));const last=await call('search',{source:source.id,page:r.pages});assert(last.records.length>0&&last.records.length<=24);const item=last.records.at(-1);const direct=await call('get',{id:item.id});assert.equal(direct.record.listingUrl,item.listingUrl);checks.push(source.name+': count, source filtering, final page and direct detail ID');}
for(const type of manifest.types){const expected=manifest.sources.reduce((n,s)=>n+(s.types[type]||0),0);const r=await call('search',{types:[type]});assert.equal(r.total,expected);assert(r.records.every(d=>d.type===type));checks.push(type+': correct type count and results');}
const found=await call('search',{query:'github'});assert(found.total>0);assert(found.records.every(d=>(d.name+' '+d.summary+' '+d.owner+' '+d.listingUrl).toLowerCase().includes('github')));checks.push('Search matches returned source records');
const saved=await call('search',{savedOnly:true,saved:[found.records[0].id]});assert.equal(saved.total,1);checks.push('Saved-only lookup works for imported records');
const empty=await call('search',{query:'codex-test-no-such-listing-3a175a9'});assert.equal(empty.total,0);assert.equal(empty.records.length,0);checks.push('No-match query returns safe empty result');
const bad=await call('get',{id:'import-9-not-a-record'});assert.equal(bad.record,null);checks.push('Invalid record ID returns null');
const report={testedAt:new Date().toISOString(),total:manifest.total,metadataCount:manifest.metadataCount,checksPassed:checks.length,checks};await fs.writeFile(new URL('catalogue/validation.json',base),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
