<script lang="ts">
  import { inView } from '$lib/actions/inView';
  import { reducedMotion } from '$lib/stores/gameFlow';

  export let variant: 'gradient' | 'dots' | 'line' | 'wave' | 'fade' = 'gradient';
  export let className: string = '';

  let visible = false;

  function handleEnter() {
    visible = true;
  }
</script>

<div
  class="section-divider relative overflow-hidden {variant} {className}"
  class:visible
  class:reduced-motion={$reducedMotion}
  use:inView={{ threshold: 0.5 }}
  on:enter={handleEnter}
  aria-hidden="true"
>
  {#if variant === 'gradient'}
    <div class="h-24 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="gradient-orb w-32 h-1 rounded-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
    </div>
  {:else if variant === 'dots'}
    <div class="h-16 flex items-center justify-center gap-3">
      {#each [0, 1, 2] as i}
        <div
          class="dot w-1.5 h-1.5 rounded-full bg-violet-500/40"
          style="animation-delay: {i * 150}ms"
        />
      {/each}
    </div>
  {:else if variant === 'line'}
    <div class="h-16 flex items-center justify-center">
      <div class="line-reveal w-24 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  {:else if variant === 'wave'}
    <div class="h-20 relative">
      <svg class="absolute inset-0 w-full h-full" viewBox="0 0 1200 80" preserveAspectRatio="none">
        <path
          class="wave-path"
          d="M0,40 C200,60 400,20 600,40 C800,60 1000,20 1200,40 L1200,80 L0,80 Z"
          fill="url(#waveGradient)"
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(139,92,246);stop-opacity:0" />
            <stop offset="50%" style="stop-color:rgb(139,92,246);stop-opacity:0.1" />
            <stop offset="100%" style="stop-color:rgb(139,92,246);stop-opacity:0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  {:else if variant === 'fade'}
    <div class="h-32 bg-gradient-to-b from-neutral-900 via-neutral-900/50 to-neutral-900" />
  {/if}
</div>

<style>
  .section-divider {
    opacity: 0;
    transform: scaleX(0.8);
    transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .section-divider.visible {
    opacity: 1;
    transform: scaleX(1);
  }

  .section-divider.reduced-motion {
    opacity: 1;
    transform: none;
    transition: none;
  }

  /* Gradient orb pulse */
  .gradient-orb {
    animation: pulse-glow 3s ease-in-out infinite;
  }

  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.3;
      transform: scaleX(1);
    }
    50% {
      opacity: 0.6;
      transform: scaleX(1.2);
    }
  }

  /* Dots stagger animation */
  .dot {
    animation: dot-bounce 1.5s ease-in-out infinite;
  }

  @keyframes dot-bounce {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.8;
      transform: scale(1.3);
    }
  }

  /* Line reveal */
  .line-reveal {
    transform-origin: center;
    animation: line-grow 2s ease-out forwards;
  }

  .section-divider.visible .line-reveal {
    animation: line-grow 1s ease-out forwards;
  }

  @keyframes line-grow {
    from {
      transform: scaleX(0);
      opacity: 0;
    }
    to {
      transform: scaleX(1);
      opacity: 1;
    }
  }

  /* Wave animation */
  .wave-path {
    animation: wave-flow 4s ease-in-out infinite;
  }

  @keyframes wave-flow {
    0%, 100% {
      d: path("M0,40 C200,60 400,20 600,40 C800,60 1000,20 1200,40 L1200,80 L0,80 Z");
    }
    50% {
      d: path("M0,40 C200,20 400,60 600,40 C800,20 1000,60 1200,40 L1200,80 L0,80 Z");
    }
  }

  /* Reduced motion */
  .section-divider.reduced-motion .gradient-orb,
  .section-divider.reduced-motion .dot,
  .section-divider.reduced-motion .wave-path {
    animation: none;
  }

  .section-divider.reduced-motion .line-reveal {
    transform: scaleX(1);
    opacity: 1;
    animation: none;
  }
</style>
