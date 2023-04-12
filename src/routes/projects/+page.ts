import type { PageLoad } from './$types';
import { projects } from '$lib/data/projects';

export const load = (({ params }) => {
	return {
		projects: projects
	};
}) satisfies PageLoad;
