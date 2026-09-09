/* eslint-disable @next/next/no-img-element -- portfolio images use the existing Cloudflare Images delivery service. */
import type { Metadata } from "next";
import { CoverageRequest } from "./CoverageRequest";
import { coverageOffer as offer } from "./offer";
import "./coverage.css";

const coverageExamples = [
  {
    "title": "Volleyball",
    "caption": "Lewis vs. Lindenwood · College men",
    "alt": "A men’s volleyball player serving the ball",
    "href": "https://ninochavez.co/photography/albums/college-mvb-lewis-vs-lindenwood-04-02-2026-j0g2Hw",
    "image": "https://imagedelivery.net/wg34HB28-JkySWVm5fW4kA/DSC02295/medium"
  },
  {
    "title": "Basketball",
    "caption": "Aurora Central Catholic · Boys basketball",
    "alt": "Basketball players competing on an indoor court",
    "href": "https://ninochavez.co/photography/albums/acc-boys-basketball-08-dec-dec-9-QczZrc",
    "image": "https://imagedelivery.net/wg34HB28-JkySWVm5fW4kA/4QCsSkQ/medium"
  },
  {
    "title": "Soccer",
    "caption": "Dominican University · Women’s soccer",
    "alt": "A soccer player moving with the ball on the field",
    "href": "https://ninochavez.co/photography/albums/du-womens-soccer-14-oct-XTM6K3",
    "image": "https://imagedelivery.net/wg34HB28-JkySWVm5fW4kA/vRZ7gVt/medium"
  },
  {
    "title": "Golf",
    "caption": "Aurora Central Catholic · Boys golf",
    "alt": "A golfer swinging from tall grass",
    "href": "https://ninochavez.co/photography/albums/acc-boys-golf-sep-13-HtxsgN",
    "image": "https://imagedelivery.net/wg34HB28-JkySWVm5fW4kA/XvnSgvx/medium"
  },
  {
    "title": "Surfing",
    "caption": "Huntington Beach Pier",
    "alt": "A surfer carrying a board into the water",
    "href": "https://ninochavez.co/photography/albums/huntington-beach-pier-nov-2-NGNNJP",
    "image": "https://imagedelivery.net/wg34HB28-JkySWVm5fW4kA/ZNvDmRd/medium"
  },
  {
    "title": "School events",
    "caption": "Alice in Wonderland · ACC theater",
    "alt": "A performer on stage in a school theater production",
    "href": "https://ninochavez.co/photography/albums/acc-drama-alice-in-wonderland-nov-6-VFTwzS",
    "image": "https://imagedelivery.net/wg34HB28-JkySWVm5fW4kA/bKkWND9/medium"
  }
];

export const metadata: Metadata = {
  title: "Sports & event coverage",
  description: "Sports and event photography by Nino Chavez: volleyball, basketball, soccer, football, golf, bowling, surfing and school events. Based in Aurora, Illinois.",
  alternates: { canonical: "/photography/coverage" },
  openGraph: { title: "Sports & event coverage — Nino Chavez", description: "Sports, tournaments and school events. Explore real galleries and request photo coverage.", images: [{ url: "https://imagedelivery.net/wg34HB28-JkySWVm5fW4kA/fJKdsB-DSC08907/medium", alt: "Volleyball player diving for the ball" }] },
  twitter: { card: "summary_large_image", title: "Sports & event coverage — Nino Chavez", description: "Sports and event photography near Aurora. Volleyball match package: $350.", images: ["https://imagedelivery.net/wg34HB28-JkySWVm5fW4kA/fJKdsB-DSC08907/medium"] },
};

