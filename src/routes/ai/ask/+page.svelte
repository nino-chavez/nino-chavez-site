<script>
  import Chat from '$lib/components/askdad/Chat.svelte';
</script>

<svelte:head>
  <title>Ask Dad - Virtual Nino | Nino Chavez</title>
  <meta name="description" content="Get feedback and guidance from Virtual Nino - a RAG-powered chatbot grounded in Nino's actual writing and perspectives." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<!-- Back link overlay -->
<a href="/ai" class="back-link">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
  Back to AI Hub
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
    background: var(--ai-bg-card, rgba(28, 25, 23, 0.8));
    backdrop-filter: blur(8px);
    border: 1px solid var(--ai-border-color, rgba(245, 158, 11, 0.1));
    border-radius: 8px;
    color: var(--ai-text-muted, #a8a29e);
    font-size: 0.875rem;
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .back-link:hover {
    color: var(--ai-text-primary, #fafaf9);
    border-color: var(--ai-accent-purple, rgba(245, 158, 11, 0.3));
    background: var(--ai-bg-card-alt, rgba(28, 25, 23, 0.95));
  }

  .back-link svg {
    width: 1rem;
    height: 1rem;
  }

  :global(body) {
    margin: 0;
    background: var(--ai-bg-page, #0c0a09);
  }
</style>
