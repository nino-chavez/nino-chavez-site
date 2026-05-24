<script>
	export let data;
</script>

<svelte:head>
	<title>{data.title} — Blueprint — ninochavez.co</title>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="page">
	<nav class="topnav">
		<a href="/blueprint">← Blueprint index</a>
		<span class="dot">·</span>
		<span class="slug-pill">{data.slug}<span class="ext">.{data.ext}</span></span>
	</nav>

	<article class="prose">
		{@html data.html}
	</article>

	<nav class="botnav">
		<a href="/blueprint">← Back to index</a>
	</nav>
</div>

<style>
	.page {
		max-width: 48rem;
		margin: 0 auto;
		padding: 2.5rem 1.5rem 6rem;
		font-family: 'Inter', system-ui, sans-serif;
		color: #e5e5ea;
	}

	.topnav,
	.botnav {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
	}

	.topnav {
		margin-bottom: 2.5rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.botnav {
		margin-top: 4rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
	}

	.topnav a,
	.botnav a {
		color: #a78bfa;
		text-decoration: none;
	}

	.topnav a:hover,
	.botnav a:hover {
		color: #c4b5fd;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.dot {
		color: #4a4a55;
	}

	.slug-pill {
		color: #a78bfa;
	}

	.ext {
		color: #7a7a85;
	}

	.prose {
		font-size: 1rem;
		line-height: 1.7;
		color: #d1d1d6;
	}

	.prose :global(h1) {
		font-size: clamp(2rem, 4vw, 2.75rem);
		font-weight: 600;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: #ffffff;
		margin: 0 0 1.25rem;
	}

	.prose :global(h2) {
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 1.25;
		letter-spacing: -0.015em;
		color: #ffffff;
		margin: 2.75rem 0 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid rgba(139, 92, 246, 0.25);
	}

	.prose :global(h3) {
		font-size: 1.15rem;
		font-weight: 600;
		color: #f0f0f5;
		margin: 2rem 0 0.75rem;
	}

	.prose :global(h4) {
		font-size: 1rem;
		font-weight: 600;
		color: #f0f0f5;
		margin: 1.5rem 0 0.5rem;
	}

	.prose :global(p) {
		margin: 0 0 1.25rem;
	}

	.prose :global(strong) {
		color: #ffffff;
		font-weight: 600;
	}

	.prose :global(em) {
		color: #c4b5fd;
		font-style: italic;
	}

	.prose :global(a) {
		color: #a78bfa;
		text-decoration: underline;
		text-underline-offset: 3px;
		text-decoration-color: rgba(139, 92, 246, 0.5);
		word-break: break-word;
	}

	.prose :global(a:hover) {
		color: #c4b5fd;
		text-decoration-color: #c4b5fd;
	}

	.prose :global(ul),
	.prose :global(ol) {
		margin: 0 0 1.25rem;
		padding-left: 1.5rem;
	}

	.prose :global(li) {
		margin-bottom: 0.5rem;
	}

	.prose :global(li > ul),
	.prose :global(li > ol) {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.prose :global(blockquote) {
		margin: 1.5rem 0;
		padding-left: 1rem;
		border-left: 2px solid #8b5cf6;
		color: #a8a8b2;
		font-style: italic;
	}

	.prose :global(blockquote p:last-child) {
		margin-bottom: 0;
	}

	.prose :global(code) {
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.875em;
		background: rgba(139, 92, 246, 0.1);
		color: #c4b5fd;
		padding: 0.125rem 0.375rem;
		border-radius: 0;
		border: 1px solid rgba(139, 92, 246, 0.2);
	}

	.prose :global(pre) {
		margin: 1.5rem 0;
		padding: 1rem 1.25rem;
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-left: 2px solid #8b5cf6;
		overflow-x: auto;
		font-size: 0.875rem;
		line-height: 1.6;
	}

	.prose :global(pre code) {
		background: transparent;
		border: none;
		padding: 0;
		color: #d1d1d6;
		font-size: inherit;
	}

	.prose :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.5rem 0;
		font-size: 0.9rem;
	}

	.prose :global(th),
	.prose :global(td) {
		text-align: left;
		padding: 0.625rem 0.75rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
		vertical-align: top;
	}

	.prose :global(th) {
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #8b5cf6;
		font-weight: 500;
		border-bottom-color: rgba(139, 92, 246, 0.3);
	}

	.prose :global(hr) {
		border: none;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		margin: 2.5rem 0;
	}

	.prose :global(img) {
		max-width: 100%;
		height: auto;
		display: block;
		margin: 1.5rem auto;
	}
</style>
