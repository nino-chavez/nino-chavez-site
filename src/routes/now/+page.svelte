<script>
	import { onMount } from 'svelte';
	import { fly, fade, slide } from 'svelte/transition';

	let mounted = false;
	let cvExpanded = false;

	const currentFocus = [
		{
			title: "Let's Pepper",
			description: 'Running the grassroots 3v3 volleyball tournament series.',
			link: 'https://letspepper.com'
		},
		{
			title: 'Flickday Media',
			description: 'Tournament photography and same-day photo drops.',
			link: 'https://flickdaymedia.com'
		},
		{
			title: 'Rally HQ',
			description: 'Tournament management platform in open beta.',
			link: 'https://rallyhq.app'
		}
	];

	const thinkingAbout = [
		'Growing grassroots volleyball in Chicago',
		'How AI changes the way we build software',
		'Photography as a way of seeing',
		'The gap between demos and production'
	];

	const cvTimeline = [
		{
			year: '2026',
			role: 'Product Architect',
			company: 'commerce.com',
			location: 'Chicago, IL'
		},
		{
			year: '2023-2026',
			role: 'Enterprise Architect',
			company: 'Accenture Song',
			location: 'Chicago, IL'
		},
		{
			year: '2021-2023',
			role: 'Managing Delivery Architect',
			company: 'Capgemini',
			location: 'Chicago, IL'
		},
		{
			year: '2020-2021',
			role: 'Domain Architect',
			company: 'Peapod Digital Labs',
			location: 'Chicago, IL'
		},
		{
			year: '2018-2020',
			role: 'Managing Enterprise Architect',
			company: 'Accenture Interactive',
			location: 'Chicago, IL'
		},
		{
			year: '2015-2018',
			role: 'Managing Enterprise Architect',
			company: 'Gorilla Group',
			location: 'Chicago, IL'
		},
		{
			year: '1999-2015',
			role: 'Software Engineer → Engineering Lead',
			company: 'Various Companies',
			location: 'Chicago, IL'
		}
	];

	onMount(() => {
		mounted = true;

		// Check if URL has #cv hash
		if (typeof window !== 'undefined' && window.location.hash === '#cv') {
			cvExpanded = true;
		}
	});

	function toggleCV() {
		cvExpanded = !cvExpanded;
		if (cvExpanded && typeof window !== 'undefined') {
			window.history.replaceState(null, '', '#cv');
		} else if (typeof window !== 'undefined') {
			window.history.replaceState(null, '', window.location.pathname);
		}
	}
</script>

