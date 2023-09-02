import type { PageServerLoad } from './$types';
import type { Project } from '$lib/types';
import GithubService from '$lib/services/github';

export const load = (async ({ params }): Promise<Project | undefined> => {
	const repo = await GithubService.getUserRepository(params.slug);
	return {
		title: repo.name,
		description: repo.description || '',
		// image?: string,
		links: [
			{
				name: 'Github',
				target: repo.html_url
			}
		],
		updatedAt: Date.parse(repo.updated_at),
		stars: repo.stargazers_count
	};
}) satisfies PageServerLoad;
