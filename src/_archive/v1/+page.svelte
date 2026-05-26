<script>
	import { base } from '$app/paths';
	import { inView } from '$lib/actions/inView';
	import { CAPABILITY_IDS, CAPABILITY_SYSTEM, CAREER_MILESTONES, PROJECTS } from '$lib/constants';
	import { focusCopy, frameCopy } from '$lib/copy';
	import { onDestroy, onMount } from 'svelte';

	let mounted = false;
	let activeCapability = 'enterprise-commerce';
	let selectedMilestone = 0;
	let scrollProgress = 0;

	// Section visibility states for animations
	let heroVisible = false;
	let aboutVisible = false;
	let workVisible = false;
	let photoVisible = false;
	let contactVisible = false;

	// Photo gallery state
	let photoScrollContainer;
	let photoScrollProgress = 0;
	let photoIsDragging = false;
	let photoHasDragged = false;
	let photoStartX = 0;
	let photoScrollLeft = 0;
	let photoRafId;
	let photoAnimationCleanup = null;

	// Smooth scroll animation variables (from original GallerySection)
	let photoTargetScroll = 0;
	let photoCurrentScroll = 0;
	const photoSmoothing = 0.1;

	// Total number of photos available
	const TOTAL_PHOTOS = 60;

	// Lightbox state
	let photoLightboxOpen = false;
	let currentPhotoIndex = 0;

	// Check for reduced motion preference
	let prefersReducedMotion = false;

	onMount(() => {
		mounted = true;
		heroVisible = true; // Hero visible immediately

		// Check reduced motion preference
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Scroll progress tracking
		const updateScrollProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
		};
		window.addEventListener('scroll', updateScrollProgress, { passive: true });
		updateScrollProgress();

		return () => {
			window.removeEventListener('scroll', updateScrollProgress);
		};
	});

	onDestroy(() => {
		// Clean up photo animation if running
		if (photoAnimationCleanup) {
			photoAnimationCleanup();
		}
	});

	// Damping function for smooth scroll (from original GallerySection)
	function damp(current, target, smoothing) {
		return current + (target - current) * smoothing;
	}

	// Setup scroll animation (matches original GallerySection effect)
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

			// Apply parallax and scale effects to each gallery item
			const imageElements = photoScrollContainer.querySelectorAll('.photo-gallery-item');
			const containerWidth = photoScrollContainer.clientWidth;

			imageElements.forEach((item) => {
				const rect = item.getBoundingClientRect();
				const viewportProgress =
					(rect.left + rect.width / 2 - containerWidth / 2) / (containerWidth / 2);

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

		// Store cleanup function
		photoAnimationCleanup = () => {
			photoScrollContainer?.removeEventListener('scroll', handleScroll);
			if (photoRafId) cancelAnimationFrame(photoRafId);
		};
	}

	// Setup animation when container becomes available and section is visible
	$: if (photoScrollContainer && photoVisible && !photoAnimationCleanup) {
		setupPhotoAnimation();
	}

	$: currentCapability = CAPABILITY_SYSTEM[activeCapability];
	$: timelineMilestones = CAREER_MILESTONES.filter(m => !m.current).reverse();
	$: currentMilestoneData = timelineMilestones[selectedMilestone];
	$: currentRole = CAREER_MILESTONES.find(m => m.current);

	function setActive(id) {
		activeCapability = id;
	}

	function selectMilestone(idx) {
		selectedMilestone = idx;
	}

	// Photo gallery drag handlers (mouse)
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

	// Photo gallery touch handlers (mobile)
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

	// Helper to get padded image number
	function getImgNum(index) {
		return String(index + 1).padStart(2, '0');
	}

	// Reactive statement for current photo src
	$: currentPhotoSrc = `${base}/images/gallery/portfolio-${getImgNum(currentPhotoIndex)}.jpg`;
</script>

<svelte:head>
	<title>Nino Chavez | Product Architect & AI-Native Development</title>
	<link rel="stylesheet" href="https://use.typekit.net/wbj0oqh.css">
	<link rel="stylesheet" href="https://use.typekit.net/pxj6trb.css">
</svelte:head>

<svelte:window on:keydown={handlePhotoKeydown} />

<!-- Scroll-Driven Narrative Design -->
<!-- Fonts: Rival Sans for headlines/body, Rival Sans Narrow for labels, Highest Praise for accent words -->
<!-- Characteristics: Photography-forward, warm accent (#e18718), geometric modern, immersive scroll -->

<!-- Scroll Progress Indicator -->
<div
	class="fixed top-0 left-0 h-[3px] z-50 transition-all duration-75"
	style="width: {scrollProgress}%; background: linear-gradient(90deg, #e18718, #f59825);"
></div>

<main style="background-color: #0a0a0a; color: #f5f5f0;">
	<!-- ==================== HERO SECTION ==================== -->
	<section class="relative min-h-screen section-hero">
		<!-- Full-bleed background image -->
		<div class="absolute inset-0">
			<img
				src="{base}/images/hero.webp"
				alt="Nino Chavez"
				class="w-full h-full object-cover opacity-40"
				style="filter: sepia(20%) saturate(80%);"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
			<div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]/40"></div>
		</div>

		<!-- Content overlay -->
		<div class="relative z-20 min-h-screen flex flex-col">
			<!-- Minimal top nav -->
			<nav class="flex justify-between items-center p-6 lg:p-8 animate-fade-in" style="animation-delay: 200ms;">
				<span class="font-rival-narrow text-sm text-neutral-500 tracking-widest uppercase">NINO CHAVEZ</span>
				<div class="flex gap-2 text-sm text-neutral-500 font-rival-body">
					<a href="#about" class="hover:text-[#e18718] transition-colors px-3 py-2 min-h-[44px] flex items-center">About</a>
					<a href="#work" class="hover:text-[#e18718] transition-colors px-3 py-2 min-h-[44px] flex items-center">Work</a>
					<a href="#contact" class="hover:text-[#e18718] transition-colors px-3 py-2 min-h-[44px] flex items-center">Contact</a>
				</div>
			</nav>

			<!-- Main content - positioned at bottom -->
			<div class="mt-auto p-6 lg:p-12 max-w-4xl">
				<!-- Eyebrow with warm accent -->
				<div class="flex items-center gap-3 mb-6 animate-fade-in-up" style="animation-delay: 300ms;">
					<div class="w-12 h-px bg-[#e18718]"></div>
					<span class="font-rival-narrow text-[#e18718] text-sm tracking-widest uppercase">Product Architect</span>
				</div>

				<!-- Large editorial headline -->
				{#if mounted}
					<h1 class="font-rival text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium leading-[1.1] mb-6 sm:mb-8 animate-fade-in-up" style="color: #f5f5f0; animation-delay: 400ms;">
						I build the systems<br/>
						that build the<br/>
						<span class="font-highest-praise text-[#e18718] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-normal">experiences</span>.
					</h1>

					<!-- Supporting text -->
					<p class="font-rival-body text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl animate-fade-in-up" style="color: #9a9a95; animation-delay: 500ms;">
						25 years architecting commerce at scale. Fortune 500 platforms.
						Product architecture for commerce platforms. Building systems that scale.
					</p>

					<!-- Subtle CTA row -->
					<div class="flex flex-wrap items-center gap-6 animate-fade-in-up" style="animation-delay: 600ms;">
						<a
							href="/blog"
							class="inline-flex items-center gap-3 text-white hover:text-[#e18718] transition-colors group"
						>
							<span class="font-rival-body text-sm font-medium tracking-wide">Read Signal Dispatch</span>
							<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</a>
						<span class="w-px h-4 bg-neutral-700"></span>
						<a href="/photography" class="font-rival-body text-sm text-neutral-500 hover:text-white transition-colors">Photography</a>
						<a href="/cv" class="font-rival-body text-sm text-neutral-500 hover:text-white transition-colors">CV</a>
					</div>
				{/if}
			</div>

			<!-- Enhanced Scroll indicator - prevents false floor -->
			<div class="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-8 animate-fade-in pointer-events-none" style="animation-delay: 800ms;">
				<!-- Partial content peek indicator -->
				<div class="text-center mb-4">
					<span class="font-rival-narrow text-xs tracking-widest uppercase text-neutral-600">Discover More</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<div class="w-px h-12 bg-gradient-to-b from-[#e18718] to-transparent animate-scroll-hint"></div>
					<svg class="w-5 h-5 text-[#e18718] animate-bounce-subtle" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
					</svg>
				</div>
			</div>
		</div>

		<!-- Side accent line -->
		<div class="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-[#e18718]/50 to-transparent"></div>
	</section>

	<!-- Section Divider: Hero to About -->
	<div class="section-divider-wave" style="background: #0d0d08;">
		<svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-[60px]">
			<path fill="#0a0a0a" d="M0,0 C480,60 960,60 1440,0 L1440,0 L0,0 Z"></path>
		</svg>
	</div>

	<!-- ==================== ABOUT SECTION ==================== -->
	<section
		id="about"
		class="py-16 lg:py-20 relative section-about"
		style="background: #0d0d08;"
		use:inView={{ threshold: 0.15 }}
		on:enter={() => aboutVisible = true}
	>
		<!-- Narrative content - editorial width for readability -->
		<div class="max-w-3xl mx-auto px-6 lg:px-12 transition-all duration-700 {aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
			<!-- Section eyebrow -->
			<div class="flex items-center gap-3 mb-8">
				<div class="w-8 h-px bg-[#e18718]"></div>
				<span class="font-rival-narrow text-[#e18718] text-xs tracking-widest uppercase">About</span>
			</div>

			<h2 class="font-rival text-3xl sm:text-4xl lg:text-5xl font-medium mb-6 sm:mb-8" style="color: #f5f5f0;">
				{focusCopy.heading}
			</h2>

			<p class="font-rival-body text-xl leading-relaxed mb-16" style="color: #9a9a95;">
				{focusCopy.subhead}
			</p>

			<!-- Pull Quote with script accent -->
			<div class="mb-12 sm:mb-16 pl-6 sm:pl-8 border-l-2 border-[#e18718]">
				<blockquote class="font-rival text-xl sm:text-2xl lg:text-3xl font-normal leading-snug" style="color: #f5f5f0;">
					"The best architecture <span class="font-highest-praise text-[#e18718] text-2xl sm:text-3xl lg:text-4xl">disappears</span> into the experience—<br class="hidden lg:inline"/>
					you only see what it enables."
				</blockquote>
			</div>

			<!-- Narrative -->
			<p class="font-rival-body text-lg leading-[1.8] mb-8" style="color: #c5c5c0;">
				{focusCopy.narrative1}
			</p>

			<!-- Concluding statement - styled as emphasis -->
			<p class="font-rival text-xl sm:text-2xl font-medium" style="color: #f5f5f0;">
				{focusCopy.narrative2}
			</p>
		</div>

		<!-- Capabilities section - wider for card grid -->
		<div class="max-w-5xl mx-auto px-6 lg:px-12 mt-20 transition-all duration-700 delay-100 {aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
			<div class="flex items-center gap-3 mb-8">
				<div class="w-8 h-px bg-[#e18718]/50"></div>
				<span class="font-rival-narrow text-xs tracking-widest uppercase" style="color: #9a9a95;">Areas of Focus</span>
			</div>

			<!-- Capability cards - 2x2 grid with equal heights -->
			<div class="grid md:grid-cols-2 gap-6">
				{#each CAPABILITY_IDS as id}
					{@const item = CAPABILITY_SYSTEM[id]}
					<button
						on:click={() => setActive(id)}
						class="text-left p-6 border transition-all duration-300 group relative overflow-hidden flex flex-col
							{activeCapability === id
								? 'bg-[#e18718]/10 border-[#e18718]/50'
								: 'bg-transparent border-neutral-800 hover:border-[#e18718]/50 hover:bg-[#e18718]/5'}"
						style="color: {activeCapability === id ? '#f5f5f0' : '#9a9a95'};"
					>
						<!-- Active indicator bar -->
						<div class="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300
							{activeCapability === id ? 'bg-[#e18718]' : 'bg-transparent group-hover:bg-[#e18718]/30'}"></div>
						<div class="pl-3 flex-1">
							<div class="font-rival text-lg font-medium mb-2 transition-colors group-hover:text-[#f5f5f0]">
								{item.focusArea.title}
							</div>
							<div class="font-rival-body text-sm leading-relaxed opacity-70">
								{item.focusArea.description}
							</div>
						</div>
					</button>
				{/each}
			</div>

			<!-- Capability Detail Panel -->
			{#key activeCapability}
				<div class="mt-8 p-8 border border-neutral-800" style="background: linear-gradient(135deg, rgba(225, 135, 24, 0.05) 0%, transparent 100%);">
					<div class="grid lg:grid-cols-2 gap-8">
						<div>
							<span class="font-rival-narrow text-xs text-[#e18718] tracking-widest uppercase">Domain</span>
							<h4 class="font-rival text-2xl lg:text-3xl font-medium mt-2 mb-4" style="color: #f5f5f0;">{currentCapability.domain.area}</h4>
							<p class="font-rival-body leading-relaxed" style="color: #9a9a95;">{currentCapability.domain.description}</p>
						</div>
						<div>
							<span class="font-rival-narrow text-xs tracking-widest uppercase mb-4 block" style="color: #6a6a65;">Capabilities</span>
							<ul class="space-y-3">
								{#each currentCapability.domain.capabilities as capability}
									<li class="flex items-start font-rival-body text-sm" style="color: #c5c5c0;">
										<span class="text-[#e18718] mr-3 mt-1">—</span>
										{capability}
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			{/key}
		</div>

		<!-- Current Role - back to editorial width -->
		<div class="max-w-3xl mx-auto px-6 lg:px-12 mt-20 transition-all duration-700 delay-200 {aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
			{#if currentRole}
				<div class="p-8 border-l-2 border-[#e18718]" style="background: linear-gradient(90deg, rgba(225, 135, 24, 0.08) 0%, transparent 100%);">
					<span class="font-rival-narrow text-xs text-[#e18718] tracking-widest uppercase">Current Role</span>
					<h3 class="font-rival text-2xl lg:text-3xl font-medium mt-2 mb-2" style="color: #f5f5f0;">{currentRole.role}</h3>
					<p class="font-rival-body text-lg mb-4" style="color: #c5c5c0;">{currentRole.scale}</p>
					<p class="font-rival-body leading-relaxed" style="color: #9a9a95;">{currentRole.achievement}</p>
				</div>
			{/if}
		</div>

		<!-- Timeline - wider for horizontal layout -->
		<div class="max-w-4xl mx-auto px-6 lg:px-12 mt-12 sm:mt-16 transition-all duration-700 delay-300 {aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
			<div class="flex items-center gap-3 mb-6 sm:mb-8">
				<div class="w-8 h-px bg-[#e18718]/50"></div>
				<span class="font-rival-narrow text-xs tracking-widest uppercase" style="color: #9a9a95;">Career Timeline</span>
			</div>

			<!-- Timeline with visual connecting line - horizontally scrollable on mobile -->
			<div class="relative pt-8 overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 sm:overflow-visible">
				<div class="min-w-[500px] sm:min-w-0">
					<!-- Visual timeline bar -->
					<div class="absolute top-8 left-0 right-0 h-px bg-neutral-800"></div>

					<!-- Progress indicator line -->
					<div
						class="absolute top-8 left-0 h-px bg-[#e18718] transition-all duration-500"
						style="width: {(selectedMilestone / (timelineMilestones.length - 1)) * 100}%;"
					></div>

					<!-- Timeline nodes and buttons -->
					<div class="relative flex justify-between items-start">
						{#each timelineMilestones as milestone, idx}
							<button
								on:click={() => selectMilestone(idx)}
								class="flex flex-col items-center group transition-all duration-300 min-h-[48px] min-w-[60px] px-1 sm:px-2"
							>
								<!-- Node dot -->
								<div class="w-3 h-3 rounded-full border-2 transition-all duration-300 -mt-1.5 mb-2 sm:mb-3
									{selectedMilestone === idx
										? 'bg-[#e18718] border-[#e18718] scale-125'
										: 'bg-[#0a0a0a] border-neutral-600 group-hover:border-[#e18718] group-hover:scale-110'}">
								</div>
								<div class="font-rival text-base sm:text-lg lg:text-xl font-medium mb-1 transition-colors group-hover:text-[#e18718]"
									style="color: {selectedMilestone === idx ? '#e18718' : '#6a6a65'};">
									{milestone.year}
								</div>
								<div class="font-rival-narrow text-[10px] sm:text-xs transition-colors group-hover:text-[#9a9a95] whitespace-nowrap" style="color: #6a6a65;">{milestone.era}</div>
							</button>
						{/each}
					</div>
				</div>
			</div>

			{#if currentMilestoneData}
				{#key selectedMilestone}
					<div class="mt-6 sm:mt-8 p-4 sm:p-6 border border-neutral-800 relative overflow-hidden" style="background: rgba(225, 135, 24, 0.03);">
						<!-- Accent corner -->
						<div class="absolute top-0 left-0 w-1 h-full bg-[#e18718]"></div>
						<div class="pl-3 sm:pl-4">
							<h4 class="font-rival-body text-base sm:text-lg font-medium mb-2" style="color: #f5f5f0;">{currentMilestoneData.role}</h4>
							<p class="font-rival-body text-sm sm:text-base text-[#e18718] mb-2 sm:mb-3">{currentMilestoneData.scale}</p>
							<p class="font-rival-body text-xs sm:text-sm" style="color: #9a9a95;">{currentMilestoneData.achievement}</p>
						</div>
					</div>
				{/key}
			{/if}
		</div>
	</section>

	<!-- Section Divider: About to Work -->
	<div style="background: #0a0a0a;">
		<svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-[60px]">
			<path fill="#0d0d08" d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z"></path>
		</svg>
	</div>

	<!-- ==================== WORK/PROJECTS SECTION ==================== -->
	<section
		id="work"
		class="py-16 lg:py-20 relative section-work"
		style="background: #0a0a0a;"
		use:inView={{ threshold: 0.1 }}
		on:enter={() => workVisible = true}
	>
		<div class="max-w-5xl mx-auto px-6 lg:px-12 transition-all duration-700 {workVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
			<!-- Section eyebrow -->
			<div class="flex items-center gap-3 mb-8">
				<div class="w-8 h-px bg-[#e18718]"></div>
				<span class="font-rival-narrow text-[#e18718] text-xs tracking-widest uppercase">Work</span>
			</div>

			<h2 class="font-rival text-3xl sm:text-4xl lg:text-5xl font-medium mb-6 sm:mb-8" style="color: #f5f5f0;">
				What I <span class="font-highest-praise text-[#e18718] text-4xl sm:text-5xl lg:text-6xl font-normal">Build</span>
			</h2>

			<p class="font-rival-body text-xl leading-relaxed mb-16 max-w-3xl" style="color: #9a9a95;">
				{frameCopy.subhead}
			</p>

			<!-- Projects with editorial layout -->
			<div class="space-y-32">
				{#each PROJECTS.slice(0, 4) as project, index}
					{@const isEven = index % 2 === 0}
					{@const isFeatured = index === 0}
					<div class="grid lg:grid-cols-12 gap-8 items-center group">
						<!-- Image - larger, more prominent -->
						<div class="lg:col-span-7 {isEven ? 'lg:order-1' : 'lg:order-2'}">
							<div class="aspect-[4/3] overflow-hidden relative" style="background: #1a1a15;">
								<img
									src={project.imageUrl}
									alt={project.title}
									class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
									loading="lazy"
								/>
								<!-- Hover overlay -->
								<div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								{#if isFeatured}
									<div class="absolute top-4 left-4 px-3 py-1 bg-[#e18718] text-[#0a0a0a] text-xs font-rival-narrow font-bold tracking-wider uppercase">
										Featured
									</div>
								{/if}
							</div>
						</div>

						<!-- Content -->
						<div class="lg:col-span-5 {isEven ? 'lg:order-2' : 'lg:order-1'}">
							<span class="font-rival-narrow text-xs text-[#e18718] tracking-widest uppercase">{project.category}</span>
							<h3 class="font-rival text-2xl lg:text-3xl font-medium mt-3 mb-4 group-hover:text-[#e18718] transition-colors duration-300" style="color: #f5f5f0;">{project.title}</h3>
							{#if project.subtitle}
								<p class="font-rival-body text-base mb-4" style="color: #e18718;">{project.subtitle}</p>
							{/if}
							<p class="font-rival-body text-sm leading-relaxed mb-6" style="color: #9a9a95;">{project.description}</p>

							<!-- Tech Stack -->
							<div class="flex flex-wrap gap-2 mb-6">
								{#each project.technologies.slice(0, 4) as tech}
									<span class="px-3 py-1 border border-neutral-800 text-xs font-rival-narrow hover:border-[#e18718]/50 hover:text-[#e18718] transition-colors cursor-default" style="color: #9a9a95;">{tech}</span>
								{/each}
							</div>

							<!-- Outcomes -->
							{#if project.outcomes}
								<ul class="space-y-2 mb-6">
									{#each project.outcomes.slice(0, 2) as outcome}
										<li class="flex items-start font-rival-body text-xs" style="color: #c5c5c0;">
											<span class="text-[#e18718] mr-2">—</span>
											{outcome}
										</li>
									{/each}
								</ul>
							{/if}

							<!-- Project CTAs -->
							<div class="flex flex-wrap items-center gap-4">
								{#if project.demo}
									<a
										href={project.demo}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-2 text-[#e18718] font-rival-body text-sm font-medium hover:text-white transition-colors group/cta min-h-[44px]"
									>
										<span>View Live</span>
										<svg class="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
										</svg>
									</a>
								{/if}
								{#if project.repository}
									<a
										href={project.repository}
										target="_blank"
										rel="noopener noreferrer"
										class="inline-flex items-center gap-2 text-neutral-500 font-rival-body text-sm font-medium hover:text-white transition-colors group/cta min-h-[44px]"
									>
										<span>Source</span>
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
											<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
										</svg>
									</a>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Section Divider: Work to Photography -->
	<div style="background: #0d0d08;">
		<svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-[60px]">
			<path fill="#0a0a0a" d="M0,0 C480,60 960,60 1440,0 L1440,0 L0,0 Z"></path>
		</svg>
	</div>

	<!-- ==================== PHOTOGRAPHY SECTION ==================== -->
	<section
		id="photography"
		class="relative overflow-hidden section-photo"
		style="background: #0d0d08;"
		use:inView={{ threshold: 0.1 }}
		on:enter={() => photoVisible = true}
	>
		<!-- Cinematic Feature Image - Full Width -->
		<div class="relative w-full aspect-[21/9] transition-all duration-1000 {photoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'}">
			<img
				src="{base}/images/gallery/portfolio-25.jpg"
				alt="Action sports photography - featured"
				class="w-full h-full object-cover"
				loading="lazy"
			/>
			<div class="absolute inset-0 bg-gradient-to-t from-[#0d0d08] via-[#0d0d08]/30 to-transparent"></div>
			<div class="absolute inset-0 bg-gradient-to-r from-[#0d0d08]/80 via-transparent to-[#0d0d08]/80"></div>

			<!-- Overlay Content -->
			<div class="absolute inset-0 flex items-end">
				<div class="max-w-5xl mx-auto px-6 lg:px-12 pb-12 w-full">
					<div class="flex items-center gap-3 mb-4">
						<div class="w-8 h-px bg-[#e18718]"></div>
						<span class="font-rival-narrow text-[#e18718] text-xs tracking-widest uppercase">Also</span>
					</div>
					<h2 class="font-rival text-3xl sm:text-4xl lg:text-6xl font-medium mb-4" style="color: #f5f5f0;">
						I Also <span class="font-highest-praise text-[#e18718] text-4xl sm:text-5xl lg:text-7xl font-normal">Create</span>
					</h2>
					<p class="font-rival-body text-lg leading-relaxed max-w-2xl" style="color: #c5c5c0;">
						Creative thinking isn't separate from strategic thinking—it's the same muscle.
						I read patterns in motion, anticipate the decisive moment, and frame complexity into clarity.
						Whether it's architecture or action sports, it's about seeing what others miss.
					</p>
				</div>
			</div>
		</div>

		<!-- Horizontal Photo Gallery Carousel -->
		<div class="max-w-5xl mx-auto px-6 lg:px-12 mb-8 mt-12">
			<div class="flex items-center justify-between mb-6">
				<div class="flex items-center gap-4">
					<span class="font-rival-narrow text-xs tracking-widest uppercase" style="color: #6a6a65;">Visual Stories</span>
					<span class="font-rival-narrow text-xs text-[#e18718]">{TOTAL_PHOTOS} Selections</span>
				</div>
				<span class="font-rival-narrow text-xs" style="color: #6a6a65;">Drag to explore →</span>
			</div>
		</div>

		<!-- Draggable Gallery Track -->
		<div
			bind:this={photoScrollContainer}
			class="photo-scroll-container"
			on:mousedown={handlePhotoMouseDown}
			on:mousemove={handlePhotoMouseMove}
			on:mouseup={handlePhotoMouseUp}
			on:mouseleave={handlePhotoMouseLeave}
			on:touchstart={handlePhotoTouchStart}
			on:touchmove={handlePhotoTouchMove}
			on:touchend={handlePhotoTouchEnd}
			role="region"
			aria-label="Photography gallery"
		>
			<div class="photo-gallery-track">
				{#each Array(TOTAL_PHOTOS) as _, i}
					<button
						class="photo-gallery-item"
						on:click={() => openPhotoLightbox(i)}
						aria-label="View photo {i + 1}"
					>
						<img
							src="{base}/images/gallery/portfolio-{getImgNum(i)}.jpg"
							alt="Action sports photo {i + 1}"
							loading={i < 6 ? 'eager' : 'lazy'}
							draggable="false"
						/>
					</button>
				{/each}
			</div>
		</div>

		<!-- Scroll Progress Indicator -->
		<div class="max-w-5xl mx-auto px-6 lg:px-12 mt-6">
			<div class="h-[2px] bg-neutral-800 relative">
				<div
					class="absolute top-0 left-0 h-full bg-[#e18718] transition-all duration-100"
					style="width: {photoScrollProgress * 100}%;"
				></div>
			</div>
		</div>

		<!-- CTA Section - Simplified -->
		<div class="max-w-5xl mx-auto px-6 lg:px-12 mt-12 mb-16">
			<div class="flex flex-col sm:flex-row items-center justify-center gap-6">
				<a
					href="https://photography.ninochavez.co"
					class="inline-flex items-center gap-3 text-[#e18718] font-rival-body font-medium hover:text-white transition-colors group"
				>
					<span>Explore the full portfolio</span>
					<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>
		</div>
	</section>

	<!-- Photo Lightbox -->
	{#if photoLightboxOpen}
		<div
			class="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center"
			on:click={closePhotoLightbox}
			on:keydown={handlePhotoKeydown}
			role="dialog"
			aria-modal="true"
			aria-label="Photo lightbox"
		>
			<button
				class="absolute top-6 right-6 text-white/60 hover:text-white text-4xl z-[10002] p-2"
				on:click={closePhotoLightbox}
				aria-label="Close lightbox"
			>×</button>

			<button
				class="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl p-4 z-[10002]"
				on:click|stopPropagation={prevPhoto}
				aria-label="Previous photo"
			>‹</button>

			<button
				class="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-5xl p-4 z-[10002]"
				on:click|stopPropagation={nextPhoto}
				aria-label="Next photo"
			>›</button>

			<div class="max-w-[90vw] max-h-[85vh]" on:click|stopPropagation>
				<img
					src={currentPhotoSrc}
					alt="Photo {currentPhotoIndex + 1}"
					class="max-w-full max-h-[85vh] object-contain"
				/>
			</div>

			<!-- Thumbnail strip -->
			<div class="absolute bottom-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-sm px-4 overflow-x-auto" on:click|stopPropagation>
				<div class="flex gap-2 h-full items-center">
					{#each Array(TOTAL_PHOTOS) as _, i}
						<button
							class="h-14 aspect-[2/3] overflow-hidden flex-shrink-0 opacity-50 hover:opacity-80 transition-opacity {currentPhotoIndex === i ? 'opacity-100 ring-2 ring-[#e18718]' : ''}"
							on:click={() => currentPhotoIndex = i}
						>
							<img
								src="{base}/images/gallery/portfolio-{getImgNum(i)}.jpg"
								alt="Thumbnail {i + 1}"
								class="w-full h-full object-cover"
								loading="lazy"
							/>
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- Section Divider: Photography to Contact -->
	<div style="background: #0a0a0a;">
		<svg viewBox="0 0 1440 60" preserveAspectRatio="none" class="w-full h-[60px]">
			<path fill="#0d0d08" d="M0,60 C480,0 960,0 1440,60 L1440,60 L0,60 Z"></path>
		</svg>
	</div>

	<!-- ==================== CONTACT SECTION ==================== -->
	<section
		id="contact"
		class="py-16 lg:py-20 section-contact"
		style="background: #0a0a0a;"
		use:inView={{ threshold: 0.2 }}
		on:enter={() => contactVisible = true}
	>
		<div class="max-w-2xl mx-auto px-6 lg:px-12 text-center transition-all duration-700 {contactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
			<div class="flex items-center justify-center gap-3 mb-8">
				<div class="w-8 h-px bg-[#e18718]"></div>
				<span class="font-rival-narrow text-[#e18718] text-xs tracking-widest uppercase">Contact</span>
				<div class="w-8 h-px bg-[#e18718]"></div>
			</div>

			<h2 class="font-rival text-3xl sm:text-4xl lg:text-6xl font-medium mb-6 sm:mb-8" style="color: #f5f5f0;">
				Let's <span class="font-highest-praise text-[#e18718] text-4xl sm:text-5xl lg:text-7xl font-normal">Build</span> Something
			</h2>

			<!-- Availability indicator -->
			<div class="flex items-center justify-center gap-2 mb-6">
				<span class="relative flex h-3 w-3">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
					<span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
				</span>
				<span class="font-rival-body text-sm" style="color: #9a9a95;">Currently accepting new engagements</span>
			</div>

			<p class="font-rival-body text-lg leading-relaxed mb-12" style="color: #9a9a95;">
				Available for enterprise consulting, strategic advisory, and AI transformation engagements.
			</p>

			<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
				<a
					href="mailto:nino@ninochavez.co"
					class="inline-flex items-center gap-3 px-8 py-4 bg-[#e18718] text-[#0a0a0a] font-rival-body font-bold hover:bg-[#f59825] hover:scale-105 hover:shadow-lg hover:shadow-[#e18718]/20 transition-all duration-300"
				>
					Get in Touch
				</a>
				<a
					href="https://www.linkedin.com/in/nino-chavez/"
					class="inline-flex items-center gap-3 px-8 py-4 border border-neutral-700 font-rival-body font-medium hover:border-[#e18718] hover:bg-[#e18718]/10 hover:text-[#e18718] transition-all duration-300"
					style="color: #f5f5f0;"
				>
					LinkedIn
				</a>
			</div>

			<p class="mt-12 font-rival-body text-sm" style="color: #6a6a65;">
				Chicago, IL • Global Remote
			</p>
		</div>
	</section>

	<!-- ==================== FOOTER ==================== -->
	<footer class="py-8 border-t border-neutral-800" style="background: #080808;">
		<div class="max-w-5xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
			<span class="font-rival-narrow text-xs tracking-widest" style="color: #6a6a65;">© 2025 Nino Chavez</span>
			<div class="flex gap-2 font-rival-body text-sm" style="color: #6a6a65;">
				<a href="https://blog.ninochavez.co" class="hover:text-[#e18718] transition-colors px-3 py-2 min-h-[44px] flex items-center">Blog</a>
				<a href="https://photography.ninochavez.co" class="hover:text-[#e18718] transition-colors px-3 py-2 min-h-[44px] flex items-center">Photography</a>
				<a href="/cv" class="hover:text-[#e18718] transition-colors px-3 py-2 min-h-[44px] flex items-center">CV</a>
			</div>
		</div>
	</footer>
</main>

<style>
	/* Primary headline font - geometric, modern */
	.font-rival {
		font-family: "rival-sans", sans-serif;
	}
	/* Body text - same family for cohesion */
	.font-rival-body {
		font-family: "rival-sans", sans-serif;
	}
	/* Labels and metadata - condensed */
	.font-rival-narrow {
		font-family: "rival-sans-narrow", sans-serif;
	}
	/* Script accent for emotional moments */
	.font-highest-praise {
		font-family: "highest-praise", cursive;
	}

	/* ==================== ANIMATIONS ==================== */

	/* Fade in animation */
	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	/* Fade in and slide up animation */
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Scroll hint animation */
	@keyframes scroll-hint {
		0%, 100% { transform: translateY(-100%); }
		50% { transform: translateY(100%); }
	}

	/* Subtle bounce animation */
	@keyframes bounce-subtle {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(4px); }
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out forwards;
		opacity: 0;
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.6s ease-out forwards;
		opacity: 0;
	}

	.animate-scroll-hint {
		animation: scroll-hint 2s ease-in-out infinite;
	}

	.animate-bounce-subtle {
		animation: bounce-subtle 1.5s ease-in-out infinite;
	}

	/* Respect reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.animate-fade-in,
		.animate-fade-in-up,
		.animate-scroll-hint,
		.animate-bounce-subtle {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}

	/* Photo Gallery Carousel */
	.photo-scroll-container {
		overflow-x: scroll;
		overflow-y: hidden;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;
		cursor: grab;
		padding: 0 max(1.5rem, calc((100vw - 1024px) / 2 + 1.5rem));
	}

	.photo-scroll-container::-webkit-scrollbar {
		display: none;
	}

	.photo-scroll-container:active {
		cursor: grabbing;
	}

	.photo-gallery-track {
		display: inline-flex;
		gap: 1rem;
		padding: 1rem 0;
	}

	.photo-gallery-item {
		flex-shrink: 0;
		height: 55vh;
		aspect-ratio: 2 / 3;
		overflow: hidden;
		border-radius: 4px;
		border: none;
		padding: 0;
		background: #1a1a15;
		cursor: pointer;
		transition: transform 0.3s ease;
		will-change: transform;
		position: relative;
	}

	.photo-gallery-item::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0);
		transition: background 0.3s ease;
		pointer-events: none;
	}

	.photo-gallery-item:hover::after {
		background: rgba(0, 0, 0, 0.1);
	}

	.photo-gallery-item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.4s ease, opacity 0.4s ease;
		will-change: transform, opacity;
		pointer-events: none;
		user-select: none;
	}

	@media (max-width: 768px) {
		.photo-scroll-container {
			min-height: 60vh;
		}

		.photo-gallery-item {
			height: 55vh;
			aspect-ratio: 2 / 3;
		}

		.photo-gallery-track {
			gap: 5vw;
			padding: 0 5vw;
		}
	}

	@media (min-width: 768px) {
		.photo-gallery-item {
			height: 55vh;
		}
	}

	@media (min-width: 1024px) {
		.photo-gallery-item {
			height: 55vh;
		}

		.photo-gallery-track {
			gap: 2vw;
			padding: 0 8vw;
		}
	}
</style>
