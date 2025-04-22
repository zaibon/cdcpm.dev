<script>
	import { fly } from 'svelte/transition';

	const projects = $state([
		{
			title: 'Shortcut',
			description:
				'A URL shortening service that allows you to create concise, shareable links while providing analytics to track clicks and manage your links effectively.',
			image: '/images/shortcut.webp',
			technologies: ['Go', 'htmx', 'Templ', 'Postgres', 'fly.io'],
			liveUrl: 'https://shct.io/'
		},
		{
			title: 'CommitKudos',
			description: `CommitKudos is a platform that leverages Web3 technology to reward and celebrate open-source contributions. It enables maintainers and users to recognize top contributors by distributing cryptocurrency rewards, providing tangible appreciation for their valuable efforts.
			It was created during the ETH Lisbon hackathon in 2023 and won a price for the best use of the peanut protocol.`,
			image: '/images/commitkudos.webp',
			technologies: ['SvelteKit', 'GitHub API', 'web3-wallet', 'Peanut protocol'],
			liveUrl: 'https://commitkudos.com/',
			repoUrl: 'https://github.com/zaibon/commitkudos'
		},
		{
			title: 'Zero-OS',
			description:
				'Zero-OS is a stateless and lightweight operating system designed for distributed and decentralized cloud infrastructure. It is optimized to run on bare-metal servers without the need for a traditional package manager or persistent storage. It provides a secure and minimal runtime environment with built-in support for containerization, networking, and remote management, making it well-suited for scalable, peer-to-peer computing grids.',
			image: '/images/zero-os.webp',
			technologies: ['Go', 'Linux', 'Wireguard'],
			repoUrl: 'https://github.com/threefoldtech/zos'
		},
		{
			title: 'py-dmidecode',
			description:
				'A Python library designed to parse and extract meaningful information from the output of the dmidecode command, which provides detailed hardware information about a computer system.',
			image: 'images/py-dmidecode.webp',
			technologies: ['Python'],
			repoUrl: 'https://github.com/zaibon/py-dmidecode'
		},
		{
			title: 'go-template',
			description: 'An Opinionated Foundation for Your Go Microservices on Kubernetes',
			image: 'images/go-template.webp',
			technologies: ['Go', 'Kubernetes', 'microservices'],
			repoUrl: 'https://github.com/zaibon/go-template'
		},
		{
			title: 'gitsumbot',
			description:
				'GitSumBot is a package that generates a summary of changes made to a codebase using commit messages',
			image: 'images/gitsumbot.webp',
			technologies: ['Go', 'ChatGPT API', 'Git', 'GitHub API', 'LLM'],
			repoUrl: 'https://github.com/zaibon/gitsumbot'
		}
	]);

	let selectedTech = $state('All');

	let filteredProjects = $derived(
		selectedTech === 'All' ? projects : projects.filter((project) => project.technologies.includes(selectedTech))
	);

	// Get unique technologies from all projects
	const allTechnologies = ['All', ...new Set(projects.flatMap((p) => p.technologies))].sort();
</script>

<svelte:head>
	<title>Projects | Christophe de Carvalho Pereira Martins</title>
	<meta
		name="description"
		content="Portfolio of projects by Christophe de Carvalho Pereira Martins, Software Engineer."
	/>
</svelte:head>

<div class="projects-page">
	<h1>My Projects</h1>
	<p class="intro">Here are some of the projects I've worked on.</p>

	<div class="filters">
		<div class="filter-label">Filter by technology:</div>
		<div class="filter-options">
			{#each allTechnologies as tech}
				<button class="filter-btn {selectedTech === tech ? 'active' : ''}" onclick={() => (selectedTech = tech)}>
					{tech}
				</button>
			{/each}
		</div>
	</div>

	<div class="projects-grid">
		{#each filteredProjects as project, i}
			<div class="project-card" in:fly={{ y: 20, duration: 300, delay: i * 100 }}>
				<div class="project-image">
					<img src={project.image || '/placeholder.svg'} alt={project.title} />
					<div class="overlay">
						<div class="buttons">
							{#if project.liveUrl}
								<a href={project.liveUrl} target="_blank" rel="noopener" class="btn">View Live</a>
							{/if}
							{#if project.repoUrl}
								<a href={project.repoUrl} target="_blank" rel="noopener" class="btn">Source Code</a>
							{/if}
						</div>
					</div>
				</div>
				<div class="project-content">
					<h3>{project.title}</h3>
					<p>{project.description}</p>
					<div class="tech-tags">
						{#each project.technologies as tech}
							<span class="tech-tag">{tech}</span>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.projects-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.intro {
		text-align: center;
		max-width: 800px;
		margin: 0 auto 3rem;
		color: var(--text-light);
		line-height: 1.6;
	}

	.filters {
		margin-bottom: 2rem;
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
	}

	.filter-label {
		font-weight: 500;
	}

	.filter-options {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.filter-btn {
		background: none;
		border: 1px solid var(--border);
		padding: 0.5rem 1rem;
		border-radius: 2rem;
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
		color: var(--text);
	}

	.filter-btn:hover {
		background-color: var(--bg-alt);
	}

	.filter-btn.active {
		background-color: var(--primary);
		color: white;
		border-color: var(--primary);
	}

	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
		gap: 2rem;
	}

	.project-card {
		border-radius: 0.5rem;
		overflow: hidden;
		background-color: var(--bg-alt);
		border: 1px solid var(--border);
		transition:
			transform 0.3s,
			box-shadow 0.3s;
	}

	.project-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	}

	.project-image {
		position: relative;
		height: 200px;
		overflow: hidden;
	}

	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s;
	}

	.project-card:hover .project-image img {
		transform: scale(1.05);
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s;
	}

	.project-card:hover .overlay {
		opacity: 1;
	}

	.buttons {
		display: flex;
		gap: 1rem;
	}

	.btn {
		background-color: var(--primary);
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		transition: background-color 0.2s;
	}

	.btn:hover {
		background-color: var(--primary-dark);
	}

	.project-content {
		padding: 1.5rem;
	}

	h3 {
		font-size: 1.25rem;
		margin-bottom: 0.75rem;
		color: var(--text);
	}

	p {
		color: var(--text-light);
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.tech-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tech-tag {
		background-color: var(--bg);
		color: var(--text-light);
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.75rem;
		border: 1px solid var(--border);
		transition:
			background-color 0.3s,
			color 0.3s,
			border-color 0.3s;
	}

	@media (max-width: 768px) {
		.projects-grid {
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		}
	}
</style>
