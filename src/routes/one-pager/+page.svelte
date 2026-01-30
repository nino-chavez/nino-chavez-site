<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	const proofPoints = [
		{
			metric: '25 yrs',
			label: 'Enterprise Delivery',
			detail: 'Fortune 500 commerce architecture + AI transformation'
		},
		{
			metric: 'Live',
			label: 'Rally HQ',
			detail: 'Tournament SaaS in open beta, serving midwest volleyball'
		},
		{
			metric: '28',
			label: 'Academy Modules',
			detail: 'AI Analyst training curriculum with hands-on labs'
		},
		{
			metric: '196',
			label: 'Essays Published',
			detail: 'Signal Dispatch: AI, architecture, and commerce'
		}
	];

	const howIWork = [
		{
			title: 'AI-Native Builder',
			description: 'Rally HQ is live in open beta—real tournament management SaaS built with AI agents. Not demos, production.',
			evidence: 'https://rallyhq.app'
		},
		{
			title: 'Teaching What I Know',
			description: 'AI Analyst Academy: 28 modules from prompt engineering to enterprise architecture. Hands-on labs, real projects.',
			evidence: 'https://academy.ninochavez.co'
		},
		{
			title: 'Full-Stack Business Thinking',
			description: 'Strategy, architecture, implementation, deployment. I carry context from whiteboard to production without handoff loss.',
			evidence: '/work'
		}
	];

	const workingPrinciples = [
		'AI-native velocity as baseline, not exception',
		'Products over billable hours',
		'Output over utilization metrics',
		'Problems worth solving with people worth working alongside'
	];

	const background = [
		{
			era: 'Enterprise Foundation',
			years: '2000-2023',
			description: 'Fortune 500 commerce architecture. SAP, Salesforce, Adobe. Led $10M+ programs with 100+ person teams.'
		},
		{
			era: 'AI-Native Builder',
			years: '2023-Present',
			description: 'Shipped Rally HQ, AI Academy, Signal Dispatch. Created AEGIS governance framework. Learning by building.'
		},
		{
			era: 'Commerce.com',
			years: '2026-Present',
			description: 'Product Architect. Building AI-native commerce infrastructure at scale.'
		}
	];

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>How I Work - Nino Chavez | Product Architect</title>
	<meta name="description" content="Product Architect at Commerce.com. Rally HQ live, AI Academy, 25 years enterprise delivery. Here's how I work." />
	<meta name="robots" content="noindex, nofollow" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">

	<!-- Open Graph -->
	<meta property="og:title" content="How I Work - Nino Chavez | Product Architect" />
	<meta property="og:description" content="Product Architect at Commerce.com. AI-native builder with 25 years of enterprise context." />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://ninochavez.co/one-pager" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="How I Work - Nino Chavez" />
	<meta name="twitter:description" content="Product Architect at Commerce.com. AI-native builder with 25 years of enterprise context." />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<!-- Hero Section -->
	<section class="pt-16 pb-12 md:pt-24 md:pb-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			{#if mounted}
				<!-- Status Badge -->
				<div
					in:fade={{ duration: 600, delay: 100 }}
					class="inline-flex items-center gap-2 px-4 py-2 border border-lime-400/50 mb-8"
				>
					<span class="relative flex h-2 w-2">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
					</span>
					<span class="text-sm font-medium text-lime-400 tracking-wide">Product Architect @ Commerce.com</span>
				</div>

				<!-- The Hook -->
				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="font-display text-5xl md:text-7xl tracking-tight mb-6 leading-[0.9]"
				>
					HOW I WORK
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl md:text-2xl text-neutral-400 mb-10 max-w-2xl leading-relaxed"
				>
					25 years of enterprise delivery. The last two building production systems with AI agents—not talking about it, <span class="text-lime-400 font-medium">shipping it</span>.
				</p>

				<!-- Name Card -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 400 }}
					class="flex items-center gap-4 mb-10"
				>
					<div class="w-14 h-14 bg-lime-400 text-black flex items-center justify-center text-xl font-display">
						NC
					</div>
					<div>
						<div class="text-lg font-semibold">Nino Chavez</div>
						<div class="text-neutral-500 text-sm">Chicago, IL</div>
					</div>
				</div>

				<!-- Primary CTA -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 500 }}
					class="flex flex-wrap gap-4"
				>
					<a
						href="/work"
						class="inline-flex items-center gap-2 px-6 py-3 bg-lime-400 text-black font-semibold hover:bg-white transition-colors"
					>
						See the Work
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
					<a
						href="mailto:nino@ninochavez.co"
						class="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 text-white font-semibold hover:border-lime-400 hover:text-lime-400 transition-colors"
					>
						Get in Touch
					</a>
				</div>
			{/if}
		</div>
	</section>

	<!-- Proof Points -->
	<section class="py-12 px-6 md:px-12 border-y border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">The Evidence</h2>

			<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{#each proofPoints as point}
					<div class="bg-neutral-900/50 border border-neutral-800 p-5 hover:border-lime-400/50 transition-colors">
						<div class="text-3xl md:text-4xl font-display text-lime-400 mb-1">{point.metric}</div>
						<div class="text-sm font-semibold text-white mb-2">{point.label}</div>
						<div class="text-xs text-neutral-500 leading-relaxed">{point.detail}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- How I Work -->
	<section class="py-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">What I Bring</h2>

			<div class="grid md:grid-cols-3 gap-6">
				{#each howIWork as item}
					<div class="border border-neutral-800 p-6 hover:border-lime-400/50 transition-colors">
						<h3 class="text-lg font-display text-white mb-3 tracking-wide">{item.title.toUpperCase()}</h3>
						<p class="text-sm text-neutral-400 leading-relaxed mb-4">{item.description}</p>
						<a
							href={item.evidence}
							target={item.evidence.startsWith('http') ? '_blank' : undefined}
							rel={item.evidence.startsWith('http') ? 'noopener noreferrer' : undefined}
							class="inline-flex items-center gap-1 text-sm text-lime-400 hover:text-white transition-colors"
						>
							See it live
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- The Shift -->
	<section class="py-16 px-6 md:px-12 bg-neutral-900/30 border-y border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">The Shift I Made</h2>

			<div class="max-w-2xl space-y-6">
				<div class="flex items-start gap-6">
					<span class="text-neutral-600 font-display text-2xl w-16 flex-shrink-0">FROM</span>
					<span class="text-xl text-neutral-400">Consultant managing delivery teams for billable hours</span>
				</div>

				<div class="flex items-start gap-6">
					<span class="text-lime-400 font-display text-2xl w-16 flex-shrink-0">TO</span>
					<span class="text-xl text-white font-medium">Product Architect shipping AI-native commerce infrastructure</span>
				</div>
			</div>

			<div class="mt-10 max-w-2xl space-y-4 text-neutral-400 leading-relaxed">
				<p>
					I stopped selling strategy about AI and started <span class="text-white">building production systems with it</span>.
					Rally HQ is live. AI Academy has 28 modules. Signal Dispatch has 196 essays. I learned what's hype and what ships.
				</p>
				<p>
					Now I'm at Commerce.com, where AI-native velocity is <span class="text-lime-400">the baseline expectation</span>.
				</p>
			</div>
		</div>
	</section>

	<!-- Background Timeline -->
	<section class="py-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">Background</h2>

			<div class="space-y-4">
				{#each background as era}
					<div class="border border-neutral-800 p-6 hover:border-lime-400/30 transition-colors">
						<div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
							<h3 class="text-lg font-display text-white tracking-wide">{era.era.toUpperCase()}</h3>
							<span class="text-lime-400 font-mono text-sm">{era.years}</span>
						</div>
						<p class="text-sm text-neutral-400 mt-3">{era.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Working Principles -->
	<section class="py-16 px-6 md:px-12 border-t border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">What I Optimize For</h2>

			<div class="grid md:grid-cols-2 gap-4">
				{#each workingPrinciples as item}
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-lime-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-neutral-300">{item}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 px-6 md:px-12 border-t border-neutral-800">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="font-display text-4xl md:text-5xl tracking-tight mb-6">
				WANT TO CONNECT?
			</h2>
			<p class="text-lg text-neutral-400 mb-10 max-w-xl mx-auto">
				I write about AI-native development, commerce architecture, and the consulting industry at Signal Dispatch.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="https://blog.ninochavez.co"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-lime-400 text-black font-semibold hover:bg-white transition-colors"
				>
					Signal Dispatch
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
				<a
					href="https://www.linkedin.com/in/nino-chavez/"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-700 text-white font-semibold hover:border-lime-400 hover:text-lime-400 transition-colors"
				>
					LinkedIn
				</a>
				<a
					href="mailto:nino@ninochavez.co"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 border border-neutral-800 text-neutral-400 font-semibold hover:border-neutral-700 hover:text-white transition-colors"
				>
					Email
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-neutral-800">
		<div class="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-neutral-600 font-mono">
				© 2026 NINO CHAVEZ
			</p>
			<div class="flex items-center gap-6">
				<a href="https://blog.ninochavez.co" class="text-sm text-neutral-500 hover:text-lime-400 transition-colors">
					Blog
				</a>
				<a href="/cv" class="text-sm text-neutral-500 hover:text-lime-400 transition-colors">
					Full CV
				</a>
				<a href="/" class="text-sm text-neutral-500 hover:text-lime-400 transition-colors">
					Portfolio
				</a>
			</div>
		</div>
	</footer>
</div>

<style>
	.font-display {
		font-family: 'Bebas Neue', sans-serif;
	}

	/* Print styles */
	@media print {
		.bg-black {
			background: white !important;
			color: black !important;
		}

		.text-lime-400 {
			color: #65a30d !important;
		}

		.text-neutral-400,
		.text-neutral-500 {
			color: #374151 !important;
		}

		.border-neutral-800 {
			border-color: #e5e7eb !important;
		}
	}
</style>
