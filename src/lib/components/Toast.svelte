<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { cubicOut, backOut } from 'svelte/easing';
  import { toasts, type Toast } from '$lib/stores/toast';
  import { reducedMotion } from '$lib/stores/gameFlow';

  $: duration = $reducedMotion ? 0 : 300;

  const icons = {
    success: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    error: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`,
    warning: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    info: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
  };

  const styles = {
    success: 'bg-green-500/90 border-green-400/50 text-white',
    error: 'bg-red-500/90 border-red-400/50 text-white',
    warning: 'bg-amber-500/90 border-amber-400/50 text-white',
    info: 'bg-violet-500/90 border-violet-400/50 text-white',
  };

  function handleDismiss(id: string) {
    toasts.dismiss(id);
  }
</script>

<div
  class="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
  aria-live="polite"
  aria-label="Notifications"
>
  {#each $toasts as toast (toast.id)}
    <div
      class="pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-xl {styles[toast.type]}"
      role="alert"
      in:fly={{ x: 100, duration, easing: backOut }}
      out:fly={{ x: 100, duration: duration * 0.7, easing: cubicOut }}
      animate:flip={{ duration: duration * 0.5 }}
    >
      <span class="flex-shrink-0 mt-0.5">
        {@html icons[toast.type]}
      </span>
      <p class="flex-1 text-sm font-medium leading-relaxed">{toast.message}</p>
      <button
        type="button"
        class="flex-shrink-0 p-1 -mr-1 -mt-1 rounded-md opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
        on:click={() => handleDismiss(toast.id)}
        aria-label="Dismiss notification"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  {/each}
</div>

<style>
  /* Progress bar for auto-dismiss (optional enhancement) */
  .toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
    animation: toast-progress linear forwards;
  }

  @keyframes toast-progress {
    from { width: 100%; }
    to { width: 0%; }
  }
</style>
