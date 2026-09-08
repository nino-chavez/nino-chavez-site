import { execFileSync } from 'node:child_process';

// Uses the operator's existing Wrangler login. No public lead-list endpoint.
const [action = 'help', ...args] = process.argv.slice(2);
const remote = args.includes('--remote');
const values = args.filter(value => value !== '--remote');
const quote = value => `'${String(value).replaceAll("'", "''")}'`;
let sql;
if (action === 'list') sql = `SELECT id,created_at,status,email,event_date,json_extract(payload_json,'$.school') AS organization,json_extract(payload_json,'$.activity') AS activity,source,campaign,follow_up_on,notification_status FROM coverage_leads ORDER BY created_at DESC LIMIT 100`;
else if (action === 'show' && /^[\da-f-]{36}$/i.test(values[0] || '')) sql = `SELECT * FROM coverage_leads WHERE id=${quote(values[0])}`;
else if (action === 'status' && /^[\da-f-]{36}$/i.test(values[0] || '') && ['new','contacted','quoted','booked','declined','test'].includes(values[1])) {
  const amount = values[2];
  if (amount && (!/^\d+(\.\d{1,2})?$/.test(amount) || Number(amount) > 100000)) throw Error('Booking amount must be dollars, such as 350 or 350.00.');
  sql = `UPDATE coverage_leads SET status=${quote(values[1])},updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now')${amount ? `,booked_amount_cents=${Math.round(Number(amount)*100)}` : ''} WHERE id=${quote(values[0])} RETURNING id,status,booked_amount_cents`;
} else if (action === 'followup' && /^[\da-f-]{36}$/i.test(values[0] || '') && /^\d{4}-\d{2}-\d{2}$/.test(values[1] || '')) sql = `UPDATE coverage_leads SET follow_up_on=${quote(values[1])},operator_note=${quote(values.slice(2).join(' ').slice(0,2000))},updated_at=strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id=${quote(values[0])} RETURNING id,status,follow_up_on,operator_note`;
else if (action === 'due') sql = `SELECT id,email,event_date,status,follow_up_on,operator_note FROM coverage_leads WHERE status IN ('new','contacted','quoted') AND (follow_up_on<=date('now') OR (follow_up_on IS NULL AND julianday(created_at)<julianday('now','-2 days'))) ORDER BY created_at`;
else if (action === 'report') sql = `SELECT source,medium,campaign,count(*) AS inquiries,sum(status='booked') AS bookings,coalesce(sum(CASE WHEN status='booked' THEN booked_amount_cents ELSE 0 END),0)/100.0 AS booked_dollars FROM coverage_leads WHERE status!='test' GROUP BY source,medium,campaign; SELECT event,source,medium,campaign,count(*) AS observed_events FROM coverage_events GROUP BY event,source,medium,campaign; SELECT count(*) AS notifications_needing_attention FROM coverage_leads WHERE notification_status!='sent' AND notification_attempts>=12`;
else {
  console.log('Coverage leads (add --remote for production):\n  npm run leads -- list\n  npm run leads -- show ID\n  npm run leads -- status ID new|contacted|quoted|booked|declined|test [BOOKED_DOLLARS]\n  npm run leads -- followup ID YYYY-MM-DD [NOTE]\n  npm run leads -- due\n  npm run leads -- report');
  process.exit(action === 'help' ? 0 : 1);
}
const output = execFileSync('npx', ['wrangler','d1','execute','ninochavez-coverage-leads', remote ? '--remote' : '--local','--command',sql,'--json'], {encoding:'utf8',timeout:60000,stdio:['ignore','pipe','pipe'],maxBuffer:4*1024*1024});
console.log(output);
