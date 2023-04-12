import type { PageLoad } from './$types';
import { projects } from '$lib/data/projects';

export const load = (({ params }) => {
	const project = projects.find((project) => project.title === params.slug);
	return { project: project };
}) satisfies PageLoad;
