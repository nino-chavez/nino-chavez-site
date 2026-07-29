/**
 * One source for every title, description, canonical and share tag on the site.
 *
 * Before this, +layout.svelte emitted og:image / og:image:width / og:image:height /
 * twitter:image on EVERY page, and ten routes each emitted a full block of their own on
 * top. The five that set an og:image shipped two of them; which one a platform picks is
 * not ours to decide, and in this fleet the generic one has won before (photography #33,
 * where a retired default card kept turning up on shares). /about's dedicated card was
 * one of the two. No page carried a canonical at all.
 *
 * Static routes declare their copy in BY_ROUTE, keyed by SvelteKit's route id, so no
 * route needs a load function just to describe itself. Dynamic routes return `seo` from
 * the load they already have, and it takes precedence.
 *
 * Copy is carried over verbatim from the pages it replaces. The one deliberate change:
 * pages that had a THIRD string for twitter:description now reuse the og one. X reads
 * og:* as fallback, and a third variant of the same sentence is drift waiting to happen.
 */

export const SITE_ORIGIN = 'https://ninochavez.co';

export interface Seo {
	/** <title> and the page's meta description. */
	title: string;
	description: string;
	/** Share-card copy, when it should read differently from the page title. */
	ogTitle?: string;
	ogDescription?: string;
	/** Absolute URL. */
	image?: string;
	/** Only set alongside an image whose real dimensions are known. */
	imageWidth?: number;
	imageHeight?: number;
	imageAlt?: string;
	type?: 'website' | 'article' | 'profile';
	noindex?: boolean;
}

const SITE_CARD = {
	image: `${SITE_ORIGIN}/images/og-image.jpeg`,
	imageWidth: 1200,
	imageHeight: 630
};

const DEFAULT: Seo = {
	title: 'Nino Chavez — Cut the Noise, Follow the Signal',
	description: 'Photography, music, writing, and software. Nino Chavez, Chicago.',
	type: 'website',
	...SITE_CARD
};

const BY_ROUTE: Record<string, Seo> = {
	'/': DEFAULT,

	'/about': {
		title: 'About - Nino Chavez',
		description: 'Photography, music, writing, and software. Nino Chavez, Chicago.',
		type: 'profile',
		// The page's own card, which never reached a share: the layout's generic og:image
		// shipped beside it on every render.
		image: `${SITE_ORIGIN}/images/og-about-image.jpeg`,
		imageWidth: 1200,
		imageHeight: 630
	},

	'/now': {
		title: 'Now - Nino Chavez',
		description: "What I'm working on, thinking about, and building right now.",
		type: 'profile',
		// Deliberately unindexed and unlinked (25061ba). Out of the sitemap for the same
		// reason — submitting a noindex URL is a Search Console error.
		noindex: true,
		...SITE_CARD
	},

	'/work': {
		title: 'Work - Nino Chavez',
		description: "Things I've built — production platforms, AI tools, side projects.",
		type: 'website',
		...SITE_CARD
	},

	'/links': {
		title: 'Nino Chavez — Links',
		description: 'Code, cameras, sound, words. All the links in one place.',
		type: 'profile',
		...SITE_CARD
	},

	'/privacy': {
		title: 'Privacy Policy | Nino Chavez',
		// Was "Privacy Policy for ninochavez.com". This site is ninochavez.co.
		description: 'Privacy Policy for ninochavez.co.',
		type: 'website',
		...SITE_CARD
	},

	'/ai': {
		title: 'Work this way — AI practice, demonstrated | Nino Chavez',
		description:
			'Apply AI to the craft you already have: seven persona-based paths, self-serve tools, and the shipped work that proves each one.',
		ogTitle: 'Work this way — AI practice, demonstrated',
		ogDescription:
			'Personas to locate yourself, paths to follow, tools you can pick up today, and the shipped work that proves each one.',
		type: 'website',
		...SITE_CARD
	},

	'/ai/work': {
		title: 'Shipped work — the evidence behind every path | Nino Chavez',
		description:
			'The artifact registry behind the AI practice paths: live products, installable tools, and public method repos — every card derived and probed at build time.',
		ogTitle: 'Shipped work — the evidence behind every path',
		ogDescription:
			'Live products, installable tools, and public method repos — every card derived and probed at build time.',
		type: 'website',
		...SITE_CARD
	},

	'/ai/learn': {
		title: 'Learn — find your track | Nino Chavez',
		description:
			'Seven persona-based tracks for applying AI to the craft you already have — each demonstrated by shipped work, each self-serve.',
		ogTitle: 'Learn — find your track',
		ogDescription:
			'Seven persona-based tracks for applying AI to the craft you already have.',
		type: 'website',
		...SITE_CARD
	}
};

/**
 * The SEO for a route: a load-supplied override wins, then the static table, then the
 * site default. Anything an override leaves out falls back, so a dynamic page that only
 * knows its title still gets a description and a card.
 */
export function resolveSeo(routeId: string | null, override?: Partial<Seo>): Seo {
	const base = (routeId && BY_ROUTE[routeId]) || DEFAULT;

	// The card is resolved as a UNIT — image, dimensions and alt all come from whichever
	// layer supplied the image. A plain spread let the default's 1200x630 ride along on a
	// case study whose hero is a remote 1200x800 crop, which is the same false-precision
	// the old layout shipped: dimensions describing a different picture than the one sent.
	const card = override?.image ? override : base.image ? base : DEFAULT;

	return {
		...DEFAULT,
		...base,
		...override,
		image: card.image,
		imageWidth: card.imageWidth,
		imageHeight: card.imageHeight,
		imageAlt: card.imageAlt
	};
}
