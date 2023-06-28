import type { PageLoad } from './$types';
import { projects } from '$lib/data/projects';
import type { Project } from '$lib/types';

export const load = (({ params }): Project | undefined => {
	return projects.find((project) => project.title === params.slug);
}) satisfies PageLoad;
