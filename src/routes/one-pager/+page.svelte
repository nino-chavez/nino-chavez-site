<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let mounted = false;

	const proofPoints = [
		{
			metric: '48-64x',
			label: 'Productivity Multiplier',
			detail: 'Documented across multiple production projects using AI workflow architecture'
		},
		{
			metric: '7 days',
			label: 'Zero-to-Production',
			detail: 'Built production-grade SaaS (Rally HQ) solo—what typically takes a team 6-8 weeks'
		},
		{
			metric: '8+',
			label: 'Shipped Apps',
			detail: 'Production applications in active development, not demos or prototypes'
		},
		{
			metric: '$10M+',
			label: 'Programs Led',
			detail: '100+ global resources managed while still writing production code weekly'
		}
	];

	const valueProps = [
		{
			icon: 'velocity',
			title: 'Replace Team Headcount',
			description: 'AI workflow architecture that delivers 10-person team output with 1 senior resource. Reduce OPEX while increasing velocity.',
		},
		{
			icon: 'asset',
			title: 'Asset Creation, Not Hours',
			description: 'Build reusable IP, frameworks, and production systems—not billable hour mountains. Every engagement leaves you with tangible assets.',
		},
		{
			icon: 'execution',
			title: 'Strategy to Production',
			description: 'No handoffs, no drift, no "that\'s not what we meant." I carry context from whiteboard to deployment.',
		}
	];

	const targetRoles = [
		{
			role: 'Founding Product Manager',
			fit: 'Startups needing a "doer" who executes strategy without a team',
			value: 'Ship your MVP in weeks, not quarters'
		},
		{
			role: 'Technical Director of Product',
			fit: 'Companies needing to operationalize AI agents, not just talk about them',
			value: 'Documented frameworks for AI-native development'
		},
		{
			role: 'Venture Studio Lead',
			fit: 'Studios needing a temporary CTO to launch new businesses rapidly',
			value: 'Zero-to-One velocity with production-grade output'
		}
	];

	const differentiators = [
		'25 years enterprise delivery experience',
		'Published thought leader on Agentic Commerce ($1T+ market thesis)',
		'Built own AI governance frameworks (Agent OS, AEGIS)',
		'Led $10M+ transformations AND wrote production code this week',
		'Not selling strategy—shipping production systems daily'
	];

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>One-Pager - Nino Chavez | Technical Product Leader</title>
	<meta name="description" content="Why hire a 10-person team when you can hire me? Technical Product Leader with documented 48-64x AI productivity multiplier." />
	<meta name="robots" content="noindex, nofollow" />

	<!-- Open Graph -->
	<meta property="og:title" content="One-Pager - Nino Chavez | Technical Product Leader" />
	<meta property="og:description" content="Why hire a 10-person team when you can hire me? Technical Product Leader with documented 48-64x AI productivity multiplier." />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://ninochavez.co/one-pager" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="One-Pager - Nino Chavez | Technical Product Leader" />
	<meta name="twitter:description" content="Why hire a 10-person team when you can hire me?" />
</svelte:head>

