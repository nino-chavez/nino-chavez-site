"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Home uses the selected Masthead composition; other profile routes keep their header and footer. */
export function ProfileShell({ children }: { children: ReactNode }) {
  const isHome = usePathname() === "/";

  if (!isHome) {
    return <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </>;
  }

  return <>
    <a className="skip-link masthead-skip" href="#main">Skip to content</a>
    <div id="masthead" className="masthead-shell">
      <header className="mast">
        <nav className="primary-nav" aria-label="Primary navigation">
          <ul>
            <li><Link href="/work">Work</Link></li>
            <li><a href="https://ninochavez.co/blog/archive" target="_blank" rel="noopener noreferrer">Writing <span className="visually-hidden">(opens in a new tab)</span></a></li>
            <li><a href="https://ninochavez.co/photography/albums" target="_blank" rel="noopener noreferrer">Photography <span className="visually-hidden">(opens in a new tab)</span></a></li>
            <li><Link href="/about">About</Link></li>
            <li><a className="primary-nav__mail" href="mailto:nino@ninochavez.co">Email</a></li>
          </ul>
        </nav>
        <h1 className="wordmark"><Link href="/" aria-current="page">Nino <span>Chavez</span></Link></h1>
      </header>
      <main id="main" tabIndex={-1}>{children}</main>
    </div>
  </>;
}
