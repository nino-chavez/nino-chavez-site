import type { Metadata } from "next";
import Link from "next/link";
import {
  careerStartYear,
  education,
  identity,
  positions,
  practice,
  skills,
  yearsOfPractice,
  type Bullet,
  type Position,
} from "../career";
import {
  workHref,
  workItems,
  workStateLabels,
  workStateText,
  type WorkItem,
  type WorkState,
} from "../data";
import { writingSnapshot } from "../writing";
import "./cv.css";

export const metadata: Metadata = {
  title: "CV",
  description: `The career record of Nino Chavez, a product architect in ${identity.location}: positions since ${careerStartYear}, public work, education, and skills.`,
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// career.ts dates are "YYYY-MM". Parsing them with the Date constructor reads
// UTC midnight and then formats in local time, which renders a January start as
// the previous December. Split the string instead.
function formatMonth(value: string) {
  const [year, month] = value.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

function formatSpan(position: Position) {
  return position.end
    ? `${formatMonth(position.start)} – ${formatMonth(position.end)}`
    : `${formatMonth(position.start)} – Present`;
}

function formatYearSpan(position: Position) {
  const startYear = position.start.slice(0, 4);
  if (!position.end) {
    return `${startYear} – Present`;
  }
  const endYear = position.end.slice(0, 4);
  return startYear === endYear ? startYear : `${startYear} – ${endYear}`;
}

// A bullet whose prose already carries its figures does not repeat them in a
// stat row underneath — that restates the sentence in a bigger font. The test
// runs per group because the prose spells one figure differently ("18-month"
// against a stored "18 months"), so a per-metric test would split one group
// into a rendered half and a suppressed half.
function metricsAddSomething(bullet: Bullet) {
  if (!bullet.metrics?.length) {
    return false;
  }
  return !bullet.metrics.some((metric) => bullet.text.includes(metric.value));
}

const kindLabels: Record<Position["kind"], string> = {
  employment: "Employment",
  contract: "Contract",
  volunteer: "Volunteer",
};

const workBySlug = new Map(workItems.map((item) => [item.slug, item]));

const employment = positions.filter(
  (position) =>
    position.kind === "employment" &&
    !position.tags?.includes("rollup-eligible"),
);
const earlierRoles = positions.filter((position) =>
  position.tags?.includes("rollup-eligible"),
);
const otherEngagements = positions.filter(
  (position) => position.kind !== "employment",
);

const currentEmployment = positions.find(
  (position) => position.kind === "employment" && position.end === null,
);

const skillGroups = [
  { label: "AI and agents", items: skills.aiAgentic },
  { label: "Engineering", items: skills.engineering },
  { label: "Commerce", items: skills.commerce },
];

const profiles = [
  { label: "LinkedIn", href: identity.linkedin },
  { label: "GitHub", href: identity.github },
  { label: "Email", href: `mailto:${identity.email}` },
];

const continuations = [
  {
    name: "Work",
    description: "Products, tools, methods, operations, and collections.",
    href: "/work",
  },
  {
    name: "About",
    description: "The longer version of what connects the work.",
    href: "/about",
  },
  {
    name: "Now",
    description: "A dated view of active work and current attention.",
    href: "/now",
  },
];

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  alternateName: identity.alternateName,
  url: `${identity.site}/cv`,
  email: identity.email,
  jobTitle: currentEmployment?.title,
  worksFor: currentEmployment
    ? {
        "@type": "Organization",
        name: currentEmployment.org,
        url: "https://commerce.com",
      }
    : undefined,
  homeLocation: {
    "@type": "City",
    name: identity.location.split(",")[0],
  },
  description: identity.headlines.site,
  alumniOf: education.map((entry) => ({
    "@type": "EducationalOrganization",
    name: entry.school,
  })),
  knowsAbout: [...skills.aiAgentic, ...skills.engineering, ...skills.commerce],
  // Derived from the rendered list, not hand-written, so the structured data
  // cannot claim a profile the page does not show.
  sameAs: profiles
    .filter((profile) => profile.href.startsWith("https://"))
    .map((profile) => profile.href),
};

function PositionEntry({ position }: { position: Position }) {
  return (
    <li className="cv-position">
      <div className="cv-position__when">
        <span>{formatSpan(position)}</span>
        {position.kind === "employment" ? null : (
          <span>{kindLabels[position.kind]}</span>
        )}
      </div>

      <div>
        <h3>{position.title}</h3>
        <p className="cv-position__org">
          {position.org}
          {position.location ? ` · ${position.location}` : ""}
        </p>
        {position.officialTitle ? (
          <p className="cv-position__official">
            Official title: {position.officialTitle}
          </p>
        ) : null}
        {position.summary ? (
          <p className="cv-position__summary">{position.summary}</p>
        ) : null}

        {position.bullets.length ? (
          <ul>
            {position.bullets.map((bullet) => (
              <li key={bullet.text}>
                {bullet.text}
                {metricsAddSomething(bullet) ? (
                  <dl className="cv-metrics">
                    {bullet.metrics?.map((metric) => (
                      <div key={metric.label}>
                        <dt>{metric.label}</dt>
                        <dd>{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}

function PracticeAction({ item }: { item: WorkItem }) {
  const opensInNewTab = workHref(item).startsWith("http");
  return (
    <>
      {item.detailPage === false ? "Browse" : "Open"}{" "}
      <b aria-hidden="true">{opensInNewTab ? "↗" : "→"}</b>
      {opensInNewTab ? (
        <span className="assistive-text"> (opens in a new tab)</span>
      ) : null}
    </>
  );
}

export default function CvPage() {
  const years = yearsOfPractice();

  // §Copy and naming: a coined term carries its gloss at first use. Work state
  // values are glossed the first time each one appears in reading order, then
  // carry the label alone — twenty-three repetitions of the same sentence would
  // bury the states that only appear once.
  const glossedStates = new Set<WorkState>();
  const resolvePracticeEntry = (entry: { slug: string; lead?: boolean }) => {
    const item = workBySlug.get(entry.slug);
    if (!item) {
      return null;
    }
    const stateText = glossedStates.has(item.state)
      ? workStateLabels[item.state]
      : workStateText(item.state);
    glossedStates.add(item.state);
    return { item, stateText };
  };

  const leadPractice = practice
    .filter((entry) => entry.lead)
    .map(resolvePracticeEntry)
    .filter((entry) => entry !== null);
  const remainingPractice = practice
    .filter((entry) => !entry.lead)
    .map(resolvePracticeEntry)
    .filter((entry) => entry !== null);

  const earliestRollupYear = earlierRoles
    .map((position) => position.start.slice(0, 4))
    .sort()[0];
  const latestRollupYear = earlierRoles
    .map((position) => (position.end ?? "").slice(0, 4))
    .sort()
    .at(-1);

  return (
    <div className="cv-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <header className="cv-opening">
        <div className="cv-opening__register page-shell">
          <span>CV</span>
          <span>{identity.location}</span>
          <span>Since {careerStartYear}</span>
        </div>

        <div className="cv-opening__stage page-shell">
          <div>
            <h1 aria-label={identity.name}>
              {identity.name.split(" ").map((part) => (
                <span aria-hidden="true" key={part}>
                  {part}
                </span>
              ))}
            </h1>
            <p className="cv-opening__lede">
              I’ve spent {years} years turning complicated decisions into
              working software.
            </p>
            <p className="cv-opening__support">
              This page is the record behind that sentence: where I’ve worked,
              what I built there, and the work you can open and judge for
              yourself.
            </p>
          </div>

          <dl className="cv-coordinates">
            {currentEmployment ? (
              <>
                <div>
                  <dt>Current role</dt>
                  <dd>{currentEmployment.title}</dd>
                </div>
                <div>
                  <dt>Organization</dt>
                  <dd>{currentEmployment.org}</dd>
                </div>
              </>
            ) : null}
            <div>
              <dt>Home</dt>
              <dd>{identity.location}</dd>
            </div>
            <div>
              <dt>Software practice</dt>
              <dd>Since {careerStartYear}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="cv-body page-shell">
        <section className="cv-section" aria-labelledby="cv-positions">
          <header>
            <span>01 / Positions</span>
            <h2 id="cv-positions">Where I’ve worked</h2>
            <p>
              Titles as I use them. Where an employer’s own title differs, both
              are listed.
            </p>
          </header>

          <div>
            <ol className="cv-positions">
              {employment.map((position) => (
                <PositionEntry
                  key={`${position.org}-${position.start}`}
                  position={position}
                />
              ))}
            </ol>

            {earlierRoles.length ? (
              <div className="cv-rollup">
                <h3>Earlier roles</h3>
                <p>
                  {earlierRoles.length} engineering and delivery roles between{" "}
                  {earliestRollupYear} and {latestRollupYear}, listed without
                  detail.
                </p>
                <ol>
                  {earlierRoles.map((position) => (
                    <li key={`${position.org}-${position.start}`}>
                      <span>{formatYearSpan(position)}</span>
                      <span>
                        <b>{position.title}</b>
                        <small>
                          {position.org}
                          {position.location ? ` · ${position.location}` : ""}
                        </small>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </section>

        <section className="cv-section" aria-labelledby="cv-practice">
          <header>
            <span>02 / Practice</span>
            <h2 id="cv-practice">Work you can open</h2>
            <p>
              Every entry leads to the thing itself or to its page here. Signal
              Dispatch alone carries {writingSnapshot.publicPieceCount}{" "}
              published pieces.
            </p>
          </header>

          <div>
            <div className="cv-leads">
              {leadPractice.map(({ item, stateText }) => {
                const href = workHref(item);
                const opensInNewTab = href.startsWith("http");
                return (
                  <a
                    className="cv-lead"
                    href={href}
                    key={item.slug}
                    target={opensInNewTab ? "_blank" : undefined}
                    rel={opensInNewTab ? "noopener noreferrer" : undefined}
                  >
                    <span className="cv-lead__state">{stateText}</span>
                    <h3>{item.name}</h3>
                    <p>{item.claim}</p>
                    <span className="cv-lead__open">
                      <PracticeAction item={item} />
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="cv-records">
              {remainingPractice.map(({ item, stateText }) => {
                const href = workHref(item);
                const opensInNewTab = href.startsWith("http");
                return (
                  <a
                    className="cv-record"
                    href={href}
                    key={item.slug}
                    target={opensInNewTab ? "_blank" : undefined}
                    rel={opensInNewTab ? "noopener noreferrer" : undefined}
                  >
                    <span className="cv-record__state">{stateText}</span>
                    <span>
                      <strong>{item.name}</strong>
                      <small>{item.claim}</small>
                    </span>
                    <span className="cv-record__open">
                      <PracticeAction item={item} />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {otherEngagements.length ? (
          <section className="cv-section" aria-labelledby="cv-other-work">
            <header>
              <span>03 / Other work</span>
              <h2 id="cv-other-work">Contract and volunteer work</h2>
              <p>
                Ongoing commitments outside a job. Each entry says which it is.
              </p>
            </header>

            <ol className="cv-positions">
              {otherEngagements.map((position) => (
                <PositionEntry
                  key={`${position.org}-${position.start}`}
                  position={position}
                />
              ))}
            </ol>
          </section>
        ) : null}

        <section className="cv-section" aria-labelledby="cv-education">
          <header>
            <span>04 / Education</span>
            <h2 id="cv-education">Where I studied</h2>
          </header>

          <ol className="cv-education">
            {education.map((entry) => (
              <li key={entry.school}>
                <span>
                  {entry.start} – {entry.end}
                </span>
                <span>
                  <b>{entry.school}</b>
                  <small>{entry.program}</small>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="cv-section" aria-labelledby="cv-skills">
          <header>
            <span>05 / Skills</span>
            <h2 id="cv-skills">What I work with</h2>
          </header>

          <dl className="cv-skills">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <dt>{group.label}</dt>
                <dd>{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="cv-section" aria-labelledby="cv-continue">
          <header>
            <span>Where to go next</span>
            <h2 id="cv-continue">Check any of it</h2>
          </header>

          <div>
            <ol className="cv-continuations">
              {continuations.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <strong>{item.name}</strong>
                    <small>{item.description}</small>
                    <b aria-hidden="true">→</b>
                  </Link>
                </li>
              ))}
            </ol>

            <nav className="cv-profiles" aria-label="External profiles">
              <span>Elsewhere</span>
              {profiles.map((profile) => {
                const opensInNewTab = profile.href.startsWith("http");
                return (
                  <a
                    key={profile.href}
                    href={profile.href}
                    target={opensInNewTab ? "_blank" : undefined}
                    rel={opensInNewTab ? "noopener noreferrer" : undefined}
                  >
                    {profile.label} <span aria-hidden="true">↗</span>
                    {opensInNewTab ? (
                      <span className="assistive-text">
                        {" "}
                        (opens in a new tab)
                      </span>
                    ) : null}
                  </a>
                );
              })}
            </nav>
          </div>
        </section>
      </div>
    </div>
  );
}
