import type { PageServerLoad } from './$types';
import { skills } from '$lib/data/skills';
import { profile } from '$lib/data/profile';
import github from '$lib/services/github';
import type { GithubRepo, Project } from '$lib/types';

export const load = (async () => {
	let repositories: GithubRepo[] = [];
	try {
		repositories = await github.listUserRepositories(3);
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
		skills: skills,
		profile: profile,
		projects: projects,
	};
}) satisfies PageServerLoad;
