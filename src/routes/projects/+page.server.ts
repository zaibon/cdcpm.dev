import type { PageServerLoad } from './$types';
import type { Project } from '$lib/types';
import ProjectService from '$lib/services/projects';

export const load: PageServerLoad = async (): Promise<{ projects: Project[]; nextPage: string } | undefined> => {
	const { projects, nextPage } = await ProjectService.listProjects(24);

	return {
		projects: projects,
		nextPage: nextPage
	};
};
