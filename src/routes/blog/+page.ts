import { posts } from '$lib/data/blog';
import type { BlogPost } from '$lib/types';
import type { PageLoad } from '../$types';

export const load = (() => {
	posts.sort((a, b) => b.date.getTime() - a.date.getTime());
	const groupedPosts: { [key: number]: { [key: string]: BlogPost[] } } = {};
	// Group posts by month and year
	posts.forEach((post) => {
		const date = new Date(post.date);
		const year = date.getFullYear();
		const month = date.toLocaleString('default', { month: 'long' });

		if (!groupedPosts[year]) {
			groupedPosts[year] = {};
		}

		if (!groupedPosts[year][month]) {
			groupedPosts[year][month] = [];
		}

		groupedPosts[year][month].push(post);
	});
	const tagCloud: { [key: string]: number } = {};
	// Create tag cloud
	posts.forEach((post) => {
		post.tags.forEach((tag: string) => {
			if (!tagCloud[tag]) {
				tagCloud[tag] = 1;
			} else {
				tagCloud[tag]++;
			}
		});
	});
	return {
		posts: posts,
		timeline: groupedPosts,
		tagCloud: tagCloud
	};
}) satisfies PageLoad;
