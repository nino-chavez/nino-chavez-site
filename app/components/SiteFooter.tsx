import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="profile-footer">
      <span>Nino Chavez</span>
      <nav aria-label="More about Nino">
        <Link href="/about">About</Link>
        <Link href="/work">Projects</Link>
        <Link href="/links">Links</Link>
        <a href="https://ninochavez.co/blog/archive" target="_blank" rel="noopener noreferrer">Writing<span className="assistive-text"> (opens in a new tab)</span></a>
        <a href="https://ninochavez.co/photography/albums" target="_blank" rel="noopener noreferrer">Photography<span className="assistive-text"> (opens in a new tab)</span></a>
        <a href="mailto:nino@ninochavez.co">Email</a>
        <Link href="/privacy">Privacy</Link>
      </nav>
    </footer>
  );
}
