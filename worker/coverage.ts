import { coverageOffer, earliestCoverageDate } from '../app/photography/coverage/offer.ts';

type CoverageEnv = Pick<Cloudflare.Env, 'COVERAGE_DB' | 'COVERAGE_EMAIL' | 'COVERAGE_LIMIT' | 'COVERAGE_NOTIFY_TO'>;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const kinds = ['volleyball', 'sport', 'tournament', 'event'];
const events = ['page_view', 'request_open', 'form_start', 'submit_error'];
const limits: Record<string, number> = { kind: 20, activity: 180, name: 100, email: 254, role: 80, school: 140, opponent: 140, date: 10, time: 5, duration: 200, venue: 250, access: 80, payment: 80, notes: 1200 };
const required = ['kind', 'activity', 'name', 'email', 'school'];
export class InputError extends Error {}

export function normalizeLead(input: Record<string, unknown>, now = new Date()) {
  const fields: Record<string, string> = {};
  for (const [key, max] of Object.entries(limits)) {
    const value = typeof input[key] === 'string' ? input[key].trim() : '';
    if (value.length > max || (key !== 'notes' && /[\r\n\x00-\x1f]/.test(value))) throw new InputError(`Check the ${key} field.`);
    fields[key] = value;
  }
  if (required.some(key => !fields[key])) throw new InputError('Complete the required fields, including your reply email.');
  if (!kinds.includes(fields.kind)) throw new InputError('Choose a coverage type.');
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) throw new InputError('Enter a valid reply email.');
  if (earliestCoverageDate(now) > coverageOffer.lastDate) throw new InputError('The current request window has ended. Please email nino@ninochavez.co.');
  const parsedDate = new Date(`${fields.date}T12:00:00Z`);
  if (fields.date && (!Number.isFinite(parsedDate.getTime()) || !/^\d{4}-\d{2}-\d{2}$/.test(fields.date) || fields.date < earliestCoverageDate(now) || fields.date > coverageOffer.lastDate || parsedDate.toISOString().slice(0, 10) !== fields.date)) throw new InputError('Choose an upcoming date between September 19 and December 31, 2026.');
  if (fields.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(fields.time)) throw new InputError('Check the start time.');
  if (fields.kind === 'volleyball') fields.duration = "One team's varsity volleyball match";
  if (fields.kind === 'event' || fields.kind === 'tournament') fields.opponent = '';
  return fields;
}

export function attribution(input: unknown) {
  const data = input && typeof input === 'object' ? input as Record<string, unknown> : {};
  const clean = (key: string) => typeof data[key] === 'string' && /^[a-z0-9_.-]{1,100}$/i.test(data[key]) ? data[key] : '';
  let referrer = '';
  try { const url = new URL(String(data.referrer || '')); if (['http:', 'https:'].includes(url.protocol)) referrer = url.hostname.slice(0, 200); } catch {}
  return { source: clean('source'), medium: clean('medium'), campaign: clean('campaign'), content: clean('content'), referrer };
}

async function readBody(request: Request) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new InputError('Use the coverage request form.');
  const reader = request.body?.getReader();
  if (!reader) throw new InputError('Complete the coverage request.');
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > 16000) { await reader.cancel(); throw new InputError('The request is too long. Shorten the notes and try again.'); } chunks.push(value); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  let body;
  try { body = JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new InputError('The request could not be read. Please try again.'); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new InputError('Complete the coverage request.');
  return body as Record<string, unknown>;
}
const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });

export async function handleCoverage(request: Request, env: CoverageEnv, ctx: Pick<ExecutionContext, 'waitUntil'>) {
  const isEvent = new URL(request.url).pathname === '/api/coverage/events';
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  const origin = request.headers.get('origin');
  if (origin !== new URL(request.url).origin) return json({ error: 'Submit from the coverage page.' }, 403);
  if (!env.COVERAGE_DB || !env.COVERAGE_LIMIT || !env.COVERAGE_EMAIL || !env.COVERAGE_NOTIFY_TO) return json({ error: 'Online requests are temporarily unavailable. Please email nino@ninochavez.co.' }, 503);
  try {
    const allowed = await env.COVERAGE_LIMIT.limit({ key: `${isEvent ? 'event' : 'lead'}:${request.headers.get('CF-Connecting-IP') || 'local'}` });
    if (!allowed.success) return json({ error: 'Please wait a minute before trying again.' }, 429);
    const input = await readBody(request);
    if (input.website) return json({ error: 'Please email nino@ninochavez.co to request coverage.' }, 400);
    if (typeof input.id !== 'string' || !uuid.test(input.id)) throw new InputError('Refresh the page and try again.');
    const source = attribution(input.attribution);
    if (isEvent) {
      if (!events.includes(String(input.event))) throw new InputError('Unknown event.');
      await env.COVERAGE_DB.prepare('INSERT OR IGNORE INTO coverage_events(id,event,source,medium,campaign) VALUES(?,?,?,?,?)').bind(input.id, input.event, source.source, source.medium, source.campaign).run();
      return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
    }
    const fields = normalizeLead(input);
    // The server owns commercial terms; caller-supplied prices are never accepted.
    const offer = fields.kind === 'volleyball' ? { price: coverageOffer.price, individualDeposit: coverageOffer.individualDeposit, organizationDeposit: 0, organizationPaymentDays: coverageOffer.organizationPaymentDays, previewPhotos: coverageOffer.previewPhotos, galleryDays: coverageOffer.galleryDays, typicalGallery: coverageOffer.typicalGallery, onsiteHours: coverageOffer.onsiteHours, deliverySummary: coverageOffer.deliverySummary } : { pricing: 'fixed quote before booking' };
    const payload = JSON.stringify({ ...fields, offer });
    const hashBytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload));
    const hash = Array.from(new Uint8Array(hashBytes), b => b.toString(16).padStart(2, '0')).join('');
    await env.COVERAGE_DB.prepare('INSERT OR IGNORE INTO coverage_leads(id,payload_hash,email,kind,event_date,payload_json,source,medium,campaign,content,referrer_host) VALUES(?,?,?,?,?,?,?,?,?,?,?)')
      .bind(input.id, hash, fields.email, fields.kind, fields.date, payload, source.source, source.medium, source.campaign, source.content, source.referrer).run();
    const saved = await env.COVERAGE_DB.prepare('SELECT payload_hash FROM coverage_leads WHERE id=?').bind(input.id).first<{payload_hash: string}>();
    if (!saved || saved.payload_hash !== hash) return json({ error: 'This request changed after a previous attempt. Refresh before sending a different request.' }, 409);
    ctx.waitUntil(notifyLead(env, input.id));
    return json({ received: true, reference: input.id }, 201);
  } catch (error) {
    if (error instanceof InputError) return json({ error: error.message }, 400);
    console.error('coverage_request_failed'); // Do not log contact details or body contents.
    return json({ error: 'I could not confirm your request. Your entries are still here. Try again or email nino@ninochavez.co.' }, 503);
  }
}