<div class="min-h-screen bg-gray-950 text-white">
	<!-- Hero Section -->
	<section class="pt-16 pb-12 md:pt-24 md:pb-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			{#if mounted}
				<!-- Tagline -->
				<div
					in:fade={{ duration: 600, delay: 100 }}
					class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-8"
				>
					<div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
					<span class="text-sm font-medium text-emerald-400">Open to Strategic Opportunities</span>
				</div>

				<!-- The Hook -->
				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="text-4xl md:text-6xl font-bold mb-6 leading-tight"
				>
					Why hire a 10-person team<br />
					<span class="text-emerald-400">when you can hire me?</span>
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl leading-relaxed"
				>
					I'm a Technical Product Leader who uses AI agents to force-multiply velocity.
					Documented <span class="text-white font-semibold">48-64x productivity gains</span>.
					Production systems in days, not months.
				</p>

				<!-- Name Card -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 400 }}
					class="flex items-center gap-4 mb-12"
				>
					<div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-2xl font-bold">
						NC
					</div>
					<div>
						<div class="text-xl font-bold">Nino Chavez</div>
						<div class="text-gray-400">Chicago, IL</div>
					</div>
				</div>
			{/if}
		</div>
	</section>

	<!-- Proof Points -->
	<section class="py-12 px-6 md:px-12 bg-gray-900/50">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">The Numbers</h2>

			<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{#each proofPoints as point, i}
					<div
						class="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-emerald-500/50 transition-colors duration-300"
					>
						<div class="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">{point.metric}</div>
						<div class="text-sm font-semibold text-white mb-2">{point.label}</div>
						<div class="text-xs text-gray-500 leading-relaxed">{point.detail}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Value Proposition -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">What You Get</h2>

			<div class="grid md:grid-cols-3 gap-6">
				{#each valueProps as prop}
					<div class="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
						<!-- Icon -->
						<div class="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
							{#if prop.icon === 'velocity'}
								<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
								</svg>
							{:else if prop.icon === 'asset'}
								<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
							{:else}
								<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
								</svg>
							{/if}
						</div>

						<h3 class="text-lg font-bold text-white mb-2">{prop.title}</h3>
						<p class="text-sm text-gray-400 leading-relaxed">{prop.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- The Pivot Statement -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-y border-gray-800">
		<div class="max-w-5xl mx-auto">
			<div class="max-w-3xl">
				<h2 class="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-6">The Shift</h2>

				<div class="space-y-6">
					<div class="flex items-start gap-4">
						<div class="text-2xl text-gray-600">FROM</div>
						<div class="text-xl text-gray-400">Consultant who manages delivery teams</div>
					</div>

					<div class="flex items-start gap-4">
						<div class="text-2xl text-emerald-400 font-bold">TO</div>
						<div class="text-xl text-white font-semibold">Technical Product Leader who uses AI to force-multiply velocity and reduce OPEX</div>
					</div>
				</div>

				<p class="mt-8 text-gray-400 leading-relaxed">
					I spent the last year not selling strategy about AI—but <span class="text-white">shipping production systems with it</span>.
					I built my own AI governance frameworks. I documented the multipliers. I understand what's hype and what's substance.
				</p>
			</div>
		</div>
	</section>

	<!-- Target Roles -->
	<section class="py-12 md:py-16 px-6 md:px-12">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">Best Fit Roles</h2>

			<div class="space-y-4">
				{#each targetRoles as target}
					<div class="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-emerald-500/30 transition-colors duration-300">
						<div class="flex flex-col md:flex-row md:items-center gap-4">
							<div class="flex-1">
								<h3 class="text-lg font-bold text-white mb-1">{target.role}</h3>
								<p class="text-sm text-gray-400">{target.fit}</p>
							</div>
							<div class="md:text-right">
								<span class="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-full">
									{target.value}
								</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Differentiators -->
	<section class="py-12 md:py-16 px-6 md:px-12 bg-gray-900/50">
		<div class="max-w-5xl mx-auto">
			<h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">Why Me</h2>

			<div class="grid md:grid-cols-2 gap-4">
				{#each differentiators as diff}
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
						</svg>
						<span class="text-gray-300">{diff}</span>
					</div>
				{/each}
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
				If you're building something that needs velocity, asset creation, and someone who ships—let's connect.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="mailto:abelino.chavez@gmail.com"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-gray-950 font-semibold rounded-lg hover:bg-emerald-400 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
					</svg>
					Email Me
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
					href="/cv"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 text-gray-400 font-semibold rounded-lg hover:text-white border border-gray-800 hover:border-gray-700 transition-colors duration-200"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					Full CV
				</a>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="py-8 px-6 md:px-12 border-t border-gray-800">
		<div class="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
			<p class="text-sm text-gray-600">
				© 2025 Nino Chavez
			</p>
			<div class="flex items-center gap-6">
				<a
					href="https://ninochavez.co/blog"
					class="text-sm text-gray-500 hover:text-white transition-colors duration-200"
				>
					Blog
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
