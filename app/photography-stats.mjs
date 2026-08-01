export const PHOTOGRAPHY_STATS_ENDPOINT =
  "https://nino-chavez-photography.pages.dev/photography/api/ai/stats";
export const PHOTOGRAPHY_RECENT_ALBUMS_ENDPOINT =
  "https://nino-chavez-photography.pages.dev/photography/api/ai/albums?limit=4&sort=date";

/**
 * Read the gallery's publisher-owned totals. A missing response removes the
 * scale block instead of freezing a copied count into the portfolio.
 *
 * @param {typeof fetch} fetcher
 * @returns {Promise<{totalPhotos: number, totalVideos: number, totalAlbums: number} | null>}
 */
export async function getPhotographyArchiveStats(fetcher = fetch) {
  try {
    const response = await fetcher(PHOTOGRAPHY_STATS_ENDPOINT, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return null;

    const payload = await response.json();
    const totalPhotos = Number(payload.total_photos);
    const totalVideos = Number(payload.total_videos);
    const totalAlbums = Number(payload.total_albums);

    if (
      !Number.isSafeInteger(totalPhotos) ||
      !Number.isSafeInteger(totalVideos) ||
      !Number.isSafeInteger(totalAlbums) ||
      totalPhotos < 0 ||
      totalVideos < 0 ||
      totalAlbums < 0
    ) {
      return null;
    }

    return { totalPhotos, totalVideos, totalAlbums };
  } catch {
    return null;
  }
}

/**
 * Read the newest public event albums from the gallery's own catalogue. The
 * landing page omits this section when the publisher is unavailable instead
 * of copying event records into the portfolio repository.
 *
 * @param {typeof fetch} fetcher
 * @returns {Promise<Array<{
 *   key: string,
 *   name: string,
 *   href: string,
 *   photoCount: number,
 *   videoCount: number,
 *   coverImage: string | null,
 *   latestDate: string | null
 * }>>}
 */
export async function getRecentPhotographyAlbums(fetcher = fetch) {
  try {
    const response = await fetcher(PHOTOGRAPHY_RECENT_ALBUMS_ENDPOINT, {
      headers: { accept: "application/json" },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return [];

    const payload = await response.json();
    if (!Array.isArray(payload.albums)) return [];

    return payload.albums.flatMap((album) => {
      const photoCount = Number(album.photo_count);
      const videoCount = Number(album.video_count);
      const href = typeof album.url === "string" ? album.url : "";
      let albumUrl;

      try {
        albumUrl = new URL(href);
      } catch {
        return [];
      }

      if (
        typeof album.key !== "string" ||
        !album.key ||
        typeof album.name !== "string" ||
        !album.name ||
        albumUrl.origin !== "https://ninochavez.co" ||
        !albumUrl.pathname.startsWith("/photography/albums/") ||
        !Number.isSafeInteger(photoCount) ||
        photoCount < 0 ||
        !Number.isSafeInteger(videoCount) ||
        videoCount < 0
      ) {
        return [];
      }

      const coverImage =
        typeof album.cover_image === "string" && album.cover_image
          ? album.cover_image
          : null;
      const latestDate =
        typeof album.date_range?.end === "string"
          ? album.date_range.end
          : null;

      return [
        {
          key: album.key,
          name: album.name,
          href: albumUrl.pathname,
          photoCount,
          videoCount,
          coverImage,
          latestDate,
        },
      ];
    }).slice(0, 4);
  } catch {
    return [];
  }
}
