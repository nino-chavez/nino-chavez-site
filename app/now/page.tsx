import Link from "next/link";

export const metadata = {
  title: "Now",
  description:
    "A dated view of the work and operating questions that currently have Nino Chavez’s attention.",
};

const currentFocus = [
  {
    code: "N01",
    area: "Professional",
    state: "Current role",
    title: "Product architecture at commerce.com",
    description:
      "The day job is Product Architect. The work itself is private; the public question is whether an agent-assisted practice developed in small systems still holds inside a larger organization.",
    href: "/about",
    action: "Read the durable profile",
  },
  {
    code: "N02",
    area: "Public surface",
    state: "In review",
    title: "Consolidating the public record",
    description:
      "Work, demos, learning paths, writing, photography, and personal context are moving into one apex site and one navigation system. This review build is the current artifact.",
    href: "/work",
    action: "Browse the complete work",
  },
  {
    code: "N03",
    area: "Agent-assisted practice",
    state: "Building",
    title: "Tightening the proof loop",
    description:
      "Blueprint, Film Room, and the operating sessions are being used to keep intent, execution, review, and evidence connected without handing judgment to the tools.",
    href: "/demos",
    action: "Open the operating sessions",
  },
  {
    code: "N04",
    area: "Live operations",
    state: "Operating",
    title: "Running the volleyball stack",
    description:
      "Let’s Pepper events, Rally HQ tournament infrastructure, and Flickday Media coverage are being developed against the same tournament-day conditions.",
    href: "/work?domain=Volleyball",
    action: "See the volleyball work",
  },
] as const;

const pageNotes = [
  {
    label: "Public boundary",
    value:
      "This page names only work I can discuss publicly. Employer, client, and private-repository details stay out.",
  },
  {
    label: "Update rhythm",
    value:
      "I update this page when the focus changes materially. It is not a daily activity log.",
  },
] as const;

export default function NowPage() {
  return (
    <div className="now-page">
      <div className="about-context-surface">
        <nav
          className="about-context-navigation page-shell"
          aria-label="Personal pages"
        >
          <Link href="/about">About</Link>
          <Link href="/now" aria-current="page">
            Now
          </Link>
          <Link href="/links">Links</Link>
        </nav>
      </div>

      <header className="now-opening">
        <div className="now-opening__register page-shell">
          <span>Now / current attention</span>
          <span>Chicago</span>
          <time dateTime="2026-07-30">30 July 2026</time>
        </div>

        <div className="now-opening__stage page-shell">
          <div className="now-opening__lockup">
            <p className="eyebrow">Current context</p>
            <h1>Now</h1>
          </div>

          <div className="now-opening__statement">
            <p className="now-opening__lede">
              Four things have my attention.
            </p>
            <p>
              Each entry below names the work, its current state, and the
              nearest public evidence.
            </p>
          </div>
        </div>
      </header>

      <div className="now-body page-shell">
        <section className="now-section" aria-labelledby="now-in-motion">
          <header>
            <span>01 / In motion</span>
            <h2 id="now-in-motion">Where the work is moving</h2>
            <p>
              A current attention map, with the nearest public evidence for
              each part.
            </p>
          </header>

          <ol className="now-register">
            {currentFocus.map((item) => (
              <li key={item.code}>
                <article>
                  <Link className="now-register__entry" href={item.href}>
                    <div className="now-register__meta">
                      <span>{item.code}</span>
                      <span>{item.area}</span>
                      <span>{item.state}</span>
                    </div>
                    <div className="now-register__content">
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <span className="now-register__action">
                        {item.action} <b aria-hidden="true">→</b>
                      </span>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <section className="now-section now-notes" aria-labelledby="now-notes">
          <header>
            <span>02 / Reading this page</span>
            <h2 id="now-notes">Current, not exhaustive</h2>
          </header>

          <dl>
            {pageNotes.map((note) => (
              <div key={note.label}>
                <dt>{note.label}</dt>
                <dd>{note.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
