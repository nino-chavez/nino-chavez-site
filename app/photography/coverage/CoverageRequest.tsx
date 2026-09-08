"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { coverageOffer as offer, earliestCoverageDate } from "./offer";

const subscribeToHydration = () => () => {};

export function CoverageRequest() {
  const ready = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [draft, setDraft] = useState("");
  const [kind, setKind] = useState("");
  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const preview = useRef<HTMLDivElement>(null);
  const minimum = earliestCoverageDate();
  const closed = minimum > offer.lastDate;

  // Before hydration, the disabled fieldset prevents native GET submission of contact details.
  useEffect(() => { if (draft) preview.current?.focus(); }, [draft]);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const read = (key: string) => String(data.get(key) ?? "").trim();
    const date = read("date");
    if (date < earliestCoverageDate() || date > offer.lastDate) {
      setDateError("Choose an upcoming date between September 19 and December 31, 2026.");
      setError("Choose an upcoming date between September 19 and December 31, 2026.");
      return;
    }
    if (!read("school") || !read("name") || !read("venue")) {
      setError("Enter your name, organization and venue so I can check the request.");
      return;
    }
    if (!read("activity")) {
      setError("Enter the sport or event name.");
      return;
    }
    if (read("kind") !== "volleyball" && !read("duration")) {
      setError("Enter the coverage window and teams or event involved.");
      return;
    }
    setError("");
    setDateError("");
    const dateLabel = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(new Date(date + "T12:00:00Z"));
    const isMatchPackage = read("kind") === "volleyball";
    const requestTypes: Record<string, string> = { volleyball: "Volleyball match package", sport: "Other sport", tournament: "Tournament", event: "School or community event" };
    const requestType = requestTypes[read("kind")] ?? "Coverage";
    setSubject(`${read("school")} — ${read("activity")} coverage — ${dateLabel}`);
    const scope = isMatchPackage
      ? `I'd like to request the $${offer.price} varsity volleyball match photography package.\n\nIncluded: one team's full varsity match and 20 minutes of warm-up coverage; ${offer.previewPhotos} edited preview photos within 24 hours; full curated gallery within ${offer.galleryDays} calendar days (typically ${offer.typicalGallery} photos, including the previews); school/team and family personal downloads.`
      : "I'd like a fixed quote for photo coverage. Please confirm the total price, included deliverables, delivery dates and booking terms before I commit.";
    setDraft(`Hi Nino,\n\n${scope}\n\nRequest type: ${requestType}\nSport / event: ${read("activity")}\nSchool / team / organization: ${read("school")}\nContact: ${read("name")} (${read("role") || "Role not provided"})\nDate: ${dateLabel}\nStart time (Central): ${read("time") || "To be confirmed"}\nCoverage window / number of teams: ${read("duration") || "One team's varsity volleyball match"}\nOpponent: ${read("opponent") || "Not provided"}\nVenue / address: ${read("venue")}\nAccess approval: ${read("access")}\nPayment route: ${read("payment")}\n\nI understand that this is a request, and the date is reserved only after written confirmation, access approval and the agreed payment arrangement.\n\nIntended use / photo or publication restrictions: ${read("notes") || "Not provided yet"}\n\nThanks,\n${read("name")}`);
    setCopyStatus("");
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(`To: ${offer.email}\nSubject: ${subject}\n\n${draft}`);
      setCopyStatus("Copied. Paste this into an email to nino@ninochavez.co.");
    } catch {
      setCopyStatus("Copy is unavailable here. Select and copy the email text below.");
    }
  }

  if (closed) return <div className="coverage-request"><h2>Ask about a future event</h2><p>The current request window has ended.</p><a href={`mailto:${offer.email}?subject=Sports%20and%20event%20coverage`}>Email me about a future event</a></div>;

  return <div className="coverage-request">
    <h2>Request coverage</h2>
    <p>Tell me what you need photographed. I’ll confirm availability and either the match package or a fixed quote. A request does not reserve a date.</p>
    <form onSubmit={prepare} onChange={() => { setDraft(""); setCopyStatus(""); setError(""); }}>
      <fieldset disabled={!ready} className="coverage-form-fields">
      <legend className="assistive-text">Sports and event coverage request details</legend>
      <div className="coverage-fields">
        <label className="coverage-wide">Coverage type<select name="kind" value={kind} onChange={(event) => setKind(event.target.value)} required><option value="" disabled>Choose coverage</option><option value="volleyball">Varsity volleyball match — $350</option><option value="sport">Other sport — fixed quote</option><option value="tournament">Tournament — fixed quote</option><option value="event">School or community event — fixed quote</option></select></label>
        <p className="coverage-wide coverage-type-note" role="status">{kind === "volleyball" ? "One team’s varsity volleyball match: $350, ten preview photos within 24 hours, full gallery within five calendar days." : kind ? "I’ll confirm a fixed total, photo deliverables and turnaround for your event before booking. The $350 volleyball package does not apply to this request." : "Choose the volleyball package or request a fixed quote for another sport or event."}</p>
        <label className="coverage-wide">Sport / event name<input name="activity" required maxLength={180} placeholder="Boys volleyball, basketball, school play…" /></label>
        <label>Your name<input name="name" autoComplete="name" required maxLength={100} /></label>
        <label>Your role<select name="role"><option value="">Choose role (optional)</option><option>Coach</option><option>Athletic office</option><option>Booster club</option><option>Team / club manager</option><option>Event organizer</option><option>Athlete / parent</option><option>Other</option></select></label>
        <label>School / team / organization<input name="school" required maxLength={140} autoComplete="organization" /></label>
        {(kind === "volleyball" || kind === "sport") && <label>Opponent <span>(optional)</span><input name="opponent" maxLength={140} /></label>}
        <label>Event date<input name="date" type="date" min={minimum} max={offer.lastDate} required aria-describedby="coverage-date-help coverage-date-error" aria-invalid={!!dateError} onChange={(event) => { const value = event.currentTarget.value; setDateError(value && (value < minimum || value > offer.lastDate) ? "Choose an upcoming date between September 19 and December 31, 2026." : ""); }} onInvalid={(event) => { if (event.currentTarget.validity.rangeUnderflow || event.currentTarget.validity.rangeOverflow) setDateError("Choose an upcoming date between September 19 and December 31, 2026."); }} /><span id="coverage-date-error" className="coverage-error" role="alert">{dateError}</span></label>
        <label>Start time <span>(Central, optional)</span><input name="time" type="time" /></label>
        {kind && kind !== "volleyball" && <label className="coverage-wide">Coverage window / teams involved<input name="duration" required maxLength={200} placeholder="For example: 2–5 p.m., two teams, or one performance" /></label>}
        <label className="coverage-wide">Venue name and address<input name="venue" required maxLength={250} /></label>
        <label>Venue access approval<select name="access"><option>Not requested yet</option><option>I can approve access</option><option>Approved by the venue</option><option>I need an introduction</option></select></label>
        <label>Payment route<select name="payment"><option>Team / organization invoice</option><option>Personal invoice</option><option>School purchase order</option><option>Funding not confirmed yet</option></select></label>
        <label className="coverage-wide">Intended use or publication restrictions <span>(optional)</span><textarea name="notes" rows={3} maxLength={1200} placeholder="Where will the photos be used? Include any photo restrictions or delivery deadline." /></label>
      </div>
      <p id="coverage-date-help" className="coverage-help">Coverage begins September 19, 2026. Exact dates are subject to availability.</p>
      <p id="coverage-error" role="alert" className="coverage-error">{error}</p>
      <button className="coverage-button" type="submit">Prepare email</button>
      <p className="coverage-help">This prepares a message for your email app. Nothing is sent from this page.</p>
      </fieldset>
    </form>
    <noscript><p>To request coverage, email <a href={`mailto:${offer.email}`}>{offer.email}</a> with the sport or event, date, venue, coverage window and access contact.</p></noscript>
    {draft && <div className="coverage-email" ref={preview} tabIndex={-1}>
      <h3>Review your email</h3>
      <p>To: <a href={`mailto:${offer.email}`}>{offer.email}</a><br />Subject: {subject}</p>
      <label htmlFor="coverage-email-text">Prepared message</label>
      <textarea id="coverage-email-text" value={draft} readOnly rows={12} />
      <div className="coverage-email-actions">
        <a className="coverage-button" href={`mailto:${offer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(draft)}`}>Open email draft</a>
        <button type="button" className="coverage-secondary" onClick={copyDraft}>Copy email</button>
      </div>
      <p role="status">{copyStatus || "Send the message from your email app to complete the request."}</p>
    </div>}
    <p className="coverage-direct">Prefer a direct email? <a href={`mailto:${offer.email}`}>{offer.email}</a></p>
  </div>;
}
