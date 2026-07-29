import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/work-data';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);

	if (!project) {
		throw error(404, {
			message: 'Project not found'
		});
	}

	return {
		project,
		// The layout owns every head tag; a dynamic route contributes its copy here.
		// No imageWidth/imageHeight: heroImage is a remote 1200x800 crop, and the old
		// page inherited the layout's 1200x630 claim over it.
		seo: {
			title: `${project.title} - Nino Chavez | Work`,
			description: `${project.tagline}. ${project.description}`,
			ogTitle: `${project.title} - Nino Chavez | Work`,
			ogDescription: project.tagline,
			type: 'article' as const,
			image: project.heroImage,
			imageAlt: project.title
		}
	};
};
