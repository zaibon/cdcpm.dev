import type { PageServerLoad } from './$types';
import { skills } from '$lib/data/skills';
import { profile } from '$lib/data/profile';
import type { GithubRepo } from '$lib/types';
import GithubService from '$lib/services/github';

export const load = (async () => {
	const repositories = await GithubService.listUserRepositories(3);
	const projects = repositories.map((repo: GithubRepo) => ({
		title: repo.name,
		description: repo.description || '',
		// image?: string,
		links: [
			{
				name: 'Github',
				target: repo.html_url
			}
		],
		stars: repo.stargazers_count
	}));

	return {
		skills: skills,
		projects: projects,
		profile: profile
	};
}) satisfies PageServerLoad;
