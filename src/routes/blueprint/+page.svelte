<script>
	export let data;
</script>

<svelte:head>
	<title>Blueprint — ninochavez.co v3</title>
	<meta
		name="description"
		content="Decision log, design principles, and ADRs for the v3 redesign of ninochavez.co."
	/>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<div class="page">
	<header class="hero">
		<p class="kicker">ninochavez.co · v3 redesign</p>
		<h1>Blueprint</h1>
		<p class="lede">
			Decision log for the v3 redesign. Read in order — <a href="/blueprint/HANDOFF">HANDOFF</a> first,
			then <a href="/blueprint/DESIGN-PRINCIPLES">DESIGN-PRINCIPLES</a>, then the ADRs.
		</p>
		<p class="meta">
			<span class="pill">branch: <code>redesign/v3-context-engineer</code></span>
			<span class="pill">pattern: <code>bc-subscriptions</code></span>
		</p>
	</header>

	<main>
		{#each data.groups as group}
			<section class="group">
				<h2>{group.name}</h2>
				<ul>
					{#each group.items as doc}
						<li>
							<a href="/blueprint/{doc.slug}">
								<span class="slug">{doc.slug}</span>
								<span class="title">{doc.title}</span>
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</main>

	<footer class="foot">
		<p>
			Source repo:
			<a
				href="https://github.com/nino-chavez/nino-chavez-site/tree/redesign/v3-context-engineer/blueprint"
				rel="noopener"
				>github.com/nino-chavez/nino-chavez-site<wbr />/tree/redesign/v3-context-engineer/blueprint</a
			>
		</p>
	</footer>
</div>

<style>
	.page {
		max-width: 64rem;
		margin: 0 auto;
		padding: 4rem 1.5rem 6rem;
		font-family: 'Inter', system-ui, sans-serif;
		color: #f0f0f5;
	}

	.hero {
		padding-bottom: 2.5rem;
		border-bottom: 1px solid rgba(139, 92, 246, 0.25);
		margin-bottom: 3rem;
	}

	.kicker {
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #8b5cf6;
		margin-bottom: 0.75rem;
	}

	h1 {
		font-size: clamp(2.5rem, 6vw, 4rem);
		line-height: 1.05;
		font-weight: 600;
		letter-spacing: -0.02em;
		margin: 0 0 1rem;
	}

	.lede {
		font-size: 1.125rem;
		line-height: 1.6;
		color: #d1d1d6;
		max-width: 42rem;
		margin: 0 0 1.5rem;
	}

	.lede a {
		color: #a78bfa;
		text-decoration: underline;
		text-underline-offset: 3px;
	}

	.lede a:hover {
		color: #c4b5fd;
	}

	.meta {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin: 0;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.75rem;
		border: 1px solid rgba(139, 92, 246, 0.35);
		border-radius: 0;
		font-size: 0.8125rem;
		color: #d1d1d6;
		font-family: 'Inter', system-ui, sans-serif;
	}

	.pill code {
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		color: #a78bfa;
		font-size: 0.8125rem;
	}

	.group {
		margin-bottom: 2.5rem;
	}

	.group h2 {
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: #8b5cf6;
		font-weight: 500;
		margin: 0 0 0.75rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.group ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.group li a {
		display: grid;
		grid-template-columns: minmax(8rem, 14rem) 1fr;
		gap: 1.5rem;
		align-items: baseline;
		padding: 0.625rem 0.5rem;
		text-decoration: none;
		color: inherit;
		transition: background-color 200ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.group li a:hover {
		background-color: rgba(139, 92, 246, 0.08);
	}

	.group li a:hover .title {
		color: #ffffff;
	}

	.slug {
		font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
		font-size: 0.8125rem;
		color: #a78bfa;
	}

	.title {
		color: #d1d1d6;
		font-size: 0.95rem;
		line-height: 1.4;
	}

	.foot {
		margin-top: 4rem;
		padding-top: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		font-size: 0.8125rem;
		color: #7a7a85;
	}

	.foot a {
		color: #a78bfa;
		text-decoration: none;
		word-break: break-all;
	}

	.foot a:hover {
		color: #c4b5fd;
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	@media (max-width: 640px) {
		.group li a {
			grid-template-columns: 1fr;
			gap: 0.125rem;
		}
	}
</style>
