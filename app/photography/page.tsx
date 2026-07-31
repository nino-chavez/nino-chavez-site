/* eslint-disable @next/next/no-img-element -- the review runtime does not provide
 * Next Image optimization; these local WebP assets are already sized for delivery. */

import type { Metadata } from "next";

const archiveRoot = "https://photography.ninochavez.co";
const sourcePattern = /^[a-z0-9_-]{1,32}$/;

const collectionRoutes = [
  {
    title: "Search",
    description: "Find photos by event, team, or jersey number.",
    href: `${archiveRoot}/explore`,
    action: "Search photos",
  },
  {
    title: "Albums",
    description: "Open complete event galleries, newest first.",
    href: `${archiveRoot}/albums`,
    action: "Browse events",
  },
  {
    title: "Timeline",
    description: "Move through the archive by year and month.",
    href: `${archiveRoot}/timeline`,
    action: "Open timeline",
  },
  {
    title: "Collections",
    description: "Browse curated moments and visual themes.",
    href: `${archiveRoot}/collections`,
    action: "View collections",
  },
  {
    title: "Favorites",
    description: "Return to the frames saved in this browser.",
    href: `${archiveRoot}/favorites`,
    action: "Open favorites",
  },
] as const;

const frames = [
  {
    src: "/media/photography/p-01.webp",
    alt: "Volleyball player holding the ball at the service line",
  },
  {
    src: "/media/photography/p-02.webp",
    alt: "Beach volleyball player holding a yellow and blue ball",
  },
  {
    src: "/media/photography/p-03.webp",
    alt: "Volleyball player watching the court from the sideline",
  },
  {
    src: "/media/photography/p-04.webp",
    alt: "Volleyball team gathered in a huddle beside the court",
  },
  {
    src: "/media/photography/p-05.webp",
    alt: "UCLA beach volleyball player standing in the sun",
  },
  {
    src: "/media/photography/p-06.webp",
    alt: "Beach volleyball player competing in wet conditions",
  },
  {
    src: "/media/photography/p-07.webp",
    alt: "Volleyball player silhouetted against an evening sky",
  },
  {
    src: "/media/photography/p-08.webp",
    alt: "Beach volleyball players celebrating at the net",
  },
  {
    src: "/media/photography/p-09.webp",
    alt: "Surfer carrying a board through bright ocean spray",
  },
  {
    src: "/media/photography/p-10.webp",
    alt: "Volleyball player diving to keep the ball in play",
  },
  {
    src: "/media/photography/p-11.webp",
    alt: "Indoor volleyball player attacking above the net",
  },
  {
    src: "/media/photography/p-13.webp",
    alt: "Volleyball player holding the ball close before play",
  },
] as const;

export const metadata: Metadata = {
  title: "Photography",
  description:
    "Volleyball and action-sports photography by Nino Chavez. Search the full archive by event, team, or jersey number.",
  openGraph: {
    title: "Nino Chavez Photography",
    description:
      "Volleyball and action-sports photography. Find your event, team, or jersey number.",
    images: [
      {
        url: `${archiveRoot}/og.png`,
        width: 1200,
        height: 630,
        alt: "Nino Chavez Photography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nino Chavez Photography",
    description:
      "Volleyball and action-sports photography. Find your event, team, or jersey number.",
    images: [`${archiveRoot}/og.png`],
  },
};

function withSource(href: string, source: string) {
  const url = new URL(href);
  url.searchParams.set("src", source);
  return url.toString();
}

export default async function PhotographyPage({
  searchParams,
}: {
  searchParams: Promise<{ src?: string }>;
}) {
  const { src } = await searchParams;
  const source =
    typeof src === "string" && sourcePattern.test(src) ? src : "profile";

  return (
    <div className="photography-page">
      <header className="photography-opening">
        <picture className="photography-opening__image">
          <source
            media="(max-width: 720px)"
            srcSet="/media/photography/fd-12-mobile.webp"
          />
          <img
            src="/media/photography/fd-12.webp"
            alt="Volleyball players celebrating a point on court"
            width="1920"
            height="1280"
            fetchPriority="high"
            loading="eager"
          />
        </picture>

        <div className="photography-opening__shade" aria-hidden="true" />

        <div className="photography-opening__register page-shell">
          <span>Nino Chavez / Photography</span>
          <span>Action sports</span>
          <span>Chicago</span>
          <span>Active collection</span>
        </div>

        <div className="photography-opening__stage page-shell">
          <div className="photography-opening__lockup">
            <p>Volleyball and action sports</p>
            <h1>Photography</h1>
          </div>

          <div className="photography-search">
            <p>
              Find the frame you came for. Search club, high school, and
              college events by team, event, or jersey number.
            </p>
            <form
              action={`${archiveRoot}/explore`}
              method="get"
              role="search"
              target="_blank"
              rel="noopener noreferrer"
            >
              <label htmlFor="photography-query">
                Search the full photography archive (opens in a new tab)
              </label>
              <div>
                <input
                  id="photography-query"
                  name="q"
                  type="search"
                  placeholder="Team, event, or #"
                />
                <input type="hidden" name="src" value={source} />
                <button type="submit">Search</button>
              </div>
            </form>
            <a
              href={withSource(`${archiveRoot}/albums`, source)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse every event <span aria-hidden="true">↗</span>
              <span className="assistive-text"> (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <nav
          className="photography-route-deck"
          aria-label="Photography collection"
        >
          <ol className="page-shell">
            {collectionRoutes.map((route) => (
              <li key={route.href}>
                <a
                  href={withSource(route.href, source)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>{route.title}</strong>
                  <small>{route.description}</small>
                  <b>
                    {route.action} <span aria-hidden="true">↗</span>
                    <span className="assistive-text">
                      {" "}(opens in a new tab)
                    </span>
                  </b>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <div className="photography-archive">
        <section
          className="photography-selection"
          aria-labelledby="photography-selection-title"
        >
          <header className="photography-selection__heading page-shell">
            <div>
              <span>Contact sheet / 12 frames</span>
              <h2 id="photography-selection-title">From the archive</h2>
            </div>
            <p>
              Twelve frames, left at working scale. The live archive keeps the
              complete event record searchable.
            </p>
          </header>

          <div
            className="photography-frame-grid"
            aria-label="Selected photography"
          >
            {frames.map((frame) => (
              <figure key={frame.src}>
                <img
                  src={frame.src}
                  alt={frame.alt}
                  width="1080"
                  height="1621"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>

          <footer className="photography-selection__footer page-shell">
            <span>12 frames shown</span>
            <a
              href={withSource(`${archiveRoot}/explore`, source)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the full gallery <span aria-hidden="true">↗</span>
              <span className="assistive-text"> (opens in a new tab)</span>
            </a>
          </footer>
        </section>

        <aside className="photography-coverage page-shell">
          <p>Need coverage for a tournament, league, or club?</p>
          <a href="mailto:nino@ninochavez.co?subject=Event%20coverage%20inquiry">
            Ask about event coverage <span aria-hidden="true">↗</span>
          </a>
        </aside>
      </div>
    </div>
  );
}
