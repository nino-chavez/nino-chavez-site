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
	<meta name="description" content="Product Architect at Commerce.com. 8+ production apps, 3 AI frameworks, 25 years enterprise delivery. Here's how I work." />
	<meta name="robots" content="noindex, nofollow" />

	<!-- Open Graph -->
	<meta property="og:title" content="How I Work - Nino Chavez | Product Architect" />
	<meta property="og:description" content="Product Architect at Commerce.com. AI-native builder with 25 years of enterprise context." />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://ninochavez.co/one-pager" />
	<meta property="og:image" content="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop&q=80" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="How I Work - Nino Chavez" />
	<meta name="twitter:description" content="Product Architect at Commerce.com. AI-native builder with 25 years of enterprise context." />
	<meta name="twitter:image" content="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=630&fit=crop&q=80" />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white">
	<!-- Hero Section -->
	<section class="pt-16 pb-12 md:pt-24 md:pb-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			{#if mounted}
				<!-- Status Badge -->
				<div
					in:fade={{ duration: 600, delay: 100 }}
					class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-8"
				>
					<div class="w-2 h-2 bg-blue-400 rounded-full" />
					<span class="text-sm font-medium text-blue-400">Product Architect @ Commerce.com</span>
				</div>

				<!-- The Hook -->
				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					How I Work
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl leading-relaxed"
				>
					25 years of enterprise delivery. The last two building production systems with AI agents—not talking about it, <span class="text-white font-semibold">shipping it</span>.
				</p>

				<!-- Name Card -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 400 }}
					class="flex items-center gap-4 mb-8"
				>
					<div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-2xl font-bold">
						NC
					</div>
					<div>
						<div class="text-xl font-bold">Nino Chavez</div>
						<div class="text-gray-400">Chicago, IL</div>
					</div>
				</div>

				<!-- Primary CTA -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 500 }}
					class="flex flex-wrap gap-4"
				>
					<a
						href="/work"
						class="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
						</svg>
						See the Work
					</a>
					<a
						href="mailto:nino@ninochavez.co"
						class="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						Get in Touch
					</a>
				</div>
			{/if}
		</div>
	</section>

	<!-- Proof Points -->
	<section class="py-12 px-6 md:px-12 bg-gray-900/50">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">The Evidence</h2>

			<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{#each proofPoints as point}
					<div class="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-colors duration-300">
						<div class="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{point.metric}</div>
						<div class="text-sm font-semibold text-white mb-2">{point.label}</div>
						<div class="text-xs text-gray-500 leading-relaxed">{point.detail}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- How I Work -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">What I Bring</h2>

			<div class="grid md:grid-cols-3 gap-6">
				{#each howIWork as item}
					<div class="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
						<h3 class="text-lg font-bold text-white mb-3">{item.title}</h3>
						<p class="text-sm text-gray-400 leading-relaxed mb-4">{item.description}</p>
						<a
							href={item.evidence}
							class="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
						>
							See the work
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</a>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- The Shift -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gradient-to-r from-blue-500/10 to-violet-500/10 border-y border-gray-800">
		<div class="max-w-5xl mx-auto">
			<div class="max-w-3xl">
				<h2 class="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-6">The Shift I Made</h2>

				<div class="space-y-6">
					<div class="flex items-start gap-4">
						<div class="text-2xl text-gray-600">FROM</div>
						<div class="text-xl text-gray-400">Consultant managing delivery teams for billable hours</div>
					</div>

					<div class="flex items-start gap-4">
						<div class="text-2xl text-blue-400 font-bold">TO</div>
						<div class="text-xl text-white font-semibold">Product Architect shipping AI-native commerce infrastructure</div>
					</div>
				</div>

				<p class="mt-8 text-gray-400 leading-relaxed">
					I stopped selling strategy about AI and started <span class="text-white">building production systems with it</span>.
					Rally HQ is live. AI Academy has 28 modules. Signal Dispatch has 196 essays. I learned what's hype and what ships.
				</p>

				<p class="mt-4 text-gray-400 leading-relaxed">
					Now I'm at Commerce.com, where AI-native velocity is <span class="text-white">the baseline expectation</span>.
				</p>
			</div>
		</div>
	</section>

	<!-- Background Timeline -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">Background</h2>

			<div class="space-y-4">
				{#each background as era}
					<div class="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-blue-500/30 transition-colors duration-300">
						<div class="flex flex-col md:flex-row md:items-start gap-4">
							<div class="flex-1">
								<h3 class="text-lg font-bold text-white mb-1">{era.era}</h3>
								<p class="text-sm text-blue-400 mb-2">{era.years}</p>
								<p class="text-sm text-gray-400">{era.description}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Working Principles -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/50">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">What I Optimize For</h2>

			<div class="grid md:grid-cols-2 gap-4">
				{#each workingPrinciples as item}
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span class="text-gray-300">{item}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 md:py-24 px-6 md:px-12">
		<div class="max-w-5xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">
				Want to connect?
			</h2>
			<p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
				I write about AI-native development, commerce architecture, and the consulting industry at Signal Dispatch.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="https://blog.ninochavez.co"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
					</svg>
					Signal Dispatch
				</a>
				<a
					href="https://www.linkedin.com/in/nino-chavez/"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
					</svg>
					LinkedIn
				</a>
				<a
					href="mailto:nino@ninochavez.co"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-400 font-semibold rounded-lg hover:text-white border border-gray-800 hover:border-gray-700 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					Email
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				2026 Nino Chavez
			</p>
			<div class="flex items-center gap-6">
				<a
					href="https://blog.ninochavez.co"
					class="text-sm text-gray-500 hover:text-white transition-colors duration-200"
				>
					Blog
				</a>
				<a
					href="/cv"
					class="text-sm text-gray-500 hover:text-white transition-colors duration-200"
				>
					Full CV
				</a>
				<a
					href="/"
					class="text-sm text-gray-500 hover:text-white transition-colors duration-200"
				>
					Portfolio
				</a>
			</div>
		</div>
	</footer>
</div>

<style>
	/* Print styles */
	@media print {
		.bg-gray-950 {
			background: white !important;
			color: black !important;
		}

		.text-blue-400 {
			color: #2563eb !important;
		}

		.text-gray-400,
		.text-gray-500 {
			color: #374151 !important;
		}
	}
</style>
