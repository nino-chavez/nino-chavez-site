(() => {
  const data = window.RedesignContent;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icons = {close:'<path d="m6 6 12 12M6 18 18 6"/>',prev:'<path d="m14 6-6 6 6 6"/>',next:'<path d="m10 6 6 6-6 6"/>'};
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
  document.querySelectorAll('[data-article-body]').forEach(el => {el.innerHTML=data.article.body;});
  document.querySelectorAll('[data-article-toc]').forEach(el => {el.innerHTML=data.article.sections.map(s=>`<a href="#${s.id}">${esc(s.title)}</a>`).join('');});
  document.querySelectorAll('[data-site-nav]').forEach(el => {const current=document.body.classList.contains('gallery-page')?'Photography':'Writing';el.innerHTML=data.nav.map(n=>`<a href="${n.url}"${n.title===current?' aria-current="page"':''}>${n.title}</a>`).join('');});
  let siteDialog;
  document.querySelectorAll('[data-site-menu]').forEach(trigger => {
    trigger.setAttribute('aria-haspopup','dialog');
    trigger.addEventListener('click',()=>{
      if(!siteDialog){
        siteDialog=document.createElement('dialog');siteDialog.className='site-dialog';siteDialog.setAttribute('aria-labelledby','site-dialog-title');
        siteDialog.innerHTML=`<div class="dialog-head"><h2 id="site-dialog-title">Explore Nino’s website</h2><button class="icon-button" aria-label="Close menu">${icon('close')}</button></div><nav aria-label="Nino Chavez">${data.nav.map(n=>`<a href="${n.url}">${n.title}</a>`).join('')}</nav><p>Writing, photography, and the work behind them.</p>`;
        siteDialog.querySelector('button').onclick=()=>siteDialog.close();document.body.append(siteDialog);
      }
      siteDialog.showModal();
    });
  });
  const grid = document.querySelector('[data-photo-grid]');
  if(!grid)return;
  const search = document.querySelector('[data-photo-search]');
  const results = document.querySelector('[data-photo-results]');
  const label = document.querySelector('[data-photo-results-label]');
  let filtered=data.album.photos, current=0, dialog;
  const draw = () => {
    const q=(search?.value||'').trim().toLowerCase();
    filtered=data.album.photos.filter(p=>`${p.id} ${p.alt}`.toLowerCase().includes(q));
    grid.innerHTML=filtered.map(p=>`<button class="photo" data-photo="${esc(p.id)}" aria-label="Open photo ${esc(p.id.replace('DWdCET-',''))}"><img src="${esc(p.src)}" alt="${esc(p.alt)}" loading="lazy" width="900" height="600"><span class="photo-caption">${esc(p.id.replace('DWdCET-','').split('-')[0])}</span></button>`).join('');
    const message=q?`${filtered.length} matching ${filtered.length===1?'photo':'photos'}`:'43 photos';
    if(results)results.textContent=message;
    if(label)label.textContent=message;
    if(!filtered.length){grid.innerHTML='<div class="photo-grid-empty"><p>No photos match this search. Try a photo number such as DSC09426.</p><button class="site-menu" data-reset-search>Show all photos</button></div>';grid.querySelector('[data-reset-search]').onclick=()=>{search.value='';draw();search.focus();};}
    grid.querySelectorAll('[data-photo]').forEach(button=>button.onclick=()=>openPhoto(filtered.findIndex(p=>p.id===button.dataset.photo)));
  };
  const updatePhoto = () => {
    const photo=filtered[current];const img=dialog.querySelector('img');img.src=photo.src;img.alt=photo.alt;
    dialog.querySelector('[data-viewer-title]').textContent=photo.id.replace('DWdCET-','').split('-')[0];
    dialog.querySelector('[data-viewer-count]').textContent=`${current+1} of ${filtered.length}`;
    dialog.querySelector('[data-prev]').disabled=current===0;dialog.querySelector('[data-next]').disabled=current===filtered.length-1;
  };
  const openPhoto = index => {
    current=index;
    if(!dialog){
      dialog=document.createElement('dialog');dialog.className='photo-viewer';dialog.setAttribute('aria-labelledby','photo-viewer-title');
      dialog.innerHTML=`<div class="viewer-bar"><div><h2 id="photo-viewer-title" data-viewer-title></h2><p data-viewer-count aria-live="polite"></p></div><button class="icon-button" data-close aria-label="Close photo">${icon('close')}</button></div><img class="viewer-photo" alt=""><div class="viewer-footer"><div class="viewer-nav"><button class="icon-button" data-prev aria-label="Previous photo">${icon('prev')}</button><button class="icon-button" data-next aria-label="Next photo">${icon('next')}</button></div><a href="${data.album.url}">Open live album for downloads</a><p>This preview lets you browse. Downloading and saving happen in the live gallery.</p></div>`;
      dialog.querySelector('[data-close]').onclick=()=>dialog.close();
      dialog.querySelector('[data-prev]').onclick=()=>{if(current>0){current--;updatePhoto();}};
      dialog.querySelector('[data-next]').onclick=()=>{if(current<filtered.length-1){current++;updatePhoto();}};
      dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'&&current<filtered.length-1){current++;updatePhoto();event.preventDefault();}if(event.key==='ArrowLeft'&&current>0){current--;updatePhoto();event.preventDefault();}});
      document.body.append(dialog);
    }
    updatePhoto();dialog.showModal();
  };
  if(search)search.addEventListener('input',draw);
  document.querySelectorAll('[data-hero-photo]').forEach(button=>button.onclick=()=>{const i=filtered.findIndex(p=>p.id==='DWdCET-DSC09434');if(i>=0)openPhoto(i);});
  document.querySelectorAll('[data-copy-album]').forEach(button=>button.onclick=async()=>{
    const status=document.querySelector('[data-copy-status]');
    try{await navigator.clipboard.writeText(data.album.url);if(status)status.textContent='Album link copied.';}catch{if(status)status.innerHTML=`Copy this link: <a href="${data.album.url}">${data.album.url}</a>`;}
  });
  draw();
})();
