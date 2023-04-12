import type { PageLoad } from './$types';
import { projects } from '$lib/data/projects';
import { skills } from '$lib/data/skills';
import { profile } from '$lib/data/profile';

export const load = (({ params }) => {
	return {
		skills: skills,
		projects: shuffle(projects).slice(0, 3),
		profile: profile
	};
}) satisfies PageLoad;

function shuffle(input: any[]) {
	const array = [...input];
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}
