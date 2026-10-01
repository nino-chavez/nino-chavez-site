import Link from "next/link";

export const metadata = {
  alternates: { canonical: "https://ninochavez.co/" },
};

function DestinationArrow() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>;
}

export default function Home() {
  return (
    <div className="field-home">
      <section className="field-opening" aria-labelledby="practice-title">
        <picture>
          <source media="(max-width: 640px)" srcSet="/images/home-hero-frame-narrow.webp" />
          <img src="/images/home-hero-frame.webp" alt="Beach volleyball, photographed by Nino Chavez" width="2400" height="1600" fetchPriority="high" />
        </picture>
        <div className="field-opening__shade" aria-hidden="true" />
        <div className="field-opening__copy">
          <h1 id="practice-title"><span>Nino </span><span>Chavez</span></h1>
          <p>I design products, build the software behind them, and run them in the real world.</p>
          <a href="#selected-work">Selected work <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section id="selected-work" className="field-paths" aria-label="Selected work">
        <Link className="field-path field-path--building" href="/work">
          <img src="/work/rally-hq.webp" alt="Rally HQ tournament interface" width="1200" height="800" loading="lazy" />
          <div><h2>Building <DestinationArrow /></h2><p>Products, tools and studies</p><p className="field-path__detail">Minder, The Rotation, Rally HQ and more</p></div>
        </Link>
        <Link className="field-path field-path--writing" href="/blog">
          <img src="/work/writing-field.webp" alt="AI-generated illustration from Signal Dispatch" width="1200" height="800" loading="lazy" />
          <div><h2>Writing <DestinationArrow /></h2><p>Signal Dispatch</p><p className="field-path__detail">Essays and field notes</p></div>
        </Link>
        <Link className="field-path field-path--photography" href="/photography">
          <img src="/work/photography.webp" alt="Volleyball player preparing to serve" width="1200" height="800" loading="lazy" />
          <div><h2>Photography <DestinationArrow /></h2><p>Volleyball and action sports</p></div>
        </Link>
      </section>
    </div>
  );
}
