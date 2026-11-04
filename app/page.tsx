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
    <div className="stream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="opening" aria-labelledby="photography-title">
        <div className="opening-copy">
          <p className="statement">I’m a <Link href="/work">product architect</Link> in Chicago. Outside work, I <a href="https://letspepper.com/" target="_blank" rel="noopener noreferrer">run volleyball events <span className="visually-hidden">(opens in a new tab)</span></a>, <a href="https://ninochavez.co/photography/albums" target="_blank" rel="noopener noreferrer">take photographs <span className="visually-hidden">(opens in a new tab)</span></a>, <a href="https://ninochavez.co/blog/archive" target="_blank" rel="noopener noreferrer">write <span className="visually-hidden">(opens in a new tab)</span></a>, and <a href="https://soundcloud.com/ni-no-cha-vez" target="_blank" rel="noopener noreferrer">DJ <span className="visually-hidden">(opens in a new tab)</span></a>.</p>
          <p className="opening-note">Writing and Photography open in their own sites.</p>
        </div>
        <a className="photo-link" href="https://ninochavez.co/photography/albums" target="_blank" rel="noopener noreferrer">
          <img src="/work/photography.webp" alt="Volleyball photograph" width="1080" height="1621" fetchPriority="high" />
          <span className="photo-line">
            <h2 id="photography-title">Photography</h2>
            <span className="external-note">Volleyball and event galleries <span className="visually-hidden">(opens in a new tab)</span></span>
          </span>
        </a>
      </section>

      <section className="writing" aria-labelledby="writing-title">
        <h2 id="writing-title">Writing</h2>
        <p><a href="https://ninochavez.co/blog/archive" target="_blank" rel="noopener noreferrer">Signal Dispatch <span className="visually-hidden">(opens in a new tab)</span></a><br />My writing: essays, guides, presentations, and fiction.</p>
      </section>

      <section id="projects" className="work" aria-labelledby="work-title">
        <h2 className="section-heading" id="work-title"><Link href="/work">Selected work</Link></h2>
        <article className="project project--tall">
          <div className="project-copy">
            <p className="project-kind">iPhone app</p>
            <h3><a href="https://apps.apple.com/us/app/minder-your-day/id6803974428" target="_blank" rel="noopener noreferrer">Minder <span className="visually-hidden">(opens in a new tab)</span></a></h3>
            <p>Activities, tasks, and selected calendars in one view of your day.</p>
            <p className="project-caption">Published app preview; fictional sample day.</p>
          </div>
          <a className="project-image" href="https://apps.apple.com/us/app/minder-your-day/id6803974428" target="_blank" rel="noopener noreferrer">
            <img src="/work/minder.jpg" alt="Minder app preview showing a fictional sample day" width="590" height="1278" loading="lazy" />
          </a>
        </article>
        <article className="project">
          <div className="project-copy">
            <p className="project-kind">Web app</p>
            <h3><a href="https://rallyhq.app" target="_blank" rel="noopener noreferrer">Rally HQ <span className="visually-hidden">(opens in a new tab)</span></a></h3>
            <p>Tournament registration, brackets, schedules, and live court scoring.</p>
          </div>
          <a className="project-image" href="https://rallyhq.app" target="_blank" rel="noopener noreferrer">
            <img src="/work/rally-hq.webp" alt="Rally HQ tournament interface" width="1400" height="875" loading="lazy" />
          </a>
        </article>
        <article className="project">
          <div className="project-copy">
            <p className="project-kind">Website</p>
            <h3><a href="https://therotation.tv" target="_blank" rel="noopener noreferrer">The Rotation <span className="visually-hidden">(opens in a new tab)</span></a></h3>
            <p>Find college volleyball matches and where to watch them.</p>
          </div>
          <a className="project-image" href="https://therotation.tv" target="_blank" rel="noopener noreferrer">
            <img src="/work/rotation.png" alt="The Rotation schedule and must-watch match cards" width="1100" height="820" loading="lazy" />
          </a>
        </article>
      </section>

      <section id="about" className="about" aria-labelledby="about-title">
        <img src="/work/nino.jpg" alt="Portrait of Nino Chavez" width="727" height="727" loading="lazy" />
        <div className="about-copy">
          <h2 id="about-title">A little about me</h2>
          <p>I started in software engineering, moved through architecture and consulting, and now work as a Product Architect at commerce.com. I still prefer the part where a decision becomes a working system.</p>
          <p>Outside the day job, I run Let’s Pepper, build and operate Rally HQ, shoot volleyball through Flickday Media, publish Signal Dispatch, and keep a music practice on SoundCloud.</p>
          <p className="about-actions"><Link href="/about">About</Link></p>
        </div>
      </section>

      <p id="contact" className="touch"><a href="mailto:nino@ninochavez.co">Get in touch</a></p>

      <footer className="site-footer">
        <p className="footer-name">Nino Chavez</p>
        <nav className="footer-nav" aria-label="More destinations">
          <ul>
            <li><Link href="/links">Links</Link></li>
            <li><Link href="/learn">Learn</Link></li>
            <li><Link href="/demos">Sessions</Link></li>
            <li><a href="https://soundcloud.com/ni-no-cha-vez" target="_blank" rel="noopener noreferrer">SoundCloud <span className="visually-hidden">(opens in a new tab)</span></a></li>
            <li><Link href="/privacy">Privacy</Link></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}
