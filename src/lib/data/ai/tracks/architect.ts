/**
 * Architect track — ported from src/routes/ai/learn/architect/+page.svelte per
 * the Stage 1 verdicts (research/current-state/old-corpus-inventory.md §6):
 * arc42/C4/ADR level spine and who-for mined verbatim; "The Voice Shift" kept
 * as the keyConcept; reference roots (arc42.org, c4model.com, adr.github.io)
 * moved into sensed keyval items; the commerce integration examples ported as
 * a plainly-described "Worked patterns" section; mailto CTA cut (P7); grounding
 * bound to the one shipped artifact whose output IS this track's artifact class
 * (Blueprint — the arc42-grade doc pipeline, 06-triage.md evidence tier).
 */
import type { Track } from '../types';

export const architect: Track = {
	id: 'architect',
	title: 'Architect',
	tagline: 'Design systems, write arc42 docs',
	description:
		'Create documentation someone could build from—without asking you questions. arc42, C4 diagrams, ADRs.',
	finalArtifact: 'Complete arc42 solution architecture',
	timeline: '8-12 weeks',
	hero: {
		h1: 'Design Systems. Write Implementation-Ready Docs.',
		subhead:
			'Most architecture diagrams are lies. This track teaches you to create documentation someone could build from—without asking you clarifying questions.'
	},
	whoFor: {
		for: [
			"You're a tech lead or senior engineer who documents systems",
			"You've built systems but struggled to communicate their design",
			'You want documentation that developers actually use',
			"You're tired of explaining the same architecture decisions repeatedly"
		],
		notFor: [
			"You haven't built production systems yet (see Builder Track)",
			'You want to write persuasive content for executives (see Strategist Track)',
			"You're exploring AI for self-understanding (see Explorer Track)",
			'You need to build AI apps, not document them'
		]
	},
	keyConcept: {
		title: 'The Voice Shift',
		body:
			'Architecture documentation requires a different voice than thought leadership. Thought leadership is exploratory — "Here\'s where I\'ve landed—for now..." Architecture is definitive — "The system uses PostgreSQL for X because Y." Architecture docs are reference material. Someone should build from them without asking you questions.'
	},
	grounding: [
		{
			artifactId: 'blueprint',
			role: 'The document pipeline this track teaches, shipped as an npm CLI whose output is exactly this artifact class — arc42-grade architecture docs, ADRs, and validated handoffs — with its live self-demo as a worked example.'
		}
	],
	levels: [
		{
			level: 0,
			title: 'Learn the Templates',
			duration: '1-2 days',
			goal: 'Understand arc42, C4, and ADRs before you start filling them.',
			checkpoint:
				'You can explain the difference between Context, Container, and Component diagrams',
			sections: [
				{
					label: 'Terms that matter',
					kind: 'keyval',
					items: [
						'Context Diagram — your system as a box plus external actors and systems',
						'Container — a separately deployable unit (API, database, web app)',
						'Component — a logical grouping within a container (auth module, payment service)',
						'ADR — Architecture Decision Record: documents why you chose X over Y'
					]
				},
				{
					label: 'Read',
					kind: 'keyval',
					items: [
						'arc42 — the full template with section explanations — arc42.org',
						'C4 Model — four levels of abstraction for diagrams — c4model.com',
						'ADR templates — the Architecture Decision Record format — adr.github.io'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'You can explain Context vs Container vs Component diagrams',
						'You understand why ADRs include "Alternatives Considered"',
						'You know what makes documentation "implementation-ready"'
					]
				}
			]
		},
		{
			level: 1,
			title: 'Document an Existing System',
			duration: '1-2 weeks',
			goal: "Create your first architecture document for a system you've already built.",
			checkpoint: 'You have a Context diagram, Container diagram, and 3 ADRs',
			sections: [
				{
					label: 'System requirements',
					kind: 'list',
					items: [
						'Pick a system with at least 2 containers (frontend + API, or API + database)',
						'Must have at least 1 external integration',
						'Must have at least 3 decisions you remember making'
					]
				},
				{
					label: 'Create these artifacts',
					kind: 'keyval',
					items: [
						'Context Diagram — your system as a single box, all users and actors, all external systems',
						'Container Diagram — break the system into deployable parts with technology labels',
						'3 ADRs — Status, Context, Decision, Rationale, Consequences, Alternatives'
					]
				},
				{
					label: 'Tools',
					kind: 'keyval',
					items: [
						'Excalidraw — quick sketches, hand-drawn feel',
						'D2 — diagram-as-code, version control',
						'Mermaid — embedded in markdown'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'You have a Context diagram showing system boundaries',
						'You have a Container diagram showing internal structure',
						'You have 3 ADRs with rationale and alternatives',
						'All artifacts are in a single markdown file or repo'
					]
				}
			]
		},
		{
			level: 2,
			title: 'Capture Decisions as You Make Them',
			duration: '2-3 weeks',
			goal: 'Write ADRs before or during decisions, not after.',
			checkpoint: 'You have 5 ADRs written during active decision-making',
			sections: [
				{
					label: 'The ADR workflow',
					kind: 'flow',
					items: [
						'Before deciding — write the Context section: what problem, what constraints',
						'While deciding — write Alternatives: 2-3 real options with trade-offs',
						'After deciding — write Decision, Rationale, Consequences'
					]
				},
				{
					label: 'Write 5 ADRs — include at least',
					kind: 'list',
					items: [
						'1 technology selection (database, framework, service)',
						'1 architectural pattern (monolith vs microservices, sync vs async)',
						'1 integration approach (REST vs GraphQL, polling vs webhooks)',
						'1 security/compliance decision',
						'1 "we decided NOT to do X" (scope/deferral decisions count)'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'You have 5 ADRs written during active work (not historical)',
						'Each ADR includes a trade-off table',
						'You have a sense of when a decision is "significant" enough to document'
					]
				}
			]
		},
		{
			level: 3,
			title: 'Complete arc42 Document',
			duration: '3-4 weeks',
			goal: 'Create a full arc42 solution architecture for a real system.',
			checkpoint: 'You have a complete arc42 document someone could build from',
			sections: [
				{
					label: 'The 12 arc42 sections',
					kind: 'keyval',
					items: [
						'1. Introduction and Goals — what, why, who, quality goals',
						'2. Constraints — technical, organizational, regulatory',
						'3. Context and Scope — context diagram, business and technical context',
						'4. Solution Strategy — key approaches, technology decisions',
						'5. Building Block View — Container and Component diagrams',
						'6. Runtime View — sequence diagrams for key scenarios',
						'7. Deployment View — infrastructure, environments, process',
						'8. Cross-cutting Concepts — auth, errors, logging, security',
						'9. Architecture Decisions — all ADRs with decision log',
						'10. Quality Requirements — quality tree and scenarios',
						'11. Risks and Technical Debt — known risks, mitigation, debt backlog',
						'12. Glossary — domain and technical terms'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Complete arc42 document with all 12 sections',
						'At least 5 diagrams (Context, Container, Component, Runtime, Deployment)',
						'At least 5 ADRs',
						'Document is implementation-ready — someone could build from it'
					]
				}
			]
		},
		{
			level: 4,
			title: 'Cross-System Integration Docs',
			duration: '4+ weeks',
			goal: "Document how your system integrates with others you don't control.",
			checkpoint: 'You have system-of-systems documentation with failure modes',
			sections: [
				{
					label: 'Document these',
					kind: 'keyval',
					items: [
						'System-of-Systems Context — your system as one box among many, dependencies in both directions',
						'Integration Patterns — sync vs async, data flow direction, contract ownership',
						'Failure Modes — what happens when each dependency fails? Retries, circuit breakers, fallbacks',
						'Data Consistency — source of truth per data type, eventual consistency windows',
						'Integration ADRs — why this approach? What contracts negotiated? What compromises made?'
					]
				},
				{
					label: 'Worked patterns',
					kind: 'keyval',
					items: [
						'PIM to AI enrichment — event-driven: product updates trigger the enrichment pipeline; the PIM stays the source of truth while AI writes back enhanced attributes',
						'Search platform to LLM — hybrid: traditional search for recall, an LLM for semantic reranking, with a circuit breaker when LLM latency crosses a threshold',
						'CMS to personalization — async: publishing content fires events, the personalization engine indexes them, and generic content is the fallback when the engine is unavailable',
						'Analytics to optimization — batch daily aggregation feeds the optimization models while real-time click data drives immediate reranking'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'System-of-systems context diagram',
						'Integration pattern documentation for 3+ external systems',
						'Failure mode analysis for each integration',
						'Integration-specific ADRs'
					]
				}
			]
		}
	],
	cta: {
		primary: { label: 'Start at Level 0', href: '#level-0' },
		secondary: {
			label: 'npx @nino-chavez-labs/blueprint-cli init',
			href: 'https://blueprint.ninochavez.co'
		}
	}
};
