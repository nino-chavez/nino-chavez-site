/*
 * Review snapshot, not a second source of truth.
 * Source: app/data.ts at 8cc4079ff461bb78730dede01f3069698f656576.
 * Fields: slug, name, claim, domain, status, type, updatedAt.
 */
window.WORK_SOURCE = {
  version: "8cc4079ff461bb78730dede01f3069698f656576",
  domains: ["Developer tools", "Local-first", "Volleyball", "Commerce", "Media & assets", "Publishing"],
  statuses: { live: "Live — available to use now", maintained: "Maintained — public and kept current", published: "Published — available to read", building: "In development — not yet released", paused: "Paused — not actively developed" },
  items: [
    ["blueprint", "Blueprint", "A practical method for planning, reviewing, and checking product work done with AI agents.", "Developer tools", "maintained", "docs", "2026-07-28"],
    ["browse-tool", "Browse Tool", "A command-line browser workflow that lets agents inspect real product surfaces.", "Developer tools", "maintained", "cli", "2026-07-25"],
    ["specchain", "Specchain", "A staged workflow that turns a feature request into specifications, implementation, and verification.", "Developer tools", "maintained", "cli", "2026-07-22"],
    ["claude-recall", "Claude Recall", "A local command-line index for recovering decisions and context from prior agent sessions.", "Developer tools", "maintained", "cli", "2026-07-19"],
    ["agentic-ways-of-working", "Agentic Ways of Working", "A public set of rules and tools for delegating work to AI agents and reviewing what comes back.", "Developer tools", "maintained", "docs", "2026-07-18"],
    ["fleet-observability", "Fleet Observability", "A private daily report that monitors repositories, deployments, costs, domains, and key user journeys.", "Developer tools", "live", "service", "2026-07-12"],
    ["repo-health-check", "Repo Health Check", "A public command-line audit for GitHub settings, stale links, failed deployments, and neglected pull requests.", "Developer tools", "maintained", "cli", "2026-07-11"],
    ["gha-minutes", "GHA Minutes", "A tool that finds wasted GitHub Actions time and cancels superseded runs without interrupting releases.", "Developer tools", "maintained", "cli", "2026-07-10"],
    ["design-qa", "Design QA", "A local quality check that keeps visual exceptions tied to explicit, reviewable design decisions.", "Developer tools", "building", "cli", "2026-07-09"],
    ["ways-of-working", "Ways of Working", "Published sessions and applied techniques drawn from real work with AI agents.", "Developer tools", "live", "collection", "2026-07-30"],
    ["local-dictation", "Local Dictation", "On-device speech capture and transcription designed to keep recordings local.", "Local-first", "maintained", "app", "2026-07-27"],
    ["local-meeting-notes", "Local Meeting Notes", "Research toward a Mac meeting notetaker that keeps audio local and ties every note back to the transcript.", "Local-first", "building", "app", "2026-07-23"],
    ["rally-hq", "Rally HQ", "Tournament registration, brackets, schedules, and live scoring in one public event page.", "Volleyball", "live", "site", "2026-07-26"],
    ["lets-pepper", "Let’s Pepper", "A player-first grass volleyball tournament series with events, divisions, and photography.", "Volleyball", "live", "site", "2026-07-24"],
    ["film-room", "Film Room", "A local desktop app for reviewing sports and event footage, recording decisions, and preparing editor-ready outputs.", "Volleyball", "building", "app", "2026-07-21"],
    ["flickday", "Flickday Media", "Grassroots sports media with on-site tournament photography, quick-turn reels, and same-day photo drops.", "Volleyball", "live", "site", "2026-07-31"],
    ["volleyrx", "Volley Rx", "Professionally organized volleyball tournaments across the Chicagoland area.", "Volleyball", "live", "site", "2026-07-31"],
    ["commerce-architecture", "Commerce architecture", "25+ years designing and delivering commerce platforms across retail, B2B, grocery, and multi-brand businesses.", "Commerce", "published", "experience", "2026-07-31"],
    ["bc-subscriptions", "BC Subscriptions", "A subscription engine demonstrated on a live BigCommerce store — billing, dunning recovery, and a self-serve subscriber portal, with the Kibble & Co demo storefront to walk through.", "Commerce", "live", "site", "2026-08-12"],
    ["aisles", "Aisles", "A storefront that reads the intent behind each visit and generates the category page to fit — same URL, same products, four different layouts.", "Commerce", "live", "site", "2026-08-12"],
    ["ask-bc", "Ask BC", "An AI assistant that answers questions about a live store's orders, products, and customers — and asks for explicit confirmation before it changes anything.", "Commerce", "live", "app", "2026-08-12"],
    ["forge-brand", "Forge Brand", "A system for turning approved brand direction into reusable colors, type, components, and visual assets.", "Media & assets", "maintained", "toolkit", "2026-07-17"],
    ["forge-site", "Forge Site", "A site-building playbook that matches client needs to proven archetypes, modules, and delivery steps.", "Media & assets", "maintained", "toolkit", "2026-07-06"],
    ["image-gen", "Image Gen", "Tools for generating images with AI or rendering them from reusable HTML templates.", "Media & assets", "maintained", "toolkit", "2026-07-04"],
    ["render-kit", "Render Kit", "Tools for producing consistent graphics and walkthroughs across sites and campaigns.", "Media & assets", "maintained", "toolkit", "2026-07-03"],
    ["nino-chavez-photography", "Nino Chavez Photography", "Volleyball action photography organized so players can find, download, and keep their frames.", "Media & assets", "live", "site", "2026-07-02"],
    ["signal-dispatch", "Signal Dispatch", "Essays, fiction, tutorials, and research on architecture, commerce, and AI-assisted work.", "Publishing", "live", "collection", "2026-07-30"],
    ["whitepapers", "Whitepapers", "Longer-form arguments and field guides published alongside the essay archive.", "Publishing", "published", "collection", "2026-06-28"],
    ["presentations", "Presentations", "Published decks that turn working decisions into material other practitioners can use.", "Publishing", "published", "collection", "2026-06-26"]
  ].map(([slug, name, claim, domain, state, form, updatedAt]) => ({ slug, name, claim, domain, state, form, updatedAt }))
};
