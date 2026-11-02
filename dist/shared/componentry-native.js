/* Native Componentry catalogue for the two brand HTML builds. MIT source attribution stays visible. */
(function () {
  const data = window.COMPONENTRY_NATIVE_DATA;
  if (!data || !Array.isArray(data.components)) return;
  const icons = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    moon: '<path d="M20.8 15.7A9 9 0 0 1 8.3 3.2 9 9 0 1 0 20.8 15.7Z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    blocks: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><path d="M3 15h18M3 20h18"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    close: '<path d="M5 5l14 14M19 5 5 19"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4M4 17v3h16v-3"/>'
  };
  const svg = name => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const css = `
    :host{display:block;--c-bg:#0d120f;--c-card:#171f19;--c-raised:#212b23;--c-ink:#f2f7ef;--c-muted:#a7b8a9;--c-line:#344238;--c-accent:#c2f879;--c-accent-ink:#10200d;--c-code:#101a13;color:var(--c-ink);font:14px/1.55 Arial,Helvetica,sans-serif}
    :host([data-mode="brand"]){--c-bg:#f4f8f2;--c-card:#fff;--c-raised:#e8f0e7;--c-ink:#17271c;--c-muted:#52685a;--c-line:#cddccd;--c-accent:#24794e;--c-accent-ink:#fff;--c-code:#f6faf6}
    :host([data-brand="market"][data-mode="brand"]){--c-bg:#f3f6fa;--c-card:#fff;--c-raised:#e8eff7;--c-ink:#172536;--c-muted:#526477;--c-line:#cdd9e7;--c-accent:#256cab;--c-accent-ink:#fff;--c-code:#f7faff}
    *{box-sizing:border-box}button,input{font:inherit}button{cursor:pointer}button:focus-visible,input:focus-visible,a:focus-visible{outline:2px solid var(--c-accent);outline-offset:3px}a{color:inherit;text-decoration:none}
    .root{background:var(--c-bg);color:var(--c-ink);border:1px solid var(--c-line);border-radius:20px;overflow:hidden;min-height:800px}
    .top{display:flex;align-items:center;flex-wrap:wrap;gap:14px;padding:17px clamp(18px,3vw,42px);border-bottom:1px solid var(--c-line);background:var(--c-card)}
    .mark{display:flex;align-items:center;gap:11px;font-weight:750;letter-spacing:-.04em;font-size:19px;margin-right:auto}.mark i{display:grid;place-items:center;width:34px;height:34px;border-radius:9px;background:var(--c-accent);color:var(--c-accent-ink);font-style:normal}.mark small{display:block;font-size:9px;letter-spacing:.12em;text-transform:uppercase;font-weight:650;color:var(--c-muted)}
    .theme{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--c-line);background:var(--c-raised);color:var(--c-ink);border-radius:100px;padding:8px 12px;font-size:12px;font-weight:700}.theme:hover{border-color:var(--c-accent);color:var(--c-accent)}.theme svg{width:16px;height:16px}
    .hero{padding:clamp(36px,5vw,72px) clamp(18px,4vw,60px) 32px;border-bottom:1px solid var(--c-line);background:radial-gradient(circle at 88% 4%,color-mix(in srgb,var(--c-accent) 18%,transparent),transparent 36%)}.eyebrow{display:inline-flex;align-items:center;gap:7px;color:var(--c-accent);font-size:10px;letter-spacing:.16em;text-transform:uppercase;font-weight:750}.hero h1{font:600 clamp(36px,5vw,66px)/1.03 Arial,Helvetica,sans-serif;letter-spacing:-.065em;color:var(--c-ink);margin:14px 0 14px}.hero h1 em{font-style:normal;color:var(--c-accent)}:host([data-brand="lawyer"]) .hero h1{font-family:Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:-.045em}.hero p{max-width:650px;font-size:16px;color:var(--c-muted);margin:0}.metrics{display:flex;gap:clamp(15px,3vw,40px);flex-wrap:wrap;margin-top:27px}.metrics span{font-size:11px;color:var(--c-muted);text-transform:uppercase;letter-spacing:.07em}.metrics b{display:block;color:var(--c-ink);font-size:21px;letter-spacing:-.04em;text-transform:none}
    .tabs{display:flex;gap:6px;overflow:auto;padding:11px clamp(18px,4vw,60px);border-bottom:1px solid var(--c-line);background:var(--c-card)}.tab{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;border:1px solid transparent;background:transparent;color:var(--c-muted);border-radius:10px;padding:10px 13px;font-weight:700}.tab:hover{color:var(--c-accent);background:var(--c-raised)}.tab.active{border-color:var(--c-line);background:var(--c-raised);color:var(--c-accent)}
    .content{padding:18px clamp(18px,4vw,60px) 62px}.section-head{display:flex;justify-content:space-between;align-items:end;gap:15px;margin:24px 0 18px}.section-head h2{color:var(--c-ink);font-size:clamp(25px,3vw,36px);letter-spacing:-.05em;margin:0}.section-head p{color:var(--c-muted);font-size:13px;margin:5px 0 0}.search{display:flex;align-items:center;gap:8px;border:1px solid var(--c-line);background:var(--c-card);border-radius:11px;padding:0 13px;min-width:min(320px,100%);color:var(--c-muted)}.search:focus-within{border-color:var(--c-accent)}.search input{border:0;outline:0;background:transparent;color:var(--c-ink);width:100%;padding:12px 0;min-height:0}.filters{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 20px}.filter{border:1px solid var(--c-line);background:var(--c-card);color:var(--c-muted);border-radius:100px;padding:7px 12px;font-size:12px}.filter:hover,.filter.active{border-color:var(--c-accent);color:var(--c-accent);background:var(--c-raised)}.filter small{margin-left:5px;opacity:.75}
    .grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}.card{display:flex;flex-direction:column;min-width:0;text-align:left;border:1px solid var(--c-line);border-radius:15px;background:var(--c-card);color:var(--c-ink);padding:9px;transition:transform .2s,border-color .2s,box-shadow .2s}.card:hover{transform:translateY(-4px);border-color:var(--c-accent);box-shadow:0 15px 32px #0002}.poster{position:relative;display:grid;place-items:center;overflow:hidden;aspect-ratio:1.65;border-radius:10px;background:var(--c-raised);color:var(--c-accent);font-size:28px}.poster img{width:100%;height:100%;object-fit:cover}.poster video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;pointer-events:none;transition:opacity .2s}.poster.previewing video{opacity:1}.poster .open-icon{position:absolute;right:10px;top:10px;width:29px;height:29px;border-radius:50%;display:grid;place-items:center;background:var(--c-card);color:var(--c-ink);z-index:2}.poster .open-icon svg{width:15px}.live-preview{position:relative;display:grid;place-items:center;width:100%;height:100%;min-height:150px;overflow:hidden;background:#101821;color:#fff;font:700 clamp(15px,2vw,24px)/1.2 Arial,sans-serif;text-align:center}.live-preview.grain-gradient{background:linear-gradient(135deg,#ffba94,#9b78db 50%,#244b75);animation:grain-shift 7s ease-in-out infinite alternate}.live-preview.grain-gradient:after{content:"";position:absolute;inset:0;opacity:.25;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E")}.live-preview.aurora-flow{background:radial-gradient(ellipse at 25% 95%,#22d6b7 0%,transparent 45%),radial-gradient(ellipse at 75% 12%,#7268ff 0%,transparent 55%),#0d1731;animation:aurora-shift 8s ease-in-out infinite alternate}.live-preview.text-morph span,.live-preview.flipping-word-swap span{position:absolute;animation:word-change 6s ease-in-out infinite}.live-preview.text-morph span:nth-child(2),.live-preview.flipping-word-swap span:nth-child(2){animation-delay:3s;opacity:0}.live-preview.flipping-word-swap span{animation-name:word-flip}.live-preview.liquid-glass-carousel{background:linear-gradient(140deg,#112546,#763aca 55%,#e59ea0)}.live-preview.liquid-glass-carousel span{display:grid;place-items:center;width:60%;height:70%;border:1px solid #fff9;border-radius:22px;background:#ffffff24;box-shadow:inset 0 1px #fff9,0 20px 60px #090d2544;backdrop-filter:blur(12px);animation:glass-float 4s ease-in-out infinite}.live-preview b{position:relative;z-index:1}.preview .live-preview{min-height:350px;font-size:clamp(28px,4vw,56px)}@keyframes grain-shift{to{background-position:100% 100%;filter:hue-rotate(20deg)}}@keyframes aurora-shift{to{filter:hue-rotate(35deg);background-position:100% 100%}}@keyframes word-change{0%,8%{opacity:0;filter:blur(10px);transform:translateY(12px)}15%,43%{opacity:1;filter:blur(0);transform:none}50%,100%{opacity:0;filter:blur(10px);transform:translateY(-12px)}}@keyframes word-flip{0%,8%{opacity:0;transform:rotateX(-90deg)}15%,43%{opacity:1;transform:rotateX(0)}50%,100%{opacity:0;transform:rotateX(90deg)}}@keyframes glass-float{50%{transform:translateY(-8px) rotate(-2deg)}}.card-copy{padding:13px 5px 7px}.tag{color:var(--c-accent);font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-weight:750}.card h3{color:var(--c-ink);font-size:16px;letter-spacing:-.03em;margin:5px 0}.card p{color:var(--c-muted);font-size:12px;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.empty{border:1px dashed var(--c-line);border-radius:14px;padding:40px;text-align:center;color:var(--c-muted)}
    .collection{padding:20px}.collection h3{font-size:20px}.collection button{margin-top:12px}.about{max-width:850px;color:var(--c-muted);font-size:15px}.about a{text-decoration:underline;text-decoration-color:var(--c-accent)}.footer{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;padding:22px clamp(18px,4vw,60px);border-top:1px solid var(--c-line);background:var(--c-card);color:var(--c-muted);font-size:11px}
    .detail{display:none;position:fixed;inset:0;z-index:9999;overflow:auto;background:#000c;padding:clamp(8px,3vw,34px)}.detail.open{display:flex}.detail-panel{width:min(1150px,100%);margin:auto;border:1px solid var(--c-line);border-radius:18px;background:var(--c-bg);color:var(--c-ink);overflow:hidden;box-shadow:0 30px 90px #0008}.detail-head{display:flex;justify-content:space-between;gap:15px;padding:20px;border-bottom:1px solid var(--c-line)}.detail-head h2{color:var(--c-ink);font-size:27px;margin:5px 0}.detail-head p{color:var(--c-muted);margin:0}.icon-btn{display:grid;place-items:center;border:1px solid var(--c-line);border-radius:9px;background:var(--c-card);color:var(--c-ink);width:37px;height:37px}.icon-btn:hover{border-color:var(--c-accent);color:var(--c-accent)}.detail-body{display:grid;grid-template-columns:1fr 1fr;min-height:400px}.preview{display:grid;place-items:center;min-height:350px;background:var(--c-raised);overflow:hidden}.preview video,.preview img{max-width:100%;width:100%;max-height:540px;object-fit:contain}.preview p{color:var(--c-muted);text-align:center}.code-wrap{min-width:0;border-left:1px solid var(--c-line);display:flex;flex-direction:column}.codebar{display:flex;align-items:center;flex-wrap:wrap;gap:7px;padding:11px;border-bottom:1px solid var(--c-line)}.codebar span{color:var(--c-muted);font:11px Consolas,monospace;margin-right:auto}.smallbtn{display:inline-flex;align-items:center;gap:5px;border:1px solid var(--c-line);background:var(--c-card);color:var(--c-ink);border-radius:8px;padding:7px 9px;font-size:11px}.smallbtn:hover{border-color:var(--c-accent);color:var(--c-accent)}.smallbtn svg{width:13px;height:13px}.code-wrap pre{background:var(--c-code);color:var(--c-ink);font:12px/1.55 Consolas,monospace;overflow:auto;margin:0;padding:17px;max-height:510px;white-space:pre}.install{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;border-top:1px solid var(--c-line);padding:13px 20px;color:var(--c-muted);font:11px/1.5 Consolas,monospace}.install code{overflow-wrap:anywhere}
    @media(max-width:1150px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:800px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.detail-body{grid-template-columns:1fr}.code-wrap{border-left:0;border-top:1px solid var(--c-line)}.section-head{align-items:stretch;flex-direction:column}}@media(max-width:520px){.grid{grid-template-columns:1fr}.top{gap:8px}.hero h1{font-size:37px}.metrics{gap:12px}.tabs{padding:8px 12px}.content{padding:15px 15px 45px}}
  `;
  window.renderComponentryNative = function (main, brandId, assetBase, entryRoute = 'ui-components') {
    if (!main) return;
    const brand = brandId === 'lawyer' ? 'lawyer' : 'market';
    const brandName = brand === 'lawyer' ? 'Someone.lawyer' : 'AI Company Market';
    const host = document.createElement('section');
    host.className = 'componentry-native';
    host.dataset.brand = brand;
    let savedMode = 'dark';
    try { savedMode = localStorage.getItem('componentry-native-mode-' + brand) || 'dark'; } catch {}
    host.dataset.mode = savedMode === 'brand' ? 'brand' : 'dark';
    main.replaceChildren(host);
    const root = host.attachShadow({mode:'open'});
    const entryLabel = entryRoute === 'figma-templates' ? 'Figma Components' : 'UI Components Library';
    root.innerHTML = `<style>${css}</style><div class="root"><div class="top"><div class="mark"><i>${svg('grid')}</i><span>Componentry<small>${esc(brandName)} · ${entryLabel}</small></span></div><button class="theme" type="button" id="theme"></button></div><section class="hero"><span class="eyebrow">${svg('layers')} Complete local catalogue · Law Tech Labs</span><h1>Every component.<br><em>One creative library.</em></h1><p>Explore animated interface components, composed blocks, implementation source and curated collections directly in ${esc(brandName)}.${entryRoute === 'figma-templates' ? ' These are React components for design reference; editable Figma files are not included.' : ''}</p><div class="metrics"><span><b>${data.components.length}</b>Components</span><span><b>${data.blocks.length}</b>Blocks</span><span><b>${data.collections.length}</b>Collections</span><span><b>Local</b>Catalogue</span></div></section><nav class="tabs" aria-label="Componentry library sections"></nav><section class="content" id="content" aria-live="polite"></section><div class="footer"><span>Law Tech Labs adaptation · Original Componentry by Harsh Jadhav · MIT licence.</span><span>Component previews and source are available locally.</span></div></div><div class="detail" id="detail" role="dialog" aria-modal="true" aria-labelledby="detail-title"><div class="detail-panel"><div class="detail-head"><div><span class="tag" id="detail-category"></span><h2 id="detail-title"></h2><p id="detail-description"></p></div><button class="icon-btn" id="close" aria-label="Close detail">${svg('close')}</button></div><div class="detail-body"><div class="preview" id="preview"></div><div class="code-wrap"><div class="codebar"><span id="filename"></span><button class="smallbtn" id="copy-source">${svg('copy')} Copy source</button><button class="smallbtn" id="download-source">${svg('download')} Download .tsx</button></div><pre><code id="code"></code></pre></div></div><div class="install"><code id="install-command"></code><button class="smallbtn" id="copy-install">${svg('copy')} Copy command</button></div></div></div>`;
    const $ = selector => root.querySelector(selector);
    const $$ = selector => [...root.querySelectorAll(selector)];
    const asset = path => path ? (path.startsWith('data:') ? path : assetBase + '/' + path.replace(/^\//,'')) : '';
    let view = 'components', category = 'All', query = '', current = null, lastFocus = null;
    const tabs = [['components','Components','grid'],['blocks','Blocks','blocks'],['collections','Collections','layers'],['about','About','info']];
    function themeButton() {
      const isBrand = host.dataset.mode === 'brand';
      $('#theme').innerHTML = svg(isBrand ? 'moon' : 'sun') + (isBrand ? ' Dark library' : ' ' + esc(brandName) + ' light');
      $('#theme').setAttribute('aria-label', isBrand ? 'Switch library to dark' : 'Switch library to ' + brandName + ' design system');
      $('#theme').setAttribute('aria-pressed', String(isBrand));
    }
    $('#theme').onclick = () => { host.dataset.mode = host.dataset.mode === 'brand' ? 'dark' : 'brand'; try { localStorage.setItem('componentry-native-mode-' + brand, host.dataset.mode); } catch {} themeButton(); };
    themeButton();
    function livePreview(slug) {
      const previews = {
        'grain-gradient':'<b>Grain Gradient</b>',
        'aurora-flow':'<b>Aurora Flow</b>',
        'text-morph':'<span>Shape ideas.</span><span>Bring them alive.</span>',
        'flipping-word-swap':'<span>MAKE</span><span>CREATE</span>',
        'liquid-glass-carousel':'<span>Liquid glass</span>',
        'gradient-hero-01':'<b>Make your next idea visible.</b>',
        'pricing-01':'<b>Simple plans. Better products.</b>',
        'pricing-02':'<b>Choose your creative pace.</b>'
      };
      return `<div class="live-preview ${esc(slug)}">${previews[slug] || `<b>${esc(slug.replaceAll('-', ' '))}</b>`}</div>`;
    }
    function posterMarkup(item) {
      const poster = asset(item.posterData || item.poster);
      return poster ? `<img src="${esc(poster)}" alt="" loading="lazy">` : livePreview(item.slug);
    }
    function card(item, kind) {
      const video = kind === 'components' ? asset(item.video) : '';
      return `<button type="button" class="card" data-kind="${kind}" data-slug="${esc(item.slug)}" aria-label="Open ${esc(item.title)}"><span class="poster">${posterMarkup(item)}${video ? `<video muted loop playsinline preload="none" data-preview-video="${esc(video)}" aria-hidden="true"></video>` : ''}<span class="open-icon">${svg('arrow')}</span></span><span class="card-copy"><span class="tag">${esc(item.category || kind)}</span><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p></span></button>`;
    }
    function bindCards(scope) { scope.querySelectorAll('[data-kind]').forEach(el => {
      el.onclick = () => openDetail(el.dataset.kind, el.dataset.slug, el);
      const video = el.querySelector('[data-preview-video]');
      if (!video) return;
      const poster = el.querySelector('.poster');
      const start = () => { if (!video.src) video.src = video.dataset.previewVideo; video.play().then(() => poster.classList.add('previewing')).catch(() => {}); };
      const stop = () => { video.pause(); poster.classList.remove('previewing'); };
      video.onerror = stop;
      el.addEventListener('mouseenter', start); el.addEventListener('mouseleave', stop);
      el.addEventListener('focus', start); el.addEventListener('blur', stop);
    }); }
    function render() {
      $('.tabs').innerHTML = tabs.map(([key,label,icon]) => `<button type="button" class="tab ${view===key?'active':''}" data-view="${key}" aria-current="${view===key?'page':'false'}">${svg(icon)} ${label}</button>`).join('');
      $$('.tab').forEach(el => el.onclick = () => { view = el.dataset.view; render(); });
      let html = '';
      if (view === 'components') {
        const categories = ['All', ...new Set(data.components.map(item => item.category))];
        const items = data.components.filter(item => (category === 'All' || item.category === category) && `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(query.toLowerCase()));
        html = `<div class="section-head"><div><h2>Component library</h2><p>${data.components.length} components with source, preview and install details.</p></div><label class="search">${svg('search')}<input id="search" type="search" aria-label="Search components" placeholder="Search components" value="${esc(query)}"></label></div><div class="filters">${categories.map(name => `<button type="button" class="filter ${category===name?'active':''}" data-filter="${esc(name)}">${esc(name)} <small>${name==='All'?data.components.length:data.components.filter(item=>item.category===name).length}</small></button>`).join('')}</div>${items.length ? `<div class="grid">${items.map(item=>card(item,'components')).join('')}</div>` : '<div class="empty">No components match this search.</div>'}`;
      } else if (view === 'blocks') {
        html = `<div class="section-head"><div><h2>Composed blocks</h2><p>Complete source for ready-to-adapt sections.</p></div></div><div class="grid">${data.blocks.map(item=>card(item,'blocks')).join('')}</div>`;
      } else if (view === 'collections') {
        html = `<div class="section-head"><div><h2>Curated collections</h2><p>Guided paths through the component library.</p></div></div><div class="grid">${data.collections.map(item=>`<article class="card collection"><span class="tag">${item.entries.length} components</span><h3>${esc(item.title)}</h3><p>${esc(item.description)}</p><button type="button" class="smallbtn" data-collection="${esc(item.slug)}">Explore collection ${svg('arrow')}</button></article>`).join('')}</div><div id="collection-detail"></div>`;
      } else {
        html = `<div class="section-head"><div><h2>About this library</h2><p>Local catalogue and source attribution.</p></div></div><div class="about"><p>The 53 components, three composed blocks, collection guides, implementation source and local preview recordings are included with this workspace. The recordings show motion; executing editable React components requires the original source project and its dependencies.</p><p>Adapted for ${esc(brandName)} by Law Tech Labs. Original Componentry is by Harsh Jadhav under the MIT licence.</p><p><a href="https://github.com/harshjdhv/componentry" target="_blank" rel="noopener">View original project ↗</a></p></div>`;
      }
      $('#content').innerHTML = html;
      bindCards($('#content'));
      $$('[data-filter]').forEach(el => el.onclick = () => { category = el.dataset.filter; render(); });
      if ($('#search')) $('#search').oninput = event => { query = event.target.value; const start = event.target.selectionStart; render(); const input = $('#search'); input.focus(); input.setSelectionRange(start, start); };
      $$('[data-collection]').forEach(el => el.onclick = () => { const collection = data.collections.find(item => item.slug === el.dataset.collection); if (!collection) return; $('#collection-detail').innerHTML = `<div class="section-head"><div><h2>${esc(collection.title)}</h2><p>${esc(collection.guide)}</p></div></div><div class="grid">${collection.entries.map(entry => {const component=data.components.find(item=>item.slug===entry.slug);return component?card(component,'components'):''}).join('')}</div>`; bindCards($('#collection-detail')); $('#collection-detail').scrollIntoView({behavior:'smooth',block:'start'}); });
    }
    function openDetail(kind, slug, trigger) {
      const item = data[kind]?.find(entry => entry.slug === slug); if (!item) return;
      current = item; lastFocus = trigger;
      $('#detail-category').textContent = item.category || kind;
      $('#detail-title').textContent = item.title;
      $('#detail-description').textContent = item.description;
      $('#filename').textContent = item.filename;
      $('#code').textContent = item.source || 'Source file unavailable.';
      $('#install-command').textContent = item.install || 'Copy or download the source file and adapt it in your project.';
      const preview = $('#preview'); preview.replaceChildren();
      const showStill = () => { preview.innerHTML = posterMarkup(item); };
      if (item.video && kind === 'components') { const video = document.createElement('video'); video.controls = true; video.autoplay = true; video.loop = true; video.muted = true; video.playsInline = true; video.poster = asset(item.posterData || item.poster); video.onerror = showStill; video.src = asset(item.video); preview.append(video); }
      else showStill();
      $('#detail').classList.add('open'); $('#close').focus();
    }
    function closeDetail() { $('#detail').classList.remove('open'); $('#preview').replaceChildren(); if (lastFocus?.isConnected) lastFocus.focus(); }
    $('#close').onclick = closeDetail;
    $('#detail').onclick = event => { if (event.target === $('#detail')) closeDetail(); };
    root.addEventListener('keydown', event => { if (event.key === 'Escape' && $('#detail').classList.contains('open')) closeDetail(); });
    async function copy(value, button) { try { await navigator.clipboard.writeText(value); const old = button.innerHTML; button.textContent = 'Copied'; setTimeout(() => button.innerHTML = old, 1400); } catch { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents($('#code')); selection.removeAllRanges(); selection.addRange(range); button.textContent = 'Select and copy source'; } }
    $('#copy-source').onclick = () => current && copy(current.source || '', $('#copy-source'));
    $('#copy-install').onclick = () => current?.install && copy(current.install, $('#copy-install'));
    $('#download-source').onclick = () => { if (!current) return; const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([current.source || ''],{type:'text/plain'})); link.download = current.filename || 'component.tsx'; link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); };
    render();
  };
})();
