/**
 * Author track — ported from src/routes/ai/learn/author/+page.svelte per the
 * Stage 1 verdicts (research/current-state/old-corpus-inventory.md §8):
 * hero/whoFor/keyConcept and the playbook-architecture level spine Mined
 * verbatim; the entirely-ASSERTED old track is now SHOWN via three shipped
 * artifacts (P4); mailto CTA cut (P7). Voice-consistency-across-chapters binds
 * to the published voice guide; the variable-substitution/config-file mechanics
 * (noted as overlapping Enterprise) bind to forge-brand, the shipped
 * config-driven pattern.
 */
import type { Track } from '../types';

export const author: Track = {
	id: 'author',
	title: 'Author',
	tagline: 'Create multi-chapter reference works',
	description:
		'Learn to create comprehensive multi-chapter reference works. Playbooks, frameworks, 20K+ words.',
	finalArtifact: 'Multi-volume playbook (20,000+ words)',
	timeline: '12-20 weeks',
	hero: {
		h1: 'Create Multi-Chapter Reference Works',
		subhead:
			'Not blog posts. Playbooks. The kind of document that becomes organizational IP—something people reference for years, not days.'
	},
	whoFor: {
		for: [
			'You have deep expertise you want to codify into a reference',
			'You\'re building playbooks, guides, or manuals for organizations',
			'You want repeatable frameworks others can use without you',
			'You\'re comfortable with long-form writing (20,000+ words)'
		],
		notFor: [
			'You want to write blog posts, not books (that\'s the Voice track)',
			'You need one-off strategy briefs (that\'s the Strategist track)',
			'You\'re exploring AI for self-understanding (that\'s the Explorer track)',
			'You don\'t yet have domain expertise to document'
		]
	},
	keyConcept: {
		title: 'Playbook vs Blog Post',
		body:
			'A playbook isn\'t just a long blog post — it\'s structured differently. A blog post says "here\'s what I think about X right now." A playbook says "here\'s how to do X, with enough detail that you can do it without me." Playbooks are reference material: someone should be able to open Chapter 7 six months from now and follow the process without context.'
	},
	grounding: [
		{
			artifactId: 'blueprint',
			role: 'BRD/PRD/ADR document generation at reference-work scale, agent-drafted, publicly inspectable.'
		},
		{
			artifactId: 'voice-guide',
			role: 'The published voice guide is itself organizational-IP-grade reference writing, and the spec that keeps long-form voice consistent.'
		},
		{
			artifactId: 'forge-brand',
			role: 'The brand-kit JSON that drives consistent tokens/docs across outputs — the config-file mechanics this track teaches, shipped.'
		}
	],
	levels: [
		{
			level: 0,
			title: 'Design Playbook Architecture',
			duration: '2-3 days',
			goal: 'Plan a multi-volume structure before writing a single chapter.',
			checkpoint: 'You have a complete outline with 4 volumes and 12+ chapters',
			sections: [
				{
					label: '4-Volume Structure',
					kind: 'keyval',
					items: [
						'Volume 1: Strategic Framework — Why this matters, core concepts, maturity model',
						'Volume 2: Methodology — How to do each major activity, step-by-step',
						'Volume 3: Execution — Team structure, engagement models, governance',
						'Volume 4: Reference — Templates, checklists, decision trees, glossary'
					]
				},
				{
					label: 'Design principles',
					kind: 'list',
					items: [
						'Each volume should be readable standalone',
						'Chapters within a volume build on each other',
						'Reference material lives in appendices, not inline',
						'Plan cross-references before writing'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'4-volume structure with clear purpose for each',
						'12+ chapter outlines with section headers',
						'Dependency map (which chapters reference which)',
						'Estimated word count per chapter'
					]
				}
			]
		},
		{
			level: 1,
			title: 'Master a Single Chapter',
			duration: '2-3 weeks',
			goal: 'Write one complete chapter that could stand alone as a reference.',
			checkpoint: 'You have a 5,000+ word chapter with consistent structure',
			sections: [
				{
					label: 'Chapter structure',
					kind: 'keyval',
					items: [
						'Introduction — What this chapter covers, who should read it',
						'Core Concepts — Key ideas with definitions',
						'Process/Steps — How to do the thing, with detail',
						'Examples — Real or realistic scenarios',
						'Common Pitfalls — What goes wrong and how to avoid it',
						'Summary — Key takeaways, next steps'
					]
				},
				{
					label: 'Requirements',
					kind: 'list',
					items: [
						'Pick the chapter you know best',
						'Write it as if you won\'t be there to explain it',
						'Include enough detail that someone could act on it'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'5,000+ word chapter with all 6 sections',
						'Consistent heading hierarchy (H2 → H3 → H4)',
						'At least 2 concrete examples',
						'Someone unfamiliar with the topic could follow it'
					]
				}
			]
		},
		{
			level: 2,
			title: 'Maintain Voice Across Chapters',
			duration: '3-4 weeks',
			goal: 'Write 3 chapters that read like one author wrote them.',
			checkpoint: 'You have 3 chapters with consistent terminology and tone',
			sections: [
				{
					label: 'Consistency dimensions',
					kind: 'keyval',
					items: [
						'Terminology — Always "playbook" not "handbook/guide/manual"',
						'Tone — Confident but not arrogant, instructional not academic',
						'Structure — Same sections in same order across chapters',
						'Depth — Similar detail level (don\'t over-explain one thing)'
					]
				},
				{
					label: 'Tools to help',
					kind: 'list',
					items: [
						'Style guide document (terms to use/avoid) — the published Signal Dispatch voice guide is one worked example of documenting voice precisely enough to keep it consistent across a body of work',
						'Chapter template with required sections',
						'Cross-chapter review (read all 3 sequentially)'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'3 chapters totaling 15,000+ words',
						'Style guide document with 20+ terms',
						'Consistent structure across all chapters',
						'Someone could read chapters 1, 5, 9 and notice same author'
					]
				}
			]
		},
		{
			level: 3,
			title: 'Build Reference Appendices',
			duration: '3-4 weeks',
			goal: 'Create the supplementary materials that make a playbook actionable.',
			checkpoint: 'You have appendices with templates, worksheets, and decision trees',
			sections: [
				{
					label: 'Appendix types',
					kind: 'keyval',
					items: [
						'Templates — Fill-in-the-blank documents for common outputs (e.g. assessment template, status report template)',
						'Worksheets — Structured exercises to work through (e.g. capability gap analysis, priority matrix)',
						'Decision Trees — If-then logic for common decisions (e.g. which approach to use based on context)',
						'Checklists — Step-by-step validation lists (e.g. launch readiness, quality gates)',
						'Glossary — Definitive terms with definitions (e.g. domain-specific vocabulary)'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'At least 3 templates (different types)',
						'At least 2 worksheets with worked examples',
						'At least 1 decision tree',
						'Glossary with 30+ terms',
						'Appendices reference main chapters and vice versa'
					]
				}
			]
		},
		{
			level: 4,
			title: 'Create Client-Agnostic Frameworks',
			duration: '4+ weeks',
			goal: 'Make your playbook reusable across contexts with variable substitution.',
			checkpoint: 'You have a framework that works for multiple clients/contexts',
			sections: [
				{
					label: 'Abstraction patterns',
					kind: 'keyval',
					items: [
						'Variable Substitution — {{client.name}}, {{client.industry}}, {{engagement.scope}}',
						'Conditional Sections — Include/exclude based on context (enterprise vs SMB)',
						'Scalable Examples — Examples that work at different scales/industries',
						'Configuration Files — style-guide.json, quality-rubric.json, abstractions.json. This is the config-driven pattern forge-brand ships: one brand-kit JSON drives consistent tokens and docs across every output'
					]
				},
				{
					label: 'Validation',
					kind: 'list',
					items: [
						'Test with 2 different "clients" (real or hypothetical)',
						'Have someone else use the framework without your help',
						'Check that substitutions produce coherent output'
					]
				},
				{
					label: 'The test',
					kind: 'list',
					items: [
						'Can someone else use your framework to produce quality output without your help?'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Framework tested with 2+ different contexts',
						'Configuration files for customization',
						'Quality rubric for scoring outputs',
						'Someone else can use the framework independently'
					]
				}
			]
		}
	],
	cta: {
		primary: { label: 'Start at Level 0', href: '#level-0' },
		secondary: {
			label: 'Read the voice guide',
			href: 'https://github.com/nino-chavez/blog/blob/main/docs/signal-dispatch-voice-guide.md'
		}
	}
};
