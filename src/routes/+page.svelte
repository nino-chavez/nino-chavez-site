<script>
	import { base } from '$app/paths';
	import { CAPABILITY_IDS, CAPABILITY_SYSTEM, PROJECTS } from '$lib/constants';
	import { onMount, onDestroy } from 'svelte';

	let mounted = false;
	let currentSection = 0;
	let isScrolling = false;
	let activeProject = 0;
	let activeCapability = CAPABILITY_IDS[0]; // For expertise expansion

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

	// Sections for scroll-snap navigation
	const sections = [
		{ id: 'hero', label: 'Home' },
		{ id: 'about', label: 'About' },
		{ id: 'expertise', label: 'Expertise' },
		{ id: 'work', label: 'Work' },
		{ id: 'photography', label: 'Photos' },
		{ id: 'contact', label: 'Contact' }
	];

	// Featured projects with better hero images
	const projectImages = {
		'ai-native-portfolio': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop&q=80', // Code on screen
		'nino-labs': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop&q=80', // Tech circuit board / digital experimentation
		'signal-dispatch-blog': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=800&fit=crop&q=80', // Writing/coffee desk
		'nino-chavez-gallery': 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&h=800&fit=crop&q=80', // Camera lens
		'rally-hq': 'https://images.unsplash.com/photo-1592656094267-764a45160876?w=1200&h=800&fit=crop&q=80', // Volleyball game action
		'ciq-platform': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80', // Analytics dashboard
		'aiq-platform': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80', // AI/neural network
		'commerce-transformation-navigator': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80', // Business charts
		'aegis-framework': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop&q=80', // Shield/security
		'smugmug-reference': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&h=800&fit=crop&q=80', // Camera/photography
		'agent-os-workflow-system': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=800&fit=crop&q=80' // Robot/AI agent
	};

	// Featured projects for dramatic showcase
	const featuredProjects = PROJECTS.slice(0, 5).map(p => ({
		...p,
		heroImage: projectImages[p.id] || p.imageUrl
	}));

	onMount(() => {
		mounted = true;
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Intersection observer for section detection
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
						const index = sections.findIndex(s => s.id === entry.target.id);
						if (index !== -1) currentSection = index;
					}
				});
			},
			{ threshold: 0.5 }
		);

		sections.forEach(s => {
			const el = document.getElementById(s.id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
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

			// Apply parallax and scale effects to each gallery item
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

	// Setup animation when container becomes available
	$: if (photoScrollContainer && mounted && !photoAnimationCleanup) {
		setupPhotoAnimation();
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

	$: currentPhotoSrc = `${base}/images/gallery/portfolio-${getImgNum(currentPhotoIndex)}.jpg`;

	function scrollToSection(index) {
		const section = document.getElementById(sections[index].id);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	}

	function nextProject() {
		activeProject = (activeProject + 1) % featuredProjects.length;
	}

	function prevProject() {
		activeProject = (activeProject - 1 + featuredProjects.length) % featuredProjects.length;
	}

	function setActiveCapability(id) {
		activeCapability = id;
	}

	$: currentProject = featuredProjects[activeProject];
	$: currentCapability = CAPABILITY_SYSTEM[activeCapability];
</script>

<svelte:head>
	<title>Nino Chavez | Product Architect</title>
	<link rel="stylesheet" href="https://use.typekit.net/wbj0oqh.css">
	<link rel="stylesheet" href="https://use.typekit.net/pxj6trb.css">
</svelte:head>

<svelte:window on:keydown={handlePhotoKeydown} />

<!-- Full-screen scroll-snap with dramatic layouts -->

<!-- Floating Section Indicator -->
<nav class="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
	{#each sections as section, i}
		<button
			on:click={() => scrollToSection(i)}
			class="group flex items-center gap-3 justify-end"
			aria-label="Go to {section.label}"
		>
			<span class="text-xs font-rival-narrow tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/70">
				{section.label}
			</span>
			<div class="w-3 h-3 rounded-full border-2 transition-all duration-300 {currentSection === i
				? 'bg-[#e18718] border-[#e18718] scale-125'
				: 'border-white/30 hover:border-[#e18718] hover:scale-110'}">
			</div>
		</button>
	{/each}
</nav>

<!-- Scroll Container -->
<main class="scroll-container">

	<!-- ==================== SECTION 1: HERO ==================== -->
	<!-- Split-screen dramatic hero -->
	<section id="hero" class="snap-section">
		<div class="h-full grid lg:grid-cols-2">
			<!-- Left: Content -->
			<div class="relative flex flex-col justify-center px-8 lg:px-16 xl:px-24 bg-[#0a0a0a] order-2 lg:order-1">
				<!-- Decorative elements -->
				<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e18718] via-[#e18718]/50 to-transparent"></div>
				<div class="absolute bottom-0 right-0 w-1/2 h-px bg-gradient-to-l from-[#e18718]/30 to-transparent"></div>

				{#if mounted}
					<div class="max-w-xl">
						<!-- Eyebrow -->
						<div class="flex items-center gap-4 mb-8 animate-slide-up" style="animation-delay: 200ms;">
							<div class="w-16 h-px bg-[#e18718]"></div>
							<span class="font-rival-narrow text-[#e18718] text-sm tracking-[0.3em] uppercase">Product Architect</span>
						</div>

						<!-- Main headline - stacked for impact -->
						<h1 class="mb-8">
							<span class="block font-rival text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[0.9] animate-slide-up" style="animation-delay: 300ms;">
								I build the
							</span>
							<span class="block font-rival text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[0.9] animate-slide-up" style="animation-delay: 400ms;">
								systems that
							</span>
							<span class="block font-rival text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[0.9] animate-slide-up" style="animation-delay: 500ms;">
								build the
							</span>
							<span class="block font-highest-praise text-6xl lg:text-7xl xl:text-8xl text-[#e18718] leading-[1.1] mt-2 animate-slide-up" style="animation-delay: 600ms;">
								experiences.
							</span>
						</h1>

						<!-- Stats row -->
						<div class="grid grid-cols-3 gap-8 mb-10 animate-slide-up" style="animation-delay: 700ms;">
							<div>
								<div class="font-rival text-4xl lg:text-5xl font-bold text-[#e18718]">25+</div>
								<div class="font-rival-narrow text-xs text-white/50 tracking-widest uppercase mt-1">Years</div>
							</div>
							<div>
								<div class="font-rival text-4xl lg:text-5xl font-bold text-[#e18718]">F500</div>
								<div class="font-rival-narrow text-xs text-white/50 tracking-widest uppercase mt-1">Clients</div>
							</div>
							<div>
								<div class="font-rival text-4xl lg:text-5xl font-bold text-[#e18718]">AI</div>
								<div class="font-rival-narrow text-xs text-white/50 tracking-widest uppercase mt-1">Native</div>
							</div>
						</div>

						<!-- CTA -->
						<div class="flex items-center gap-6 animate-slide-up" style="animation-delay: 800ms;">
							<button
								on:click={() => scrollToSection(3)}
								class="group px-8 py-4 bg-[#e18718] text-[#0a0a0a] font-rival font-bold text-sm tracking-wide hover:bg-white transition-colors duration-300"
							>
								View Work
							</button>
							<button
								on:click={() => scrollToSection(4)}
								class="group flex items-center gap-3 text-white/70 hover:text-[#e18718] transition-colors"
							>
								<span class="font-rival text-sm">Get in Touch</span>
								<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</button>
						</div>
					</div>
				{/if}

				<!-- Scroll indicator -->
				<div class="absolute bottom-8 left-8 lg:left-16 flex items-center gap-3 text-white/30 animate-slide-up" style="animation-delay: 1000ms;">
					<div class="w-px h-12 bg-gradient-to-b from-[#e18718] to-transparent animate-pulse"></div>
					<span class="font-rival-narrow text-xs tracking-widest uppercase">Scroll</span>
				</div>
			</div>

			<!-- Right: Full-bleed image -->
			<div class="relative h-[40vh] lg:h-full order-1 lg:order-2 overflow-hidden" style="aspect-ratio: 4/3;">
				<img
					src="{base}/images/hero.webp"
					alt="Nino Chavez"
					width="1200"
					height="900"
					class="absolute inset-0 w-full h-full object-cover scale-105"
					fetchpriority="high"
					loading="eager"
					decoding="async"
				/>
				<!-- Overlay gradients -->
				<div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent lg:opacity-100"></div>
				<div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden"></div>

				<!-- Company badge -->
				<div class="absolute bottom-8 right-8 px-4 py-2 bg-black/50 backdrop-blur-sm border border-white/10">
					<span class="font-rival-narrow text-xs text-white/70 tracking-widest uppercase">Currently at</span>
					<span class="block font-rival text-lg text-white font-medium">commerce.com</span>
				</div>
			</div>
		</div>
	</section>

	<!-- ==================== SECTION 2: ABOUT ==================== -->
	<!-- Centered manifesto style -->
	<section id="about" class="snap-section bg-[#0d0d08]">
		<div class="h-full flex items-center justify-center px-8">
			<div class="max-w-4xl text-center">
				<!-- Section number -->
				<div class="mb-8">
					<span class="font-rival text-8xl lg:text-9xl font-bold text-white/5">01</span>
				</div>

				<h2 class="font-rival text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
					Systems don't fail by accident.<br/>
					<span class="text-[#e18718]">They fail in predictable ways.</span>
				</h2>

				<p class="font-rival-body text-xl lg:text-2xl text-white/60 leading-relaxed mb-12 max-w-3xl mx-auto">
					From missing ownership boundaries to ignoring second-order effects of architecture decisions.
					I've spent 25 years learning these patterns—and building systems that survive them.
				</p>

				<!-- Pull quote -->
				<div class="relative inline-block">
					<div class="absolute -left-6 top-0 bottom-0 w-1 bg-[#e18718]"></div>
					<blockquote class="text-left pl-8 font-rival text-2xl lg:text-3xl text-white italic">
						"The best architecture <span class="font-highest-praise text-[#e18718] text-3xl lg:text-4xl not-italic">disappears</span> into the experience."
					</blockquote>
				</div>
			</div>
		</div>
	</section>

	<!-- ==================== SECTION 3: EXPERTISE ==================== -->
	<!-- Expertise cards with expandable detail panel -->
	<section id="expertise" class="snap-section bg-[#0a0a0a] overflow-y-auto">
		<div class="min-h-full flex flex-col justify-center px-8 lg:px-16 py-16">
			<!-- Section header -->
			<div class="flex items-center gap-4 mb-8">
				<span class="font-rival text-6xl lg:text-7xl font-bold text-white/5">02</span>
				<div>
					<h2 class="font-rival text-3xl lg:text-4xl font-bold text-white">Areas of Expertise</h2>
					<p class="font-rival-body text-white/50 mt-1">Click to explore capabilities</p>
				</div>
			</div>

			<!-- Expertise grid - clickable cards -->
			<div class="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
				{#each CAPABILITY_IDS as id, i}
					{@const item = CAPABILITY_SYSTEM[id]}
					<button
						on:click={() => setActiveCapability(id)}
						class="expertise-card group relative overflow-hidden text-left p-6 transition-all duration-500
							{activeCapability === id
								? 'bg-[#e18718]/10 border-[#e18718]/50 border -translate-y-1'
								: 'bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#e18718]/30 hover:-translate-y-1'}"
					>
						<!-- Number -->
						<div class="absolute top-4 right-4 font-rival text-5xl font-bold transition-colors
							{activeCapability === id ? 'text-[#e18718]/30' : 'text-white/5 group-hover:text-[#e18718]/20'}">
							{String(i + 1).padStart(2, '0')}
						</div>

						<!-- Active indicator bar -->
						<div class="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300
							{activeCapability === id ? 'bg-[#e18718]' : 'bg-transparent group-hover:bg-[#e18718]/30'}"></div>

						<!-- Content -->
						<div class="relative z-10 pl-2">
							<h3 class="font-rival text-lg font-bold mb-3 transition-colors
								{activeCapability === id ? 'text-[#e18718]' : 'text-white group-hover:text-[#e18718]'}">
								{item.focusArea.title}
							</h3>
							<p class="font-rival-body text-sm text-white/50 leading-relaxed">
								{item.focusArea.description}
							</p>
						</div>

						<!-- Bottom accent -->
						<div class="absolute bottom-0 left-0 w-full h-1 bg-[#e18718] transform transition-transform duration-500 origin-left
							{activeCapability === id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'}"></div>
					</button>
				{/each}
			</div>

			<!-- Capability Detail Panel -->
			{#key activeCapability}
				<div class="capability-detail-enter p-8 border border-white/10 relative overflow-hidden"
					style="background: linear-gradient(135deg, rgba(225, 135, 24, 0.08) 0%, rgba(225, 135, 24, 0.02) 50%, transparent 100%);">
					<!-- Decorative corner accent -->
					<div class="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-[#e18718]/30"></div>
					<div class="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-[#e18718]/30"></div>

					<div class="grid lg:grid-cols-2 gap-8 relative z-10">
						<!-- Left: Domain info -->
						<div>
							<div class="flex items-center gap-3 mb-4">
								<div class="w-8 h-px bg-[#e18718]"></div>
								<span class="font-rival-narrow text-xs text-[#e18718] tracking-widest uppercase">Domain</span>
							</div>
							<h4 class="font-rival text-2xl lg:text-3xl font-bold text-white mb-4">{currentCapability.domain.area}</h4>
							<p class="font-rival-body text-white/60 leading-relaxed">{currentCapability.domain.description}</p>
						</div>

						<!-- Right: Capabilities list -->
						<div>
							<div class="flex items-center gap-3 mb-4">
								<div class="w-8 h-px bg-white/20"></div>
								<span class="font-rival-narrow text-xs text-white/40 tracking-widest uppercase">Capabilities</span>
							</div>
							<ul class="space-y-4">
								{#each currentCapability.domain.capabilities as capability, i}
									<li class="flex items-start font-rival-body text-white/70 capability-item" style="animation-delay: {i * 100}ms;">
										<span class="text-[#e18718] mr-3 mt-0.5 font-bold">→</span>
										<span>{capability}</span>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			{/key}
		</div>
	</section>

	<!-- ==================== SECTION 4: WORK ==================== -->
	<!-- Full-screen project showcase with navigation -->
	<section id="work" class="snap-section bg-[#0d0d08] overflow-hidden">
		<div class="h-full grid lg:grid-cols-2">
			<!-- Left: Project image -->
			<div class="relative h-[40vh] lg:h-full overflow-hidden" style="aspect-ratio: 16/10;">
				{#key activeProject}
					<img
						src={currentProject.heroImage}
						alt={currentProject.title}
						width="1200"
						height="800"
						class="absolute inset-0 w-full h-full object-cover project-image-enter"
						loading="lazy"
						decoding="async"
					/>
				{/key}
				<div class="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0d0d08]"></div>
				<div class="absolute inset-0 bg-gradient-to-t from-[#0d0d08] via-transparent to-transparent lg:hidden"></div>

				<!-- Project counter -->
				<div class="absolute bottom-8 left-8 flex items-baseline gap-2">
					<span class="font-rival text-6xl font-bold text-white">{String(activeProject + 1).padStart(2, '0')}</span>
					<span class="font-rival-narrow text-lg text-white/30">/ {String(featuredProjects.length).padStart(2, '0')}</span>
				</div>
			</div>

			<!-- Right: Project details -->
			<div class="relative flex flex-col justify-center px-8 lg:px-16 py-12 lg:py-0">
				<!-- Section indicator -->
				<div class="absolute top-8 right-8 font-rival text-8xl font-bold text-white/5">03</div>

				{#key activeProject}
					<div class="project-content-enter">
						<!-- Category -->
						<div class="flex items-center gap-3 mb-6">
							<div class="w-8 h-px bg-[#e18718]"></div>
							<span class="font-rival-narrow text-[#e18718] text-sm tracking-widest uppercase">{currentProject.category}</span>
						</div>

						<!-- Title -->
						<h3 class="font-rival text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
							{currentProject.title}
						</h3>

						<!-- Subtitle -->
						{#if currentProject.subtitle}
							<p class="font-rival-body text-xl text-[#e18718] mb-6">{currentProject.subtitle}</p>
						{/if}

						<!-- Description -->
						<p class="font-rival-body text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
							{currentProject.description}
						</p>

						<!-- Tech stack -->
						<div class="flex flex-wrap gap-2 mb-8">
							{#each currentProject.technologies.slice(0, 5) as tech}
								<span class="px-3 py-1 bg-white/5 border border-white/10 text-xs font-rival-narrow text-white/70">{tech}</span>
							{/each}
						</div>

						<!-- CTAs -->
						<div class="flex items-center gap-6">
							{#if currentProject.demo}
								<a
									href={currentProject.demo}
									target="_blank"
									rel="noopener noreferrer"
									class="group flex items-center gap-2 px-6 py-3 bg-[#e18718] text-[#0a0a0a] font-rival font-bold text-sm hover:bg-white transition-colors"
								>
									View Live
									<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
									</svg>
								</a>
							{/if}
							{#if currentProject.repository}
								<a
									href={currentProject.repository}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 text-white/50 hover:text-white transition-colors font-rival text-sm"
								>
									<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
									</svg>
									Source
								</a>
							{/if}
						</div>
					</div>
				{/key}

				<!-- Project navigation -->
				<div class="absolute bottom-8 right-8 flex items-center gap-4">
					<button
						on:click={prevProject}
						class="w-12 h-12 flex items-center justify-center border border-white/20 text-white/50 hover:border-[#e18718] hover:text-[#e18718] transition-colors"
						aria-label="Previous project"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					<button
						on:click={nextProject}
						class="w-12 h-12 flex items-center justify-center border border-white/20 text-white/50 hover:border-[#e18718] hover:text-[#e18718] transition-colors"
						aria-label="Next project"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- ==================== SECTION 5: PHOTOGRAPHY ==================== -->
	<!-- I Also Create - Photo gallery with draggable carousel -->
	<section id="photography" class="snap-section bg-[#0a0a0a] overflow-hidden">
		<div class="h-full flex flex-col">
			<!-- Top: Cinematic hero image with overlay text -->
			<div class="relative h-[30vh] lg:h-[35vh] flex-shrink-0 overflow-hidden" style="aspect-ratio: 16/9;">
				<img
					src="{base}/images/gallery/portfolio-06.jpg"
					alt="Photography feature"
					width="1600"
					height="900"
					class="absolute inset-0 w-full h-full object-cover object-top scale-105"
					loading="lazy"
					decoding="async"
				/>
				<div class="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]"></div>
				<div class="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-transparent"></div>

				<!-- Content overlay -->
				<div class="absolute inset-0 flex items-center px-8 lg:px-16">
					<div>
						<!-- Section number -->
						<span class="font-rival text-7xl lg:text-8xl font-bold text-white/10 absolute top-4 left-8 lg:left-16">04</span>

						<div class="flex items-center gap-3 mb-4">
							<div class="w-10 h-px bg-[#e18718]"></div>
							<span class="font-rival-narrow text-[#e18718] text-sm tracking-[0.3em] uppercase">I Also Create</span>
						</div>

						<h2 class="font-rival text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
							Through the <span class="font-highest-praise text-[#e18718] text-5xl lg:text-6xl xl:text-7xl">Lens</span>
						</h2>

						<p class="font-rival-body text-lg text-white/60 max-w-xl">
							Action sports photography. The same precision I bring to systems architecture,
							applied to capturing decisive moments.
						</p>
					</div>
				</div>
			</div>

			<!-- Middle: Draggable photo carousel -->
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
									width="280"
									height="420"
									loading="lazy"
									decoding="async"
									draggable="false"
								/>
							</button>
						{/each}
					</div>
				</div>

				<!-- Scroll progress bar -->
				<div class="px-8 lg:px-16 mt-4">
					<div class="relative h-1 bg-white/10 overflow-hidden">
						<div
							class="absolute left-0 top-0 h-full bg-[#e18718] transition-transform duration-100"
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
							class="group flex items-center gap-2 font-rival text-sm text-white/60 hover:text-[#e18718] transition-colors"
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

	<!-- ==================== SECTION 6: CONTACT ==================== -->
	<!-- Bold contact section -->
	<section id="contact" class="snap-section bg-[#0a0a0a]">
		<div class="h-full flex items-center justify-center px-8">
			<div class="max-w-4xl text-center">
				<!-- Section number -->
				<div class="mb-6">
					<span class="font-rival text-8xl lg:text-9xl font-bold text-white/5">05</span>
				</div>

				<!-- Availability -->
				<div class="inline-flex items-center gap-3 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-8">
					<span class="relative flex h-3 w-3">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
					</span>
					<span class="font-rival-narrow text-sm text-green-400 tracking-wide">Available for new engagements</span>
				</div>

				<h2 class="font-rival text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6">
					Let's <span class="font-highest-praise text-[#e18718] text-6xl lg:text-7xl xl:text-8xl">build</span> something.
				</h2>

				<p class="font-rival-body text-xl text-white/50 mb-12 max-w-2xl mx-auto">
					Enterprise consulting. Strategic advisory. AI transformation.
				</p>

				<!-- Contact options -->
				<div class="flex flex-col sm:flex-row items-center justify-center gap-4">
					<a
						href="mailto:nino@ninochavez.co"
						class="group px-10 py-5 bg-[#e18718] text-[#0a0a0a] font-rival font-bold text-lg hover:bg-white transition-colors duration-300"
					>
						Get in Touch
					</a>
					<a
						href="https://www.linkedin.com/in/nino-chavez/"
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-3 px-10 py-5 border border-white/20 text-white font-rival font-bold text-lg hover:border-[#e18718] hover:text-[#e18718] transition-colors duration-300"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
						LinkedIn
					</a>
				</div>

				<!-- Location -->
				<div class="mt-16 flex items-center justify-center gap-8 text-white/30">
					<div class="flex items-center gap-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
						</svg>
						<span class="font-rival-narrow text-sm tracking-wide">Chicago, IL</span>
					</div>
					<div class="w-px h-4 bg-white/20"></div>
					<span class="font-rival-narrow text-sm tracking-wide">Global Remote</span>
				</div>

				<!-- Footer -->
				<div class="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8 text-white/20">
					<span class="font-rival-narrow text-xs tracking-widest">© 2025 Nino Chavez</span>
					<a href="/cv" class="font-rival-narrow text-xs tracking-widest hover:text-[#e18718] transition-colors">CV</a>
					<a href="https://blog.ninochavez.co" class="font-rival-narrow text-xs tracking-widest hover:text-[#e18718] transition-colors">Blog</a>
					<a href="https://photography.ninochavez.co" class="font-rival-narrow text-xs tracking-widest hover:text-[#e18718] transition-colors">Photography</a>
				</div>
			</div>
		</div>
	</section>

</main>

<!-- Photo Lightbox Modal -->
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
		<!-- Close button -->
		<button
			class="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors"
			on:click|stopPropagation={closePhotoLightbox}
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
				alt="Portfolio photo {currentPhotoIndex + 1}"
				class="max-h-[70vh] max-w-[85vw] object-contain"
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
		<div class="absolute top-6 left-6 font-rival-narrow text-white/50 text-sm tracking-widest">
			{String(currentPhotoIndex + 1).padStart(2, '0')} / {String(TOTAL_PHOTOS).padStart(2, '0')}
		</div>

		<!-- Thumbnail strip -->
		<div class="flex-shrink-0 px-4 pb-6" on:click|stopPropagation>
			<div class="flex justify-center gap-1 overflow-x-auto py-2 max-w-full">
				{#each Array(Math.min(TOTAL_PHOTOS, 20)) as _, i}
					{@const thumbIndex = Math.max(0, currentPhotoIndex - 10) + i}
					{#if thumbIndex < TOTAL_PHOTOS}
						<button
							class="flex-shrink-0 w-16 h-12 overflow-hidden transition-all duration-200
								{currentPhotoIndex === thumbIndex ? 'ring-2 ring-[#e18718] opacity-100' : 'opacity-40 hover:opacity-70'}"
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

		<!-- Keyboard hint -->
		<div class="absolute bottom-4 left-1/2 -translate-x-1/2 font-rival-narrow text-xs text-white/30 tracking-widest">
			← → to navigate • ESC to close
		</div>
	</div>
{/if}

<style>
	/* Fonts */
	.font-rival {
		font-family: "rival-sans", sans-serif;
	}
	.font-rival-body {
		font-family: "rival-sans", sans-serif;
	}
	.font-rival-narrow {
		font-family: "rival-sans-narrow", sans-serif;
	}
	.font-highest-praise {
		font-family: "highest-praise", cursive;
	}

	/* Full-screen scroll snap */
	.scroll-container {
		height: 100vh;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
		scroll-behavior: smooth;
	}

	.snap-section {
		height: 100vh;
		min-height: 100vh;
		scroll-snap-align: start;
		scroll-snap-stop: always;
		position: relative;
	}

	/* Entrance animations */
	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(30px);
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

	/* Project image transition */
	@keyframes project-image-enter {
		from {
			opacity: 0;
			transform: scale(1.1);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.project-image-enter {
		animation: project-image-enter 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Project content transition */
	@keyframes project-content-enter {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.project-content-enter {
		animation: project-content-enter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Capability detail panel transition */
	@keyframes capability-detail-enter {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.capability-detail-enter {
		animation: capability-detail-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Capability item stagger animation */
	@keyframes capability-item-enter {
		from {
			opacity: 0;
			transform: translateX(-10px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.capability-item {
		opacity: 0;
		animation: capability-item-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	/* Expertise card hover effect */
	.expertise-card {
		transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.expertise-card:hover {
		background: linear-gradient(135deg, rgba(225, 135, 24, 0.1) 0%, transparent 100%);
	}

	/* Photo gallery carousel */
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

	/* Larger gallery items on bigger screens - portrait ratio (2:3) */
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

	/* Mobile adjustments */
	@media (max-width: 1024px) {
		.snap-section {
			height: auto;
			min-height: 100vh;
		}

		.scroll-container {
			scroll-snap-type: none;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.scroll-container {
			scroll-behavior: auto;
		}

		.animate-slide-up,
		.project-image-enter,
		.project-content-enter,
		.capability-detail-enter,
		.capability-item {
			animation: none;
			opacity: 1;
			transform: none;
		}

		.photo-gallery-item,
		.photo-gallery-item img {
			transition: none;
			transform: none;
			opacity: 1;
		}
	}
</style>
