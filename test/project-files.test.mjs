import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,readFileSync,writeFileSync,existsSync,symlinkSync,truncateSync,unlinkSync} from 'node:fs';
import {inflateRawSync} from 'node:zlib';
import path from 'node:path';
import {createZip} from '../lib/archive.mjs';

const base=path.resolve('.runtime/tests');mkdirSync(base,{recursive:true});const scratch=mkdtempSync(path.join(base,'project-files-'));
process.env.WB_RUNTIME_DIR=path.join(scratch,'runtime');process.env.WB_PROJECTS_ROOT=path.join(scratch,'projects');
const e=await import('../lib/engine.mjs');
const owned=work=>e.withOwner('file-owner',work);
const create=name=>owned(()=>e.createProject({name,edition:'one'}));
function put(p,name,bytes){const file=path.join(p.directory,name);mkdirSync(path.dirname(file),{recursive:true});writeFileSync(file,bytes);}
function unzip(buffer){
 const end=buffer.length-22;assert.equal(buffer.readUInt32LE(end),0x06054b50);const count=buffer.readUInt16LE(end+10),central=buffer.readUInt32LE(end+16);assert.equal(central+buffer.readUInt32LE(end+12),end);
 const result=new Map();let position=0;
 while(position<central){assert.equal(buffer.readUInt32LE(position),0x04034b50);const flags=buffer.readUInt16LE(position+6),method=buffer.readUInt16LE(position+8),compressed=buffer.readUInt32LE(position+18),size=buffer.readUInt32LE(position+22),nameLength=buffer.readUInt16LE(position+26),extraLength=buffer.readUInt16LE(position+28);assert(flags&0x0800);const name=buffer.subarray(position+30,position+30+nameLength).toString('utf8'),start=position+30+nameLength+extraLength,data=buffer.subarray(start,start+compressed),bytes=method===8?inflateRawSync(data):data;assert([0,8].includes(method));assert.equal(bytes.length,size);assert(!result.has(name));result.set(name,bytes);position=start+compressed;}
 assert.equal(position,central);assert.equal(result.size,count);return result;
}

test('rename preserves Unicode text and rejects stale, existing, case-only and private paths',async()=>{
 const p=await create('Rename boundaries');await owned(async()=>{
  e.editFile(p.id,'app.js','const greeting = "Café 👋";\n');const original=e.fileInfo(p.id,'app.js');
  assert.throws(()=>e.renameFile(p.id,'app.js','next.js','stale'),{status:409});assert.equal(e.fileInfo(p.id,'app.js').text,original.text);
  e.editFile(p.id,'occupied.js','keep this');assert.throws(()=>e.renameFile(p.id,'app.js','occupied.js',original.hash),{status:409});assert.equal(e.fileInfo(p.id,'occupied.js').text,'keep this');
  assert.throws(()=>e.renameFile(p.id,'app.js','APP.JS',original.hash),{status:409});
  for(const destination of ['../escape.js','nested/../../escape.js','C:/escape.js','/absolute.js','.git/config','.git./config','.git /config','.ENV.local','.ssh/id_rsa','file.js.','CON.txt','nested//file.js','AGENTS.md','PROJECT.md','TASKS.md','.gitignore'])assert.throws(()=>e.renameFile(p.id,'app.js',destination,original.hash),{status:403},destination);
  for(const privatePath of ['.git./config','.git /config','.ssh./id_rsa','NUL.txt'])assert.throws(()=>e.resolveFile(p,privatePath),{status:403});
  const outside=path.join(scratch,'rename-outside');mkdirSync(outside);writeFileSync(path.join(outside,'private.txt'),'private');symlinkSync(outside,path.join(p.directory,'linked'),process.platform==='win32'?'junction':'dir');assert.throws(()=>e.renameFile(p.id,'app.js','linked/copied.js',original.hash),{status:403});assert.throws(()=>e.renameFile(p.id,'linked/private.txt','copied.txt','hash'),{status:403});
  assert.throws(()=>e.renameFile(p.id,'PROJECT.md','renamed.md',e.fileInfo(p.id,'PROJECT.md').hash),{status:403});
  put(p,'binary.bin',Buffer.from([0,255,1]));assert.throws(()=>e.renameFile(p.id,'binary.bin','moved.bin','hash'),{status:415});
  const result=e.renameFile(p.id,'app.js','docs/Café.txt',original.hash);assert.deepEqual(result,{path:'docs/Café.txt',hash:original.hash});assert(!existsSync(path.join(p.directory,'app.js')));assert.equal(e.fileInfo(p.id,result.path).text,original.text);
  await e.withOwner('other-owner',async()=>{assert.throws(()=>e.renameFile(p.id,result.path,'stolen.txt',result.hash),{status:404});assert.throws(()=>e.exportProject(p.id),{status:404});});
 });
});

