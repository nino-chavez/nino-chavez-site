import Link from "next/link";

const primary = [
  ["Work", "/work"],
  ["Sessions", "/demos"],
  ["Learn", "/learn"],
  ["Writing", "/blog"],
  ["Photography", "/photography"],
  ["About", "/about"],
] as const;

const secondary = [
  ["Now", "/now"],
  ["Links", "/links"],
  ["Privacy", "/privacy"],
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <p className="footer-name">Nino Chavez</p>
          <p className="muted">
            Product architect and builder in Chicago.
          </p>
        </div>

        <nav aria-label="Footer primary navigation">
          {primary.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Footer secondary navigation">
          {secondary.map(([label, href]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <nav aria-label="External profiles">
          <a
            href="https://github.com/nino-chavez"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
            <span className="assistive-text"> (opens in a new tab)</span>
          </a>
          <a
            href="https://www.linkedin.com/in/nino-chavez/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
            <span className="assistive-text"> (opens in a new tab)</span>
          </a>
          <a href="mailto:nino@ninochavez.co">Email ↗</a>
        </nav>
      </div>
    </footer>
  );
}
