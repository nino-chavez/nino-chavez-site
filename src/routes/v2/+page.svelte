<script>
	import { base } from '$app/paths';
	import { CAPABILITY_IDS, CAPABILITY_SYSTEM, PROJECTS } from '$lib/constants';
	import { onMount, onDestroy } from 'svelte';

	let mounted = false;
	let scrollY = 0;
	let heroProgress = 0; // 0-1 for hero split animation
	let activeServiceIndex = 0;

	// Photo gallery state
	let photoScrollContainer;
	let photoScrollProgress = 0;
	let photoIsDragging = false;
	let photoHasDragged = false;
	let photoStartX = 0;
	let photoScrollLeft = 0;
	let photoRafId;
	let photoAnimationCleanup = null;
	let photoTargetScroll = 0;
	let photoCurrentScroll = 0;
	const photoSmoothing = 0.1;
	const TOTAL_PHOTOS = 60;

	// Lightbox state
	let photoLightboxOpen = false;
	let currentPhotoIndex = 0;

	// Reduced motion preference
	let prefersReducedMotion = false;

	// Featured projects with hero images
	const projectImages = {
		'ai-native-portfolio': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1600&h=900&fit=crop&q=80',
		'nino-labs': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop&q=80',
		'signal-dispatch-blog': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&h=900&fit=crop&q=80',
		'nino-chavez-gallery': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&h=900&fit=crop&q=80',
		'rally-hq': 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=1600&h=900&fit=crop&q=80',
		'ciq-platform': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&h=900&fit=crop&q=80',
		'aiq-platform': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=900&fit=crop&q=80',
		'commerce-transformation-navigator': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=80',
		'aegis-framework': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&h=900&fit=crop&q=80',
		'smugmug-reference': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&h=900&fit=crop&q=80',
		'agent-os-workflow-system': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&h=900&fit=crop&q=80'
	};

	// Featured projects for sticky showcase
	const featuredProjects = PROJECTS.slice(0, 5).map(p => ({
		...p,
		heroImage: projectImages[p.id] || p.imageUrl
	}));

	// Services data from capabilities
	const services = CAPABILITY_IDS.map(id => ({
		id,
		title: CAPABILITY_SYSTEM[id].focusArea.title,
		description: CAPABILITY_SYSTEM[id].focusArea.description,
		domain: CAPABILITY_SYSTEM[id].domain.area
	}));

	onMount(() => {
		mounted = true;
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const handleScroll = () => {
			scrollY = window.scrollY;

			// Hero split animation: 0-200vh scroll = 0-1 progress
			const heroHeight = window.innerHeight * 2;
			heroProgress = Math.min(1, Math.max(0, scrollY / heroHeight));
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // Initial call

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	onDestroy(() => {
		if (photoAnimationCleanup) {
			photoAnimationCleanup();
		}
	});

	// Damping function for smooth scroll
	function damp(current, target, smoothing) {
		return current + (target - current) * smoothing;
	}

	// Setup scroll animation for photo gallery
	function setupPhotoAnimation() {
		if (!photoScrollContainer || prefersReducedMotion) return;

		const handleScroll = () => {
			photoTargetScroll = photoScrollContainer.scrollLeft;
		};

		const animate = () => {
			if (!photoScrollContainer) {
				if (photoRafId) cancelAnimationFrame(photoRafId);
				return;
			}

			photoCurrentScroll = damp(photoCurrentScroll, photoTargetScroll, photoSmoothing);

			const maxScroll = photoScrollContainer.scrollWidth - photoScrollContainer.clientWidth;
			photoScrollProgress = photoCurrentScroll / maxScroll;

			const imageElements = photoScrollContainer.querySelectorAll('.photo-gallery-item');
			const containerWidth = photoScrollContainer.clientWidth;

			imageElements.forEach((item) => {
				const rect = item.getBoundingClientRect();
				const viewportProgress = (rect.left + rect.width / 2 - containerWidth / 2) / (containerWidth / 2);

				const panAmount = -viewportProgress * 20;
				const distanceFromCenter = Math.abs(viewportProgress);
				const imageScale = 1.15 - distanceFromCenter * 0.05;
				const containerScale = 1.0 - distanceFromCenter * 0.1;
				const opacity = Math.max(0.3, 1 - distanceFromCenter * 0.7);

				const img = item.querySelector('img');
				if (img) {
					img.style.transform = `scale(${imageScale}) translateX(${panAmount}%)`;
					img.style.opacity = `${opacity}`;
				}

				item.style.transform = `scale(${Math.max(0.85, containerScale)})`;
			});

			photoRafId = requestAnimationFrame(animate);
		};

		photoScrollContainer.addEventListener('scroll', handleScroll, { passive: true });
		animate();

		photoAnimationCleanup = () => {
			photoScrollContainer?.removeEventListener('scroll', handleScroll);
			if (photoRafId) cancelAnimationFrame(photoRafId);
		};
	}

	$: if (photoScrollContainer && mounted && !photoAnimationCleanup) {
		setupPhotoAnimation();
	}

	// Photo gallery drag handlers
	function handlePhotoMouseDown(e) {
		if (!photoScrollContainer) return;
		photoIsDragging = true;
		photoHasDragged = false;
		photoStartX = e.pageX - photoScrollContainer.offsetLeft;
		photoScrollLeft = photoScrollContainer.scrollLeft;
		photoScrollContainer.style.cursor = 'grabbing';
	}

	function handlePhotoMouseMove(e) {
		if (!photoIsDragging || !photoScrollContainer) return;
		e.preventDefault();
		const x = e.pageX - photoScrollContainer.offsetLeft;
		const walk = (x - photoStartX) * 2;
		if (Math.abs(walk) > 5) {
			photoHasDragged = true;
		}
		photoScrollContainer.scrollLeft = photoScrollLeft - walk;
	}

	function handlePhotoMouseUp() {
		photoIsDragging = false;
		if (photoScrollContainer) {
			photoScrollContainer.style.cursor = 'grab';
		}
		setTimeout(() => { photoHasDragged = false; }, 100);
	}

	function handlePhotoMouseLeave() {
		if (photoIsDragging) {
			photoIsDragging = false;
			if (photoScrollContainer) {
				photoScrollContainer.style.cursor = 'grab';
			}
		}
	}

	function handlePhotoTouchStart(e) {
		if (!photoScrollContainer) return;
		photoIsDragging = true;
		photoHasDragged = false;
		photoStartX = e.touches[0].pageX - photoScrollContainer.offsetLeft;
		photoScrollLeft = photoScrollContainer.scrollLeft;
	}

	function handlePhotoTouchMove(e) {
		if (!photoIsDragging || !photoScrollContainer) return;
		const x = e.touches[0].pageX - photoScrollContainer.offsetLeft;
		const walk = (x - photoStartX) * 1.5;
		if (Math.abs(walk) > 5) {
			photoHasDragged = true;
		}
		photoScrollContainer.scrollLeft = photoScrollLeft - walk;
	}

	function handlePhotoTouchEnd() {
		photoIsDragging = false;
		setTimeout(() => { photoHasDragged = false; }, 100);
	}

	// Lightbox handlers
	function openPhotoLightbox(index) {
		if (photoHasDragged) {
			photoHasDragged = false;
			return;
		}
		currentPhotoIndex = index;
		photoLightboxOpen = true;
		document.body.style.overflow = 'hidden';
	}

	function closePhotoLightbox() {
		photoLightboxOpen = false;
		document.body.style.overflow = '';
	}

	function nextPhoto() {
		currentPhotoIndex = (currentPhotoIndex + 1) % TOTAL_PHOTOS;
	}

	function prevPhoto() {
		currentPhotoIndex = (currentPhotoIndex - 1 + TOTAL_PHOTOS) % TOTAL_PHOTOS;
	}

	function handlePhotoKeydown(e) {
		if (!photoLightboxOpen) return;
		if (e.key === 'Escape') closePhotoLightbox();
		if (e.key === 'ArrowRight') nextPhoto();
		if (e.key === 'ArrowLeft') prevPhoto();
	}

	function getImgNum(index) {
		return String(index + 1).padStart(2, '0');
	}

	$: currentPhotoSrc = `${base}/images/gallery/portfolio-${getImgNum(currentPhotoIndex)}.jpg`;

	// Computed values for hero animation
	$: splitAmount = heroProgress * 30; // max 30% split
	$: heroOpacity = heroProgress < 0.5 ? 1 : 1 - (heroProgress - 0.5) * 2;
	$: textRevealOpacity = heroProgress > 0.3 ? Math.min(1, (heroProgress - 0.3) * 3) : 0;
	$: ctaRevealOpacity = heroProgress > 0.7 ? Math.min(1, (heroProgress - 0.7) * 3) : 0;
</script>

<svelte:head>
	<title>Nino Chavez | V2 — Void-Inspired</title>
	<link rel="stylesheet" href="https://use.typekit.net/wbj0oqh.css">
	<link rel="stylesheet" href="https://use.typekit.net/pxj6trb.css">
</svelte:head>

<svelte:window on:keydown={handlePhotoKeydown} />

<!-- V2 Badge -->
<div class="fixed top-6 left-6 z-50 px-3 py-1.5 bg-[#ff4500] text-black text-xs font-rival-narrow font-bold tracking-wider uppercase">
	V2 Void-Style
</div>

<!-- ==================== HERO SECTION (Scroll-Split) ==================== -->
<section class="hero-section">
	<!-- Sticky container -->
	<div class="hero-sticky">
		<!-- Left image panel -->
		<div
			class="hero-image-panel hero-image-left"
			style="--split: {splitAmount}%"
		>
			<img
				src="{base}/images/hero.webp"
				alt="Nino Chavez"
				class="hero-image"
			/>
		</div>

		<!-- Right image panel -->
		<div
			class="hero-image-panel hero-image-right"
			style="--split: {splitAmount}%"
		>
			<img
				src="{base}/images/hero.webp"
				alt="Nino Chavez"
				class="hero-image"
			/>
		</div>

		<!-- Center black reveal -->
		<div class="hero-center-reveal" style="opacity: {heroProgress}">
			<!-- Corner taglines -->
			<div class="hero-tagline hero-tagline-left" style="opacity: {textRevealOpacity}">
				<span class="font-rival-narrow text-sm tracking-[0.3em] uppercase text-white/60">Void Studio Creates</span>
				<span class="font-rival-narrow text-sm tracking-[0.3em] uppercase text-white/60">Brand Universes.</span>
			</div>
			<div class="hero-tagline hero-tagline-right" style="opacity: {textRevealOpacity}">
				<span class="font-rival-narrow text-sm tracking-[0.3em] uppercase text-white/60">Blending Precision</span>
				<span class="font-rival-narrow text-sm tracking-[0.3em] uppercase text-white/60">With Passion.</span>
			</div>
		</div>

		<!-- Name split across panels -->
		<h1 class="hero-name hero-name-left" style="opacity: {textRevealOpacity}">
			NINO
		</h1>
		<h1 class="hero-name hero-name-right" style="opacity: {textRevealOpacity}">
			CHAVEZ
		</h1>

		<!-- CTA after scroll completes -->
		<div class="hero-cta" style="opacity: {ctaRevealOpacity}">
			<span class="font-rival-narrow text-[#ff4500] text-sm tracking-[0.3em] uppercase mb-4 block">Enterprise Architect</span>
			<p class="font-rival text-2xl lg:text-3xl text-white/80 mb-8 max-w-md">
				I build the systems that build the experiences.
			</p>
			<a
				href="#work"
				class="inline-block px-8 py-4 bg-[#ff4500] text-black font-rival font-bold text-sm tracking-wide hover:bg-white transition-colors"
			>
				VIEW WORK
			</a>
		</div>

		<!-- Scroll indicator -->
		<div class="hero-scroll-indicator" style="opacity: {1 - heroProgress}">
			<div class="w-px h-16 bg-gradient-to-b from-[#ff4500] to-transparent"></div>
			<span class="font-rival-narrow text-xs text-white/40 tracking-widest uppercase mt-2">Scroll</span>
		</div>
	</div>
</section>

<!-- ==================== MANIFESTO SECTION ==================== -->
<section id="manifesto" class="manifesto-section">
	<div class="manifesto-content">
		<!-- Section number watermark -->
		<span class="manifesto-number">01</span>

		<h2 class="font-rival text-4xl lg:text-5xl xl:text-6xl font-medium text-white mb-8 leading-tight uppercase">
			Systems don't fail by accident.<br/>
			<span class="text-[#ff4500]">They fail in predictable ways.</span>
		</h2>

		<p class="font-rival text-xl lg:text-2xl text-white/60 leading-relaxed mb-12 max-w-3xl mx-auto">
			From missing ownership boundaries to ignoring second-order effects of architecture decisions.
			I've spent 25 years learning these patterns—and building systems that survive them.
		</p>

		<!-- Pull quote -->
		<div class="relative inline-block text-left">
			<div class="absolute -left-6 top-0 bottom-0 w-1 bg-[#ff4500]"></div>
			<blockquote class="pl-8 font-rival text-2xl lg:text-3xl text-white/80 italic">
				"The best architecture <span class="font-highest-praise text-[#ff4500] text-3xl lg:text-4xl not-italic">disappears</span> into the experience."
			</blockquote>
		</div>
	</div>
</section>

<!-- ==================== WORK SECTION (Sticky-Stack Cards) ==================== -->
<section id="work" class="work-section">
	<!-- Section header -->
	<div class="work-header">
		<span class="font-rival text-8xl font-medium text-white/5">02</span>
		<span class="font-rival-narrow text-sm tracking-[0.3em] uppercase text-white/40 ml-4">Curated Works</span>
	</div>

	{#each featuredProjects as project, i}
		<div
			class="work-card"
			style="z-index: {i + 1}; background-image: url({project.heroImage})"
		>
			<!-- Gradient overlay -->
			<div class="work-card-overlay"></div>

			<!-- Project counter -->
			<div class="work-card-counter">
				<span class="font-rival text-6xl lg:text-7xl font-bold text-white">{String(i + 1).padStart(2, '0')}</span>
				<span class="font-rival-narrow text-lg text-white/30 ml-2">/ {String(featuredProjects.length).padStart(2, '0')}</span>
			</div>

			<!-- Project info -->
			<div class="work-card-info">
				<span class="font-rival-narrow text-[#ff4500] text-sm tracking-[0.3em] uppercase mb-2 block">{project.category}</span>
				<h3 class="font-rival text-4xl lg:text-5xl xl:text-6xl font-medium text-white uppercase mb-4">{project.title}</h3>
				{#if project.demo}
					<a
						href={project.demo}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-rival-narrow text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all"
					>
						VIEW WORK
						<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
				{/if}
			</div>
		</div>
	{/each}
</section>

<!-- ==================== SERVICES SECTION (Row Layout) ==================== -->
<section id="services" class="services-section">
	<div class="services-container">
		<!-- Section header -->
		<div class="flex items-baseline gap-4 mb-16">
			<span class="font-rival text-7xl lg:text-8xl font-medium text-white/5">03</span>
			<h2 class="font-rival text-4xl lg:text-5xl font-medium text-white uppercase">Our Service</h2>
		</div>

		<!-- Service rows -->
		<div class="services-list">
			{#each services as service, i}
				<button
					class="service-row"
					class:active={activeServiceIndex === i}
					on:click={() => activeServiceIndex = i}
					on:mouseenter={() => activeServiceIndex = i}
				>
					<div class="service-row-left">
						<span class="service-arrow {activeServiceIndex === i ? 'visible' : ''}">→</span>
						<span class="font-rival text-lg lg:text-xl uppercase">{service.title}</span>
					</div>
					<div class="service-row-right">
						<span class="font-rival text-sm lg:text-base text-white/60">{service.description}</span>
					</div>
				</button>
			{/each}
		</div>

		<!-- Floating image -->
		<div class="services-floating-image" style="transform: translateY({activeServiceIndex * 20}px) rotate({5 + activeServiceIndex * 2}deg)">
			<img
				src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop&q=80"
				alt="Abstract design"
				class="w-full h-full object-cover"
			/>
		</div>
	</div>
</section>

<!-- ==================== PHOTOGRAPHY SECTION ==================== -->
<section id="photography" class="photography-section">
	<div class="h-full flex flex-col">
		<!-- Header -->
		<div class="photography-header">
			<span class="font-rival text-7xl lg:text-8xl font-medium text-white/5 absolute top-8 left-8">04</span>
			<div class="flex items-center gap-3 mb-4">
				<div class="w-10 h-px bg-[#ff4500]"></div>
				<span class="font-rival-narrow text-[#ff4500] text-sm tracking-[0.3em] uppercase">I Also Create</span>
			</div>
			<h2 class="font-rival text-4xl lg:text-5xl xl:text-6xl font-medium text-white uppercase mb-4">
				Through the <span class="font-highest-praise text-[#ff4500] text-5xl lg:text-6xl xl:text-7xl normal-case">Lens</span>
			</h2>
			<p class="font-rival text-lg text-white/60 max-w-xl">
				Action sports photography. The same precision I bring to systems architecture,
				applied to capturing decisive moments.
			</p>
		</div>

		<!-- Draggable photo carousel -->
		<div class="flex-1 flex flex-col justify-center py-4">
			<div
				bind:this={photoScrollContainer}
				class="photo-scroll-container cursor-grab select-none"
				role="region"
				aria-label="Photo gallery - drag to scroll"
				on:mousedown={handlePhotoMouseDown}
				on:mousemove={handlePhotoMouseMove}
				on:mouseup={handlePhotoMouseUp}
				on:mouseleave={handlePhotoMouseLeave}
				on:touchstart={handlePhotoTouchStart}
				on:touchmove={handlePhotoTouchMove}
				on:touchend={handlePhotoTouchEnd}
			>
				<div class="photo-gallery-track">
					{#each Array(TOTAL_PHOTOS) as _, i}
						<button
							class="photo-gallery-item"
							on:click={() => openPhotoLightbox(i)}
							type="button"
							aria-label="View photo {i + 1}"
						>
							<img
								src="{base}/images/gallery/portfolio-{getImgNum(i)}.jpg"
								alt="Portfolio photo {i + 1}"
								loading="lazy"
								draggable="false"
							/>
						</button>
					{/each}
				</div>
			</div>

			<!-- Progress bar -->
			<div class="px-8 lg:px-16 mt-4">
				<div class="relative h-px bg-white/10 overflow-hidden">
					<div
						class="absolute left-0 top-0 h-full bg-[#ff4500] transition-transform duration-100"
						style="width: 100%; transform: scaleX({photoScrollProgress}); transform-origin: left;"
					></div>
				</div>
				<div class="flex justify-between items-center mt-3">
					<span class="font-rival-narrow text-xs text-white/40 tracking-widest uppercase">
						Drag to explore • Click to view
					</span>
					<a
						href="https://photography.ninochavez.co"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-2 font-rival text-sm text-white/60 hover:text-[#ff4500] transition-colors"
					>
						View Full Portfolio
						<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ==================== CTA SECTION (Gradient) ==================== -->
<section id="contact" class="cta-section">
	<!-- Floating image -->
	<div class="cta-floating-image">
		<img
			src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=500&fit=crop&q=80"
			alt="Red chair"
			class="w-full h-full object-cover"
		/>
	</div>

	<div class="cta-content">
		<p class="font-rival text-xl lg:text-2xl text-white/80 mb-4 max-w-2xl">
			I help Fortune 500 companies turn ideas into impact—fast.
		</p>
		<p class="font-rival text-lg text-white/60 mb-12 max-w-2xl">
			From brand to product to web, I bring clarity and craft that move you forward without sacrificing quality.
		</p>

		<h2 class="font-rival text-4xl lg:text-5xl xl:text-6xl font-medium text-white uppercase mb-4">
			Ready to build<br/>
			something great together?
		</h2>

		<p class="font-rival text-lg text-white/60 mb-8">I saved you a seat!</p>

		<a
			href="mailto:abelino.chavez@gmail.com"
			class="inline-block px-10 py-5 bg-white text-black font-rival font-bold text-lg tracking-wide hover:bg-[#ff4500] hover:text-white transition-colors"
		>
			BOOK A CALL
		</a>
	</div>

	<!-- Footer -->
	<footer class="cta-footer">
		<div class="flex items-center gap-8">
			<span class="font-rival-narrow text-xs text-white/30 tracking-widest">Get In Touch</span>
			<span class="font-rival text-sm text-white/60">hello@ninochavez.co</span>
		</div>
		<div class="flex items-center gap-6">
			<a href="/" class="font-rival-narrow text-xs text-white/40 tracking-widest uppercase hover:text-[#ff4500] transition-colors">Home</a>
			<a href="/work" class="font-rival-narrow text-xs text-white/40 tracking-widest uppercase hover:text-[#ff4500] transition-colors">Work</a>
			<a href="/cv" class="font-rival-narrow text-xs text-white/40 tracking-widest uppercase hover:text-[#ff4500] transition-colors">CV</a>
			<a href="https://blog.ninochavez.co" class="font-rival-narrow text-xs text-white/40 tracking-widest uppercase hover:text-[#ff4500] transition-colors">Blog</a>
		</div>
		<div class="flex items-center gap-4">
			<a href="https://instagram.com" class="font-rival-narrow text-xs text-white/40 hover:text-[#ff4500] transition-colors">IG</a>
			<a href="https://linkedin.com/in/nino-chavez" class="font-rival-narrow text-xs text-white/40 hover:text-[#ff4500] transition-colors">LI</a>
			<a href="https://github.com/nino-chavez" class="font-rival-narrow text-xs text-white/40 hover:text-[#ff4500] transition-colors">GH</a>
		</div>
	</footer>
</section>

<!-- ==================== PHOTO LIGHTBOX ==================== -->
{#if photoLightboxOpen}
	<div
		class="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
		on:click={closePhotoLightbox}
		on:keydown={(e) => e.key === 'Escape' && closePhotoLightbox()}
		role="dialog"
		aria-modal="true"
		aria-label="Photo lightbox"
		tabindex="-1"
	>
		<button
			class="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
			on:click|stopPropagation={closePhotoLightbox}
			aria-label="Close lightbox"
		>
			<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

		<div class="flex-1 flex items-center justify-center p-8" on:click|stopPropagation>
			<button
				class="absolute left-4 lg:left-8 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors"
				on:click|stopPropagation={prevPhoto}
				aria-label="Previous photo"
			>
				<svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
			</button>

			<img
				src={currentPhotoSrc}
				alt="Portfolio photo {currentPhotoIndex + 1}"
				class="max-h-[70vh] max-w-[85vw] object-contain"
			/>

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

		<div class="absolute top-6 left-6 font-rival-narrow text-white/50 text-sm tracking-widest">
			{String(currentPhotoIndex + 1).padStart(2, '0')} / {String(TOTAL_PHOTOS).padStart(2, '0')}
		</div>

		<div class="flex-shrink-0 px-4 pb-6" on:click|stopPropagation>
			<div class="flex justify-center gap-1 overflow-x-auto py-2 max-w-full">
				{#each Array(Math.min(TOTAL_PHOTOS, 20)) as _, i}
					{@const thumbIndex = Math.max(0, currentPhotoIndex - 10) + i}
					{#if thumbIndex < TOTAL_PHOTOS}
						<button
							class="flex-shrink-0 w-16 h-12 overflow-hidden transition-all duration-200
								{currentPhotoIndex === thumbIndex ? 'ring-2 ring-[#ff4500] opacity-100' : 'opacity-40 hover:opacity-70'}"
							on:click|stopPropagation={() => { currentPhotoIndex = thumbIndex; }}
							aria-label="View photo {thumbIndex + 1}"
						>
							<img
								src="{base}/images/gallery/portfolio-{getImgNum(thumbIndex)}.jpg"
								alt="Thumbnail {thumbIndex + 1}"
								class="w-full h-full object-cover"
								loading="lazy"
							/>
						</button>
					{/if}
				{/each}
			</div>
		</div>

		<div class="absolute bottom-4 left-1/2 -translate-x-1/2 font-rival-narrow text-xs text-white/30 tracking-widest">
			← → to navigate • ESC to close
		</div>
	</div>
{/if}

<style>
	/* ==================== FONTS ==================== */
	.font-rival {
		font-family: "rival-sans", sans-serif;
	}
	.font-rival-narrow {
		font-family: "rival-sans-narrow", sans-serif;
	}
	.font-highest-praise {
		font-family: "highest-praise", cursive;
	}

	/* ==================== HERO SECTION ==================== */
	.hero-section {
		height: 300vh; /* 3 viewport heights for scroll animation */
		position: relative;
		background: #000;
	}

	.hero-sticky {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: hidden;
	}

	.hero-image-panel {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 50%;
		overflow: hidden;
		transition: transform 0.1s ease-out;
	}

	.hero-image-left {
		left: 0;
		clip-path: inset(0 var(--split) 0 0);
		transform: translateX(calc(-1 * var(--split)));
	}

	.hero-image-right {
		right: 0;
		clip-path: inset(0 0 0 var(--split));
		transform: translateX(var(--split));
	}

	.hero-image {
		width: 200%; /* Double width to show same image on both panels */
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.hero-image-left .hero-image {
		transform: translateX(0);
	}

	.hero-image-right .hero-image {
		transform: translateX(-50%);
	}

	.hero-center-reveal {
		position: absolute;
		inset: 0;
		background: #000;
		z-index: 1;
	}

	.hero-tagline {
		position: absolute;
		top: 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.hero-tagline-left {
		left: 2rem;
	}

	.hero-tagline-right {
		right: 2rem;
		text-align: right;
	}

	.hero-name {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		font-family: "rival-sans", sans-serif;
		font-size: clamp(4rem, 12vw, 10rem);
		font-weight: 500;
		color: white;
		z-index: 2;
		line-height: 1;
	}

	.hero-name-left {
		left: 2rem;
	}

	.hero-name-right {
		right: 2rem;
	}

	.hero-cta {
		position: absolute;
		bottom: 20%;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
		z-index: 3;
	}

	.hero-scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		z-index: 3;
	}

	/* ==================== MANIFESTO SECTION ==================== */
	.manifesto-section {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		padding: 4rem 2rem;
	}

	.manifesto-content {
		max-width: 64rem;
		text-align: center;
		position: relative;
	}

	.manifesto-number {
		position: absolute;
		top: -4rem;
		left: 50%;
		transform: translateX(-50%);
		font-family: "rival-sans", sans-serif;
		font-size: 12rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.03);
		line-height: 1;
		pointer-events: none;
	}

	/* ==================== WORK SECTION ==================== */
	.work-section {
		position: relative;
		background: #000;
	}

	.work-header {
		position: sticky;
		top: 0;
		z-index: 10;
		padding: 2rem;
		display: flex;
		align-items: baseline;
		pointer-events: none;
	}

	.work-card {
		position: sticky;
		top: 0;
		height: 100vh;
		background-size: cover;
		background-position: center;
		display: flex;
		align-items: flex-end;
		padding: 4rem;
	}

	.work-card-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%);
	}

	.work-card-counter {
		position: absolute;
		top: 2rem;
		left: 2rem;
		display: flex;
		align-items: baseline;
		z-index: 2;
	}

	.work-card-info {
		position: relative;
		z-index: 2;
		max-width: 600px;
	}

	/* ==================== SERVICES SECTION ==================== */
	.services-section {
		min-height: 100vh;
		background: #000;
		padding: 6rem 2rem;
		display: flex;
		align-items: center;
	}

	.services-container {
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		position: relative;
	}

	.services-list {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.service-row {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		background: transparent;
		border-left: none;
		border-right: none;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.service-row:hover,
	.service-row.active {
		background: rgba(255, 69, 0, 0.05);
	}

	.service-row-left {
		display: flex;
		align-items: center;
		gap: 1rem;
		color: white;
	}

	.service-arrow {
		color: #ff4500;
		opacity: 0;
		transform: translateX(-10px);
		transition: all 0.3s ease;
	}

	.service-arrow.visible {
		opacity: 1;
		transform: translateX(0);
	}

	.service-row-right {
		max-width: 400px;
		text-align: right;
	}

	.services-floating-image {
		position: absolute;
		top: 50%;
		right: -100px;
		width: 250px;
		height: 320px;
		overflow: hidden;
		transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
		pointer-events: none;
		opacity: 0.8;
	}

	@media (max-width: 1024px) {
		.services-floating-image {
			display: none;
		}
	}

	/* ==================== PHOTOGRAPHY SECTION ==================== */
	.photography-section {
		min-height: 100vh;
		background: #000;
		padding-top: 4rem;
	}

	.photography-header {
		padding: 0 2rem 2rem;
		position: relative;
	}

	.photo-scroll-container {
		overflow-x: auto;
		overflow-y: hidden;
		scrollbar-width: none;
		-ms-overflow-style: none;
		padding: 1rem 2rem;
	}

	.photo-scroll-container::-webkit-scrollbar {
		display: none;
	}

	.photo-gallery-track {
		display: flex;
		gap: 1rem;
		padding: 0 calc(50vw - 200px);
	}

	.photo-gallery-item {
		flex-shrink: 0;
		width: 180px;
		height: 270px;
		overflow: hidden;
		border: none;
		padding: 0;
		background: transparent;
		cursor: pointer;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.photo-gallery-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
		pointer-events: none;
		transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
		will-change: transform, opacity;
	}

	.photo-gallery-item:hover {
		transform: scale(1.02);
	}

	@media (min-width: 768px) {
		.photo-gallery-item {
			width: 220px;
			height: 330px;
		}
	}

	@media (min-width: 1280px) {
		.photo-gallery-item {
			width: 280px;
			height: 420px;
		}
	}

	/* ==================== CTA SECTION ==================== */
	.cta-section {
		min-height: 100vh;
		background: linear-gradient(to bottom, #ff4500 0%, #dc143c 40%, #000 100%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		position: relative;
		text-align: center;
	}

	.cta-floating-image {
		position: absolute;
		top: 20%;
		left: 10%;
		width: 200px;
		height: 260px;
		overflow: hidden;
		transform: rotate(-8deg);
		opacity: 0.9;
		pointer-events: none;
	}

	@media (max-width: 1024px) {
		.cta-floating-image {
			display: none;
		}
	}

	.cta-content {
		position: relative;
		z-index: 2;
		max-width: 800px;
	}

	.cta-footer {
		position: absolute;
		bottom: 2rem;
		left: 2rem;
		right: 2rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	@media (max-width: 768px) {
		.cta-footer {
			flex-direction: column;
			align-items: center;
		}
	}

	/* ==================== REDUCED MOTION ==================== */
	@media (prefers-reduced-motion: reduce) {
		.hero-image-panel,
		.service-row,
		.service-arrow,
		.services-floating-image,
		.photo-gallery-item,
		.photo-gallery-item img {
			transition: none;
		}
	}
</style>
