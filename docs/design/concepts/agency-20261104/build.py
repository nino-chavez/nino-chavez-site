#!/usr/bin/env python3
"""Builds the three concept pages from the live site's real copy. Nothing here ships."""
import pathlib
ROOT=pathlib.Path(__file__).parent
NT='target="_blank" rel="noopener noreferrer"'
NEW='<span class="vh"> (opens in a new tab)</span>'
BLOG="https://ninochavez.co/blog/archive";PHOTO="https://ninochavez.co/photography/albums"
LIVE="https://ninochavez.co"
STATEMENT="I’m a product architect in Chicago. Outside work, I run volleyball events, take photographs, write, and DJ."
BIO1="I started in software engineering, moved through architecture and consulting, and now work as a Product Architect at commerce.com. I still prefer the part where a decision becomes a working system."
BIO2="Outside the day job, I run Let’s Pepper, build and operate Rally HQ, shoot volleyball through Flickday Media, publish Signal Dispatch, and keep a music practice on SoundCloud."
HOME_WORK=[
 dict(n="Minder",k="iPhone app",s="Activities, tasks, and selected calendars in one view of your day.",c="Published app preview; fictional sample day.",h="https://apps.apple.com/us/app/minder-your-day/id6803974428",i="minder.jpg",a="Minder app preview showing a fictional sample day",w=590,ht=1278),
 dict(n="Rally HQ",k="Web app",s="Tournament registration, brackets, schedules, and live court scoring.",h="https://rallyhq.app",i="rally-hq.webp",a="Rally HQ tournament interface",w=1400,ht=875),
 dict(n="The Rotation",k="Website",s="Find college volleyball matches and where to watch them.",h="https://therotation.tv",i="rotation.png",a="The Rotation schedule and must-watch match cards",w=1100,ht=820),
]
ALL_WORK=[
 dict(n="Minder",k="iOS app",s=HOME_WORK[0]["s"],v="On the App Store",act="Get Minder",c=HOME_WORK[0]["c"],h=HOME_WORK[0]["h"],i="minder.jpg",a=HOME_WORK[0]["a"],w=590,ht=1278),
 dict(n="Flickday Media",k="Sports-media business",s="Tournament photography, highlight reels, and event photo galleries.",act="Visit Flickday Media",h="https://flickdaymedia.com/",i="flickday.jpg",a="Volleyball photography from the Flickday Media portfolio",w=1066,ht=1600),
 dict(n="The Rotation",k="Website",s=HOME_WORK[2]["s"],act="Open The Rotation",h="https://therotation.tv/",i="rotation.png",a=HOME_WORK[2]["a"],w=1100,ht=820),
 dict(n="Let’s Pepper",k="Tournament series",s="Player-first grass volleyball tournaments, standings, and event galleries.",v="2026 season complete",act="Visit Let’s Pepper",h="https://letspepper.com/",i="lets-pepper-site.png",a="Let’s Pepper website with its tournament identity and grass volleyball photograph",w=1400,ht=875),
 dict(n="Rally HQ",k="Web app",s=HOME_WORK[1]["s"],act="Explore Rally HQ",h=LIVE+"/work/rally-hq",internal=True,i="rally-hq.webp",a=HOME_WORK[1]["a"],w=1400,ht=875),
]
def img(d,cls="",lazy=True,alt=True,sizes=""):
    return f'<img {f"class={chr(34)}{cls}{chr(34)}" if cls else ""} src="../assets/{d["i"]}" alt="{d["a"] if alt else ""}" width="{d["w"]}" height="{d["ht"]}"{" loading=lazy" if lazy else ""}>'
def target(d): return f'href="{d["h"]}"'+("" if d.get("internal") else f" {NT}")
def new(d): return "" if d.get("internal") else NEW
def page(title,css,body,js=""):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>{title}</title><link rel="stylesheet" href="../assets/shared.css"><link rel="stylesheet" href="{css}"></head>
<body><a class="skip" href="#main">Skip to content</a>{body}{f"<script>{js}</script>" if js else ""}</body></html>'''
def nav(cur=""):
    return f'''<nav class="nav" aria-label="Primary"><ul>
<li><a href="work.html"{' aria-current="page"' if cur=="work" else ""}>Work</a></li>
<li><a href="{BLOG}" {NT}>Writing{NEW}</a></li>
<li><a href="{PHOTO}" {NT}>Photography{NEW}</a></li>
<li><a href="{LIVE}/about">About</a></li>
<li><a class="nav-mail" href="mailto:nino@ninochavez.co">Email</a></li></ul></nav>'''
def foot():
    return f'''<footer class="foot"><p class="foot-name">Nino Chavez</p><nav aria-label="More destinations"><ul>
