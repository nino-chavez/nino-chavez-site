<script>
  import { onMount, onDestroy } from 'svelte';

  export let state = 'idle';
  export let size = 120;

  let canvas;
  let animationFrame;
  let startTime;

  // State-based configuration - warm amber, rose, teal palette
  const stateConfig = {
    idle: {
      color: { r: 245, g: 158, b: 11 },  // Amber
      pulseSpeed: 0.5,
      rotationSpeed: 0.3,
      glowIntensity: 0.4
    },
    thinking: {
      color: { r: 244, g: 63, b: 94 },   // Rose
      pulseSpeed: 2,
      rotationSpeed: 1.5,
      glowIntensity: 0.7
    },
    speaking: {
      color: { r: 20, g: 184, b: 166 },  // Teal
      pulseSpeed: 3,
      rotationSpeed: 0.5,
      glowIntensity: 0.6
    }
  };

  function draw(timestamp) {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000;

    const config = stateConfig[state];
    const centerX = size / 2;
    const centerY = size / 2;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Pulsing effect
    const pulse = Math.sin(elapsed * config.pulseSpeed * Math.PI) * 0.1 + 1;
    const rotation = elapsed * config.rotationSpeed;

    // Draw outer glow
    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, size * 0.45
    );
    gradient.addColorStop(0, `rgba(${config.color.r}, ${config.color.g}, ${config.color.b}, ${config.glowIntensity})`);
    gradient.addColorStop(1, `rgba(${config.color.r}, ${config.color.g}, ${config.color.b}, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Draw rotating rings
    ctx.save();
    ctx.translate(centerX, centerY);

    // Outer ring
    ctx.rotate(rotation);
    ctx.strokeStyle = `rgba(${config.color.r}, ${config.color.g}, ${config.color.b}, 0.3)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.4 * pulse, 0, Math.PI * 2);
    ctx.stroke();

    // Middle ring (opposite rotation)
    ctx.rotate(-rotation * 2);
    ctx.strokeStyle = `rgba(${config.color.r}, ${config.color.g}, ${config.color.b}, 0.5)`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.3 * pulse, 0, Math.PI * 2);
    ctx.stroke();

    // Inner ring with dashes
    ctx.rotate(rotation * 1.5);
    ctx.setLineDash([10, 5]);
    ctx.strokeStyle = `rgba(${config.color.r}, ${config.color.g}, ${config.color.b}, 0.6)`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.25 * pulse, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.restore();

    // Draw core orb
    const coreGradient = ctx.createRadialGradient(
      centerX - size * 0.05, centerY - size * 0.05, 0,
      centerX, centerY, size * 0.15
    );
    coreGradient.addColorStop(0, `rgba(${Math.min(255, config.color.r + 60)}, ${Math.min(255, config.color.g + 60)}, ${Math.min(255, config.color.b + 60)}, 1)`);
    coreGradient.addColorStop(1, `rgba(${config.color.r}, ${config.color.g}, ${config.color.b}, 1)`);

    ctx.fillStyle = coreGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, size * 0.15 * pulse, 0, Math.PI * 2);
    ctx.fill();

    // Speaking state: add sound wave effect
    if (state === 'speaking') {
      const waveCount = 3;
      for (let i = 0; i < waveCount; i++) {
        const waveProgress = ((elapsed * 2 + i * 0.3) % 1);
        const waveRadius = size * 0.15 + waveProgress * size * 0.3;
        const waveOpacity = (1 - waveProgress) * 0.5;

        ctx.strokeStyle = `rgba(${config.color.r}, ${config.color.g}, ${config.color.b}, ${waveOpacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, waveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Thinking state: add orbiting particles
    if (state === 'thinking') {
      const particleCount = 6;
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + elapsed * 2;
        const distance = size * 0.32;
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        ctx.fillStyle = `rgba(${config.color.r}, ${config.color.g}, ${config.color.b}, 0.8)`;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    animationFrame = requestAnimationFrame(draw);
  }

  onMount(() => {
    // Set canvas resolution for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    animationFrame = requestAnimationFrame(draw);
  });

  onDestroy(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });

  // Re-trigger animation loop when state changes (Svelte 4 reactive statement)
  $: if (state && canvas) {
    // State changed - animation will naturally pick up the new config
  }
</script>

<div class="avatar-container">
  <canvas bind:this={canvas} class="rive-canvas"></canvas>
  <div class="label">{state}</div>
</div>

<style>
  .avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .rive-canvas {
    border-radius: 50%;
  }

  .label {
    font-size: 0.75rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
</style>
