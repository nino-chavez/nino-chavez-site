/**
 * Enterprise track — ported from src/routes/ai/learn/enterprise/+page.svelte per
 * the Stage 1 verdicts (research/current-state/old-corpus-inventory.md §10):
 * the identify → build → export → gates → deploy spine, who-for, and the
 * "Skills vs Prompts" concept Mined verbatim; the four skill examples ported and
 * bound to the real shipped kit (they exist as installable tiers in
 * ai-champions-kit); mailto CTA cut (P7); grounding bound to that kit (P4).
 *
 * CUT: the hardcoded Claude Skills spec limits (name < 64 chars / description
 * < 200 / SKILL.md < 5,000 words). appendix-validation.md § Deltas verified two
 * of the three are now false against current docs — exactly the rot the freshness
 * architecture forbids in prose. Replaced with a pointer to the live docs; that
 * pointer IS the lesson.
 */
import type { Track } from '../types';

export const enterprise: Track = {
	id: 'enterprise',
	title: 'Enterprise',
	tagline: 'Scale AI work across teams',
	description:
		'Encode workflows into reusable skills, multi-format exports, quality rubrics, and governance frameworks.',
	finalArtifact: 'Reusable skill with quality gates',
	timeline: '10-16 weeks',
	hero: {
		h1: 'Scale AI Work Across Teams',
		subhead:
			'One skill, used well, beats ten prompts. This track teaches you to extract patterns into reusable skills, add quality gates, and deploy across teams.'
	},
	whoFor: {
		for: [
			'You\'re scaling AI workflows across a team or organization',
			'You need reusable, governed AI capabilities (not one-off prompts)',
			'You\'re a team lead or manager responsible for AI adoption',
			'You\'ve completed at least one other track'
		],
		notFor: [
			'You\'re just getting started with AI (see Explorer Track)',
			'You haven\'t shipped production work yet (see Builder Track)',
			'You\'re working alone without team requirements',
			'You don\'t have recurring workflows to systematize'
		]
	},
	keyConcept: {
		title: 'Skills vs Prompts',
		body:
			'Most teams share prompts. Skills are better. Prompts get copy-pasted and drift over time, carry no versioning or governance, vary in quality by user, and are hard to improve systematically. Skills are versioned, maintained, and governed; they bundle scripts, templates, and references; they produce consistent output; and every improvement benefits everyone.'
	},
	grounding: [
		{
			artifactId: 'ai-champions-kit',
			role: 'The tiered, copy-in library of skills and subagents this track teaches you to build — clone it and install a tier into any project.'
		}
	],
	levels: [
		{
			level: 0,
			title: 'Identify Reusable Patterns',
			duration: '2-3 days',
			goal: 'Find the workflows worth extracting into skills.',
			checkpoint: 'You can identify 3 workflows that would benefit from skill extraction',
			sections: [
				{
					label: 'Signals a workflow needs a skill',
					kind: 'list',
					items: [
						'You do the same type of task repeatedly (weekly+)',
						'Multiple people need to do the same type of task',
						'The output has consistent structure (not freeform)',
						'Quality varies between executions',
						'You\'ve already written instructions or templates for it'
					]
				},
				{
					label: 'Workflow mapping table',
					kind: 'keyval',
					items: [
						'Task — What is it? (e.g., "Write architecture doc")',
						'Frequency — How often? Weekly? Per project?',
						'People — How many people do this?',
						'Structure — How consistent is the output?',
						'Quality Gap — How much does quality vary?'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Mapped 10+ recurring workflows',
						'Scored each on frequency, people, structure, quality gap',
						'Identified top 3 candidates for skill extraction'
					]
				}
			]
		},
		{
			level: 1,
			title: 'Build Your First Skill',
			duration: '2-3 weeks',
			goal: 'Create a working Claude skill for your top workflow.',
			checkpoint: 'You have a skill that produces consistent, quality output',
			sections: [
				{
					label: 'Skill directory structure',
					kind: 'keyval',
					items: [
						'SKILL.md — Core prompt with YAML frontmatter (name, description, triggers)',
						'scripts/ — Python/Bash scripts for automation',
						'references/ — Documentation loaded into context',
						'assets/ — Templates, examples, binary files'
					]
				},
				{
					label: 'Requirements',
					kind: 'list',
					items: [
						'Check the current limits against Anthropic\'s agent-skills docs — platform.claude.com/docs — they change; this page deliberately doesn\'t pin them.',
						'Clear trigger conditions (when should this skill activate?)'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Working SKILL.md with valid frontmatter',
						'Skill produces expected output on 5+ test inputs',
						'Someone else can use the skill without explanation'
					]
				}
			]
		},
		{
			level: 2,
			title: 'Add Multi-Format Export',
			duration: '2-3 weeks',
			goal: 'Extend your skill to output multiple formats.',
			checkpoint: 'Your skill exports to 3+ formats',
			sections: [
				{
					label: 'Common export formats',
					kind: 'keyval',
					items: [
						'Markdown — Version control, editing, collaboration',
						'HTML — Web publishing, previews, interactive elements',
						'PDF — Print, formal delivery, archival',
						'PPTX — Presentations, stakeholder reviews',
						'DOCX — Client edits, redlining, formal documents'
					]
				},
				{
					label: 'Export patterns',
					kind: 'list',
					items: [
						'Generate canonical format first (usually Markdown)',
						'Transform to other formats via scripts',
						'Preserve semantic structure across formats',
						'Handle format-specific features (slides, tracked changes)'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Export to at least 3 formats',
						'Automated format conversion (not manual copy-paste)',
						'Format-specific features preserved (not just text dump)'
					]
				}
			]
		},
		{
			level: 3,
			title: 'Implement Quality Gates',
			duration: '2-3 weeks',
			goal: 'Add validation that catches quality issues before delivery.',
			checkpoint: 'Quality rubric with automated checks',
			sections: [
				{
					label: 'Quality rubric dimensions',
					kind: 'keyval',
					items: [
						'Completeness — All required sections present',
						'Accuracy — Claims verifiable, no hallucinations',
						'Consistency — Terminology, formatting, voice consistent',
						'Actionability — Clear next steps, implementable',
						'Fit — Matches audience, context, constraints'
					]
				},
				{
					label: 'Automation options',
					kind: 'list',
					items: [
						'Structural checks (required sections, word counts)',
						'Terminology validation (banned words, required phrases)',
						'Cross-reference validation (internal links work)',
						'LLM scoring against rubric criteria'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'Quality rubric with 5+ dimensions',
						'At least 2 dimensions automated',
						'Gate blocks delivery when thresholds not met',
						'Documented false positive rate'
					]
				}
			]
		},
		{
			level: 4,
			title: 'Deploy Team-Wide',
			duration: '4+ weeks',
			goal: 'Scale your skill system across teams.',
			checkpoint: 'Multiple teams using skills with governance',
			sections: [
				{
					label: 'Governance components',
					kind: 'keyval',
					items: [
						'Skill Registry — Catalog of skills with metadata (owner, version, status)',
						'Access Control — Who can use, create, modify skills',
						'Version Management — How skills evolve, backward compatibility',
						'Quality Standards — Minimum bar for new skills',
						'Usage Monitoring — Track adoption, success rates, feedback'
					]
				},
				{
					label: 'Skills that ship in ai-champions-kit',
					kind: 'keyval',
					items: [
						'Solution Architecture — Generates arc42 docs with C4 diagrams. References: templates/, quality rubric with 10 dimensions. Triggers: "document the architecture"',
						'Strategic Deck — Creates slide content with brand colors + typography. Scripts: html2pptx converter. Assets: color palettes, font specs.',
						'Governance Playbook — Multi-volume playbook generator with client variable substitution. Quality gate: terminology validation, section completeness.',
						'Voice Auditor — Scores content against voice principles. References: the published voice guide. Output: score card with before/after examples.'
					]
				},
				{
					label: 'Success metrics',
					kind: 'list',
					items: [
						'Skills in production',
						'Users per skill',
						'Time saved vs manual',
						'Quality consistency (variance reduction)',
						'Adoption rate across teams'
					]
				},
				{
					label: 'Checkpoints',
					kind: 'list',
					items: [
						'3+ skills in production use',
						'2+ teams using skill system',
						'Governance process documented and followed',
						'System runs without your involvement for 2+ weeks'
					]
				}
			]
		}
	],
	cta: {
		primary: { label: 'Start at Level 0', href: '#level-0' },
		secondary: {
			label: './install.sh --tier universal',
			href: 'https://github.com/nino-chavez/ai-champions-kit'
		}
	}
};
