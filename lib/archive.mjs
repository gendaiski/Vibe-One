import {deflateRawSync} from 'node:zlib';

const table=new Uint32Array(256);
for(let n=0;n<256;n++){let value=n;for(let bit=0;bit<8;bit++)value=value&1?0xedb88320^(value>>>1):value>>>1;table[n]=value>>>0;}
function crc32(bytes){let value=0xffffffff;for(const byte of bytes)value=table[(value^byte)&255]^(value>>>8);return (value^0xffffffff)>>>0;}
function timestamp(value){const date=new Date(value||Date.now());const year=Math.min(2107,Math.max(1980,date.getUTCFullYear()));return {time:(date.getUTCHours()<<11)|(date.getUTCMinutes()<<5)|(date.getUTCSeconds()>>>1),date:((year-1980)<<9)|((date.getUTCMonth()+1)<<5)|date.getUTCDate()};}

export function createZip(entries){
 if(entries.length>65535)throw new Error('Too many files for a standard ZIP.');
 const locals=[],central=[],names=new Set();let offset=0,centralSize=0;
 for(const entry of entries){
  if(typeof entry.name!=='string'||!entry.name||entry.name.includes('\\')||entry.name.startsWith('/')||entry.name.split('/').some(part=>!part||part==='.'||part==='..'||/[<>:"|?*\x00-\x1f\x7f]/.test(part)||/[. ]$/.test(part)||/^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part)))throw new Error('Invalid ZIP entry path.');
  const portable=entry.name.toLowerCase();if(names.has(portable))throw new Error('ZIP paths collide when extracted on Windows.');names.add(portable);
  const name=Buffer.from(entry.name,'utf8'),bytes=entry.bytes;if(!Buffer.isBuffer(bytes)||name.length>65535||bytes.length>0xffffffff)throw new Error('ZIP entry exceeds standard format limits.');
  const compressed=deflateRawSync(bytes,{level:6}),data=compressed.length<bytes.length?compressed:bytes,method=data===compressed?8:0,crc=crc32(bytes),stamp=timestamp(entry.modifiedAt);
  const local=Buffer.alloc(30);local.writeUInt32LE(0x04034b50);local.writeUInt16LE(20,4);local.writeUInt16LE(0x0800,6);local.writeUInt16LE(method,8);local.writeUInt16LE(stamp.time,10);local.writeUInt16LE(stamp.date,12);local.writeUInt32LE(crc,14);local.writeUInt32LE(data.length,18);local.writeUInt32LE(bytes.length,22);local.writeUInt16LE(name.length,26);
  locals.push(local,name,data);
  const record=Buffer.alloc(46);record.writeUInt32LE(0x02014b50);record.writeUInt16LE((3<<8)|20,4);record.writeUInt16LE(20,6);record.writeUInt16LE(0x0800,8);record.writeUInt16LE(method,10);record.writeUInt16LE(stamp.time,12);record.writeUInt16LE(stamp.date,14);record.writeUInt32LE(crc,16);record.writeUInt32LE(data.length,20);record.writeUInt32LE(bytes.length,24);record.writeUInt16LE(name.length,28);record.writeUInt32LE((0o100644<<16)>>>0,38);record.writeUInt32LE(offset,42);
  central.push(record,name);centralSize+=record.length+name.length;offset+=local.length+name.length+data.length;if(offset+centralSize>0xffffffff)throw new Error('ZIP archive exceeds standard format limits.');
 }
 const end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(entries.length,8);end.writeUInt16LE(entries.length,10);end.writeUInt32LE(centralSize,12);end.writeUInt32LE(offset,16);
 return Buffer.concat([...locals,...central,end]);
}
