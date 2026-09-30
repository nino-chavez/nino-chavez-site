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
    value: "Cookieless traffic totals, site action counts and optional linked analytics.",
  },
  {
    label: "Photography",
    value: "Gallery activity totals and optional linked browsing analytics.",
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
          <time dateTime="2026-09-29">Updated 29 September 2026</time>
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
              The public pages include a coverage request form and do not require an
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
            <h3 id="coverage-requests">Coverage requests</h3>
            <p>
              When you submit a coverage request, I save your contact details,
              event information and notes in a private Cloudflare database so I
              can respond, prepare a quote and follow up. Cloudflare sends me an
              email notification, which reaches my Google Workspace inbox.
              Submitting a request does not subscribe you to marketing emails.
            </p>
            <p>
              I also record campaign tags and the referring website to understand
              where inquiries come from. Separate activity counts record page
              visits, opening the request section, starting the form and sending
              errors. These activity records contain no names, email addresses,
              form contents or persistent visitor identifiers, and expire after
              90 days. Inquiry records remain available for booking and follow-up;
              you can email me to request their removal.
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
                repeatedly. It is a pseudonymous identifier, not proof of an
                anonymous or unique person.
              </li>
              <li>
                <strong>Search.</strong> The gallery receives your search words
                to find photographs. New analytics records contain selected
                filters, result counts and whether a result was selected, rather
                than the words you typed. Do not put sensitive personal
                information into gallery search.
              </li>
            </ul>
            <p>
              Individual engagement records, including the derived session
              identifier, are automatically removed after 90 days. Daily action
              totals by album, photo, action, source, content category, and broad
              traffic classification may remain after those records expire.
              These totals do not contain the session identifier. They help me
              compare gallery activity over time.
            </p>
            <p>
              Earlier search records may contain search words. Those records
              do not currently expire automatically and remain until I remove
              them. They are not linked to an account or visit identifier and
              are not transferred to PostHog.
            </p>
            <h3 id="site-action-analytics">Site activity</h3>
            <p>
              Public profile, writing and demo pages record visible page views,
              link clicks, article scroll progress, time with an article visible,
              and demo chapters reached. These signals do not prove that you read
              an article, completed a demo or sent an inquiry. Contact addresses,
              link text, search words and URL query strings are not collected by
              this tracking. Without permission, these action records have no
              browser or visit identifier and are not sent to PostHog. Raw site
              action records expire after 90 days. Identifier-free daily totals
              by public page, section and action may remain.
            </p>
            <p>
              <a href="/photography/analytics-preferences">Analytics choices</a>
              {" "}let you allow linked analytics or exclude this browser from
              audience action counts. Choices apply to this browser on
              ninochavez.co; they do not follow your email or Chrome account.
              Cloudflare’s separate cookieless traffic totals may still include
              your visits.
            </p>
            <h3 id="linked-gallery-analytics">Optional linked site analytics</h3>
            <p>
              With your analytics permission, I use PostHog Cloud, hosted in the
              United States, to understand how browsing, search and downloads
              work across the profile, writing, demos and photography. It receives records such as album and photo opens, visible
              thumbnails, favorite changes, search result counts, and download
              requests and observable outcomes. Random browser and visit
              identifiers connect these actions. They are not linked to your
              Google or Chrome account and do not establish who you are.
            </p>
            <p>
              The gallery does not send PostHog search words, contact form
              contents, email addresses, raw visitor IP addresses, or recordings
              of your screen. It sends limited device and layout information,
              cleaned arrival-source tags, and photo or album identifiers.
              Popularity measures describe recorded activity, not verified people
              or proof that a file was saved to your device.
            </p>
            <p>
              PostHog has separate retention from the gallery&apos;s own 90-day
              records. The account currently reports a free plan. PostHog&apos;s
              published policy provides one year of event history on free plans
              and seven years on paid plans. These reporting windows are not a
              guarantee that older stored data is automatically erased. Read the{' '}
              <a href="https://posthog.com/docs/data/events-retention"
                target="_blank" rel="noopener noreferrer">
                PostHog event-retention explanation
                <span className="assistive-text"> (opens in a new tab)</span>
              </a>.
            </p>
            <p>
              You can decline linked analytics or turn it off through the
              gallery&apos;s{' '}
              <a href="/photography/analytics-preferences">
                analytics preferences
              </a>{' '}
              and keep using the gallery. Turning it off stops new linked
              collection and cancels queued exports. Records already being sent
              or stored by PostHog are not automatically deleted. The same controls let you exclude this browser from
              site and gallery action counts without signing in. To request deletion
              of earlier data, use the contact details below. These preferences
              do not grant access to private operator tools.
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
              If you allow linked gallery analytics, a random browser identifier
              is stored on your device for up to 90 days from creation. A visit
              identifier groups recorded interactions until 30 minutes of
              inactivity or a maximum of 24 hours. Clearing storage, switching
              browsers or changing devices can start a new identity. Analytics
              permission and browser-exclusion preferences are also remembered
              on your device.
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
