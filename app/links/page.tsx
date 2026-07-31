import Link from "next/link";

export const metadata = {
  title: "Links",
  description:
    "Maintained destinations for Nino Chavez’s products, publishing, photography, music, profiles, and contact.",
};

const SOURCE_PATTERN = /^[a-z0-9_-]{1,32}$/;

const destinationGroups = [
  {
    code: "D01",
    title: "Products and ventures",
    description: "Live places where the work can be used or followed.",
    destinations: [
      {
        code: "L01",
        name: "Rally HQ",
        description:
          "Run or follow a tournament with registration, schedules, brackets, and live scoring.",
        href: "https://rallyhq.app",
        action: "Open product",
        external: true,
      },
      {
        code: "L02",
        name: "Let’s Pepper",
        description:
          "A community-powered grass volleyball tournament series in Chicagoland.",
        href: "https://letspepper.com",
        action: "Visit series",
        external: true,
      },
      {
        code: "L03",
        name: "Flickday Media",
        description:
          "Player-first tournament photography and grassroots sports media.",
        href: "https://flickdaymedia.com",
        action: "Open studio",
        external: true,
      },
      {
        code: "L04",
        name: "Signal X Studio",
        description:
          "The company behind the sports, media, and software ventures.",
        href: "https://signalx.studio",
        action: "Visit company",
        external: true,
      },
    ],
  },
  {
    code: "D02",
    title: "Source and publishing",
    description: "The public code, ideas, and professional record.",
    destinations: [
      {
        code: "L05",
        name: "GitHub",
        description:
          "Public source, installable tools, and active repositories.",
        href: "https://github.com/nino-chavez",
        action: "Browse source",
        external: true,
      },
      {
        code: "L06",
        name: "Signal Dispatch",
        description:
          "Essays, whitepapers, presentations, tutorials, counterpoints, and fiction.",
        href: "/blog",
        action: "Read publication",
        external: false,
      },
      {
        code: "L07",
        name: "LinkedIn",
        description: "Professional history and current role context.",
        href: "https://www.linkedin.com/in/nino-chavez/",
        action: "View profile",
        external: true,
      },
    ],
  },
  {
    code: "D03",
    title: "Images and sound",
    description: "The photography and music practices in their native places.",
    destinations: [
      {
        code: "L08",
        name: "Photography",
        description:
          "Volleyball, action-sports, and event galleries on this site.",
        href: "/photography",
        action: "View galleries",
        external: false,
        tracksSource: true,
      },
      {
        code: "L09",
        name: "Instagram",
        description: "Current photography and event images.",
        href: "https://www.instagram.com/nino.chavez.photo/",
        action: "Open Instagram",
        external: true,
      },
      {
        code: "L10",
        name: "SoundCloud",
        description: "DJ sets and mixes.",
        href: "https://soundcloud.com/ni-no-cha-vez",
        action: "Listen to sets",
        external: true,
      },
    ],
  },
  {
    code: "D04",
    title: "Direct",
    description: "The shortest route to a conversation.",
    destinations: [
      {
        code: "L11",
        name: "Email",
        description: "Contact me directly at nino@ninochavez.co.",
        href: "mailto:nino@ninochavez.co",
        action: "Send email",
        external: true,
      },
    ],
  },
] as const;

export default async function LinksPage({
  searchParams,
}: {
  searchParams: Promise<{ src?: string }>;
}) {
  const { src } = await searchParams;
  const gallerySource =
    typeof src === "string" && SOURCE_PATTERN.test(src) ? src : "links";

  return (
    <div className="links-page">
      <div className="about-context-surface">
        <nav
          className="about-context-navigation page-shell"
          aria-label="Personal pages"
        >
          <Link href="/about">About</Link>
          <Link href="/now">Now</Link>
          <Link href="/links" aria-current="page">
            Links
          </Link>
        </nav>
      </div>

      <header className="links-opening">
        <div className="links-opening__register page-shell">
          <span>Links / maintained directory</span>
          <span>11 destinations</span>
          <time dateTime="2026-07-30">Checked 30 July 2026</time>
        </div>

        <div className="links-opening__stage page-shell">
          <div className="links-opening__lockup">
            <p className="eyebrow">Find it directly</p>
            <h1>Links</h1>
          </div>

          <div className="links-opening__statement">
            <p className="links-opening__lede">Go to the thing itself.</p>
            <p>
              The <Link href="/work">Work library</Link> holds the complete
              record, including private and paused work. This page keeps the
              destinations that are useful now.
            </p>
          </div>
        </div>
      </header>

      <div className="links-body page-shell">
        {destinationGroups.map((group) => (
          <section
            key={group.code}
            className="links-group"
            aria-labelledby={`links-${group.code.toLowerCase()}`}
          >
            <header>
              <span>{group.code}</span>
              <h2 id={`links-${group.code.toLowerCase()}`}>{group.title}</h2>
              <p>{group.description}</p>
            </header>

            <ol>
              {group.destinations.map((destination) => {
                const href =
                  "tracksSource" in destination && destination.tracksSource
                    ? `${destination.href}?src=${gallerySource}`
                    : destination.href;
                const opensInNewTab =
                  destination.external && href.startsWith("http");
                const contents = (
                  <>
                    <span>{destination.code}</span>
                    <strong>{destination.name}</strong>
                    <small>{destination.description}</small>
                    <b>
                      {destination.action}
                      {opensInNewTab ? (
                        <span className="assistive-text">
                          {" "}(opens in a new tab)
                        </span>
                      ) : null}{" "}
                      <span aria-hidden="true">
                        {destination.external ? "↗" : "→"}
                      </span>
                    </b>
                  </>
                );

                return (
                  <li key={destination.code}>
                    {destination.external ? (
                      <a
                        href={href}
                        target={opensInNewTab ? "_blank" : undefined}
                        rel={
                          opensInNewTab ? "noopener noreferrer" : undefined
                        }
                      >
                        {contents}
                      </a>
                    ) : (
                      <Link href={href}>{contents}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        <aside className="links-maintenance-note">
          <span>Directory note</span>
          <p>
            Destinations are checked when this page changes. External websites
            open in a new tab; pages on this site stay in this tab.
          </p>
        </aside>
      </div>
    </div>
  );
}
