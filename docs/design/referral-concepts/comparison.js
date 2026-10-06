(() => {
  const params=new URLSearchParams(location.search);
  let surface=params.get('surface')==='article'?'article':'album';
  let size=params.get('size')==='desktop'?'desktop':'phone';
  const frames=[...document.querySelectorAll('.preview-frame')];
  const fit=()=>{
    const w=size==='phone'?390:1440,h=size==='phone'?844:900;
    frames.forEach(frame=>{const iframe=frame.querySelector('iframe');const scale=frame.clientWidth/w;iframe.style.width=`${w}px`;iframe.style.height=`${h}px`;iframe.style.transform=`scale(${scale})`;frame.style.height=`${h*scale}px`;});
  };
  const update=()=>{
    document.body.dataset.size=size;
    document.querySelector(`input[name=surface][value=${surface}]`).checked=true;
    document.querySelector(`input[name=size][value=${size}]`).checked=true;
    document.querySelectorAll('[data-concept]').forEach(card=>{
      const name=card.dataset.concept;const iframe=card.querySelector('iframe');const url=`${name}/${surface}.html`;
      if(iframe.getAttribute('src')!==url)iframe.src=url;
      iframe.title=`${card.querySelector('h2').textContent.trim()} ${surface} mockup`;
      const link=card.querySelector('.open-concept');link.href=url;link.firstChild.textContent=`Open full-size ${surface} `;
    });
    document.querySelector('#content-identity').textContent=surface==='album'?'Millikin at North Central · September 23, 2026 · 43 photos':'The Work Doesn’t End at Send · September 29, 2026';
    const next=new URL(location.href);next.searchParams.set('surface',surface);next.searchParams.set('size',size);history.replaceState(null,'',next);fit();
  };
  document.querySelectorAll('input[name=surface]').forEach(input=>input.onchange=()=>{surface=input.value;update();});
  document.querySelectorAll('input[name=size]').forEach(input=>input.onchange=()=>{size=input.value;update();});
  const observer=new ResizeObserver(fit);frames.forEach(frame=>observer.observe(frame));
  update();
})();
