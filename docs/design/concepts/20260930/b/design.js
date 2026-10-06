/* Concept B — The journal. Source content remains in ../shared/content.js. */
(() => {
  const D = window.ConceptData;
  const C = window.Concept;
  const e = C.escape;
  const link = (page, text, extra) => `<a class="text-link" href="${C.href(page, extra)}">${text}<span aria-hidden="true"> ↗</span></a>`;
  const actions = (p) => `<p class="actions"><a class="ink-button" href="${e(p.actionUrl)}">${e(p.action)}</a>${p.secondaryUrl ? `<a href="${e(p.secondaryUrl)}">${e(p.secondaryAction)}</a>` : ''}</p>`;
  const shell = (page, content) => `<a class="skip-link" href="#main">Skip to content</a><header class="masthead"><a class="wordmark" href="${C.href('home')}" aria-label="Nino Chavez home">Nino<br>Chavez</a><p class="edition">Chicago<br><span>Design / products / photographs</span></p>${C.nav(page)}</header>${content}${C.footer()}`;
  const productLine = (p, index = 0) => `<article class="product-line ${p.image ? 'has-image' : ''}" data-product="${e(p.id)}"><div class="line-number" aria-hidden="true">0${index + 1}</div><div><p class="eyebrow">${e(p.status)} · ${e(p.medium)}</p><h2><a href="${C.href('product', { product: p.id })}">${e(p.name)}</a></h2><p>${e(p.summary)}</p>${p.id==='minder'?`<p class="source-caption">${e(p.caption)}</p>`:''}</div>${p.image ? `<img src="${e(p.image)}" alt="${e(p.imageAlt)}" loading="lazy">` : '<div class="text-object">Product<br>in progress</div>'}</article>`;
  const home = () => shell('home', `<main id="main">
    <section class="journal-name"><h1>Nino Chavez</h1><p>${e(D.intro)}</p></section>
    <figure class="journal-panorama"><img src="${e(D.assets.hero)}" alt="Beach volleyball from Nino Chavez’s archive" fetchpriority="high"><figcaption><a href="${C.href('photography')}">From the photography archive ↗</a></figcaption></figure>
    <section class="journal-front" aria-label="Writing, building and photography">
      <article class="journal-lead"><p class="eyebrow">Writing · ${e(D.article.date)}</p><h2><a href="${C.href('article')}">${e(D.article.title)}</a></h2><p class="deck">${e(D.article.excerpt)}</p>${link('article','Read the essay')}</article>
      <div class="journal-side"><article><p class="eyebrow">Building · ${e(D.products[0].status)}</p><h2>${link('product',e(D.products[0].name),{product:'minder'})}</h2><p>${e(D.products[0].summary)}</p></article><article><p class="eyebrow">Photography · ${e(D.album.date)}</p><h2>${link('album',e(D.album.event))}</h2><p>${D.album.count} photographs · ${e(D.album.sport)}</p></article></div>
    </section>
    <section class="journal-bottom"><article><h2>${e(D.products[1].name)}</h2><p>${e(D.products[1].summary)}</p>${link('product','Explore The Rotation',{product:'rotation'})}</article><article><p class="eyebrow">${e(D.study.status)}</p><h2>${e(D.study.title)}</h2><p>${e(D.study.question)}</p>${link('study','Read the study')}</article></section>
  </main>`);
  const building = () => shell('building', `<main id="main" class="page building-page"><header class="page-heading"><p class="kicker">Building</p><h1>Building</h1><p>Work made to be used, inspected or read.</p></header>
    <section class="filters-section" aria-labelledby="product-list-title"><div class="section-rule"><h2 id="product-list-title">Products</h2><p>Choose a product or narrow the list.</p></div>${C.productFilters()}<div class="product-list">${D.products.map(productLine).join('')}</div></section>
    <section class="study-strip"><p class="kicker">Public study</p><h2>${e(D.study.title)}</h2><p>${e(D.study.question)}</p>${link('study', 'Read the opening')}</section>
    <section class="tools-section"><p class="kicker">More to explore</p>${D.tools.map(t => `<article><h2>${e(t.name)}</h2><p>${e(t.summary)}</p><a href="${e(t.url)}">${e(t.action)}</a></article>`).join('')}</section>
  </main>`);
  const writing = () => shell('writing', `<main id="main" class="page writing-page"><header class="page-heading"><p class="kicker">Writing</p><h1>Writing</h1></header>
    <article class="feature-essay"><div><p class="eyebrow">${e(D.article.category)} · ${e(D.article.date)}</p><h2><a href="${C.href('article')}">${e(D.article.title)}</a></h2><p class="deck">${e(D.article.excerpt)}</p><p>${link('article', 'Read the essay')}</p></div><figure><img src="${e(D.article.image)}" alt="" loading="eager"><figcaption>${e(D.article.imageCredit)}</figcaption></figure></article>
    <section class="reading-note"><p class="kicker">A publication by Nino Chavez</p><p>Essays begin with questions that deserve more than a quick answer.</p></section>
  </main>`);
  const article = () => shell('article', `<main id="main" class="article-page"><header class="article-header"><p class="eyebrow">${e(D.article.category)} · ${e(D.article.date)} · ${e(D.article.readTime)} minute read</p><h1>${e(D.article.title)}</h1><p class="deck">${e(D.article.excerpt)}</p><p class="byline">By ${e(D.article.author)} · ${e(D.article.role)}</p></header>
    <div class="article-layout"><aside class="article-aside"><p>In this essay</p><ol>${D.article.sections.map(s => `<li><a href="#${e(s.id)}">${e(s.title)}</a></li>`).join('')}</ol><a href="${C.href('writing')}">All writing</a></aside><article class="article-body">${D.article.body}</article></div>
    <footer class="article-end"><p class="kicker">Continue reading</p><h2>${e(D.study.title)}</h2><p>${e(D.study.summary)}</p>${link('study', 'Open the study')}</footer>
  </main>`);
  const photography = () => shell('photography', `<main id="main" class="page photography-page"><header class="photo-heading"><p class="kicker">Photography</p><h1>Photography</h1><p>Events, teams and the moments around the action.</p></header>
    <section class="archive-spread" aria-label="Photography archive">${D.photoArchive.map((p, i) => `<img class="archive-${i + 1}" src="${e(p.src)}" alt="${e(p.alt)}" loading="${i < 3 ? 'eager' : 'lazy'}">`).join('')}</section>
    <section class="album-callout"><div><p class="kicker">Event album</p><h2>${e(D.album.event)}</h2><p>${e(D.album.date)} · ${e(D.album.sport)}</p>${link('album', 'Browse 43 photographs')}</div><img src="${e(D.album.hero)}" alt="Photograph from ${e(D.album.event)}" loading="lazy"></section>
  </main>`);
  const album = () => shell('album', `<main id="main" class="album-page"><header class="album-header"><div><p class="kicker">Event photographs</p><h1>${e(D.album.event)}</h1><p>${e(D.album.date)} · ${e(D.album.sport)} · By ${e(D.album.author)}</p></div></header>${C.albumTools()}<section class="album-images" aria-label="${e(D.album.count)} photographs">${C.photoGrid()}</section>${C.viewer()}</main>`);
  const product = () => { const p = C.product(); return shell('product', `<main id="main" class="page product-page"><header class="product-header"><div><p class="eyebrow">${e(p.status)} · ${e(p.medium)}</p><h1>${e(p.name)}</h1><p class="deck">${e(p.summary)}</p>${actions(p)}</div>${p.image ? `<figure><img src="${e(p.image)}" alt="${e(p.imageAlt)}">${p.caption ? `<figcaption>${e(p.caption)}</figcaption>` : ''}</figure>` : `<div class="product-wordmark">${e(p.name)}</div>`}</header>
    <section class="product-details"><h2>What it does</h2><ul>${p.details.map(x => `<li>${e(x)}</li>`).join('')}</ul></section><nav class="product-neighbors" aria-label="Other products"><p class="kicker">More products</p>${D.products.filter(x => x.id !== p.id).map(x => `<a href="${C.href('product', { product: x.id })}">${e(x.name)}</a>`).join('')}</nav>
  </main>`); };
  const study = () => shell('study', `<main id="main" class="page study-page"><header class="study-header"><p class="eyebrow">${e(D.study.status)} · ${e(D.study.date)}</p><h1>${e(D.study.title)}</h1><p class="subtitle">${e(D.study.subtitle)}</p><p class="deck">${e(D.study.question)}</p></header><p class="study-opening-label">${e(D.study.excerptLabel)}</p><article class="article-body study-body">${D.study.body}</article><footer class="study-source"><p class="kicker">Source</p><p>${e(D.study.limit)}</p><p>Source version ${e(D.study.sourceVersion)}. This page presents only the opening excerpt.</p><a class="ink-button" href="${e(D.study.url)}">Read the complete analysis in Work Library</a></footer></main>`);
  const about = () => shell('about', `<main id="main" class="page about-page"><section class="about-intro"><img src="${e(D.assets.portrait)}" alt="Portrait of Nino Chavez"><div><p class="kicker">About</p><h1>${e(D.name)}</h1><p class="deck">${e(D.about)}</p><p>${e(D.intro)}</p></div></section><section class="about-columns"><div><p class="kicker">Based in</p><h2>${e(D.location)}</h2></div><div><p class="kicker">Find the work</p><a href="${C.href('building')}">Products and studies</a><a href="${C.href('writing')}">Writing</a><a href="${C.href('photography')}">Photography</a></div></section></main>`);
  const renders = { home, building, writing, article, photography, album, product, study, about };
  window.renderConcept = page => (renders[page] || home)();
  C.mount(window.renderConcept);
})();
