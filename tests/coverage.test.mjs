import assert from 'node:assert/strict';
import test, { mock } from 'node:test';
mock.timers.enable({ apis: ['Date'], now: new Date('2026-09-08T12:00:00Z') });
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { handleCoverage, retryNotifications, attribution } from '../worker/coverage.ts';

const sample = () => ({ id: crypto.randomUUID(), kind: 'volleyball', activity: 'Girls volleyball', name: 'Coverage Test', email: 'admin@ninochavez.co', school: 'Test School', date: '2026-09-22', venue: 'Test venue, Aurora', website: '', attribution: { source: 'coach-outreach', medium: 'email', campaign: 'fall-2026' } });
function fixture() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(readFileSync(new URL('../migrations/coverage/0001_leads.sql', import.meta.url), 'utf8'));
  const database = { prepare(sql) { let args = []; return { bind(...values) { args = values; return this; }, async run() { return { meta: sqlite.prepare(sql).run(...args) }; }, async first() { return sqlite.prepare(sql).get(...args) || null; }, async all() { return { results: sqlite.prepare(sql).all(...args) }; } }; } };
  const messages = [], pending = [];
  const env = { COVERAGE_DB: database, COVERAGE_LIMIT: { limit: async () => ({ success: true }) }, COVERAGE_NOTIFY_TO: 'nino@ninochavez.co', COVERAGE_EMAIL: { send: async message => { messages.push(message); return { messageId: 'test-message-id' }; } } };
  const context = { waitUntil(promise) { pending.push(promise); } };
  async function post(input, options = {}) {
    return handleCoverage(new Request('https://ninochavez.co/api/coverage/' + (options.event ? 'events' : 'requests'), { method: options.method || 'POST', headers: { origin: options.origin || 'https://ninochavez.co', 'content-type': 'application/json' }, ...(options.method === 'GET' ? {} : { body: JSON.stringify(input) }) }), env, context);
  }
  return { sqlite, env, messages, pending, post };
}

test('saves the inquiry and attribution before notification; duplicate retry sends once', async () => {
  const f = fixture(), body = sample();
  const response = await f.post(body);
  assert.equal(response.status, 201); assert.equal((await response.json()).reference, body.id);
  assert.equal(f.sqlite.prepare('SELECT count(*) AS n FROM coverage_leads').get().n, 1);
  await Promise.all(f.pending);
  assert.equal((await f.post(body)).status, 201); await Promise.all(f.pending);
  assert.equal(f.messages.length, 1); assert.equal(f.messages[0].to, 'nino@ninochavez.co'); assert.equal(f.messages[0].replyTo, body.email);
  assert.match(f.messages[0].text, /10 preview photos/); assert.match(f.messages[0].text, /5 calendar days/);
  const row = f.sqlite.prepare('SELECT * FROM coverage_leads').get(); assert.equal(row.source, 'coach-outreach'); assert.equal(row.notification_status, 'sent');
  assert.equal((await f.post({ ...body, school: 'Different school' })).status, 409);
});

test('concurrent duplicate requests save one lead and claim one notification', async () => {
  const f = fixture(), body = sample();
  const responses = await Promise.all([f.post(body), f.post(body), f.post(body)]); await Promise.all(f.pending);
  assert.ok(responses.every(r => r.status === 201)); assert.equal(f.messages.length, 1);
  assert.equal(f.sqlite.prepare('SELECT count(*) AS n FROM coverage_leads').get().n, 1);
});

test('notification outage preserves lead and retries without asking visitor to resubmit', async () => {
  const f = fixture(); f.env.COVERAGE_EMAIL.send = async () => { throw Error('provider unavailable'); };
  assert.equal((await f.post(sample())).status, 201); await Promise.all(f.pending);
  assert.equal(f.sqlite.prepare('SELECT notification_status FROM coverage_leads').get().notification_status, 'failed');
  f.sqlite.exec('UPDATE coverage_leads SET notification_next_at=0');
  f.env.COVERAGE_EMAIL.send = async message => { f.messages.push(message); return { messageId: 'recovered' }; };
  await retryNotifications(f.env); await retryNotifications(f.env);
  assert.equal(f.messages.length, 1); assert.equal(f.sqlite.prepare('SELECT notification_id FROM coverage_leads').get().notification_id, 'recovered');
});

test('database outage never claims receipt or sends a notification', async () => {
  const f = fixture(); f.env.COVERAGE_DB.prepare = () => { throw Error('db offline'); };
  const response = await f.post(sample()); assert.equal(response.status, 503); assert.equal((await response.json()).received, undefined); assert.equal(f.pending.length, 0);
});

test('validates all four coverage types, dates, email, whitespace and maximum lengths on server', async () => {
  const f = fixture();
  for (const kind of ['sport', 'tournament', 'event']) {
    const input = { ...sample(), kind, duration: '6–8 p.m.' };
    assert.equal((await f.post(input)).status, 201);
    const row = f.sqlite.prepare('SELECT payload_json FROM coverage_leads WHERE id=?').get(input.id);
    assert.equal(JSON.parse(row.payload_json).offer.pricing, 'fixed quote before booking');
    assert.equal(JSON.parse(row.payload_json).offer.price, undefined);
  }
  for (const changed of [{ email: 'invalid' }, { name: ' ' }, { activity: ' ' }, { kind: 'unknown' }, { kind: 'event', duration: ' ' }, { date: '2026-09-18' }, { date: '2027-01-01' }, { date: '2026-09-31' }, { date: '2026-10-00' }, { date: '2026-11-32' }, { time: '25:00' }, { name: 'Name\nBcc: injected@example.com' }, { notes: 'a'.repeat(1201) }]) {
    assert.equal((await f.post({ ...sample(), ...changed })).status, 400, JSON.stringify(changed));
  }
  await Promise.all(f.pending);
});

test('rejects cross-origin, honeypot, large body, missing setup and rate-limited requests', async () => {
  const f = fixture();
  assert.equal((await f.post(sample(), { origin: 'https://evil.example' })).status, 403);
  assert.equal((await f.post({ ...sample(), website: 'spam' })).status, 400);
  assert.equal((await f.post({ ...sample(), extra: 'x'.repeat(17000) })).status, 400);
  assert.equal((await f.post({}, { method: 'GET' })).status, 405);
  f.env.COVERAGE_LIMIT.limit = async () => ({ success: false }); assert.equal((await f.post(sample())).status, 429);
  delete f.env.COVERAGE_DB; assert.equal((await f.post(sample())).status, 503);
  assert.equal(f.messages.length, 0);
});

test('analytics accepts only named events and campaign tags, never contact fields', async () => {
  const f = fixture(), event = { id: crypto.randomUUID(), event: 'form_start', name: 'Do not save', email: 'private@example.com', attribution: { source: 'coach-email', medium: 'email', campaign: 'private@example.com', referrer: 'https://example.com/path?email=private@example.com' } };
  assert.equal((await f.post(event, { event: true })).status, 204);
  assert.equal((await f.post(event, { event: true })).status, 204);
  const rows = f.sqlite.prepare('SELECT * FROM coverage_events').all(); assert.equal(rows.length, 1); assert.equal(rows[0].source, 'coach-email'); assert.equal(rows[0].campaign, '');
  assert.doesNotMatch(JSON.stringify(rows), /private|Do not save|referrer/);
  assert.equal((await f.post({ ...event, event: 'arbitrary' }, { event: true })).status, 400);
  assert.equal(attribution(event.attribution).referrer, 'example.com');
});
