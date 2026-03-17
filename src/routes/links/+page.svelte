<script>
	const links = [
		{
			label: 'Photography',
			detail: 'Action sports & volleyball',
			href: 'https://photography.ninochavez.co',
			icon: 'camera',
			accent: 'lime'
		},
		{
			label: 'Signal Dispatch',
			detail: 'Essays on AI, systems & craft',
			href: 'https://blog.ninochavez.co',
			icon: 'pen',
			accent: 'lime'
		},
		{
			label: 'DJ Sets',
			detail: 'House, disco & whatever moves',
			href: 'https://soundcloud.com/ni-no-cha-vez',
			icon: 'music',
			accent: 'lime'
		},
		{
			label: 'Portfolio',
			detail: 'Full site & work history',
			href: 'https://ninochavez.co',
			icon: 'globe',
			accent: 'lime'
		},
		{
			label: 'Signal X Studio',
			detail: 'The holding company',
			href: 'https://signalx.studio',
			icon: 'zap',
			accent: 'blue'
		}
	];

	const socials = [
		{ label: 'Instagram', href: 'https://instagram.com/ninochavez', icon: 'instagram' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/nino-chavez/', icon: 'linkedin' },
		{ label: 'GitHub', href: 'https://github.com/nino-chavez', icon: 'github' },
		{ label: 'X', href: 'https://x.com/ninochavez', icon: 'x' },
	];

	const brands = [
		{ name: "Let's Pepper", href: 'https://letspepper.com', color: '#f97316' },
		{ name: 'Rally HQ', href: 'https://rallyhq.app', color: '#6366f1' },
		{ name: 'Flickday Media', href: 'https://flickdaymedia.com', color: '#facc15' },
		{ name: 'VolleyRX', href: 'https://volleyrx.com', color: '#22c55e' },
		{ name: 'QuantifAI', href: 'https://quantifai.app', color: '#a78bfa' },
		{ name: 'Zero Specs', href: 'https://zerospecs.app', color: '#00e0d6' },
	];
</script>

<svelte:head>
	<title>Nino Chavez — Links</title>
	<meta name="description" content="Photographer. DJ. Writer. Builder. All the links in one place." />
	<meta property="og:title" content="Nino Chavez — Links" />
	<meta property="og:description" content="Photographer. DJ. Writer. Builder. All the links in one place." />
	<meta property="og:type" content="profile" />
	<meta property="og:url" content="https://ninochavez.co/links" />
</svelte:head>

<main class="bg-black text-white min-h-dvh flex flex-col items-center justify-start px-5 py-12 relative overflow-hidden">

	<!-- Grid lines overlay -->
	<div class="grid-lines"></div>

	<div class="w-full max-w-[420px] relative z-10 flex flex-col gap-0">

		<!-- Header -->
		<header class="text-center mb-8">
			<img src="/images/nino-badge.png" alt="Nino Chavez" class="w-24 h-24 mx-auto mb-4 rounded-full" />
			<p class="font-display text-lg tracking-[0.2em] text-lime-400 uppercase mb-4">
				Cut the Noise / Follow the Signal
			</p>
			<p class="text-neutral-400 text-sm leading-relaxed">
				Photographer. DJ. Writer. Builder.<br />Chicago.
			</p>
		</header>

		<!-- Social icons row -->
		<div class="flex justify-center gap-3 mb-8">
			{#each socials as social}
				<a
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					class="social-icon"
					aria-label={social.label}
				>
					{#if social.icon === 'instagram'}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
					{:else if social.icon === 'linkedin'}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
					{:else if social.icon === 'github'}
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
					{:else if social.icon === 'x'}
						<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
					{/if}
				</a>
			{/each}
		</div>

		<!-- Main links -->
		<div class="flex flex-col gap-2 mb-8">
			{#each links as link}
				<a
					href={link.href}
					target="_blank"
					rel="noopener noreferrer"
					class="link-card group"
				>
					<div class="link-icon">
						{#if link.icon === 'camera'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
						{:else if link.icon === 'pen'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
						{:else if link.icon === 'music'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
						{:else if link.icon === 'globe'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
						{:else if link.icon === 'zap'}
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
						{/if}
					</div>
					<div class="flex-1 min-w-0">
						<div class="link-label">{link.label}</div>
						<div class="link-detail">{link.detail}</div>
					</div>
					<svg class="link-arrow" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9L9 3M9 3H4.5M9 3v4.5"/></svg>
				</a>
			{/each}
		</div>

		<!-- Divider -->
		<div class="h-px bg-neutral-800 mb-6"></div>

		<!-- Brands grid -->
		<div class="mb-8">
			<span class="block font-mono text-[10px] tracking-[0.08em] uppercase text-neutral-600 mb-3">Signal X Studio Brands</span>
			<div class="grid grid-cols-3 gap-1.5">
				{#each brands as brand}
					<a
						href={brand.href}
						target="_blank"
						rel="noopener noreferrer"
						class="brand-chip"
					>
						<span class="brand-dot" style="background:{brand.color}"></span>
						<span class="brand-label">{brand.name}</span>
					</a>
				{/each}
			</div>
		</div>

		<!-- Footer -->
		<footer class="text-center">
			<p class="font-mono text-[10px] text-neutral-700 tracking-wider">
				&copy; 2025 <a href="https://signalx.studio" class="underline underline-offset-2 hover:text-neutral-500 transition-colors">Signal X Studio, LLC</a>
			</p>
		</footer>
	</div>
</main>

<style>
	/* Grid overlay */
	.grid-lines {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(rgba(163,230,53,0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(163,230,53,0.03) 1px, transparent 1px);
		background-size: 60px 60px;
		pointer-events: none;
		z-index: 0;
	}

	/* Display font */
	.font-display {
		font-family: 'Bebas Neue', sans-serif;
	}

	/* Social icons */
	.social-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #6b7280;
		border: 1px solid #262626;
		transition: border-color 200ms, color 200ms;
	}

	.social-icon:hover {
		border-color: #a3e635;
		color: #a3e635;
	}

	.social-icon svg {
		width: 18px;
		height: 18px;
	}

	/* Link cards */
	.link-card {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 16px;
		background: #0a0a0a;
		border: 1px solid #1a1a1a;
		transition: border-color 200ms, background 200ms;
		cursor: pointer;
		text-decoration: none;
		color: inherit;
		position: relative;
		overflow: hidden;
	}

	.link-card::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: #a3e635;
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.link-card:hover {
		border-color: #2a2a2a;
		background: #0f0f0f;
	}

	.link-card:hover::after {
		transform: scaleX(1);
	}

	.link-icon {
		width: 20px;
		height: 20px;
		color: #a3e635;
		flex-shrink: 0;
	}

	.link-icon svg {
		width: 100%;
		height: 100%;
	}

	.link-label {
		font-weight: 500;
		font-size: 14px;
		color: #e5e5e5;
	}

	.link-detail {
		font-family: 'JetBrains Mono', 'SF Mono', monospace;
		font-size: 11px;
		color: #525252;
		letter-spacing: 0.02em;
		margin-top: 1px;
	}

	.link-arrow {
		width: 14px;
		height: 14px;
		color: #404040;
		flex-shrink: 0;
		transition: color 200ms;
	}

	.link-card:hover .link-arrow {
		color: #a3e635;
	}

	/* Brand chips */
	.brand-chip {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 10px;
		text-decoration: none;
		border: 1px solid transparent;
		transition: border-color 200ms;
	}

	.brand-chip:hover {
		border-color: #262626;
	}

	.brand-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.brand-label {
		font-size: 11px;
		font-weight: 500;
		color: #737373;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		transition: color 200ms;
	}

	.brand-chip:hover .brand-label {
		color: #d4d4d4;
	}
</style>
