<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	const proofPoints = [
		{
			metric: '8+',
			label: 'Production Apps',
			detail: 'Shipped to production, not demos or prototypes'
		},
		{
			metric: '7 days',
			label: 'Zero-to-Production',
			detail: 'Rally HQ: Production SaaS built solo with AI agents'
		},
		{
			metric: '3',
			label: 'AI Frameworks',
			detail: 'AEGIS, Agent OS, Signal Forge - proprietary methodology'
		},
		{
			metric: '25 yrs',
			label: 'Enterprise Delivery',
			detail: 'Fortune 500 commerce + AI transformation'
		}
	];

	const targetEnvironments = [
		{
			company: 'AI-Native Tool Builders',
			examples: 'Replit, Cursor, Vercel',
			why: 'Building the tools I already use to multiply output',
			fit: 'I ship with these tools daily. I understand the user.'
		},
		{
			company: 'Commerce Avant-Garde',
			examples: 'Stripe, Shopify, Faire',
			why: 'Where commerce is an engineering problem, not a consulting deck',
			fit: 'I understand commerce at the architecture level.'
		},
		{
			company: 'Applied AI Labs',
			examples: 'Anthropic, OpenAI (Applied)',
			why: 'Building AI products, not just research',
			fit: 'I build production systems with these models.'
		}
	];

	const whatIBring = [
		{
			title: 'Zero-to-One Velocity',
			description: 'I ship production apps in days using AI agents. Rally HQ (137 services) in 7 days. Not prototypes—production SaaS.',
			evidence: '/work/rally-hq'
		},
		{
			title: 'AI Governance at Scale',
			description: 'I built AEGIS—a constitutional framework for AI code generation. I think about AI adoption at enterprise scale.',
			evidence: '/work/aegis'
		},
		{
			title: 'Full-Stack Business Thinking',
			description: 'Strategy, architecture, implementation, deployment. I carry context from whiteboard to production without handoff loss.',
			evidence: '/work'
		}
	];

	const whatImLookingFor = [
		'A team where AI-native velocity is the baseline, not the exception',
		'Peers who think in products, not billable hours',
		'An environment that measures output, not utilization',
		'Problems worth solving with people worth working alongside'
	];

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>Actively Interviewing - Nino Chavez | Product Engineer</title>
	<meta name="description" content="Product Engineer actively interviewing for roles at AI-native companies. 8+ production apps, 3 AI frameworks, 25 years enterprise delivery." />
	<meta name="robots" content="noindex, nofollow" />

	<!-- Open Graph -->
	<meta property="og:title" content="Actively Interviewing - Nino Chavez | Product Engineer" />
	<meta property="og:description" content="Product Engineer seeking teams where AI-native velocity is the baseline." />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://ninochavez.co/one-pager" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Actively Interviewing - Nino Chavez" />
	<meta name="twitter:description" content="Product Engineer seeking teams where AI-native velocity is the baseline." />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white">
	<!-- Hero Section -->
	<section class="pt-16 pb-12 md:pt-24 md:pb-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			{#if mounted}
				<!-- Status Badge -->
				<div
					in:fade={{ duration: 600, delay: 100 }}
					class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-8"
				>
					<div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
					<span class="text-sm font-medium text-emerald-400">Actively Interviewing</span>
				</div>

				<!-- The Hook -->
				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-5xl font-bold mb-6 leading-tight"
				>
					I'm looking for a team where<br />
					<span class="text-emerald-400">AI-native velocity is the norm.</span>
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl leading-relaxed"
				>
					Product Engineer with 25 years of enterprise delivery.
					I've spent the last year building production systems with AI agents—not talking about it, <span class="text-white font-semibold">shipping it</span>.
				</p>

				<!-- Name Card -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 400 }}
					class="flex items-center gap-4 mb-8"
				>
					<div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-2xl font-bold">
						NC
					</div>
					<div>
						<div class="text-xl font-bold">Nino Chavez</div>
						<div class="text-gray-400">Chicago, IL · Open to Remote</div>
					</div>
				</div>

				<!-- Primary CTA -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 500 }}
					class="flex flex-wrap gap-4"
				>
					<a
						href="/work"
						class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
						</svg>
						See What I've Built
					</a>
					<a
						href="mailto:abelino.chavez@gmail.com"
						class="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 border border-gray-700 transition-colors"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						Let's Talk
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
					<div class="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-emerald-500/50 transition-colors duration-300">
						<div class="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{point.metric}</div>
						<div class="text-sm font-semibold text-white mb-2">{point.label}</div>
						<div class="text-xs text-gray-500 leading-relaxed">{point.detail}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- What I Bring -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">What I Bring</h2>

			<div class="grid md:grid-cols-3 gap-6">
				{#each whatIBring as item}
					<div class="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
						<h3 class="text-lg font-bold text-white mb-3">{item.title}</h3>
						<p class="text-sm text-gray-400 leading-relaxed mb-4">{item.description}</p>
						<a
							href={item.evidence}
							class="inline-flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
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
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gradient-to-r from-emerald-500/10 to-violet-500/10 border-y border-gray-800">
		<div class="max-w-5xl mx-auto">
			<div class="max-w-3xl">
				<h2 class="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-6">The Shift</h2>

				<div class="space-y-6">
					<div class="flex items-start gap-4">
						<div class="text-2xl text-gray-600">FROM</div>
						<div class="text-xl text-gray-400">Consultant who manages delivery teams for billable hours</div>
					</div>

					<div class="flex items-start gap-4">
						<div class="text-2xl text-emerald-400 font-bold">TO</div>
						<div class="text-xl text-white font-semibold">Product Engineer who ships with AI agents in talent-dense environments</div>
					</div>
				</div>

				<p class="mt-8 text-gray-400 leading-relaxed">
					I spent the last year not selling strategy about AI—but <span class="text-white">building production systems with it</span>.
					I created my own governance frameworks. I documented the methodology. I understand what's hype and what ships.
				</p>

				<p class="mt-4 text-gray-400 leading-relaxed">
					Now I'm looking for an environment where this is <span class="text-white">the baseline expectation</span>, not the exception.
				</p>
			</div>
		</div>
	</section>

	<!-- Target Environments -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">Where I Want to Be</h2>

			<div class="space-y-4">
				{#each targetEnvironments as env}
					<div class="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-emerald-500/30 transition-colors duration-300">
						<div class="flex flex-col md:flex-row md:items-start gap-4">
							<div class="flex-1">
								<h3 class="text-lg font-bold text-white mb-1">{env.company}</h3>
								<p class="text-sm text-emerald-400 mb-2">{env.examples}</p>
								<p class="text-sm text-gray-400">{env.why}</p>
							</div>
							<div class="md:text-right md:max-w-[280px] flex-shrink-0">
								<span class="inline-block px-4 py-2 bg-gray-800 text-gray-300 text-sm rounded-lg leading-snug">
									{env.fit}
								</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- What I'm Looking For -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/50">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">What I'm Looking For</h2>

			<div class="grid md:grid-cols-2 gap-4">
				{#each whatImLookingFor as item}
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span class="text-gray-300">{item}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Interview Questions for Them -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			<div class="bg-violet-500/10 border border-violet-500/20 rounded-xl p-8">
				<h2 class="text-xl font-bold text-white mb-6">Questions I'll Ask You</h2>
				<p class="text-gray-400 mb-6">To make sure we're a mutual fit:</p>

				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<span class="text-violet-400 font-bold">1.</span>
						<span class="text-gray-300">"What's the ratio of builders to facilitators on this team?"</span>
					</div>
					<div class="flex items-start gap-3">
						<span class="text-violet-400 font-bold">2.</span>
						<span class="text-gray-300">"Show me the last thing a single person shipped in one week."</span>
					</div>
					<div class="flex items-start gap-3">
						<span class="text-violet-400 font-bold">3.</span>
						<span class="text-gray-300">"How do you view AI-generated code?"</span>
					</div>
				</div>

				<p class="mt-6 text-sm text-gray-500">
					If the answers are "we have project managers," "a slide deck," and "we're cautious"—we're probably not a fit.
				</p>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-16 md:py-24 px-6 md:px-12">
		<div class="max-w-5xl mx-auto text-center">
			<h2 class="text-3xl md:text-4xl font-bold mb-6">
				Ready to talk?
			</h2>
			<p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
				If you're building something that values velocity, craft, and people who ship—let's connect.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="mailto:abelino.chavez@gmail.com"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					abelino.chavez@gmail.com
				</a>
				<a
					href="https://linkedin.com/in/nino-chavez"
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
					href="/work"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-400 font-semibold rounded-lg hover:text-white border border-gray-800 hover:border-gray-700 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
					Portfolio
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				2025 Nino Chavez
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

		.text-emerald-400 {
			color: #059669 !important;
		}

		.text-gray-400,
		.text-gray-500 {
			color: #374151 !important;
		}
	}
</style>
