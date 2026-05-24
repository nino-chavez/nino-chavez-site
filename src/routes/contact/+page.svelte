<script>
	import Hero from '$lib/components/compositions/Hero.svelte';
	import ChannelRow from '$lib/components/compositions/ChannelRow.svelte';
</script>

<svelte:head>
	<title>Contact — Nino Chavez</title>
	<meta name="description" content="I'm not selling services. I respond to interesting work." />
</svelte:head>

<Hero size="compact">
	<p slot="kicker">/contact</p>
	<svelte:fragment slot="claim">
		I'm <em>not</em> selling services. I respond to interesting work.
	</svelte:fragment>
	<svelte:fragment slot="subhead">
		Email is the primary channel. GitHub for repo conversations. LinkedIn for everything else.
	</svelte:fragment>
</Hero>

<section class="channels">
	<ChannelRow label="email" value="nino@ninochavez.co" href="mailto:nino@ninochavez.co" />
	<ChannelRow
		label="github"
		value="github.com/nino-chavez"
		href="https://github.com/nino-chavez"
		external
	/>
	<ChannelRow
		label="linkedin"
		value="linkedin.com/in/nino-chavez"
		href="https://www.linkedin.com/in/nino-chavez/"
		external
	/>
</section>

<style>
	.channels {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		max-width: var(--content-max);
		margin: var(--space-8) 0 var(--space-16);
	}
</style>
