import Link from "next/link";
import { Suspense } from "react";
import { DemoLibrary } from "../components/DemoLibrary";
import { getDemoSnapshot } from "../demos";

export const metadata = {
  title: "Sessions",
  description:
    "Complete work sessions and reusable techniques from real agent-assisted work.",
};

export default async function DemosPage() {
  const { sessions: demoSessions, techniques: appliedTechniques } =
    await getDemoSnapshot();
  const totalRecords = demoSessions.length + appliedTechniques.length;

  return (
    <div className="demos-page demo-studio-page">
      <header className="demo-studio">
        <div className="demo-studio__stage page-shell">
          <div className="demo-studio__lead">
            <p className="eyebrow">How the work gets done</p>
            <h1>Sessions</h1>
            <p className="demo-studio__lede">
              See complete work sessions, including mistakes, corrections, and
              the evidence behind each decision.
            </p>
            <p className="demo-studio__note">
              Open a full session or jump to one tested technique you can
              reuse.
            </p>
            <div className="demo-studio__counts" aria-label="Collection counts">
              <a href="#sessions">
                <strong>{demoSessions.length}</strong>
                <span>Sessions</span>
                <b aria-hidden="true">↓</b>
              </a>
              <a href="#applied">
                <strong>{appliedTechniques.length}</strong>
                <span>Techniques</span>
                <b aria-hidden="true">↓</b>
              </a>
            </div>
          </div>

          <Link className="demo-studio__feature" href="/demos/browse-tool">
            <div>
              <img
                src="/work/demo-browser.jpg"
                alt="Source frame from The Browser Is a Shell Command"
                width="883"
                height="900"
              />
              <span>Session 02</span>
            </div>
            <span>
              <small>Start with a complete session</small>
              <strong>The Browser Is a Shell Command</strong>
              <em>
                Open the session <b aria-hidden="true">→</b>
              </em>
            </span>
          </Link>
        </div>

        <div className="demo-studio__key page-shell">
          <div>
            <span>01</span>
            <strong>See the work as it happened.</strong>
            <small>Follow the decisions, failures, and corrections in order.</small>
          </div>
          <div>
            <span>02</span>
            <strong>Reuse a tested technique.</strong>
            <small>Take one useful part without replaying the whole session.</small>
          </div>
        </div>
      </header>

      <section
        className="demo-library-stage page-shell"
        aria-labelledby="demo-library-title"
      >
        <header className="demo-library-stage__heading">
          <div>
            <p className="eyebrow">Complete collection</p>
            <h2 id="demo-library-title">Browse sessions and techniques.</h2>
          </div>
          <p>
            Search all {totalRecords} records, or open either collection
            directly.
          </p>
        </header>

        <Suspense fallback={<p>Loading the complete collection…</p>}>
          <DemoLibrary
            sessions={demoSessions}
            techniques={appliedTechniques}
          />
        </Suspense>

        <aside className="demo-collection-bridge">
          <span>About this collection</span>
          <p>
            The Ways of Working project explains how these sessions and
            techniques fit together.
          </p>
          <Link href="/work/ways-of-working">Open the project page →</Link>
        </aside>
      </section>
    </div>
  );
}
