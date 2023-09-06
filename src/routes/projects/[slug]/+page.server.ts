import type { PageServerLoad } from './$types';
import type { Project } from '$lib/types';
import GithubService from '$lib/services/github';

export const load = (async ({ params }): Promise<Project | undefined> => {
	const repo = await GithubService.getUserRepository(params.slug);
	const readme = await GithubService.getReadme(repo);

	return {
		repo: repo,
		updatedAt: Date.parse(repo.updated_at),
		readme: readme,
	};
}) satisfies PageServerLoad;
