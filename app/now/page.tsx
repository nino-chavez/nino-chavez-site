import Link from "next/link";

export const metadata = {
  title: "Now",
  description:
    "A dated view of the work and operating questions that currently have Nino Chavez’s attention.",
};

const currentFocus = [
  {
    area: "Professional",
    state: "Current role",
    title: "Product architecture at commerce.com",
    description:
      "My work at commerce.com is private. Publicly, I’m testing whether the methods I use on smaller products still work inside a larger organization.",
    href: "/about",
    action: "About Nino",
  },
  {
    area: "Public surface",
    state: "Maintaining",
    title: "Maintaining the public site",
    description:
      "Work, demos, learning paths, writing, photography, and personal context now share one site and navigation. The current focus is keeping those paths useful and accurate.",
    href: "/work",
    action: "Browse the complete work",
  },
  {
    area: "Agent-assisted practice",
    state: "Building",
    title: "Making AI-assisted work easier to verify",
    description:
      "I’m using Blueprint, Film Room, and documented work sessions to connect each decision to the work and evidence behind it without giving the tools final judgment.",
    href: "/demos",
    action: "See how I work",
  },
  {
    area: "Live operations",
    state: "Operating",
    title: "Running the volleyball products together",
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
      "I update this page when my focus changes materially, so it stays a useful snapshot rather than a running log.",
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
          <span>What I’m working on now</span>
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
              Each entry names the work, its current state, and the closest
              public example.
            </p>
          </div>
        </div>
      </header>

      <div className="now-body page-shell">
        <section className="now-section" aria-labelledby="now-in-motion">
          <header>
            <span>In motion</span>
            <h2 id="now-in-motion">What I’m working on now</h2>
            <p>
              Four active areas, with a public example for each one.
            </p>
          </header>

          <ol className="now-register">
            {currentFocus.map((item) => (
              <li key={item.title}>
                <article>
                  <Link className="now-register__entry" href={item.href}>
                    <div className="now-register__meta">
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
            <span>Reading this page</span>
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
