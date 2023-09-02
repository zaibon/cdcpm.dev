import type { PageServerLoad } from './$types';
import { skills } from '$lib/data/skills';
import { profile } from '$lib/data/profile';
import type { GithubRepo, Project } from '$lib/types';
import GithubService from '$lib/services/github';

export const load = (async () => {
	let repositories: GithubRepo[] = [];
	try {
		repositories = await GithubService.listUserRepositories(3);
	} catch (error) {
		console.log(`error loading GitHub repository: ${error}`);
		repositories = [];
	}

	const projects = repositories.map((repo: GithubRepo): Project => ({
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
	}));
	projects.sort((a, b) => {
		if (a.stars == b.stars) {
			return b.updatedAt - a.updatedAt
		} else {
			return b.stars - a.stars
		}
	});

	return {
		skills: skills,
		projects: projects,
		profile: profile
	};
}) satisfies PageServerLoad;
