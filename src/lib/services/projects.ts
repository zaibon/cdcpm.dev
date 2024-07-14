import type { GithubRepo, Project } from '$lib/types';
import GithubService from '$lib/services/github';

const listProjects = async (
	count: number,
	pageLink: string | null = null
): Promise<{ projects: Project[]; nextPage: string }> => {
	let repositories: GithubRepo[] = [];
	let nextPage = '';

	try {
		const { repositories: repos, nextPage: np } = await GithubService.listUserRepositories(count, pageLink);
		repositories = repos;
		nextPage = np;
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

	return { projects, nextPage };
};

export default { listProjects };
