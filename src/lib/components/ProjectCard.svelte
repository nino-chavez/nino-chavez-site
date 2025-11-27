<script>
	import { reducedMotion } from '$lib/stores/gameFlow';

	export let title = '';
	export let description = '';
	export let technologies = [];
	export let className = '';
	export let href = '';
</script>

<svelte:element
	this={href ? 'a' : 'div'}
	href={href || undefined}
	target={href ? '_blank' : undefined}
	rel={href ? 'noopener noreferrer' : undefined}
	class="project-card block bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 {className}"
	class:cursor-pointer={href}
	class:hover-enabled={!$reducedMotion}
>
	<h3 class="text-xl font-bold text-white mb-3 transition-colors duration-200 group-hover:text-violet-300">{title}</h3>
	<p class="text-white/70 mb-4 leading-relaxed">{description}</p>
	{#if technologies.length > 0}
		<div class="flex flex-wrap gap-2">
			{#each technologies as tech}
				<span class="px-3 py-1.5 bg-athletic-brand-violet/10 text-athletic-brand-violet border border-athletic-brand-violet/20 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-athletic-brand-violet/20 hover:border-athletic-brand-violet/40">
					{tech}
				</span>
			{/each}
		</div>
	{/if}
</svelte:element>

<style>
	.project-card.hover-enabled:hover {
		transform: translateY(-4px);
		border-color: rgba(139, 92, 246, 0.4);
		background: rgba(255, 255, 255, 0.08);
		box-shadow:
			0 12px 40px rgba(139, 92, 246, 0.15),
			0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.project-card.hover-enabled:active {
		transform: translateY(-2px);
	}

	/* Subtle glow on hover */
	.project-card.hover-enabled::before {
		content: '';
		position: absolute;
		inset: -1px;
		border-radius: 0.75rem;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent 50%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	.project-card.hover-enabled:hover::before {
		opacity: 1;
	}

	.project-card {
		position: relative;
	}
</style>
