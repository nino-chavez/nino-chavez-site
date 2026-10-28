/** @param {string | undefined} category @param {string} kind */
export function categoryLabel(category, kind) {
  return category?.trim() || (kind === "Fiction" ? "Fiction" : "Uncategorized");
}

/**
 * @template {{ items: { category?: string, kind: string }[], categories: string[] }} T
 * @param {T} snapshot
 * @returns {T}
 */
export function normalizeWritingCategories(snapshot) {
  const items = snapshot.items.map((item) => ({
    ...item,
    category: categoryLabel(item.category, item.kind),
  }));
  return {
    ...snapshot,
    items,
    categories: [...new Set(items.map((item) => item.category))].sort(),
  };
}
