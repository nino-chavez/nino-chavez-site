import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import {
  workHref,
  workItems,
  workStateText,
} from "../../data";
import { getPhotographyArchiveStats } from "../../photography-stats.mjs";

const recordVisuals: Partial<
  Record<
    string,
    { src: string; alt: string; label: string; className?: string }
  >
> = {
  blueprint: {
    src: "/work/blueprint.png",
    alt: "Blueprint project mark",
    label: "Project mark",
    className: "record-artifact--mark",
  },
  "rally-hq": {
    src: "/work/rally-hq.webp",
    alt: "Rally HQ tournament interface",
    label: "Live product surface",
  },
  "lets-pepper": {
    src: "/work/lets-pepper.jpg",
    alt: "Let’s Pepper tournament gallery",
    label: "Live event surface",
  },
  flickday: {
    src: "/work/flickday.jpg",
    alt: "Volleyball player serving during tournament coverage",
    label: "Tournament coverage",
    className: "record-artifact--portrait",
  },
  volleyrx: {
    src: "/work/volleyrx.webp",
    alt: "Volleyball tournament play featured by Volley Rx",
    label: "Current tournament surface",
  },
  "nino-chavez-photography": {
    src: "/work/photography.webp",
    alt: "Volleyball player holding a ball before play",
    label: "Collection artifact",
    className: "record-artifact--portrait",
  },
  "signal-dispatch": {
    src: "/work/signal-dispatch.webp?v=372a9501",
    alt: "Current Signal Dispatch social share card",
    label: "Current social share card",
  },
  "ways-of-working": {
    src: "/work/demo-gates.jpg",
    alt: "Source frame from Gates Between Agentic Stages",
    label: "Source demo frame",
  },
  "bc-subscriptions": {
    src: "/work/demo-kibble-and-co.jpg",
    alt: "Title frame from the Kibble & Co. build session",
    label: "Source session frame",
  },
  "aisles": {
    src: "/work/demo-four-layouts.jpg",
    alt: "Title frame from the Aisles session on inferred layouts",
    label: "Source session frame",
  },
  "ask-bc": {
    src: "/work/demo-asks-twice.jpg",
    alt: "Title frame from the Ask BC write-gate session",
    label: "Source session frame",
  },
};

type RecordProfile = {
  source: string;
  private?: boolean;
  access?: string;
  heading?: string;
  introduction: string;
  details: Array<{ title: string; description: string }>;
  links?: Array<{ label: string; href: string }>;
  contact?: { label: string; subject: string };
};

