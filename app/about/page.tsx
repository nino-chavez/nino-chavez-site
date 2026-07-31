import Link from "next/link";

export const metadata = {
  title: "About Nino Chavez",
  description:
    "Nino Chavez is a product architect, builder, tournament operator, photographer, writer, and DJ in Chicago.",
};

const practices = [
  {
    name: "Architecture",
    description:
      "Hold the shape of a system while decisions become working software.",
    href: "/work",
    action: "Open the work",
    external: false,
  },
  {
    name: "Live operations",
    description:
      "Run registration, schedules, brackets, scoring, and the event around them.",
    href: "/work?domain=Volleyball",
    action: "See volleyball work",
    external: false,
  },
  {
    name: "Photography",
    description:
      "Anticipate the point before it happens, then make the result easy to find and keep.",
    href: "/photography",
    action: "Open photography",
    external: false,
  },
  {
    name: "Writing",
    description:
      "Turn working evidence and unfinished thinking into a public record.",
    href: "/blog",
    action: "Read Signal Dispatch",
    external: false,
  },
  {
    name: "Music",
    description: "Select and sequence records for the room.",
    href: "https://soundcloud.com/ni-no-cha-vez",
    action: "Listen on SoundCloud",
    external: true,
  },
] as const;

const continuations = [
  {
    name: "Now",
    description: "A dated view of active work and current attention.",
    href: "/now",
  },
  {
    name: "Links",
    description: "Maintained destinations across the rest of the practice.",
    href: "/links",
  },
  {
    name: "Work",
    description: "The complete public record of projects, systems, and practices.",
    href: "/work",
  },
] as const;

const profiles = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nino-chavez/",
  },
  {
    label: "GitHub",
    href: "https://github.com/nino-chavez",
  },
  {
    label: "SoundCloud",
    href: "https://soundcloud.com/ni-no-cha-vez",
  },
  {
    label: "Email",
    href: "mailto:nino@ninochavez.co",
  },
] as const;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nino Chavez",
  url: "https://ninochavez.co/about",
  image: "https://ninochavez.co/work/nino-illustrated-v1.webp",
  jobTitle: "Product Architect",
  worksFor: {
    "@type": "Organization",
    name: "commerce.com",
    url: "https://www.commerce.com",
  },
  homeLocation: {
    "@type": "City",
    name: "Chicago",
  },
  description:
    "Product architect, builder, tournament operator, photographer, writer, and DJ in Chicago.",
  knowsAbout: [
    "Product architecture",
    "Commerce platforms",
    "Agent-assisted software development",
    "Volleyball event operations",
    "Sports photography",
    "Writing",
    "DJing",
  ],
  sameAs: profiles
    .filter((profile) => profile.href.startsWith("https://"))
    .map((profile) => profile.href),
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="about-context-surface">
        <nav
          className="about-context-navigation page-shell"
          aria-label="Personal pages"
        >
          <Link href="/about" aria-current="page">
            About
          </Link>
          <Link href="/now">Now</Link>
          <Link href="/links">Links</Link>
        </nav>
      </div>

      <header className="about-opening">
        <div className="about-opening__register page-shell">
          <span>About / durable profile</span>
          <span>Chicago</span>
          <span>Building since 1999</span>
        </div>

        <div className="about-opening__stage page-shell">
          <div className="about-opening__copy">
            <p className="eyebrow">Nino Chavez</p>
            <h1 aria-label="Nino Chavez">
              <span aria-hidden="true">Nino</span>
              <span aria-hidden="true">Chavez</span>
            </h1>
            <p className="about-opening__lede">
              Product architect by trade. I also build software, run volleyball
              tournaments, photograph them, write, and DJ.
            </p>
            <p>
              I live in Chicago. I’ve been writing code since 1999. The work
              shows how I think; this page supplies the background.
            </p>
          </div>
        </div>

        <figure className="about-opening__portrait">
          <img
            src="/work/nino-illustrated-v1.webp"
            alt="Illustrated portrait of Nino Chavez"
            width={1254}
            height={1254}
            fetchPriority="high"
          />
        </figure>
      </header>

      <div className="about-body page-shell">
        <section className="about-section" aria-labelledby="about-biography">
          <header>
            <span>01 / Biography</span>
            <h2 id="about-biography">The short version</h2>
          </header>

          <div className="about-biography">
            <div className="about-prose">
              <p className="about-lead">
                I started in software engineering, moved through architecture
                and consulting, and now work as a Product Architect at
                commerce.com. I still prefer the part where a decision becomes
                a working system.
              </p>
              <p>
                Outside the day job, I run Let’s Pepper, build and operate Rally
                HQ, shoot volleyball through Flickday Media, publish Signal
                Dispatch, and keep a music practice on SoundCloud. The mediums
                are different. None is decorative. Each has to work for the
                people in front of it.
              </p>
            </div>

            <dl className="about-coordinates">
              <div>
                <dt>Current role</dt>
                <dd>Product Architect</dd>
              </div>
              <div>
                <dt>Organization</dt>
                <dd>commerce.com</dd>
              </div>
              <div>
                <dt>Home</dt>
                <dd>Chicago</dd>
              </div>
              <div>
                <dt>Software practice</dt>
                <dd>Since 1999</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="about-section" aria-labelledby="about-throughline">
          <header>
            <span>02 / Throughline</span>
            <h2 id="about-throughline">What connects the work</h2>
            <p>
              The format changes. The work keeps asking for attention,
              structure, selection, and responsibility for the result.
            </p>
          </header>

          <dl className="about-practice-register">
            {practices.map((practice, index) => (
              <div key={practice.name}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <dt>{practice.name}</dt>
                <dd>{practice.description}</dd>
                {practice.external ? (
                  <a
                    href={practice.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {practice.action} <span aria-hidden="true">↗</span>
                    <span className="assistive-text">
                      {" "}(opens in a new tab)
                    </span>
                  </a>
                ) : (
                  <Link href={practice.href}>{practice.action} →</Link>
                )}
              </div>
            ))}
          </dl>
        </section>

        <section
          className="about-section about-operating-model"
          aria-labelledby="about-agents"
        >
          <header>
            <span>03 / Working model</span>
            <h2 id="about-agents">How I work with agents</h2>
          </header>

          <div className="about-prose">
            <p className="about-lead">
              Agents expand the execution I can carry. They research, draft,
              code, test, review, and package work across the practice.
            </p>
            <p>
              They do not decide what the work is for, what may be published,
              or whether a judgment is honest. I keep those decisions. The
              result still has to survive a user, an event, a repository, or a
              reader.
            </p>
            <div className="about-inline-actions">
              <Link href="/work/blueprint">See the method in Blueprint →</Link>
              <Link href="/demos">Open the operating sessions →</Link>
            </div>
          </div>
        </section>

        <section className="about-section" aria-labelledby="about-continue">
          <header>
            <span>Where to go next</span>
            <h2 id="about-continue">Choose the context you need</h2>
          </header>

          <div>
            <ol className="about-continuations">
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

            <nav className="about-profiles" aria-label="External profiles">
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
                        {" "}(opens in a new tab)
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
