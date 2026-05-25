import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  
  kit: {
    adapter: adapter({
      routes: {
        include: ['/*'],
        exclude: ['<all>']
      }
    }),
    alias: {
      $lib: 'src/lib',
      $components: 'src/lib/components',
      $stores: 'src/lib/stores',
      $actions: 'src/lib/actions'
    },
    prerender: {
      // Phase 2.3 wires routes in slices. While slice 1 (/) is live but
      // /work, /practice, /writing, /about, /contact, etc. aren't built
      // yet, treat 404s on those known-pending routes as warnings, not
      // build failures. Remove this once all routes are authored
      // (Phase 2.3 slice 4 + Phase 2.4).
      handleHttpError: ({ path, message }) => {
        const pendingRoutes = [
          '/work', '/practice', '/writing', '/about', '/contact',
          '/blueprint/', '/api/person.json', '/api/expertise.json',
          '/api/experience.json', '/api/contact.json'
        ];
        if (pendingRoutes.some((r) => path.startsWith(r))) {
          console.warn(`[prerender] skipping ${path} — pending Phase 2.3/2.4`);
          return;
        }
        throw new Error(message);
      }
    }
  },
  trailingSlash: 'never',
};

export default config;