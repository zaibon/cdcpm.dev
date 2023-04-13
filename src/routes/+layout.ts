import type { LayoutLoad } from './$types';

export const load = (async () => {
	return {
		headers: {
			title: 'My Portfolio'
		}
	};
}) satisfies LayoutLoad;
