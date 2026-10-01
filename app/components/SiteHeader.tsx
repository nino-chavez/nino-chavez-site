"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- vinext currently hydrates
 * next/link from this client shell with a duplicate React instance in dev. Plain
 * same-origin anchors keep the shared navigation reliable in the review build. */

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const primary = [
  { label: "Writing", href: "/blog", owns: ["/blog"] },
  { label: "Building", href: "/work", owns: ["/work", "/demos", "/learn"] },
  { label: "Photography", href: "/photography", owns: ["/photography"] },
  { label: "About", href: "/about", owns: ["/about", "/now", "/links"] },
] as const;

const mobileSecondary = [
  { label: "Now", href: "/now" },
  { label: "Links", href: "/links" },
] as const;

function ownsPath(pathname: string, roots: readonly string[]) {
  return roots.some(
    (root) => pathname === root || pathname.startsWith(`${root}/`),
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuHistoryEntryRef = useRef(false);
  const pendingNavigationRef = useRef<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback((removeHistoryEntry = true) => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
    setMenuOpen(false);
    menuButtonRef.current?.focus();

    if (removeHistoryEntry && menuHistoryEntryRef.current) {
      menuHistoryEntryRef.current = false;
      window.history.back();
    }
  }, []);

  useEffect(() => {
    if (dialogRef.current?.open) {
      closeMenu();
    }
  }, [closeMenu, pathname]);

  useEffect(() => {
    function handlePopState() {
      const destination = pendingNavigationRef.current;
      pendingNavigationRef.current = null;
      menuHistoryEntryRef.current = false;

      if (dialogRef.current?.open) {
        closeMenu(false);
      }

      if (destination) {
        window.location.assign(destination);
      }
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [closeMenu]);

  function openMenu() {
    if (dialogRef.current?.open) {
      return;
    }

    window.history.pushState(
      { ...window.history.state, siteNavigationDialog: true },
      "",
      window.location.href,
    );
    menuHistoryEntryRef.current = true;
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }

  function navigateFromMenu(destination: string) {
    pendingNavigationRef.current = destination;
    closeMenu();
  }

  function handleMenuLink(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    navigateFromMenu(event.currentTarget.href);
  }

  function handleMenuSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const query = form.get("q");
    const search = new URL("/search", window.location.origin);
    if (typeof query === "string" && query) {
      search.searchParams.set("q", query);
    }
    navigateFromMenu(search.href);
  }

  function handleMenuKeys(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled])',
    )).filter((element) => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <header className={`site-header${pathname === "/" ? " site-header--home" : ""}`}>
      <div className="header-inner">
        <a
          className="identity-link"
          href="/"
          aria-label="Nino Chavez, home"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          Nino Chavez
        </a>

        <nav className="desktop-navigation" aria-label="Primary navigation">
          {primary.map((item) => {
            const active = ownsPath(pathname, item.owns);
            const current = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={
                  current ? "page" : active ? "location" : undefined
                }
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <a
          className="search-link"
          href="/search"
          aria-current={pathname === "/search" ? "page" : undefined}
        >
          Search site
        </a>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-haspopup="dialog"
          aria-controls="site-navigation-dialog"
          aria-expanded={menuOpen}
          onClick={openMenu}
        >
          Menu
        </button>
      </div>

      <dialog
        id="site-navigation-dialog"
        ref={dialogRef}
        className="navigation-dialog"
        aria-labelledby="navigation-dialog-title"
        onKeyDown={handleMenuKeys}
        onClose={() => {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }}
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
      >
        <div className="dialog-heading">
          <p id="navigation-dialog-title">Navigate</p>
          <button type="button" onClick={closeMenu} autoFocus>
            Close
          </button>
        </div>

        <form
          className="menu-search"
          action="/search"
          role="search"
          onSubmit={handleMenuSearch}
        >
          <label htmlFor="menu-query">Search this site</label>
          <div>
            <input
              id="menu-query"
              name="q"
              type="search"
              placeholder="Project, topic, or page…"
            />
            <button type="submit">Search</button>
          </div>
        </form>

        <nav aria-label="Mobile primary navigation">
          {primary.map((item) => {
            const active = ownsPath(pathname, item.owns);
            const current = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleMenuLink}
                aria-current={
                  current ? "page" : active ? "location" : undefined
                }
              >
                <span>{item.label}</span>
                {active ? (
                  <small>{current ? "Current page" : "Current section"}</small>
                ) : null}
              </a>
            );
          })}
        </nav>

        <nav className="mobile-secondary" aria-label="More pages">
          {mobileSecondary.map((item) => {
            const active = pathname === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleMenuLink}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </dialog>
    </header>
  );
}
