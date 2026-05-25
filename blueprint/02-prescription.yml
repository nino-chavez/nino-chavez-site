# ninochavez.co v3 — Stage 3: Prescription (refreshed 2026-05-25)
#
# Supersedes the original 2026-05-24 prescription. Reason: original locked a
# flat 5-case-study slate IA and "site-as-prototype" review model. Both
# changed — cluster IA per ADR-0009 and paired blueprint portal per ADR-0008.
# The v3 SvelteKit app was nuked 2026-05-25 (ask-dad RAG backend + blueprint
# substrate preserved); rebuild is from prescription output, not from
# in-place refactor.

client:
  name: "Nino Chavez"
  domain: "ninochavez.co"
  paired_blueprint_domain: "blueprint.ninochavez.co"
  archetype: "portfolio-brand"
  variant: "consulting-personal-portfolio"
  positioning: "context-engineer-hirable-and-known"

stack:
  framework_main: "sveltekit"        # SvelteKit 2 + Svelte 5 runes
  framework_blueprint: "static-html-pages-functions"  # big-blueprint portal/ template v2
  database: "none"                   # Static data; ask-dad RAG uses Vectorize (already shipped)
  cms: "markdown"                    # Nino is editor; code = source of truth
  auth: "none"
  payments: "none"
  email: "resend"
  analytics: "cloudflare-web"
  deployment: "cloudflare-pages"
  rag_storage: "cloudflare-vectorize"  # askdad-corpus index — already live (ADR-0007)

modules:
  required:
    - "seo-structured-data"
    - "cloudflare-web-analytics"
    - "portal-shell"                 # big-blueprint v2 template (ADR-0008) — stamped at blueprint/portal/
    - "pages-function-chat"          # portal chat backed by shared askdad-corpus
  recommended:
    - "contact-forms"
    - "email-resend"
  deferred:
    - "cms-sanity — defer until non-developer editor joins"
    - "analytics-posthog — defer until traffic warrants segmentation"
    - "state-derive-counts — defer until cluster counts drift becomes a real maintenance problem"
  cut:
    - "booking-calcom — transactional framing contradicts positioning"

sitemap_main:
  - path: "/"
    purpose: "Hero + credibility ribbon + compressed cluster ribbon + practice teaser + writing teaser + chat entry"
    compositions: 6
  - path: "/about"
    purpose: "Narrative — who, where, the practice, photography subdomain link"
    compositions: 3
  - path: "/practice"
    purpose: "Toolchain + substrate + operating rules + instrumentation evidence"
    compositions: 4
    sub_sections:
      - "production-line"     # forge family (8 repos, 1 PUB umbrella)
      - "substrate"           # hooks + skills/subagents + session mining + Hive
      - "operating-rules"     # 4 rules from ~/.claude/CLAUDE.md
      - "instrumentation"     # hesitation fold + corpus stats + adversarial tests
  - path: "/work"
    purpose: "Cluster surfacing per ADR-0009 — hero + cluster ribbon + 8 per-cluster editorial sections"
    compositions: 10
    cluster_sections:
      - "forge-production-line"     # schematic composition (lead — load-bearing for positioning)
      - "agent-infrastructure"      # repo card grid
      - "ai-products"               # case-study deep dives + compact tail
      - "commerce-bc"               # case-study deep dives + compact tail
      - "volleyball-630"            # rally-hq hero deep dive + compact tail
      - "personal-orbit"            # live URLs list
      - "client-work"               # compact list (4 items)
      - "writing"                   # pointer composition → /writing
  - path: "/work/[cluster]/[slug]"
    purpose: "Per-project deep dive — hero → schematic → approach → quotable artifact → outcome"
    compositions: 5
    lead_slugs:
      - "ai-products/atelier"        # PUBLIC
      - "ai-products/ask-dad"
      - "ai-products/cortex"         # PUBLIC
      - "commerce-bc/bc-subscriptions"
      - "commerce-bc/ask-bc"
      - "volleyball-630/rally-hq"    # paired with blueprint.rallyhq.app
  - path: "/writing"
    purpose: "All 7 collections surfaced — blog / whitepapers / series / fiction / presentations / counterpoints / tutorials. Counts + flagships per."
    compositions: 4
  - path: "/contact"
    purpose: "Single form + email/GitHub/LinkedIn lines"
    compositions: 2
  - path: "/api/person.json"
    purpose: "AEO — Schema.org Person, leads with context-engineer"
  - path: "/api/expertise.json"
    purpose: "AEO — Schema.org ItemList, leads with toolchain"
  - path: "/api/experience.json"
    purpose: "AEO — work history, context-engineer narrative"
  - path: "/api/contact.json"
    purpose: "AEO — ContactPoint"
  - path: "/api/ask/chat"
    purpose: "PRESERVED — ask-dad RAG endpoint. Already shipped + working. UI surfacing decision deferred per cluster IA."
    status: "kept from pre-nuke; do not redeploy"

