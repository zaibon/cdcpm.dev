import type { BlogPost } from '$lib/types';

export const posts: BlogPost[] = [
	{
		id: 'uuid1',
		title: 'hello world',
		excerpt: 'hello world coucou',
		image: 'https://bulma.io/images/placeholders/1280x960.png',
		date: new Date(2022, 1, 1),
		slug: 'hello-world',
		tags: ['tech', 'ai'],
		content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
		comments: [
			{
				id: 'uuid1',
				author: 'zaibon',
				email: 'mail@me.cm',
				content: 'this is a supper comment',
				date: new Date()
			}
		]
	},
	{
		id: 'uuid2',
		title: 'hello world',
		excerpt: 'hello world coucou',
		image: 'https://bulma.io/images/placeholders/1280x960.png',
		date: new Date(2021, 4, 1),
		slug: 'hello-world',
		tags: ['lifestyle'],
		content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
		comments: []
	},
	{
		id: 'uuid21',
		title: 'hello world',
		excerpt: 'hello world coucou',
		image: 'https://bulma.io/images/placeholders/1280x960.png',
		date: new Date(2020, 11, 12),
		slug: 'hello-world',
		tags: ['food'],
		content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
		comments: []
	},
	{
		id: 'uuid3',
		title: 'hello world',
		excerpt: 'hello world coucou',
		image: 'https://bulma.io/images/placeholders/1280x960.png',
		date: new Date(),
		slug: 'hello-world',
		tags: [],
		content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
		comments: []
	},
	{
		id: 'uuid4',
		title: 'hello world',
		excerpt: 'hello world coucou',
		image: 'https://bulma.io/images/placeholders/1280x960.png',
		date: new Date(),
		slug: 'hello-world',
		tags: [],
		content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. ',
		comments: []
	}
];
