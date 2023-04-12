import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		title: 'Zero-OS',
		description: 'Zero-OS lightweight autonomous operating system',
		image: 'zos-logo.png',
		links: [
			{
				name: 'Github',
				target: 'https://github.com/threefoldtech/zos/'
			},
			{
				name: 'Documentation',
				target: 'https://library.threefold.me/info/threefold#/technology/threefold__zos'
			}
		]
	},
	{
		title: 'GitSumBot',
		description:
			'GitSumBot is a Go program that generates a summary of changes made to a codebase using commit messages.',
		image: 'https://raw.githubusercontent.com/zaibon/gitsumbot/main/assets/logo.png',
		links: [
			{
				name: 'Github',
				target: 'https://github.com/zaibon/gitsumbot'
			}
		]
	}
];
