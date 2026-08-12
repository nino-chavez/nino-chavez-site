const assetRoot = "../../../public/work";

const workItems = [
  ["blueprint", "Blueprint", "A practical method for planning, reviewing, and checking product work done with AI agents.", "Developer tools", "Maintained", "docs", "2026-07-28"],
  ["browse-tool", "Browse Tool", "A command-line browser workflow that lets agents inspect real product surfaces.", "Developer tools", "Maintained", "cli", "2026-07-25"],
  ["specchain", "Specchain", "A staged workflow that turns a feature request into specifications, implementation, and verification.", "Developer tools", "Maintained", "cli", "2026-07-22"],
  ["claude-recall", "Claude Recall", "A local command-line index for recovering decisions and context from prior agent sessions.", "Developer tools", "Maintained", "cli", "2026-07-19"],
  ["agentic-ways-of-working", "Agentic Ways of Working", "A public set of rules and tools for delegating work to AI agents and reviewing what comes back.", "Developer tools", "Maintained", "docs", "2026-07-18"],
  ["fleet-observability", "Fleet Observability", "A private daily report that monitors repositories, deployments, costs, domains, and key user journeys.", "Developer tools", "Live", "service", "2026-07-12"],
  ["repo-health-check", "Repo Health Check", "A public command-line audit for GitHub settings, stale links, failed deployments, and neglected pull requests.", "Developer tools", "Maintained", "cli", "2026-07-11"],
  ["gha-minutes", "GHA Minutes", "A tool that finds wasted GitHub Actions time and cancels superseded runs without interrupting releases.", "Developer tools", "Maintained", "cli", "2026-07-10"],
  ["design-qa", "Design QA", "A local quality check that keeps visual exceptions tied to explicit, reviewable design decisions.", "Developer tools", "In development", "cli", "2026-07-09"],
  ["ways-of-working", "Ways of Working", "Published sessions and applied techniques drawn from real work with AI agents.", "Developer tools", "Live", "collection", "2026-07-30"],
  ["local-dictation", "Local Dictation", "On-device speech capture and transcription designed to keep recordings local.", "Local-first", "Maintained", "app", "2026-07-27"],
  ["local-meeting-notes", "Local Meeting Notes", "Research toward a Mac meeting notetaker that keeps audio local and ties every note back to the transcript.", "Local-first", "In development", "app", "2026-07-23"],
  ["rally-hq", "Rally HQ", "Tournament registration, brackets, schedules, and live scoring in one public event page.", "Volleyball", "Live", "site", "2026-07-26"],
  ["lets-pepper", "Let’s Pepper", "A player-first grass volleyball tournament series with events, divisions, and photography.", "Volleyball", "Live", "site", "2026-07-24"],
  ["film-room", "Film Room", "A local desktop app for reviewing sports and event footage, recording decisions, and preparing editor-ready outputs.", "Volleyball", "In development", "app", "2026-07-21"],
  ["flickday", "Flickday Media", "Grassroots sports media with on-site tournament photography, quick-turn reels, and same-day photo drops.", "Volleyball", "Live", "site", "2026-07-31"],
  ["volleyrx", "Volley Rx", "Professionally organized volleyball tournaments across the Chicagoland area.", "Volleyball", "Live", "site", "2026-07-31"],
  ["commerce-architecture", "Commerce architecture", "25+ years designing and delivering commerce platforms across retail, B2B, grocery, and multi-brand businesses.", "Commerce", "Published", "experience", "2026-07-31"],
  ["forge-brand", "Forge Brand", "A system for turning approved brand direction into reusable colors, type, components, and visual assets.", "Media & assets", "Maintained", "toolkit", "2026-07-17"],
  ["forge-site", "Forge Site", "A site-building playbook that matches client needs to proven archetypes, modules, and delivery steps.", "Media & assets", "Maintained", "toolkit", "2026-07-06"],
  ["image-gen", "Image Gen", "Tools for generating images with AI or rendering them from reusable HTML templates.", "Media & assets", "Maintained", "toolkit", "2026-07-04"],
  ["render-kit", "Render Kit", "Tools for producing consistent graphics and walkthroughs across sites and campaigns.", "Media & assets", "Maintained", "toolkit", "2026-07-03"],
  ["nino-chavez-photography", "Nino Chavez Photography", "Volleyball action photography organized so players can find, download, and keep their frames.", "Media & assets", "Live", "site", "2026-07-02"],
  ["signal-dispatch", "Signal Dispatch", "Essays, fiction, tutorials, and research on architecture, commerce, and AI-assisted work.", "Writing", "Live", "collection", "2026-07-30"],
  ["whitepapers", "Whitepapers", "Longer-form arguments and field guides published alongside the essay archive.", "Writing", "Published", "collection", "2026-06-28"],
  ["presentations", "Presentations", "Published decks that turn working decisions into material other practitioners can use.", "Writing", "Published", "collection", "2026-06-26"],
].map(([slug, name, claim, domain, state, form, updated]) => ({
  slug,
  name,
  claim,
  domain,
  state,
  form,
  updated,
}));

