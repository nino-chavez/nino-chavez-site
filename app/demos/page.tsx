import Link from "next/link";
import { Suspense } from "react";
import { DemoLibrary } from "../components/DemoLibrary";
import { getDemoSnapshot } from "../demos";

export const metadata = {
  title: "Demos — Ways of Working",
  description:
    "The complete collection of operating sessions and applied techniques from real agent-assisted work.",
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
            <p className="eyebrow">Demos / operating record</p>
            <h1>Ways of Working</h1>
            <p className="demo-studio__lede">
              Step through the work in sequence. Then take the reusable parts
              into your own practice.
            </p>
            <p className="demo-studio__note">
              These are complete operating sessions, including hand-offs,
              failures, corrections, and the evidence used to decide.
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
            <strong>Sessions preserve sequence.</strong>
            <small>See what happened, in the order it happened.</small>
          </div>
          <div>
            <span>02</span>
            <strong>Techniques preserve reuse.</strong>
            <small>Take one tested move without replaying the whole session.</small>
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
            <h2 id="demo-library-title">Choose how to enter.</h2>
          </div>
          <p>
            Search all {totalRecords} sessions and techniques, or move directly
            through the two collections below.
          </p>
        </header>

        <Suspense fallback={<p>Loading the complete collection…</p>}>
          <DemoLibrary
            sessions={demoSessions}
            techniques={appliedTechniques}
          />
        </Suspense>

        <aside className="demo-collection-bridge">
          <span>Work record / Ways of Working</span>
          <p>
            The collection belongs to the same practice as every other project,
            system, and operating record.
          </p>
          <Link href="/work/ways-of-working">Open the work record →</Link>
        </aside>
      </section>
    </div>
  );
}
