"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { canonicalFacet } from "../facets";
import { useMemo } from "react";
import type {
  AppliedTechnique,
  DemoEntry,
  DemoSession,
} from "../demos";

type DemoKind = "session" | "technique";

type DemoRecord = DemoEntry & {
  artifact?: DemoSession["artifact"];
  href: string;
  index: number;
  kind: DemoKind;
  searchText: string;
};

const demoKinds: { label: string; value: DemoKind }[] = [
  { label: "Sessions", value: "session" },
  { label: "Applied techniques", value: "technique" },
];

export function DemoLibrary({
  sessions,
  techniques,
}: {
  sessions: DemoSession[];
  techniques: AppliedTechnique[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const kind = canonicalFacet(
    searchParams.get("type") ?? "",
    demoKinds.map((item) => item.value),
  );

  const records = useMemo<DemoRecord[]>(
    () => [
      ...sessions.map((entry, index) => ({
        ...entry,
        href: `/demos/${entry.slug}`,
        index,
        kind: "session" as const,
        searchText: [
          entry.title,
          entry.summary,
          entry.audience,
          entry.evidence,
          entry.practice,
        ].join(" "),
      })),
      ...techniques.map((entry, index) => ({
        ...entry,
        href: `/demos/applied/${entry.slug}`,
        index,
        kind: "technique" as const,
        searchText: [
          entry.title,
          entry.summary,
          entry.description,
          ...entry.steps,
        ].join(" "),
      })),
    ],
    [sessions, techniques],
  );

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
    return records.filter((record) => {
      const matchesQuery =
        !normalized || record.searchText.toLowerCase().includes(normalized);
      return matchesQuery && (!kind || record.kind === kind);
    });
  }, [kind, query, records]);

  const groups = [
    {
      description: "Kept in the order the work was published.",
      id: "sessions",
      items: visible.filter((record) => record.kind === "session"),
      label: "Operating sessions",
      value: "session" as const,
    },
    {
      description: "Reusable moves extracted from the sessions.",
      id: "applied",
      items: visible.filter((record) => record.kind === "technique"),
      label: "Applied techniques",
      value: "technique" as const,
    },
  ].filter((group) => group.items.length > 0);

  const filtered = Boolean(query || kind);
  const activeCriteria = [
    query ? `query “${query}”` : "",
    kind
      ? `type “${demoKinds.find((item) => item.value === kind)?.label ?? kind}”`
      : "",
  ].filter(Boolean);

  return (
    <div className="library-experience">
      <form
        className="library-controls demo-controls"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="control search-control" data-active={Boolean(query)}>
          <label htmlFor="demo-query">Search demos</label>
          <input
            id="demo-query"
            type="search"
            value={query}
            placeholder="Session title, technique, or topic…"
            onChange={(event) => setFilter("q", event.target.value)}
          />
        </div>

        <div className="control" data-active={Boolean(kind)}>
          <label htmlFor="demo-type">Type</label>
          <select
            id="demo-type"
            value={kind}
            onChange={(event) => setFilter("type", event.target.value)}
          >
            <option value="">All sessions and techniques</option>
            {demoKinds.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="library-status" aria-live="polite">
        <p>
          <strong>{visible.length}</strong> of <strong>{records.length}</strong>{" "}
          sessions and techniques in view
        </p>
        <div className="library-status__actions">
          <span>
            {filtered
              ? `${activeCriteria.length} active ${
                  activeCriteria.length === 1 ? "filter" : "filters"
                }`
              : "All sessions and techniques"}
          </span>
          {filtered ? (
            <button
              type="button"
              onClick={() => router.replace(pathname, { scroll: false })}
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {groups.length ? (
        <div className="library-groups demo-groups">
          {groups.map((group) => (
            <section
              className="library-group demo-group"
              id={group.id}
              key={group.value}
              aria-labelledby={`${group.id}-title`}
            >
              <div className="group-heading">
                <span>
                  {String(
                    demoKinds.findIndex((item) => item.value === group.value) +
                      1,
                  ).padStart(2, "0")}{" "}
                  / {String(demoKinds.length).padStart(2, "0")}
                </span>
                <h2 id={`${group.id}-title`}>{group.label}</h2>
                <p>
                  {group.items.length}{" "}
                  {group.value === "session"
                    ? group.items.length === 1
                      ? "session"
                      : "sessions"
                    : group.items.length === 1
                      ? "technique"
                      : "techniques"}
                </p>
                <small>{group.description}</small>
              </div>

              {group.value === "session" ? (
                <div className="demo-session-reel" role="list">
                  {group.items.map((record) => (
                    <a
                      className="demo-session-card"
                      href={record.href}
                      key={`${record.kind}-${record.slug}`}
                      role="listitem"
                    >
                      <div className="demo-session-card__frame">
                        {record.artifact ? (
                          <img
                            src={record.artifact.src}
                            alt={record.artifact.alt}
                            width="883"
                            height="900"
                            loading="lazy"
                          />
                        ) : null}
                        <span aria-hidden="true">
                          S{String(record.index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <span className="demo-session-card__copy">
                        <small>Operating session</small>
                        <strong>{record.title}</strong>
                        <p>{record.summary}</p>
                        <em>
                          Open session <b aria-hidden="true">→</b>
                        </em>
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="demo-technique-grid" role="list">
                  {group.items.map((record) => (
                    <a
                      className="demo-technique-card"
                      href={record.href}
                      key={`${record.kind}-${record.slug}`}
                      role="listitem"
                    >
                      <span aria-hidden="true">
                        A{String(record.index + 1).padStart(2, "0")}
                      </span>
                      <small>Applied technique</small>
                      <strong>{record.title}</strong>
                      <p>{record.summary}</p>
                      <em>
                        Open technique <b aria-hidden="true">→</b>
                      </em>
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p className="eyebrow">No matches</p>
          <h2>No sessions or techniques match these filters.</h2>
          <p>
            Filters applied: {activeCriteria.join(", ")}. Remove one, or clear
            all filters to see all {records.length} sessions and techniques.
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
