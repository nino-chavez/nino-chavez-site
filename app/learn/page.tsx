import Link from "next/link";
import "../by-nino-library.css";
import { learnTracks } from "../data";

export const metadata = {
  title: "Guides",
  description: `${learnTracks.length} self-directed practitioner paths grounded in the work of Nino Chavez.`,
  alternates: { canonical: "https://ninochavez.co/learn" },
};

export default function LearnPage() {
  return (
    <div className="learn-page">
      <header className="library-opening learn-opening">
        <div className="library-opening__copy page-shell">
          <div>
            <h1>Guides</h1>
          </div>
          <div>
            <p className="lede">
              Choose what you need to make. Each guide has five stages; follow
              them in order or jump to the example you need.
            </p>
          </div>
        </div>
      </header>

      <div className="learn-room page-shell">
        <section className="learn-chooser" aria-labelledby="learn-paths">
          <h2 id="learn-paths" className="assistive-text">Choose a guide</h2>

          <ol className="learn-track-register">
            {learnTracks.map((track) => (
              <li key={track.slug}>
                <Link href={`/learn/${track.slug}`}>
                  <span className="learn-track-name">
                    <strong>{track.title}</strong>
                    <small>{track.tagline}</small>
                  </span>
                  <span className="learn-track-output">
                    <small>What you’ll make</small>
                    {track.finalArtifact}
                  </span>
                  <span className="learn-track-start">
                    <small>Start when</small>
                    {track.startWhen}
                  </span>
                  <span className="learn-track-time">{track.timeline}</span>
                  <b aria-hidden="true">→</b>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <aside className="learn-evidence-bridge">
          <span>Want to see the work first?</span>
          <p>
            Browse the sessions and techniques these paths use.
          </p>
          <Link href="/demos">See the sessions →</Link>
        </aside>
      </div>
    </div>
  );
}