<li><a href="{LIVE}/links">Links</a></li><li><a href="{LIVE}/learn">Learn</a></li><li><a href="{LIVE}/demos">Sessions</a></li>
<li><a href="https://soundcloud.com/ni-no-cha-vez" {NT}>SoundCloud{NEW}</a></li><li><a href="{LIVE}/privacy">Privacy</a></li></ul></nav></footer>'''
NOTE='<p class="note">Writing and Photography open in their own sites.</p>'

# ---------- A: Masthead. Wordmark, photograph, then full-bleed colour panels.
LINKED=f'I’m a <a href="work.html">product architect</a> in Chicago. Outside work, I <a href="https://letspepper.com/" {NT}>run volleyball events{NEW}</a>, <a href="{PHOTO}" {NT}>take photographs{NEW}</a>, <a href="{BLOG}" {NT}>write{NEW}</a>, and <a href="https://soundcloud.com/ni-no-cha-vez" {NT}>DJ{NEW}</a>.'
def a_panels(items,all_=False):
    out=[]
    for i,d in enumerate(items):
        tone=["cobalt","ink","pale","porcelain","ink"][i%5]
        meta=f'<p class="p-kind">{d["k"]}</p>'
        extra=f'<p class="p-state">{d["v"]}</p>' if d.get("v") else ""
        act=f'<p class="p-act"><a {target(d)}>{d["act"]} <span aria-hidden="true">{"→" if d.get("internal") else "↗"}</span>{new(d)}</a></p>' if all_ else ""
        cap=f'<p class="p-cap">{d["c"]}</p>' if d.get("c") else ""
        tag="h2" if all_ else "h3"
        shape="tall" if d["ht"]>d["w"] else "wide"
        out.append(f'''<article class="panel panel--{tone} panel--{shape}"><div class="p-copy">{meta}<{tag} class="p-name"><a {target(d)}>{d["n"]}{new(d)}</a></{tag}><p class="p-sum">{d["s"]}</p>{extra}{cap}{act}</div>
<a class="p-img" {target(d)} tabindex="-1" aria-hidden="true">{img(d,alt=False)}</a></article>''')
    return "".join(out)
A_HOME=page("A Masthead · Nino Chavez","a.css",f'''
<header class="mast">{nav()}<h1 class="word"><a href="home.html">Nino <span>Chavez</span></a></h1></header>
<main id="main">
<section class="open" aria-labelledby="ph">
 <div class="open-copy"><p class="statement">{LINKED}</p>{NOTE}</div>
 <a class="open-photo" href="{PHOTO}" {NT}><img src="../assets/photography.webp" alt="Volleyball photograph" width="1080" height="1621" fetchpriority="high"><span class="open-cap"><span class="d" id="ph">Photography</span><span>Volleyball and event galleries{NEW}</span></span></a>
