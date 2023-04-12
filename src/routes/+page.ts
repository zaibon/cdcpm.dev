import type { PageLoad } from './$types';
import { projects } from '$lib/data/projects';
import { skills } from '$lib/data/skills';
import { profile } from '$lib/data/profile';

export const load = (({ params }) => {
	return {
		skills: skills,
		projects: projects.slice(0, 3),
		profile: profile
	};
}) satisfies PageLoad;
