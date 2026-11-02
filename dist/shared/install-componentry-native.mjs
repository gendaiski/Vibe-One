import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const output = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspace = path.resolve(output, '../..');
const componentry = path.join(workspace, 'Token Works', 'Reference Clones', 'componentry');
const library = await fs.readFile(path.join(componentry, 'index.html'), 'utf8');
const data = library.match(/<script id="library-data" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
if (!data) throw new Error('Componentry catalogue data missing');
const parsed = JSON.parse(data);
if (parsed.components.length !== 53 || parsed.blocks.length !== 3 || !parsed.collections.length) {
  throw new Error('Componentry catalogue is incomplete');
}
for (const component of parsed.components) {
  if (!component.poster) continue;
  const posterPath = path.join(componentry, 'assets', component.poster.replace(/^\//, ''));
  component.posterData = `data:image/webp;base64,${(await fs.readFile(posterPath)).toString('base64')}`;
}
const bundledData = JSON.stringify(parsed).replaceAll('<', '\\u003c');
const runtime = await fs.readFile(new URL('./componentry-native.js', import.meta.url), 'utf8');
new vm.Script(runtime);

const files = ['Someone-Lawyer-All-Designs.html', 'AI-Company-Market-All-Designs.html'];
for (const brand of ['someone-lawyer', 'ai-company-market']) {
  files.push(`${brand}/index.html`);
  for (let number = 1; number <= 7; number++) files.push(`${brand}/variation-0${number}.html`);
}
const nativeHook = "if(section.route==='ui-components'||section.route==='figma-templates'){window.renderComponentryNative($('#main'),B.id,window.COMPONENTRY_NATIVE_ASSET_BASE,section.route);document.title=B.name+' — '+(section.route==='figma-templates'?'Figma Components':'UI Components Library');document.body.dataset.page=section.route;document.body.classList.remove('catalogue-nav-open');$$('.universal-sidebar a').forEach(a=>a.setAttribute('aria-current',a.hash===location.hash?'page':'false'));return;}";
for (const relative of files) {
  const file = path.join(output, relative);
  let html = await fs.readFile(file, 'utf8');
  html = html.replace(/<script id="componentry-native-data">[\s\S]*?<\/script><script id="componentry-native-runtime">[\s\S]*?<\/script>/g, '');
  const hookStart = html.indexOf("if(section.route==='ui-components'");
  if (hookStart >= 0) {
    const hookEnd = html.indexOf('}let html=searchView(', hookStart);
    if (hookEnd < 0) throw new Error(`Could not replace previous iframe hook in ${relative}`);
    html = html.slice(0, hookStart) + nativeHook + html.slice(hookEnd + 1);
  } else if (!html.includes('renderBeforeNativeComponents=render')) {
    throw new Error(`No native UI Components route in ${relative}`);
  }
  const marker = '<script>window.BRAND=';
  if (!html.includes(marker)) throw new Error(`Brand bootstrap marker missing in ${relative}`);
  const assetBase = path.relative(path.dirname(file), path.join(componentry, 'assets')).replaceAll('\\', '/');
  const scripts = `<script id="componentry-native-data">window.COMPONENTRY_NATIVE_DATA=${bundledData};window.COMPONENTRY_NATIVE_ASSET_BASE=${JSON.stringify(assetBase)};</script><script id="componentry-native-runtime">${runtime.replaceAll('</script', '<\\/script')}</script>`;
  html = html.replace(marker, () => scripts + marker);
  if (html.includes('componentry-embedded') || html.includes('<iframe title="Complete offline Componentry library"')) {
    throw new Error(`Legacy iframe remains in ${relative}`);
  }
  await fs.writeFile(file, html);
  console.log(`Native Componentry: ${relative}`);
}
