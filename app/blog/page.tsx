import { Suspense } from "react";
import { WritingLibrary } from "../components/WritingLibrary";
import { getWritingSnapshot } from "../writing";

export const metadata = {
  title: "Writing — Signal Dispatch",
  description:
    "The complete Signal Dispatch publication: essays, whitepapers, presentations, tutorials, counterpoints, and fiction by Nino Chavez.",
};

export default async function BlogPage() {
  const writingSnapshot = await getWritingSnapshot();
  const writingSeries = writingSnapshot.series;
  const latestDate = new Date(
    `${writingSnapshot.latestPublishedAt}T12:00:00Z`,
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="writing-page">
      <header className="library-opening writing-opening">
        <div className="library-opening__register page-shell">
          <span>Writing / Signal Dispatch</span>
          <span>{writingSnapshot.publicPieceCount} pieces</span>
          <span>Updated {latestDate}</span>
        </div>
        <div className="library-opening__copy page-shell">
          <div>
            <p className="eyebrow">Signal Dispatch</p>
            <h1>Signal Dispatch</h1>
          </div>
          <div>
            <p className="lede">
              Essays and field notes about software products, operations,
              commerce, and AI-assisted work.
            </p>
            <p>
              Search all {writingSnapshot.publicPieceCount} published pieces,
              or narrow the collection by form, subject, or year.
            </p>
          </div>
        </div>
      </header>

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
                  target="_blank"
                  rel="noopener noreferrer"
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
                  <b aria-hidden="true">↗</b>
                  <span className="assistive-text">
                    (opens in a new tab)
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

      </div>
    </div>
  );
}