<svelte:head>
	<title>Now - Nino Chavez</title>
	<meta name="description" content="What I'm working on, thinking about, and building right now." />
	<meta name="robots" content="noindex, nofollow" />
	<!-- Open Graph -->
	<meta property="og:title" content="Now - Nino Chavez" />
	<meta property="og:description" content="What I'm working on, thinking about, and building right now." />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://ninochavez.co/now" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Now - Nino Chavez" />
	<meta name="twitter:description" content="What I'm working on, thinking about, and building right now." />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<!-- Hero Section -->
	<section class="pt-16 pb-12 md:pt-24 md:pb-16 px-6 md:px-12">
		<div class="max-w-4xl mx-auto">
			{#if mounted}
				<!-- Name Card -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 100 }}
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

				<!-- The Hook -->
				<h1
					in:fly={{ y: 20, duration: 800, delay: 200 }}
					class="font-display text-5xl md:text-7xl tracking-tight mb-6 leading-[0.9]"
				>
					NOW
				</h1>

				<p
					in:fly={{ y: 20, duration: 800, delay: 300 }}
					class="text-xl md:text-2xl text-neutral-400 mb-10 max-w-2xl leading-relaxed"
				>
					What I'm working on, thinking about, and where my attention is going.
				</p>

				<!-- Last updated -->
				<div
					in:fly={{ y: 20, duration: 800, delay: 400 }}
					class="text-neutral-600 text-sm font-mono"
				>
					Updated February 2026
				</div>
			{/if}
		</div>
	</section>

	<!-- Current Focus -->
	<section class="py-12 px-6 md:px-12 border-t border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">What I'm Working On</h2>

			<div class="grid md:grid-cols-3 gap-6">
				{#each currentFocus as item}
					<a
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						class="border border-neutral-800 p-6 hover:border-lime-400/50 transition-colors group"
					>
						<h3 class="text-lg font-display text-white mb-3 tracking-wide group-hover:text-lime-400 transition-colors">{item.title.toUpperCase()}</h3>
						<p class="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Thinking About -->
	<section class="py-12 px-6 md:px-12 border-t border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">What I'm Thinking About</h2>

			<div class="grid md:grid-cols-2 gap-4">
				{#each thinkingAbout as item}
					<div class="flex items-start gap-3">
						<svg class="w-5 h-5 text-neutral-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
						<span class="text-neutral-300">{item}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Brief Background -->
	<section class="py-12 px-6 md:px-12 border-t border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">Background</h2>

			<p class="text-neutral-300 leading-relaxed max-w-2xl mb-6">
				I've been writing code for 25 years—the day job is Product Architect at commerce.com.
				But this site is about everything else I create: photography, music, writing, volleyball ventures,
				and whatever I'm building on the side.
			</p>

			<p class="text-neutral-400 leading-relaxed max-w-2xl">
				The professional history is below if you're curious, but it's not the point of being here.
			</p>
		</div>
	</section>

	<!-- Expandable CV Section -->
	<section id="cv" class="py-12 px-6 md:px-12 border-t border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<button
				on:click={toggleCV}
				class="flex items-center gap-3 text-neutral-500 hover:text-lime-400 transition-colors group w-full"
			>
				<h2 class="font-mono text-xs tracking-widest uppercase">Professional Timeline</h2>
				<svg
					class="w-4 h-4 transition-transform duration-300 {cvExpanded ? 'rotate-180' : ''}"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
				</svg>
				<span class="text-xs text-neutral-600 ml-auto">
					{cvExpanded ? 'Collapse' : 'Expand'}
				</span>
			</button>

			{#if cvExpanded}
				<div transition:slide={{ duration: 300 }} class="mt-8 space-y-4">
					{#each cvTimeline as item}
						<div class="border-l-2 border-neutral-800 pl-6 py-2 hover:border-lime-400/30 transition-colors">
							<div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
								<span class="text-lime-400 font-mono text-sm">{item.year}</span>
								<span class="text-neutral-600 hidden md:inline">•</span>
								<span class="text-neutral-500 text-sm">{item.location}</span>
							</div>
							<h3 class="text-white font-medium mt-1">{item.role}</h3>
							<p class="text-neutral-400 text-sm">{item.company}</p>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</section>

	<!-- Connect -->
	<section class="py-16 px-6 md:px-12 border-t border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">Say Hi</h2>

			<p class="text-neutral-400 mb-8 max-w-xl">
				Always happy to chat about photography, music, volleyball, building things, or whatever's interesting.
			</p>

			<div class="flex flex-wrap gap-4">
				<a
					href="mailto:nino@ninochavez.co"
					class="inline-flex items-center gap-2 px-6 py-3 bg-lime-400 text-black font-semibold hover:bg-white transition-colors"
				>
					Email
				</a>
				<a
					href="https://www.linkedin.com/in/nino-chavez/"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-6 py-3 border border-neutral-700 text-white font-semibold hover:border-lime-400 hover:text-lime-400 transition-colors"
				>
					LinkedIn
				</a>
				<a
					href="https://x.com/PhotoByNino"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-6 py-3 border border-neutral-800 text-neutral-400 font-semibold hover:border-neutral-700 hover:text-white transition-colors"
				>
					X / Twitter
				</a>
				<a
					href="https://soundcloud.com/ni-no-cha-vez"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 px-6 py-3 border border-neutral-800 text-neutral-400 font-semibold hover:border-neutral-700 hover:text-white transition-colors"
				>
					SoundCloud
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
				<a href="https://photography.ninochavez.co" class="text-sm text-neutral-500 hover:text-lime-400 transition-colors">
					Photography
				</a>
				<a href="/" class="text-sm text-neutral-500 hover:text-lime-400 transition-colors">
					Home
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
