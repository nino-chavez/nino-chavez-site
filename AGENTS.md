# Nino Chavez Website
> Personal portfolio and landing page

## Docs Index

### Framework
- [SvelteKit](https://svelte.dev/docs/kit): Routing, SSG
- [Svelte 4](https://svelte.dev/docs): Reactive stores ($:), components

### AI
- [Anthropic SDK](https://docs.anthropic.com/en/api): Claude API integration

### Styling
- [Tailwind CSS](https://tailwindcss.com/docs): Utility classes
- Custom CSS with design tokens

## Project Index

### Entry Points
- `src/routes/+layout.svelte`: App shell
- `src/routes/+page.svelte`: Landing page
- `src/lib/components/`: UI components organized by domain

### Key Directories
- `src/lib/components/layout/`: Header, Sidebar
- `src/lib/components/util/`: Lazy loading, IntersectionObserver
- `src/lib/actions/`: Custom Svelte actions (inView)
- `src/lib/stores/`: Reactive state management

## Quick Commands
```bash
npm run check && npm run build   # Verify before commit
npm run dev                      # Development server
```

## Boundaries
- `.env*` - Environment configuration (never commit)

## Stack Notes
- Svelte 4 conventions (not Svelte 5 runes)
- Uses `$:` for reactive declarations
- Uses `export let` for component props
- Lazy-load below-fold components for performance
- Mouse-tracking spotlight effect on hero section
- Hardware-accelerated transforms for animations
