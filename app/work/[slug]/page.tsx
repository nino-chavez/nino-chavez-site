import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { workItems } from "../../data";

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
        "title": "First successful action",
        "description": "The public repository includes an npx installer and a complete worked example."
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
        "description": "The public version is stripped of secrets and personal data so its patterns can be inspected and adapted."
      },
      {
        "title": "Working material",
        "description": "The repository exposes the operating model, skills, hooks, and supported tool adapters."
      }
    ]
  },
  "fleet-observability": {
    "source": "Private repository README",
    "private": true,
    "introduction": "Fleet Observability pulls health, usage, spend, and settings drift into one operator view across the services that run a small software portfolio.",
    "details": [
      {
        "title": "One daily view",
        "description": "GitHub, Cloudflare, Vercel, Supabase, email delivery, domains, and live journeys report into one scorecard."
      },
      {
        "title": "Built from an incident",
        "description": "The README traces the work to orphaned deployments and stale public links that were otherwise found by accident."
      },
      {
        "title": "Private by design",
        "description": "The repository and operator report are not published as a general public product; the page documents what exists without exposing access."
      }
    ]
  },
  "repo-health-check": {
    "source": "Public README and source",
    "introduction": "Repo Health Check audits GitHub settings that source-code search cannot see, including stale public links, failed deployments, and old pull requests.",
    "details": [
      {
        "title": "Settings, not source",
        "description": "It checks repository metadata and service state that do not live in the checked-out files."
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
    "source": "Private local README",
    "private": true,
    "introduction": "Design QA turns deliberate visual exceptions into named, reviewable decisions instead of permanent suppressions nobody can explain later.",
    "details": [
      {
        "title": "Direction records",
        "description": "Each participating site keeps an art-direction ledger beside its code."
      },
      {
        "title": "Resolvable exceptions",
        "description": "Every suppression must point to an authorized design device, and the resolver fails when that pointer drifts."
      },
      {
        "title": "Still bounded",
        "description": "The README states that CI wiring and broader route coverage remain unfinished."
      }
    ]
  },
  "ways-of-working": {
    "source": "Published demos",
    "introduction": "Ways of Working publishes complete sessions and applied techniques from real agent-assisted work, including the corrections and limits that shaped the result.",
    "details": [
      {
        "title": "Complete stories",
        "description": "Each session keeps the sequence, evidence, and outcome together instead of presenting a detached screenshot."
      },
      {
        "title": "Applied techniques",
        "description": "Shorter records isolate one practice and show where it held up."
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
    "introduction": "Local Meeting Notes is a measured product research effort for private meeting capture, evidence-linked notes, and explicit failure states.",
    "details": [
      {
        "title": "Working capture",
        "description": "The repository has a two-leg local capture path that has been exercised over a real 75-minute meeting."
      },
      {
        "title": "Honest readiness",
        "description": "The README says the product encounter, voice gate, and note acceptance gates are still open; it does not call the research an app or beta."
      },
      {
        "title": "Evidence-linked notes",
        "description": "The intended product keeps each note claim connected to retained transcript evidence and fails closed on rejected summaries."
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
    "source": "Private product baseline",
    "private": true,
    "introduction": "Film Room is a local-first assistant editor for a solo sports or event media operator. It orders attention and reduces repetitive work without making editorial decisions.",
    "details": [
      {
        "title": "Review stays human",
        "description": "The operator marks every clip, owns the rationale, and decides when precision inspection or correction is needed."
      },
      {
        "title": "Sources stay local",
        "description": "The product works from owned footage and keeps sources, decisions, adjustments, and outputs under the operator’s control."
      },
      {
        "title": "Private work in progress",
        "description": "Desktop Review is approved for production use, while other workflows and native release gates remain explicitly open."
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
        "description": "Quick-turn highlight reels and player edits are prepared for Instagram and TikTok."
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
        "description": "Venue information and event expectations are published before teams arrive."
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
    "introduction": "Across 25+ years, Nino has designed and delivered commerce systems for retail, B2B, grocery, and multi-brand businesses—from hands-on software development to product and enterprise architecture. Specific client programs stay confidential; the capabilities and scale below are public.",
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
  "forge-brand": {
    "source": "Public README and source",
    "introduction": "Forge Brand turns one approved brand kit into reusable tokens, assets, components, and documentation.",
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
        "title": "Public toolkit",
        "description": "The repository documents the CLI, presets, media templates, and available exports."
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
        "title": "Style systems",
        "description": "Templates and style inputs keep a set of generated assets visually related."
      },
      {
        "title": "Public source",
        "description": "The repository documents its generators, template engine, and optimization path."
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
    "introduction": "The portfolio holds a small edit. The standalone archive holds the complete event record and the tools players use to find their frames.",
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
    "introduction": "Signal Dispatch is the published side of the practice: long-form arguments, field notes, tutorials, and records of work still being figured out.",
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
  },
  "whitepapers": {
    "source": "Live publication index",
    "introduction": "Whitepapers collect the publication’s formal long-form analysis and reference work in one filtered view.",
    "details": [
      {
        "title": "Long-form argument",
        "description": "Each piece has room to develop evidence, implications, and a durable reference."
      },
      {
        "title": "No separate archive",
        "description": "Whitepapers remain part of Signal Dispatch and use the same searchable publication index."
      },
      {
        "title": "Open the filtered view",
        "description": "The destination lands on the current Whitepaper records rather than the publication front page."
      }
    ]
  },
  "presentations": {
    "source": "Live publication index",
    "introduction": "Presentations collect published decks, speaker notes, and supporting material in one filtered view.",
    "details": [
      {
        "title": "Decision-ready format",
        "description": "The decks turn working decisions and arguments into material that can be presented or reused."
      },
      {
        "title": "Published with context",
        "description": "Presentations remain connected to the broader Signal Dispatch record."
      },
      {
        "title": "Open the filtered view",
        "description": "The destination lands on Presentation records rather than the publication front page."
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
    ...workItems.map((item) => ({ slug: item.slug })),
    { slug: "commerce-practice" },
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

  const item = workItems.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  const profile = recordProfiles[item.slug];
  if (!profile) {
    notFound();
  }

  const visual = recordVisuals[item.slug];
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
            <dd>{item.state}</dd>
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
              {profile.heading ?? "What is here"}
            </h2>
          </div>
          <p>{profile.introduction}</p>
        </header>
        <div className="work-proof__grid">
          {profile.details.map((detail) => (
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
              <Link key={entry.slug} href={`/work/${entry.slug}`}>
                <span>{entry.domain}</span>
                <strong>{entry.name}</strong>
                <small>{entry.claim}</small>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <p className="back-link">
        <Link href="/work">← Return to the complete library</Link>
      </p>
    </div>
  );
}
