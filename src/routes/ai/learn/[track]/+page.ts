import { error } from '@sveltejs/kit';
import { trackById } from '$lib/data/ai/tracks';
import type { PageLoad } from './$types';

// One data-driven TrackPage serves all seven tracks (P4) — the seven
// copy-pasted 600-800-line pages collapse to this route + the data layer.
export const load: PageLoad = ({ params }) => {
	const track = trackById(params.track);
	if (!track) throw error(404, 'No such track');
	return { track };
};
