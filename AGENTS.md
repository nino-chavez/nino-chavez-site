# Nino Chavez Website
> Personal portfolio and landing page

## Stack

- Next-compatible React routes under `app/`, built through VineNext.
- Cloudflare Worker deployment through the repository's VineNext commands.
- Shared CSS and design tokens in `app/globals.css`.

## Project Index

### Entry Points
- `app/layout.tsx`: App shell
- `app/page.tsx`: Homepage
- `app/components/`: Shared UI components

### Key Files
- `app/data.ts`: Work records and public destinations
- `app/facets.ts`: Shared naming and taxonomy normalization
- `app/writing-data.json`: Generated writing index; never edit directly
- `app/demo-data.json` and `app/demo-stories.json`: Generated demo content

## Quick Commands
```bash
npm run check && npm run lint    # Static verification
npm test                         # Production build and rendered HTML checks
npm run test:audit               # Audit regression checks
npm run dev                      # Development server
```

## Boundaries
- `.env*` - Environment configuration (never commit)

## Content boundaries

- Blog-source corrections belong in `/Users/nino/Workspace/dev/apps/blog/astro-build`.
- Refresh writing with `npm run sync:writing`; do not hand-edit `app/writing-data.json`.
- Refresh demos with `npm run sync:demos`; the source remains in `apps/nc-demos`.
- `/ai` is a retired namespace retained only for redirects.
