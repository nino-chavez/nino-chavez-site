<script>
  import Chat from '$lib/components/askdad/Chat.svelte';
</script>

<svelte:head>
  <title>Ask — Nino Chavez</title>
  <meta name="description" content="A RAG-grounded interface to the practice — ask questions and get answers anchored in Nino's published writing and case studies. Supplementary entry point; the toolchain on /practice remains the primary credibility play." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<!-- Back link overlay -->
<a href="/ai" class="back-link">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
  Back to /ai
</a>

<Chat />

<style>
  .back-link {
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(10, 10, 15, 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid var(--border-base);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: var(--type-xs);
    text-decoration: none;
    transition:
      color var(--dur-base) var(--ease-out),
      border-color var(--dur-base) var(--ease-out);
  }

  .back-link:hover {
    color: var(--text-link-hover);
    border-color: var(--border-violet-strong);
  }

  .back-link svg {
    width: 1rem;
    height: 1rem;
  }

  :global(body) {
    margin: 0;
    background: var(--surface-background);
  }
</style>
