<script lang="ts">
  import { reducedMotion } from '$lib/stores/gameFlow';

  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let message: string = '';
  export let variant: 'spinner' | 'dots' | 'pulse' = 'spinner';

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
</script>

<div class="flex flex-col items-center justify-center gap-3" role="status" aria-live="polite">
  {#if variant === 'spinner'}
    <div class="relative {sizeClasses[size]}">
      {#if $reducedMotion}
        <!-- Static indicator for reduced motion -->
        <div class="absolute inset-0 rounded-full border-2 border-violet-500/30 border-t-violet-500" />
      {:else}
        <!-- Animated spinner -->
        <div class="absolute inset-0 rounded-full border-2 border-violet-500/20" />
        <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
      {/if}
    </div>
  {:else if variant === 'dots'}
    <div class="flex items-center gap-1.5">
      {#each [0, 1, 2] as i}
        <div
          class="{dotSizeClasses[size]} rounded-full bg-violet-500"
          class:animate-bounce={!$reducedMotion}
          style={!$reducedMotion ? `animation-delay: ${i * 150}ms` : ''}
        />
      {/each}
    </div>
  {:else if variant === 'pulse'}
    <div class="relative {sizeClasses[size]}">
      <div
        class="absolute inset-0 rounded-full bg-violet-500/20"
        class:animate-ping={!$reducedMotion}
      />
      <div class="absolute inset-0 rounded-full bg-violet-500/60" />
    </div>
  {/if}

  {#if message}
    <p class="{textSizeClasses[size]} text-zinc-400 font-medium">{message}</p>
  {/if}
</div>

<style>
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-25%);
    }
  }

  .animate-bounce {
    animation: bounce 0.6s ease-in-out infinite;
  }
</style>
