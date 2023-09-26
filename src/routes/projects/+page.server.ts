import type { GithubRepo, Project } from '$lib/types';
import type { PageServerLoad } from './$types';
import GithubService from '$lib/services/github';

export const load = (async () => {
	let repositories: GithubRepo[] = [];
	try {
		repositories = await GithubService.listUserRepositories(21);
	} catch (error) {
		console.log(`error loading GitHub repository: ${error}`);
		repositories = [];
	}

	const projects = repositories.map(
		(repo: GithubRepo): Project => ({
			repo: repo,
			updatedAt: Date.parse(repo.updated_at)
		})
	);
	projects.sort((a, b) => {
		if (a.repo.stargazers_count == b.repo.stargazers_count) {
			return b.updatedAt - a.updatedAt;
		} else {
			return b.repo.stargazers_count - a.repo.stargazers_count;
		}
	});

	return {
		projects: projects
	};
}) satisfies PageServerLoad;