const sessions = [
  ["01", "twelve-messages", "Twelve Messages", "Everything typed to take a live event from spreadsheet chaos to published social content.", "demo-twelve-messages.jpg"],
  ["02", "browse-tool", "The Browser Is a Shell Command", "A smaller browser interface made the agent sharper, not weaker.", "demo-browse-tool.jpg"],
  ["03", "enforced-forever", "Taught Once, Enforced Forever", "Helpers, deny-hooks, and checks carry a correction past the session that produced it.", "demo-enforced-forever.jpg"],
  ["04", "session-corpus", "Your Sessions Are a Corpus", "Agent-session transcripts become a searchable record of corrections and durable work.", "demo-session-corpus.jpg"],
  ["05", "feedback-loop", "The Product That Files Its Own Tickets", "User feedback becomes triaged work while a human keeps the only merge key.", "demo-feedback-loop.jpg"],
  ["06", "landmine-registry", "The Registry of Landmines", "One file holds the load-bearing facts search cannot find and checks them in CI.", "demo-landmine-registry.jpg"],
  ["07", "said-it-checked", "The Agent Said It Checked", "A verification claim is tested against the runtime it describes.", "demo-said-it-checked.jpg"],
  ["08", "agentic-gates", "Gates Between Agentic Stages", "Deterministic checks verify the seams between stages of agent-executed work.", "demo-agentic-gates.jpg"],
  ["09", "beautifier", "The Beautifier Was an Auditor", "A README polish pass exposed stale deploy instructions and undocumented capabilities.", "demo-beautifier.jpg"],
  ["10", "four-questions", "The Chiropractor’s Four Questions", "Confident comparison research is traced back to the marketing claims beneath it.", "demo-four-questions.jpg"],
  ["11", "config-probe", "The Sycophancy Was in the Config", "A controlled test separated model behavior from the instructions wrapped around it.", "demo-config-probe.jpg"],
  ["12", "adopt-or-skip", "One Component I Didn’t Already Have", "A large plugin is measured against the tools and rules already in place.", "demo-adopt-or-skip.jpg"],
].map(([number, slug, title, summary, image]) => ({ number, slug, title, summary, image }));

const selected = [
  {
    name: "Rally HQ",
    copy: "Tournament registration, brackets, schedules, and live scoring in one public event page.",
    image: "rally-hq.webp",
    href: "#detail/rally-hq",
    alt: "Rally HQ live tournament court display",
  },
  {
    name: "Blueprint",
    copy: "A practical method for planning, reviewing, and checking product work done with AI agents.",
    image: "blueprint.png",
    href: "#detail/blueprint",
    alt: "Blueprint method mark",
  },
  {
    name: "Photography",
    copy: "Volleyball action photography organized so players can find, download, and keep their frames.",
    image: "photography.webp",
    href: "#photography",
    alt: "Volleyball player holding a ball before play",
  },
];

const main = document.querySelector("#main");
const routeLinks = [...document.querySelectorAll("[data-route-link]")];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function homeView() {
  return `
    <div class="shell">
      <section class="home-hero" aria-labelledby="home-title">
        <div class="home-hero__copy">
          <p class="home-hero__label">Product architect and builder · Chicago</p>
          <h1 id="home-title">Nino Chavez</h1>
          <p class="home-hero__claim">I design products, build the software behind them, and run them in the real world.</p>
          <div class="actions">
            <a class="primary-action" href="#work">Browse all work</a>
            <a class="secondary-action" href="#demos">See how I work →</a>
          </div>
        </div>
        <figure class="home-hero__portrait">
          <img src="${assetRoot}/nino.jpg" alt="Nino Chavez" />
          <figcaption>Product architect · Chicago</figcaption>
        </figure>
      </section>

      <section class="section" aria-labelledby="selected-title">
        <header class="section-heading">
          <h2 id="selected-title">Three places to start</h2>
          <p>A live product, a published method, and the photography archive. Each opens into the work itself.</p>
        </header>
        <div class="selected-work">
          ${selected.map((item) => `
            <a class="selected-record" href="${item.href}">
              <span class="selected-record__media"><img src="${assetRoot}/${item.image}" alt="${item.alt}" /></span>
              <strong class="selected-record__name">${item.name}</strong>
              <span class="selected-record__copy">${item.copy}</span>
              <span class="selected-record__arrow" aria-hidden="true">→</span>
            </a>
          `).join("")}
        </div>
      </section>

      <section class="section" aria-labelledby="collections-title">
        <header class="section-heading">
          <h2 id="collections-title">The complete practice is one step deeper</h2>
          <p>Use the collection that matches what you want to inspect: the work, the sessions, or the writing.</p>
        </header>
        <nav class="collection-links" aria-label="Portfolio collections">
          <a href="#work"><strong>Work</strong><span>26 products, tools, methods, and collections</span><b>Browse all work →</b></a>
          <a href="#demos"><strong>Demos</strong><span>12 complete sessions and 8 applied techniques</span><b>See the sessions →</b></a>
          <a href="#writing"><strong>Writing</strong><span>Essays, whitepapers, and presentations</span><b>Read Signal Dispatch →</b></a>
        </nav>
      </section>
    </div>`;
}

