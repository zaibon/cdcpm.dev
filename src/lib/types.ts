export interface Skill {
	category: string;
	name: string;
	icon: string;
}

export interface Project {
	title: string;
	description: string;
	image?: string;
	links: Link[];
}

export interface Link {
	name: string;
	target: string;
}

export interface Profile {
	title: string;
	firstName: string;
	lastName: string;
	introduction: string;
}
