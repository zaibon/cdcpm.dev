import type { Skill } from './types';

export const reduceSkills = (skills: Skill[]): Map<string, Skill[]> => {
	const data = new Map();
	skills.forEach((skill) => {
		if (data.has(skill.category)) {
			data.get(skill.category).push(skill);
		} else {
			data.set(skill.category, [skill]);
		}
	});
	return data;
};
