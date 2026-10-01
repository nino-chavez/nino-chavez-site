import { Suspense } from "react";
import { WritingLibrary } from "../components/WritingLibrary";
import { getWritingSnapshot } from "../writing";
import "../by-nino-frontdoors.css";

export const metadata = {
  alternates: { canonical: "/blog" },
  title: "Writing — Signal Dispatch",
  description:
    "The complete Signal Dispatch publication: essays, whitepapers, presentations, tutorials, counterpoints, and fiction by Nino Chavez.",
};

export default async function BlogPage() {
  const writingSnapshot = await getWritingSnapshot();
  const writingSeries = writingSnapshot.series;
  const latestPiece = [...writingSnapshot.items].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  )[0];


  return (
    <div className="writing-page by-nino-frontdoor by-nino-writing">
      <header className="library-opening writing-opening">
        <div className="library-opening__copy page-shell">
          <h1>Writing</h1>
          <p className="lede">Signal Dispatch. Essays and field notes about software, commerce, and AI-assisted work.</p>
        </div>
      </header>

      {latestPiece ? (
        <section
          className="writing-featured page-shell"
          aria-labelledby="latest-piece-title"
        >
          <a href={latestPiece.href}>
            <p className="writing-featured__label">Latest piece</p>
            <h2 id="latest-piece-title">{latestPiece.title}</h2>
            <p className="writing-featured__excerpt">{latestPiece.excerpt}</p>
            <p className="writing-featured__meta">
              <span>{latestPiece.kind}</span>
              <span>
                {new Date(
                  `${latestPiece.publishedAt}T12:00:00Z`,
                ).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </span>
              <b>
                Read the piece <span aria-hidden="true">→</span>
              </b>
            </p>
          </a>
        </section>
      ) : null}

      <div className="library-room writing-room page-shell">
        <Suspense fallback={<p>Loading the complete publication…</p>}>
          <WritingLibrary
            categories={writingSnapshot.categories}
            items={writingSnapshot.items}
            years={writingSnapshot.years}
          />
        </Suspense>

        <section
          className="writing-series-directory"
          aria-labelledby="writing-series"
        >
          <header>
            <div>
              <h2 id="writing-series">Series</h2>
              <p>
                {writingSeries.length} authored sequences offer a second way
                through the publication. Each opens at its live Signal
                Dispatch index.
              </p>
            </div>
          </header>
          <ol>
            {writingSeries.map((series) => (
              <li key={series.slug}>
                <a
                  href={series.href}
                >
                  <span className="series-name">
                    <strong>{series.title}</strong>
                    <small>{series.description}</small>
                  </span>
                  <span className="series-state">
                    {series.status}
                    <small>
                      {series.articleCount}{" "}
                      {series.articleCount === 1 ? "article" : "articles"}
                    </small>
                  </span>
                  <b aria-hidden="true">→</b>
                </a>
              </li>
            ))}
          </ol>
        </section>

      </div>
    </div>
  );
}
