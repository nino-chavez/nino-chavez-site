import "../by-nino-library.css";
import { isIndependentSiteHref } from "../link-destinations";

export const metadata = {
  alternates: { canonical: "/links" },
  title: "Links",
  description:
    "Maintained destinations for Nino Chavez’s products, publishing, photography, music, profiles, and contact.",
};

const SOURCE_PATTERN = /^[a-z0-9_-]{1,32}$/;

const destinationGroups = [
  {
    title: "Contact",
    destinations: [
      {
        name: "LinkedIn",
        description: "My professional history and current role.",
        href: "https://www.linkedin.com/in/nino-chavez/",
      },
      {
        name: "Email",
        description: "nino@ninochavez.co",
        href: "mailto:nino@ninochavez.co",
      },
    ],
  },
  {
    title: "Writing and code",
    destinations: [
      {
        name: "GitHub",
        description: "Public code, tools, and repositories.",
        href: "https://github.com/nino-chavez",
      },
      {
        name: "Signal Dispatch",
        description: "My writing: essays, guides, presentations, and fiction.",
        href: "https://ninochavez.co/blog",
      },
    ],
  },
  {
    title: "Photography and music",
    destinations: [
      {
        name: "Photography",
        description: "Volleyball, action-sports, and event galleries.",
        href: "/photography",
        tracksSource: true,
      },
      {
        name: "Instagram",
        description: "Current photography and event images.",
        href: "https://www.instagram.com/nino.chavez.photo/",
      },
      {
        name: "SoundCloud",
        description: "DJ sets and mixes.",
        href: "https://soundcloud.com/ni-no-cha-vez",
      },
    ],
  },
  {
    title: "Projects and businesses",
    destinations: [
      {
        name: "Rally HQ",
        description: "Tournament registration, schedules, brackets, and live scoring.",
        href: "https://rallyhq.app",
      },
      {
        name: "Let’s Pepper",
        description: "Grass volleyball tournaments in Chicagoland.",
        href: "https://letspepper.com",
      },
      {
        name: "Flickday Media",
        description: "Tournament photography and grassroots sports media.",
        href: "https://flickdaymedia.com",
      },
      {
        name: "Signal X Studio",
        description: "The company behind my sports, media, and software ventures.",
        href: "https://signalx.studio",
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
      <header className="links-opening">
        <div className="links-opening__stage page-shell">
          <h1>Links</h1>
          <p className="links-opening__lede">
            A direct route to the work, writing, photographs, and places I share
            publicly.
          </p>
        </div>
      </header>

      <div className="links-body page-shell">
        {destinationGroups.map((group) => (
          <section
            key={group.title}
            className="links-group"
            aria-labelledby={`links-${group.title.toLowerCase().replaceAll(" ", "-")}`}
          >
            <h2 id={`links-${group.title.toLowerCase().replaceAll(" ", "-")}`}>
              {group.title}
            </h2>
            <ul>
              {group.destinations.map((destination) => {
                const href =
                  "tracksSource" in destination && destination.tracksSource
                    ? `${destination.href}?src=${gallerySource}`
                    : destination.href;
                const opensInNewTab =
                  isIndependentSiteHref(href) ||
                  (href.startsWith("http") && !href.startsWith("https://ninochavez.co/"));

                return (
                  <li key={destination.name}>
                    <a
                      href={href}
                      target={opensInNewTab ? "_blank" : undefined}
                      rel={opensInNewTab ? "noopener noreferrer" : undefined}
                    >
                      {destination.name}
                      {opensInNewTab ? (
                        <span className="assistive-text"> (opens in a new tab)</span>
                      ) : null}
                    </a>
                    <p>{destination.description}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
