import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { DemoStory } from "../../../components/DemoStory";
import { getDemoStory } from "../../../demo-stories";
import {
  appliedTechniques as fallbackAppliedTechniques,
  getDemoSnapshot,
} from "../../../demos";

export function generateStaticParams() {
  return fallbackAppliedTechniques.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { techniques } = await getDemoSnapshot();
  const entry = techniques.find((technique) => technique.slug === slug);

  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.description,
    alternates: { canonical: `/demos/applied/${entry.slug}` },
  };
}

export default async function AppliedTechniquePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { sessions: demoSessions, techniques: appliedTechniques } =
    await getDemoSnapshot();
  const index = appliedTechniques.findIndex((item) => item.slug === slug);

  if (index < 0) {
    notFound();
  }

  const entry = appliedTechniques[index];
  const story = await getDemoStory("technique", entry.slug, entry.storyHref);
  if (!story) {
    notFound();
  }
  const previous = appliedTechniques[index - 1];
  const next = appliedTechniques[index + 1];
  const recordId = `A${String(index + 1).padStart(2, "0")}`;
  const related = entry.relatedSessionSlugs
    .map((sessionSlug) =>
      demoSessions.find((session) => session.slug === sessionSlug),
    )
    .filter((session) => session !== undefined);

  return (
    <div className="detail-page technique-detail-page">
      <div className="page-shell demo-story-breadcrumbs">
        <Breadcrumbs
          items={[
            { label: "How I work", href: "/demos" },
            { label: "Techniques", href: "/demos#applied" },
            { label: entry.title },
          ]}
        />
        <p className="record-maker">Created and documented by Nino Chavez.</p>
      </div>

      <DemoStory story={story} recordLabel={`Applied ${recordId}`} />

      <div className="page-shell demo-record-context">
        <header className="demo-record-context__header">
          <div>
            <p className="eyebrow">The reusable technique</p>
            <h2>{entry.title}</h2>
            <p>{entry.description}</p>
          </div>
          <dl className="fact-list">
            <div>
              <dt>Collection</dt>
              <dd>Applied</dd>
            </div>
            <div>
              <dt>Record</dt>
              <dd>{recordId}</dd>
            </div>
            <div>
              <dt>Related sessions</dt>
              <dd>{related.length}</dd>
            </div>
          </dl>
        </header>

        <section className="detail-section" aria-labelledby="technique-content">
          <div>
            <p className="eyebrow">Working principles</p>
            <h2 id="technique-content">What to carry forward</h2>
          </div>
          <div>
            <ol className="procedure-list">
              {entry.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="detail-section" aria-labelledby="related-sessions">
          <div>
            <p className="eyebrow">Explicit relationships</p>
            <h2 id="related-sessions">Related sessions</h2>
          </div>
          <div className="related-list">
            {related.length ? (
              related.map((session) => (
                <Link key={session.slug} href={`/demos/${session.slug}`}>
                  <span>Session</span>
                  <strong>{session.title}</strong>
                  <small>{session.summary}</small>
                </Link>
              ))
            ) : (
              <p>
                No explicit session relationship is recorded. This technique
                remains available on its own terms.
              </p>
            )}
          </div>
        </section>

        <nav className="sequence-navigation" aria-label="Applied techniques">
          {previous ? (
            <Link href={`/demos/applied/${previous.slug}`}>
              <span>← Previous technique</span>
              <strong>{previous.title}</strong>
            </Link>
          ) : (
            <Link href="/demos#applied">
              <span>Collection start</span>
              <strong>Return to all techniques</strong>
            </Link>
          )}
          {next ? (
            <Link href={`/demos/applied/${next.slug}`}>
              <span>Next technique →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <Link href="/demos">
              <span>Collection complete</span>
              <strong>Return to How I work</strong>
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
