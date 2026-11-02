import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const output = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

class FakeElement {
  constructor() {
    this.dataset = {};
    this.attributes = {};
    this.innerHTML = '';
    this.classList = {add() {}, remove() {}, contains() { return false; }};
  }
  setAttribute(name, value) { this.attributes[name] = value; }
  getAttribute(name) { return this.attributes[name]; }
  attachShadow() { this.shadowRoot = new FakeShadow(); return this.shadowRoot; }
  replaceChildren(...children) { this.children = children; }
  querySelector() { return null; }
  querySelectorAll(selector) {
    if (selector !== '[data-kind]') return [];
    if (!this.cards) this.cards = [...this.innerHTML.matchAll(/<button type="button" class="card" data-kind="([^"]+)" data-slug="([^"]+)"/g)]
      .map(([, kind, slug]) => { const card = new FakeElement(); card.dataset = {kind, slug}; return card; });
    return this.cards;
  }
  append(child) { this.children = [...(this.children || []), child]; }
  addEventListener() {}
  focus() {}
}

class FakeShadow extends FakeElement {
  constructor() { super(); this.nodes = new Map(); }
  querySelector(selector) {
    if (!this.nodes.has(selector)) this.nodes.set(selector, new FakeElement());
    return this.nodes.get(selector);
  }
}

for (const [file, brand] of [
  ['Someone-Lawyer-All-Designs.html', 'lawyer'],
  ['AI-Company-Market-All-Designs.html', 'ai']
]) {
  const html = await fs.readFile(path.join(output, file), 'utf8');
  const dataScript = html.match(/<script id="componentry-native-data">([\s\S]*?)<\/script>/)?.[1];
  const runtime = html.match(/<script id="componentry-native-runtime">([\s\S]*?)<\/script>/)?.[1];
  if (!dataScript || !runtime) throw new Error(`Missing native scripts: ${file}`);
  for (const entry of ['ui-components', 'figma-templates']) {
    const context = {
      window: {},
      document: {createElement: () => new FakeElement()},
      localStorage: {getItem: () => null},
      setTimeout,
      console
    };
    vm.createContext(context);
    vm.runInContext(dataScript, context);
    vm.runInContext(runtime, context);
    const main = new FakeElement();
    context.window.renderComponentryNative(main, brand, '../../assets', entry);
    const host = main.children?.[0];
    const shadow = host?.shadowRoot;
    const catalogue = shadow?.querySelector('#content').innerHTML || '';
    const count = (catalogue.match(/class="card"/g) || []).length;
    if (count !== 53) throw new Error(`${file} ${entry}: rendered ${count} cards`);
    if (!catalogue.includes('data:image/webp;base64,')) throw new Error(`${file} ${entry}: embedded posters missing`);
    if (!catalogue.includes('class="live-preview grain-gradient"')) throw new Error(`${file} ${entry}: live fallback missing`);
    if (!shadow.innerHTML.includes(entry === 'figma-templates' ? 'Figma Components' : 'UI Components Library')) {
      throw new Error(`${file} ${entry}: incorrect gallery heading`);
    }
    const cards = shadow.querySelector('#content').querySelectorAll('[data-kind]');
    cards[0].onclick();
    if (!shadow.querySelector('#preview').innerHTML.includes('live-preview grain-gradient')) {
      throw new Error(`${file} ${entry}: missing visual detail fallback`);
    }
    cards.find(card => card.dataset.slug === 'annotated-text').onclick();
    if (!shadow.querySelector('#preview').children?.[0]?.src?.endsWith('annotatedtext.mp4')) {
      throw new Error(`${file} ${entry}: video detail did not open`);
    }
    const theme = shadow.querySelector('#theme');
    theme.onclick();
    if (host.dataset.mode !== 'brand') throw new Error(`${file} ${entry}: brand light switch failed`);
  }
  console.log(`${file}: both entry routes render 53 visual cards and the light switch works`);
}
