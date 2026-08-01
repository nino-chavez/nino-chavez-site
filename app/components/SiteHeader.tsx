"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- vinext currently hydrates
 * next/link from this client shell with a duplicate React instance in dev. Plain
 * same-origin anchors keep the shared navigation reliable in the review build. */

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const primary = [
  { label: "Work", href: "/work", owns: ["/work"] },
  { label: "How I work", href: "/demos", owns: ["/demos"] },
  { label: "Learn", href: "/learn", owns: ["/learn"] },
  { label: "Writing", href: "/blog", owns: ["/blog"] },
  {
    label: "Photography",
    href: "/photography",
    owns: ["/photography"],
  },
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [pathname]);

  function openMenu() {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  return (
    <header className="site-header">
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
        onClose={() => setMenuOpen(false)}
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

        <form className="menu-search" action="/search" role="search">
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
