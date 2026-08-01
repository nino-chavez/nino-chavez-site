export const metadata = {
  title: "Privacy",
  description:
    "What ninochavez.co collects, what the photography gallery records, and the choices available to visitors.",
};

const policySummary = [
  {
    label: "Advertising",
    value: "No ad pixels, behavioral advertising, or sale of visitor data.",
  },
  {
    label: "Site analytics",
    value: "Cookieless Cloudflare page-view and performance metrics.",
  },
  {
    label: "Photography",
    value: "Limited search and interaction records used to run the gallery.",
  },
] as const;

const policySections = [
  {
    code: "P01",
    href: "#scope",
    label: "Scope",
  },
  {
    code: "P02",
    href: "#public-site",
    label: "Public site",
  },
  {
    code: "P03",
    href: "#photography",
    label: "Photography",
  },
  {
    code: "P04",
    href: "#your-browser",
    label: "Your browser",
  },
  {
    code: "P05",
    href: "#people-in-photographs",
    label: "People in photographs",
  },
  {
    code: "P06",
    href: "#choices",
    label: "Choices and contact",
  },
] as const;

export default function PrivacyPage() {
  return (
    <div className="privacy-page">
      <header className="privacy-opening">
        <div className="privacy-opening__register page-shell">
          <span>Privacy / current policy</span>
          <span>ninochavez.co</span>
          <time dateTime="2026-07-30">Updated 30 July 2026</time>
        </div>

        <div className="privacy-opening__stage page-shell">
          <div className="privacy-opening__lockup">
            <p className="eyebrow">The short version</p>
            <h1>Privacy</h1>
          </div>

          <div className="privacy-opening__statement">
            <p className="privacy-opening__lede">
              No ads. No data sales. No cross-site profiling.
            </p>
            <p>
              The public site uses privacy-first traffic analytics. The
              photography gallery keeps additional search and engagement
              records so I can operate the archive. This page separates those
              systems.
            </p>
          </div>
        </div>

        <dl className="privacy-summary page-shell">
          {policySummary.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="privacy-body page-shell">
        <nav className="privacy-index" aria-label="Privacy policy sections">
          {policySections.map((section) => (
            <a key={section.code} href={section.href}>
              <span>{section.code}</span>
              <strong>{section.label}</strong>
              <b aria-hidden="true">↓</b>
            </a>
          ))}
        </nav>

        <section
          className="privacy-section"
          id="scope"
          aria-labelledby="privacy-scope"
        >
          <header>
            <span>P01 / Scope</span>
            <h2 id="privacy-scope">Where this policy applies</h2>
          </header>

          <div className="privacy-copy">
            <p className="privacy-lead">
              This policy covers ninochavez.co, including Signal Dispatch and
              the Photography collection.
            </p>
            <p>
              Products, social profiles, code hosts, music services, and other
              destinations on separate domains follow their own policies. When
              you follow one of those links, the destination receives the
              normal connection details needed to load its site.
            </p>
            <p>
              The public pages do not have a contact form and do not require an
              account. Search forms send the words and filters in the page URL
              so the requested view can be returned.
            </p>
          </div>
        </section>

        <section
          className="privacy-section"
          id="public-site"
          aria-labelledby="privacy-public-site"
        >
          <header>
            <span>P02 / Public site</span>
            <h2 id="privacy-public-site">What the site receives</h2>
          </header>

          <div className="privacy-copy">
            <p className="privacy-lead">
              Cloudflare helps deliver, protect, and measure the public site.
            </p>
            <ul>
              <li>
                <strong>Network requests.</strong> Like any web host and
                security provider, Cloudflare can process an IP address,
                requested URL, time, referrer, and browser headers to deliver
                the page, prevent abuse, and diagnose failures.
              </li>
              <li>
                <strong>Web Analytics.</strong> The site and Signal Dispatch
                use Cloudflare Web Analytics for page-view, referrer, device,
                and performance totals. Cloudflare says this product does not
                use cookies, local storage, or individual fingerprinting for
                analytics.
              </li>
            </ul>
            <p>
              I do not add advertising pixels or use these records to build an
              advertising profile. Read{" "}
              <a
                href="https://developers.cloudflare.com/web-analytics/about/"
                target="_blank"
                rel="noopener noreferrer"
              >
                how Cloudflare Web Analytics works
                <span className="assistive-text"> (opens in a new tab)</span>
              </a>{" "}
              and{" "}
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cloudflare&apos;s privacy policy
                <span className="assistive-text"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="privacy-section"
          id="photography"
          aria-labelledby="privacy-photography"
        >
          <header>
            <span>P03 / Photography</span>
            <h2 id="privacy-photography">What the gallery records</h2>
          </header>

          <div className="privacy-copy">
            <p className="privacy-lead">
              Photography keeps a small operational record beyond the
              site-wide traffic totals.
            </p>
            <ul>
              <li>
                <strong>Engagement.</strong> A photo or album view, favorite,
                download, share, and the source of an arrival may be recorded.
                These signals help rank work and show whether the archive is
                usable.
              </li>
              <li>
                <strong>Daily deduplication.</strong> The gallery creates a
                one-way session identifier from the connection IP address and
                browser user-agent. The raw IP address and user-agent are not
                stored in the gallery analytics table. The identifier is used
                with the event date to avoid counting the same action
                repeatedly.
              </li>
              <li>
                <strong>Search.</strong> Search words, selected filters, and
                the number of results are stored so I can see what visitors
                can and cannot find. Do not put sensitive personal information
                into gallery search.
              </li>
            </ul>
            <p>
              Engagement events are automatically removed after 90 days.
              Search records do not currently expire automatically; they stay
              until I remove them, and are not stored with an account or
              session identifier.
            </p>
            <p>
              Supabase stores the gallery records and provides authentication
              for authorized operators. Public visitors do not need an
              account. See{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Supabase&apos;s privacy policy
                <span className="assistive-text"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </div>
        </section>

        <section
          className="privacy-section"
          id="your-browser"
          aria-labelledby="privacy-browser"
        >
          <header>
            <span>P04 / Your browser</span>
            <h2 id="privacy-browser">What stays on your device</h2>
          </header>

          <div className="privacy-copy">
            <p className="privacy-lead">
              The gallery saves useful state in your browser so it can remember
              your choices.
            </p>
            <p>
              Favorites, recent filters, display and accessibility preferences,
              and whether help has already been shown can be stored in local
              browser storage. That data remains on the device unless you clear
              site data in your browser. A favorite action can also be counted
              as a gallery engagement event, as described above.
            </p>
            <p>
              I do not use advertising cookies. Cloudflare may set short-lived,
              necessary security cookies when a protection feature is active.
              Signed-in operator tools use essential authentication storage to
              keep the operator signed in.
            </p>
          </div>
        </section>

        <section
          className="privacy-section"
          id="people-in-photographs"
          aria-labelledby="privacy-photographs"
        >
          <header>
            <span>P05 / People in photographs</span>
            <h2 id="privacy-photographs">People in photographs</h2>
          </header>

          <div className="privacy-copy">
            <p className="privacy-lead">
              Published event photographs can show adults and youth athletes.
            </p>
            <p>
              Some photographs also display approved athlete names or jersey
              numbers to make the archive easier to use. Those labels are
              public when they appear on a published photo.
            </p>
            <p>
              To submit an athlete tag, you must confirm that you have the
              athlete&apos;s permission. If the athlete is under 18, you must
              confirm permission from their parent or legal guardian.
            </p>
            <p>
              If you are pictured, or you are the parent or guardian of a youth
              athlete, you can ask me to review a photograph or public athlete
              label for correction or removal. Include the page or photo link
              so I can find the exact record.
            </p>
          </div>
        </section>

        <section
          className="privacy-section"
          id="choices"
          aria-labelledby="privacy-choices"
        >
          <header>
            <span>P06 / Choices and contact</span>
            <h2 id="privacy-choices">Your choices and contact</h2>
          </header>

          <div className="privacy-copy">
            <p className="privacy-lead">
              You can clear local gallery data in your browser and contact me
              about records held by the site.
            </p>
            <p>
              You may ask for access, correction, or deletion where applicable.
              Anonymous traffic totals, unlinked search records, and
              pseudonymous engagement records may not be reasonably traceable
              back to one person; I will not pretend I can identify a record
              when I cannot.
            </p>
            <p>
              Email{" "}
              <a href="mailto:nino@ninochavez.co">nino@ninochavez.co</a> with a
              privacy question, data request, or photograph and label removal
              request. Clicking the email link opens your mail application;
              once you send a message, your email provider and mine process
              the message under their own terms.
            </p>
            <aside className="privacy-change-note">
              <span>Policy changes</span>
              <p>
                I will update this page and its date when the site&apos;s data
                practices change materially.
              </p>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
