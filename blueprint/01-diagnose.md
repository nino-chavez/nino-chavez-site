# ninochavez.co v3 — Stage 2: Diagnose

Per `tools/forge-site/playbook/2-diagnose.md`. Pattern-match the project to an archetype and lock the module list before prescribing.

## Confirmed archetype

**`portfolio-brand`** — variant: **Consulting/Personal Portfolio (Website-NC pattern)**, per `tools/forge-site/archetypes/portfolio-brand.md` §"Variants".

Decision-tree path: Does the business sell access to digital content? → No → Does the business run events? → No → Does it provide services? → No (not actively selling; goal is hirable + known, not transactional) → Is this a personal brand / portfolio? → **Yes → Portfolio/Brand.**

Rationale specific to this project: the site IS the product. Its visual quality and the integrity of the artifacts it surfaces are the credibility proof for a "context engineer" claim. There is no transactional layer because Nino is employed full-time at Commerce.com — the site builds optionality (hirable, known, referable) rather than booking inbound work.

## Hybrid considerations

Two adjacent surfaces already exist in the architecture; both are correctly out of scope for the main-site redesign:

- **Photography subdomain** (`ninochavez.co/photography` via router worker, was `photography.ninochavez.co`). This is the **Photography/Media Portfolio variant** of the same archetype — large media collection, Cloudflare Images, Supabase metadata, AAA accessibility. It is its own app under `apps/photography/`. The main-site redesign references it as a case study and links to it; it is not absorbed into the main site.
- **Blog subdomain** (`ninochavez.co/blog` via router worker, was `blog.ninochavez.co`). Astro/MDX, runs independently as Signal Dispatch. Main site links to it from `/writing`; does not absorb the blog content.

No third-archetype hybrid is needed because the main site has no e-commerce, no gated content, and no event surfaces.

## Module selection

Against `tools/forge-site/playbook/2-diagnose.md` §"Module Selection Checklist":

| Question | Answer | Module decision |
|---|---|---|
| CMS for non-technical editors? | No — Nino edits in code | **Skip `cms-sanity`.** Static work-data + markdown for `/writing` cards. |
| Accept payments? | No | Skip `payments-stripe`. |
| User accounts? | No | Skip `auth-*`. |
| Gated content? | No | Skip `feature-gating`. |
| Contact / inquiry form? | Yes — one simple form on `/contact` | **Include `contact-forms` + `email-resend`.** |
| Transactional emails? | Yes — contact-form notification only | Covered by `email-resend`. |
| Sell video content? | No | Skip `video-mux`. |
| Take appointments? | **No — explicitly cut.** | **Skip `booking-calcom`.** This is the load-bearing cut. Cal.com integration on the current site is transactional framing that contradicts the credibility positioning. The plan removes the four Cal.com components, three API routes, and five docs. |
| Local SEO? | No (national/remote, not location-specific) | Skip local-specific JSON-LD, keep general SEO. |
| Product analytics? | Not at v3 launch | Defer `analytics-posthog`. |
| Deploying on Cloudflare Pages? | **Yes — finish the in-progress migration.** | Skip `analytics-vercel` (Vercel-specific). Use **Cloudflare Web Analytics** instead. |

### Required modules

- `seo-structured-data` — discoverability is critical; the existing JSON-LD endpoints stay, content gets rewritten
- **Cloudflare Web Analytics** (replaces `analytics-vercel` because Phase 3 finishes the CF Pages migration; vercel.json + Vercel analytics imports come out)

### Recommended modules

- `contact-forms` — one form on `/contact`
- `email-resend` — sends the contact form notification

### Deferred modules

- `cms-sanity` — *deferred indefinitely.* Reason: Nino is the editor; code is the source of truth; Sanity adds maintenance overhead with zero benefit when there's no non-developer editor.
- `analytics-posthog` — *deferred to post-launch.* CF Web Analytics is enough for v3 launch; product analytics adds value only once there's traffic worth segmenting.
- `booking-calcom` — *explicitly cut, not deferred.* Transactional framing conflicts with the positioning goal.

## Framework

**SvelteKit 2 + Svelte 5 (runes).** Keep the existing framework.

Reasons:
- Existing site is SvelteKit; switching frameworks would discard the `/work` case-study system, the `/api/*.json` AEO endpoints, the design tokens, the Cloudflare Images integration — all of which the audits identified as worth keeping.
- SvelteKit is the portfolio-brand archetype default for SSR + performance focus.
- The Cloudflare Pages adapter is already swapped in (`svelte.config.js`); finishing that migration is in-scope for Phase 3 and reinforces the framework choice.

Not Astro because the site has interactive surfaces (contact form, JSON-LD endpoints, future AEO ask endpoints) that benefit from SvelteKit's first-class server routes.

## Scope boundaries

**In scope for v3:**
- Hero + credibility ribbon rewrite
- 5 case studies (Rally HQ + Blueprint paired, Atelier, Ask BC, Photography, bc-subscriptions)
- New `/practice` page (toolchain + operating rules + instrumentation)
- `/about` rewrite
- `/api/*.json` AEO payload rewrites
- `/work` case-study template refresh
- `/writing` teaser linking to Signal Dispatch
- `/contact` (single form)
- Finish Cloudflare Pages migration (drop `vercel.json`, swap analytics, port redirects)
- Visual reset: enforce `DESIGN.md` (violet accent, Inter, content-first); kill bento + lime + Bebas Neue

**Explicitly out of scope (cut from current site):**
- `/v1` route (parallel old homepage)
- `/ai/learn/*` (8 sub-pages, course play)
- `/ai/ask` (RAG chat with Virtual Nino)
- All Cal.com integration (4 components + 3 API routes + 5 docs)
- 6 unused photography-process section components (HeroSection, FocusSection, FrameSection, ExposureSection, GallerySection, ConsultationSection)
- Duplicate `Header.svelte`
- Bento-grid + lime + Bebas Neue homepage aesthetic
- Interests grid (Photography / Music / Writing / Building equal weight)
- ~20 stale `docs/` operational notes

**Out of scope, deferred to post-v3:**
- Public-facing AEO `ask` API (`/api/ask/chat`) — currently exists in code; decide post-launch whether to keep with new framing
- `/now` page — keep but minimal; rewrite to lead with practice work, not parallel hobbies
- Sanity CMS migration
- Posthog product analytics

## Output

This Diagnose locks: **archetype = portfolio-brand (consulting/personal variant)**, **framework = SvelteKit 2**, **module list = seo-structured-data + contact-forms + email-resend + CF Web Analytics**, **scope = redesign main site + finish CF migration + cut transactional/course/dead-route surfaces**, **out = e-commerce, gating, booking, course platform**.

Proceed to Stage 3 Prescribe.