sitemap_blueprint_portal:
  # Per blueprint/portal/CONVENTIONS.md — one prototype page per main-site route + cluster pages
  - path: "/"
    purpose: "Studio catalog — slice cards + flow links + corpus chat entry"
  - path: "/pages/home.html"
    purpose: "Prototype of main-site / with strategy + current-state drawers"
    slice: "marketing"
  - path: "/pages/work-cluster.html"
    purpose: "Prototype of /work cluster surfacing — exposes cluster ribbon + 8 sections"
    slice: "case-studies"
  - path: "/pages/practice.html"
    purpose: "Prototype of /practice"
    slice: "operator"
  - path: "/pages/writing-index.html"
    purpose: "Prototype of /writing with all 7 collections"
    slice: "writing"
  - path: "/pages/about.html"
    purpose: "Prototype of /about"
    slice: "about"
  - path: "/pages/contact.html"
    purpose: "Prototype of /contact"
    slice: "contact"
  - path: "/docs/"
    purpose: "Markdown viewer for blueprint/*.md (ADRs, design principles, research)"
  - path: "/functions/api/chat.js"
    purpose: "Pages Function — chat backed by askdad-corpus Vectorize index (shared with main site /api/ask/chat)"

# Cluster surface — the heart of the IA per ADR-0009
clusters:
  forge-production-line:
    repos_total: 8
    repos_public: 1                  # forge (umbrella)
    public_anchor: "forge"
    composition: "production-line-schematic"
    lead_repos: ["forge", "specchain", "big-blueprint", "forge-brand", "forge-signal", "forge-site", "image-gen"]
    rationale: "Load-bearing for 'context engineer codified a working practice' positioning. Schematic prominence."
  agent-infrastructure:
    repos_total: 10
    repos_public: 1                  # ai-champions-kit
    composition: "repo-card-grid"
    lead_repos: ["ai-hive", "ai-champions-kit", "claude-recall-cli", "claude-orchestrator", "worktree-orchestrator", "browse-tool"]
  ai-products:
    repos_total: 18
    repos_public: 6                  # atelier, cortex, ai-analyst-academy, quantifai-sync, quantifai-homebrew-tap, venue-aurora
    composition: "case-study-deep-dive + compact-tail"
    deep_dive_repos: ["atelier", "cortex", "ask-dad"]
    paused: ["quantifai-platform"]
  commerce-bc:
    repos_total: 10
    repos_public: 1                  # commerce-prompt-analyzer
    composition: "case-study-deep-dive + compact-tail"
    deep_dive_repos: ["bc-subscriptions", "ask-bc", "aisles"]
  volleyball-630:
    repos_total: 9
    repos_public: 1                  # letspepper
    composition: "hero-case-study + compact-tail"
    hero_repo: "rally-hq"
    hero_paired_deploy: "blueprint.rallyhq.app"
  personal-orbit:
    repos_total: 7
    composition: "live-url-list"
    surfaces: ["ninochavez.co", "blog.ninochavez.co", "photography.ninochavez.co", "signalx.studio", "flickdaymedia.com"]
  client-work:
    repos_total: 4
    composition: "compact-list"
  writing:
    artifacts_total: 275
    collections:
      blog: 229
      whitepapers: 12
      series: 8
      fiction: 10
      presentations: 9
      counterpoints: 3
      tutorials: 3
      research-notes: 1
    composition: "pointer-to-writing-route"
    canonical_voice_guide: "~/Workspace/dev/apps/blog/docs/signal-dispatch-voice-guide.md"

# Deployment topology
deployment:
  main_site:
    cf_pages_project: "ninochavez-main"
    custom_domain: "ninochavez.co (in transition — currently routes through ninochavez-router worker)"
    build: "SvelteKit + @sveltejs/adapter-cloudflare"
    status: "project exists; v3 src will be rebuilt from prescription"
  blueprint_portal:
    cf_pages_project: "ninochavez-blueprint"
    custom_domain_target: "blueprint.ninochavez.co"
    build: "no build — static HTML + Pages Functions (wrangler pages deploy)"
    deploy_command: "cd blueprint/portal && wrangler pages deploy . --project-name ninochavez-blueprint --branch main"
    status: "needs provisioning"
  blog:
    cf_pages_project: "ninochavez-blog"
    custom_domain: "blog.ninochavez.co"
    status: "live"
  photography:
    surface: "photography.ninochavez.co"
    status: "live (separate app)"
  router:
    cf_workers_project: "ninochavez-router"
    purpose: "Routes ninochavez.co + subdomains. Will need update for blueprint.ninochavez.co subdomain bind."

