/**
 * Strategist track — ported from src/routes/ai/learn/strategist/+page.svelte per
 * the Stage 1 verdicts (research/current-state/old-corpus-inventory.md §7): the
 * consultant-voice pedagogy and POV/brief level spine are sound but were entirely
 * AI-absent (the old track diagnosed as ZERO AI content — "fails the show-the-AI
 * test hardest"). Rebuild rule: each level now names where the agent does the
 * drafting, grounded ONLY in what Blueprint's doc stages actually do — charter,
 * prescription, strategy summary, and the docs-stage validation script. mailto
 * CTA cut (P7); grounding bound to Blueprint, whose strategy-document stages are
 * consulting-grade docs generated with an agent and inspectable on its self-demo.
 */
import type { Track } from '../types';

export const strategist: Track = {
	id: 'strategist',
	title: 'Strategist',
	tagline: 'Write consulting-grade docs',
	description:
		'From strategy docs that bury the recommendation on page 12 to consulting-grade briefs that lead with the answer, back it up, and get decisions made.',
	finalArtifact: 'Executive-ready strategic brief',
	timeline: '6-10 weeks',
	hero: {
		h1: 'Write Consulting-Grade Strategic Docs',
		subhead:
			'Most strategy documents bury the recommendation on page 12. This track teaches you to write like a consultant—lead with the answer, back it up, get decisions made.'
	},
	whoFor: {
		for: [
			'You advise clients or stakeholders on strategy',
			'You write for executives who need to make decisions',
			'You want to communicate recommendations clearly and persuasively',
			'You come from consulting, advisory, or leadership roles'
		],
		notFor: [
			"You're building software, not advising on it (that's the Builder track)",
			'You need technical architecture documentation (that is the Architect track)',
			"You're exploring AI for self-understanding (that is the Explorer track)",
			'You prefer showing data without recommending action'
		]
	},
	keyConcept: {
		title: 'The Consultant Voice',
		body:
			"Strategic writing isn't about being right — it's about being clear enough to be useful. Don't write \"There are several options to consider, each with various trade-offs...\"; write \"We recommend Option B. Here's why, and here's what it costs.\" Your job is to synthesize complexity into actionable recommendations — not to transfer the complexity to your reader."
	},
	grounding: [
		{
			artifactId: 'blueprint',
			role: 'Its strategy-document stages — charter, prescription, strategy summary — are consulting-grade docs generated with an agent, publicly inspectable on its live self-demo.'
		}
	],
	levels: [
		{
			level: 0,
			title: 'Learn the Consultant Voice',
			duration: '1-2 days',
			goal: 'Understand how consultants write differently than engineers or academics.',
			checkpoint: 'You can identify 5 voice patterns in a sample POV',
			sections: [
				{
					label: 'Voice patterns to learn',
					kind: 'keyval',
					items: [
						'BLUF — Bottom Line Up Front: lead with the recommendation',
						'Options + Recommendation — present choices, then advocate for one',
						'So What? — every data point needs an implication',
						'Confident Uncertainty — "Based on X, we recommend Y," not "maybe try Y?"',
						'Structured Assertions — numbered lists, clear hierarchy, scannable'
					]
				},
				{
					label: 'Anti-patterns to avoid',
					kind: 'list',
					items: [
						'Hedging without a position ("There are many options...")',
						'Data dumps without synthesis',
						'Academic distance ("Research suggests...")',
						'Burying the recommendation at the end'
					]
				},
				{
					label: 'Where the agent does the work',
					kind: 'keyval',
					items: [
						'Register check — the agent drafts, then a reviewer pass flags hedging, academic distance, and buried recommendations against the methodology\'s voice rules before the doc ships',
						'What stays yours — the position. The agent enforces the voice; you decide what the doc argues. Blueprint runs reviewer agents over every generated doc for exactly this gate'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Read 2-3 consulting POVs or strategy docs',
						'Identify which patterns they use',
						'Note what feels different from technical writing'
					]
				}
			]
		},
		{
			level: 1,
			title: 'Write Your First POV',
			duration: '1-2 weeks',
			goal: 'Produce a 2,000 word point-of-view document with clear recommendations.',
			checkpoint: 'You have a POV someone could act on without asking you clarifying questions',
			sections: [
				{
					label: 'POV structure',
					kind: 'keyval',
					items: [
						'Executive Summary — 200-300 words: the entire argument in miniature',
						'Context & Problem — what triggered this? why does it matter?',
						'Options Analysis — 2-3 approaches with trade-offs',
						'Recommendation — what you advise and why',
						'Next Steps — specific, actionable, time-bound'
					]
				},
				{
					label: 'Requirements',
					kind: 'list',
					items: [
						'Pick a real problem (your company, a client, a domain you know)',
						'Have a genuine opinion about what should be done',
						'Be willing to be wrong — POVs are stakes in the ground'
					]
				},
				{
					label: 'Where the agent does the work',
					kind: 'keyval',
					items: [
						'Draft from a corpus, not a blank page — the agent assembles a research corpus first, then drafts the doc from it; Blueprint\'s Stage 1 research feeds the Stage 2 charter and prescription so the first draft starts from evidence',
						'What stays yours — the opinion. The agent gathers and drafts; you own the stake in the ground it is arguing for'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'2,000+ word document with all 5 sections',
						'Clear recommendation (not "it depends")',
						'Someone unfamiliar with the topic can understand your position'
					]
				}
			]
		},
		{
			level: 2,
			title: 'Cross-Domain Pattern Recognition',
			duration: '2-3 weeks',
			goal: 'Draw insights from multiple industries to strengthen your arguments.',
			checkpoint: 'Your POVs reference patterns from 3+ different contexts',
			sections: [
				{
					label: 'Techniques',
					kind: 'keyval',
					items: [
						'Analogical Reasoning — "This is like when X industry faced Y..."',
						'Pattern Extraction — identify the abstract principle, apply to a new context',
						'Counter-Example — show where the pattern broke down and why'
					]
				},
				{
					label: 'Where to find patterns',
					kind: 'list',
					items: [
						'Industry reports (Gartner, Forrester, McKinsey)',
						'Case studies from adjacent domains',
						'Historical precedents (tech history, business history)',
						'Your own past projects (if you can abstract the pattern)'
					]
				},
				{
					label: 'Where the agent does the work',
					kind: 'keyval',
					items: [
						'The scan is generated — the agent runs the cross-context pass; Blueprint\'s research stage produces a competitive analysis and market comparables, so the patterns you cite come from an assembled scan',
						'What stays yours — relevance. The agent surfaces the analogies; you judge which ones add credibility and which are decoration'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Write a POV that references 3 different industries/contexts',
						'Each reference adds credibility (not just decoration)',
						'You can explain why each analogy is relevant'
					]
				}
			]
		},
		{
			level: 3,
			title: 'Strategic Briefs with Options',
			duration: '2-3 weeks',
			goal: 'Present multiple strategic options with clear trade-off analysis.',
			checkpoint: 'You have a brief with options matrix that a decision-maker could use',
			sections: [
				{
					label: 'Strategic brief structure',
					kind: 'keyval',
					items: [
						"Situation — what's happening? what's at stake?",
						'Options — 3 distinct approaches (not variations of one)',
						'Analysis — trade-off matrix across key dimensions',
						'Recommendation — which option and why',
						'Risks & Mitigations — what could go wrong with your recommendation'
					]
				},
				{
					label: 'Trade-off dimensions',
					kind: 'list',
					items: [
						'Cost (implementation + ongoing)',
						'Timeline (time to value)',
						'Risk (technical, organizational, market)',
						'Capability required (skills, resources)',
						'Strategic fit (alignment with direction)'
					]
				},
				{
					label: 'Where the agent does the work',
					kind: 'keyval',
					items: [
						"Options table — the agent fills benefit / trade-off / risk across your dimensions; Blueprint's prescription stage emits prescription items carrying those trade-offs",
						'Risk register — the agent lists each recommendation\'s riskiest assumptions and the evidence class behind each; Blueprint\'s docs stage emits exactly this as a validation script',
						'What stays yours — the decision. Options must be genuinely different (not "do it fast" vs "do it slow"); the agent fills the matrix, you pick the row'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Brief with 3 genuinely different options',
						'Trade-off matrix covering 4+ dimensions',
						'Clear recommendation with risk acknowledgment',
						'Decision-maker can choose without additional research'
					]
				}
			]
		},
		{
			level: 4,
			title: 'Executive Communication',
			duration: '3+ weeks',
			goal: 'Write for board-level audiences who have 5 minutes and high stakes.',
			checkpoint: 'You have an executive package (summary + appendix) that works at multiple depths',
			sections: [
				{
					label: 'Executive communication principles',
					kind: 'keyval',
					items: [
						'Pyramid Principle — start with the conclusion, then supporting points, then details',
						'One Page Rule — if they read only one page, they get the full picture',
						"Appendix Depth — details exist but don't interrupt the main argument",
						'Visual Hierarchy — scanning should reveal structure and priority'
					]
				},
				{
					label: 'The executive package',
					kind: 'keyval',
					items: [
						'One-Pager — the entire recommendation on one page',
						'Executive Summary — 2-3 page expansion with key evidence',
						'Full Brief — the complete analysis (10-20 pages)',
						'Appendices — data, methodology, detailed options'
					]
				},
				{
					label: 'Where the agent does the work',
					kind: 'keyval',
					items: [
						"Layered in one pass — the agent generates the package at multiple depths; Blueprint's charter is the one-page executive read while its prescription and strategy summary carry the full analysis and appendix depth",
						'The pyramid holds — the summary derives from the same source as the detail rather than being written separately, so the one-pager cannot contradict the full brief. All of it is inspectable on the live self-demo'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Executive package with all 4 components',
						'One-pager is self-sufficient',
						'Full brief adds depth without contradicting the summary',
						'Someone at C-level could make a decision from this'
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
