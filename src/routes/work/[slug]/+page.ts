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
		project
	};
};
