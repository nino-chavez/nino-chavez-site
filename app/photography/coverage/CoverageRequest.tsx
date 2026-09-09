"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { coverageOffer as offer, earliestCoverageDate } from "./offer";

const subscribeToHydration = () => () => {};

export function CoverageRequest() {
  const ready = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [receipt, setReceipt] = useState("");
  const [sending, setSending] = useState(false);
  const submission = useRef<{ id: string; payload: string } | null>(null);
  const started = useRef(false);
  const tracked = useRef(false);
  const [kind, setKind] = useState("");
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const preview = useRef<HTMLDivElement>(null);
  const minimum = earliestCoverageDate();
  const closed = minimum > offer.lastDate;

  function source() {
    const query = new URLSearchParams(window.location.search);
    return { source: query.get("utm_source") || query.get("src") || "", medium: query.get("utm_medium") || "", campaign: query.get("utm_campaign") || "", content: query.get("utm_content") || "", referrer: document.referrer };
  }

  function track(event: string) {
    // Measurement must never block an inquiry. No contact fields or browser IDs.
    void fetch("/api/coverage/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: crypto.randomUUID(), event, attribution: source() }), keepalive: true }).catch(() => {});
  }

  useEffect(() => {
    if (!tracked.current) { tracked.current = true; track("page_view"); if (window.location.hash === "#request") track("request_open"); }
    const onClick = (event: MouseEvent) => { if ((event.target as Element).closest('a[href="#request"]')) track("request_open"); };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
    // A page impression is tied to mounting, not input changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (receipt) preview.current?.focus(); }, [receipt]);

  async function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const date = String(values.date || "");
    if (date && (date < earliestCoverageDate() || date > offer.lastDate)) { setError("Choose an upcoming date between September 19 and December 31, 2026."); return; }
    const payload = JSON.stringify({ ...values, attribution: source() });
    // Retry an uncertain request with the same key; edits create a new request.
    if (submission.current?.payload !== payload) submission.current = { id: crypto.randomUUID(), payload };
    setSending(true); setError("");
    try {
      const response = await fetch("/api/coverage/requests", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...JSON.parse(payload), id: submission.current.id }), signal: AbortSignal.timeout(15000) });
      const result = await response.json() as { received?: boolean; reference?: string; error?: string };
      if (!response.ok || !result.received || typeof result.reference !== "string") throw new Error(result.error || "I could not confirm your request. Please try again.");
      setReceipt(result.reference);
    } catch (error) {
      track("submit_error");
      setError(error instanceof Error && error.name !== "TimeoutError" && error.name !== "TypeError" ? error.message : "I could not confirm your request. Your entries are still here. Try again or email nino@ninochavez.co.");
    } finally { setSending(false); }
  }

  if (closed) return <div className="coverage-request"><h2>Ask about a future event</h2><p>The current request window has ended.</p><a href={`mailto:${offer.email}?subject=Sports%20and%20event%20coverage`}>Email me about a future event</a></div>;

  return <div className="coverage-request">
    <h2>Request coverage</h2>
    <p>Start with the sport or event and a way to reach you. Date and venue can wait. I’ll reply by email about the package or a fixed quote. An inquiry does not reserve a date.</p>
    {!receipt && <form onSubmit={sendRequest} onChange={() => { setError(""); if (!started.current) { started.current = true; track("form_start"); } }}>
      <fieldset disabled={!ready || sending} className="coverage-form-fields">
      <legend className="assistive-text">Sports and event coverage request details</legend>
      <div className="coverage-honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="coverage-fields">
        <label className="coverage-wide">Coverage type<select name="kind" value={kind} onChange={(event) => setKind(event.target.value)} required><option value="" disabled>Choose coverage</option><option value="volleyball">Varsity volleyball match — ${offer.price} introductory rate</option><option value="sport">Other sport — fixed quote</option><option value="tournament">Tournament — fixed quote</option><option value="event">School or community event — fixed quote</option></select></label>
        <p className="coverage-wide coverage-type-note" role="status">{kind === "volleyball" ? `One team’s varsity match: $${offer.price} for up to ${offer.onsiteHours} hours on site; 10 edited preview photos within 24 hours. ${offer.deliverySummary}` : kind ? `I’ll confirm a fixed total, photo deliverables and turnaround for your event before booking. The $${offer.price} volleyball package does not apply to this request.` : "Choose the volleyball package or request a fixed quote for another sport or event."}</p>
        <label className="coverage-wide">Sport / event name<input name="activity" required maxLength={180} placeholder="Boys volleyball, basketball, school play…" /></label>
        <label className="coverage-wide">Reply email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
        <label>Your name<input name="name" autoComplete="name" required maxLength={100} /></label>
        <label>School / team / organization<input name="school" required maxLength={140} autoComplete="organization" /></label>
        <label>Event date <span>(optional)</span><input name="date" type="date" min={minimum} max={offer.lastDate} aria-describedby="coverage-date-help coverage-date-error" aria-invalid={!!dateError} onChange={(event) => { const value = event.currentTarget.value; setDateError(value && (value < minimum || value > offer.lastDate) ? "Choose an upcoming date between September 19 and December 31, 2026." : ""); }} onInvalid={(event) => { if (event.currentTarget.validity.rangeUnderflow || event.currentTarget.validity.rangeOverflow) setDateError("Choose an upcoming date between September 19 and December 31, 2026."); }} /><span id="coverage-date-error" className="coverage-error" role="alert">{dateError}</span></label>
        <label className="coverage-wide">Venue name and address <span>(optional)</span><input name="venue" maxLength={250} /></label>
        <label className="coverage-wide">What would you like the photos for? <span>(optional)</span><textarea name="notes" rows={3} maxLength={1200} placeholder="For example: team recaps, family downloads or a school publication. Include any photo restrictions or deadline." /></label>
      </div>
      <details className="coverage-optional"><summary>More event details (optional)</summary><div className="coverage-fields">
        <label>Your role<select name="role"><option value="">Choose role (optional)</option><option>Coach</option><option>Athletic office</option><option>Booster club</option><option>Team / club manager</option><option>Event organizer</option><option>Athlete / parent</option><option>Other</option></select></label>
        {(kind === "volleyball" || kind === "sport") && <label>Opponent <span>(optional)</span><input name="opponent" maxLength={140} /></label>}
        <label>Start time <span>(Central, optional)</span><input name="time" type="time" /></label>
        {kind && kind !== "volleyball" && <label className="coverage-wide">Coverage window / teams involved <span>(optional)</span><input name="duration" maxLength={200} placeholder="For example: 2–5 p.m., two teams, or one performance" /></label>}
        <label>Venue access approval<select name="access"><option>Not requested yet</option><option>I can approve access</option><option>Approved by the venue</option><option>I need an introduction</option></select></label>
        <label>Payment route<select name="payment"><option value="">Not decided yet</option><option>School / established organization — invoice in 30 days</option><option>Individual — deposit, balance when gallery is ready</option><option>School purchase order</option><option>Funding not confirmed yet</option></select></label>
      </div></details>
      <p id="coverage-date-help" className="coverage-help">Optional dates must be between September 19 and December 31, 2026 and are subject to availability.</p>
      <p id="coverage-error" role="alert" className="coverage-error">{error}</p>
      <button className="coverage-button" type="submit">{sending ? "Sending request…" : "Send coverage request"}</button>
      <p className="coverage-help">This sends your inquiry directly to me. I’ll reply by email to confirm availability and next steps. <a href="/privacy#coverage-requests">How I use your information</a>.</p>
      </fieldset>
    </form>}
    <noscript><p>To request coverage, email <a href={`mailto:${offer.email}`}>{offer.email}</a> with the sport or event, date, venue, coverage window and access contact.</p></noscript>
    {receipt && <div className="coverage-email" ref={preview} tabIndex={-1} role="status">
      <h3>Request received</h3>
      <p>Your inquiry has been saved. I’ll reply to the email you provided to confirm availability, coverage and price.</p>
      <p>{kind === "volleyball" ? "No date is booked yet. Booking follows written confirmation and access approval. Schools and established organizations reserve with an approved purchase order or signed agreement; individuals reserve with the deposit." : "No date is booked yet. Booking follows written confirmation, access approval and the payment terms in your fixed quote."}</p>
      <p className="coverage-help">Reference: {receipt}</p>
    </div>}
    <p className="coverage-direct">Prefer a direct email? <a href={`mailto:${offer.email}`}>{offer.email}</a></p>
  </div>;
}
