import Link from "next/link";
import { learnTracks } from "../data";

export const metadata = {
  title: "Learn",
  description: `${learnTracks.length} self-directed practitioner paths grounded in the work of Nino Chavez.`,
};

export default function LearnPage() {
  return (
    <div className="learn-page">
      <header className="library-opening learn-opening">
        <div className="library-opening__register page-shell">
          <span>Learn / guided paths</span>
          <span>{learnTracks.length} paths</span>
          <span>5 stages each</span>
        </div>
        <div className="library-opening__copy page-shell">
          <div>
            <p className="eyebrow">Choose by output</p>
            <h1 aria-label="Start with what you need to make.">
              <span aria-hidden="true">Start with</span>
              <span aria-hidden="true">
                what you need to <em>make</em>.
              </span>
            </h1>
          </div>
          <div>
            <p className="lede">
              Choose an output, then follow a path built from real work.
            </p>
            <p>
              Each path has five stages. Follow them in order, or jump to the
              example you need now.
            </p>
          </div>
        </div>
      </header>

      <div className="learn-room page-shell">
        <section className="learn-chooser" aria-labelledby="learn-paths">
          <header>
            <span>{learnTracks.length} paths</span>
            <h2 id="learn-paths">Choose a path.</h2>
            <p>
              Compare when to start, what you will make, and how long it may
              take.
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
                    <small>Start when</small>
                    {track.startWhen}
                  </span>
                  <span className="learn-track-output">
                    <small>What you’ll make</small>
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
