import Link from "next/link";
import {
  learnTracks,
  workHref,
  workItems,
  workStateLabels,
  workStateText,
} from "../data";
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

function relevanceScore(query: string, primary: string, ...details: string[]) {
  const normalized = query.toLowerCase();
  const title = primary.toLowerCase();
  if (title === normalized) return 100;
  if (title.startsWith(normalized)) return 80;
  if (title.includes(normalized)) return 60;

  const secondary = details.join(" ").toLowerCase();
  if (secondary.split(/\s+/).includes(normalized)) return 30;
  return secondary.includes(normalized) ? 10 : 0;
}

function rankedMatches<T>(
  items: T[],
  query: string,
  primary: (item: T) => string,
  details: (item: T) => string[],
) {
  return items
    .map((item, index) => ({
      index,
      item,
      score: relevanceScore(query, primary(item), ...details(item)),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((result) => result.item);
}

const resultLimits = {
  work: 8,
  demos: 8,
  writing: 12,
  pages: 8,
} as const;

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

  const workMatches = query
    ? rankedMatches(
        workItems,
        query,
        (item) => item.name,
        (item) => [
          item.claim,
          item.domain,
          item.state,
          workStateLabels[item.state],
          item.form,
        ],
      )
    : [];
  const work = workMatches.slice(0, resultLimits.work);

  const demoCandidates = [
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
  ];
  const demoMatches = query
    ? rankedMatches(
        demoCandidates,
        query,
        (item) => item.title,
        (item) => [item.summary, item.kind],
      )
    : [];
  const demos = demoMatches.slice(0, resultLimits.demos);

  const writingMatches = query
    ? rankedMatches(
        writingItems,
        query,
        (item) => item.title,
        (item) => [
          item.excerpt,
          item.kind,
          item.category,
          item.publishedAt,
          ...item.tags,
        ],
      )
    : [];
  const writing = writingMatches.slice(0, resultLimits.writing);

  const pageCandidates = [
    ...learnTracks.map((track) => ({
      kind: "Learn",
      title: `${track.title} learning path`,
      href: `/learn/${track.slug}`,
      description: track.description,
      keywords: [
        track.tagline,
        track.startWhen,
        track.finalArtifact,
        "learn",
      ].join(" "),
    })),
    ...durablePages,
  ];
  const pageMatches = query
    ? rankedMatches(
        pageCandidates,
        query,
        (item) => item.title,
        (item) => [item.description, item.keywords, item.kind],
      )
    : [];
  const pages = pageMatches.slice(0, resultLimits.pages);

  const total =
    workMatches.length +
    demoMatches.length +
    writingMatches.length +
    pageMatches.length;
  const shown = work.length + demos.length + writing.length + pages.length;

  return (
    <div className="page-shell page-stack">
      <header className="page-intro">
        <p className="eyebrow">Across ninochavez.co</p>
        <h1>Search</h1>
        <p className="lede">
          Search projects, tools, demos, learning paths, writing, and pages from
          one place.
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
          <h2>Start with a project, topic, or kind of work.</h2>
          <p>
            Try <Link href="/search?q=photography">photography</Link>,{" "}
            <Link href="/search?q=commerce">commerce</Link>, or{" "}
            <Link href="/search?q=volleyball">volleyball</Link>.
          </p>
        </div>
      ) : total ? (
        <div className="search-results" aria-live="polite">
          <p className="result-summary">
            Showing <strong>{shown}</strong> of <strong>{total}</strong>{" "}
            matches for “{query}”
          </p>

          {work.length ? (
            <section aria-labelledby="search-work">
              <div className="group-heading">
                <h2 id="search-work">Work</h2>
                <span>
                  {work.length} of {workMatches.length}
                </span>
              </div>
              <div className="result-list">
                {work.map((item) => {
                  const href = workHref(item);
                  const opensInNewTab = href.startsWith("http");
                  return (
                  <a
                    key={item.slug}
                    href={href}
                    target={opensInNewTab ? "_blank" : undefined}
                    rel={opensInNewTab ? "noopener noreferrer" : undefined}
                  >
                    <span>
                      {item.domain} · {workStateText(item.state)}
                    </span>
                    <strong>{item.name}</strong>
                    <small>{item.claim}</small>
                    {opensInNewTab ? (
                      <span className="assistive-text">
                        (opens in a new tab)
                      </span>
                    ) : null}
                  </a>
                  );
                })}
              </div>
            </section>
          ) : null}

          {demos.length ? (
            <section aria-labelledby="search-demos">
              <div className="group-heading">
                <h2 id="search-demos">Demos</h2>
                <span>
                  {demos.length} of {demoMatches.length}
                </span>
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
                <span>
                  {writing.length} of {writingMatches.length}
                </span>
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
                <span>
                  {pages.length} of {pageMatches.length}
                </span>
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