test('saving a deleted revision requires an explicit restoration',async()=>{
 const p=await create('Deleted revision');owned(()=>{e.editFile(p.id,'draft.txt','original');const revision=e.fileInfo(p.id,'draft.txt');unlinkSync(path.join(p.directory,'draft.txt'));assert.throws(()=>e.editFile(p.id,'draft.txt','local edit',revision.hash),{status:409});assert(!existsSync(path.join(p.directory,'draft.txt')));e.editFile(p.id,'draft.txt','restored');assert.equal(e.fileInfo(p.id,'draft.txt').text,'restored');});
});

test('ZIP export preserves source and binary references while excluding private files and build output',async()=>{
 const p=await create('ZIP source');await owned(async()=>{
  const source={'src/auth.ts':'export const auth = true;','auth/handler.js':'export const handler = true;','accounts/model.ts':'export const account = true;','src/tokens.css':':root { --token: 1; }','src/credentials.ts':'export const fields = [];','src/service-account.ts':'export const service = true;','docs/Café.txt':'Café 👋\n','context/reference.bin':Buffer.from([0,255,1,128,99]),'index.html':'<h1>Export me</h1>','repeat.txt':'repeat '.repeat(1000)};for(const [name,bytes] of Object.entries(source))put(p,name,bytes);
  const privateFiles=['.env','.ENV.production','production.env','.git-credentials','.netrc','.aws/credentials','.ssh/id_rsa','auth.json','accounts.sqlite','tokens.json','credentials.json','secrets.yaml','service-account-prod.json','certificates/private.pem','.runtime/state.json','node_modules/pkg/index.js','dist/index.html','build/index.html','coverage/report.txt'];for(const name of privateFiles)put(p,name,'DO_NOT_EXPORT');
  const outside=path.join(scratch,'outside');mkdirSync(outside);writeFileSync(path.join(outside,'private.txt'),'DO_NOT_EXPORT_LINK');symlinkSync(outside,path.join(p.directory,'linked'),process.platform==='win32'?'junction':'dir');
  const exported=e.exportProject(p.id),entries=unzip(exported.buffer);assert.equal(exported.fileCount,entries.size);assert(exported.filename.endsWith('.zip'));assert(exported.totalBytes<=50*1024*1024);
  for(const [name,bytes] of Object.entries(source))assert.deepEqual(entries.get(name),Buffer.isBuffer(bytes)?bytes:Buffer.from(bytes),name);
  for(const name of privateFiles)assert(!entries.has(name),name);assert(![...entries.keys()].some(name=>name.startsWith('.git/')||name.startsWith('linked/')));assert(entries.has('PROJECT.md'));assert(entries.has('AGENTS.md'));assert(entries.has('TASKS.md'));assert(!exported.buffer.includes(Buffer.from('DO_NOT_EXPORT')));
  writeFileSync(path.join(scratch,'verified-export.zip'),exported.buffer);
 });
});

test('rename and export refuse an active project job',async()=>{
 const p=await create('Busy project');await owned(async()=>{
  put(p,'app.js','const ready = true;\n');put(p,'package.json',JSON.stringify({scripts:{check:'node -e "setTimeout(()=>{},150)"'}}));const original=e.fileInfo(p.id,'app.js'),job=e.verify(p.id);
  assert.throws(()=>e.renameFile(p.id,'app.js','next.js',original.hash),{status:409});assert.throws(()=>e.exportProject(p.id),{status:409});
  let current=job;for(let n=0;n<150&&current.status==='running';n++){await new Promise(resolve=>setTimeout(resolve,100));current=e.job(job.id);}assert.equal(current.status,'completed');
 });
});

test('exports fail explicitly at file, source byte and directory-depth limits',async()=>{
 const many=await create('Many source files');for(let n=0;n<1000;n++)put(many,'files/'+n+'.txt','x');owned(()=>assert.throws(()=>e.exportProject(many.id),{status:413}));
 const large=await create('Large source file');put(large,'large.bin','');truncateSync(path.join(large.directory,'large.bin'),50*1024*1024);owned(()=>assert.throws(()=>e.exportProject(large.id),{status:413}));
 const deep=await create('Deep folders');put(deep,Array(22).fill('level').join('/')+'/source.txt','x');owned(()=>assert.throws(()=>e.exportProject(deep.id),{status:413}));
});

test('standard ZIP headers include the known CRC and reject unsafe extraction names',()=>{
 const zip=createZip([{name:'known.txt',bytes:Buffer.from('123456789')}]);assert.equal(zip.readUInt32LE(14),0xcbf43926);assert.equal(unzip(zip).get('known.txt').toString(),'123456789');
 for(const name of ['../escape','/absolute','C:/drive','folder\\file','bad\0name','CON.txt','file.txt.'])assert.throws(()=>createZip([{name,bytes:Buffer.from('x')}]));
 assert.throws(()=>createZip([{name:'app.js',bytes:Buffer.from('a')},{name:'APP.JS',bytes:Buffer.from('b')}]));
});
