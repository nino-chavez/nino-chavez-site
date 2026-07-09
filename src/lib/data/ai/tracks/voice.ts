/**
 * Voice track — ported from src/routes/ai/learn/voice/+page.svelte per the
 * Stage 1 verdicts (research/current-state/old-corpus-inventory.md §9): this is
 * the highest-evidence track. Level spine, who-for, and "Why Voice Guides Fail"
 * Mined verbatim; the validation/drift levels (old :84-133), which the old page
 * left ASSERTED, now bind to the real system behind this blog's voice — the
 * published Signal Dispatch voice guide (voice-guide) and claude-recall-cli, the
 * corpus/recall machinery that mines transcripts into a voice stack. mailto CTA
 * cut (P7); grounding bound to the two shipped artifacts (P4).
 */
import type { Track } from '../types';

export const voice: Track = {
	id: 'voice',
	title: 'Voice',
	tagline: 'Define consistent voice at scale',
	description:
		'Analyze your writing, document patterns, build validation systems that enforce consistency across thousands of words.',
	finalArtifact: 'Complete voice system with validation',
	timeline: '6-10 weeks',
	hero: {
		h1: 'Define and Maintain Voice at Scale',
		subhead:
			'"Be conversational" isn\'t a voice guide. This track teaches you to document voice precisely enough that AI can replicate it—and validate when it drifts.'
	},
	whoFor: {
		for: [
			'You produce content regularly and want consistent voice',
			'You want AI to sound like you, not like generic AI',
			'You\'re a blogger, writer, or thought leader with an audience',
			'You write for different contexts (blog vs docs vs email)'
		],
		notFor: [
			'You\'re just starting to explore AI (see the Explorer track)',
			'You don\'t have existing writing to analyze',
			'You need architecture docs, not content (see the Architect track)',
			'You want generic AI output, not your voice specifically'
		]
	},
	keyConcept: {
		title: 'Why Voice Guides Fail',
		body:
			'Most voice guides are too vague to be useful. Vague and useless: "Be conversational and approachable." Specific and actionable: "Start with a question. Second-person you. No sentences over 20 words. Contractions always." A good voice guide is specific enough that you could check compliance automatically.'
	},
	grounding: [
		{
			artifactId: 'voice-guide',
			role: 'The shipped voice spec this track teaches you to write — voice documented precisely enough that an agent replicates and validates it. Read it and copy the pattern.'
		},
		{
			artifactId: 'claude-recall-cli',
			role: 'The corpus + recall tooling that makes the voice measurable and driftable — it mines transcripts into a voice stack. Now public; clone it.'
		}
	],
	levels: [
		{
			level: 0,
			title: 'Analyze Your Own Writing',
			duration: '1-2 days',
			goal: 'Find the patterns you already use—before trying to codify them.',
			checkpoint: 'You can identify 5 distinct patterns in your existing writing',
			sections: [
				{
					label: 'Analysis method',
					kind: 'flow',
					items: [
						'Gather 10-20 pieces of your writing (posts, emails, docs)',
						'Read them looking for patterns, not quality',
						'Note: sentence length, opening patterns, word choices, tone shifts',
						'Look for what you do consistently (intentional or not)'
					]
				},
				{
					label: 'Patterns to look for',
					kind: 'keyval',
					items: [
						'Sentence Rhythm — Short punchy? Long flowing? Mixed?',
						'Opening Hooks — Questions? Bold claims? Stories? Data?',
						'Tone Markers — Formal/casual? Confident/tentative? Direct/exploratory?',
						'Structural Habits — Lists? Paragraphs? Headers? Mixed?',
						'Signature Phrases — Words or phrases you use repeatedly'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'List of 5+ patterns you noticed in your writing',
						'Examples of each pattern from your actual work',
						'Notes on which patterns feel intentional vs accidental'
					]
				}
			]
		},
		{
			level: 1,
			title: 'Write Your First Voice Guide',
			duration: '1-2 weeks',
			goal: 'Document your voice so others (or AI) can replicate it.',
			checkpoint: 'You have a 3,000+ word voice specification',
			sections: [
				{
					label: 'Voice guide sections',
					kind: 'keyval',
					items: [
						'Core Identity — Who is speaking? What do they believe? What makes them distinctive?',
						'Tone Spectrum — Where on the formal/casual, confident/humble, direct/exploratory axes?',
						'Structural Patterns — How are ideas organized? What formats are preferred?',
						'Language Choices — Words to use, words to avoid, signature phrases',
						'Examples — Before/after showing voice applied'
					]
				},
				{
					label: 'Requirements',
					kind: 'list',
					items: [
						'Be specific—"conversational" is too vague',
						'Include anti-patterns (what NOT to do)',
						'Show don\'t just tell (examples > descriptions)'
					]
				},
				{
					label: 'The worked example',
					kind: 'list',
					items: [
						'The published Signal Dispatch voice guide is exactly this artifact — a voice spec precise enough that an agent can replicate and validate it. It is the voice that runs this blog. Read it and copy the pattern.'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'3,000+ word voice guide with all 5 sections',
						'At least 3 before/after examples',
						'Someone else can read it and understand your voice'
					]
				}
			]
		},
		{
			level: 2,
			title: 'Create Multiple Voice Profiles',
			duration: '2-3 weeks',
			goal: 'Define distinct voices for different contexts or audiences.',
			checkpoint: 'You have 2 documented voice profiles that are clearly different',
			sections: [
				{
					label: 'Voice contexts',
					kind: 'keyval',
					items: [
						'Audience — Technical readers vs executives vs general public',
						'Purpose — Teaching vs persuading vs documenting',
						'Medium — Blog posts vs documentation vs social media',
						'Domain — Thought leadership vs architecture (inverted voice)'
					]
				},
				{
					label: 'Technique',
					kind: 'flow',
					items: [
						'Start with your base voice',
						'Identify what changes for each context',
						'Document the delta, not a complete rewrite',
						'Create switching rules (when to use which voice)'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'2 distinct voice profiles documented',
						'Clear switching rules between them',
						'Examples of same content in both voices',
						'Someone else can identify which voice a piece uses'
					]
				}
			]
		},
		{
			level: 3,
			title: 'Build Automated Validation',
			duration: '2-3 weeks',
			goal: 'Create checks that catch voice drift without manual review.',
			checkpoint: 'You have automated voice validation that catches violations',
			sections: [
				{
					label: 'Validation approaches',
					kind: 'keyval',
					items: [
						'Word Lists — Flag banned words, suggest alternatives',
						'Pattern Matching — Check for required/forbidden sentence structures',
						'LLM Scoring — Prompt an LLM to score adherence to voice guide',
						'Comparative Analysis — Compare new content to a corpus of approved content'
					]
				},
				{
					label: 'Implementation',
					kind: 'flow',
					items: [
						'Start simple—word list checks work for most cases',
						'Add LLM scoring for nuanced violations',
						'Build a feedback loop (violations → guide updates)',
						'Track metrics (violations over time, common issues)'
					]
				},
				{
					label: 'The real system',
					kind: 'list',
					items: [
						'Comparative analysis against a corpus is exactly what claude-recall-cli does: it mines your Claude Code transcripts into a searchable corpus and a voice stack you can score new writing against. It is the machinery behind this blog\'s voice, and it is public — clone it.'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Working validation tool (any approach)',
						'Can catch at least 3 types of violations',
						'Feedback mechanism to improve the guide',
						'Documented false positive rate'
					]
				}
			]
		},
		{
			level: 4,
			title: 'Orchestrate Multi-Voice Systems',
			duration: '3+ weeks',
			goal: 'Manage multiple voices across teams or content types at scale.',
			checkpoint: 'You have a voice system that works without your direct involvement',
			sections: [
				{
					label: 'System components',
					kind: 'keyval',
					items: [
						'Voice Registry — Catalog of all voices with metadata (owner, use cases, last updated)',
						'Selection Logic — Rules for which voice applies to which content',
						'Validation Pipeline — Automated checks run on all content before publish',
						'Drift Detection — Monitor for voice inconsistency over time',
						'Governance — Who can create/modify voices, approval workflows'
					]
				},
				{
					label: 'Metrics to track',
					kind: 'list',
					items: [
						'Voice consistency score across content',
						'Time to validate new content',
						'False positive/negative rates',
						'Voice drift over time'
					]
				},
				{
					label: 'The actual system behind this blog',
					kind: 'list',
					items: [
						'This is not hypothetical. The Signal Dispatch voice guide plus claude-recall-cli are the running version: a documented voice spec, and the recall machinery that keeps it measurable and flags drift. The pair is exactly what this track walks you toward building for your own voice.'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Voice registry with 3+ documented voices',
						'Automated selection and validation',
						'Governance process documented',
						'System works without you for 2+ weeks'
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
