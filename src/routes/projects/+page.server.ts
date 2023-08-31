import type { GithubRepo } from '$lib/types';
import type { PageServerLoad } from './$types';
import GithubService from '$lib/services/github';

export const load = (async () => {
	let repositories: GithubRepo[] = [];
	try {
		repositories = await GithubService.listUserRepositories();
	} catch (error) {
		console.log(`error loading GitHub repository: ${error}`);
		repositories = [];
	}

	const projects = repositories.map((repo: GithubRepo) => ({
		title: repo.name,
		description: repo.description || '',
		links: [
			{
				name: 'Github',
				target: repo.html_url
			}
		],
		stars: repo.stargazers_count
	}));

	return {
		projects: projects
	};
}) satisfies PageServerLoad;
