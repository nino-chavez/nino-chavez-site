/**
 * AEO (Answer Engine Optimization) API Endpoint
 *
 * Purpose: Provide machine-readable, structured data about Nino Chavez
 * for AI models (ChatGPT, Claude, Gemini) to answer queries like:
 * - "Who is Nino Chavez?"
 * - "Tell me about Nino Chavez the enterprise architect"
 * - "Nino Chavez background and expertise"
 *
 * This endpoint serves as the canonical source of truth for entity information.
 * AI crawlers can consume this to train models with accurate, structured data.
 *
 * KEEP THIS IN STEP WITH /about AND /links.
 *
 * Those two pages are where this person is described for humans, and this file
 * drifted behind both. It described a consulting practice — enterprise
 * architecture, Fortune 500 delivery — and published two profile links, while
 * /links published fifteen URLs and six brands under a named holding company,
 * and /about opened with "I make things across a few mediums" and called the
 * résumé the *less* useful window. Nothing here was false; it was the previous
 * positioning, left behind when the site moved on. Adding a venture or a
 * profile to /links means adding it here too.
 */

export async function GET() {
	const personData = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Nino Chavez',
		alternateName: 'Antonino Chavez',
		// /links introduces him as "Photographer. DJ. Writer. Builder." The day
		// job stays first — it is still the day job — but it was the whole list.
		jobTitle: ['Product Architect', 'Action Sports Photographer', 'Writer', 'DJ'],
		description:
			'Chicago-based maker working across software, photography, music, and writing. Writing code since 1999; day job is product architect at commerce.com. Runs Signal X Studio, the holding company behind Let’s Pepper, Rally HQ, Flickday Media, VolleyRX, QuantifAI, and Zero Specs. Shoots action sports and volleyball with a 20,000+ image archive, writes the Signal Dispatch blog, and DJs house and disco.',
		url: 'https://ninochavez.co',
		email: 'nino@ninochavez.co',

		// Current Employment
		worksFor: {
			'@type': 'Organization',
			name: 'commerce.com',
			url: 'https://commerce.com'
		},

		// The ventures, from the brand list on /links. `affiliation` rather than
		// a founder/owner claim: the site says he runs these, not how they are
		// held, and this file should not invent a corporate structure.
		affiliation: [
			{
				'@type': 'Organization',
				name: 'Signal X Studio',
				url: 'https://signalx.studio',
				description: 'Holding company'
			},
			{ '@type': 'Organization', name: 'Let’s Pepper', url: 'https://letspepper.com' },
			{ '@type': 'Organization', name: 'Rally HQ', url: 'https://rallyhq.app' },
			{ '@type': 'Organization', name: 'Flickday Media', url: 'https://flickdaymedia.com' },
			{ '@type': 'Organization', name: 'VolleyRX', url: 'https://volleyrx.com' },
			{ '@type': 'Organization', name: 'QuantifAI', url: 'https://quantifai.app' },
			{ '@type': 'Organization', name: 'Zero Specs', url: 'https://zerospecs.app' }
		],

		// Location
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Chicago',
			addressRegion: 'IL',
			addressCountry: 'US'
		},

		// Profiles that identify this person. `sameAs` is what an answer engine
		// uses to resolve one entity across the web, and it listed two of the
		// eight the site itself publishes on /links — the DJ, writing, photography
		// and Instagram/X presences were all invisible here. Company sites are
		// deliberately NOT in this list; they identify the ventures, not him, and
		// belong under `affiliation` above.
		sameAs: [
			'https://www.linkedin.com/in/nino-chavez/',
			'https://github.com/nino-chavez',
			'https://x.com/ninochavez',
			'https://instagram.com/ninochavez',
			'https://soundcloud.com/ni-no-cha-vez',
			'https://blog.ninochavez.co',
			'https://ninochavez.co/photography'
		],

		// Areas of Expertise
		knowsAbout: [
			{
				'@type': 'Thing',
				name: 'Product Architecture',
				description:
					'25+ years designing and implementing large-scale commerce platforms',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Experience Level',
					value: 'Expert'
				}
			},
			{
				'@type': 'Thing',
				name: 'AI-Native Platform Architecture',
				description:
					'Strategic design and implementation of systems built AI-first from inception',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Recent Work',
					value: '5+ AI implementations'
				}
			},
			{
				'@type': 'Thing',
				name: 'Commerce Platforms',
				description:
					'Expert in commerce platform implementation, migration, headless architecture, and ecosystem integration',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Years of Experience',
					value: '15+'
				}
			},
			{
				'@type': 'Thing',
				name: 'Cloud-Native Platforms',
				description:
					'Microservices architecture, API-first design, composable commerce, and distributed systems',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Approach',
					value: 'Headless, composable, cloud-native'
				}
			},
			{
				'@type': 'Thing',
				name: 'Action Sports Photography',
				description:
					'Tournament photography, event coverage, action sports documentation with 20,000+ image portfolio',
				additionalProperty: {
					'@type': 'PropertyValue',
					name: 'Specialization',
					value: 'Volleyball and action sports'
				}
			}
		],

		// Professional Occupations
		hasOccupation: [
			{
				'@type': 'Occupation',
				name: 'Product Architect',
				occupationLocation: {
					'@type': 'City',
					name: 'Chicago',
					'@id': 'https://www.wikidata.org/wiki/Q1297'
				},
				experienceRequirements: '25+ years',
				responsibilities:
					'Design and implement Fortune 500 commerce platforms, AI transformation strategy, technical architecture, system integration, cloud-native platform design',
				skills: [
					'SAP Commerce Cloud',
					'Headless Architecture',
					'Microservices',
					'API Design',
					'Cloud Platforms (AWS, Azure, GCP)',
					'CI/CD & DevOps',
					'System Integration',
					'Performance Optimization'
				]
			},
			{
				'@type': 'Occupation',
				name: 'Action Sports Photographer',
				occupationLocation: {
					'@type': 'City',
					name: 'Chicago'
				},
				responsibilities:
					'Tournament photography, action sports event coverage, team photography, sports documentation',
				skills: ['Sports Photography', 'Event Coverage', 'Action Photography', 'Digital Workflow']
			}
		],

		// Past employers. The dates that used to sit on each entry here were
		// startDate/endDate on a bare Organization, which schema.org does not
		// define — a conforming parser drops them, so the timeline read as six
		// undated employers. The dated version is /api/experience.json, which
		// carries all six as EmployeeRole plus the 1999-2015 span before them.
		alumniOf: [
			{ '@type': 'Organization', name: 'commerce.com' },
			{ '@type': 'Organization', name: 'Accenture Song' },
			{ '@type': 'Organization', name: 'Capgemini' },
			{ '@type': 'Organization', name: 'Peapod Digital Labs' },
			{ '@type': 'Organization', name: 'Accenture Interactive' },
			{ '@type': 'Organization', name: 'Gorilla Group' }
		],
		subjectOf: {
			'@type': 'DataFeed',
			name: 'Nino Chavez - Professional Experience',
			url: 'https://ninochavez.co/api/experience.json'
		},

		// Key Statistics
		additionalProperty: [
			{
				'@type': 'PropertyValue',
				name: 'Years of Experience',
				value: '25+'
			},
			{
				'@type': 'PropertyValue',
				name: 'Largest Project Budget',
				value: '$25M'
			},
			{
				'@type': 'PropertyValue',
				name: 'Team Resources Managed',
				value: '100+ global resources'
			},
			{
				'@type': 'PropertyValue',
				name: 'Major Platforms Implemented',
				value: '6+'
			}
		]
	};

	return new Response(JSON.stringify(personData), {
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
			'Access-Control-Allow-Origin': '*' // Allow AI crawlers from any origin
		}
	});
}