environment_variables:
  - name: "RESEND_API_KEY"
    purpose: "Contact form notification"
    required: true
  - name: "CONTACT_FORM_TO_EMAIL"
    purpose: "Notification recipient"
    required: true
  - name: "CF_TURNSTILE_SITE_KEY"
    purpose: "Bot protection on contact form"
    required: true
  - name: "CF_TURNSTILE_SECRET_KEY"
    required: true
  - name: "PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN"
    purpose: "CF Web Analytics"
    required: true
  - name: "OPENROUTER_API_KEY"
    purpose: "Blueprint portal chat function"
    required: true
    pages_project: "ninochavez-blueprint"
  - name: "OPENAI_API_KEY"
    purpose: "Existing — derive-corpus embedding pipeline"
    required: true
    status: "wired via GitHub Actions + 1Password"
  - name: "VECTORIZE binding"
    purpose: "Existing — askdad-corpus index access"
    required: true
    status: "wired in wrangler.toml at repo root"

external_accounts:
  - service: "Cloudflare Pages"
    status: "active — needs new project ninochavez-blueprint provisioned"
  - service: "Cloudflare Workers"
    status: "active — ninochavez-router needs subdomain rule for blueprint.ninochavez.co"
  - service: "Cloudflare Web Analytics"
    status: "needs token enabled for ninochavez.co property"
  - service: "Cloudflare Vectorize"
    status: "active — askdad-corpus index live with 114 vectors (ADR-0007)"
  - service: "Cloudflare Images"
    status: "active — variants configured"
  - service: "Resend"
    status: "needs account provisioned for contact form"
  - service: "Cloudflare Turnstile"
    status: "needs site/secret keys"
  - service: "OpenRouter"
    status: "needs account for blueprint portal chat function"
  - service: "GitHub"
    status: "active — repo at github.com/nino-chavez/nino-chavez-site"

content_inventory:
  preserved_from_pre_nuke:
    - "ask-dad RAG backend (src/lib/server/askdad/, src/routes/api/ask/) — wired to Vectorize, working"
    - "derive-corpus pipeline (tools/derive-corpus/, .github/workflows/ingest-askdad-corpus.yml) — auto-rebuilds RAG on push to main"
    - "blueprint substrate (blueprint/*.md, decisions/, content/, research/) — Stage 1 + Stage 2 outputs"
    - "Framework config (svelte.config.js, package.json, wrangler.toml, postcss/tailwind/playwright configs)"
    - "Static essentials (favicons, fonts, sitemap.xml, robots.txt)"
  needs_creation:
    - "Main site src/ — everything (rebuilt from prescription)"
    - "Cluster IA components per ADR-0009 (ClusterRibbon, ClusterSection, per-cluster compositions)"
    - "Per-cluster deep-dive content for 6 lead slugs"
    - "/writing collection surfacing for all 7 collections"
    - "Hand-drafted schematic SVGs (forge production line, hesitation fold, paired-deploy diagram, etc.)"
    - "Blueprint portal pages (one per main-site route) with strategy + current-state drawers"
    - "v2 current-state screenshots (1440px + 390px per route) for portal's Shipped drawer"
    - "Refreshed AEO endpoints (/api/person.json, expertise.json, experience.json, contact.json) reflecting cluster IA"
    - "Hero claim copy + about narrative + practice copy + contact copy (regenerated from blueprint/content/ drafts)"
  voice_discipline:
    - "Load apps/blog/docs/signal-dispatch-voice-guide.md BEFORE drafting prose (canonical 913-line guide)"
    - "Run architects-protocol-auditor on changed prose before shipping"
    - "Never fabricate Nino's interior state — see ~/.claude/CLAUDE.md"

