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
      <section className="profile-home__intro" id="about" aria-labelledby="profile-title">
        <img
          src="/work/nino.jpg"
          alt="Portrait of Nino Chavez"
          width="156"
          height="156"
          fetchPriority="high"
        />
        <div>
          <p className="profile-home__eyebrow">Chicago</p>
          <h1 id="profile-title">Nino Chavez</h1>
          <p className="profile-home__lede">
            I’m a product architect in Chicago. Outside work, I run volleyball
            events, take photographs, write, and DJ.
          </p>
        </div>
      </section>

      <section className="profile-home__about" aria-labelledby="profile-about-title">
        <h2 id="profile-about-title">A little about me</h2>
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
        <p><Link href="/about">Read my full profile</Link>.</p>
      </section>

      <section className="profile-home__projects" id="projects" aria-labelledby="profile-projects-title">
        <p className="profile-home__eyebrow">Selected work</p>
        <h2 id="profile-projects-title">A few things I’ve made</h2>
        <ol>
          <li>
            <h3><a href="https://apps.apple.com/us/app/minder-your-day/id6803974428" target="_blank" rel="noopener noreferrer">Minder<span className="assistive-text"> (opens in a new tab)</span></a></h3>
            <p>Activities, tasks, and selected calendars in one view of your day.</p>
          </li>
          <li>
            <h3><a href="https://rallyhq.app" target="_blank" rel="noopener noreferrer">Rally HQ<span className="assistive-text"> (opens in a new tab)</span></a></h3>
            <p>Tournament registration, brackets, schedules, and live court scoring.</p>
          </li>
          <li>
            <h3><a href="https://therotation.tv" target="_blank" rel="noopener noreferrer">The Rotation<span className="assistive-text"> (opens in a new tab)</span></a></h3>
            <p>Find college volleyball matches and where to watch them.</p>
          </li>
        </ol>
        <p className="profile-home__all-projects"><Link href="/work">All projects</Link></p>
      </section>

      <section className="profile-home__contact" id="contact" aria-labelledby="profile-contact-title">
        <h2 id="profile-contact-title">Elsewhere</h2>
        <p>
          If you’d like to get in touch, <a href="mailto:nino@ninochavez.co">send me a note</a>.
          You can also find my writing at <a href="https://ninochavez.co/blog/archive">Signal Dispatch</a> and
          photographs at <a href="https://ninochavez.co/photography/albums">my photography site</a>.
        </p>
        <ul>
          <li><a href="mailto:nino@ninochavez.co">Email</a></li>
          <li><a href="https://www.linkedin.com/in/nino-chavez/" target="_blank" rel="noopener noreferrer">LinkedIn<span className="assistive-text"> (opens in a new tab)</span></a></li>
          <li><a href="https://github.com/nino-chavez" target="_blank" rel="noopener noreferrer">GitHub<span className="assistive-text"> (opens in a new tab)</span></a></li>
          <li><a href="https://soundcloud.com/ni-no-cha-vez" target="_blank" rel="noopener noreferrer">SoundCloud<span className="assistive-text"> (opens in a new tab)</span></a></li>
        </ul>
      </section>
    </div>
  );
}
