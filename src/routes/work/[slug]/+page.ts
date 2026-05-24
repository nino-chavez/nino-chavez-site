import { error } from '@sveltejs/kit';
import { WORK_PROJECTS, getProjectBySlug } from '$lib/work-data';
import type { PageLoad } from './$types';

export const prerender = true;

export const entries = () => WORK_PROJECTS.map((p) => ({ slug: p.slug }));

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
