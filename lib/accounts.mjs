import {scrypt as derive,randomBytes,randomUUID,createHash,timingSafeEqual} from 'node:crypto';
import {promisify} from 'node:util';
import {readFileSync,writeFileSync,mkdirSync,renameSync} from 'node:fs';
import path from 'node:path';
const scrypt=promisify(derive),hash=x=>createHash('sha256').update(x).digest('hex');
export function accountError(message,status=400){const e=new Error(message);e.status=status;throw e;}
export function createAccounts(directory){mkdirSync(directory,{recursive:true});const file=path.join(directory,'accounts.json');let db={users:[],sessions:[]};try{db=JSON.parse(readFileSync(file,'utf8'));}catch(e){if(e.code!=='ENOENT')throw e;}const attempts=new Map();
 function save(){writeFileSync(file+'.tmp',JSON.stringify(db,null,2));renameSync(file+'.tmp',file);}
 function publicUser(u){return {id:u.id,name:u.name,email:u.email,role:u.role,defaultEdition:u.defaultEdition,access:u.access,billing:{configured:false,mode:'local-trial'},createdAt:u.createdAt};}
 function edition(value){if(!['one','law'].includes(value))accountError('Choose Vibe One or Vibe Law.');return value;}
 function session(u){db.sessions=db.sessions.filter(s=>s.expires>Date.now());const token=randomBytes(32).toString('hex');db.sessions.push({hash:hash(token),userId:u.id,expires:Date.now()+7*86400000});save();return {user:publicUser(u),token};}
 function limit(key){const a=attempts.get(key)||{count:0,since:Date.now()};if(Date.now()-a.since>600000){a.count=0;a.since=Date.now();}a.count++;attempts.set(key,a);if(a.count>15)accountError('Too many sign-in attempts. Try again in a few minutes.',429);}
 return {
  admin(input,ip){if(!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(ip))accountError('Admin access is local-only.',403);limit(ip);if(!timingSafeEqual(Buffer.from(hash(String(input.passkey||''))),Buffer.from(hash('12345'))))accountError('Incorrect admin passkey.',401);let u=db.users.find(x=>x.role==='owner');if(!u){u={id:randomUUID(),name:'Admin',email:'admin@vibe.local',salt:randomBytes(16).toString('hex'),passwordHash:randomBytes(64).toString('hex'),role:'owner',defaultEdition:'one',access:{one:null,law:null},createdAt:new Date().toISOString()};db.users.push(u);}for(const offering of ['one','law'])if(!u.access[offering])u.access[offering]={kind:'local-trial',activatedAt:new Date().toISOString()};return session(u);},
  async register(input,ip='local'){limit(ip);const email=String(input.email||'').trim().toLowerCase(),password=String(input.password||''),name=String(input.name||'').trim().slice(0,80),selected=edition(input.edition||'one');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>200)accountError('Enter a valid email address.');if(password.length<10||password.length>200)accountError('Use a password between 10 and 200 characters.');if(!name)accountError('Enter your name.');if(db.users.some(u=>u.email===email))accountError('This email is already registered.',409);const salt=randomBytes(16).toString('hex'),passwordHash=(await scrypt(password,salt,64)).toString('hex');if(db.users.some(u=>u.email===email))accountError('This email is already registered.',409);const access={one:null,law:null};access[selected]={kind:'local-trial',activatedAt:new Date().toISOString()};const u={id:randomUUID(),name,email,salt,passwordHash,role:db.users.length?'member':'owner',defaultEdition:selected,access,createdAt:new Date().toISOString()};db.users.push(u);return session(u);},
  async login(input,ip='local'){limit(ip);const email=String(input.email||'').trim().toLowerCase(),password=String(input.password||'');if(password.length>200)accountError('Invalid email or password.',401);const u=db.users.find(u=>u.email===email);const expected=u?.passwordHash||'00'.repeat(64),salt=u?.salt||'invalid-account';const actual=await scrypt(password,salt,64);if(!u||!timingSafeEqual(Buffer.from(expected,'hex'),actual))accountError('Invalid email or password.',401);return session(u);},
  user(token){if(!token||!/^[0-9a-f]{64}$/.test(token))return null;const s=db.sessions.find(s=>s.hash===hash(token)&&s.expires>Date.now());return s?db.users.find(u=>u.id===s.userId)||null:null;},
  require(token){const u=this.user(token);if(!u)accountError('Sign in to your Vibe account.',401);return u;},
  profile(u){return publicUser(u);},
  update(u,input){if(typeof input.name==='string'&&input.name.trim())u.name=input.name.trim().slice(0,80);if(input.defaultEdition){const e=edition(input.defaultEdition);if(!u.access[e])accountError('Activate this offering in your account first.',403);u.defaultEdition=e;}save();return publicUser(u);},
  activate(u,value){const e=edition(value);if(!u.access[e])u.access[e]={kind:'local-trial',activatedAt:new Date().toISOString()};save();return publicUser(u);},
  logout(token){db.sessions=db.sessions.filter(s=>s.hash!==hash(token||''));save();},
  mayUse(u,value){const e=edition(value);if(!u.access[e])accountError('Activate '+(e==='law'?'Vibe Law':'Vibe One')+' in your account first.',403);return e;}
 };
}
