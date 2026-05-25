// Case-study data source-of-truth for /work/[cluster]/[slug] routes.
//
// Each case carries: identifiers + hero metadata + 3 readout cards
// + quotable + outcome metrics. Schematic SVG markup is keyed by id
// and rendered inline in the page template. Per ~/.claude/CLAUDE.md R4
// — every claim grounds to a real artifact; no fabricated metrics.

export interface CaseReadout {
	tag: string;
	title: string;
	body: string;
}

export interface CaseOutcome {
	tag: string;
	value: string;
	note: string;
}

export interface CaseStudy {
	id: string;
	cluster: string;
	clusterLabel: string;
	title: string;
	visibility: 'public' | 'private';
	repo?: string;
	liveUrls?: Array<{ label: string; url: string }>;
	lede: string;
	architectureKicker: string;
	architectureTitle: string;
	architectureBody: string;
	approachKicker: string;
	approachTitle: string;
	approachIntro: string;
	approachReadouts: CaseReadout[];
	quote: string;
	quoteSource: string;
	outcomes: CaseOutcome[];
}

export const caseStudies: CaseStudy[] = [
	{
		id: 'atelier',
		cluster: 'ai-products',
		clusterLabel: 'AI products',
		title: 'Atelier',
		visibility: 'public',
		repo: 'github.com/nino-chavez/atelier',
		liveUrls: [{ label: 'github.com/nino-chavez/atelier', url: 'https://github.com/nino-chavez/atelier' }],
		lede: 'Self-hostable OSS template + agent-interop protocol + reference prototype for mixed human/agent teams. Atelier is the credibility anchor for the AI-products cluster — public, externally verifiable, and embodying the methodology-as-software thesis.',
		architectureKicker: '01 — Architecture',
		architectureTitle: 'Twelve tools across one MCP surface.',
		architectureBody: 'Atelier exposes a 12-tool MCP server that mediates between an orchestrator agent and a fan-out of domain agents (design, frontend, backend, infra, docs). The orchestrator never calls domain agents directly — every cross-team handoff goes through a tool call so the contract is inspectable and the trace is reproducible.',
		approachKicker: '02 — Approach',
		approachTitle: 'The three load-bearing patterns.',
		approachIntro: 'Every design choice in atelier resolves to one of three patterns. Together they make mixed-team coordination tractable; without them every workflow re-invents the same primitives.',
		approachReadouts: [
			{ tag: 'Pattern 01', title: 'Inspectable handoffs', body: 'Cross-team calls go through MCP tools, not direct agent invocations. The tool call IS the contract — argument schema, return type, latency budget — and the call appears in the trace for every downstream consumer.' },
			{ tag: 'Pattern 02', title: 'Self-hostable runtime', body: 'No vendor lock to a managed agent platform. The MCP server runs locally or in any CF Workers / Vercel function. Teams can stand up atelier inside their own perimeter without granting external dependencies a vote in their architecture.' },
			{ tag: 'Pattern 03', title: 'Reference prototype, not framework', body: 'Atelier ships as a working starter, not as a library to import. Forks are encouraged — the value is in the protocol pattern, not in adopting a dependency that constrains future architecture choices.' }
		],
		quote: 'Atelier is the studio. Twelve tools, five domain namespaces, one MCP surface. Bring your own orchestrator — or fork ours.',
		quoteSource: 'github.com/nino-chavez/atelier · README',
		outcomes: [
			{ tag: 'Visibility', value: 'PUBLIC', note: 'github · MIT' },
			{ tag: 'Tool count', value: '12', note: 'across 5 domains' },
			{ tag: 'Runtime', value: 'Self-host', note: 'CF Workers / local' },
			{ tag: 'Position', value: 'Lead', note: 'AI-products cluster anchor' }
		]
	},
	{
		id: 'cortex',
		cluster: 'ai-products',
		clusterLabel: 'AI products',
		title: 'Cortex',
		visibility: 'public',
		repo: 'github.com/nino-chavez/cortex',
		liveUrls: [{ label: 'github.com/nino-chavez/cortex', url: 'https://github.com/nino-chavez/cortex' }],
		lede: 'Local-first Mac app for on-device inference — Tauri v2 + SvelteKit + Rust + MLX. Cortex demonstrates range beyond agentic orchestration: full-stack native engineering against Apple Silicon\'s ML accelerator, with every layer self-contained on the device.',
		architectureKicker: '01 — Architecture',
		architectureTitle: 'Four layers. Zero cloud calls.',
		architectureBody: 'Cortex stays entirely on-device. The SvelteKit front-end talks to a Rust backend through Tauri v2\'s IPC bridge; the Rust layer drives MLX directly against Apple Silicon\'s Neural Engine. Models load from disk; inference happens locally. No external API surface ships with the binary.',
		approachKicker: '02 — Approach',
		approachTitle: 'Three constraints that shape the architecture.',
		approachIntro: 'Each constraint disqualified a more conventional choice. The architecture is what falls out when those three constraints are taken seriously.',
		approachReadouts: [
			{ tag: 'Constraint 01', title: 'No cloud calls in the hot path', body: 'Inference must complete without a network request. Telemetry is opt-in and never blocks a user action. The privacy story is the product story.' },
			{ tag: 'Constraint 02', title: 'Tauri over Electron', body: 'Native binary size + memory footprint matter when shipping a long-running app. Tauri v2\'s IPC keeps the JS surface thin and the Rust backend in charge of anything CPU/GPU-heavy.' },
			{ tag: 'Constraint 03', title: 'MLX, not llama.cpp', body: 'Apple\'s MLX framework hits the Neural Engine directly. llama.cpp would have been faster to integrate but would have left Apple Silicon\'s accelerator on the floor.' }
		],
		quote: 'Cortex stays on your machine. The Neural Engine is the runtime. The cloud is not invited.',
		quoteSource: 'github.com/nino-chavez/cortex · README',
		outcomes: [
			{ tag: 'Visibility', value: 'PUBLIC', note: 'github · OSS license' },
			{ tag: 'Stack', value: '4 layers', note: 'Svelte · Tauri · Rust · MLX' },
			{ tag: 'Network', value: 'None', note: 'hot path · local-only' },
			{ tag: 'Position', value: 'Range', note: 'native + on-device proof' }
		]
	},
	{
		id: 'ask-dad',
		cluster: 'ai-products',
		clusterLabel: 'AI products',
		title: 'Ask Dad — RAG',
		visibility: 'private',
		repo: '/api/ask/chat',
		lede: 'Mechanically-derived corpus + Cloudflare Vectorize storage. 15 sources · 114 vectors · ~$0.0007 per full rebuild. The chat function in the bottom-right of every page is the same endpoint — every reviewer question lands in the same pipeline.',
		architectureKicker: '01 — Architecture',
		architectureTitle: 'Five stages. One pipeline. Rebuilds on commit.',
		architectureBody: 'The corpus rebuilds via GitHub Actions on every push to main. The pipeline derives sources mechanically from the repository (commits + blog content + ADRs), embeds them with OpenAI, stores vectors in Cloudflare Vectorize, and serves through a Pages Function. The cost line is the receipt — ~$0.0007 per rebuild because Vectorize is priced for high-cardinality low-volume work like this.',
		approachKicker: '02 — Approach',
		approachTitle: 'Three choices that compound.',
		approachIntro: 'Every choice in the ask-dad pipeline disqualified a more conventional one. Documented in three ADRs; the choices compound.',
		approachReadouts: [
			{ tag: 'Choice 01', title: 'Derived corpus, not curated', body: 'Per ADR-0006: the corpus comes from a derivation script over committed artifacts, not a hand-curated knowledge base. Every push reshapes the corpus; drift is impossible because the source IS the repo.' },
			{ tag: 'Choice 02', title: 'Vectorize over a managed DB', body: 'Per ADR-0007: Cloudflare Vectorize replaced Supabase pgvector. The price (~$0.0007 per rebuild) and the proximity to the CF Pages function were the deciding factors. The chat function never crosses a network boundary to the vector store.' },
			{ tag: 'Choice 03', title: 'Supplementary, never primary', body: 'Per R6: the chat surfaces beside the prose, never replaces it. RAG augments reviewer access to the corpus; it doesn\'t try to BE the corpus. The receipts remain the receipts.' }
		],
		quote: 'The vector store is closer to the function than to the database. Treating it as DB-adjacent infrastructure was the wrong frame; treating it as compute-adjacent storage is the right one.',
		quoteSource: 'ADR-0007 · Cloudflare Vectorize migration',
		outcomes: [
			{ tag: 'Status', value: 'LIVE', note: '/api/ask/chat in prod' },
			{ tag: 'Sources', value: '15', note: '→ 114 vectors' },
			{ tag: 'Rebuild cost', value: '$0.0007', note: 'per full rebuild' },
			{ tag: 'Position', value: 'Substrate', note: 'powers the site\'s chat' }
		]
	},
	{
		id: 'bc-subscriptions',
		cluster: 'commerce-bc',
		clusterLabel: 'Commerce / BC',
		title: 'bc-subscriptions',
		visibility: 'private',
		repo: 'github.com/nino-chavez/bc-subscriptions',
		lede: 'Subscription engineering on BigCommerce — done by applying the blueprint methodology to its own architecture. 38+ ADRs, mechanical state derivation, a runnable prototype that doubles as the design oracle. The methodology is recursive: the receipts of bc-subscriptions ARE the blueprint of bc-subscriptions.',
		architectureKicker: '01 — Architecture',
		architectureTitle: 'Three artifacts in lockstep.',
		architectureBody: 'Every change to bc-subscriptions touches three artifacts at once: the ADR that justifies it, the state-derivation script that materializes the new shape, and the runnable prototype that demonstrates it. If any one of the three is out of date, the change is considered incomplete. The mechanical derivation is what prevents drift — the prototype is regenerated from the ADRs, not edited in place.',
		approachKicker: '02 — Approach',
		approachTitle: 'What makes the recursion tractable.',
		approachIntro: 'Three patterns reinforce each other. Drop any one and the recursion stops working — the methodology either drifts from the code or the code drifts from the decisions.',
		approachReadouts: [
			{ tag: 'Pattern 01', title: 'ADRs as primary, not retrospective', body: '38+ ADRs were written BEFORE the corresponding code, not after. The decision-record is the source of truth; the code implements the decision. Reversing this is what creates drift on most engineering projects.' },
			{ tag: 'Pattern 02', title: 'State derives mechanically', body: 'A derivation script reads the ADRs and emits the project\'s state representation. The script is deterministic — running it twice produces identical output. This is what enables the prototype to track ADR evolution without manual rewiring.' },
			{ tag: 'Pattern 03', title: 'Prototype is the design oracle', body: 'When a design question comes up that the ADRs don\'t answer, the prototype is the tiebreaker. "What does the runnable thing do?" is a faster question to settle than "what did we mean when we wrote ADR-0019?"' }
		],
		quote: 'The receipts of bc-subscriptions ARE the blueprint of bc-subscriptions. Recursion isn\'t an aesthetic — it\'s the only way drift stays bounded.',
		quoteSource: 'bc-subscriptions · methodology.md',
		outcomes: [
			{ tag: 'Status', value: 'PRIVATE', note: 'in-flight engagement' },
			{ tag: 'ADRs', value: '38+', note: 'decision-first' },
			{ tag: 'Drift', value: 'Bounded', note: 'mechanical derivation' },
			{ tag: 'Position', value: 'Recursive', note: 'methodology applied to itself' }
		]
	},
	{
		id: 'ask-bc',
		cluster: 'commerce-bc',
		clusterLabel: 'Commerce / BC',
		title: 'Ask BC',
		visibility: 'private',
		repo: 'askbc.ninochavez.co',
		liveUrls: [{ label: 'askbc.ninochavez.co', url: 'https://askbc.ninochavez.co' }],
		lede: 'The most ambitious agentic-software architecture in the cluster. Hybrid runtime: Next.js + Vercel for OAuth and admin; Cloudflare Worker as a Durable Object per store for the agent runtime; a Codemode sandbox for read tools; a two-turn confirmation gate before any write tool fires. Every layer earns its place against an explicit alternative.',
		architectureKicker: '01 — Architecture',
		architectureTitle: 'Four layers. Each justified against an alternative.',
		architectureBody: 'The split between Vercel and Cloudflare isn\'t arbitrary. Vercel handles OAuth + admin because Next.js + the Marketplace integration is the canonical pattern. The agent runtime is Cloudflare because Durable Objects give per-store strong consistency that Vercel functions can\'t match — every store gets its own DO instance, addressable by store-hash. Read tools run in Codemode\'s sandboxed runtime; write tools require an explicit two-turn confirmation from the operator before they fire.',
		approachKicker: '02 — Approach',
		approachTitle: 'Three architecture moves that aren\'t accidental.',
		approachIntro: 'Each move has an explicit alternative it disqualified. The architecture document records both the chosen path and the rejected one for every layer.',
		approachReadouts: [
			{ tag: 'Move 01', title: 'DO per store, not shared', body: 'Cloudflare Durable Objects give one strongly-consistent actor per store. Shared databases would have required pessimistic locking around every write to keep concurrent agent runs from stepping on each other. DOs make that disappear.' },
			{ tag: 'Move 02', title: 'Read tools in a sandbox', body: 'Codemode lets read tools execute against the live BigCommerce API without granting them shell, filesystem, or network access beyond their declared targets. The sandbox is what makes "let the agent query freely" tolerable.' },
			{ tag: 'Move 03', title: 'Writes wait for a human', body: 'Every write tool — anything that mutates store state — pauses for explicit operator confirmation. Two turns: the agent proposes, the operator approves, then the write fires. No autonomous mutations against a live commerce surface.' }
		],
		quote: 'Agents propose. Operators approve. Stores mutate. Anything else is a story about how the demo fell over on day one.',
		quoteSource: 'ask-bc · architecture.md · §write-gate',
		outcomes: [
			{ tag: 'Status', value: 'PRIVATE', note: 'askbc.ninochavez.co' },
			{ tag: 'Runtime', value: 'Hybrid', note: 'Vercel + CF DO' },
			{ tag: 'Write gate', value: '2-turn', note: 'operator approves' },
			{ tag: 'Position', value: 'Lead', note: 'commerce-bc cluster' }
		]
	},
	{
		id: 'rally-hq',
		cluster: 'volleyball-630',
		clusterLabel: '630 / volleyball platform',
		title: 'Rally HQ',
		visibility: 'private',
		repo: 'rallyhq.app',
		liveUrls: [
			{ label: 'rallyhq.app', url: 'https://rallyhq.app' },
			{ label: 'blueprint.rallyhq.app', url: 'https://blueprint.rallyhq.app' }
		],
		lede: 'Tournament-management platform for 630 Volleyball — and the canonical demonstration of the paired-deploy pattern. Two CF Pages projects ship from one repo: the product surface at rallyhq.app, the blueprint portal at blueprint.rallyhq.app. The portal you can preview the v3 design on (blueprint.ninochavez.co) mirrors that pattern.',
		architectureKicker: '01 — Architecture',
		architectureTitle: 'One repo. Two deploys. Shared substrate.',
		architectureBody: 'The product (Rally HQ) and its review portal (Rally HQ Blueprint) are sibling CF Pages projects deployed from the same source tree. They share the design system, the schematic SVGs, and the underlying RAG corpus — but each is independently addressable. Reviewers walk blueprint.rallyhq.app to evaluate decisions; users hit rallyhq.app to run tournaments. Neither surface gets diluted by the other\'s audience.',
		approachKicker: '02 — Approach',
		approachTitle: 'What the paired-deploy pattern earns.',
		approachIntro: 'Three things become possible only because the deploys are separate. None of them is achievable when the product and the rationale share a surface.',
		approachReadouts: [
			{ tag: 'Earn 01', title: 'Audience separation', body: 'Tournament admins shouldn\'t have to scroll past architecture rationale to schedule a bracket. Reviewers shouldn\'t have to learn the product UI to evaluate a design decision. Separate deploys → separate IAs → neither audience compromises.' },
			{ tag: 'Earn 02', title: 'Shared substrate without coupling', body: 'Design tokens, schematic SVGs, and the RAG corpus live in the shared tree. Both deploys pull from the same canonical source. A token change ripples to both at next deploy; neither surface goes out of sync with the design system.' },
			{ tag: 'Earn 03', title: 'Methodology made portable', body: 'The Rally HQ pattern is what ADR-0008 codified for this site. ninochavez-blueprint is sibling to ninochavez-main exactly the way blueprint.rallyhq.app is sibling to rallyhq.app. The pattern travels.' }
		],
		quote: 'The product surface and the design rationale are not the same artifact. They have different audiences, different cadences, and different success criteria. The paired deploy is what makes that legible.',
		quoteSource: 'ADR-0008 · paired-deploy adoption (ninochavez.co v3)',
		outcomes: [
			{ tag: 'Status', value: 'LIVE', note: 'both deploys in prod' },
			{ tag: 'Deploys', value: '2', note: 'product + blueprint' },
			{ tag: 'Source', value: '1 repo', note: 'shared substrate' },
			{ tag: 'Position', value: 'Pattern', note: 'this site mirrors it' }
		]
	}
];

export function findCase(cluster: string, slug: string): CaseStudy | undefined {
	return caseStudies.find((c) => c.cluster === cluster && c.id === slug);
}
