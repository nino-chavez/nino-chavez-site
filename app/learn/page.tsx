import Link from "next/link";
import { learnTracks } from "../data";

export const metadata = {
  title: "Learn",
  description:
    "Seven self-directed practitioner paths grounded in the work of Nino Chavez.",
};

export default function LearnPage() {
  return (
    <div className="learn-page">
      <header className="library-opening learn-opening">
        <div className="library-opening__register page-shell">
          <span>Learn / practitioner paths</span>
          <span>{learnTracks.length} paths</span>
          <span>5 stages each</span>
        </div>
        <div className="library-opening__copy page-shell">
          <div>
            <p className="eyebrow">Choose by output</p>
            <h1 aria-label="Start with the artifact.">
              <span aria-hidden="true">Start with</span>
              <span aria-hidden="true">the artifact.</span>
            </h1>
          </div>
          <div>
            <p className="lede">
              Choose the thing you need to make, not a role you need to become.
              Each path ends in a concrete artifact and points back to the work
              that informed it.
            </p>
            <p>
              Each path is self-directed. Follow its stages in order, or start
              with the evidence you need now.
            </p>
          </div>
        </div>
      </header>

      <div className="learn-room page-shell">
        <section className="learn-chooser" aria-labelledby="learn-paths">
          <header>
            <span>{learnTracks.length} paths</span>
            <h2 id="learn-paths">Seven ways to build something concrete</h2>
            <p>
              Compare the starting condition, end artifact, and likely time
              before opening a path.
            </p>
          </header>

          <ol className="learn-track-register">
            {learnTracks.map((track) => (
              <li key={track.slug}>
                <Link href={`/learn/${track.slug}`}>
                  <span className="learn-track-name">
                    <strong>{track.title}</strong>
                    <small>{track.tagline}</small>
                  </span>
                  <span className="learn-track-start">
                    <small>Start here when</small>
                    {track.startWhen}
                  </span>
                  <span className="learn-track-output">
                    <small>End artifact</small>
                    {track.finalArtifact}
                  </span>
                  <span className="learn-track-time">{track.timeline}</span>
                  <b aria-hidden="true">→</b>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <aside className="learn-evidence-bridge">
          <span>Prefer proof before a path?</span>
          <p>
            The demo collection shows the sessions and reusable techniques that
            these paths draw from.
          </p>
          <Link href="/demos">Browse all demos →</Link>
        </aside>
      </div>
    </div>
  );
}
