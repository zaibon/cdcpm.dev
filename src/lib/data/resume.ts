	import { skills } from '$lib/data/skills';


export const resume = {
	links: [
		{
			name: 'GitHub',
			url: 'htttps://github.com/zaibon'
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/in/christophe-de-carvalho-pereira-martins-919504a1/'
		},
		{
			name: 'Email',
			url: 'mailto:'
		}
	],
	education: [
		{
			degree: 'Bachelor Degree in Computer Science',
			graduation: '2013 - 2014',
			school: 'Haute Ecole de la province de Liège'
		}
	],
	languages: [
		{
			name: 'English',
			level: 'Fluent'
		},
		{
			name: 'French',
			level: 'Native'
		},
		{
			name: 'Spanish',
			level: 'Basic'
		}
	],
	experience: [
		{
			company: 'Devoteam G Cloud',
			start: 'November 2021',
			end: '2022',
			job: 'Technical Lead',
			description:
				'Team lead for Flycs, a data warehouse accelerator framework on the Google Cloud platform',
			responsibilities: [
				'Management of the team working on Flycs',
				'Creation of a terrafrom landing zone to manage GCP infrastructure',
				'Creation of a microservice based web application using Go and Vue.js',
				'Automate the execution of Terraform using K8S and Cloud Build.',
				'Capture features and functional requirements from customers and translate them into technical requirements',
				'Application Support and maintenance'
			]
		},
		{
			company: 'Devoteam G Cloud',
			start: 'November 2021',
			end: 'Mars 2021',
			job: 'Python software engineer',
			description: '',
			responsibilities: [
				'Design and implement a Python SDK for data engineer to help them define data pipelines using Airflow and BigQuery.',
				'Creation of CI/CD pipelines in Gitlab to manage automatic unit testing and creation of container images.'
			]
		},
		{
			company: 'ThreefoldTech',
			start: 'July 2018',
			end: 'November 2021',
			job: 'Software engineer',
			description:
				'Research around how to decentralize the public cloud ecosystem. The result of this research led to the creation of the ThreefoldGrid.',
			responsibilities: [
				'Management of the team working on Zero-OS.',
				'Conversion from an REST API driven architecture to a fully autonomous system',
				'Implementation of package manager system',
				'Implementation of the network manager which allows the creation of a fully meshed overlay network using Wireguard and Netlink Linux interface.',
				'Integration of the K3S Kubernetes distribution and Containerd in Zero-OS.',
				'Creation of a distributed storage archive library',
				'Design and implementation of a decentralized market system for IT capacity'
			]
		},
		{
			company: 'GreenITGlobe',
			start: 'November 2014',
			end: 'July 2018',
			job: 'Software engineer',
			description:
				'Architecture, design and implementation of Zero-OS, a lightweight, stateless, REST API driven Linux distribution for distributed cloud.',
			responsibilities: [
				'Management of the team working on Zero-OS.',
				'Contribution to Jumpscale, an automation framework for cloud system.'
			]
		}
	],
	certifications: [
		{
			name: ' Associate Cloud Engineer',
			issuer: 'Google'
		},
		{
			name: ' Professional Cloud Devops Engineer',
			issuer: 'Google'
		},
		{
			name: ' Professional Cloud Security engineer',
			issuer: 'Google'
		}
	],
	skills: skills.reduce((acc, curr) => {
		const { category, ...rest } = curr;
		if (acc[category]) {
			acc[category].push(rest);
		} else {
			acc[category] = [rest];
		}
		return acc;
	}, {})
};
