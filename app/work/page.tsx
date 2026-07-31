import Link from "next/link";
import { Suspense } from "react";
import type { CSSProperties } from "react";
import { WorkLibrary } from "../components/WorkLibrary";
import { domains, workItems, type Domain } from "../data";

export const metadata = {
  title: "Work library",
  description: "The complete authorized inventory of work by Nino Chavez.",
};

const domainNotes: Record<Domain, string> = {
  Practice: "Methods and tools for directing, inspecting, and retaining agent-assisted work.",
  "Local-first": "Private tools that keep speech, meetings, and working context close to the operator.",
  Volleyball: "Products and live operations tested on courts, at events, and with real players.",
  Commerce: "Architecture and private systems shaped by production commerce constraints.",
  "Media & assets": "Tools and collections for making, reviewing, and delivering visual work.",
  Writing: "Published arguments, field notes, presentations, and durable reference material.",
};

export default function WorkPage() {
  return (
    <div className="work-page work-atlas-page">
      <header className="work-atlas">
        <div className="work-atlas__opening page-shell">
          <div className="work-atlas__lead">
            <p className="eyebrow">Complete working record</p>
            <h1>Work</h1>
            <p className="work-atlas__lede">
              Products, operating systems, live businesses, and the tools used
              to make them hold together.
            </p>
            <p className="work-atlas__note">
              Start with a domain to understand the range, or move directly to
              the complete searchable record.
            </p>
            <a className="work-atlas__all" href="#work-library">
              Browse all {workItems.length} records{" "}
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
                  <span>
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(domains.length).padStart(2, "0")}
                  </span>
                  <strong>{domain}</strong>
                  <small>{domainNotes[domain]}</small>
                  <em>
                    {records.length}{" "}
                    {records.length === 1 ? "record" : "records"}{" "}
                    <b aria-hidden="true">→</b>
                  </em>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="work-atlas__principle page-shell">
          <span>Nothing is hidden for failing to look finished.</span>
          <p>
            State tells you what can be opened, installed, read, or inspected
            now. It does not decide whether the work belongs.
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
            <h2 id="work-library-title">Find a record.</h2>
          </div>
          <p>
            Search by name or purpose. Narrow by domain, current state, or the
            form the work takes.
          </p>
        </header>
        <Suspense fallback={<p>Loading the complete library…</p>}>
          <WorkLibrary items={workItems} />
        </Suspense>
      </section>
    </div>
  );
}
