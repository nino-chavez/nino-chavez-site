import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { DemoStory } from "../../components/DemoStory";
import { getDemoStory } from "../../demo-stories";
import {
  demoSessions as fallbackDemoSessions,
  getDemoSnapshot,
} from "../../demos";

export function generateStaticParams() {
  return fallbackDemoSessions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { sessions } = await getDemoSnapshot();
  const entry = sessions.find((session) => session.slug === slug);

  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.summary,
    alternates: { canonical: `/demos/${entry.slug}` },
  };
}

export default async function DemoSessionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { sessions: demoSessions, techniques: appliedTechniques } =
    await getDemoSnapshot();
  const index = demoSessions.findIndex((entry) => entry.slug === slug);

  if (index < 0) {
    notFound();
  }

  const entry = demoSessions[index];
  const story = await getDemoStory("session", entry.slug, entry.storyHref);
  if (!story) {
    notFound();
  }
  const previous = demoSessions[index - 1];
  const next = demoSessions[index + 1];
  const recordId = `S${String(index + 1).padStart(2, "0")}`;
  const relatedTechnique = entry.relatedTechniqueSlug
    ? appliedTechniques.find(
        (technique) => technique.slug === entry.relatedTechniqueSlug,
      )
    : undefined;

  return (
    <div className="detail-page demo-detail-page">
      <div className="page-shell demo-story-breadcrumbs">
        <Breadcrumbs
          items={[
            { label: "Sessions", href: "/demos" },
            { label: entry.title },
          ]}
        />
        <p className="record-maker">Created and presented by Nino Chavez.</p>
      </div>

      <DemoStory story={story} recordLabel={`Session ${recordId}`} />

      <div className="page-shell demo-record-context">
        <header className="demo-record-context__header">
          <div>
            <p className="eyebrow">What happened</p>
            <h2>{entry.title}</h2>
            <p>{entry.summary}</p>
          </div>
          <dl className="fact-list">
            <div>
              <dt>Collection</dt>
              <dd>Ways of Working</dd>
            </div>
            <div>
              <dt>Record</dt>
              <dd>{recordId}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>Session</dd>
            </div>
          </dl>
        </header>

        <section className="session-reading" aria-labelledby="session-audience">
          <div>
            <span>01 / Reader</span>
            <h2 id="session-audience">Who this is for</h2>
            <p>{entry.audience}</p>
          </div>
          <div>
            <span>02 / Evidence</span>
            <h2>What the session shows</h2>
            <p>{entry.evidence}</p>
          </div>
          <div>
            <span>03 / Practice</span>
            <h2>What to reuse</h2>
            <p>{entry.practice}</p>
            {relatedTechnique ? (
              <Link
                className="related-callout"
                href={`/demos/applied/${relatedTechnique.slug}`}
              >
                <span>Applied technique</span>
                <strong>{relatedTechnique.title}</strong>
                <small>{relatedTechnique.summary}</small>
              </Link>
            ) : null}
          </div>
        </section>

        <nav className="sequence-navigation" aria-label="Demo sequence">
          {previous ? (
            <Link href={`/demos/${previous.slug}`}>
              <span>← Previous session</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <Link href="/demos#sessions">
              <span>Sequence start</span>
              <strong>Return to all sessions</strong>
            </Link>
          )}
          {next ? (
            <Link href={`/demos/${next.slug}`}>
              <span>Next session →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <Link href="/demos">
              <span>Sequence complete</span>
              <strong>Return to Sessions</strong>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
