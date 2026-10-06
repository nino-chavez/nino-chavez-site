/* Concept C: a contact sheet for Nino's public work. */
(() => {
  const D = window.ConceptData;
  const C = window.Concept;
  const e = C.escape;
  const link = (page, label, extra = {}) => `<a href="${C.href(page, extra)}">${label}</a>`;
  const img = (src, alt, cls = '') => `<img class="${cls}" src="${e(src)}" alt="${e(alt)}" loading="lazy">`;
  const shell = (page, body) => `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="site-shell">
      <header class="identity-rail">
        <a class="wordmark" href="${C.href('home')}" aria-label="Nino Chavez home">NINO<br>CHAVEZ</a>
        <p class="rail-role">${e(D.location)}<br>Product, pictures, words.</p>
        ${C.nav(page)}
        <div class="rail-bottom"><span>© 2026</span></div>
      </header>
      <main id="main" class="page page-${page}">${body}</main>
    </div>`;

  const productTile = p => `<article class="field-tile product-tile ${p.image ? 'has-image' : 'type-tile'}" data-product="${e(p.id)}">
    ${p.image ? img(p.image, p.imageAlt, 'tile-image') : '<div class="type-mark" aria-hidden="true">→</div>'}
    <div class="tile-copy"><p class="eyebrow">${e(p.status)} · ${e(p.medium)}</p><h2>${link('product', e(p.name), { product: p.id })}</h2><p>${e(p.summary)}</p>${p.id==='minder'?`<p class="source-caption">${e(p.caption)}</p>`:''}</div>
  </article>`;

  const photoTile = (p, i) => `<article class="field-tile photo-tile photo-${i}">
    ${img(p.src, p.alt, 'tile-image')}<div class="tile-copy"><p class="eyebrow">Photography</p><h2>${link('photography', 'Photography archive')}</h2></div>
  </article>`;

  const home = () => shell('home', `
    <section class="opening" aria-labelledby="home-title">
      <div class="opening-copy"><h1 id="home-title">${e(D.name)}</h1><p class="intro">${e(D.intro)}</p></div>
      <figure class="opening-portrait">${img(D.assets.portrait, 'Portrait of Nino Chavez')}</figure>
    </section>
    <section class="contact-field" aria-label="A contact sheet of Nino Chavez work">
      <article class="field-tile hero-photo">${img(D.assets.hero, 'Beach volleyball from Nino Chavez’s archive', 'tile-image')}<div class="tile-copy inverse"><p class="eyebrow">Chicago</p><h2>${link('about', 'The person behind the work')}</h2></div></article>
      ${productTile(D.products[0])}
      <article class="field-tile writing-tile">${img(D.assets.essay, D.article.imageCredit, 'tile-image')}<div class="tile-copy inverse"><p class="eyebrow">${e(D.article.category)} · ${e(D.article.date)}</p><h2>${link('article', e(D.article.title))}</h2><p>${e(D.article.excerpt)}</p></div></article>
      ${photoTile(D.photoArchive[0], 1)}
      ${productTile(D.products[1])}
      <article class="field-tile study-tile"><div class="tile-copy"><p class="eyebrow">${e(D.study.status)}</p><h2>${link('study', e(D.study.title))}</h2><p>${e(D.study.question)}</p></div></article>
      ${photoTile(D.photoArchive[4], 2)}
      ${productTile(D.products[2])}
    </section>
    <section class="home-return"><p>Products to use. Things to read. Pictures from the field.</p><div>${link('building', 'Browse all work')} ${link('photography', 'Browse photography')}</div></section>
  `);

  const building = () => shell('building', `
    <header class="page-intro"><p class="eyebrow">Building</p><h1>Building</h1><p>Products, public studies, tools and guides.</p></header>
    ${C.productFilters()}
    <section class="work-field" aria-label="Products">${D.products.map(productTile).join('')}</section>
    <section class="supporting-links"><article><p class="eyebrow">Public study</p><h2>${link('study', e(D.study.title))}</h2><p>${e(D.study.summary)}</p></article>${D.tools.map(t => `<article><p class="eyebrow">Tool</p><h2><a href="${e(t.url)}">${e(t.name)}</a></h2><p>${e(t.summary)}</p></article>`).join('')}<article><p class="eyebrow">Guide</p><h2><a href="${e(D.guides.url)}">${e(D.guides.title)}</a></h2><p>${e(D.guides.summary)}</p></article></section>
  `);

  const writing = () => shell('writing', `
    <header class="page-intro"><p class="eyebrow">Writing</p><h1>Ideas carried through the work.</h1></header>
    <article class="feature-writing"><div>${img(D.article.image, D.article.imageCredit)}</div><div class="feature-copy"><p class="eyebrow">${e(D.article.category)} · ${e(D.article.date)}</p><h2>${link('article', e(D.article.title))}</h2><p>${e(D.article.excerpt)}</p><p>${link('article', `Read in ${D.article.readTime} minutes`)}</p></div></article>
    <section class="writing-foot"><p>${link('study', 'Read a public technical study')}</p><p>${link('building', 'Return to products and tools')}</p></section>
  `);

  const article = () => shell('article', `
    <article class="article-layout"><header class="article-head"><p class="eyebrow">${e(D.article.category)}</p><h1>${e(D.article.title)}</h1><p class="article-dek">${e(D.article.excerpt)}</p><p class="article-meta">By ${e(D.article.author)} · ${e(D.article.date)} · ${e(D.article.readTime)} min read</p></header><div class="article-body">${D.article.body}</div><footer class="article-return"><p>${link('writing', 'More writing')} ${link('building', 'See the work')}</p></footer></article>
  `);

  const photography = () => shell('photography', `
    <header class="photo-intro"><p class="eyebrow">Photography</p><h1>Work from the sideline and the room.</h1><p>Event photographs and selected work from the archive.</p></header>
    <section class="archive-field" aria-label="Photography archive">${D.photoArchive.map((p, i) => `<figure class="archive-${i + 1}">${img(p.src, p.alt)}<figcaption>${i === 0 ? link('album', 'Open the latest event album') : 'Nino Chavez photography'}</figcaption></figure>`).join('')}</section>
    <section class="album-callout"><p class="eyebrow">Event album</p><h2>${link('album', e(D.album.event))}</h2><p>${e(D.album.date)} · ${e(D.album.sport)}</p><p>${link('album', 'View photographs')}</p></section>
  `);

  const album = () => shell('album', `
    <header class="album-identity"><p class="eyebrow">${e(D.album.sport)}</p><h1>${e(D.album.event)}</h1><p>${e(D.album.date)} · Photographs by ${e(D.album.author)}</p></header>
    ${C.albumTools()}
    <section aria-label="${e(D.album.count)} photographs">${C.photoGrid()}</section>
    ${C.viewer()}
  `);

  const product = () => { const p = C.product(); return shell('product', `
    <article class="product-detail"><header class="product-head"><p class="eyebrow">${e(p.status)} · ${e(p.medium)}</p><h1>${e(p.name)}</h1><p class="product-summary">${e(p.summary)}</p><p class="product-actions"><a class="action" href="${e(p.actionUrl)}">${e(p.action)}</a>${p.secondaryUrl ? `<a href="${e(p.secondaryUrl)}">${e(p.secondaryAction)}</a>` : ''}</p></header>
      ${p.image ? `<figure class="product-image">${img(p.image, p.imageAlt)}${p.caption ? `<figcaption class="source-caption">${e(p.caption)}</figcaption>` : ''}</figure>` : '<div class="product-blank" aria-hidden="true">NC</div>'}
      <section class="product-notes"><h2>What it does</h2><ul>${p.details.map(d => `<li>${e(d)}</li>`).join('')}</ul><p><a href="${e(p.url)}">Visit the existing product site</a></p></section>
    </article><section class="more-products"><p class="eyebrow">More to explore</p>${D.products.filter(x => x.id !== p.id).map(x => `<p>${link('product', e(x.name), { product: x.id })}</p>`).join('')}</section>
  `); };

  const study = () => shell('study', `
    <article class="study-layout"><header class="study-head"><p class="eyebrow">${e(D.study.status)} · ${e(D.study.date)}</p><h1>${e(D.study.title)}</h1><p class="study-subtitle">${e(D.study.subtitle)}</p><p class="study-question">${e(D.study.question)}</p></header><section class="study-excerpt"><p class="eyebrow">${e(D.study.excerptLabel)}</p>${D.study.body}</section><aside class="study-source"><p><strong>Source status</strong><br>${e(D.study.limit)}</p><p>Source version ${e(D.study.sourceVersion)}</p><p><a href="${e(D.study.url)}">Read the complete analysis in Work Library</a></p></aside></article>
  `);

  const about = () => shell('about', `
    <section class="about-layout"><div class="about-photo">${img(D.assets.portrait, 'Nino Chavez in Chicago')}</div><div><p class="eyebrow">About</p><h1>${e(D.name)}</h1><p class="about-lead">${e(D.about)}</p><p>${e(D.intro)}</p><p>${e(D.location)}</p><p class="about-links">${link('building', 'Browse the work')} ${link('photography', 'See photographs')} ${link('writing', 'Read writing')}</p></div></section>
  `);

  const pages = { home, building, writing, article, photography, album, product, study, about };
  window.renderConcept = page => (pages[page] || home)();
  C.mount(window.renderConcept);
})();
