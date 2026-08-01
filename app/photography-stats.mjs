export const PHOTOGRAPHY_STATS_ENDPOINT =
  "https://ninochavez.co/photography/api/ai/stats";

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
