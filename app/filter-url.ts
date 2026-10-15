// Library filters run entirely in the browser: every record is already on the
// page. Writing the query string through history.replaceState updates
// useSearchParams in place (VineNext patches it, as Next.js does), so a
// keystroke never waits on the server. router.replace re-rendered the route on
// the server for every keystroke, and the search box snapped back to its old
// value until that response landed, dropping characters typed in between.
//
// The params are read from window.location, not the useSearchParams snapshot,
// so two keystrokes inside one render still build on each other.
export function replaceFilterParams(update: (params: URLSearchParams) => void) {
  const params = new URLSearchParams(window.location.search);
  update(params);
  const suffix = params.toString();
  const { pathname } = window.location;
  window.history.replaceState(null, "", suffix ? `${pathname}?${suffix}` : pathname);
}
