<script>
	import { fade } from 'svelte/transition';
	import { base } from '$app/paths';

	const interests = [
		{
			title: 'Photography',
			description: 'Action sports and volleyball. I run Flickday Media for tournament coverage—raw, fast, player-first. 20,000+ photos and counting.',
			link: 'https://flickdaymedia.com'
		},
		{
			title: 'Music',
			description: 'I DJ. House, disco, and whatever makes people move. Been doing it for years, still love it.',
			link: 'https://soundcloud.com/ni-no-cha-vez'
		},
		{
			title: 'Writing',
			description: 'Signal Dispatch is my blog—essays on making things, software craft, and working through ideas in public.',
			link: 'https://blog.ninochavez.co'
		},
		{
			title: 'Building',
			description: 'AI-native software shipped at architect leverage. Rally HQ, Signal X Studio, and whatever else is compiling today.',
			link: '/#labs'
		}
	];

	const ventures = [
		{
			name: "Let's Pepper",
			description: 'Grassroots 3v3 volleyball tournament series. Competitive play, cash prizes, no fluff.',
			link: 'https://letspepper.com'
		},
		{
			name: 'Flickday Media',
			description: 'Sports media company. Tournament photography, reels, same-day photo drops.',
			link: 'https://flickdaymedia.com'
		},
		{
			name: 'Rally HQ',
			description: 'Tournament management platform. Real-time brackets, registration, payments.',
			link: 'https://rallyhq.app'
		}
	];
</script>

<svelte:head>
	<title>About - Nino Chavez</title>
	<meta
		name="description"
		content="AI-native architect shipping signals from code, cameras, sound, and words. Chicago."
	/>

	<!-- Open Graph -->
	<meta property="og:title" content="About - Nino Chavez" />
	<meta
		property="og:description"
		content="AI-native architect shipping signals from code, cameras, sound, and words. Chicago."
	/>
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://ninochavez.co/about" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About - Nino Chavez" />
	<meta
		name="twitter:description"
		content="AI-native architect shipping signals from code, cameras, sound, and words. Chicago."
	/>

</svelte:head>

