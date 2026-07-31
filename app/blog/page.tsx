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
  const essayCount = writingSnapshot.kindCounts.Essay;
  const otherCount = writingSnapshot.publicPieceCount - essayCount;
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
          <span>Writing / complete publication</span>
          <span>{writingSnapshot.publicPieceCount} pieces</span>
          <span>Updated {latestDate}</span>
        </div>
        <div className="library-opening__copy page-shell">
          <div>
            <p className="eyebrow">Signal Dispatch</p>
            <h1
              aria-label={`${essayCount} essays and ${otherCount} other published pieces.`}
            >
              <span aria-hidden="true">{essayCount} essays,</span>
              <span aria-hidden="true">{otherCount} other pieces.</span>
            </h1>
          </div>
          <div>
            <p className="lede">
              Signal Dispatch is the published side of the practice: essays
              plus whitepapers, presentations, tutorials, counterpoints, and
              fiction.
            </p>
            <p>
              Nothing is selected away. Search all{" "}
              {writingSnapshot.publicPieceCount} pieces or narrow the record by
              form, subject, or year.
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
            <span>S01–S{String(writingSeries.length).padStart(2, "0")}</span>
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
            {writingSeries.map((series, index) => (
              <li key={series.slug}>
                <a
                  href={series.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="series-number">
                    S{String(index + 1).padStart(2, "0")}
                  </span>
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

        <aside className="writing-publication-bridge">
          <span>Prefer the publication itself?</span>
          <p>
            Open the current Signal Dispatch front page for featured work,
            current navigation, and the reading experience.
          </p>
          <a href="https://ninochavez.co/blog">Open Signal Dispatch ↗</a>
        </aside>
      </div>
    </div>
  );
}