function optionList(values, label) {
  return [`<option value="">All ${label}</option>`, ...values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`)].join("");
}

function workView(params) {
  const domains = [...new Set(workItems.map((item) => item.domain))];
  const states = [...new Set(workItems.map((item) => item.state))];
  const forms = [...new Set(workItems.map((item) => item.form))];
  const initialDomain = params.get("domain") || "";

  return `
    <div class="shell">
      <section class="page-opening" aria-labelledby="work-title">
        <header class="page-intro">
          <div>
            <p class="evidence-label">Complete public inventory</p>
            <h1 id="work-title">Work</h1>
          </div>
          <div class="page-intro__meta">
            <p class="page-intro__lede">Products, tools, methods, experiences, and collections. State describes availability; it does not decide what belongs.</p>
            <a href="#work?domain=Developer%20tools">View a filtered example →</a>
          </div>
        </header>

        <form class="controls" id="work-controls">
          <div class="control">
            <label for="work-query">Search work</label>
            <input id="work-query" type="search" placeholder="Name or purpose" autocomplete="off" />
          </div>
          <div class="control">
            <label for="work-domain">Domain</label>
            <select id="work-domain">${optionList(domains, "domains")}</select>
          </div>
          <div class="control">
            <label for="work-state">Lifecycle state</label>
            <select id="work-state">${optionList(states, "states")}</select>
          </div>
          <div class="control">
            <label for="work-form">Form</label>
            <select id="work-form">${optionList(forms, "forms")}</select>
          </div>
        </form>

        <div class="controls-status">
          <p id="work-status" aria-live="polite">Showing all ${workItems.length} records.</p>
          <button class="reset-filters" type="button" hidden>Reset filters</button>
        </div>
      </section>

      <div class="work-list" id="work-list">
        ${workItems.map((item) => `
          <a class="work-row" href="#detail/${item.slug}" data-name="${escapeHtml(item.name.toLowerCase())}" data-claim="${escapeHtml(item.claim.toLowerCase())}" data-domain="${escapeHtml(item.domain)}" data-state="${escapeHtml(item.state)}" data-form="${escapeHtml(item.form)}">
            <span class="work-row__domain">${escapeHtml(item.domain)}</span>
            <span class="work-row__copy"><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.claim)}</p></span>
            <span class="work-row__meta"><span>${escapeHtml(item.state)}</span><span>${escapeHtml(item.form)} · ${escapeHtml(item.updated)}</span></span>
            <span class="work-row__arrow" aria-hidden="true">→</span>
          </a>
        `).join("")}
        <div class="empty-results" hidden>
          <h2>No work matches those filters</h2>
          <p>Change or reset one filter to restore the complete inventory.</p>
        </div>
      </div>
    </div>
    <span id="initial-domain" data-value="${escapeHtml(initialDomain)}" hidden></span>`;
}

function demosView() {
  return `
    <div class="shell">
      <section class="page-opening" aria-labelledby="demos-title">
        <header class="page-intro">
          <div>
            <p class="evidence-label">Ways of working</p>
            <h1 id="demos-title">Demos</h1>
          </div>
          <div class="page-intro__meta">
            <p class="page-intro__lede">Complete sessions show what happened, what failed, what changed, and which techniques held up.</p>
            <a href="#work?domain=Developer%20tools">Browse related work →</a>
          </div>
        </header>
      </section>
      <div class="demo-grid">
        ${sessions.map((session) => `
          <a class="session-card" href="#demo/${session.slug}">
            <span class="session-card__media"><img src="${assetRoot}/${session.image}" alt="Source frame from ${escapeHtml(session.title)}" /></span>
            <span class="session-card__number">Session ${session.number}</span>
            <h2>${escapeHtml(session.title)}</h2>
            <p>${escapeHtml(session.summary)}</p>
            <span class="session-card__action">Open the session →</span>
          </a>
        `).join("")}
      </div>
    </div>`;
}

function rallyDetailView() {
  return `
    <div class="shell">
      <nav class="detail-breadcrumbs" aria-label="Breadcrumbs">
        <a href="#work">Work</a><span aria-hidden="true">/</span><span aria-current="page">Rally HQ</span>
      </nav>
      <section class="detail-opening" aria-labelledby="detail-title">
        <div class="detail-opening__copy">
          <p class="evidence-label">Live · Site · Volleyball</p>
          <h1 class="detail-title" id="detail-title">Rally HQ</h1>
          <p class="detail-claim">Tournament registration, brackets, schedules, and live scoring in one public event page.</p>
        </div>
        <a class="primary-action detail-opening__action" href="https://rallyhq.app">Open Rally HQ ↗</a>
      </section>
      <figure class="detail-media">
        <img src="${assetRoot}/rally-hq.webp" alt="Rally HQ live tournament court display" />
        <figcaption>Live court display showing scores, court assignments, and the next matches.</figcaption>
      </figure>
      <section class="detail-body" aria-labelledby="rally-does-title">
        <div>
          <h2 id="rally-does-title">What it does</h2>
          <p>Rally HQ keeps registration, brackets, schedules, and live scoring together. The public event page gives players and operators one current place to check what is happening.</p>
          <p><a href="#demos">See related working sessions →</a></p>
        </div>
        <dl class="detail-facts">
          <div><dt>State</dt><dd>Live — available to use now</dd></div>
          <div><dt>Form</dt><dd>Site</dd></div>
          <div><dt>Domain</dt><dd>Volleyball</dd></div>
          <div><dt>Updated</dt><dd>July 26, 2026</dd></div>
        </dl>
      </section>
    </div>`;
}

function genericDetailView(slug) {
  const item = workItems.find((candidate) => candidate.slug === slug);
  if (!item) return placeholderView("Page not found", "Return to Work to choose a public record.", "#work", "Browse all work");
  return `
    <div class="shell">
      <nav class="detail-breadcrumbs" aria-label="Breadcrumbs"><a href="#work">Work</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(item.name)}</span></nav>
      <section class="detail-opening" aria-labelledby="detail-title">
        <div class="detail-opening__copy">
          <p class="evidence-label">${escapeHtml(item.state)} · ${escapeHtml(item.form)} · ${escapeHtml(item.domain)}</p>
          <h1 class="detail-title" id="detail-title">${escapeHtml(item.name)}</h1>
          <p class="detail-claim">${escapeHtml(item.claim)}</p>
        </div>
        <a class="secondary-action detail-opening__action" href="#work">Back to all work →</a>
      </section>
      <section class="detail-body">
        <div><h2>Prototype boundary</h2><p>This system review fully composes Rally HQ as the representative detail page. Other records remain concise so the prototype does not invent evidence or case-study copy.</p></div>
        <dl class="detail-facts"><div><dt>State</dt><dd>${escapeHtml(item.state)}</dd></div><div><dt>Form</dt><dd>${escapeHtml(item.form)}</dd></div><div><dt>Domain</dt><dd>${escapeHtml(item.domain)}</dd></div><div><dt>Updated</dt><dd>${escapeHtml(item.updated)}</dd></div></dl>
      </section>
    </div>`;
}

function placeholderView(title, copy, href = "#home", action = "Return home") {
  return `<div class="shell"><section class="placeholder-page"><p class="evidence-label">Navigation contract preview</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(copy)}</p><p><a class="secondary-action" href="${href}">${escapeHtml(action)} →</a></p></section></div>`;
}

function attachWorkControls(params) {
  const form = document.querySelector("#work-controls");
  if (!form) return;
  const query = document.querySelector("#work-query");
  const domain = document.querySelector("#work-domain");
  const state = document.querySelector("#work-state");
  const formSelect = document.querySelector("#work-form");
  const status = document.querySelector("#work-status");
  const reset = document.querySelector(".reset-filters");
  const rows = [...document.querySelectorAll(".work-row")];
  const empty = document.querySelector(".empty-results");

  domain.value = params.get("domain") || "";
  if (params.get("focus") === "search") query.focus();

  function filter() {
    const needle = query.value.trim().toLowerCase();
    let visible = 0;
    for (const row of rows) {
      const searchMatch = !needle || row.dataset.name.includes(needle) || row.dataset.claim.includes(needle);
      const domainMatch = !domain.value || row.dataset.domain === domain.value;
      const stateMatch = !state.value || row.dataset.state === state.value;
      const formMatch = !formSelect.value || row.dataset.form === formSelect.value;
      row.hidden = !(searchMatch && domainMatch && stateMatch && formMatch);
      if (!row.hidden) visible += 1;
    }
    const filtered = visible !== rows.length;
    status.textContent = filtered ? `Showing ${visible} of ${rows.length} records.` : `Showing all ${rows.length} records.`;
    reset.hidden = !filtered;
    empty.hidden = visible !== 0;
  }

  form.addEventListener("input", filter);
  form.addEventListener("change", filter);
  form.addEventListener("submit", (event) => event.preventDefault());
  reset.addEventListener("click", () => {
    form.reset();
    filter();
    query.focus();
  });
  filter();
}

function setActiveRoute(route) {
  const owner = route.startsWith("detail") ? "work" : route.startsWith("demo/") ? "demos" : route;
  for (const link of routeLinks) {
    if (link.dataset.routeLink === owner) link.setAttribute("aria-current", owner === route ? "page" : "true");
    else link.removeAttribute("aria-current");
  }
}

function renderRoute() {
  const raw = location.hash.slice(1) || "home";
  const [path, queryString = ""] = raw.split("?");
  const params = new URLSearchParams(queryString);
  const [route, slug] = path.split("/");

  if (route === "home") main.innerHTML = homeView();
  else if (route === "work") main.innerHTML = workView(params);
  else if (route === "demos") main.innerHTML = demosView();
  else if (route === "detail" && slug === "rally-hq") main.innerHTML = rallyDetailView();
  else if (route === "detail") main.innerHTML = genericDetailView(slug);
  else if (route === "demo") main.innerHTML = placeholderView("Session detail", "The Demos collection proves the shared media and caption system. Production session pages keep their existing ordered content.", "#demos", "Return to Demos");
  else if (route === "learn") main.innerHTML = placeholderView("Learn", "Seven grounded paths help practitioners find the work, sessions, and writing that match what they are trying to do.");
  else if (route === "writing") main.innerHTML = placeholderView("Writing", "Signal Dispatch carries essays, whitepapers, and presentations without becoming a second personal homepage.");
  else if (route === "photography") main.innerHTML = placeholderView("Photography", "The photography collection keeps its own browsing controls and lets the images carry the surface.");
  else if (route === "about") main.innerHTML = placeholderView("About", "A durable biography, the working model behind the portfolio, and direct links to current activity.");
  else if (route === "now") main.innerHTML = placeholderView("Now", "A dated view of current focus and active work.");
  else if (route === "links") main.innerHTML = placeholderView("Links", "Maintained destinations for profiles, publications, products, and contact.");
  else main.innerHTML = placeholderView("Page not found", "Choose a destination from the navigation.");

  setActiveRoute(route);
  if (route === "work") attachWorkControls(params);
  main.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "auto" });
}

const menu = document.querySelector("#mobile-menu");
const menuButton = document.querySelector(".menu-button");
const menuClose = document.querySelector(".menu-close");

function openMenu() {
  menu.hidden = false;
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  menuClose.focus();
}

function closeMenu({ returnFocus = true } = {}) {
  menu.hidden = true;
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener("click", openMenu);
menuClose.addEventListener("click", () => closeMenu());
document.addEventListener("keydown", (event) => {
  if (menu.hidden) return;
  if (event.key === "Escape") {
    closeMenu();
    return;
  }
  if (event.key === "Tab") {
    const focusable = [...menu.querySelectorAll("a[href], button, input")].filter(
      (element) => !element.disabled && !element.hidden,
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
menu.addEventListener("click", (event) => {
  if (event.target.closest("[data-mobile-route]")) closeMenu({ returnFocus: false });
});
document.querySelector(".mobile-search").addEventListener("submit", (event) => {
  event.preventDefault();
  const value = document.querySelector("#mobile-query").value.trim();
  closeMenu({ returnFocus: false });
  location.hash = value ? `work?focus=search` : "work";
  requestAnimationFrame(() => {
    const input = document.querySelector("#work-query");
    if (input && value) {
      input.value = value;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
});

window.addEventListener("hashchange", renderRoute);
renderRoute();
