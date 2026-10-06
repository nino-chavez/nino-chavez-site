(() => {
  const D = window.ConceptData;
  const C = window.Concept;
  const e = C.escape;
  const href = C.href;

  const header = (active, dark = false) => `
    <header class="masthead ${dark ? 'masthead-dark' : ''}">
      <a class="wordmark" href="${href('home')}" aria-label="Nino Chavez home">Nino<br>Chavez</a>
      ${C.nav(active)}
    </header>`;

  const shell = (active, body, options = {}) => `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="page ${options.dark ? 'page-dark' : ''}">
      ${header(active, options.dark)}
      <main id="main">${body}</main>
      ${C.footer()}
    </div>`;

  const status = value => `<span class="status">${e(value)}</span>`;
  const arrow = text => `<span class="arrow">${e(text)} <b aria-hidden="true">↗</b></span>`;
  const image = (src, alt, className = '') => `<img class="${className}" src="${e(src)}" alt="${e(alt)}">`;

  const productTile = p => `
    <article class="product-tile" data-product="${e(p.id)}">
      <a class="product-tile-media ${p.image ? '' : 'product-tile-type'}" href="${href('product', { product: p.id })}">
        ${p.image ? image(p.image, p.imageAlt, 'product-image') : `<span>${e(p.medium)}</span>`}
      </a>
      <div class="product-tile-copy">
        ${p.id==='minder'?`<p class="source-caption">${e(p.caption)}</p>`:''}<p class="eyebrow">${e(p.medium)} · ${e(p.status)}</p>
        <h2><a href="${href('product', { product: p.id })}">${e(p.name)}</a></h2>
        <p>${e(p.summary)}</p>
        <a class="text-link" href="${href('product', { product: p.id })}">View product <span aria-hidden="true">→</span></a>
      </div>
    </article>`;

  const home = () => `
    <a class="skip-link" href="#main">Skip to content</a>
    <main id="main" class="home-page">
      <section class="home-hero">
        <picture><source media="(max-width: 700px)" srcset="${D.assets.heroMobile}">${image(D.assets.hero, 'Beach volleyball from Nino Chavez’s archive', 'hero-image')}</picture>
        <div class="hero-shade"></div>
        <div class="hero-top">${header('home', true)}</div>
        <div class="hero-copy">
          <p class="hero-kicker">${e(D.location)}</p>
          <h1>Nino Chavez</h1>
          <p>${e(D.intro)}</p>
          <a class="hero-link" href="#field">Explore the work <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section class="field-intro" id="field" aria-labelledby="field-title">
        <p class="eyebrow">In the field</p>
        <h2 id="field-title">Products, observations, and the work around them.</h2>
      </section>
      <section class="home-paths" aria-label="Explore Nino Chavez's work">
        <a class="home-path path-building" href="${href('building')}">
          ${image(D.assets.rally, 'Rally HQ tournament interface')}
          <span><small>Building</small><strong>Things people can use</strong>${arrow('Explore products')}</span>
        </a>
        <a class="home-path path-writing" href="${href('writing')}">
          ${image(D.assets.essay, 'AI-generated illustration from the Signal Dispatch archive')}
          <span><small>Writing</small><strong>Questions worth carrying through</strong>${arrow('Read Signal Dispatch')}</span>
        </a>
        <a class="home-path path-photo" href="${href('photography')}">
          ${image(D.assets.photo, 'Volleyball photograph from Nino Chavez')}
          <span><small>Photography</small><strong>Make the moment hold still</strong>${arrow('See the archive')}</span>
        </a>
      </section>
      <section class="home-note">
        <div><p class="eyebrow">Also here</p><h2>Public studies and practical guides.</h2></div>
        <div><p>${e(D.study.summary)}</p><a class="text-link" href="${href('study')}">Read the shared-cart study <span aria-hidden="true">→</span></a></div>
      </section>
      ${C.footer()}
    </main>`;

  const building = () => shell('building', `
    <section class="page-intro building-intro"><p class="eyebrow">Building</p><h1>Building</h1><p>Products, tools, studies, process and guides.</p></section>
    <section class="building-controls"><h2 class="sr-only">Filter products</h2>${C.productFilters()}</section>
    <section class="product-list" aria-label="Products">${D.products.map(productTile).join('')}</section>
    <section class="building-elsewhere"><div><p class="eyebrow">Tools and methods</p><h2>Work that helps make the work.</h2></div><div class="tool-list">${D.tools.map(t => `<a href="${e(t.url)}"><strong>${e(t.name)}</strong><span>${e(t.summary)}</span>${arrow(t.action)}</a>`).join('')}</div></section>
    <section class="guide-band"><p class="eyebrow">${e(D.guides.title)}</p><h2>${e(D.guides.summary)}</h2><a class="text-link" href="${e(D.guides.url)}">Explore guides <span aria-hidden="true">→</span></a></section>
  `);

  const writing = () => shell('writing', `
    <section class="page-intro"><p class="eyebrow">Writing</p><h1>Writing</h1></section>
    <section class="writing-feature"><a class="writing-image" href="${href('article')}">${image(D.article.image, D.article.imageCredit)}</a><div class="writing-copy"><p class="eyebrow">${e(D.article.category)} · ${e(D.article.date)}</p><h2><a href="${href('article')}">${e(D.article.title)}</a></h2><p>${e(D.article.excerpt)}</p><p class="byline">By ${e(D.article.author)} · ${e(D.article.readTime)} minute read</p><a class="text-link" href="${href('article')}">Read the essay <span aria-hidden="true">→</span></a></div></section>
    <section class="writing-study"><div><p class="eyebrow">Public study</p><h2>${e(D.study.title)}</h2><p>${e(D.study.question)}</p></div><a class="study-card" href="${href('study')}"><span>${status(D.study.status)}</span><strong>${e(D.study.subtitle)}</strong>${arrow('Open study')}</a></section>
  `);

  const article = () => shell('writing', `
    <article class="article-wrap"><header class="article-header"><p class="eyebrow">Writing · ${e(D.article.category)}</p><h1>${e(D.article.title)}</h1><p class="article-deck">${e(D.article.excerpt)}</p><p class="byline">By ${e(D.article.author)} · ${e(D.article.date)} · ${e(D.article.readTime)} minute read</p></header><div class="article-body">${D.article.body}</div><figure class="article-figure">${image(D.article.image, D.article.imageCredit)}<figcaption>${e(D.article.imageCredit)}</figcaption></figure></article>
  `);

  const photography = () => shell('photography', `
    <section class="photo-intro"><p class="eyebrow">Photography</p><h1>Photography</h1><p>Volleyball and the people who make a match move.</p></section>
    <section class="archive-grid" aria-label="Photography archive">${D.photoArchive.map((p, i) => `<figure class="archive-${i + 1}">${image(p.src, p.alt)}</figure>`).join('')}</section>
    <section class="album-invite"><div><p class="eyebrow">Event album</p><h2>${e(D.album.event)}</h2><p>${e(D.album.date)} · ${e(D.album.sport)}</p></div><a href="${href('album')}">${image(D.album.hero, 'Millikin at North Central volleyball photograph')}<span>${arrow('View the full album')}</span></a></section>
  `, { dark: true });

  const album = () => shell('photography', `
    <section class="album-head"><div><p class="eyebrow">Photography · event album</p><h1>${e(D.album.event)}</h1><p>${e(D.album.date)} · ${e(D.album.sport)} · photographed by ${e(D.album.author)}</p></div>${C.albumTools()}</section>
    <section class="album-grid-wrap" aria-label="${e(D.album.count)} event photographs">${C.photoGrid()}</section>${C.viewer()}
  `, { dark: true });

  const product = () => {
    const p = C.product();
    return shell('building', `
      <article class="product-detail"><div class="product-detail-copy"><p class="eyebrow">Building · ${e(p.medium)}</p><h1>${e(p.name)}</h1><p class="product-summary">${e(p.summary)}</p>${status(p.status)}<ul>${p.details.map(item => `<li>${e(item)}</li>`).join('')}</ul><div class="product-actions"><a class="button-solid" href="${e(p.actionUrl)}">${e(p.action)} <span aria-hidden="true">↗</span></a>${p.secondaryUrl ? `<a class="text-link" href="${e(p.secondaryUrl)}">${e(p.secondaryAction)} <span aria-hidden="true">↗</span></a>` : ''}</div></div>${p.image ? `<figure class="product-detail-image">${image(p.image, p.imageAlt)}<figcaption>${e(p.caption || '')}</figcaption></figure>` : `<aside class="product-detail-type"><p>${e(p.medium)}</p><p>${e(p.status)}</p></aside>`}</article>
      <nav class="product-return" aria-label="More products"><a href="${href('building')}">← All products</a>${D.products.filter(x => x.id !== p.id).map(x => `<a href="${href('product', { product: x.id })}">${e(x.name)}</a>`).join('')}</nav>
    `);
  };

  const study = () => shell('building', `
    <article class="study-wrap"><header class="study-header"><p class="eyebrow">Public study · ${status(D.study.status)}</p><h1>${e(D.study.title)}</h1><p class="study-subtitle">${e(D.study.subtitle)}</p><p class="study-question">${e(D.study.question)}</p><dl><div><dt>Source date</dt><dd>${e(D.study.date)}</dd></div><div><dt>Source version</dt><dd>${e(D.study.sourceVersion)}</dd></div></dl><a class="button-solid" href="${e(D.study.url)}">Read the complete analysis <span aria-hidden="true">↗</span></a></header><section class="study-excerpt"><p class="eyebrow">${e(D.study.excerptLabel)}</p><div>${D.study.body}</div><p class="study-limit">${e(D.study.limit)}</p></section></article>
  `);

  const about = () => shell('about', `
    <section class="about-hero"><div><p class="eyebrow">About</p><h1>Nino Chavez</h1><p class="about-lede">${e(D.about)}</p><p>${e(D.intro)}</p><p class="about-place">Based in ${e(D.location)}.</p></div>${image(D.assets.portrait, 'Nino Chavez')}</section>
    <section class="about-links"><p class="eyebrow">Start here</p><h2>Find the part of the work you came for.</h2><nav><a href="${href('building')}">Building <span aria-hidden="true">→</span></a><a href="${href('writing')}">Writing <span aria-hidden="true">→</span></a><a href="${href('photography')}">Photography <span aria-hidden="true">→</span></a></nav></section>
  `);

  window.renderConcept = page => ({ home, building, writing, article, photography, album, product, study, about }[page] || home)();
  C.mount(window.renderConcept);
})();
