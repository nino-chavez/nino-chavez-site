/** These paths belong to independent sites despite sharing the profile's domain. */
export function isIndependentSiteHref(href: string) {
  const url = new URL(href, "https://ninochavez.co");
  if (url.origin !== "https://ninochavez.co") return false;

  const path = url.pathname.replace(/\/+$/, "");
  return path === "/blog" || path.startsWith("/blog/") ||
    ((path === "/photography" || path.startsWith("/photography/")) &&
      path !== "/photography/coverage");
}
