"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { canonicalFacet } from "../facets";
import { useMemo } from "react";
import {
  writingKinds,
  type WritingItem,
} from "../writing";

const shortMonths = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function formatPublishedAt(value: string) {
  const [year, month, day] = value.split("-");
  return `${Number(day)} ${shortMonths[Number(month) - 1]} ${year}`;
}

function searchableText(item: WritingItem) {
  return [
    item.title,
    item.excerpt,
    item.kind,
    item.category,
    item.publishedAt,
    ...item.tags,
  ]
    .join(" ")
    .toLowerCase();
}

export function WritingLibrary({
  categories: writingCategories,
  items: writingItems,
  years: writingYears,
}: {
  categories: string[];
  items: WritingItem[];
  years: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const kind = canonicalFacet(
    searchParams.get("type") ?? "",
    writingKinds.map((item) => item.value),
  );
  const category = canonicalFacet(searchParams.get("subject") ?? "", writingCategories);
  const year = canonicalFacet(searchParams.get("year") ?? "", writingYears);
  const recordCodes = useMemo(() => {
    const codes = new Map<string, string>();
    for (const writingKind of writingKinds) {
      writingItems
        .filter((item) => item.kind === writingKind.value)
        .forEach((item, index) => {
          codes.set(
            item.href,
            `${writingKind.code}${String(index + 1).padStart(3, "0")}`,
          );
        });
    }
    return codes;
  }, [writingItems]);

  function setFilter(name: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) {
      next.set(name, value);
    } else {
      next.delete(name);
    }
    const suffix = next.toString();
    router.replace(suffix ? `${pathname}?${suffix}` : pathname, {
      scroll: false,
    });
  }

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return writingItems.filter((item) => {
      const matchesQuery =
        !normalized || searchableText(item).includes(normalized);
      return (
        matchesQuery &&
        (!kind || item.kind === kind) &&
        (!category || item.category === category) &&
        (!year || item.publishedAt.startsWith(year))
      );
    });
  }, [category, kind, query, writingItems, year]);

  const groups = writingKinds
    .map((group) => ({
      ...group,
      items: visible.filter((item) => item.kind === group.value),
    }))
    .filter((group) => group.items.length > 0);

  const filtered = Boolean(query || kind || category || year);
  const activeCriteria = [
    query ? `query “${query}”` : "",
    kind ? `form “${kind}”` : "",
    category ? `subject “${category}”` : "",
    year ? `year “${year}”` : "",
  ].filter(Boolean);

  return (
    <div className="library-experience">
      <form
        id="writing-controls"
        className="library-controls writing-controls"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="control search-control" data-active={Boolean(query)}>
          <label htmlFor="writing-query">Search the publication</label>
          <input
            id="writing-query"
            type="search"
            value={query}
            placeholder="Title, topic, or a phrase you remember…"
            onChange={(event) => setFilter("q", event.target.value)}
          />
        </div>

        <div className="control" data-active={Boolean(kind)}>
          <label htmlFor="writing-type">Form</label>
          <select
            id="writing-type"
            value={kind}
            onChange={(event) => setFilter("type", event.target.value)}
          >
            <option value="">All forms</option>
            {writingKinds.map((item) => (
              <option key={item.value} value={item.value}>
                {item.value}
              </option>
            ))}
          </select>
        </div>

        <div className="control" data-active={Boolean(category)}>
          <label htmlFor="writing-subject">Subject</label>
          <select
            id="writing-subject"
            value={category}
            onChange={(event) => setFilter("subject", event.target.value)}
          >
            <option value="">All subjects</option>
            {writingCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="control" data-active={Boolean(year)}>
          <label htmlFor="writing-year">Year</label>
          <select
            id="writing-year"
            value={year}
            onChange={(event) => setFilter("year", event.target.value)}
          >
            <option value="">All years</option>
            {writingYears.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="library-status" aria-live="polite">
        <p>
          <strong>{visible.length}</strong> of{" "}
          <strong>{writingItems.length}</strong> published pieces in view
        </p>
        <div className="library-status__actions">
          <span>
            {filtered
              ? `${activeCriteria.length} active ${
                  activeCriteria.length === 1 ? "filter" : "filters"
                }`
              : "Complete publication"}
          </span>
          {filtered ? (
            <button
              type="button"
              onClick={() => router.replace(pathname, { scroll: false })}
            >
              Clear filters
            </button>
          ) : null}
          <a href="#writing-controls">Adjust filters ↑</a>
        </div>
      </div>

      {groups.length ? (
        <div className="library-groups writing-groups">
          {groups.map((group) => (
            <section
              className="library-group writing-group"
              key={group.value}
              aria-labelledby={`writing-${group.value.toLowerCase()}`}
            >
              <div className="group-heading">
                <span>
                  {String(
                    writingKinds.findIndex(
                      (item) => item.value === group.value,
                    ) + 1,
                  ).padStart(2, "0")}{" "}
                  / {String(writingKinds.length).padStart(2, "0")}
                </span>
                <h2 id={`writing-${group.value.toLowerCase()}`}>
                  {group.value}
                  {group.value === "Fiction" ? "" : "s"}
                </h2>
                <p>
                  {group.items.length}{" "}
                  {group.items.length === 1 ? "piece" : "pieces"}
                </p>
                <small>{group.description}</small>
              </div>

              <div className="work-list">
                {group.items.map((item) => (
                  <a
                    className="work-record writing-record"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={item.slug}
                    key={`${item.kind}-${item.slug}`}
                  >
                    <span className="record-number" aria-hidden="true">
                      {recordCodes.get(item.href)}
                    </span>
                    <div className="record-meta">
                      <span>{item.category}</span>
                      <time dateTime={item.publishedAt}>
                        {formatPublishedAt(item.publishedAt)}
                      </time>
                    </div>
                    <div className="record-copy">
                      <h3>{item.title}</h3>
                      {item.excerpt ? <p>{item.excerpt}</p> : null}
                    </div>
                    <span className="record-open">
                      Read <b aria-hidden="true">↗</b>
                      <span className="assistive-text">
                        {" "}(opens in a new tab)
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="eyebrow">No matches</p>
          <h2>No published pieces match these filters.</h2>
          <p>
            Filters applied: {activeCriteria.join(", ")}. Remove one, or clear
            all filters to see all {writingItems.length} pieces.
          </p>
          <button
            type="button"
            onClick={() => router.replace(pathname, { scroll: false })}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
