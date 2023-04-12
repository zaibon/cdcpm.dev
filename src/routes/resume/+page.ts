import type { PageLoad } from './$types';
import { resume } from '$lib/data/resume';

export const load = (() => {
	return resume;
}) satisfies PageLoad;
