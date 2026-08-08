/**
 * AEO (Answer Engine Optimization) API Endpoint
 *
 * Purpose: Provide machine-readable work history for queries like:
 * - "Where has Nino Chavez worked?"
 * - "Nino Chavez work history"
 * - "Nino Chavez at Accenture Song"
 *
 * This endpoint provides chronological employment history with role details,
 * enabling AI models to answer career trajectory and experience questions.
 *
 * Employer names, dates, and the flagship program's budget/team-size figures
 * are derived from app/career.ts, the single owner of those facts — see that
 * file's header for provenance. Role-title register (site vs. HR/LinkedIn) and
 * rollup prose for the pre-2015 roles stay route-local per career.ts's own
 * dual-register note; this file must not hand-write a number career.ts carries.
 */

import { positions, careerStartYear, yearsOfPractice, identity } from '../../career';

function findPosition(org: string) {
	const position = positions.find((p) => p.org === org);
	if (!position) {
		throw new Error(`career.ts: expected a position for "${org}"`);
	}
	return position;
}

export async function GET() {
	const currentPosition = positions.find((p) => p.kind === 'employment' && p.end === null);
	if (!currentPosition) {
		throw new Error('career.ts: expected a current employment position');
	}

	const song = findPosition('Accenture Song');
	const capgemini = findPosition('Capgemini');
	const peapod = findPosition('Peapod Digital Labs');
	const flagship = findPosition('Accenture Interactive');
	const gorillaGroup = findPosition('Gorilla Group');

	const flagshipMetric = (label: string) => {
		const metric = flagship.bullets[0]?.metrics?.find((m) => m.label === label);
		if (!metric) {
			throw new Error(`career.ts: expected a "${label}" metric on the flagship bullet`);
		}
		return metric.value;
	};
	const flagshipBudget = flagshipMetric('program budget');
	const flagshipTeamSize = flagshipMetric('global technical and functional resources');

	// The 1999-2015 span rolls up every career.ts position tagged
	// "early-career" into a single "Various Roles" entry, matching the rollup
	// this endpoint has always shown (7 items, not 15).
	const earlyCareer = positions.filter((p) => p.tags?.includes('early-career'));
	const earlyCareerStart = earlyCareer.map((p) => p.start).sort()[0] ?? '';
	const earlyCareerEnd = earlyCareer.map((p) => p.end ?? '').sort().at(-1) ?? '';

	// Displayed as a round "X+" so it doesn't need a fact update every year;
	// re-crosses to the next multiple of 5 automatically (e.g. 30+ in 2029).
	const yearsExperience = `${Math.floor(yearsOfPractice() / 5) * 5}+`;

	const experienceData = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Nino Chavez - Professional Experience',
		description: `Chronological work history spanning ${yearsExperience} years in enterprise architecture`,
		numberOfItems: 7,
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				item: {
					'@type': 'EmployeeRole',
					roleName: currentPosition.title,
					startDate: currentPosition.start,
					endDate: currentPosition.end, // Current role
					isCurrentRole: true,
					employmentType: 'FULL_TIME',
					description:
						'Leading product architecture for enterprise commerce platform, building scalable systems that power commerce experiences with AI-native development practices.',
					responsibilities: [
						'Product architecture for enterprise commerce platform',
						'Building scalable systems that power commerce experiences',
						'AI-native development practices',
						'Technical leadership and system design'
					],
					worksFor: {
						'@type': 'Organization',
						name: currentPosition.org,
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			},
			{
				'@type': 'ListItem',
				position: 2,
				item: {
					'@type': 'EmployeeRole',
					roleName: song.title,
					startDate: song.start,
					endDate: song.end,
					isCurrentRole: false,
					employmentType: 'FULL_TIME',
					description:
						'Strategic advisor for AI-native platform adoption, cloud architecture roadmaps, and organizational transformation. Leading Agile operating models and aligning executive vision with technical execution.',
					responsibilities: [
						'Architecting AI-native platforms and Gen AI adoption strategies',
						'Cloud architecture roadmaps for autonomous enterprise',
						'Leading Agile operating models and organizational redesign',
						'Aligning executive vision with technical execution'
					],
					worksFor: {
						'@type': 'Organization',
						name: song.org,
						url: 'https://www.accenture.com/us-en/services/song-index',
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			},
			{
				'@type': 'ListItem',
				position: 3,
				item: {
					'@type': 'EmployeeRole',
					roleName: capgemini.title,
					startDate: capgemini.start,
					endDate: capgemini.end,
					employmentType: 'FULL_TIME',
					description:
						'End-to-end delivery leadership for enterprise commerce platforms including SAP, Salesforce, and Adobe. Managed architectural alignment across distributed global teams and established technical standards.',
					responsibilities: [
						'End-to-end delivery for enterprise commerce (SAP, Salesforce, Adobe)',
						'Architectural alignment across distributed teams',
						'Technical standards across global delivery centers',
						'Stabilized at-risk programs in high-pressure environments'
					],
					worksFor: {
						'@type': 'Organization',
						name: capgemini.org,
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			},
			{
				'@type': 'ListItem',
				position: 4,
				item: {
					'@type': 'EmployeeRole',
					roleName: 'Domain Architect',
					startDate: peapod.start,
					endDate: peapod.end,
					employmentType: 'FULL_TIME',
					description:
						'Microservices architecture for scalable online grocery platforms. Led architecture strategy for mobile, web, and fulfillment systems with squad-based delivery model.',
					responsibilities: [
						'Scalable microservices for online grocery platforms',
						'Architecture strategy for mobile, web, and fulfillment',
						'Squad-based delivery model improvements'
					],
					worksFor: {
						'@type': 'Organization',
						name: peapod.org,
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			},
			{
				'@type': 'ListItem',
				position: 5,
				item: {
					'@type': 'EmployeeRole',
					roleName: 'Managing Enterprise Architect',
					startDate: flagship.start,
					endDate: flagship.end,
					employmentType: 'FULL_TIME',
					description: `Led ${flagshipBudget} multi-brand omni-channel commerce transformation using SAP Commerce Cloud. Managed ${flagshipTeamSize} global resources across system integration, performance, QA, and CI/CD workstreams.`,
					responsibilities: [
						`${flagshipBudget} multi-brand omni-channel commerce solution (SAP Commerce)`,
						`Managed ${flagshipTeamSize} global resources`,
						'Led system integration, performance, QA, CI/CD streams'
					],
					worksFor: {
						'@type': 'Organization',
						name: flagship.org,
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					},
					additionalProperty: [
						{
							'@type': 'PropertyValue',
							name: 'Project Budget',
							value: flagshipBudget
						},
						{
							'@type': 'PropertyValue',
							name: 'Team Size',
							value: `${flagshipTeamSize} global resources`
						}
					]
				}
			},
			{
				'@type': 'ListItem',
				position: 6,
				item: {
					'@type': 'EmployeeRole',
					roleName: 'Managing Enterprise Architect',
					startDate: gorillaGroup.start,
					endDate: gorillaGroup.end,
					employmentType: 'FULL_TIME',
					description:
						'Cross-functional eCommerce implementations across SAP, Magento, and Salesforce platforms. Technical advisor for pre-sales and strategy with architectural framework development for engineering execution.',
					responsibilities: [
						'Cross-functional eCommerce builds (SAP, Magento, Salesforce)',
						'Technical advisor for pre-sales and strategy',
						'Architectural frameworks for engineering execution'
					],
					worksFor: {
						'@type': 'Organization',
						name: gorillaGroup.org,
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			},
			{
				'@type': 'ListItem',
				position: 7,
				item: {
					'@type': 'EmployeeRole',
					roleName: 'Software Engineering & Engineering Lead',
					startDate: earlyCareerStart,
					endDate: earlyCareerEnd,
					employmentType: 'FULL_TIME',
					description:
						'Full-stack development and solution architecture across retail, B2B, and CMS platforms. Led Agile delivery teams across multi-vendor environments using Java, .NET, and open-source frameworks.',
					responsibilities: [
						'Full-stack development (Java, .NET, open-source frameworks)',
						'Solution architecture for retail, B2B, CMS platforms',
						'Agile delivery across multi-vendor teams'
					],
					worksFor: {
						'@type': 'Organization',
						name: 'Various Roles',
						description: 'Multiple companies in software engineering and architecture roles',
						location: {
							'@type': 'Place',
							address: {
								'@type': 'PostalAddress',
								addressLocality: 'Chicago',
								addressRegion: 'IL',
								addressCountry: 'US'
							}
						}
					}
				}
			}
		],

		// Summary Statistics
		about: {
			'@type': 'Person',
			name: 'Nino Chavez',
			url: 'https://ninochavez.co',
			additionalProperty: [
				{
					'@type': 'PropertyValue',
					name: 'Total Years Experience',
					value: yearsExperience
				},
				{
					'@type': 'PropertyValue',
					name: 'Career Start Year',
					value: String(careerStartYear)
				},
				{
					'@type': 'PropertyValue',
					name: 'Current Employer',
					value: currentPosition.org
				},
				{
					'@type': 'PropertyValue',
					name: 'Primary Location',
					value: identity.location
				}
			]
		}
	};

	return new Response(JSON.stringify(experienceData), {
		headers: {
			'Content-Type': 'application/ld+json',
			'Cache-Control': 'public, max-age=3600',
			'Access-Control-Allow-Origin': '*'
		}
	});
}
