import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <title>Page not found — Nino Chavez</title>
      <div className="page-shell page-stack">
        <header className="page-intro">
          <p className="eyebrow">404 / route not found</p>
          <h1>This path does not resolve.</h1>
          <p className="lede">
            The address may be mistyped, moved, or retired. The rest of the
            practice is still here.
          </p>
        </header>

        <nav className="empty-state" aria-label="Continue from the missing page">
          <p className="eyebrow">Choose a working entrance</p>
          <h2>Continue without starting over.</h2>
          <p>
            Browse the complete work record, read the publication, or search
            across the whole site.
          </p>
          <div className="about-inline-actions">
            <Link href="/work">Browse work →</Link>
            <Link href="/blog">Read writing →</Link>
            <Link href="/search">Search the site →</Link>
          </div>
        </nav>
      </div>
    </>
  );
}
