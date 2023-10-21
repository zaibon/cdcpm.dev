import type { PageServerLoad } from './$types';
import { skills } from '$lib/data/skills';
import { profile } from '$lib/data/profile';

export const load = (async () => {
	return {
		skills: skills,
		profile: profile
	};
}) satisfies PageServerLoad;
