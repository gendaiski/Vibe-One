import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const output = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = ['Someone-Lawyer-All-Designs.html','AI-Company-Market-All-Designs.html'];
for (const brand of ['someone-lawyer','ai-company-market']) {
  pages.push(`${brand}/index.html`);
  for (let number=1; number<=7; number++) pages.push(`${brand}/variation-0${number}.html`);
}
for (const relative of pages) {
  const file = path.join(output, relative);
  const html = await fs.readFile(file, 'utf8');
  const dataMatch = html.match(/<script id="componentry-native-data">window\.COMPONENTRY_NATIVE_DATA=([\s\S]*?);window\.COMPONENTRY_NATIVE_ASSET_BASE=("[^"]+");<\/script>/);
  const runtimeMatch = html.match(/<script id="componentry-native-runtime">([\s\S]*?)<\/script>/);
  if (!dataMatch || !runtimeMatch) throw new Error(`Native library missing: ${relative}`);
  if ((html.match(/id="componentry-native-runtime"/g)||[]).length !== 1) throw new Error(`Duplicate runtime: ${relative}`);
  if (html.includes('class="componentry-embedded"')) throw new Error(`Old iframe hook remains: ${relative}`);
  if (!html.includes('window.renderComponentryNative($(\'#main\')')) throw new Error(`Native route missing: ${relative}`);
  if (!html.includes("section.route==='ui-components'||section.route==='figma-templates'")) throw new Error(`Figma route missing: ${relative}`);
  const data = JSON.parse(dataMatch[1]);
  if (data.components.length !== 53 || data.blocks.length !== 3 || !data.collections.length) throw new Error(`Incomplete catalogue: ${relative}`);
  if (data.components.filter(component => component.posterData?.startsWith('data:image/webp;base64,')).length !== 48) throw new Error(`Embedded poster coverage incomplete: ${relative}`);
  new vm.Script(runtimeMatch[1], {filename: relative + ':componentry'});
  for (const match of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\btype=/.test(match[1])) continue;
    new vm.Script(match[2], {filename: relative + ':inline'});
  }
  const assetBase = JSON.parse(dataMatch[2]);
  for (const component of data.components) {
    for (const media of [component.poster, component.video]) {
      if (media && !(await fs.stat(path.resolve(path.dirname(file), assetBase, media.replace(/^\//,''))).then(x=>x.isFile()).catch(()=>false))) {
        throw new Error(`Missing local media ${media}: ${relative}`);
      }
    }
  }
}
console.log(`Verified ${pages.length} brand pages: UI and Figma component routes, 53 components, 48 embedded posters, source runtime, and local video media.`);
