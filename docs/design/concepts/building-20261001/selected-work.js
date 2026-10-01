(() => {
  const B = Building;
  // A display description identifies the thing. The existing form field remains
  // its catalogue format, and availability remains a separate lifecycle fact.
  const selected = [
    { ...B.product('minder'), kind:'iOS app' },
    { slug:'flickday', name:'Flickday Media', kind:'Sports-media business',
      summary:'Tournament photography, highlight reels, and event photo galleries.',
      availability:'', href:'https://flickdaymedia.com/', action:'Visit Flickday Media',
      image:{src:'/work/flickday.jpg',alt:'Volleyball photography from the Flickday Media portfolio'} },
    { ...B.product('the-rotation'), kind:'Website' },
    { slug:'lets-pepper', name:'Let’s Pepper', kind:'Tournament series',
      summary:'Player-first grass volleyball tournaments, standings, and event galleries.',
      availability:'2026 season complete', href:'https://letspepper.com/', action:'Visit Let’s Pepper',
      image:{src:'assets/lets-pepper-site.png',alt:'Let’s Pepper website with its tournament identity and grass volleyball photograph'} },
    { ...B.product('rally-hq'), kind:'Web app' },
    { ...B.product('cutting-board'), kind:'App' },
    { ...B.product('yawn'), kind:'App' },
    { ...B.product('work-library'), kind:'Publication library' },
  ];
  B.data.kinds=Object.fromEntries(selected.map(p=>[p.slug,p.kind]));
  B.data.formLabels={site:'Website',app:'App',cli:'Command-line tool',service:'Service',repo:'Code repository',docs:'Documents',toolkit:'Toolkit',experience:'Interactive example',collection:'Collection'};
  const availability = p => p.availability === 'Live website' ? '' : p.availability;
  const image = p => p.image ? `<figure class="work-preview work-preview--${B.esc(p.slug)}"><img src="${p.image.src.startsWith('/')?'/public'+p.image.src:B.esc(p.image.src)}" alt="${B.esc(p.image.alt)}"></figure>` : '';
  document.querySelector('#top-archive').innerHTML=B.archiveTrigger();
  document.querySelector('#work-index').innerHTML=selected.map(p=>`<article class="work-entry${p.image?'':' work-entry--text'}" data-work="${B.esc(p.slug)}">
    <div class="work-identity"><h3>${B.esc(p.name)}</h3><p class="work-kind">${B.esc(p.kind)}</p></div>
    <div class="work-description"><p>${B.esc(p.summary)}</p>${availability(p)?`<p class="work-availability">${B.esc(availability(p))}</p>`:''}${B.link(p)}${B.caption(p)}</div>
    ${image(p)}
  </article>`).join('');
  document.querySelector('#study-area').innerHTML=B.studies();
  document.querySelector('#further-area').innerHTML=B.further();
  B.mount();
})();
