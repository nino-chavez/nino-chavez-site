import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="profile-footer">
      <span>Nino Chavez</span>
      <nav aria-label="More about Nino">
        <Link href="/about">About</Link>
        <Link href="/work">Projects</Link>
        <Link href="/links">Links</Link>
        <a href="https://ninochavez.co/blog/archive">Writing</a>
        <a href="https://ninochavez.co/photography/albums">Photography</a>
        <a href="mailto:nino@ninochavez.co">Email</a>
        <Link href="/privacy">Privacy</Link>
      </nav>
    </footer>
  );
}
