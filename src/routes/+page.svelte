<svelte:head>
	<title>Nino Chavez — Context engineer</title>
	<meta
		name="description"
		content="Context engineer. I instrument the systems that build the systems. I build the harnesses that make personal software possible."
	/>
</svelte:head>

<main id="main" class="container">
	<section class="hero">
		<p class="kicker">ninochavez.co · v3</p>
		<h1>
			Context engineer. I <em>instrument</em> the systems that build the systems.
		</h1>
		<p class="lede">
			I build the harnesses that make personal software possible — and the threshold between
			buying and building moves up the stack every quarter.
		</p>
		<p class="meta">
			<span class="pill">Phase 2 — rebuild in progress</span>
		</p>
	</section>
</main>

<style>
	.hero {
		padding-block: var(--space-32) var(--space-16);
		max-width: var(--container-prose);
	}

	.kicker {
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		margin-bottom: var(--space-6);
	}

	h1 {
		font-size: var(--type-6xl);
		line-height: var(--leading-tight);
		margin-bottom: var(--space-8);
	}

	.lede {
		font-size: var(--type-xl);
		color: var(--text-secondary);
		line-height: var(--leading-relaxed);
		margin-bottom: var(--space-8);
	}

	.meta {
		display: flex;
		gap: var(--space-2);
		flex-wrap: wrap;
	}

	.pill {
		display: inline-flex;
		padding: var(--space-2) var(--space-3);
		border: var(--border-1) solid var(--border-strong);
		font-family: var(--font-mono);
		font-size: var(--type-xs);
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--text-muted);
		border-radius: var(--radius-pill);
	}
</style>
