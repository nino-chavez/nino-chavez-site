<script>
	import { page } from '$app/stores';

	/** /ai section header — integrates with the main site (P1); replaces the
	 *  old ai-theme purple gradient header. */
	const items = [
		{ href: '/ai', label: 'AI', exact: true },
		{ href: '/ai/learn', label: 'Learn', exact: false },
		{ href: '/ai/work', label: 'Work', exact: true }
	];

	$: path = $page.url.pathname.replace(/\/$/, '') || '/';

	function isActive(item) {
		const p = path === '' ? '/' : path;
		return item.exact ? p === item.href : p === item.href || p.startsWith(item.href + '/');
	}
</script>

<nav
	aria-label="AI section"
	class="sticky top-0 z-40 flex items-center gap-6 px-6 lg:px-12 py-4 bg-black/90 backdrop-blur border-b border-neutral-800 text-sm"
>
	<a href="/" class="font-mono text-neutral-400 hover:text-white transition-colors">nino chavez</a>
	<span class="text-neutral-700" aria-hidden="true">/</span>
	{#each items as item}
		<a
			href={item.href}
			aria-current={isActive(item) ? 'page' : undefined}
			class="transition-colors {isActive(item)
				? 'text-lime-400 font-semibold'
				: 'text-neutral-400 hover:text-white'}">{item.label}</a
		>
	{/each}
	<a
		href="/blog"
		class="ml-auto text-neutral-400 hover:text-white transition-colors">Blog</a
	>
</nav>
