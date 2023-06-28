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
	},
	{
		title: 'py-dmidecode',
		description: 'Small tool that parses the output of dmidecode command.',
		// image: 'https://raw.githubusercontent.com/zaibon/gitsumbot/main/assets/logo.png',
		links: [
			{
				name: 'Github',
				target: 'https://github.com/zaibon/py-dmidecode'
			},
			{
				name: 'Pypi',
				target: 'https://pypi.org/project/py-dmidecode/'
			}
		]
	},
	{
		title: 'irc-bot',
		description: 'Simple IRC bot package in Go.',
		// image: 'https://raw.githubusercontent.com/zaibon/gitsumbot/main/assets/logo.png',
		links: [
			{
				name: 'Github',
				target: 'https://github.com/zaibon/ircbot'
			}
		]
	},
	{
		title: 'Dendrite Kubernetes Manifest',
		description: 'Example of a Matrix Dendrite K8S deployment on Kubernetes.',
		// image: 'https://raw.githubusercontent.com/zaibon/gitsumbot/main/assets/logo.png',
		links: [
			{
				name: 'Github',
				target: 'https://github.com/zaibon/dendrite-k8s-manifest'
			},
			{
				name: 'Dendrite repository',
				target: 'https://github.com/matrix-org/dendrite'
			},
			{
				name: 'Matrix',
				target: 'https://matrix.org'
			}
		]
	}
];
