import type { PageLoad } from './$types';
import { projects } from '$lib/data/projects';

export const load = (({ params }) => {
	return projects.find((project) => project.title === params.slug);
}) satisfies PageLoad;