const recordProfiles: Record<string, RecordProfile> = {
  "blueprint": {
    "source": "Public portal and repository",
    "introduction": "Blueprint keeps product intent, decisions, prototypes, implementation, and review evidence together in the repository where the work happens.",
    "links": [{ "label": "Read the public repository", "href": "https://github.com/nino-chavez/blueprint" }],
    "details": [
      {
        "title": "Repository-native planning",
        "description": "Requirements and decisions stay beside the implementation they govern."
      },
      {
        "title": "Human authority",
        "description": "Agents can execute and run mechanical checks; people retain judgment and release authority."
      },
      {
        "title": "Public reference",
        "description": "The portal publishes the current method and reusable working agreements."
      }
    ]
  },
  "browse-tool": {
    "source": "Public README and source",
    "introduction": "Browse Tool gives coding agents a small shell interface for navigating, inspecting, capturing, and extracting real pages through Chrome.",
    "details": [
      {
        "title": "Persistent browser state",
        "description": "Navigation, evaluation, screenshots, and extraction share one managed Chrome profile."
      },
      {
        "title": "Ten focused commands",
        "description": "The command set covers common browser work without loading a large automation protocol into every session."
      },
      {
        "title": "Start with the source",
        "description": "The repository documents setup, every command, examples, and troubleshooting."
      }
    ]
  },
  "specchain": {
    "source": "Public README and source",
    "introduction": "Specchain turns a feature request into a staged specification, implementation, and verification flow with explicit gates between phases.",
    "details": [
      {
        "title": "One guided lifecycle",
        "description": "The README shows initialization, specification, implementation, and verification in one worked sequence."
      },
      {
        "title": "Recovery and remediation",
        "description": "Structured progress files support resuming work, and verifier findings can return through a bounded correction pass."
      },
      {
        "title": "Worked example",
        "description": "The public repository includes a complete example of the staged workflow."
      }
    ]
  },
  "claude-recall": {
    "source": "Public README and source",
    "introduction": "Claude Recall stores reusable session entries in a local SQLite index so prior decisions, prompts, and working patterns can be found again.",
    "details": [
      {
        "title": "Save and retrieve",
        "description": "Slash commands save, search, list, inspect, and reuse entries from the local index."
      },
      {
        "title": "Mine durable work",
        "description": "Companion tools surface useful artifacts and recurring procedures inside session history."
      },
      {
        "title": "Limits included",
        "description": "The README separates rule compliance from descriptive process metrics and does not present either as outcome quality."
      }
    ]
  },
  "agentic-ways-of-working": {
    "source": "Public README and source",
    "introduction": "This repository separates one canonical set of operating rules from the adapters, skills, and hooks used by individual coding tools.",
    "details": [
      {
        "title": "One source of truth",
        "description": "Shared working principles live once; tool-specific wrappers carry only what their runtime needs."
      },
      {
        "title": "Portable practice",
        "description": "I strip secrets and personal data from the public version so anyone can inspect and adapt its patterns."
      },
      {
        "title": "Working material",
        "description": "The repository exposes the operating model, skills, hooks, and supported tool adapters."
      }
    ]
  },
  "fleet-observability": {
    "source": "Private service, public summary",
    "private": true,
    "access": "public summary",
    "introduction": "Fleet Observability gathers GitHub, Cloudflare, Vercel, Supabase, email delivery, domains, and live journey checks into a private daily report.",
    "details": [
      {
        "title": "Why it was built",
        "description": "A manual review found 376 orphaned Vercel deployment records and nine stale public links. The report makes that class of drift visible before it becomes another cleanup."
      },
      {
        "title": "What runs each day",
        "description": "A scheduled Worker and GitHub sweep collect service health, cost, configuration, domain, and journey signals into one operator view."
      },
      {
        "title": "What remains private",
        "description": "The report contains infrastructure and account-level details, so it is not a public dashboard. This page documents the system without exposing the report."
      }
    ]
  },
  "repo-health-check": {
    "source": "Public README and source",
    "introduction": "Repo Health Check audits GitHub settings that source-code search cannot see, including stale public links, failed deployments, and old pull requests.",
    "details": [
      {
        "title": "Why source search was not enough",
        "description": "The first audit began after I found 347 dead Vercel deployment records and a stale repository homepage outside the codebase; the same link rot appeared on seven more repositories."
      },
      {
        "title": "Six concrete checks",
        "description": "Homepage links, branch protection, Actions, Dependabot, environments, and stale pull requests make up the current audit."
      },
      {
        "title": "Portable command",
        "description": "The public script can audit an authenticated GitHub account or organization and emit a Markdown report."
      }
    ]
  },
  "gha-minutes": {
    "source": "Public README and source",
    "introduction": "GHA Minutes diagnoses GitHub Actions usage and applies the repeatable part of reducing wasted runs: safe concurrency cancellation.",
    "details": [
      {
        "title": "Diagnose first",
        "description": "The CLI identifies where private-repository workflow minutes are being spent before changing configuration."
      },
      {
        "title": "Mechanical fix",
        "description": "It adds idempotent concurrency settings while protecting release, publish, and migration jobs from mid-run cancellation."
      },
      {
        "title": "Judgment stays visible",
        "description": "Schedule changes, path filters, and test-placement decisions remain a per-repository review."
      }
    ]
  },
  "design-qa": {
    "source": "Local tool, public summary",
    "private": true,
    "access": "public summary",
    "introduction": "Design QA checks whether every suppressed visual finding still points to an explicit, authorized decision in that site’s design-direction ledger.",
    "details": [
      {
        "title": "Five sites in the first pass",
        "description": "Each participating site keeps that ledger in a DIRECTION.md file beside its code, and each suppressed finding must name the approved decision that permits it."
      },
      {
        "title": "Seven failure cases",
        "description": "The check fails for missing reasons or pointers, missing devices, rejected verdicts, invalid ledgers, ignore rules, and missing repositories or records."
      },
      {
        "title": "Current limit",
        "description": "The first pass covers five sites and is not wired into CI. It proves the check can work, not yet that every visual exception is governed."
      }
    ]
  },
  "ways-of-working": {
    "source": "Published demos",
    "heading": "What the collection shows",
    "introduction": "Ways of Working publishes complete sessions and applied techniques from real agent-assisted work, including the corrections and limits that shaped the result.",
    "details": [
      {
        "title": "Complete stories",
        "description": "Each session keeps the sequence, evidence, and outcome together instead of presenting a detached screenshot."
      },
      {
        "title": "Applied techniques",
        "description": "Shorter write-ups isolate one practice and show where it held up."
      },
      {
        "title": "Browse the collection",
        "description": "The public library can be explored by session or by reusable technique."
      }
    ]
  },
  "local-dictation": {
    "source": "Public README and source",
    "introduction": "Local Dictation turns speech into cleaned-up text in the currently focused Mac app while keeping transcription and cleanup on the machine.",
    "details": [
      {
        "title": "Tap, speak, place text",
        "description": "A global hotkey records speech, Whisper transcribes it, and the result is pasted or routed to Notes."
      },
      {
        "title": "Local processing",
        "description": "Whisper runs on the Mac and Ollama handles optional cleanup over localhost."
      },
      {
        "title": "Graceful fallback",
        "description": "If cleanup is unavailable, the raw transcript is still delivered instead of losing the dictation."
      }
    ]
  },
  "local-meeting-notes": {
    "source": "Public research README",
    "introduction": "Local Meeting Notes is research toward a Mac notetaker that records two audio streams locally and requires every generated note to point back to retained transcript evidence.",
    "details": [
      {
        "title": "Working capture",
        "description": "The repository has a two-leg local capture path that has been exercised over a real 75-minute meeting."
      },
      {
        "title": "What is not proven",
        "description": "The voiceprint gate — the check that identifies who is speaking — has not been tried in a real meeting, and no generated note has passed human review. This is research, not an app or beta."
      },
      {
        "title": "Evidence-linked notes",
        "description": "The intended product keeps each note claim connected to retained transcript evidence. If a summary fails review, the system withholds it instead of publishing it."
      }
    ]
  },
  "rally-hq": {
    "source": "Live product",
    "introduction": "Rally HQ gives organizers and players one public event surface for registration, schedules, brackets, court assignments, and scoring.",
    "details": [
      {
        "title": "Before play",
        "description": "Publish registration, divisions, teams, pools, and schedules without splitting the record across tools."
      },
      {
        "title": "During the event",
        "description": "Keep brackets, court assignments, and live scores available from the same event page."
      },
      {
        "title": "Open the product",
        "description": "The live site carries current and completed tournaments."
      }
    ]
  },
  "lets-pepper": {
    "source": "Live event series",
    "introduction": "Let’s Pepper brings registration, event information, and photography around each grass tournament into one player-facing series.",
    "links": [{ "label": "Read the public repository", "href": "https://github.com/nino-chavez/letspepper" }],
    "details": [
      {
        "title": "Find an event",
        "description": "Players can see upcoming tournaments, divisions, formats, and registration details."
      },
      {
        "title": "Follow the record",
        "description": "Completed events remain connected to results, galleries, and the wider series."
      },
      {
        "title": "Open the series",
        "description": "The live site carries the current schedule and registration paths."
      }
    ]
  },
  "film-room": {
    "source": "Private product, public summary",
    "private": true,
    "access": "public summary",
    "introduction": "Film Room is a local-first assistant editor for a solo sports or event media operator. It orders attention and reduces repetitive work without making editorial decisions.",
    "details": [
      {
        "title": "Review board",
        "description": "The operator marks each clip Keep, Highlight, Reject, or Undecided and records the rationale. The app orders attention but does not make the editorial decision."
      },
      {
        "title": "Inspect",
        "description": "A larger, frame-accurate view supports trim and correction work while keeping the source footage and review record on the operator’s machine."
      },
      {
        "title": "Current boundary",
        "description": "The Desktop Review slice has an approved production design. Other workflows, native packaging, distribution, and release gates remain open."
      }
    ]
  },
  "flickday": {
    "source": "Live site",
    "introduction": "Flickday Media embeds with grassroots events to capture the competition and deliver the moments while they are still current.",
    "links": [{ "label": "Read the public repository", "href": "https://github.com/nino-chavez/flickdaymedia" }],
    "details": [
      {
        "title": "Tournament coverage",
        "description": "On-site photography, real-time reels, and same-day photo drops cover the event as it unfolds."
      },
      {
        "title": "Reels and edits",
        "description": "I prepare quick-turn highlight reels and player edits for Instagram and TikTok."
      },
      {
        "title": "Photo drops",
        "description": "Players can find, download, and share high-resolution action photos without watermarks."
      }
    ]
  },
  "volleyrx": {
    "source": "Live site",
    "introduction": "Volley Rx runs competitive indoor events with public registration, event details, and a consistent Chicagoland home court.",
    "details": [
      {
        "title": "Upcoming tournaments",
        "description": "Players can browse current events and move directly into registration."
      },
      {
        "title": "Home court",
        "description": "Volley Rx publishes venue information and event expectations before teams arrive."
      },
      {
        "title": "Open the calendar",
        "description": "The live site carries current tournament and registration pages."
      }
    ]
  },
  "commerce-architecture": {
    "source": "Professional experience",
    "access": "public summary",
    "heading": "What this experience covers",
    "introduction": "Across 25+ years, I have designed and delivered commerce systems for retail, B2B, grocery, and multi-brand businesses—from hands-on software development to product and enterprise architecture. Specific client programs stay confidential; the capabilities and scale below are public.",
    "details": [
      {
        "title": "Platforms and ecosystems",
        "description": "SAP Commerce Cloud, Salesforce Commerce Cloud, Adobe Commerce, headless storefronts, APIs, and distributed systems."
      },
      {
        "title": "Problems solved",
        "description": "Platform modernization, system integration, performance, delivery recovery, and architecture for mobile, web, and fulfillment."
      },
      {
        "title": "Program scale",
        "description": "Experience includes a $25M multi-brand transformation, 100+ person global delivery, and 20+ commerce implementations."
      }
    ],
    "contact": {
      "label": "Discuss a commerce problem",
      "subject": "Commerce architecture"
    }
  },
  "bc-subscriptions": {
    "source": "Live demo store and public docs",
    "introduction": "I built a complete subscription engine against a live BigCommerce sandbox store—recurring billing, payment-failure recovery, and a self-serve portal for subscribers. Kibble & Co., the fictional pet-supply merchant fronting it, exists so every demo runs on real store data without touching any real customer. This is an independent demonstration, not a BigCommerce product.",
    "links": [
      { "label": "Open the guided demo tours", "href": "https://marketing.bcsubs.app/" },
      { "label": "Browse the Kibble & Co. storefront", "href": "https://storefront.bcsubs.app/" },
      { "label": "Read how it was built", "href": "/demos/kibble-and-co" }
    ],
    "details": [
      {
        "title": "A real store, a fictional merchant",
        "description": "Checkout, orders, and recurring charges run on genuine platform rails; because the merchant is invented, nothing here can expose a real customer's data."
      },
      {
        "title": "Native, not bolted on",
        "description": "Every recurring charge produces a native platform order and settles through the store's own payments account—one dashboard for the merchant, not a parallel system."
      },
      {
        "title": "The delivery method is the point",
        "description": "The build is also a working example of spec-driven, agent-assisted delivery; the session linked above shows the method, including what broke."
      }
    ]
  },
  "aisles": {
    "source": "Live demo",
    "introduction": "Aisles reads the intent behind each visit—search terms, referrer, behavior on the page—and generates the category page to fit one of four inferred shopper types. Same address, same products, four different layouts, each checked against a fixed schema before it renders. It draws its catalog live from the Kibble & Co. store.",
    "links": [
      { "label": "Open the Aisles demo", "href": "https://aisles.bcsubs.app/" },
      { "label": "Read how it works", "href": "/demos/four-layouts" }
    ],
    "details": [
      {
        "title": "Inference, not segmentation",
        "description": "Weighted rules over request and behavior signals decide who is probably shopping—no account, no questionnaire, no stored profile required."
      },
      {
        "title": "Generated, but never invalid",
        "description": "The AI composes each page from a small fixed set of building blocks, and a schema check rejects anything outside it—so a generated page can differ, but it cannot break."
      },
      {
        "title": "Pointed at a real store in a day",
        "description": "Connecting the engine to the Kibble & Co. catalog took one brand configuration file and two settings, because all catalog access already passed through one function."
      }
    ]
  },
  "ask-bc": {
    "source": "Live application",
    "introduction": "Ask BC is my agent for commerce operations: ask questions about a live store's orders, products, customers, and promotions in plain language, and get answers rendered as tables and cards instead of prose. It runs against the same sandbox store as the Kibble & Co. demos, and it never changes the store without asking first.",
    "links": [
      { "label": "Open Ask BC", "href": "https://askbc.ninochavez.co" },
      { "label": "Read how the write gate works", "href": "/demos/asks-twice" }
    ],
    "details": [
      {
        "title": "Twenty-nine tools, seven of them writes",
        "description": "Reading store data is unrestricted; the seven operations that change the store each require a preview turn and an explicit confirmation before anything executes."
      },
      {
        "title": "Confirmation is a mechanism, not a prompt",
        "description": "The gate lives in the tool's own code, keyed on a flag the model must set on a second call—not a polite instruction the model could skip."
      },
      {
        "title": "The pattern spread",
        "description": "The subscription platform later adopted the same runtime for its own store copilot, pointed at its internal data instead of the platform's—same rule: nothing changes on the first call."
      }
    ]
  },
  "forge-brand": {
    "source": "Public README and source",
    "introduction": "Forge Brand turns one approved brand-kit file into CSS and Tailwind tokens, Figma-ready values, media templates, site scaffolds, and production asset exports.",
    "details": [
      {
        "title": "One source",
        "description": "A single brand-kit file drives palette, typography, voice, media, and export formats."
      },
      {
        "title": "Review before export",
        "description": "Generators propose options, automated checks validate constraints, and a human approves the direction."
      },
      {
        "title": "Outputs teams can use",
        "description": "Exports include social cards, stories, flyers, favicons, business cards, and bridges for Image Gen and Signal Forge."
      }
    ]
  },
  "forge-site": {
    "source": "Public README and source",
    "introduction": "Forge Site is a renovation playbook for carrying a visual brief into a working client site without losing the approved direction between research and implementation.",
    "details": [
      {
        "title": "Audience before layout",
        "description": "The workflow starts from who will judge the surface and what decision they need to make."
      },
      {
        "title": "Reusable site modules",
        "description": "Archetypes and modules give recurring page work a shared starting point."
      },
      {
        "title": "Public playbook",
        "description": "The source repository documents the staged site-building process and its reusable material."
      }
    ]
  },
  "image-gen": {
    "source": "Public README and source",
    "introduction": "Image Gen provides two repeatable paths for producing visual assets: model-generated imagery and deterministic HTML-to-image rendering.",
    "details": [
      {
        "title": "Two rendering paths",
        "description": "AI generation handles image synthesis; Playwright and Sharp handle designed, repeatable layouts."
      },
      {
        "title": "Repeatable production",
        "description": "Named styles, reusable templates, batch commands, and optimization keep related exports consistent and ready for delivery."
      },
      {
        "title": "Inspect the commands",
        "description": "The public README documents generation, rendering, templates, batch runs, and output optimization with working command examples."
      }
    ]
  },
  "render-kit": {
    "source": "Public README and source",
    "introduction": "Render Kit replaces one-off browser screenshot scripts with one HTML-to-PNG harness for social graphics, video cards, apparel, and walkthrough outputs.",
    "details": [
      {
        "title": "Template plus data",
        "description": "One HTML template can render a single asset or a set of data-driven variants."
      },
      {
        "title": "One walkthrough source",
        "description": "A captured walkthrough can emit both an interactive player and a motion video so the two outputs do not drift."
      },
      {
        "title": "Portable command",
        "description": "The public CLI supports viewport control, element crops, scale, data injection, and batch variants."
      }
    ]
  },
  "nino-chavez-photography": {
    "source": "Public portfolio and archive",
    "introduction": "A small portfolio edit introduces the work. The complete event archive gives players and families the search, album, favorite, and download tools they need to find their frames.",
    "links": [{ "label": "Read the public repository", "href": "https://github.com/nino-chavez/nino-chavez-photography" }],
    "details": [
      {
        "title": "Search by what you know",
        "description": "Find photographs by event, team, player, or jersey number."
      },
      {
        "title": "Browse complete events",
        "description": "Albums, a timeline, and curated collections keep the full archive navigable."
      },
      {
        "title": "Keep your frames",
        "description": "Favorites and downloads live in the standalone photography archive."
      }
    ]
  },
  "signal-dispatch": {
    "source": "Live publication",
    "introduction": "Signal Dispatch publishes essays, fiction, tutorials, and research on architecture, commerce, and AI-assisted work.",
    "links": [{ "label": "Read the public repository", "href": "https://github.com/nino-chavez/blog" }],
    "details": [
      {
        "title": "Essays and field notes",
        "description": "Writing follows architecture, commerce, leadership, and agent-assisted product work in practice."
      },
      {
        "title": "Reference material",
        "description": "Whitepapers, presentations, and tutorials sit beside the essays instead of in a separate archive."
      },
      {
        "title": "Complete publication",
        "description": "The writing library can be searched by form, subject, or year."
      }
    ]
  }
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = workItems.find((entry) => entry.slug === slug);

  return item
    ? {
        title: item.name,
        description: item.claim,
        alternates: { canonical: `/work/${item.slug}` },
      }
    : {};
}