task_groups:
  - name: "Phase 0 — Restart (this work product)"
    status: "in flight"
    tasks:
      - "[done] Nuke v3 site (ask-dad backend + blueprint substrate preserved)"
      - "[done] Stage 1 Research substrate (research/synthesis.md + 3 current-state inventories)"
      - "[done] Stamp blueprint/portal/ from big-blueprint template, customize wrangler.toml"
      - "[done] ADR-0008 — adopt portal shell"
      - "[done] ADR-0009 — cluster ribbon + per-cluster editorial sections"
      - "[done] Refresh 01-diagnose.md"
      - "[done] Refresh 02-prescription.yml (this file)"
      - "[pending] Refresh 03-design-brief.md — recast composition table for cluster IA"
      - "[pending] Re-run Stage 2 fact-check on DESIGN-PRINCIPLES.md"

  - name: "Phase 1 — Blueprint portal build"
    blocking_on: ["Phase 0 complete"]
    tasks:
      - "Author _meta/slices/*.json — one per cluster + meta-slices (marketing, about, contact)"
      - "Author _meta/<page-id>.json — one per prototype page with strategy + currentState"
      - "Author portal index.html — studio catalog rendering"
      - "Author per-page HTML files in pages/"
      - "Customize shared.css tokens — violet accent, Inter, JetBrains Mono per ADR-0004 signature"
      - "Capture v2 screenshots (1440 + 390) for every route into portal/current-state/"
      - "Configure portal chat function — point at askdad-corpus Vectorize index"
      - "Provision ninochavez-blueprint CF Pages project"
      - "Bind blueprint.ninochavez.co custom domain"
      - "First deploy + smoke test"

  - name: "Phase 2 — Main site rebuild"
    blocking_on: ["Phase 1 portal deployed (so reviewers can see strategy alongside build)"]
    tasks:
      - "Rebuild src/lib/styles/tokens.css from DESIGN.md + signature ADR"
      - "Author ClusterRibbon + ClusterSection primitives"
      - "Author per-cluster compositions (ProductionLineSchematic, RepoGrid, CaseStudyDeepDive, etc.)"
      - "Author /, /about, /practice, /work, /work/[cluster]/[slug], /writing, /contact routes"
      - "Author 6 lead case-study deep dives (atelier, cortex, ask-dad, bc-subscriptions, ask-bc, rally-hq)"
      - "Author /writing surfacing — all 7 collections with counts"
      - "Author AEO endpoints (/api/{person,expertise,experience,contact}.json)"
      - "Wire ask-dad to UI (decision: include on /work/ai-products/ask-dad slug + chat FAB on /, or only one of those)"
      - "Implement contact form — Resend + Turnstile"
      - "Author hand-drafted schematic SVGs (forge production line is the load-bearing one)"
      - "Configure CF Web Analytics"
      - "First deploy of v3 main site"

  - name: "Phase 3 — Fact-check + integration"
    tasks:
      - "Stage 4 fact-check sweep per DESIGN-PRINCIPLES.md §'Stage 4 (Fact-Check) discipline'"
      - "Verify cluster counts match research/current-state/repos-inventory.md"
      - "Verify all 6 lead case-study URLs resolve"
      - "Verify writing collection counts match apps/blog/astro-build/src/content/"
      - "Run architects-protocol-auditor on all prose"
      - "Run Lighthouse — target >90 perf, >95 a11y"
      - "Run accessibility audit (axe-core or equivalent)"

  - name: "Phase 4 — Cutover"
    tasks:
      - "Update ninochavez-router worker — route blueprint.ninochavez.co subdomain"
      - "Verify blueprint portal + main site both live on custom domains"
      - "Verify ask-dad backend serving from production"
      - "Merge redesign/v3-context-engineer → main"
      - "Decommission Vercel project for ninochavez.co (deps already removed)"
      - "Verify CF Web Analytics receiving"
      - "Post-deploy smoke test"

verification:
  - "Cluster ribbon on /work shows 8 clusters with counts matching repos-inventory.md"
  - "All 6 lead case-study URLs return 200 (or marked '(in setup)' with planned date)"
  - "Hero claim + signature schematic visible above fold on /"
  - "/practice renders 4 sub-sections with citable artifacts"
  - "/writing surfaces all 7 collections with counts"
  - "AEO endpoints return valid JSON-LD, lead with context-engineer"
  - "Blueprint portal at blueprint.ninochavez.co renders studio catalog + all prototype pages"
  - "Per-page strategy + current-state drawers populate from _meta/*.json"
  - "Portal chat returns RAG-grounded responses from askdad-corpus"
  - "Comparison toggle (PROPOSED / COMPARE / SHIPPED) works on all prototype pages with shipped equivalents"
  - "vercel.json absent from repo; no @vercel/* imports in main site src"
  - "Lighthouse perf >90, a11y >95"
  - "Reduced-motion verified across all entrance animations"

# Pending forks (not blocking Phase 1)
pending_forks:
  - "ADR-0010 (TBD) — Whether /work uses /work/[cluster]/[slug] nested routes or flat /work/[slug] with cluster metadata. Tradeoff: URL semantics vs sitemap simplicity. Defaulting to nested unless overridden."
  - "Repo visibility flips — deferred per Nino direction (2026-05-25). Revisit if cluster surfacing exposes a credibility gap where a public umbrella would close it."
  - "Whether ask-dad chat surfaces as a homepage FAB or only on its own /work case-study page. Defaulting to FAB on / + /work/ai-products/ask-dad (cluster-IA-consistent)."
