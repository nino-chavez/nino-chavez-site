const names={a:'Personal introduction',b:'Profile beside content',c:'Work in view'};
const preview=document.querySelector('#preview');
const frame=document.querySelector('#preview-frame');
const space=document.querySelector('#preview-space');
let state;
function readState(){const q=new URLSearchParams(location.search);return {concept:Object.hasOwn(names,q.get('concept'))?q.get('concept'):'a',surface:q.get('surface')==='links'?'links':'home',size:q.get('size')==='phone'?'phone':'desktop'};}
function resize(){const width=state.size==='phone'?390:1440;const height=state.size==='phone'?844:900;const scale=Math.min(1,(space.clientWidth-2)/width);preview.style.width=`${width}px`;preview.style.height=`${height}px`;preview.style.transform=`scale(${scale})`;frame.style.width=`${width*scale}px`;frame.style.height=`${height*scale}px`;}
function render(){const url=`${state.concept}/${state.surface==='links'?'links.html':'index.html'}`;if(preview.getAttribute('src')!==url)preview.src=url;preview.title=`${names[state.concept]} — ${state.surface==='home'?'Home':'Links'}`;document.querySelector('#full-size').href=url;document.querySelector('#view-description').textContent=`${names[state.concept]} · ${state.surface==='home'?'Home':'Links'} · ${state.size==='phone'?'390 × 844':'1440 × 900'} viewport. Scroll inside the page to see the rest.`;for(const key of ['concept','surface','size'])document.querySelectorAll(`[data-${key}]`).forEach(button=>button.setAttribute('aria-pressed',String(button.dataset[key]===state[key])));space.classList.toggle('phone',state.size==='phone');resize();}
for(const key of ['concept','surface','size'])document.querySelectorAll(`[data-${key}]`).forEach(button=>button.addEventListener('click',()=>{state[key]=button.dataset[key];history.pushState(null,'',`?${new URLSearchParams(state)}`);render();}));
addEventListener('popstate',()=>{state=readState();render();});
new ResizeObserver(resize).observe(space);
state=readState();render();