export function generateStaticParams() {
  return [
    ...workItems
      .filter((item) => item.detailPage !== false)
      .map((item) => ({ slug: item.slug })),
    { slug: "commerce-practice" },
    { slug: "whitepapers" },
    { slug: "presentations" },
  ];
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug === "commerce-practice") {
    redirect("/work/commerce-architecture");
  }

  if (slug === "whitepapers") {
    redirect("/blog?type=Whitepaper");
  }

  if (slug === "presentations") {
    redirect("/blog?type=Presentation");
  }

  const item = workItems.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  const profile = recordProfiles[item.slug];
  if (!profile) {
    notFound();
  }

  const visual = recordVisuals[item.slug];
  const photographyStats =
    item.slug === "nino-chavez-photography"
      ? await getPhotographyArchiveStats()
      : null;
  const proofDetails = profile.details.map((detail) =>
    photographyStats && detail.title === "Browse complete events"
      ? {
          ...detail,
          description: `${photographyStats.totalPhotos.toLocaleString("en-US")} photos and ${photographyStats.totalVideos.toLocaleString("en-US")} videos are organized across ${photographyStats.totalAlbums.toLocaleString("en-US")} public event albums.`,
        }
      : detail,
  );
  const destinationIsExternal = item.destination?.href.startsWith("http");
  const related = (item.related ?? [])
    .map((relatedSlug) =>
      workItems.find((entry) => entry.slug === relatedSlug),
    )
    .filter((entry) => entry !== undefined);

  return (
    <div className="page-shell detail-page work-detail-page">
      <Breadcrumbs
        items={[{ label: "Work", href: "/work" }, { label: item.name }]}
      />

      <header className="detail-header">
        <div>
          <p className="eyebrow">{item.domain}</p>
          <h1>{item.name}</h1>
          <p className="lede">{item.claim}</p>
          {item.destination ? (
            <div className="inline-actions">
              <a
                className="primary-action"
                href={item.destination.href}
                target={destinationIsExternal ? "_blank" : undefined}
                rel={destinationIsExternal ? "noopener noreferrer" : undefined}
              >
                {item.destination.label}
                <span aria-hidden="true">
                  {destinationIsExternal ? " ↗" : " →"}
                </span>
                {destinationIsExternal ? (
                  <span className="assistive-text"> (opens in a new tab)</span>
                ) : null}
              </a>
            </div>
          ) : null}
        </div>
        <dl className="fact-list">
          <div>
            <dt>Status</dt>
            <dd>{workStateText(item.state)}</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{item.form}</dd>
          </div>
          <div>
            <dt>Access</dt>
            <dd>{profile.access ?? (profile.private ? "private record" : "public")}</dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd>{item.updatedAt}</dd>
          </div>
        </dl>
      </header>

      {visual ? (
        <figure
          className={`record-artifact ${visual.className ?? ""}`.trim()}
        >
          <div>
            <img src={visual.src} alt={visual.alt} />
          </div>
          <figcaption>
            <span>{visual.label}</span>
            <strong>{item.name}</strong>
          </figcaption>
        </figure>
      ) : null}

      <section className="work-proof" aria-labelledby="work-proof-title">
        <header className="work-proof__heading">
          <div>
            <p className="eyebrow">{profile.source}</p>
            <h2 id="work-proof-title">
              {profile.heading ?? "What this work does"}
            </h2>
          </div>
          <p>{profile.introduction}</p>
        </header>
        <div className="work-proof__grid">
          {proofDetails.map((detail) => (
            <article key={detail.title}>
              <h3>{detail.title}</h3>
              <p>{detail.description}</p>
            </article>
          ))}
        </div>
        {profile.links?.length ? (
          <div className="inline-actions work-proof__links">
            {profile.links.map((link) => (
              <a
                className="secondary-action"
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} <span aria-hidden="true">↗</span>
                <span className="assistive-text"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        ) : null}
        {profile.contact || (profile.private && !item.destination) ? (
          <a
            className="primary-action work-proof__contact"
            href={
              "mailto:nino@ninochavez.co?subject=" +
              encodeURIComponent(
                profile.contact?.subject ?? "Question about " + item.name,
              )
            }
          >
            {profile.contact?.label ?? "Ask about this work"}{" "}
            <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </section>

      {related.length ? (
        <section className="detail-section" aria-labelledby="related-work">
          <div>
            <p className="eyebrow">Explicit relationships</p>
            <h2 id="related-work">Related work</h2>
          </div>
          <div className="related-list">
            {related.map((entry) => (
              <Link key={entry.slug} href={workHref(entry)}>
                <span>{entry.domain}</span>
                <strong>{entry.name}</strong>
                <small>{entry.claim}</small>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <p className="back-link">
        <Link href="/work">← Return to Work</Link>
      </p>
    </div>
  );
}
