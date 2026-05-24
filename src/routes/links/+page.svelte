<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import SectionHead from '$lib/components/compositions/SectionHead.svelte';
	import ChannelRow from '$lib/components/compositions/ChannelRow.svelte';

	// Bio-link landing — preserved per direction 2026-05-25 (DESIGN-PRINCIPLES.md
	// originally proposed consolidating into /contact). Refactored to consume
	// the v3 design system. Single-purpose: visitor lands here from a social
	// bio, sees the inventory, picks the right surface.

	const surfaces = [
		{ label: 'Portfolio', value: 'ninochavez.co', href: 'https://ninochavez.co' },
		{ label: 'Writing', value: 'blog.ninochavez.co', href: 'https://blog.ninochavez.co' },
		{
			label: 'Photography',
			value: 'ninochavez.co/photography',
			href: 'https://ninochavez.co/photography'
		},
		{ label: 'Practice', value: 'ninochavez.co/practice', href: '/practice' },
		{ label: 'Work', value: 'ninochavez.co/work', href: '/work' }
	];

	const brands = [
		{ name: 'signalx.studio', detail: 'holding company', href: 'https://signalx.studio' },
		{
			name: 'letspepper.com',
			detail: 'tournament-series brand',
			href: 'https://letspepper.com'
		},
		{
			name: 'flickdaymedia.com',
			detail: 'sports media brand',
			href: 'https://flickdaymedia.com'
		},
		{ name: 'rallyhq.app', detail: 'tournament management product', href: 'https://rallyhq.app' },
		{ name: 'atelier.ninochavez.co', detail: 'OSS coordination spine', href: 'https://atelier.ninochavez.co' },
		{ name: 'askbc.ninochavez.co', detail: 'commerce platform agent', href: 'https://askbc.ninochavez.co' }
	];

	const social = [
		{
			label: 'github',
			value: 'github.com/nino-chavez',
			href: 'https://github.com/nino-chavez'
		},
		{
			label: 'linkedin',
			value: 'linkedin.com/in/nino-chavez',
			href: 'https://www.linkedin.com/in/nino-chavez/'
		},
		{ label: 'email', value: 'nino@ninochavez.co', href: 'mailto:nino@ninochavez.co' }
	];
</script>

<svelte:head>
	<title>Links — Nino Chavez</title>
	<meta
		name="description"
		content="Every surface in one place. Portfolio, writing, photography, practice, work, and the brands."
	/>
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/links</p>
	<svelte:fragment slot="claim">
		Every <em>surface</em> in one place.
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		Landing here from a bio? Pick the right surface and go. Each link goes to its own self-contained
		artifact — the portfolio, the writing, the photography, the practice, the work, and the brands.
	</svelte:fragment>
</Hero>

<section class="block">
	<SectionHead kicker="01 — Surfaces">The home surfaces.</SectionHead>
	<div class="channels">
		{#each surfaces as s}
			<ChannelRow
				label={s.label}
				value={s.value}
				href={s.href}
				external={s.href.startsWith('http')}
			/>
		{/each}
	</div>
</section>

<section class="block">
	<SectionHead kicker="02 — Brands">Companies, brands, and products.</SectionHead>
	<ul class="brand-list">
		{#each brands as b}
			<li>
				<a href={b.href} rel="noopener" target="_blank">
					<span class="brand-name">{b.name}</span>
					<span class="brand-detail">{b.detail}</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<section class="block">
	<SectionHead kicker="03 — Direct">Inbox + profiles.</SectionHead>
	<div class="channels">
		{#each social as s}
			<ChannelRow
				label={s.label}
				value={s.value}
				href={s.href}
				external={s.href.startsWith('http')}
			/>
		{/each}
	</div>
</section>

<style>
	.block {
		margin: var(--space-12) 0;
	}

	.channels {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		max-width: var(--content-max);
	}

	.brand-list {
		list-style: none;
		padding: 0;
		margin: 0;
		border-top: 1px solid var(--border-subtle);
		max-width: var(--content-max);
	}

	.brand-list li {
		border-bottom: 1px solid var(--border-subtle);
	}

	.brand-list a {
		display: grid;
		grid-template-columns: 14rem 1fr;
		gap: var(--space-6);
		padding: var(--space-4) var(--space-1);
		text-decoration: none;
		color: inherit;
		align-items: baseline;
		transition: background-color var(--dur-base) var(--ease-out);
	}

	.brand-list a:hover {
		background: var(--surface-card-hover);
	}

	.brand-list a:hover .brand-name {
		color: var(--text-link-hover);
	}

	.brand-name {
		font-family: var(--font-mono);
		font-size: var(--type-sm);
		color: var(--text-primary);
		transition: color var(--dur-base) var(--ease-out);
	}

	.brand-detail {
		font-size: var(--type-sm);
		color: var(--text-muted);
		line-height: 1.5;
	}

	@media (max-width: 640px) {
		.brand-list a {
			grid-template-columns: 1fr;
			gap: var(--space-1);
		}
	}
</style>
