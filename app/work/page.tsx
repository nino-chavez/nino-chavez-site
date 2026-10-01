import Link from "next/link";
import { Suspense } from "react";
import "../by-nino-library.css";
import "../building.css";
import { WorkLibrary } from "../components/WorkLibrary";
import { workItems } from "../data";
import { selectedWork } from "../selected-work";
import { BrowseAllWorkLink } from "../components/BrowseAllWorkLink";

export const metadata = {
  alternates: { canonical: "/work" },
  title: "Building",
  description:
    "Apps, websites, businesses, and the work behind them, by Nino Chavez.",
};

export default async function WorkPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const catalogue = params.view === "all" || ["q", "domain", "state", "form"].some((key) => Boolean(params[key]));
  return (
    <div className="work-page work-atlas-page building-page">
      <header className="building-page__header building-wrap">
        <div>
          <h1>Building</h1>
          <p>Apps, websites, businesses, and the work behind them.</p>
        </div>
        {catalogue ? <Link className="building-action" href="/work">Back to selected work <span aria-hidden="true">→</span></Link> : <BrowseAllWorkLink />}
      </header>

      {!catalogue ? <>
      <section className="selected-work building-wrap" aria-labelledby="selected-title">
        <h2 id="selected-title">Selected work</h2>
        {selectedWork.map((work) => {
          const external = work.href.startsWith("http");
          const availability = work.availability === "Live website" ? "" : work.availability;
          return (
            <article className={`work-entry${work.image ? "" : " work-entry--text"}`} key={work.slug} data-work={work.slug}>
              <div className="work-identity">
                <h3>{work.name}</h3>
                <p className="work-kind">{work.kind}</p>
              </div>
              <div className="work-description">
                <p>{work.summary}</p>
                {availability ? <p className="work-availability">{availability}</p> : null}
                {external ? <a className="building-action" href={work.href} target="_blank" rel="noopener noreferrer">
                  {work.action}<span aria-hidden="true">↗</span><span className="assistive-text"> (opens in a new tab)</span>
                </a> : <Link className="building-action" href={work.href}>{work.action}<span aria-hidden="true">→</span></Link>}
                {work.image?.caption ? <p className="media-caption">{work.image.caption}</p> : null}
              </div>
              {work.image ? <figure className={`work-preview work-preview--${work.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element -- Framed static previews preserve the approved screenshot crops. */}
                <img src={work.image.src} alt={work.image.alt} loading={work.slug === "minder" ? "eager" : "lazy"} />
              </figure> : null}
            </article>
          );
        })}
      </section>

      <section className="building-studies" aria-labelledby="public-work-title">
        <div className="building-wrap">
        <header className="building-section__heading">
          <h2 id="public-work-title">Studies &amp; methods</h2>
        </header>
        <div className="building-resources">
          <article className="building-resource">
            <p className="building-resource__type">Public draft</p>
            <h3>One Cart Across Two Storefronts</h3>
            <p>
              A study of what BigCommerce multi-storefront permits when two
              storefronts need one cart. Published for inspection; source
              remains a draft.
            </p>
            <a
              href="https://library.ninochavez.co/commerce/bc-shared-cart-pattern"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the shared-cart study
              <span className="assistive-text"> (opens in a new tab)</span>
            </a>
          </article>
          <article className="building-resource">
            <p className="building-resource__type">Method</p>
            <h3>Blueprint</h3>
            <p>
              A practical method for planning, reviewing, and checking product
              work done with AI agents.
            </p>
            <Link href="/work/blueprint">Explore Blueprint</Link>
          </article>

        </div>
        </div>
      </section>

      <nav className="building-routes building-wrap" aria-label="More ways to explore Building">
        <Link className="building-route" href="/demos">
          <h2>Process</h2>
          <p>See complete sessions and applied techniques.</p>
        </Link>
        <Link className="building-route" href="/learn">
          <h2>Guides</h2>
          <p>Follow practical learning paths with examples and checkpoints.</p>
        </Link>
      </nav>

      </> : <section
        className="building-catalogue building-wrap work-library-stage"
        id="work-library"
        aria-labelledby="work-library-title"
      >
        <header className="building-section__heading">
          <h2 id="work-library-title">Browse all work</h2>
          <p>
            Search by name or purpose. Status says what is available today;
            format describes how the work is delivered.
          </p>
        </header>
        <Suspense fallback={<p>Loading work…</p>}>
          <WorkLibrary items={workItems} />
        </Suspense>
      </section>}
    </div>
  );
}
