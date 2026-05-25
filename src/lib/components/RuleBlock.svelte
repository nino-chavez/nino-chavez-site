<script>
	/**
	 * RuleBlock — operating-rule quote with "Why" inset.
	 *
	 * Per blueprint/content/practice.md Composition 3 — 4 rules from
	 * ~/.claude/CLAUDE.md quoted verbatim. Mono pill heading + body block
	 * + "Why" inset with left-border violet rule.
	 *
	 * @param {string} title - rule name (e.g. "Canonical-pattern-first for infrastructure")
	 * @param {number|string} [number] - rule number for the pill (e.g. "1", "2")
	 */
	let { title, number = '' } = $props();
</script>

<section class="rule-block">
	<header class="rule-head">
		{#if number}<span class="rule-number">Rule {number}</span>{/if}
		<h3 class="rule-title">{title}</h3>
	</header>
	<blockquote class="rule-body">
		<slot />
	</blockquote>
	{#if $$slots.why}
		<aside class="rule-why">
			<span class="why-label">Why:</span>
			<slot name="why" />
		</aside>
	{/if}
</section>

<style>
	.rule-block {
		padding: var(--space-6) 0;
		border-top: var(--border-1) solid var(--border-subtle);
	}

	.rule-block:first-child {
		border-top: none;
	}

	.rule-head {
		display: flex;
		align-items: baseline;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
		flex-wrap: wrap;
	}

	.rule-number {
		display: inline-block;
		padding: 2px 8px;
		border: var(--border-1) solid var(--brand-700);
		background: hsl(270 80% 20% / 0.3);
		font-family: var(--font-mono);
		font-size: 10px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		border-radius: var(--radius-pill);
		flex-shrink: 0;
	}

	.rule-title {
		font-family: var(--font-display);
		font-size: var(--type-lg);
		font-weight: var(--weight-semibold);
		color: var(--text-primary);
		margin: 0;
	}

	.rule-body {
		margin: 0 0 var(--space-3) 0;
		padding-left: var(--space-4);
		border-left: var(--border-2) solid var(--border-strong);
		font-size: var(--type-base);
		line-height: var(--leading-relaxed);
		color: var(--text-secondary);
	}

	.rule-why {
		padding-left: var(--space-4);
		border-left: var(--border-2) solid var(--brand-500);
		font-size: var(--type-sm);
		line-height: var(--leading-relaxed);
		color: var(--text-muted);
		font-style: italic;
	}

	.why-label {
		font-family: var(--font-mono);
		font-style: normal;
		font-size: 11px;
		text-transform: uppercase;
		letter-spacing: var(--tracking-mono);
		color: var(--brand-400);
		font-weight: var(--weight-semibold);
		margin-right: var(--space-2);
	}
</style>
