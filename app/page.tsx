import Link from "next/link";
import type { CSSProperties } from "react";
import { domains, learnTracks, workItems } from "./data";
import { getDemoSnapshot } from "./demos";

const evidence = [
  {
    name: "Blueprint",
    kind: "Published method",
    note: "A practical method for planning, reviewing, and checking work done with AI agents.",
    href: "/work/blueprint",
    action: "Read about Blueprint",
    image: "/work/blueprint.png",
    alt: "Blueprint method documentation",
    className: "evidence-cell evidence-cell--full-frame",
  },
  {
    name: "Signal Dispatch",
    kind: "Ongoing publication",
    note: "Essays and field notes on software, commerce, and AI-assisted work.",
    href: "/blog",
    action: "Read Signal Dispatch",
    image: "/work/signal-dispatch.webp?v=372a9501",
    alt: "Signal Dispatch publication cover",
    className: "evidence-cell evidence-cell--full-frame",
  },
  {
    name: "Photography",
    kind: "Working archive",
    note: "Event photography organized for browsing and reuse.",
    href: "/photography",
    action: "Browse photography",
    image: "/work/photography.webp",
    alt: "Volleyball player holding a ball before play",
    className:
      "evidence-cell evidence-cell--portrait evidence-cell--full-frame",
  },
] as const;

function ProfileBadge() {
  return (
    <details className="practice-profile-badge">
      <summary>
        <span className="practice-profile-badge__portrait" aria-hidden="true">
          <span aria-hidden="true">+</span>
        </span>
        <span className="practice-profile-badge__label">
          <strong>Nino Chavez</strong>
          <small>
            <span className="practice-profile-badge__open-copy">
              Open profile
            </span>
            <span className="practice-profile-badge__close-copy">
              Close profile
            </span>
          </small>
        </span>
      </summary>

      <div className="practice-profile-badge__card">
        <p className="eyebrow">Chicago · Building since 1999</p>
        <p>
          Product architect, software builder, tournament operator,
          photographer, writer, and DJ.
        </p>
        <nav aria-label="Profile links">
          <Link href="/about">About Nino →</Link>
          <a href="mailto:nino@ninochavez.co">Email Nino ↗</a>
        </nav>
      </div>
    </details>
  );
}

export default async function Home() {
  const { sessions: demoSessions, techniques: appliedTechniques } =
    await getDemoSnapshot();

  return (
    <>
      <section className="practice-board" aria-labelledby="practice-title">
        <div className="practice-board__register page-shell">
          <span>Chicago</span>
          <span>Building since 1999</span>
        </div>

        <div className="practice-stage page-shell">
          <div className="practice-stage__grid" aria-hidden="true" />

          <div className="practice-identity">
            <p className="eyebrow">Product architect + builder</p>
            <h1 id="practice-title">
              <span>Nino </span>
              <span>Chavez</span>
            </h1>
          </div>

          <div className="practice-copy">
            <p className="practice-claim">
              I design products, build the software behind them, and run them
              in the real world.
            </p>
            <Link className="practice-enter" href="/work">
              See selected work <span aria-hidden="true">↓</span>
            </Link>
            <nav className="practice-profile" aria-label="Profile context">
              <Link href="/about">About me →</Link>
            </nav>
          </div>

          <div className="practice-portrait practice-portrait--backdrop">
            <img
              src="/work/nino-illustrated-v1.webp"
              alt="Illustrated portrait of Nino Chavez"
              width="1254"
              height="1254"
              fetchPriority="high"
            />
          </div>

          <ProfileBadge />

          <Link
            className="practice-proof practice-proof--rally"
            href="/work/rally-hq"
          >
            <img
              src="/work/rally-hq.webp"
              alt="Rally HQ live tournament court display"
              width="1400"
              height="875"
            />
            <span>
              <small>On the court</small>
              <strong>Rally HQ</strong>
              <b aria-hidden="true">→</b>
            </span>
          </Link>
        </div>

      </section>

      <section className="evidence-bench page-shell" aria-labelledby="bench-title">
        <header className="evidence-register">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="bench-title">Three places to start.</h2>
          </div>
          <p>
            Start with the method, the writing, or the photography archive.
          </p>
        </header>

        <div className="evidence-grid">
          {evidence.map((item) => (
            <Link className={item.className} href={item.href} key={item.name}>
              <div className="evidence-cell__image">
                <img src={item.image} alt={item.alt} />
              </div>
              <span className="evidence-cell__caption">
                <small>{item.kind}</small>
                <strong>{item.name}</strong>
                <em>{item.note}</em>
                <span className="evidence-cell__action">
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

      <section className="ways-index" aria-labelledby="ways-title">
        <header className="ways-index__register page-shell">
          <div>
            <p className="eyebrow">How I work</p>
            <h2 id="ways-title">How the work gets done.</h2>
          </div>
          <p>
            {demoSessions.length} complete sessions show what happened, what
            failed, what changed, and which of the {appliedTechniques.length}
            techniques held up.
          </p>
        </header>

        <div className="ways-index__body page-shell">
          <Link className="ways-index__frame" href="/demos/browse-tool">
            <div>
              <img
                src="/work/demo-browser.jpg"
                alt="Source frame from The Browser Is a Shell Command"
                width="883"
                height="900"
              />
            </div>
            <span>
              <small>Ways of Working · Session 02</small>
              <strong>The Browser Is a Shell Command</strong>
              <b aria-hidden="true">→</b>
            </span>
          </Link>

          <nav
            className="ways-index__routes"
            aria-label="Ways of Working collections"
          >
            <Link href="/demos#sessions">
              <span>{demoSessions.length}</span>
              <div>
                <strong>Full sessions</strong>
                <small>See the work as it happened.</small>
              </div>
              <b aria-hidden="true">→</b>
            </Link>
            <Link href="/demos#applied">
              <span>{appliedTechniques.length}</span>
              <div>
                <strong>Techniques</strong>
                <small>Reuse one tested part of the work.</small>
              </div>
              <b aria-hidden="true">→</b>
            </Link>
            <Link href="/learn">
              <span>{learnTracks.length}</span>
              <div>
                <strong>Learning paths</strong>
                <small>
                  Self-directed routes through the work, each ending in
                  something you can use.
                </small>
              </div>
              <b aria-hidden="true">→</b>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