<main class="min-h-screen bg-black text-white">
	<!-- Hero Section -->
	<section class="relative px-6 py-24 md:py-32 border-b border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<div in:fade={{ duration: 600 }}>
				<h1 class="text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-8">ABOUT</h1>

				<div class="max-w-2xl space-y-6 text-lg text-neutral-300 leading-relaxed">
					<p>
						I'm Nino. I live in Chicago. I direct the build the way I shoot a frame —
						reading the moment, selecting the one that holds, and shipping something real from it.
					</p>

					<p>
						The thread connecting everything I make is the same instinct: cut through the noise,
						find what matters. A decisive moment at the net. The groove that makes a room move.
						The architecture pattern that actually survives production. The sentence that says
						what it means.
					</p>

					<p>
						I've been writing code since 1999 and building with AI agents since the tools
						existed. The projects on this site say more about how I think than any resume would.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- What I'm Into -->
	<section class="px-6 py-16 border-b border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-12">What I'm Into</h2>

			<div class="grid md:grid-cols-2 gap-8">
				{#each interests as item}
					<a
						href={item.link}
						target={item.link.startsWith('http') ? '_blank' : undefined}
						rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
						class="group block border border-neutral-800 p-6 hover:border-lime-400/50 transition-colors"
					>
						<h3 class="text-xl font-bold text-white mb-3 group-hover:text-lime-400 transition-colors">{item.title}</h3>
						<p class="text-neutral-400 leading-relaxed text-sm">{item.description}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Ventures -->
	<section class="px-6 py-16 border-b border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">Things I Run</h2>

			<div class="space-y-6">
				{#each ventures as item}
					<a
						href={item.link}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-start gap-4 border-l-2 border-neutral-800 pl-6 py-2 hover:border-lime-400/50 transition-colors"
					>
						<div>
							<h3 class="text-lg font-bold text-white group-hover:text-lime-400 transition-colors">{item.name}</h3>
							<p class="text-neutral-400 text-sm">{item.description}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Photography Preview -->
	<section class="px-6 py-16 border-b border-neutral-800 overflow-hidden">
		<div class="max-w-4xl mx-auto mb-8">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-4">Photography</h2>
			<p class="text-neutral-400 max-w-xl">
				I shoot volleyball and action sports. It's a good counterbalance to sitting at a computer —
				you're outside, moving, reading the play, anticipating the moment before it happens.
			</p>
		</div>

		<!-- Photo strip preview -->
		<div class="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
			{#each [1, 3, 5, 8, 12, 15] as num}
				<div class="flex-shrink-0 w-48 h-64 overflow-hidden">
					<img
						src="{base}/images/gallery/portfolio-{String(num).padStart(2, '0')}.jpg"
						alt="Action sports photography"
						width="192"
						height="256"
						class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
						loading="lazy"
					/>
				</div>
			{/each}
		</div>

		<div class="max-w-4xl mx-auto mt-6">
			<a
				href="https://photography.ninochavez.co"
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 text-lime-400 hover:text-white transition-colors text-sm font-medium"
			>
				View full gallery
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</a>
		</div>
	</section>

	<!-- Background -->
	<section class="px-6 py-16 border-b border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">Background</h2>

			<div class="max-w-2xl space-y-6 text-neutral-300 leading-relaxed">
				<p>
					I've been writing code since 1999. Started at small agencies, moved through
					consulting firms, eventually ended up building commerce platforms at scale.
					Now I build with AI agents as a core part of the process — not as an afterthought.
				</p>

				<p>
					The day job is product architect at commerce.com. But the projects on this
					site are what I spend my free time on — and honestly, they're a better window
					into how I think than a career summary.
				</p>

				<p>
					If you want the formal timeline, it's on the
					<a href="/now#cv" class="text-lime-400 hover:underline">Now page</a>.
				</p>
			</div>
		</div>
	</section>

	<!-- Connect Section -->
	<section class="px-6 py-16">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lime-400 font-mono text-xs tracking-widest uppercase mb-8">Connect</h2>

			<p class="text-neutral-300 mb-8 max-w-xl">
				Always happy to talk about building things, shooting things, or whatever's interesting.
			</p>

			<div class="flex flex-wrap gap-4">
				<a
					href="mailto:nino@ninochavez.co"
					class="px-6 py-3 bg-lime-400 text-black font-semibold hover:bg-white transition-colors"
				>
					Email
				</a>
				<a
					href="https://www.linkedin.com/in/nino-chavez/"
					target="_blank"
					rel="noopener noreferrer"
					class="px-6 py-3 border border-neutral-700 text-white font-semibold hover:border-lime-400 hover:text-lime-400 transition-colors"
				>
					LinkedIn
				</a>
				<a
					href="https://x.com/PhotoByNino"
					target="_blank"
					rel="noopener noreferrer"
					class="px-6 py-3 border border-neutral-800 text-neutral-400 font-semibold hover:border-neutral-700 hover:text-white transition-colors"
				>
					X / Twitter
				</a>
				<a
					href="https://github.com/nino-chavez"
					target="_blank"
					rel="noopener noreferrer"
					class="px-6 py-3 border border-neutral-800 text-neutral-400 font-semibold hover:border-neutral-700 hover:text-white transition-colors"
				>
					GitHub
				</a>
				<a
					href="https://soundcloud.com/ni-no-cha-vez"
					target="_blank"
					rel="noopener noreferrer"
					class="px-6 py-3 border border-neutral-800 text-neutral-400 font-semibold hover:border-neutral-700 hover:text-white transition-colors"
				>
					SoundCloud
				</a>
			</div>
		</div>
	</section>

	<!-- Back to Home -->
	<section class="px-6 py-12 border-t border-neutral-800">
		<div class="max-w-4xl mx-auto">
			<a href="/" class="text-neutral-500 hover:text-lime-400 transition-colors text-sm">
				← Back to Home
			</a>
		</div>
	</section>
</main>

<style>
	.font-display {
		font-family: 'Bebas Neue', sans-serif;
	}
</style>