export function notificationText(id: string, payload: Record<string, unknown>, source: string, campaign: string) {
  const savedOffer = payload.offer as Record<string, unknown> | undefined;
  const deliverySummary = typeof savedOffer?.deliverySummary === 'string' ? savedOffer.deliverySummary : coverageOffer.deliverySummary;
  const terms = payload.kind === 'volleyball' ? `$350 varsity volleyball package; up to ${coverageOffer.onsiteHours} hours on site; 10 preview photos within 24 hours. ${deliverySummary}` : 'Fixed quote requested. Price, deliverables and turnaround require confirmation.';
  return `New coverage inquiry\nReference: ${id}\n\n${terms}\n\n${Object.keys(limits).map(key => `${key}: ${payload[key] || 'Not provided'}`).join('\n')}\n\nSource: ${source || 'direct / unknown'}\nCampaign: ${campaign || 'none'}\n\nReply to this email to reach the person requesting coverage. This is an inquiry, not a confirmed booking.`;
}

export async function notifyLead(env: CoverageEnv, id: string) {
  if (!env.COVERAGE_DB || !env.COVERAGE_EMAIL || !env.COVERAGE_NOTIFY_TO) return;
  const now = Math.floor(Date.now() / 1000);
  // Atomic lease prevents the submit handler and scheduled retry sending concurrently.
  const lead = await env.COVERAGE_DB.prepare(`UPDATE coverage_leads SET notification_status='sending', notification_attempts=notification_attempts+1, notification_next_at=? WHERE id=? AND notification_status!='sent' AND notification_attempts<12 AND notification_next_at<=? RETURNING *`)
    .bind(now + 300, id, now).first<{id: string; payload_json: string; email: string; source: string; campaign: string; notification_attempts: number}>();
  if (!lead) return;
  try {
    const payload = JSON.parse(lead.payload_json);
    const text = notificationText(id, payload, lead.source, lead.campaign);
    const html = `<pre style="white-space:pre-wrap;font:15px/1.5 sans-serif">${text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')}</pre>`;
    const result = await env.COVERAGE_EMAIL.send({ to: env.COVERAGE_NOTIFY_TO, from: 'requests@ninochavez.co', replyTo: lead.email, subject: `Coverage inquiry: ${payload.school} — ${payload.activity} [${id.slice(0, 8)}]`, text, html });
    await env.COVERAGE_DB.prepare("UPDATE coverage_leads SET notification_status='sent', notification_id=?, notification_error=NULL WHERE id=?").bind(result.messageId, id).run();
  } catch {
    await env.COVERAGE_DB.prepare("UPDATE coverage_leads SET notification_status='failed', notification_error='Email provider did not confirm acceptance', notification_next_at=? WHERE id=?").bind(now + Math.min(3600, 60 * 2 ** lead.notification_attempts), id).run();
    console.error('coverage_notification_pending', id);
  }
}

export async function retryNotifications(env: CoverageEnv) {
  if (!env.COVERAGE_DB) return;
  const { results } = await env.COVERAGE_DB.prepare("SELECT id FROM coverage_leads WHERE notification_status!='sent' AND notification_attempts<12 AND notification_next_at<=? ORDER BY created_at LIMIT 10").bind(Math.floor(Date.now() / 1000)).all<{id: string}>();
  for (const row of results) await notifyLead(env, row.id);
  // Anonymous event rows expire; saved inquiries remain available for follow-up.
  await env.COVERAGE_DB.prepare("DELETE FROM coverage_events WHERE created_at < strftime('%Y-%m-%dT%H:%M:%fZ','now','-90 days')").run();
}
