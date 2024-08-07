import { env } from '$env/dynamic/private';
import type { GithubRepo } from '$lib/types';

const token = env.API_GITHUB_TOKEN;
const nextPattern = /(?<=<)([\S]*)(?=>; rel="Next")/i;

const listUserRepositories = async (
	limit: number = 100,
	pageLink: string | null
): Promise<{ repositories: GithubRepo[]; nextPage: string }> => {
	if (pageLink == null) {
		pageLink = `https://api.github.com/users/zaibon/repos?per_page=${limit}&sort=pushed`;
	}

	const resp = await fetch(pageLink, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	});

	const repositories = await handleError(resp);

	let pagesRemaining = true;
	const linkHeader = resp.headers.get('link') ?? '';
	pagesRemaining = linkHeader != '' && linkHeader.includes(`rel=\"next\"`);

	let nextPage = '';
	if (pagesRemaining) {
		const match = linkHeader.match(nextPattern);
		nextPage = match ? match[0] : '';
	}

	return {
		repositories: repositories,
		nextPage: nextPage
	};
};

const getUserRepository = async (name: string): Promise<GithubRepo> => {
	const resp = await fetch(`https://api.github.com/repos/zaibon/${name}`, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	});
	return await handleError(resp);
};

const getReadme = async (repo: GithubRepo): Promise<string> => {
	const url = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${repo.default_branch}/README.md`;
	const resp = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (resp.status == 404) {
		return '';
	}
	return await resp.text();
};

const handleError = async (resp: Response): Promise<any> => {
	const data = await resp.json();
	if (resp.status != 200) {
		throw new Error(data.message);
	}
	return data;
};

export default {
	listUserRepositories,
	getUserRepository,
	getReadme
};
