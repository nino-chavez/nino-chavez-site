import Link from "next/link";
import { learnTracks, workHref, workItems } from "../data";
import { getDemoSnapshot } from "../demos";
import { getWritingSnapshot } from "../writing";

const durablePages = [
  {
    kind: "Collection",
    title: "Photography",
    href: "/photography",
    description:
      "An image-first front door to the full volleyball and action-sports archive.",
    keywords:
      "photography photos volleyball action sports events albums timeline collections favorites team jersey number Flickday Media",
  },
  {
    kind: "Profile",
    title: "About Nino Chavez",
    href: "/about",
    description:
      "Product architect, builder, tournament operator, photographer, writer, and DJ in Chicago.",
    keywords:
      "commerce.com software architecture consulting volleyball photography music SoundCloud since 1999",
  },
  {
    kind: "Current context",
    title: "Now",
    href: "/now",
    description:
      "A dated attention map across product architecture, the public site, agent-assisted practice, and volleyball operations.",
    keywords:
      "current focus commerce.com site redesign agents Blueprint Film Room volleyball Rally HQ Let's Pepper Flickday Media active July 2026",
  },
  {
    kind: "Directory",
    title: "Links",
    href: "/links",
    description:
      "Maintained destinations for products, ventures, source, publishing, photography, music, profiles, and contact.",
    keywords:
      "Rally HQ Let's Pepper Flickday Media Signal X Studio GitHub Signal Dispatch LinkedIn photography Instagram SoundCloud email external profiles",
  },
  {
    kind: "Policy",
    title: "Privacy",
    href: "/privacy",
    description:
      "What the public site receives, what the photography gallery records, and the choices available to visitors.",
    keywords:
      "privacy data Cloudflare analytics Supabase photography gallery search engagement favorites tracking cookies local storage athlete image removal contact",
  },
] as const;

function includesQuery(query: string, ...values: string[]) {
  return values.join(" ").toLowerCase().includes(query.toLowerCase());
}

export const metadata = {
  title: "Search",
  description: "Search work, demos, writing, and durable pages.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const [demoSnapshot, writingSnapshot] = await Promise.all([
    getDemoSnapshot(),
    getWritingSnapshot(),
  ]);
  const demoSessions = demoSnapshot.sessions;
  const appliedTechniques = demoSnapshot.techniques;
  const writingItems = writingSnapshot.items;

  const work = query
    ? workItems.filter((item) =>
        includesQuery(
          query,
          item.name,
          item.claim,
          item.domain,
          item.state,
          item.form,
        ),
      )
    : [];

  const demos = query
    ? [
        ...demoSessions.map((item) => ({
          ...item,
          kind: "Session",
          href: `/demos/${item.slug}`,
        })),
        ...appliedTechniques.map((item) => ({
          ...item,
          kind: "Applied technique",
          href: `/demos/applied/${item.slug}`,
        })),
      ].filter((item) => includesQuery(query, item.title, item.summary))
    : [];

  const writing = query
    ? writingItems.filter((item) =>
        includesQuery(
          query,
          item.title,
          item.excerpt,
          item.kind,
          item.category,
          item.publishedAt,
          ...item.tags,
        ),
      )
    : [];

  const pages = query
    ? [
        ...learnTracks
          .filter((track) =>
            includesQuery(
              query,
              track.title,
              track.tagline,
              track.description,
              track.startWhen,
              track.finalArtifact,
              "learn",
            ),
          )
          .map((track) => ({
            kind: "Learn",
            title: `${track.title} learning path`,
            href: `/learn/${track.slug}`,
            description: track.description,
          })),
        ...durablePages.filter((page) =>
          includesQuery(
            query,
            page.title,
            page.description,
            page.keywords,
          ),
        ),
      ]
    : [];

  const total = work.length + demos.length + writing.length + pages.length;

  return (
    <div className="page-shell page-stack">
      <header className="page-intro">
        <p className="eyebrow">Across ninochavez.co</p>
        <h1>Search</h1>
        <p className="lede">
          Find work objects, demo sessions, applied techniques, writing, and
          durable pages from one place.
        </p>
      </header>

      <form className="site-search-form" action="/search" role="search">
        <label htmlFor="site-query">Search this site</label>
        <div>
          <input
            id="site-query"
            name="q"
            type="search"
            defaultValue={query}
            placeholder="Project, topic, or page…"
            autoFocus
          />
          <button type="submit">Search</button>
        </div>
      </form>

      {!query ? (
        <div className="empty-state">
          <p className="eyebrow">Search everything</p>
          <h2>Try a product, domain, status, or idea.</h2>
          <p>
            Examples: <Link href="/search?q=agent">agent</Link>,{" "}
            <Link href="/search?q=volleyball">volleyball</Link>, or{" "}
            <Link href="/search?q=maintained">maintained</Link>.
          </p>
        </div>
      ) : total ? (
        <div className="search-results" aria-live="polite">
          <p className="result-summary">
            <strong>{total}</strong> results for “{query}”
          </p>

          {work.length ? (
            <section aria-labelledby="search-work">
              <div className="group-heading">
                <h2 id="search-work">Work</h2>
                <span>{work.length}</span>
              </div>
              <div className="result-list">
                {work.map((item) => (
                  <Link key={item.slug} href={workHref(item)}>
                    <span>
                      {item.domain} · {item.state}
                    </span>
                    <strong>{item.name}</strong>
                    <small>{item.claim}</small>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {demos.length ? (
            <section aria-labelledby="search-demos">
              <div className="group-heading">
                <h2 id="search-demos">Demos</h2>
                <span>{demos.length}</span>
              </div>
              <div className="result-list">
                {demos.map((item) => (
                  <Link key={`${item.kind}-${item.slug}`} href={item.href}>
                    <span>{item.kind}</span>
                    <strong>{item.title}</strong>
                    <small>{item.summary}</small>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {writing.length ? (
            <section aria-labelledby="search-writing">
              <div className="group-heading">
                <h2 id="search-writing">Writing</h2>
                <span>{writing.length}</span>
              </div>
              <div className="result-list">
                {writing.map((item) => (
                  <a
                    key={`${item.kind}-${item.slug}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      {item.kind} · {item.category} ·{" "}
                      {item.publishedAt.slice(0, 4)}
                    </span>
                    <strong>{item.title}</strong>
                    {item.excerpt ? <small>{item.excerpt}</small> : null}
                    <span className="assistive-text">
                      (opens in a new tab)
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          {pages.length ? (
            <section aria-labelledby="search-pages">
              <div className="group-heading">
                <h2 id="search-pages">Pages</h2>
                <span>{pages.length}</span>
              </div>
              <div className="result-list">
                {pages.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span>{item.kind}</span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      ) : (
        <div className="empty-state" aria-live="polite">
          <p className="eyebrow">No results</p>
          <h2>Nothing public matches “{query}.”</h2>
          <p>
            Try a broader term or <Link href="/search">clear the search</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
