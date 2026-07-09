/**
 * Explorer track — ported from src/routes/ai/learn/explorer/+page.svelte per the
 * Stage 1 verdicts (research/current-state/old-corpus-inventory.md §4):
 * persona + "cognitive mirror" concept Mined verbatim (the strongest "apply AI
 * to your own thinking" on-ramp, true without a product); level 0-4 pedagogy
 * Rebuilt into the normalized section shape and bound to shipped artifacts
 * (claude-recall-cli as the working mirror, agentic-ways-of-working as the
 * public method — P4, the track's evidence); the fabricated example version log
 * (:75-80) Cut as illustrative fiction that violates show-don't-assert; mailto
 * "Email Me Your Mirror" CTA Cut (P7), replaced with self-serve next actions.
 */
import type { Track } from '../types';

export const explorer: Track = {
	id: 'explorer',
	title: 'Explorer',
	tagline: 'Use AI to understand yourself',
	description:
		'Before you use AI to produce, use it to reflect. Build cognitive mirrors that show you how you think.',
	finalArtifact: 'Personal cognitive mirror + bridge to creation',
	timeline: '4-8 weeks',
	hero: {
		h1: 'Use AI to Understand Yourself',
		subhead:
			'Before you use AI to produce, use it to reflect. Build prompts that show you how you think—not prompts that think for you.'
	},
	whoFor: {
		for: [
			"You're curious about AI but don't have a specific project",
			'You want to understand how you think, not just get answers',
			"You're forming your mind with AI, not adding AI to a formed mind",
			'You journal, reflect, or want to start'
		],
		notFor: [
			'You already know what you want to build',
			'You need to ship something for work next week',
			'You want AI to do the thinking for you',
			"You're looking for productivity hacks"
		]
	},
	keyConcept: {
		title: 'The Cognitive Mirror',
		body:
			'Most people use AI to get answers. This track teaches you to use AI as a mirror—something that reflects your thinking back to you more clearly than you can see it yourself. The mirror doesn\'t tell you what to think. It shows you how you already think—so you can decide if that\'s serving you.'
	},
	grounding: [
		{
			artifactId: 'claude-recall-cli',
			role: 'Mining your own session transcripts into a searchable memory and voice stack is a working cognitive mirror — the track\'s concept, shipped.'
		},
		{
			artifactId: 'agentic-ways-of-working',
			role: 'The reflection-into-infrastructure method, public and copyable — self-understanding turned into a working practice others can adopt.'
		}
	],
	levels: [
		{
			level: 0,
			title: 'Notice Your Prompts',
			duration: '1-2 days',
			goal: 'Become aware of what you\'re actually asking AI to do. Most people ask AI questions the way they\'d Google something. That\'s not how this works.',
			checkpoint:
				'You can articulate the difference between good and bad prompts you\'ve written',
			sections: [
				{
					label: 'Exercises',
					kind: 'list',
					items: [
						'Write down 5 prompts you\'ve used in the last week',
						'For each one, ask: What did I actually want? Did I get it?',
						'Notice which prompts gave you useful responses vs generic ones',
						'Identify one prompt that surprised you (good or bad)'
					]
				},
				{
					label: 'Prompt patterns',
					kind: 'keyval',
					items: [
						'Vague ask — "Help me with my essay" (AI doesn\'t know what kind of help)',
						'Missing context — "Is this good?" (Good for what? For whom?)',
						'Too broad — "Tell me about AI" (Could be 10,000 different answers)',
						'Clear ask — "Read this paragraph and tell me if the argument is logical" (Specific, bounded, answerable)'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'List of 5 recent prompts with what worked/didn\'t',
						'Can explain why some prompts work better than others',
						'Noticed at least one pattern in your own asking style'
					]
				}
			]
		},
		{
			level: 1,
			title: 'Build Your First Mirror',
			duration: '1 week',
			goal: 'Create a single prompt that helps you understand how you think. A mirror prompt doesn\'t give you answers — it shows you your own thinking more clearly.',
			checkpoint: 'You have a "cognitive mirror" prompt that reveals patterns in your thinking',
			sections: [
				{
					label: 'Mirror components',
					kind: 'keyval',
					items: [
						'Context — Who you are, what you\'re working with (age, situation, goals)',
						'Input format — What you\'ll give the AI (journal entry, decision, problem)',
						'Output structure — How you want the reflection organized (sections, questions, patterns)',
						'Anti-patterns — What you DON\'T want (therapy-speak, empty encouragement, generic advice)',
						'Tone calibration — How direct, how gentle, how challenging'
					]
				},
				{
					label: 'Anti-patterns (what to forbid)',
					kind: 'list',
					items: [
						'Do NOT speak like a therapist',
						'No fake "you got this!!" pep talks',
						'No generic self-help language',
						'No assuming you know what I should do',
						'No fluff or filler'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Working mirror prompt (200+ words)',
						'Tested on at least 3 different inputs',
						'Refined based on what felt useful vs generic',
						'Can explain what makes YOUR mirror different from a generic prompt'
					]
				}
			]
		},
		{
			level: 2,
			title: 'Iterate and Version',
			duration: '1-2 weeks',
			goal: 'Track how your prompts evolve as you learn what works. Your first prompt won\'t be your best — the skill is noticing what to change.',
			checkpoint: 'You have v2 or v3 of your mirror with documented changes',
			sections: [
				{
					label: 'Iteration process',
					kind: 'flow',
					items: [
						'After each use, note what was useful and what wasn\'t',
						'Identify patterns: Does it miss certain things? Overexplain others?',
						'Make one change at a time so you know what improved',
						'Keep old versions — you might want to go back'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'At least 2 versions of your mirror saved',
						'Changelog explaining what changed and why',
						'Can point to specific improvements between versions',
						'Habit of noting what works after each session'
					]
				}
			]
		},
		{
			level: 3,
			title: 'Multiple Modes',
			duration: '2-3 weeks',
			goal: 'Create different prompts for different mental states or needs. You think differently when you\'re stuck vs. excited vs. overwhelmed — your prompts should match.',
			checkpoint: 'You have 3+ prompts for different situations',
			sections: [
				{
					label: 'Possible modes',
					kind: 'keyval',
					items: [
						'Reflection Mode — Processing something that happened (Understanding, pattern recognition)',
						'Decision Mode — Stuck on a choice (Trade-offs, blind spots, values clarification)',
						'Creative Mode — Generating ideas or drafting (Expansion, possibilities, "yes and")',
						'Processing Mode — Emotions are high (Clarity through chaos, separating feeling from fact)',
						'Planning Mode — Figuring out next steps (Sequencing, dependencies, realistic scope)'
					]
				},
				{
					label: 'Calibration notes',
					kind: 'list',
					items: [
						'Each mode needs different tone (gentle vs challenging)',
						'Each mode needs different output (questions vs frameworks vs options)',
						'You\'ll use some modes more than others — that\'s fine',
						'Modes can evolve independently'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'3+ distinct prompts for different situations',
						'Clear criteria for when to use which',
						'Tested each mode at least twice',
						'Can explain how the modes differ and why'
					]
				}
			]
		},
		{
			level: 4,
			title: 'From Reflection to Creation',
			duration: 'Ongoing',
			goal: 'Bridge self-understanding to external output. Levels 0-3 were inward; this level is about taking what you\'ve learned and pointing it outward.',
			checkpoint:
				'You\'ve used what you learned about yourself to create something for others',
			sections: [
				{
					label: 'Questions to sit with',
					kind: 'list',
					items: [
						'What have you learned about how you think?',
						'What would you want to create that reflects that?',
						'Who else might benefit from what you\'ve figured out?',
						'Which track calls to you now that you know yourself better?'
					]
				},
				{
					label: 'Bridges to other tracks',
					kind: 'list',
					items: [
						'Voice track — from understanding your voice to writing that sounds like you',
						'Builder track — from knowing how you think to building tools that think with you',
						'Strategist track — from decision clarity to helping others decide',
						'Author track — from processing patterns to teaching others to process'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Created one thing for someone else using AI',
						'Can articulate what you learned about yourself in Levels 0-3',
						'Identified which track (if any) you want to explore next',
						'Shared your mirror or approach with at least one other person'
					]
				}
			]
		}
	],
	cta: {
		primary: { label: 'Start at Level 0', href: '#level-0' },
		secondary: {
			label: 'clone claude-recall-cli',
			href: 'https://github.com/nino-chavez/claude-recall-cli'
		}
	}
};
