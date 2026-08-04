import Link from "next/link";
import type { CSSProperties } from "react";
import { domains, learnTracks, workItems } from "./data";
import { getDemoSnapshot } from "./demos";

const proof = [
  {
    name: "Rally HQ",
    kind: "On the court",
    note: "Tournament registration, brackets, schedules, and live scoring in one public event page.",
    href: "/work/rally-hq",
    action: "See Rally HQ",
    image: "/work/rally-hq.webp",
    alt: "Rally HQ live tournament court display",
    live: true,
  },
  {
    name: "Blueprint",
    kind: "Published method",
    note: "A practical method for planning, reviewing, and checking work done with AI agents.",
    href: "/work/blueprint",
    action: "Read about Blueprint",
    image: "/work/blueprint.png",
    alt: "Blueprint method documentation",
    live: false,
  },
  {
    name: "Signal Dispatch",
    kind: "Ongoing publication",
    note: "Essays and field notes on software, commerce, and AI-assisted work.",
    href: "/blog",
    action: "Read Signal Dispatch",
    image: "/work/signal-dispatch.webp?v=372a9501",
    alt: "Signal Dispatch publication cover",
    live: false,
  },
  {
    name: "Photography",
    kind: "Working archive",
    note: "Event photography organized for browsing and reuse.",
    href: "/photography",
    action: "Browse photography",
    image: "/work/photography.webp",
    alt: "Volleyball player holding a ball before play",
    live: false,
  },
] as const;

export default async function Home() {
  const { sessions: demoSessions, techniques: appliedTechniques } =
    await getDemoSnapshot();

  return (
    <>
      <section className="field-hero" aria-labelledby="practice-title">
        <div className="field-hero__stage page-shell">
          <p className="field-hero__role">Product architect + builder</p>
          <h1 id="practice-title">
            <span>Nino </span>
            <span>Chavez</span>
          </h1>

          <div className="field-hero__copy">
            <p className="field-hero__claim">
              I design products, build the software behind them, and run them
              in the real world.
            </p>
            <div className="field-hero__actions">
              <Link className="field-hero__cta" href="/work">
                See selected work <span aria-hidden="true">↓</span>
              </Link>
              <Link className="field-hero__about" href="/about">
                About me →
              </Link>
            </div>
          </div>
        </div>

        <div className="field-hero__register page-shell">
          <span>Chicago</span>
          <span>Building since 1999</span>
          <Link href="/now">Now →</Link>
          <Link className="field-hero__credit" href="/photography">
            From the photography archive →
          </Link>
        </div>
      </section>

      <section
        className="proof-bench page-shell"
        aria-labelledby="bench-title"
      >
        <header className="proof-bench__register">
          <div>
            <p className="proof-bench__label">Selected work</p>
            <h2 id="bench-title">Three places to start.</h2>
          </div>
          <p>
            Start with the method, the writing, or the photography archive.
          </p>
        </header>

        <div className="proof-bench__grid">
          {proof.map((item) => (
            <Link
              className={
                item.live ? "proof-cell proof-cell--live" : "proof-cell"
              }
              href={item.href}
              key={item.name}
            >
              <div className="proof-cell__image">
                <img src={item.image} alt={item.alt} loading="lazy" />
              </div>
              <span className="proof-cell__caption">
                <small>{item.kind}</small>
                <strong>{item.name}</strong>
                <em>{item.note}</em>
                <span className="proof-cell__action">
                  {item.action}
                  <b aria-hidden="true">→</b>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section
        className="library-index library-index--field"
        aria-labelledby="library-title"
      >
        <header className="library-index__register page-shell">
          <div>
            <p className="eyebrow">All work</p>
            <h2 id="library-title">Explore the full body of work.</h2>
          </div>
          <div>
            <p>
              Browse {workItems.length} products, tools, methods, and
              collections across {domains.length} domains.
            </p>
            <Link href="/work">Explore all work →</Link>
          </div>
        </header>

        <nav className="domain-index page-shell" aria-label="Work domains">
          {domains.map((domain) => {
            const count = workItems.filter(
              (item) => item.domain === domain,
            ).length;
            const share = Math.round((count / workItems.length) * 1000) / 10;
            return (
              <Link
                href={`/work?domain=${encodeURIComponent(domain)}`}
                key={domain}
                style={
                  {
                    "--domain-share": `${share}%`,
                  } as CSSProperties
                }
              >
                <strong>{domain}</strong>
                <small>{count} in this domain</small>
                <b aria-hidden="true">→</b>
              </Link>
            );
          })}
        </nav>

        <p className="library-field-credit page-shell">
          <Link href="/photography">From the photography archive →</Link>
        </p>
      </section>

      <section className="session-index" aria-labelledby="ways-title">
        <div className="session-index__body page-shell">
          <header className="session-index__register">
            <p className="session-index__label">How I work</p>
            <h2 id="ways-title">How the work gets done.</h2>
            <p>
              {demoSessions.length} complete sessions show what happened, what
              failed, what changed, and which of the{" "}
              {appliedTechniques.length} techniques held up.
            </p>
          </header>

          <Link className="session-index__feature" href="/demos/browse-tool">
            <div className="session-index__feature-image">
              <img
                src="/work/demo-browser.jpg"
                alt="Source frame from The Browser Is a Shell Command"
                width="883"
                height="900"
                loading="lazy"
              />
            </div>
            <span>
              <small>Ways of Working · Session 02</small>
              <strong>The Browser Is a Shell Command</strong>
              <b aria-hidden="true">→</b>
            </span>
          </Link>

          <nav
            className="session-index__routes"
            aria-label="Ways of Working collections"
          >
            <Link href="/demos#sessions">
              <strong>Full sessions</strong>
              <small>See the work as it happened.</small>
              <span>{demoSessions.length}</span>
              <b aria-hidden="true">→</b>
            </Link>
            <Link href="/demos#applied">
              <strong>Techniques</strong>
              <small>Reuse one tested part of the work.</small>
              <span>{appliedTechniques.length}</span>
              <b aria-hidden="true">→</b>
            </Link>
            <Link href="/learn">
              <strong>Learning paths</strong>
              <small>
                Self-directed routes through the work, each ending in
                something you can use.
              </small>
              <span>{learnTracks.length}</span>
              <b aria-hidden="true">→</b>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