export default function SportsEventCoverage() {
  return <div className="coverage-page">
    <div className="coverage-shell">
      <nav className="coverage-breadcrumb" aria-label="Breadcrumb"><a href="/photography">Photography</a><span aria-hidden="true">/</span><span>Sports & event coverage</span></nav>
      <header className="coverage-opening">
        <div className="coverage-intro">
          <p className="coverage-eyebrow">Teams · Tournaments · School &amp; community events</p>
          <h1>Sports &amp; event<br />coverage.</h1>
          <p className="coverage-lead">Photos for your team’s recap, school publications and family keepsakes.</p>
          <p className="coverage-mobile-offer"><span>Varsity volleyball · ${offer.price}</span><a href="#request">Request coverage →</a></p>
          <figure className="coverage-featured">
            <a className="coverage-featured-photos" href={offer.gallery} target="_blank" rel="noopener noreferrer"><img src="https://imagedelivery.net/wg34HB28-JkySWVm5fW4kA/fJKdsB-DSC08907/medium" alt="A high school volleyball player diving to reach the ball" width={800} height={1199} fetchPriority="high" /><img src="https://imagedelivery.net/wg34HB28-JkySWVm5fW4kA/fJKdsB-DSC08793/medium" alt="Volleyball teammates gathering for a photo beside the court" width={800} height={1199} /></a>
            <figcaption><a href={offer.gallery} target="_blank" rel="noopener noreferrer">JCA vs. Plainfield North · View match photos ↗</a><span>Portfolio example. This larger gallery is not the quantity included in the $350 package.</span></figcaption>
          </figure>
          <p>I photograph athletes, teams and the people around them—from school and college competition to club tournaments, outdoor sports and school events.</p>
          <p className="coverage-availability">Available beginning September 19, 2026</p>
        </div>
        <aside className="coverage-price" aria-label="Volleyball match package price">
          <p className="coverage-eyebrow">Volleyball match package</p>
          <p>One team · One varsity match · Up to {offer.onsiteHours} hours on site</p>
          <p className="coverage-amount">${offer.price}<span>per match</span></p>
          <p>Edited photos and downloads included.</p>
          <dl><div><dt>First delivery</dt><dd>{offer.previewPhotos} edited preview photos within 24 hours</dd></div><div><dt>Full gallery</dt><dd>Edited within {offer.galleryDays} calendar days</dd></div></dl>
          <a className="coverage-button" href="#request">Request coverage <span aria-hidden="true">→</span></a>
          <p className="coverage-price-note">Local travel included. School approval required.</p>
          <p className="coverage-price-note">$175 deposit after written confirmation; $175 balance due on match day. Gallery release follows payment or an agreed school purchase order. <a href="#coverage-payment">Payment details</a>.</p>
          <p className="coverage-price-note">Other sports, tournaments and events: a fixed quote before booking.</p>
        </aside>
      </header>
      <section className="coverage-work" aria-labelledby="coverage-work-title">
        <div className="coverage-work-heading"><h2 id="coverage-work-title">Different sports. The same eye.</h2><a href="https://ninochavez.co/photography/albums" target="_blank" rel="noopener noreferrer">Explore all galleries <span aria-hidden="true">↗</span></a></div>
        <div className="coverage-gallery-grid">
          {coverageExamples.map((example) => <a key={example.title} className="coverage-example" href={example.href} target="_blank" rel="noopener noreferrer">
            <img src={example.image} alt={example.alt} width={600} height={900} loading="lazy" />
            <strong>{example.title}</strong><span>{example.caption}</span><small>View gallery <span aria-hidden="true">↗</span></small>
          </a>)}
        </div>
        <p className="coverage-caption">More from the archive: <a href="https://ninochavez.co/photography/albums/acc-football-homecoming-sep-23-Dfg7TD" target="_blank" rel="noopener noreferrer">football</a>, <a href="https://ninochavez.co/photography/albums/du-womens-bowling-08-nov-nov-9-c5zHhc" target="_blank" rel="noopener noreferrer">bowling</a>, <a href="https://ninochavez.co/photography/albums/sure-shot-pickleball-facility-dec-24-kgCfkn" target="_blank" rel="noopener noreferrer">pickleball</a> and <a href="https://ninochavez.co/photography/albums/acc-college-athletics-signing-rcT8hR" target="_blank" rel="noopener noreferrer">athletics signings</a>.</p>
      </section>
      <section className="coverage-scope" aria-labelledby="coverage-scope-title">
        <div><p className="coverage-eyebrow">Current season · Girls high school volleyball</p><h2 id="coverage-scope-title">The $350<br />match package.</h2><p>This package covers one team’s varsity volleyball match, girls or boys. Girls season is the current local focus.</p><p>Use the next-day photos for a match recap, then share the gallery with your team and families. Families can download the delivered photos without a separate purchase.</p><a href={offer.gallery} target="_blank" rel="noopener noreferrer">See JCA vs. Plainfield North <span aria-hidden="true">↗</span></a><p className="coverage-caption">Portfolio example; its larger photo count is not the package quantity.</p></div>
        <dl className="coverage-inclusions">
          <div><dt>One varsity match</dt><dd>I arrive 20 minutes before the confirmed varsity start. Coverage includes warm-ups, match action, celebrations and bench reactions, through the final point within a {offer.onsiteHours}-hour on-site window. That window starts at the agreed arrival time and includes delays. Any extension needs a separate agreement; there are no automatic overtime charges.</dd></div>
          <div><dt>{offer.previewPhotos} edited preview photos within 24 hours</dt><dd>Selected, edited still photos ready for a recap or team post. They are part of the full gallery, not an additional set.</dd></div>
          <div><dt>A curated gallery, edited within {offer.galleryDays} days</dt><dd>Plan for around {offer.typicalGallery} edited photos, including the previews. This is a package estimate, not a guaranteed count. A short match may produce fewer; individual player counts are not guaranteed. The gallery is released after the balance is paid or under an agreed school purchase order.</dd></div>
          <div><dt>Downloads and sharing</dt><dd>High-resolution JPEGs for school and team websites, social posts, newsletters, yearbooks and family personal use. Digital downloads are included; prints and raw files are not part of this package.</dd></div>
          <div><dt>Local travel</dt><dd>Travel within a 45-minute drive of Aurora (60504) is included. I confirm the venue with your match date before accepting the booking.</dd></div>
        </dl>
      </section>
      <section className="coverage-details" aria-labelledby="coverage-details-title">
        <header><p className="coverage-eyebrow">Before we book</p><h2 id="coverage-details-title">Booking and<br />photo use.</h2></header>
        <div className="coverage-terms">
          <details id="coverage-payment" open><summary>How do payment and booking work?</summary><p>For the volleyball match package, the price is ${offer.price}. A ${offer.deposit} deposit reserves the date after written confirmation and school access approval. The remaining ${offer.price - offer.deposit} is due on match day.</p><p>The ten previews are delivered within 24 hours. The full gallery is edited within five calendar days of the match and released once the balance is paid. Late payment delays gallery access, not editing. If your school uses a purchase order, we agree in writing on invoice due dates and gallery release before booking; those agreed dates replace the standard payment and release terms.</p></details>
          <details><summary>What if the match or photography booking is canceled?</summary><p>If the sporting event is canceled or postponed before I begin travel, you can transfer payments to an available date or receive a full refund. This event-cancellation rule applies even within 48 hours and even when the school is the paying client.</p><p>If the match goes ahead but you cancel the photography booking, payments are refundable at least 48 hours before the agreed arrival time. Inside 48 hours, the $175 deposit is retained and any balance already paid is refunded.</p><p>If the event is canceled after I begin travel but before the first serve, the total charge is $175; any balance paid is refunded. Once play begins, the $350 fee applies even if the match is stopped early. Any edited photos from an interrupted assignment are delivered under the usual editing and payment terms, with up to ten previews in 24 hours if enough usable images were captured. A replacement date is a separate booking.</p><p>If I cancel the assignment, all payments are refunded.</p></details>
          <details><summary>What happens if the match runs late?</summary><p>The package includes up to {offer.onsiteHours} hours on site, starting 20 minutes before the confirmed varsity start. Delays and interruptions count toward that window. I’ll check with the booking contact before it ends. If I’m available, we can agree in writing on an extension and its total price before any extra coverage. Otherwise, coverage ends at the agreed time with no extra charge. If play never begins during the window, the total charge is $175; once play begins, the $350 fee applies. The interrupted-assignment delivery terms above apply.</p></details>
          <details><summary>Who approves access and photo sharing?</summary><p>A school or venue representative must approve my shooting positions and access. Before the event, we confirm any participant photo restrictions, how the gallery will be shared, and whether I may show images publicly. Venue access and a paid booking are confirmed separately.</p></details>
          <details><summary>How are other sports and events priced?</summary><p>Send the sport or event, venue, date and coverage window. I’ll reply with a fixed price, the photo deliverables, delivery dates and payment terms before you book. The $350 price and the terms above apply to the volleyball match package; a tournament day, football game or performance has its own scope.</p></details>
          <details><summary>Are preview photos video clips?</summary><p>Preview photos are edited still images. The volleyball package includes ten within 24 hours. {offer.deliverySummary} Video and posed portrait sessions are separate requests; they are not included in this photo package.</p></details>
          <details><summary>Can a sponsor or business use the photos?</summary><p>The volleyball package includes school, team and family use. For other coverage, I confirm permitted uses in the quote. Paid advertising, sponsor campaigns, resale and merchandise require a separate written agreement.</p></details>
        </div>
      </section>
      <section id="request" className="coverage-booking" aria-label="Request sports or event coverage">
        <div className="coverage-booking-intro"><p className="coverage-eyebrow">Your next game or event</p><h2>Let’s talk<br />coverage.</h2><p>I’m based in Aurora. Tell me what you’d like photographed and who the photos are for. You can inquire before choosing a date or confirming funding and access.</p><p>Coverage begins September 19, 2026. If you have a date, include it; otherwise leave it blank. Email me about events after December 31. Every booking needs confirmation.</p><a href={offer.gallery} target="_blank" rel="noopener noreferrer">See a volleyball portfolio example <span aria-hidden="true">↗</span></a></div>
        <CoverageRequest />
      </section>
    </div>
  </div>;
}
