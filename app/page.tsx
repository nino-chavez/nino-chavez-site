import Link from "next/link";
import { domains, learnTracks, workItems } from "./data";
import { getDemoSnapshot } from "./demos";

const proof = [
  {
    name: "Rally HQ",
    kind: "On the court",
    note: "Tournament registration, brackets, schedules, and live scoring in one public event page.",
    href: "/work/rally-hq",
    action: "See Rally HQ",
    // Card-only crop of the court view (see public/work/rally-hq.webp for the
    // full screenshot used on the /work/rally-hq detail page). The full frame
    // reads as illegible chrome at card size; this crop keeps one court's
    // score legible and drops the frozen "6:59 PM" clock, which read as a
    // stale timestamp against the "live" claim.
    image: "/work/rally-hq-card.webp",
    alt: "Rally HQ live court card showing a running score",
    live: true,
  },
  {
    name: "Blueprint",
    kind: "Published method",
    note: "A practical method for planning, reviewing, and checking work done with AI agents.",
    href: "/work/blueprint",
    action: "Read about Blueprint",
    // No image: Blueprint is a method, not a product with a UI to screenshot.
    // docs/claude-design-system.md §Photography: "Pages about software work
    // show their own real artifacts ... or nothing — zero was already a
    // correct answer, and off-subject is worse than zero." The card
    // component's image is documented as optional (§Component inventory).
    image: null,
    alt: "",
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
    // The source cover is a 1200x630 og-image with its title set edge to
    // edge. Cropped to the grid's 16:10 card at object-fit: cover, the
    // default center crop cuts both edges of that title. object-fit:
    // contain shows the whole cover instead of cropping it.
    fit: "contain",
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
            <h2 id="bench-title">Four places to start.</h2>
          </div>
          <p>
            Start with the live product, the method, the writing, or the
            photography archive.
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
              {item.image ? (
                <div
                  className={
                    "fit" in item && item.fit === "contain"
                      ? "proof-cell__image proof-cell__image--contain"
                      : "proof-cell__image"
                  }
                >
                  <img src={item.image} alt={item.alt} loading="lazy" />
                </div>
              ) : null}
              <span
                className={
                  item.image
                    ? "proof-cell__caption"
                    : "proof-cell__caption proof-cell__caption--flush"
                }
              >
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
        className="library-index home-allwork"
        aria-labelledby="library-title"
      >
        <header className="library-index__register page-shell">
          <div>
            <p className="eyebrow">All work</p>
            <h2 id="library-title">Explore the full body of work.</h2>
          </div>
          <div>
            <p>
              These look unrelated. Each one has to work for the people in
              front of it — on a court, at a checkout, on a deadline.
            </p>
            <p>
              Browse {workItems.length} products, tools, methods, operations,
              and collections across {domains.length} domains.
            </p>
            <Link href="/work">Explore all work →</Link>
          </div>
        </header>

        <div className="home-allwork__body page-shell">
          <figure className="home-allwork__frame">
            <img
              src="/images/all-work-frame.webp"
              alt="Defensive dive from the photography archive"
              loading="lazy"
            />
            <figcaption aria-hidden="true">All work</figcaption>
          </figure>

          <nav className="domain-ledger" aria-label="Work domains">
            {domains.map((domain) => {
              const count = workItems.filter(
                (item) => item.domain === domain,
              ).length;
              return (
                <Link
                  href={`/work?domain=${encodeURIComponent(domain)}`}
                  key={domain}
                >
                  <strong>{domain}</strong>
                  <small>{count} in this domain</small>
                  <b aria-hidden="true">→</b>
                </Link>
              );
            })}
          </nav>
        </div>
      </section>

      <section className="session-index" aria-labelledby="ways-title">
        <div className="session-index__body page-shell">
          <header className="session-index__register">
            <p className="session-index__label">Sessions</p>
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
