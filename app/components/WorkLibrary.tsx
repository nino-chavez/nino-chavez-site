"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  domains,
  forms,
  states,
  type WorkItem,
  workHref,
  workStateLabels,
} from "../data";
import { canonicalFacet, offeredFacets } from "../facets";

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

function formatUpdatedAt(value: string) {
  const [, month, day] = value.split("-");
  return `${Number(day)} ${shortMonths[Number(month) - 1]}`;
}

export function WorkLibrary({ items }: { items: WorkItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const domain = canonicalFacet(searchParams.get("domain") ?? "", domains);
  const state = canonicalFacet(searchParams.get("state") ?? "", states);
  const form = canonicalFacet(searchParams.get("form") ?? "", forms);

  const domainOptions = offeredFacets(items, "domain", domains);
  const stateOptions = offeredFacets(items, "state", states);
  const formOptions = offeredFacets(items, "form", forms);

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
    return items.filter((item) => {
      const matchesQuery =
        !normalized ||
        `${item.name} ${item.claim} ${item.domain} ${item.state} ${item.form}`
          .toLowerCase()
          .includes(normalized);
      return (
        matchesQuery &&
        (!domain || item.domain === domain) &&
        (!state || item.state === state) &&
        (!form || item.form === form)
      );
    });
  }, [domain, form, items, query, state]);

  const groups = domains
    .map((name) => ({
      name,
      items: visible
        .filter((item) => item.domain === name)
        .sort(
          (a, b) =>
            b.updatedAt.localeCompare(a.updatedAt) ||
            a.name.localeCompare(b.name),
        ),
    }))
    .filter((group) => group.items.length > 0);

  const filtered = Boolean(query || domain || state || form);
  const activeCriteria = [
    query ? `query “${query}”` : "",
    domain ? `domain “${domain}”` : "",
    state ? `status “${workStateLabels[state]}”` : "",
    form ? `type “${form}”` : "",
  ].filter(Boolean);

  return (
    <div className="library-experience">
      <form
        className="library-controls"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="control search-control" data-active={Boolean(query)}>
          <label htmlFor="work-query">Search work</label>
          <input
            id="work-query"
            type="search"
            value={query}
            placeholder="Name, purpose, domain…"
            onChange={(event) => setFilter("q", event.target.value)}
          />
        </div>

        <div className="control" data-active={Boolean(domain)}>
          <label htmlFor="work-domain">Domain</label>
          <select
            id="work-domain"
            value={domain}
            onChange={(event) => setFilter("domain", event.target.value)}
          >
            <option value="">All domains</option>
            {domainOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="control" data-active={Boolean(state)}>
          <label htmlFor="work-state">Status</label>
          <select
            id="work-state"
            value={state}
            onChange={(event) => setFilter("state", event.target.value)}
          >
            <option value="">All statuses</option>
            {stateOptions.map((item) => (
              <option key={item} value={item}>
                {workStateLabels[item]}
              </option>
            ))}
          </select>
        </div>

        <div className="control" data-active={Boolean(form)}>
          <label htmlFor="work-form">Type</label>
          <select
            id="work-form"
            value={form}
            onChange={(event) => setFilter("form", event.target.value)}
          >
            <option value="">All types</option>
            {formOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="library-status" aria-live="polite">
        <p>
          <strong>{visible.length}</strong> of <strong>{items.length}</strong>{" "}
          records in view
        </p>
        <div className="library-status__actions">
          <span>
            {filtered
              ? `${activeCriteria.length} active ${
                  activeCriteria.length === 1 ? "filter" : "filters"
                }`
              : "All work"}
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
        <div className="library-groups">
          {groups.map((group) => (
            <section
              className="library-group"
              key={group.name}
              aria-labelledby={`domain-${group.name.replaceAll(" ", "-")}`}
            >
              <div className="group-heading">
                <span>
                  {String(domains.indexOf(group.name) + 1).padStart(2, "0")} /{" "}
                  {String(domains.length).padStart(2, "0")}
                </span>
                <h2 id={`domain-${group.name.replaceAll(" ", "-")}`}>
                  {group.name}
                </h2>
                <p>
                  {group.items.length}{" "}
                  {group.items.length === 1 ? "record" : "records"}
                </p>
              </div>

              <div className="work-list">
                {group.items.map((item) => (
                  <a
                    className="work-record"
                    href={workHref(item)}
                    key={item.slug}
                  >
                    <span className="record-number" aria-hidden="true">
                      {String(
                        items.findIndex((record) => record.slug === item.slug) +
                          1,
                      ).padStart(2, "0")}
                    </span>
                    <div className="record-meta">
                      <span>{item.state}</span>
                      <span>{item.form}</span>
                      <time dateTime={item.updatedAt}>
                        {formatUpdatedAt(item.updatedAt)}
                      </time>
                    </div>
                    <div className="record-copy">
                      <h3>{item.name}</h3>
                      <p>{item.claim}</p>
                    </div>
                    <span className="record-open">
                      {item.detailPage === false ? "Browse" : "Open"}{" "}
                      <b aria-hidden="true">→</b>
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
          <h2>No work matches these filters.</h2>
          <p>
            Filters applied: {activeCriteria.join(", ")}. Remove one, or clear
            all filters to see all {items.length} records.
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
