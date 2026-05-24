/**
 * derive-corpus sources — the executable spec for ask-dad RAG ingestion.
 *
 * Per ADR-0006: this list IS the source of truth. The companion catalog at
 * blueprint/content/askdad-corpus-catalog.md is human-readable documentation;
 * the ingester reads THIS file. Adding a document to the corpus = appending
 * here.
 *
 * Each source maps to one or more rows in askdad.content_chunks via chunking.
 * source_id is the upsert key (one source replaces all its prior chunks on
 * each run).
 */

export type SourceKind = 'local-markdown' | 'local-text' | 'local-yaml' | 'local-svelte';

export interface CorpusSource {
	/** Stable identifier — also used as the upsert key in content_chunks */
	source_id: string;
	/** Filter dimension — lets queries scope to a category */
	source_type:
		| 'doc'
		| 'adr'
		| 'site-page'
		| 'work-deep-dive'
		| 'aeo'
		| 'voice-guide'
		| 'corpus-snapshot'
		| 'operating-rules'
		| 'curriculum-track'
		| 'blog-post';
	/** Human-readable title for source attribution in retrieved chunks */
	source_title: string;
	/** Public URL where the source lives (for citation; not necessarily where the ingester reads from) */
	source_url: string;
	/** Where the ingester actually reads the bytes — absolute path or repo-relative */
	source_path: string;
	/** Kind controls how the ingester parses the file before chunking */
	kind: SourceKind;
}

const REPO_ROOT = process.env.GITHUB_WORKSPACE ?? process.cwd();
const HOME = process.env.HOME ?? '';

/**
 * Resolve a source path against the repo root or HOME. Repo-relative paths
 * stay portable across GH Actions and local dev; HOME-anchored paths (the
 * Poe stack, CLAUDE.md) are only resolvable in the local dev environment
 * and are silently skipped by the ingester when not present.
 */
function repo(rel: string): string {
	return `${REPO_ROOT}/${rel}`;
}

function home(rel: string): string {
	return `${HOME}/${rel}`;
}

export const SOURCES: CorpusSource[] = [
	// ──── Methodology + practice (load-bearing references) ────
	{
		source_id: 'design-principles',
		source_type: 'doc',
		source_title: 'DESIGN-PRINCIPLES.md — what this site CAN\'T do (Stage 2 gate)',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/DESIGN-PRINCIPLES.md',
		source_path: repo('blueprint/DESIGN-PRINCIPLES.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'design-brief',
		source_type: 'doc',
		source_title: '03-design-brief.md — signature, compositions, motion budget',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/03-design-brief.md',
		source_path: repo('blueprint/03-design-brief.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'prescription',
		source_type: 'doc',
		source_title: '02-prescription.yml — sitemap, modules, case-study slate',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/02-prescription.yml',
		source_path: repo('blueprint/02-prescription.yml'),
		kind: 'local-yaml'
	},
	{
		source_id: 'diagnose',
		source_type: 'doc',
		source_title: '01-diagnose.md — archetype, module list, scope boundaries',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/01-diagnose.md',
		source_path: repo('blueprint/01-diagnose.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'blueprint-readme',
		source_type: 'doc',
		source_title: 'blueprint/README.md — methodology overview',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/README.md',
		source_path: repo('blueprint/README.md'),
		kind: 'local-markdown'
	},

	// ──── ADRs (load-bearing decisions) ────
	{
		source_id: 'adr-0001-positioning',
		source_type: 'adr',
		source_title: 'ADR-0001 — Positioning: Context Engineer',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/decisions/0001-positioning-context-engineer.md',
		source_path: repo('blueprint/decisions/0001-positioning-context-engineer.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'adr-0002-archetype',
		source_type: 'adr',
		source_title: 'ADR-0002 — Archetype: portfolio-brand (consulting variant)',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/decisions/0002-archetype-portfolio-brand-consulting.md',
		source_path: repo('blueprint/decisions/0002-archetype-portfolio-brand-consulting.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'adr-0003-hero-claim',
		source_type: 'adr',
		source_title: 'ADR-0003 — Hero claim: Option A locked',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/decisions/0003-hero-claim-option-a.md',
		source_path: repo('blueprint/decisions/0003-hero-claim-option-a.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'adr-0004-signature',
		source_type: 'adr',
		source_title: 'ADR-0004 — Signature visual move: schematic-diagram',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/decisions/0004-signature-schematic-diagram.md',
		source_path: repo('blueprint/decisions/0004-signature-schematic-diagram.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'adr-0005-review-model',
		source_type: 'adr',
		source_title: 'ADR-0005 — Site-as-prototype review model (bc-subs pattern)',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/decisions/0005-site-as-prototype-review-model.md',
		source_path: repo('blueprint/decisions/0005-site-as-prototype-review-model.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'adr-0006-corpus-derived',
		source_type: 'adr',
		source_title: 'ADR-0006 — Corpus as derived state',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/decisions/0006-corpus-as-derived-state.md',
		source_path: repo('blueprint/decisions/0006-corpus-as-derived-state.md'),
		kind: 'local-markdown'
	},

	// ──── Phase 2 content drafts (source-of-record for site copy) ────
	{
		source_id: 'content-hero',
		source_type: 'doc',
		source_title: 'Hero + Credibility Ribbon — content draft',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/content/hero.md',
		source_path: repo('blueprint/content/hero.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'content-about',
		source_type: 'doc',
		source_title: '/about — content draft',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/content/about.md',
		source_path: repo('blueprint/content/about.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'content-practice',
		source_type: 'doc',
		source_title: '/practice — content draft',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/content/practice.md',
		source_path: repo('blueprint/content/practice.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'content-work-data-refresh',
		source_type: 'doc',
		source_title: 'work-data.ts refresh — Phase 2 draft (5-lead slate rationale)',
		source_url:
			'https://github.com/nino-chavez/nino-chavez-site/blob/redesign/v3-context-engineer/blueprint/content/work-data-refresh.md',
		source_path: repo('blueprint/content/work-data-refresh.md'),
		kind: 'local-markdown'
	},

	// ──── External anchors — only ingested when the local dev env has them ────
	// (paths anchored to HOME; the ingester silently skips missing paths)
	{
		source_id: 'voice-guide',
		source_type: 'voice-guide',
		source_title: 'Signal Dispatch Voice Guide v1.2',
		source_url: 'https://blog.ninochavez.co',
		source_path: home('Workspace/dev/apps/blog/docs/signal-dispatch-voice-guide.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'claude-md-global',
		source_type: 'operating-rules',
		source_title: '~/.claude/CLAUDE.md — global operating rules',
		source_url: 'about:user-config',
		source_path: home('.claude/CLAUDE.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'poe-stack',
		source_type: 'corpus-snapshot',
		source_title: 'Poe stack — serialized voice character sheet',
		source_url: 'about:user-config',
		source_path: home('.claude/poe/stack.md'),
		kind: 'local-markdown'
	},
	{
		source_id: 'poe-adversarial-test-plan',
		source_type: 'corpus-snapshot',
		source_title: 'Adversarial test plan — control/treatment protocol',
		source_url: 'about:user-config',
		source_path: home('.claude/poe/adversarial-test-plan.md'),
		kind: 'local-markdown'
	}
];
