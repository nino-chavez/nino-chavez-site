CREATE TABLE coverage_leads (
  id TEXT PRIMARY KEY,
  payload_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new','contacted','quoted','booked','declined','test')),
  email TEXT NOT NULL,
  kind TEXT NOT NULL,
  event_date TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT '',
  medium TEXT NOT NULL DEFAULT '',
  campaign TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  referrer_host TEXT NOT NULL DEFAULT '',
  booked_amount_cents INTEGER CHECK(booked_amount_cents >= 0),
  follow_up_on TEXT,
  operator_note TEXT NOT NULL DEFAULT '',
  notification_status TEXT NOT NULL DEFAULT 'pending' CHECK(notification_status IN ('pending','sending','sent','failed')),
  notification_attempts INTEGER NOT NULL DEFAULT 0,
  notification_next_at INTEGER NOT NULL DEFAULT 0,
  notification_id TEXT,
  notification_error TEXT
);
CREATE INDEX coverage_lead_followup ON coverage_leads(status,follow_up_on);
CREATE INDEX coverage_notification_due ON coverage_leads(notification_status,notification_next_at);
CREATE TABLE coverage_events (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  event TEXT NOT NULL CHECK(event IN ('page_view','request_open','form_start','submit_error')),
  source TEXT NOT NULL DEFAULT '',
  medium TEXT NOT NULL DEFAULT '',
  campaign TEXT NOT NULL DEFAULT ''
);
CREATE INDEX coverage_event_reporting ON coverage_events(created_at,event,source,campaign);
