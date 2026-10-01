(() => {
  const data = window.BUILDING_DATA;
  const esc = (value = '') => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const arrow = '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
  const destination = href => new URL(href, 'https://ninochavez.co').href;
  const link = (p, label = p.action, cls = 'action') => `<a class="${cls}" href="${esc(destination(p.href))}" target="_blank" rel="noopener noreferrer">${esc(label)} ${arrow}<span class="sr-only"> (opens in a new tab)</span></a>`;
  const product = slug => data.products.find(p => p.slug === slug);
  const media = p => p.image ? `<figure class="preview preview--${p.slug}"><img src="/public${p.image.src}" alt="${esc(p.image.alt)}" loading="eager"></figure>` : '';
  const caption = p => p.image?.caption ? `<p class="media-caption">${esc(p.image.caption)}</p>` : '';
  const smallProduct = p => `<article class="small-product"><h3>${esc(p.name)}</h3><p class="status">${esc(p.availability)}</p><p>${esc(p.summary)}</p>${link(p)}</article>`;
  const study = {name:'One Cart Across Two Storefronts',href:'https://library.ninochavez.co/commerce/bc-shared-cart-pattern',action:'Read the study'};
  const blueprint = {name:'Blueprint',href:'/work/blueprint',action:'Explore Blueprint'};
  const studies = () => `<section class="study-band" aria-labelledby="methods-title"><div class="wrap"><div class="section-heading"><h2 id="methods-title">Studies & methods</h2><p>Decisions and approaches behind the software.</p></div><div class="study-grid"><article><h3>${study.name}</h3><p class="status">Public draft · Work Library</p><p>What BigCommerce multi-storefront permits when two storefronts need one cart. Published for inspection; the source remains a draft.</p>${link(study)}</article><article><h3>Blueprint</h3><p class="status">Method</p><p>A practical method for planning, reviewing, and checking product work done with AI agents.</p>${link(blueprint)}</article></div></div></section>`;
  const further = () => `<nav class="further-links wrap" aria-label="More about building"><a href="https://ninochavez.co/demos" target="_blank" rel="noopener noreferrer">Process ${arrow}<span>Complete sessions and applied techniques</span></a><a href="https://ninochavez.co/learn" target="_blank" rel="noopener noreferrer">Guides ${arrow}<span>Learning paths, examples and checkpoints</span></a></nav>`;
  const archiveTrigger = (text = 'Browse all work') => `<a class="quiet-link" href="?view=all" data-archive>${esc(text)} ${arrow}</a>`;
  const nav = `<a href="https://ninochavez.co/blog" target="_blank">Writing</a><a href="https://ninochavez.co/work" aria-current="page" target="_blank">Building</a><a href="https://ninochavez.co/photography" target="_blank">Photography</a><a href="https://ninochavez.co/about" target="_blank">About</a>`;
  const style = document.createElement('style'); style.textContent='.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}';document.head.append(style);
  window.Building = {data,esc,arrow,product,media,caption,link,smallProduct,studies,further,archiveTrigger};
  function mount() {
    document.querySelector('#site-header').innerHTML = `<a class="skip" href="#main">Skip to content</a><header class="site-header"><div class="wrap"><a class="identity" href="https://ninochavez.co/" target="_blank">Nino Chavez</a><nav class="desktop-nav" aria-label="Primary">${nav}</nav><a class="site-search" href="https://ninochavez.co/search" target="_blank">Search site</a><details class="mobile-menu"><summary>Menu</summary><nav aria-label="Primary">${nav}<a href="https://ninochavez.co/search" target="_blank">Search site</a></nav></details></div></header>`;
    document.querySelector('#site-footer').innerHTML = `<footer class="site-footer"><div class="wrap"><div><strong>Nino Chavez</strong><br>Product architect and builder in Chicago.</div><div><a href="https://ninochavez.co/about" target="_blank">About</a> &nbsp; <a href="https://ninochavez.co/blog" target="_blank">Writing</a> &nbsp; <a href="https://ninochavez.co/privacy" target="_blank">Privacy</a></div></div></footer>`;
    const catalogue = document.querySelector('#catalogue');
    const options = (values, label, map) => `<option value="">${label}</option>${values.map(v=>`<option value="${esc(v)}">${esc(map?.[v]||v)}</option>`).join('')}`;
    catalogue.innerHTML = `<div class="wrap"><div class="archive-heading"><h2>All work</h2><a class="quiet-link" href="?" data-overview>Back to the overview ${arrow}</a></div><form class="filters" role="search"><label>Search work<input name="q" type="search" placeholder="Name or purpose"></label><label>Domain<select name="domain">${options(data.domains,'All domains')}</select></label><label>Status<select name="state">${options(data.states,'All statuses',data.stateLabels)}</select></label><label>Type<select name="form">${options(data.forms,'All types')}</select></label></form><div class="archive-count" aria-live="polite"><span id="result-count"></span><button type="button" data-clear hidden>Clear filters</button></div><div id="archive-results"></div></div>`;
    catalogue.querySelector('form').addEventListener('submit',e=>e.preventDefault());
    const update = (name,value) => {const q = new URLSearchParams(location.search);q.set('view','all');value?q.set(name,value):q.delete(name);history.replaceState(null,'',`${location.pathname}?${q}`);renderResults();};
    catalogue.querySelector('input').addEventListener('input',e=>update('q',e.target.value));
    catalogue.querySelectorAll('select').forEach(s=>s.addEventListener('change',e=>update(e.target.name,e.target.value)));
    document.addEventListener('click',e=>{
      const trigger = e.target.closest('[data-archive],[data-overview],[data-clear]');if(!trigger)return;e.preventDefault();
      const q=new URLSearchParams(location.search);
      if(trigger.hasAttribute('data-archive'))q.set('view','all');
      else {for(const k of ['q','domain','state','form'])q.delete(k);if(trigger.hasAttribute('data-overview'))q.delete('view');}
      history.pushState(null,'',`${location.pathname}${q.size?'?'+q:''}`);applyView();if(!trigger.hasAttribute('data-clear'))window.scrollTo(0,0);
    });
    window.addEventListener('popstate',applyView);applyView();
  }
  function renderResults() {
    const q = new URLSearchParams(location.search);
    for(const k of ['q','domain','state','form'])document.querySelector(`.filters [name="${k}"]`).value=q.get(k)||'';
    const match=data.items.filter(i=>{
      const text=[i.name,i.claim,i.domain,i.state,i.form].join(' ').toLowerCase();
      return (!q.get('q')||text.includes(q.get('q').toLowerCase()))&&['domain','state','form'].every(k=>!q.get(k)||i[k]===q.get(k));
    });
    document.querySelector('#result-count').textContent=`${match.length} of ${data.items.length} projects and collections`;
    document.querySelector('[data-clear]').hidden=!['q','domain','state','form'].some(k=>q.get(k));
    document.querySelector('#archive-results').innerHTML=match.length?match.map(i=>`<a class="archive-row" href="${esc(destination(i.href))}" target="_blank" rel="noopener noreferrer"><div><small>${esc(i.domain)}</small><small>${esc(data.stateLabels[i.state])} · ${esc(i.form)}</small></div><h3>${esc(i.name)}</h3><p>${esc(i.claim)}</p>${arrow}</a>`).join(''):`<div class="empty"><h3>No work matches these filters.</h3><p>Try another name or remove the filters.</p><button type="button" data-clear>Clear filters</button></div>`;
  }
  function applyView() {
    const q=new URLSearchParams(location.search);const active=q.get('view')==='all'||['q','domain','state','form'].some(k=>q.get(k));
    document.querySelector('#overview').hidden=active;document.querySelector('#catalogue').hidden=!active;
    document.querySelectorAll('[data-top-archive]').forEach(e=>e.hidden=active);
    if(active)renderResults();document.body.dataset.ready='true';
  }
  window.Building.mount=mount;
})();
