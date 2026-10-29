/* eslint-disable @next/next/no-html-link-for-pages -- Ordinary document links preserve home anchors when returning from any profile route. */
export function SiteHeader() {
  return (
    <header className="profile-header">
      <div className="profile-header__inner">
        <a className="profile-header__wordmark" href="/">Nino Chavez</a>
        <nav aria-label="Profile sections">
          <a href="/#about">About</a>
          <a href="/#projects">Projects</a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
