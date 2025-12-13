<script>
  // This layout overrides the parent /ai layout to provide a clean full-screen chat experience
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import '$lib/styles/ai-theme.css';

  let theme = 'dark';

  onMount(() => {
    // Check for stored theme preference, default to dark for chat
    const stored = localStorage.getItem('ai-theme');
    if (stored) {
      theme = stored;
    }
    document.documentElement.setAttribute('data-ai-theme', theme);
  });
</script>

<div class="ask-layout">
  <slot />
</div>

<style>
  .ask-layout {
    min-height: 100vh;
    background: var(--ai-bg-page, #0c0a09);
  }
</style>
