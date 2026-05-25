import { json } from '@sveltejs/kit';

export const prerender = true;

export function GET() {
	return json({
		'@context': 'https://schema.org',
		'@type': 'ContactPoint',
		'@id': 'https://ninochavez.co/#contact',
		contactType: 'Direct outreach',
		email: 'nino@ninochavez.co',
		availableLanguage: ['English'],
		areaServed: 'Global · remote-only',
		description: 'Not selling services. Reachable when the conversation is worth having. Day job at commerce.com is full-time; receipts on the site exist for context, not conversion.',
		url: 'https://ninochavez.co/contact',
		contactOption: 'Email · GitHub · LinkedIn',
		hoursAvailable: {
			'@type': 'OpeningHoursSpecification',
			description: 'Asynchronous. One reply, then the thread is yours. No newsletter or marketing follow-up.'
		},
		sameAs: [
			'mailto:nino@ninochavez.co',
			'https://github.com/nino-chavez',
			'https://www.linkedin.com/in/ninochavez/'
		]
	});
}
