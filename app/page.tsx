import Link from "next/link";
import { identity, personId, personSchemaCore, positions } from "./career";

export const metadata = {
  alternates: { canonical: "https://ninochavez.co/" },
};

const currentEmployment = positions.find(
  (position) => position.kind === "employment" && position.end === null,
);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      ...personSchemaCore(),
      description: `Product architect and builder in ${identity.location.split(",")[0]}.`,
      jobTitle: currentEmployment?.title,
      homeLocation: {
        "@type": "City",
        name: identity.location.split(",")[0],
      },
    },
    {
      "@id": `${identity.site}/#website`,
      "@type": "WebSite",
      name: identity.name,
      url: identity.site,
      publisher: { "@id": personId },
    },
  ],
};

export default function Home() {
  return (
    <div className="profile-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section
        className="profile-home__intro"
        id="about"
        aria-labelledby="profile-title"
      >
        <img
          src="/work/nino.jpg"
          alt="Portrait of Nino Chavez"
          width="156"
          height="156"
          fetchPriority="high"
        />
        <div className="profile-home__identity">
          <h1 id="profile-title">Nino Chavez</h1>
          <p className="profile-home__lede">
            I’m a product architect in Chicago. Outside work, I run volleyball
            events, take photographs, write, and DJ.
          </p>
          <nav className="profile-home__quick-links" aria-label="Explore Nino’s work">
            <a href="https://ninochavez.co/blog/archive" target="_blank" rel="noopener noreferrer">
              <strong>Writing</strong>
              <small>Signal Dispatch</small>
              <span className="assistive-text"> (opens in a new tab)</span>
            </a>
            <a href="https://ninochavez.co/photography/albums" target="_blank" rel="noopener noreferrer">
              <strong>Photography</strong>
              <small>Volleyball and event galleries</small>
              <span className="assistive-text"> (opens in a new tab)</span>
            </a>
          </nav>
        </div>
      </section>

      <section
        className="profile-home__projects"
        id="projects"
        aria-labelledby="profile-projects-title"
      >
        <div className="profile-home__section-heading">
          <h2 id="profile-projects-title">Selected work</h2>
          <Link href="/work">View all projects</Link>
        </div>
        <ol className="profile-home__project-grid">
          <li className="profile-project">
            <a
              className="profile-project__image"
              href="https://apps.apple.com/us/app/minder-your-day/id6803974428"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/work/minder.jpg"
                alt="Minder app preview showing a fictional sample day"
                width="590"
                height="1278"
              />
            </a>
            <div className="profile-project__copy">
              <p className="profile-project__kind">iPhone app</p>
              <h3>
                <a
                  href="https://apps.apple.com/us/app/minder-your-day/id6803974428"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Minder
                  <span className="assistive-text"> (opens in a new tab)</span>
                </a>
              </h3>
              <p>Activities, tasks, and selected calendars in one view of your day.</p>
              <p className="profile-project__caption">
                Published app preview; fictional sample day.
              </p>
            </div>
          </li>
          <li className="profile-project">
            <a
              className="profile-project__image"
              href="https://rallyhq.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/work/rally-hq.webp"
                alt="Rally HQ tournament interface"
                width="1400"
                height="875"
                loading="lazy"
              />
            </a>
            <div className="profile-project__copy">
              <p className="profile-project__kind">Web app</p>
              <h3>
                <a
                  href="https://rallyhq.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Rally HQ
                  <span className="assistive-text"> (opens in a new tab)</span>
                </a>
              </h3>
              <p>Tournament registration, brackets, schedules, and live court scoring.</p>
            </div>
          </li>
          <li className="profile-project">
            <a
              className="profile-project__image"
              href="https://therotation.tv"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/work/rotation.png"
                alt="The Rotation schedule and must-watch match cards"
                width="1100"
                height="820"
                loading="lazy"
              />
            </a>
            <div className="profile-project__copy">
              <p className="profile-project__kind">Website</p>
              <h3>
                <a
                  href="https://therotation.tv"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Rotation
                  <span className="assistive-text"> (opens in a new tab)</span>
                </a>
              </h3>
              <p>Find college volleyball matches and where to watch them.</p>
            </div>
          </li>
        </ol>
      </section>

      <section
        className="profile-home__about"
        id="contact"
        aria-labelledby="profile-about-title"
      >
        <h2 id="profile-about-title">A little about me</h2>
        <div className="profile-home__biography">
          <p>
            I started in software engineering, moved through architecture and
            consulting, and now work as a Product Architect at commerce.com. I
            still prefer the part where a decision becomes a working system.
          </p>
          <p>
            Outside the day job, I run Let’s Pepper, build and operate Rally HQ,
            shoot volleyball through Flickday Media, publish Signal Dispatch, and
            keep a music practice on SoundCloud.
          </p>
          <p className="profile-home__about-actions">
            <Link href="/about">About</Link>
            <a href="mailto:nino@ninochavez.co">Get in touch</a>
          </p>
        </div>
      </section>
    </div>
  );
}
