"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/** Home uses the selected Studio composition; other profile routes keep their existing layout. */
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
    <a className="skip-link studio-skip" href="#main">Skip to content</a>
    <div id="studio" className="studio-shell">
      <aside id="about" className="identity-rail" aria-label="Nino Chavez profile">
        <div className="rail-top">
          <h1 className="identity-heading"><Link className="identity-name" href="/" aria-current="page">Nino Chavez</Link></h1>
          <img className="portrait" src="/work/nino.jpg" alt="Portrait of Nino Chavez" width="156" height="156" />
          <p className="lede">I’m a product architect in Chicago. Outside work, I run volleyball events, take photographs, write, and DJ.</p>
          <nav className="primary-nav" aria-label="Primary navigation">
            <ul>
              <li><Link href="/work">Work</Link></li>
              <li><a href="https://ninochavez.co/blog/archive" target="_blank" rel="noopener noreferrer">Writing <span className="visually-hidden">(opens in a new tab)</span></a></li>
              <li><a className="photo-route" href="https://ninochavez.co/photography/albums" target="_blank" rel="noopener noreferrer">Photography <span className="visually-hidden">(opens in a new tab)</span></a></li>
              <li><Link href="/about">About</Link></li>
              <li><a href="mailto:nino@ninochavez.co">Email</a></li>
            </ul>
          </nav>
        </div>
        <p className="rail-note">Writing and Photography open in their own sites.</p>
      </aside>
      <main id="main" tabIndex={-1}>{children}</main>
    </div>
  </>;
}
