import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

/**
 * AEO (Answer Engine Optimization) API Endpoint
 *
 * Purpose: Provide machine-readable contact information for queries like:
 * - "How do I contact Nino Chavez?"
 * - "Nino Chavez email"
 * - "How to reach Nino Chavez"
 *
 * This endpoint provides definitive contact methods, making it easy for
 * AI models to provide accurate contact information in responses.
 */

export const GET: RequestHandler = async () => {
	const contactData = {
		'@context': 'https://schema.org',
		'@type': 'ContactPoint',
		name: 'Nino Chavez - Contact Information',
		description: 'Primary contact methods for enterprise consulting and photography inquiries',

		// Email (Primary)
		email: 'nino@ninochavez.co',

		// Professional Profiles. Kept in step with /api/person.json and /links.
		url: 'https://ninochavez.co',
		sameAs: [
			'https://www.linkedin.com/in/nino-chavez/',
			'https://github.com/nino-chavez',
			'https://x.com/ninochavez',
			'https://instagram.com/ninochavez',
			'https://soundcloud.com/ni-no-cha-vez',
			'https://blog.ninochavez.co',
			'https://ninochavez.co/photography'
		],

		// What this contact point is FOR. Schema.org's own examples for this
		// property are "customer service" and "technical support", so the old
		// values were valid schema — they were just untrue. There is no support
		// desk and no sales team; this is one person's inbox. The two things it
		// actually receives are the two already spelled out in additionalProperty
		// below, so they are named here where a consumer reads them.
		contactType: ['Consulting inquiries', 'Photography bookings'],

		// Availability
		availableLanguage: ['English'],

		// Location
		areaServed: {
			'@type': 'Place',
			name: 'Global',
			description: 'Available for remote consulting worldwide, based in Chicago'
		},

		// Person Details
		about: {
			'@type': 'Person',
			name: 'Nino Chavez',
			// Same list as /api/person.json — these two disagreeing is the drift
			// this endpoint pair is prone to.
			jobTitle: ['Product Architect', 'Action Sports Photographer', 'Writer', 'DJ'],
			worksFor: {
				'@type': 'Organization',
				name: 'commerce.com'
			},
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Chicago',
				addressRegion: 'IL',
				addressCountry: 'US'
			}
		},

		// Service Offerings for Context
		additionalProperty: [
			{
				'@type': 'PropertyValue',
				name: 'Enterprise Consulting',
				value:
					'Available for strategic advisory, enterprise architecture, AI transformation projects'
			},
			{
				'@type': 'PropertyValue',
				name: 'Photography Services',
				value: 'Available for tournament photography, action sports events, team photography'
			},
			{
				'@type': 'PropertyValue',
				name: 'Response Time',
				value: 'Typically responds within 24-48 hours'
			},
			{
				'@type': 'PropertyValue',
				name: 'Preferred Contact Method',
				value: 'Email for initial inquiries, LinkedIn for professional networking'
			}
		]
	};

	return json(contactData, {
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600',
			'Access-Control-Allow-Origin': '*'
		}
	});
};
