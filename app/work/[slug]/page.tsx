import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { workItems } from "../../data";

const recordVisuals: Partial<
  Record<
    string,
    { src: string; alt: string; label: string; className?: string }
  >
> = {
  blueprint: {
    src: "/work/blueprint.png",
    alt: "Blueprint project mark",
    label: "Project mark",
    className: "record-artifact--mark",
  },
  "rally-hq": {
    src: "/work/rally-hq.webp",
    alt: "Rally HQ tournament interface",
    label: "Live product surface",
  },
  "lets-pepper": {
    src: "/work/lets-pepper.jpg",
    alt: "Let’s Pepper tournament gallery",
    label: "Live event surface",
  },
  "nino-chavez-photography": {
    src: "/work/photography.webp",
    alt: "Volleyball player holding a ball before play",
    label: "Collection artifact",
    className: "record-artifact--portrait",
  },
  "signal-dispatch": {
    src: "/work/signal-dispatch.webp?v=372a9501",
    alt: "Current Signal Dispatch social share card",
    label: "Current social share card",
  },
  "ways-of-working": {
    src: "/work/demo-gates.jpg",
    alt: "Source frame from Gates Between Agentic Stages",
    label: "Source demo frame",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = workItems.find((entry) => entry.slug === slug);

  return item
    ? {
        title: item.name,
        description: item.claim,
        alternates: { canonical: `/work/${item.slug}` },
      }
    : {};
}

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = workItems.find((entry) => entry.slug === slug);

  if (!item) {
    notFound();
  }

  const visual = recordVisuals[item.slug];
  const destinationIsExternal = item.destination?.href.startsWith("http");
  const related = (item.related ?? [])
    .map((relatedSlug) =>
      workItems.find((entry) => entry.slug === relatedSlug),
    )
    .filter((entry) => entry !== undefined);

  return (
    <div className="page-shell detail-page work-detail-page">
      <Breadcrumbs
        items={[{ label: "Work", href: "/work" }, { label: item.name }]}
      />

      <header className="detail-header">
        <div>
          <p className="eyebrow">{item.domain}</p>
          <h1>{item.name}</h1>
          <p className="lede">{item.claim}</p>
          {item.destination ? (
            <div className="inline-actions">
              <a
                className="primary-action"
                href={item.destination.href}
                target={destinationIsExternal ? "_blank" : undefined}
                rel={destinationIsExternal ? "noopener noreferrer" : undefined}
              >
                {item.destination.label}
                <span aria-hidden="true">
                  {destinationIsExternal ? " ↗" : " →"}
                </span>
                {destinationIsExternal ? (
                  <span className="assistive-text"> (opens in a new tab)</span>
                ) : null}
              </a>
            </div>
          ) : null}
        </div>
        <dl className="fact-list">
          <div>
            <dt>State</dt>
            <dd>{item.state}</dd>
          </div>
          <div>
            <dt>Form</dt>
            <dd>{item.form}</dd>
          </div>
          <div>
            <dt>Record updated</dt>
            <dd>{item.updatedAt}</dd>
          </div>
        </dl>
      </header>

      {visual ? (
        <figure
          className={`record-artifact ${visual.className ?? ""}`.trim()}
        >
          <div>
            <img src={visual.src} alt={visual.alt} />
          </div>
          <figcaption>
            <span>{visual.label}</span>
            <strong>{item.name}</strong>
          </figcaption>
        </figure>
      ) : null}

      {related.length ? (
        <section className="detail-section" aria-labelledby="related-work">
          <div>
            <p className="eyebrow">Explicit relationships</p>
            <h2 id="related-work">Related work</h2>
          </div>
          <div className="related-list">
            {related.map((entry) => (
              <Link key={entry.slug} href={`/work/${entry.slug}`}>
                <span>{entry.domain}</span>
                <strong>{entry.name}</strong>
                <small>{entry.claim}</small>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <p className="back-link">
        <Link href="/work">← Return to the complete library</Link>
      </p>
    </div>
  );
}
