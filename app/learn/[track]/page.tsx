import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { learnTracks } from "../../data";

export function generateStaticParams() {
  return learnTracks.map((track) => ({ track: track.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: slug } = await params;
  const track = learnTracks.find((entry) => entry.slug === slug);

  return track
    ? {
        title: `${track.title} learning path`,
        description: `${track.tagline}. End artifact: ${track.finalArtifact}.`,
      }
    : {};
}

export default async function LearnTrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: slug } = await params;
  const index = learnTracks.findIndex((entry) => entry.slug === slug);

  if (index < 0) {
    notFound();
  }

  const track = learnTracks[index];
  const previous = learnTracks.at(index - 1);
  const next = learnTracks.at(index + 1);

  return (
    <div className="learn-track-page">
      <header className="learn-track-opening">
        <div className="page-shell">
          <Breadcrumbs
            items={[{ label: "Learn", href: "/learn" }, { label: track.title }]}
          />

          <div className="learn-track-opening__register">
            <span>Learning path</span>
            <span>{track.timeline}</span>
            <span>{track.levels.length} stages</span>
          </div>

          <div className="learn-track-opening__copy">
            <div>
              <p className="eyebrow">Practitioner path</p>
              <h1>{track.title}</h1>
              <p className="learn-track-tagline">{track.tagline}</p>
            </div>
            <div>
              <p className="lede">{track.description}</p>
              <dl className="learn-track-facts">
                <div>
                  <dt>Start when</dt>
                  <dd>{track.startWhen}</dd>
                </div>
                <div>
                  <dt>End artifact</dt>
                  <dd>{track.finalArtifact}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      <div className="learn-track-body page-shell">
        <section className="learn-grounding" aria-labelledby="grounding-title">
          <header>
            <span>Grounding / {track.evidence.length} examples</span>
            <h2 id="grounding-title">See the evidence before the instruction</h2>
            <p>
              Each example shows work, a session, or writing that shaped this
              path. Use the evidence to test the instruction before adopting it.
            </p>
          </header>
          <div className="learn-evidence-list">
            {track.evidence.map((item) => {
              const external = item.href.startsWith("http");

              return (
                <Link
                  href={item.href}
                  key={`${item.kind}-${item.href}`}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  <span>{item.kind}</span>
                  <strong>
                    {item.title}
                    {external ? (
                      <span className="sr-only"> (opens in a new tab)</span>
                    ) : null}
                  </strong>
                  <small>{item.note}</small>
                  <b aria-hidden="true">{external ? "↗" : "→"}</b>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="learn-fit" aria-labelledby="fit-title">
          <header>
            <span>Fit check</span>
            <h2 id="fit-title">Know whether this is your path</h2>
          </header>
          <div className="learn-fit-grid">
            <div>
              <h3>Use this path if</h3>
              <ul>
                {track.whoFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Choose another path if</h3>
              <ul>
                {track.notFor.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="learn-concept" aria-labelledby="concept-title">
          <span>Working concept</span>
          <div>
            <h2 id="concept-title">{track.concept.title}</h2>
            <p>{track.concept.description}</p>
          </div>
        </section>

        <section className="learn-level-section" aria-labelledby="levels-title">
          <header>
            <span>Path / 00–04</span>
            <h2 id="levels-title">Five stages to the artifact</h2>
            <p>
              Each stage has a practical stopping condition. Move on when the
              checkpoint is true, not when the time estimate expires.
            </p>
          </header>
          <ol className="learn-levels">
            {track.levels.map((level, levelIndex) => (
              <li id={`level-${levelIndex}`} key={level.title}>
                <span className="learn-level-number">
                  {String(levelIndex).padStart(2, "0")}
                </span>
                <div className="learn-level-title">
                  <h3>{level.title}</h3>
                  <span>{level.duration}</span>
                </div>
                <div>
                  <small>Goal</small>
                  <p>{level.goal}</p>
                </div>
                <div>
                  <small>Done when</small>
                  <p>{level.checkpoint}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="learn-next-move">
          <span>Start here / stage 00</span>
          <div>
            <h2>{track.levels[0].title}</h2>
            <p>{track.levels[0].goal}</p>
          </div>
          <a href="#level-0">Go to the first stage ↓</a>
        </aside>

        <nav className="sequence-navigation" aria-label="Learning paths">
          {previous ? (
            <Link href={`/learn/${previous.slug}`}>
              <span>Previous path</span>
              <strong>← {previous.title}</strong>
            </Link>
          ) : (
            <Link href="/learn">
              <span>Path index</span>
              <strong>← Compare all seven</strong>
            </Link>
          )}
          {next ? (
            <Link href={`/learn/${next.slug}`}>
              <span>Next path</span>
              <strong>{next.title} →</strong>
            </Link>
          ) : (
            <Link href="/learn">
              <span>Path index</span>
              <strong>Compare all seven →</strong>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
