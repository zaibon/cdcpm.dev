import type { GithubRepo, Project } from '$lib/types';
import GithubService from '$lib/services/github';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search);
    const count = parseInt(searchParams.get('count') ?? '3');

    let repositories: GithubRepo[] = [];
    try {
        repositories = await GithubService.listUserRepositories(count);
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

    return json(projects);
}

