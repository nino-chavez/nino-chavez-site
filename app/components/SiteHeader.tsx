"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Ordinary document links keep specialist applications independent. */
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="profile-header">
      <div className="profile-header__inner">
        <a className="profile-header__wordmark" href="/">Nino Chavez</a>
        <nav aria-label="Primary">
          <a href="/" aria-current={pathname === "/" ? "page" : undefined}>Home</a>
          <a className="profile-header__specialist" href="https://ninochavez.co/blog/archive" target="_blank" rel="noopener noreferrer">Writing<span className="assistive-text"> (opens in a new tab)</span></a>
          <a className="profile-header__specialist" href="https://ninochavez.co/photography/albums" target="_blank" rel="noopener noreferrer">Photography<span className="assistive-text"> (opens in a new tab)</span></a>
          <a href="/links" aria-current={pathname === "/links" ? "page" : undefined}>Links</a>
          <a href="mailto:nino@ninochavez.co">Email</a>
        </nav>
      </div>
    </header>
  );
}
