import Link from "next/link";
import type { CSSProperties } from "react";
import { domains, learnTracks, workItems } from "./data";
import { getDemoSnapshot } from "./demos";

const evidence = [
  {
    name: "Blueprint",
    kind: "Published method",
    note: "A repository-native method for directing agent-assisted work.",
    href: "/work/blueprint",
    action: "Read about Blueprint",
    image: "/work/blueprint.png",
    alt: "Blueprint method documentation",
    className: "evidence-cell evidence-cell--full-frame",
  },
  {
    name: "Signal Dispatch",
    kind: "Ongoing publication",
    note: "Essays, whitepapers, and field notes on architecture and commerce.",
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

export default async function Home() {
  const { sessions: demoSessions, techniques: appliedTechniques } =
    await getDemoSnapshot();

  return (
    <>
      <section className="practice-board" aria-labelledby="practice-title">
        <div className="practice-board__register page-shell">
          <span>Product architect</span>
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
              Product architect by trade. I also build software, run volleyball
              tournaments, photograph them, write, and DJ.
            </p>
            <p className="practice-intro">
              Those projects are where I test how agent-assisted work holds up
              under real conditions.
            </p>
            <Link className="practice-enter" href="/work">
              Explore my work <span aria-hidden="true">↓</span>
            </Link>
            <nav className="practice-profile" aria-label="Profile context">
              <Link href="/about">About Nino →</Link>
              <Link href="/now">What I’m working on now →</Link>
            </nav>
          </div>

          <div className="practice-portrait">
            <img
              src="/work/nino-illustrated-v1.webp"
              alt="Illustrated portrait of Nino Chavez"
              width="1254"
              height="1254"
              fetchPriority="high"
            />
          </div>

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
            <p className="eyebrow">Work in the world</p>
            <h2 id="bench-title">Built, published, operated.</h2>
          </div>
          <p>
            The work does not stay in one medium. It becomes a method, a
            publication, and a working photography archive.
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

      <section className="library-index" aria-labelledby="library-title">
        <header className="library-index__register page-shell">
          <div>
            <p className="eyebrow">Work</p>
            <h2 id="library-title">
              {workItems.length} projects, tools, and collections across{" "}
              {domains.length} domains.
            </h2>
          </div>
          <div>
            <p>
              Work in development is included too. Status shows what you can
              open, install, read, or inspect today.
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
      </section>

      <section className="ways-index" aria-labelledby="ways-title">
        <header className="ways-index__register page-shell">
          <div>
            <p className="eyebrow">Ways of working</p>
            <h2 id="ways-title">Ways of Working</h2>
          </div>
          <p>
            {demoSessions.length} complete sessions and{" "}
            {appliedTechniques.length} applied techniques show the hand-offs,
            failures, corrections, and reusable moves behind the work.
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
              <span>{String(demoSessions.length).padStart(2, "0")}</span>
              <div>
                <strong>Operating sessions</strong>
                <small>Complete agent-assisted work, kept in sequence.</small>
              </div>
              <b aria-hidden="true">→</b>
            </Link>
            <Link href="/demos#applied">
              <span>
                {String(appliedTechniques.length).padStart(2, "0")}
              </span>
              <div>
                <strong>Applied techniques</strong>
                <small>Reusable moves extracted from the sessions.</small>
              </div>
              <b aria-hidden="true">→</b>
            </Link>
            <Link href="/learn">
              <span>{String(learnTracks.length).padStart(2, "0")}</span>
              <div>
                <strong>Learning paths</strong>
                <small>
                  Self-directed routes through the work, each ending in an
                  artifact.
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
