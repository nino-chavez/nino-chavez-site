<script>
	import { page } from '$app/stores';

	const NAV = [
		{ href: '/work', label: 'work' },
		{ href: '/practice', label: 'practice' },
		{ href: '/writing', label: 'writing' },
		{ href: '/about', label: 'about' },
		{ href: '/contact', label: 'contact' }
	];

	$: pathname = $page.url.pathname;

	function isCurrent(href) {
		if (href === '/') return pathname === '/';
		return pathname === href || pathname.startsWith(href + '/');
	}
</script>

<header class="masthead">
	<a href="/" class="monogram" aria-label="Nino Chavez — home">
		<span>nc</span><span class="dot">.</span>
	</a>
	<nav class="topnav" aria-label="Primary">
		{#each NAV as item}
			<a
				href={item.href}
				aria-current={isCurrent(item.href) ? 'page' : undefined}
			>
				{item.label}
			</a>
		{/each}
	</nav>
	<p class="caption">context engineer · chicago</p>
</header>

<style>
	.masthead {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto;
		column-gap: var(--space-8);
		row-gap: var(--space-1);
		align-items: center;
		padding-bottom: var(--space-6);
		border-bottom: 1px solid var(--border-subtle);
		margin-bottom: var(--space-12);
	}

	.monogram {
		grid-column: 1;
		grid-row: 1 / span 2;
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 600;
		letter-spacing: var(--tracking-tight);
		color: var(--text-primary);
		text-decoration: none;
		line-height: 1;
		display: inline-flex;
		align-items: baseline;
	}

	.monogram .dot {
		color: var(--color-brand-violet);
	}

	.topnav {
		grid-column: 2;
		grid-row: 1;
		display: flex;
		gap: var(--space-6);
		justify-content: flex-end;
		flex-wrap: wrap;
		font-family: var(--font-mono);
		font-size: var(--type-sm);
	}

	.topnav a {
		color: var(--text-muted);
		text-decoration: none;
		transition: color var(--dur-base) var(--ease-out);
	}

	.topnav a:hover,
	.topnav a[aria-current='page'] {
		color: var(--text-link-hover);
	}

	.caption {
		grid-column: 1 / -1;
		grid-row: 2;
		margin: var(--space-2) 0 0;
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		color: var(--text-faint);
		letter-spacing: var(--tracking-wide);
	}
</style>
