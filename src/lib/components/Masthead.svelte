<script>
	/**
	 * Masthead — stamped-monogram brand + mono nav row.
	 *
	 * Per blueprint/03-design-brief.md §"Composition slot 0 (above hero)":
	 *   stamped-monogram `nc.` upper-left + mono nav row upper-right
	 *   (work · practice · writing · about · contact). No "Now Booking"
	 *   indicator (Cal.com cut per Diagnose). Mono caption under monogram:
	 *   "context engineer · chicago".
	 *
	 * @param {string} [currentPath] - active nav path, for aria-current
	 */
	let { currentPath = '' } = $props();

	const navItems = [
		{ label: 'work', href: '/work' },
		{ label: 'practice', href: '/practice' },
		{ label: 'writing', href: '/writing' },
		{ label: 'about', href: '/about' },
		{ label: 'contact', href: '/contact' }
	];

	function isActive(href) {
		if (href === '/' && currentPath === '/') return true;
		if (href !== '/' && currentPath.startsWith(href)) return true;
		return false;
	}
</script>

<header class="masthead">
	<div class="masthead-inner container">
		<a href="/" class="brand" aria-label="ninochavez.co home">
			<span class="brand-monogram">nc<span class="brand-dot">.</span></span>
			<span class="brand-caption">context engineer · chicago</span>
		</a>
		<nav class="masthead-nav" aria-label="Primary">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class:active={isActive(item.href)}
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>
</header>

<style>
	.masthead {
		position: sticky;
		top: 0;
		z-index: var(--z-masthead);
		background: hsl(220 25% 4% / 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: var(--border-1) solid var(--border-subtle);
	}

	.masthead-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-block: var(--space-4);
		gap: var(--space-6);
	}

	.brand {
		display: inline-flex;
		flex-direction: column;
		text-decoration: none;
		color: var(--text-primary);
		gap: 2px;
		line-height: 1;
	}

	.brand-monogram {
		font-family: var(--font-display);
		font-size: var(--type-lg);
		font-weight: var(--weight-semibold);
		letter-spacing: var(--tracking-tight);
		color: var(--text-primary);
	}

	.brand-dot {
		color: var(--brand-500);
	}

	.brand-caption {
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
	}

	.masthead-nav {
		display: flex;
		gap: var(--space-5);
		align-items: center;
	}

	.masthead-nav a {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-muted);
		text-decoration: none;
		padding: var(--space-1) 0;
		transition: color var(--duration-fast) var(--ease-out);
	}

	.masthead-nav a:hover,
	.masthead-nav a.active {
		color: var(--text-primary);
	}

	.masthead-nav a.active {
		text-decoration: underline;
		text-decoration-color: var(--brand-500);
		text-underline-offset: 6px;
		text-decoration-thickness: 1.5px;
	}

	@media (max-width: 640px) {
		.masthead-inner {
			padding-block: var(--space-3);
		}

		.brand-caption {
			display: none;
		}

		.masthead-nav {
			gap: var(--space-4);
		}
	}
</style>
