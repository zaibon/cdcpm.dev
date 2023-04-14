import { posts } from '$lib/data/blog';
import type { BlogPost } from '$lib/types';
import type { PageLoad } from '../$types';

export const load = (({ params }): BlogPost | undefined => {
	return posts.find((post) => post.slug === params.slug);
}) satisfies PageLoad;
	