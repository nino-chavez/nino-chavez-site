<script>
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let mounted = false;
	let yearsCount = 0;
	let aboutSection;
	let hasAnimatedYears = false;

	// Hero image rotation - curated pool of strongest shots
	const HERO_PHOTOS = [1, 3, 5, 6, 8, 12, 15, 20];
	let heroPhotoNum = HERO_PHOTOS[Math.floor(Math.random() * HERO_PHOTOS.length)];

	// Lightbox state
	let lightboxOpen = false;
	let lightboxIndex = 0;
	const STRIP_PHOTOS = 12; // Visible in strip
	const TOTAL_PHOTOS = 60; // All photos for lightbox

	onMount(() => {
		mounted = true;

		// Intersection observer for years counter animation
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimatedYears) {
						hasAnimatedYears = true;
						animateYears();
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (aboutSection) {
			observer.observe(aboutSection);
		}

		return () => observer.disconnect();
	});

	function animateYears() {
		const target = 25;
		const duration = 1500;
		const steps = 30;
		const increment = target / steps;
		let current = 0;

		const timer = setInterval(() => {
			current += increment;
			if (current >= target) {
				yearsCount = target;
				clearInterval(timer);
			} else {
				yearsCount = Math.floor(current);
			}
		}, duration / steps);
	}

	function getImgNum(index) {
		return String(index + 1).padStart(2, '0');
	}

	function openLightbox(index) {
		lightboxIndex = index;
		lightboxOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closeLightbox() {
		lightboxOpen = false;
		document.body.style.overflow = '';
	}

	function nextPhoto() {
		lightboxIndex = (lightboxIndex + 1) % TOTAL_PHOTOS;
	}

	function prevPhoto() {
		lightboxIndex = (lightboxIndex - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS;
	}

	function handleKeydown(e) {
		if (!lightboxOpen) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') nextPhoto();
		if (e.key === 'ArrowLeft') prevPhoto();
	}

	$: currentPhotoSrc = `${base}/images/gallery/portfolio-${getImgNum(lightboxIndex)}.jpg`;
</script>

<svelte:head>
	<title>Nino Chavez | Product Architect</title>
	<meta name="description" content="Product Architect building AI-native commerce systems. 25 years shipping enterprise software." />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<!-- Bento grid, oversized type, asymmetric, photography as texture -->

<main class="bg-black text-white min-h-screen overflow-x-hidden">

	<!-- ==================== HERO - MASSIVE TYPE ==================== -->
	<section class="relative min-h-screen flex flex-col justify-end p-6 lg:p-12">

		<!-- Background photo with grain overlay -->
		<div class="absolute inset-0 z-0">
			<img
				src="{base}/images/gallery/portfolio-{getImgNum(heroPhotoNum - 1)}.jpg"
				alt=""
				class="w-full h-full object-cover opacity-40 mix-blend-luminosity"
				width="1920"
				height="1280"
				loading="eager"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60"></div>
			<!-- Grain texture -->
			<div class="absolute inset-0 opacity-30 mix-blend-overlay"
				style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')">
			</div>
		</div>

		<!-- Grid lines overlay -->
		<div class="absolute inset-0 z-10 pointer-events-none grid-lines opacity-20"></div>

		<!-- Content -->
		<div class="relative z-20">
			{#if mounted}
				<!-- Role badge - improved contrast -->
				<div class="mb-8 animate-slide-up" style="animation-delay: 0ms">
					<span class="inline-block px-4 py-2 border border-lime-400 text-lime-400 text-xs font-mono tracking-widest uppercase backdrop-blur-sm bg-black/40">
						Product Architect
					</span>
				</div>

				<!-- Massive headline - improved mobile scaling -->
				<h1 class="hero-text leading-[0.85] tracking-tighter mb-8">
					<span class="block animate-slide-up" style="animation-delay: 100ms">BUILDING</span>
					<span class="block animate-slide-up" style="animation-delay: 200ms">AI</span>
					<span class="block text-lime-400 animate-slide-up" style="animation-delay: 300ms">PRODUCTS</span>
				</h1>

				<!-- Subtext - offset to the right -->
				<div class="max-w-md ml-auto mr-0 lg:mr-24 text-right animate-slide-up" style="animation-delay: 400ms">
					<p class="text-lg text-neutral-400 font-light leading-relaxed mb-6">
						25 years shipping enterprise software.<br/>
						Now focused on AI-native commerce.
					</p>
					<div class="flex justify-end gap-4">
						<a href="#labs" class="px-6 py-3 bg-lime-400 text-black font-bold text-sm hover:bg-white transition-colors">
							SEE LABS
						</a>
						<a href="#contact" class="px-6 py-3 border border-white/30 text-white text-sm hover:border-lime-400 hover:text-lime-400 transition-colors backdrop-blur-sm bg-black/20">
							CONTACT
						</a>
					</div>
				</div>
			{/if}
		</div>

		<!-- Scroll indicator -->
		<div class="absolute bottom-6 left-6 lg:left-12 flex items-center gap-3 z-20">
			<div class="w-px h-16 bg-gradient-to-b from-lime-400 to-transparent"></div>
			<span class="text-xs font-mono text-neutral-500 tracking-widest -rotate-90 origin-left translate-y-6">SCROLL</span>
		</div>
	</section>

	<!-- ==================== LABS - BENTO GRID ==================== -->
	<section id="labs" class="py-24 px-6 lg:px-12 border-t border-neutral-800">

		<!-- Section header - asymmetric -->
		<div class="max-w-7xl mx-auto mb-16">
			<div class="grid lg:grid-cols-2 gap-8 items-end">
				<div>
					<span class="text-lime-400 font-mono text-sm tracking-widest mb-4 block">01 / LABS</span>
					<h2 class="text-5xl lg:text-7xl font-display font-bold tracking-tight">
						ACTIVE<br/>PROJECTS
					</h2>
				</div>
				<div class="lg:text-right">
					<p class="text-neutral-400 text-lg max-w-md lg:ml-auto">
						Production systems I'm building. Not demos—real products solving real problems.
					</p>
				</div>
			</div>
		</div>

		<!-- Bento grid -->
		<div class="max-w-7xl mx-auto">
			<div class="bento-grid">

				<!-- AIQ - Large featured card (PAUSED) -->
				<a
					href="https://clear-cite.vercel.app"
					target="_blank"
					rel="noopener noreferrer"
					class="bento-card bento-large group relative overflow-hidden cursor-pointer"
				>
					<div class="absolute inset-0 bg-gradient-to-br from-lime-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="relative z-10 h-full flex flex-col justify-between p-8">
						<div>
							<div class="flex items-center gap-3 mb-4">
								<span class="w-2 h-2 bg-amber-400 rounded-full"></span>
								<span class="text-amber-400 font-mono text-xs tracking-widest">PAUSED</span>
							</div>
							<h3 class="text-4xl lg:text-5xl font-display font-bold mb-3 group-hover:text-lime-400 transition-colors">AIQ</h3>
							<p class="text-neutral-400 text-lg mb-6">Answer Intelligence Platform</p>
							<p class="text-neutral-500 leading-relaxed max-w-md">
								Tracks how LLMs cite your brand across ChatGPT, Claude, Gemini, Perplexity.
								Enterprise SaaS with real-time analytics.
							</p>
						</div>
						<div class="flex flex-wrap gap-2 mt-6">
							<span class="px-3 py-1 border border-neutral-700 text-neutral-500 text-xs">Next.js 15</span>
							<span class="px-3 py-1 border border-neutral-700 text-neutral-500 text-xs">Supabase</span>
							<span class="px-3 py-1 border border-neutral-700 text-neutral-500 text-xs">Multi-LLM</span>
						</div>
					</div>
					<!-- Corner accent -->
					<div class="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-lime-400/0 group-hover:border-lime-400/50 transition-colors"></div>
				</a>

				<!-- CIQ (PAUSED) -->
				<a
					href="https://ciq.signalx.studio"
					target="_blank"
					rel="noopener noreferrer"
					class="bento-card group relative overflow-hidden cursor-pointer"
				>
					<div class="relative z-10 h-full flex flex-col justify-between p-6">
						<div>
							<div class="flex items-center gap-3 mb-3">
								<span class="w-2 h-2 bg-amber-400 rounded-full"></span>
								<span class="text-amber-400 font-mono text-[10px] tracking-widest">PAUSED</span>
							</div>
							<h3 class="text-2xl font-display font-bold mb-2 group-hover:text-lime-400 transition-colors">CIQ</h3>
							<p class="text-neutral-500 text-sm">Commerce Intelligence</p>
						</div>
						<p class="text-neutral-500 text-sm leading-relaxed">
							137 commerce capabilities mapped. Semantic search + architecture visualization.
						</p>
					</div>
					<div class="absolute bottom-0 left-0 w-full h-1 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
				</a>

				<!-- Rally HQ (LIVE) -->
				<a
					href="https://rallyhq.app"
					target="_blank"
					rel="noopener noreferrer"
					class="bento-card group relative overflow-hidden cursor-pointer"
				>
					<div class="relative z-10 h-full flex flex-col justify-between p-6">
						<div>
							<div class="flex items-center gap-3 mb-3">
								<span class="w-2 h-2 bg-lime-400 rounded-full"></span>
								<span class="text-lime-400 font-mono text-[10px] tracking-widest">LIVE</span>
							</div>
							<h3 class="text-2xl font-display font-bold mb-2 group-hover:text-lime-400 transition-colors">RALLY HQ</h3>
							<p class="text-neutral-500 text-sm">Tournament Platform</p>
						</div>
						<p class="text-neutral-500 text-sm leading-relaxed">
							Volleyball tournament management. Real-time brackets, multi-tenant SaaS.
						</p>
					</div>
					<div class="absolute bottom-0 left-0 w-full h-1 bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
				</a>

				<!-- Gallery - with photo background (LIVE) -->
				<a
					href="https://photography.ninochavez.co"
					target="_blank"
					rel="noopener noreferrer"
					class="bento-card bento-wide group relative overflow-hidden cursor-pointer"
				>
					<img
						src="{base}/images/gallery/portfolio-06.jpg"
						alt=""
						width="800"
						height="400"
						class="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
						loading="lazy"
					/>
					<div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
					<div class="relative z-10 h-full flex flex-col justify-between p-6">
						<div>
							<div class="flex items-center gap-3 mb-3">
								<span class="w-2 h-2 bg-lime-400 rounded-full"></span>
								<span class="text-lime-400 font-mono text-[10px] tracking-widest">20K+ PHOTOS</span>
							</div>
							<h3 class="text-2xl font-display font-bold mb-2 group-hover:text-lime-400 transition-colors">GALLERY</h3>
							<p class="text-neutral-400 text-sm">Action Sports Photography</p>
						</div>
						<div class="flex items-center gap-2 text-neutral-500 text-sm group-hover:text-lime-400 transition-colors">
							<span>View gallery</span>
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</div>
					</div>
				</a>

				<!-- Signal Dispatch Blog -->
				<a
					href="https://blog.ninochavez.co"
					target="_blank"
					rel="noopener noreferrer"
					class="bento-card group relative overflow-hidden cursor-pointer"
				>
					<div class="relative z-10 h-full flex flex-col justify-between p-6">
						<div>
							<h3 class="text-xl font-display font-bold mb-2 group-hover:text-lime-400 transition-colors">SIGNAL DISPATCH</h3>
							<p class="text-neutral-500 text-sm">Writing on AI & Architecture</p>
						</div>
						<div class="flex items-center gap-2 text-neutral-600 text-xs group-hover:text-lime-400 transition-colors">
							<span>Read blog</span>
							<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</div>
					</div>
					<div class="absolute bottom-0 left-0 w-full h-1 bg-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
				</a>

			</div>
		</div>
	</section>

	<!-- ==================== PHOTO STRIP - CLICKABLE ==================== -->
	<section class="py-12 border-t border-neutral-800 overflow-hidden">
		<div class="flex gap-4 animate-scroll">
			{#each Array(STRIP_PHOTOS) as _, i}
				<button
					class="flex-shrink-0 w-64 h-80 overflow-hidden cursor-pointer group"
					on:click={() => openLightbox(i)}
					aria-label="View photo {i + 1}"
				>
					<img
						src="{base}/images/gallery/portfolio-{getImgNum(i)}.jpg"
						alt="Action sports photography"
						width="256"
						height="320"
						class="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
						loading="lazy"
					/>
				</button>
			{/each}
			<!-- Duplicate for seamless loop -->
			{#each Array(STRIP_PHOTOS) as _, i}
				<button
					class="flex-shrink-0 w-64 h-80 overflow-hidden cursor-pointer group"
					on:click={() => openLightbox(i)}
					aria-label="View photo {i + 1}"
				>
					<img
						src="{base}/images/gallery/portfolio-{getImgNum(i)}.jpg"
						alt=""
						width="256"
						height="320"
						class="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
						loading="lazy"
					/>
				</button>
			{/each}
		</div>
		<!-- Hint text -->
		<div class="text-center mt-4">
			<span class="text-neutral-600 text-xs font-mono tracking-wider">CLICK TO EXPAND</span>
		</div>
	</section>

	<!-- ==================== ABOUT - ANIMATED COUNTER ==================== -->
	<section bind:this={aboutSection} class="py-24 px-6 lg:px-12 border-t border-neutral-800">
		<div class="max-w-7xl mx-auto">

			<!-- Section header with animated counter -->
			<div class="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-8 mb-16">
				<span class="text-[6rem] sm:text-[8rem] lg:text-[12rem] font-display font-bold text-neutral-900 leading-none select-none tabular-nums">
					{yearsCount}
				</span>
				<div class="pb-2 sm:pb-4">
					<span class="text-lime-400 font-mono text-sm tracking-widest block mb-2">02 / BACKGROUND</span>
					<span class="text-neutral-500 text-lg">Years building software</span>
				</div>
			</div>

			<!-- 4 column grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
				<div>
					<h3 class="text-xl font-bold mb-3 text-white">Enterprise</h3>
					<p class="text-neutral-400 leading-relaxed text-sm">
						Platform architecture for commerce systems. SAP, Salesforce, custom builds.
						Led teams through F500 implementations.
					</p>
				</div>
				<div>
					<h3 class="text-xl font-bold mb-3 text-white">AI Integration</h3>
					<p class="text-neutral-400 leading-relaxed text-sm">
						Building AI into production systems. Not demos—actual products.
						Focused on commerce and developer tools.
					</p>
				</div>
				<div>
					<h3 class="text-xl font-bold mb-3 text-white">Systems</h3>
					<p class="text-neutral-400 leading-relaxed text-sm">
						Connecting things that weren't designed to work together.
						ERPs, payment processors, inventory. The plumbing.
					</p>
				</div>
				<div>
					<h3 class="text-xl font-bold mb-3 text-white">Advisory</h3>
					<p class="text-neutral-400 leading-relaxed text-sm">
						Technical consulting for teams starting complex projects.
						Architecture reviews, technology selection.
					</p>
				</div>
			</div>

			<!-- CV Link -->
			<div class="mt-16 pt-8 border-t border-neutral-800">
				<a
					href="/cv"
					class="group inline-flex items-center gap-3 text-neutral-400 hover:text-lime-400 transition-colors"
				>
					<span class="font-mono text-sm tracking-wider">VIEW FULL CV</span>
					<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>
		</div>
	</section>

	<!-- ==================== CONTACT ==================== -->
	<section id="contact" class="py-24 px-6 lg:px-12 border-t border-neutral-800 relative overflow-hidden">

		<!-- Background text -->
		<div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
			<span class="text-[20vw] font-display font-bold text-neutral-900/50 whitespace-nowrap">LET'S TALK</span>
		</div>

		<div class="max-w-7xl mx-auto relative z-10">
			<div class="max-w-2xl">
				<span class="text-lime-400 font-mono text-sm tracking-widest mb-6 block">03 / CONTACT</span>

				<div class="flex items-center gap-3 mb-8">
					<span class="relative flex h-3 w-3">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-3 w-3 bg-lime-400"></span>
					</span>
					<span class="text-neutral-400">Available for new projects</span>
				</div>

				<h2 class="text-5xl lg:text-7xl font-display font-bold tracking-tight mb-8">
					GET IN<br/>TOUCH
				</h2>

				<p class="text-neutral-400 text-lg mb-12 max-w-md">
					Enterprise consulting, technical advisory, or a conversation about architecture.
					Chicago-based, work globally.
				</p>

				<div class="flex flex-col sm:flex-row gap-4">
					<a
						href="mailto:nino@ninochavez.co"
						class="group px-8 py-4 bg-lime-400 text-black font-bold text-lg hover:bg-white transition-colors inline-flex items-center gap-3"
					>
						nino@ninochavez.co
						<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
					<a
						href="https://www.linkedin.com/in/nino-chavez/"
						target="_blank"
						rel="noopener noreferrer"
						class="px-8 py-4 border-2 border-neutral-700 text-white font-bold text-lg hover:border-lime-400 hover:text-lime-400 transition-colors text-center"
					>
						LINKEDIN
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer with social icons -->
	<footer class="py-8 px-6 lg:px-12 border-t border-neutral-800">
		<div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
			<span class="text-neutral-600 text-sm font-mono">© 2026 NINO CHAVEZ</span>

			<div class="flex items-center gap-6">
				<!-- Text links -->
				<a href="/cv" class="text-neutral-600 text-sm hover:text-lime-400 transition-colors">CV</a>
				<a href="https://blog.ninochavez.co" class="text-neutral-600 text-sm hover:text-lime-400 transition-colors">BLOG</a>

				<!-- Social icons -->
				<div class="flex items-center gap-4 pl-4 border-l border-neutral-800">
					<a
						href="https://github.com/nino-chavez"
						target="_blank"
						rel="noopener noreferrer"
						class="text-neutral-600 hover:text-lime-400 transition-colors"
						aria-label="GitHub"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
						</svg>
					</a>
					<a
						href="https://x.com/ninochavez"
						target="_blank"
						rel="noopener noreferrer"
						class="text-neutral-600 hover:text-lime-400 transition-colors"
						aria-label="X (Twitter)"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</a>
					<a
						href="https://www.linkedin.com/in/nino-chavez/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-neutral-600 hover:text-lime-400 transition-colors"
						aria-label="LinkedIn"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</footer>

</main>

<!-- Photo Lightbox Modal -->
{#if lightboxOpen}
	<div
		class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
		on:click={closeLightbox}
		on:keydown={(e) => e.key === 'Escape' && closeLightbox()}
		role="dialog"
		aria-modal="true"
		aria-label="Photo lightbox"
		tabindex="-1"
	>
		<!-- Close button -->
		<button
			class="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
			on:click|stopPropagation={closeLightbox}
			aria-label="Close lightbox"
		>
			<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<!-- Main image area -->
		<div class="flex-1 flex items-center justify-center p-8" on:click|stopPropagation>
			<!-- Previous button -->
			<button
				class="absolute left-4 lg:left-8 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
				on:click|stopPropagation={prevPhoto}
				aria-label="Previous photo"
			>
				<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<!-- Image -->
			<img
				src={currentPhotoSrc}
				alt="Portfolio photo {lightboxIndex + 1}"
				class="max-h-[80vh] max-w-[90vw] object-contain"
			/>

			<!-- Next button -->
			<button
				class="absolute right-4 lg:right-8 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
				on:click|stopPropagation={nextPhoto}
				aria-label="Next photo"
			>
				<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<!-- Photo counter -->
		<div class="absolute top-6 left-6 font-mono text-white/50 text-sm tracking-widest">
			{String(lightboxIndex + 1).padStart(2, '0')} / {String(TOTAL_PHOTOS).padStart(2, '0')}
		</div>

		<!-- Thumbnail strip - shows range around current photo -->
		<div class="flex-shrink-0 px-4 pb-6" on:click|stopPropagation>
			<div class="flex justify-center gap-1 overflow-x-auto py-2 max-w-full">
				{#each Array(Math.min(TOTAL_PHOTOS, 20)) as _, i}
					{@const thumbIndex = Math.max(0, Math.min(lightboxIndex - 10 + i, TOTAL_PHOTOS - 1))}
					<button
						class="flex-shrink-0 w-12 h-9 overflow-hidden transition-all duration-200
							{lightboxIndex === thumbIndex ? 'ring-2 ring-lime-400 opacity-100' : 'opacity-40 hover:opacity-70'}"
						on:click|stopPropagation={() => { lightboxIndex = thumbIndex; }}
						aria-label="View photo {thumbIndex + 1}"
					>
						<img
							src="{base}/images/gallery/portfolio-{getImgNum(thumbIndex)}.jpg"
							alt="Thumbnail {thumbIndex + 1}"
							class="w-full h-full object-cover"
							loading="lazy"
						/>
					</button>
				{/each}
			</div>
		</div>

		<!-- Keyboard hint -->
		<div class="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-white/30 tracking-widest">
			← → to navigate • ESC to close
		</div>
	</div>
{/if}

<style>
	/* Typography */
	.font-display {
		font-family: 'Bebas Neue', sans-serif;
	}

	/* Hero text - improved mobile scaling */
	.hero-text {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(3rem, 15vw, 14rem);
		font-weight: 400;
	}

	/* Tabular nums for counter animation */
	.tabular-nums {
		font-variant-numeric: tabular-nums;
	}

	/* Grid lines */
	.grid-lines {
		background-image:
			linear-gradient(rgba(163, 230, 53, 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(163, 230, 53, 0.1) 1px, transparent 1px);
		background-size: 80px 80px;
	}

	/* Bento grid */
	.bento-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-auto-rows: 280px;
		gap: 1rem;
	}

	.bento-card {
		background: #0a0a0a;
		border: 1px solid #262626;
		transition: border-color 0.3s, transform 0.3s;
	}

	.bento-card:hover {
		border-color: #a3e635;
	}

	.bento-large {
		grid-column: span 2;
		grid-row: span 2;
	}

	.bento-wide {
		grid-column: span 2;
	}

	@media (max-width: 1024px) {
		.bento-grid {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-rows: 240px;
		}
		.bento-large {
			grid-column: span 2;
			grid-row: span 1;
		}
	}

	@media (max-width: 640px) {
		.bento-grid {
			grid-template-columns: 1fr;
			grid-auto-rows: auto;
		}
		.bento-large,
		.bento-wide {
			grid-column: span 1;
			grid-row: span 1;
		}
		.bento-card {
			min-height: 200px;
		}
	}

	/* Animations */
	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(40px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-slide-up {
		opacity: 0;
		animation: slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	/* Scrolling photo strip */
	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	.animate-scroll {
		animation: scroll 18s linear infinite;
	}

	.animate-scroll:hover {
		animation-play-state: paused;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.animate-slide-up {
			animation: none;
			opacity: 1;
			transform: none;
		}
		.animate-scroll {
			animation: none;
		}
	}
</style>
