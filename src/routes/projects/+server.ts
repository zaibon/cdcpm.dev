import ProjectService from '$lib/services/projects';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.search);
	const count = parseInt(searchParams.get('count') ?? '3');
	const np = searchParams.get('nextPage');

	const { projects, nextPage } = await ProjectService.listProjects(count, np);

	return json({ projects, nextPage });
}
