/* eslint-disable @next/next/no-img-element -- the review runtime does not provide
 * Next Image optimization; these local WebP assets are already sized for delivery. */

import type { Metadata } from "next";
import { Suspense } from "react";
import {
  getPhotographyArchiveStats,
  getRecentPhotographyAlbums,
} from "../photography-stats.mjs";

const canonicalRoot = "https://ninochavez.co/photography";
const sourcePattern = /^[a-z0-9_-]{1,32}$/;

const collectionRoutes = [
  {
    title: "Events",
    description: "Open complete event galleries, newest first.",
    href: "/photography/albums",
    action: "Browse events",
  },
  {
    title: "Browse by date",
    description: "Move through the archive by year and month.",
    href: "/photography/timeline",
    action: "Open timeline",
  },
  {
    title: "Collections",
    description: "Browse curated moments and visual themes.",
    href: "/photography/collections",
    action: "View collections",
  },
  {
    title: "Your saved photos",
    description: "Return to the frames saved in this browser.",
    href: "/photography/favorites",
    action: "Open saved photos",
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
  alternates: { canonical: "/photography" },
  openGraph: {
    title: "Nino Chavez Photography",
    description:
      "Volleyball and action-sports photography. Find your event, team, or jersey number.",
    images: [
      {
        url: `${canonicalRoot}/og.png`,
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
    images: [`${canonicalRoot}/og.png`],
  },
};

function withSource(href: string, source: string) {
  const url = new URL(href, "https://ninochavez.co");
  url.searchParams.set("src", source);
  return `${url.pathname}${url.search}`;
}

async function PhotographyScale() {
  const stats = await getPhotographyArchiveStats();

  if (!stats) return null;

  return (
    <dl className="photography-scale page-shell" aria-label="Archive scale">
      <div>
        <dt>Photos</dt>
        <dd>{stats.totalPhotos.toLocaleString("en-US")}</dd>
      </div>
      <div>
        <dt>Videos</dt>
        <dd>{stats.totalVideos.toLocaleString("en-US")}</dd>
      </div>
      <div>
        <dt>Event albums</dt>
        <dd>{stats.totalAlbums.toLocaleString("en-US")}</dd>
      </div>
    </dl>
  );
}

function formatEventDate(value: string | null) {
  if (!value) return null;

  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function albumContents(photoCount: number, videoCount: number) {
  const parts = [];
  if (photoCount > 0) {
    parts.push(`${photoCount.toLocaleString("en-US")} ${photoCount === 1 ? "photo" : "photos"}`);
  }
  if (videoCount > 0) {
    parts.push(`${videoCount.toLocaleString("en-US")} ${videoCount === 1 ? "video" : "videos"}`);
  }
  return parts.join(" · ");
}

async function PhotographyRecentEvents({ source }: { source: string }) {
  const albums = await getRecentPhotographyAlbums();

  if (albums.length === 0) return null;

  return (
    <section
      className="photography-recent page-shell"
      aria-labelledby="photography-recent-title"
    >
      <header>
        <div>
          <p>Newest galleries</p>
          <h2 id="photography-recent-title">Recent events</h2>
        </div>
        <a href={withSource("/photography/albums", source)}>
          Browse every event <span aria-hidden="true">→</span>
        </a>
      </header>
      <div className="photography-recent__grid">
        {albums.map((album) => {
          const date = formatEventDate(album.latestDate);
          const contents = albumContents(album.photoCount, album.videoCount);

          return (
            <a
              key={album.key}
              className="photography-recent__card"
              href={withSource(album.href, source)}
            >
              <span className="photography-recent__image">
                {album.coverImage ? (
                  <img
                    src={album.coverImage}
                    alt=""
                    width="600"
                    height="400"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </span>
              <strong>{album.name}</strong>
              <small>
                {[date, contents].filter(Boolean).join(" · ")}
              </small>
            </a>
          );
        })}
      </div>
    </section>
  );
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
              action="/photography/explore"
              method="get"
              role="search"
            >
              <label htmlFor="photography-query">
                Find photos in the full archive
              </label>
              <div>
                <input
                  id="photography-query"
                  name="q"
                  type="search"
                  placeholder="Event, team, or jersey number"
                />
                <input type="hidden" name="src" value={source} />
                <button type="submit">Find photos</button>
              </div>
            </form>
            <a
              href={withSource("/photography/albums", source)}
            >
              Browse every event <span aria-hidden="true">→</span>
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
                >
                  <strong>{route.title}</strong>
                  <small>{route.description}</small>
                  <b>
                    {route.action} <span aria-hidden="true">→</span>
                  </b>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </header>

      <div className="photography-archive">
        <Suspense fallback={null}>
          <PhotographyScale />
        </Suspense>

        <Suspense fallback={null}>
          <PhotographyRecentEvents source={source} />
        </Suspense>

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
              href={withSource("/photography/explore", source)}
            >
              Open the full gallery <span aria-hidden="true">→</span>
            </a>
          </footer>
        </section>

        <section
          className="photography-story page-shell"
          id="story"
          aria-labelledby="photography-story-title"
        >
          <header>
            <p>Behind the camera</p>
            <h2 id="photography-story-title">Started courtside. Never left.</h2>
          </header>
          <div>
            <p>
              What started as a way to capture my own kid&apos;s volleyball
              games turned into something a lot bigger. Now I cover high school
              and college matches, special events, and tournaments where the
              competition runs deep and the lighting is almost always terrible.
            </p>
            <p>
              I look for the moments players will want back: the read before
              contact, the reaction after the point, and the people around the
              play.
            </p>
          </div>
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
