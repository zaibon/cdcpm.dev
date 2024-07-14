import type { PageServerLoad } from './$types';
import { skills } from '$lib/data/skills';
import { profile } from '$lib/data/profile';
import ProjectService from '$lib/services/projects';

export const load = (async () => {
	const { projects, nextPage } = await ProjectService.listProjects(3);

	return {
		projects: projects,
		nextPage: nextPage,
		skills: skills,
		profile: profile
	};
}) satisfies PageServerLoad;
