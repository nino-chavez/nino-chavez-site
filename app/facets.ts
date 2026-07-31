// Shared filter-facet helpers for the collection libraries.
//
// Filter state lives in the URL, so a value can arrive from a shared link, a
// bookmark, a hand-edit, or the IA contract's own documented examples — not just
// from the select that emitted it. Those sources do not preserve casing, and the
// facet vocabularies disagree with each other about it: domains are capitalized
// (`Commerce`), states are lowercase (`live`). Compare case-insensitively and
// resolve to the vocabulary's own spelling so the control still reflects state.

/** Resolve a URL-supplied value to its canonical vocabulary spelling. */
export function canonicalFacet(
  value: string,
  options: readonly string[],
): string {
  if (!value) return "";
  const match = options.find(
    (option) => option.toLowerCase() === value.toLowerCase(),
  );
  // An unrecognised value is returned unchanged so it matches nothing and the
  // collection renders its empty state, rather than being silently ignored.
  return match ?? value;
}

/**
 * The subset of a vocabulary that at least one record actually holds, in
 * vocabulary order. Offering a filter that can only ever return nothing is a
 * dead end; the vocabulary may legitimately declare values ahead of use.
 */
export function offeredFacets<T>(
  items: readonly T[],
  key: keyof T,
  options: readonly string[],
): string[] {
  const held = new Set(items.map((item) => String(item[key])));
  return options.filter((option) => held.has(option));
}
