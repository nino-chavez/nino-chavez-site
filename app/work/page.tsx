import Link from "next/link";
import { Suspense } from "react";
import type { CSSProperties } from "react";
import { WorkLibrary } from "../components/WorkLibrary";
import { domains, workItems, type Domain } from "../data";

export const metadata = {
  title: "Work",
  description:
    "Products, tools, methods, operations, and collections by Nino Chavez.",
};

const domainNotes: Record<Domain, string> = {
  "Developer tools": "Tools and methods for planning, building, reviewing, and maintaining software.",
  "Local-first": "Private tools that keep speech, meetings, and working context close to the operator.",
  Volleyball: "Products and live operations tested on courts, at events, and with real players.",
  Commerce: "Architecture and delivery experience from complex commerce programs.",
  "Media & assets": "Tools and collections for making, reviewing, and delivering visual work.",
  Writing: "Published arguments, field notes, presentations, and durable reference material.",
};

export default function WorkPage() {
  return (
    <div className="work-page work-atlas-page">
      <header className="work-atlas">
        <div className="work-atlas__opening page-shell">
          <div className="work-atlas__lead">
            <p className="eyebrow">Projects, tools, and collections</p>
            <h1>Work</h1>
            <p className="work-atlas__lede">
              Products, operating systems, live businesses, and the tools used
              to make them hold together.
            </p>
            <p className="work-atlas__note">
              Start with a domain to understand the range, or search and filter
              everything below.
            </p>
            <a className="work-atlas__all" href="#work-library">
              Browse all {workItems.length} items{" "}
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <nav className="work-field" aria-label="Explore work by domain">
            {domains.map((domain, index) => {
                  const records = workItems.filter(
                (item) => item.domain === domain,
              );
              const share = (records.length / workItems.length) * 100;

              return (
                <Link
                  className={`work-field__domain work-field__domain--${index + 1}`}
                  href={`/work?domain=${encodeURIComponent(domain)}#work-library`}
                  key={domain}
                  style={
                    {
                      "--domain-share": `${share}%`,
                    } as CSSProperties
                  }
                >
                  <strong>{domain}</strong>
                  <small>{domainNotes[domain]}</small>
                  <em>
                    {records.length} in this domain{" "}
                    <b aria-hidden="true">→</b>
                  </em>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="work-atlas__principle page-shell">
          <span>Each item says what exists and what you can open.</span>
          <p>
            Status describes the work today. Type describes what it is. Public
            destinations open directly from the page.
          </p>
        </div>
      </header>

      <section
        className="work-library-stage page-shell"
        id="work-library"
        aria-labelledby="work-library-title"
      >
        <header className="work-library-stage__heading">
          <div>
            <p className="eyebrow">All work</p>
            <h2 id="work-library-title">Find the work.</h2>
          </div>
          <p>
            Search by name or purpose. Narrow by domain, current status, or
            type.
          </p>
        </header>
        <Suspense fallback={<p>Loading work…</p>}>
          <WorkLibrary items={workItems} />
        </Suspense>
      </section>
    </div>
  );
}
