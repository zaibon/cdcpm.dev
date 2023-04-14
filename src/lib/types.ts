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

export interface BlogPost {
	id: string;
	title: string;
	image: string;
	excerpt: string;
	date: Date;
	slug: string;
	tags: string[];
	content: string;
	comments: Comment[];
}

export interface Comment {
	id: string;
	author: string;
	email: string;
	content: string;
	date: Date;
}