</section>
<section class="writing" aria-labelledby="wr"><h2 class="d" id="wr">Writing</h2><p><a href="{BLOG}" {NT}>Signal Dispatch{NEW}</a><br>My writing: essays, guides, presentations, and fiction.</p></section>
<section aria-labelledby="sw"><h2 class="sec d" id="sw"><a href="work.html">Selected work</a></h2>{a_panels(HOME_WORK)}</section>
<section class="about" aria-labelledby="ab"><img src="../assets/nino.jpg" alt="Nino Chavez with arms crossed" width="727" height="727" loading="lazy"><div><h2 class="d" id="ab">A little about me</h2><p>{BIO1}</p><p>{BIO2}</p><p><a href="{LIVE}/about">About</a></p></div></section>
<a class="touch d" href="mailto:nino@ninochavez.co">Get in touch</a>
</main>{foot()}''')
A_WORK=page("A Masthead · Work","a.css",f'''
<header class="mast mast--inner">{nav("work")}<p class="word word--back"><a href="home.html">Nino Chavez</a></p></header>
<main id="main"><div class="w-head"><h1 class="d w-title">Work</h1><div><p class="statement">Apps, websites, businesses, and the work behind them.</p><p><a href="{LIVE}/work?view=all">Browse all work <span aria-hidden="true">→</span></a></p></div></div>
<h2 class="vh">Selected work</h2>{a_panels(ALL_WORK,True).replace('<h2 class="p-name">','<h3 class="p-name">').replace('</h2><p class="p-sum">','</h3><p class="p-sum">')}</main>{foot()}''')

# ---------- B: Sentence. The statement is the navigation.
def b_rows(items,all_=False):
    rows=[]
    for i,d in enumerate(items):
        tag="h3"
        state=f'<span class="r-state">{d["v"]}</span>' if d.get("v") else ""
        cap=f'<span class="r-cap">{d["c"]}</span>' if d.get("c") else ""
        rows.append(f'''<li class="row" data-i="{i}"><{tag} class="r-name"><a {target(d)} data-i="{i}">{d["n"]}{new(d)}</a></{tag}><p class="r-meta"><span class="r-kind">{d["k"]}</span> {d["s"]} {state} {cap}</p><div class="r-img">{img(d)}</div></li>''')
    pane="".join(f'<img class="pane-img{" on" if i==0 else ""}" data-i="{i}" src="../assets/{d["i"]}" alt="" width="{d["w"]}" height="{d["ht"]}">' for i,d in enumerate(items))
    return f'<div class="rows-wrap"><ul class="rows">{"".join(rows)}</ul><div class="pane" aria-hidden="true">{pane}</div></div>'
B_JS='''var imgs=document.querySelectorAll('.pane-img');function show(i){imgs.forEach(function(m){m.classList.toggle('on',m.dataset.i===i)});document.querySelectorAll('.row').forEach(function(r){r.classList.toggle('on',r.dataset.i===i)})}
document.querySelectorAll('.row').forEach(function(r){r.addEventListener('mouseenter',function(){show(r.dataset.i)});r.addEventListener('focusin',function(){show(r.dataset.i)})});show('0');'''
def thumb(f,w,h): return f'<img class="t" src="../assets/{f}" alt="" width="{w}" height="{h}">'
B_HOME=page("B Sentence · Nino Chavez","b.css",f'''
<div class="stage"><header class="bar"><h1 class="name"><a href="home.html">Nino Chavez</a></h1>{nav()}</header>
<main id="main"><p class="sentence">I’m a <a href="work.html">product architect</a> in Chicago. Outside work, I <a href="https://letspepper.com/" {NT}><span class="nb">{thumb("lets-pepper-site.png",1400,875)}run</span> volleyball events{NEW}</a>, <a href="{PHOTO}" {NT}><span class="nb">{thumb("flickday.jpg",1066,1600)}take</span> photographs{NEW}</a>, <a href="{BLOG}" {NT}>write{NEW}</a>, and <a href="https://soundcloud.com/ni-no-cha-vez" {NT}>DJ{NEW}</a>.</p>
{NOTE}</main></div>
<section class="split" aria-labelledby="ph"><a class="split-photo" href="{PHOTO}" {NT}><img src="../assets/photography.webp" alt="Volleyball photograph" width="1080" height="1621" loading="lazy"></a><div class="split-copy"><div><h2 class="big" id="ph"><a href="{PHOTO}" {NT}>Photography{NEW}</a></h2><p>Volleyball and event galleries</p></div><div class="split-w"><h2 class="big" id="wr"><a href="{BLOG}" {NT}>Writing{NEW}</a></h2><p><a href="{BLOG}" {NT}>Signal Dispatch{NEW}</a><br>My writing: essays, guides, presentations, and fiction.</p></div></div></section>
<section class="work" aria-labelledby="sw"><h2 class="sec" id="sw"><a href="work.html">Selected work</a></h2>{b_rows(HOME_WORK)}</section>
<section class="about" aria-labelledby="ab"><h2 class="sec" id="ab">A little about me</h2><div class="about-grid"><p class="about-lead">{BIO1}</p><div><img src="../assets/nino.jpg" alt="Nino Chavez with arms crossed" width="727" height="727" loading="lazy"><p>{BIO2}</p><p class="about-act"><a href="{LIVE}/about">About</a> <a class="mail" href="mailto:nino@ninochavez.co">Get in touch</a></p></div></div></section>
{foot()}''',B_JS)
B_WORK=page("B Sentence · Work","b.css",f'''
<div class="stage stage--short"><header class="bar"><p class="name"><a href="home.html">Nino Chavez</a></p>{nav("work")}</header>
<main id="main"><h1 class="w-h1">Work</h1><p class="w-lede">Apps, websites, businesses, and the work behind them.</p></main></div>
<section class="work" aria-labelledby="sw"><h2 class="sec" id="sw">Selected work</h2>{b_rows(ALL_WORK,True)}<p class="browse"><a href="{LIVE}/work?view=all">Browse all work <span aria-hidden="true">→</span></a></p></section>
{foot()}''',B_JS)

# ---------- C: Wall. Opens on the work itself, edge to edge.
def tile(d,cls,all_=False,h="h3"):
    state=f' <span class="t-state">{d["v"]}</span>' if d.get("v") else ""
    cap=f'<p class="t-cap">{d["c"]}</p>' if d.get("c") else ""
    return f'''<article class="tile {cls}"><a class="t-img" {target(d)} tabindex="-1" aria-hidden="true">{img(d,alt=False,lazy=False)}</a><div class="t-label"><{h} class="t-name"><a {target(d)}>{d["n"]}{new(d)}</a></{h}><p class="t-kind">{d["k"]}{state}</p><p class="t-sum">{d["s"]}</p>{cap}</div></article>'''
PHOTO_D=dict(n="Photography",k="Volleyball and event galleries",s="",h=PHOTO,i="photography.webp",a="Volleyball photograph",w=1080,ht=1621)
C_HOME=page("C Wall · Nino Chavez","c.css",f'''
<header class="bar"><p class="name"><a href="home.html">Nino Chavez</a></p>{nav()}</header>
<main id="main"><div class="wall">
<section class="tile t-id"><h1>Nino<br>Chavez</h1><p>{STATEMENT}</p>{NOTE}</section>
<section class="tile t-photo" aria-labelledby="ph"><a class="t-img" href="{PHOTO}" {NT} tabindex="-1" aria-hidden="true"><img src="../assets/photography.webp" alt="" width="1080" height="1621"></a><div class="t-label"><h2 class="t-name" id="ph"><a href="{PHOTO}" {NT}>Photography{NEW}</a></h2><p class="t-kind">Volleyball and event galleries</p></div></section>
{tile(HOME_WORK[0],"t-minder")}{tile(HOME_WORK[1],"t-rally")}{tile(HOME_WORK[2],"t-rotation")}
<section class="tile t-write" aria-labelledby="wr"><h2 id="wr"><a href="{BLOG}" {NT}>Writing{NEW}</a></h2><p><a href="{BLOG}" {NT}>Signal Dispatch{NEW}</a><br>My writing: essays, guides, presentations, and fiction.</p></section>
<section class="tile t-all"><h2><a href="work.html">Selected work <span aria-hidden="true">→</span></a></h2></section>
</div>
<section class="about" aria-labelledby="ab"><img src="../assets/nino.jpg" alt="Nino Chavez with arms crossed" width="727" height="727" loading="lazy"><div class="about-t"><h2 id="ab">A little about me</h2><p>{BIO1}</p><p>{BIO2}</p><p class="about-act"><a href="{LIVE}/about">About</a> <a class="mail" href="mailto:nino@ninochavez.co">Get in touch</a></p></div></section>
</main>{foot()}''')
C_WORK=page("C Wall · Work","c.css",f'''
<header class="bar"><p class="name"><a href="home.html">Nino Chavez</a></p>{nav("work")}</header>
<main id="main"><div class="wall wall--work">
<section class="tile t-id"><h1>Work</h1><p>Apps, websites, businesses, and the work behind them.</p><p class="browse"><a href="{LIVE}/work?view=all">Browse all work <span aria-hidden="true">→</span></a></p></section>
{"".join(tile(d,c) for d,c in zip(ALL_WORK,["w-minder","w-flick","w-rot","w-pep","w-rally"]))}
</div></main>{foot()}''')
PAL={"flare":"Flare","clash":"Clash","night":"Night Game","ultra":"Ultra","gallery":"Gallery","arena":"Arena","bookend":"Bookend"}
for k,nm in PAL.items():
    d=ROOT/"m"/k; d.mkdir(parents=True,exist_ok=True)
    for f,src,cl in (("home.html",A_HOME,""),("work.html",A_WORK,"on-work")):
        h=src.replace('<link rel="stylesheet" href="a.css">',f'<link rel="stylesheet" href="../../a/a.css"><link rel="stylesheet" href="../../palettes/{k}.css">').replace('../assets/','../../assets/').replace("<title>A Masthead",f"<title>{nm}")
        if cl: h=h.replace('<body>',f'<body class="{cl}">')
        (d/f).write_text(h)
for p,c in {"a/home.html":A_HOME,"a/work.html":A_WORK,"b/home.html":B_HOME,"b/work.html":B_WORK,"c/home.html":C_HOME,"c/work.html":C_WORK}.items():
    (ROOT/p).write_text(c)
