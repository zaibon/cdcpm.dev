<script>
	const experiences = $state([
		{
			title: 'Archipelo',
			company: 'Senior Software Engineer',
			period: 'Oct 2022 - Present',
			description: 'Work on the development of an intelligent code provenance platform for software security.',
			achievements: [
				'Work on the development of an intelligent code provenance platform for software security',
				'Maintenance and development of our infrastructure on Google Cloud',
				'Design and implementation of REST based API to power our frontend SPA',
				'Collaborate with data team to design and deploy a data platform',
				'Ingestion of different source code management webhook event (GitHub, Gitlab, Bitbucket)',
				'Creation of a GitHub application to enrich pull requests'
			],
			technologies: ['Go', 'Kotlin', 'Svelte', 'postgres', 'GCP', 'Kubernetes', 'GitHub API']
		},
		{
			title: 'Technical Lead',
			company: 'Devoteam G Cloud',
			period: 'Nov 2021 - Oct 2022',
			description: 'Team lead for Flycs, a data warehouse accelerator framework on the Google Cloud platform',
			achievements: [
				'Management of the team working on Flycs',
				'Creation of a terrafrom landing zone to manage GCP infrastructure',
				'Creation of a microservice based web application using Go and Vue.js',
				'Automate the execution of Terraform using K8S and Cloud Build',
				'Capture features and functional requirements from customers and translate them into technical requirements',
				'Application Support and maintenance'
			],
			technologies: ['Python', 'Airflow', 'BigQuery', 'Gitlab CI/CD', 'GCP']
		},
		{
			title: 'Python software engineer',
			company: 'Devoteam G Cloud',
			period: 'Nov 2021 - March 2021',
			description:
				'Design and implement a Python SDK for data engineer to help them define data pipelines using Airflow and BigQuery',
			achievements: [
				'Creation of CI/CD pipelines in Gitlab to manage automatic unit testing and creation of container images'
			],
			technologies: ['Python', 'Airflow', 'BigQuery', 'Gitlab CI/CD', 'GCP']
		},
		{
			title: 'Software Engineer',
			company: 'ThreefoldTech',
			period: 'July 2028 - Nov 2021',
			description:
				'Research around how to decentralize the public cloud ecosystem. The result of this research led to the creation of the ThreefoldGrid.',
			achievements: [
				'Management of the team working on Zero-OS',
				'Conversion from an REST API driven architecture to a fully autonomous system',
				'Implementation of package manager system',
				'Implementation of the network manager which allows the creation of a fully meshed overlay network using Wireguard and Netlink Linux interface',
				'Integration of the K3S Kubernetes distribution and Containerd in Zero-OS',
				'Creation of a distributed storage archive library',
				'Design and implementation of a decentralized market system for IT capacity'
			],
			technologies: ['Go', 'Python', 'Linux', 'Docker', 'Containerd', 'Kubernetes', 'Wireguard']
		},
		{
			title: 'Software Engineer',
			company: 'GreenITGlobe',
			period: 'Nov 2014 - July 2028',
			description:
				'Architecture, design and implementation of Zero-OS, a lightweight, stateless, REST API driven Linux distribution for distributed cloud.',
			achievements: [
				'Management of the team working on Zero-OS',
				'Contribution to Jumpscale, an automation framework for cloud system'
			],
			technologies: ['Go', 'Python', 'Linux', 'Docker']
		}
	]);

	const education = $state([
		{
			degree: 'Bachelor Degree in Computer Science',
			institution: 'Haute Ecole de la province de Liège',
			period: '2013 - 2014',
			description: 'Graduated with honors. Specialized in Software Engineering.'
		}
	]);

	const skills = $derived({
		technical: [...new Set(experiences.map((exp) => exp.technologies).flat())].sort(),
		soft: [
			'Problem Solving',
			'Communication',
			'Team Leadership',
			'Agile Methodologies',
			'Project Management',
			'Mentoring'
		]
	});

	function downloadCV() {
		const link = document.createElement('a');
		link.href = '/pdf/cv.pdf';
		link.download = 'Christophe_de_Carvalho_Pereira_Martins_CV.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<svelte:head>
	<title>CV | Christophe de Carvalho Pereira Martins</title>
	<meta
		name="description"
		content="Professional experience, education, and skills of Christophe de Carvalho Pereira Martins, Software Engineer."
	/>
</svelte:head>

<div class="cv-page">
	<div class="header">
		<h1>Curriculum Vitae</h1>
		<button class="download-btn" onclick={downloadCV}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
				<polyline points="7 10 12 15 17 10"></polyline>
				<line x1="12" y1="15" x2="12" y2="3"></line>
			</svg>
			Download CV
		</button>
	</div>

	<section class="section">
		<h2>Professional Experience</h2>
		<div class="timeline">
			{#each experiences as exp (exp.title)}
				<div class="timeline-item">
					<div class="timeline-marker"></div>
					<div class="timeline-content">
						<div class="timeline-header">
							<h3>{exp.title}</h3>
							<span class="period">{exp.period}</span>
						</div>
						<div class="company">{exp.company}</div>
						<p>{exp.description}</p>

						{#if exp.achievements && exp.achievements.length > 0}
							<div class="achievements">
								<h4>Key Achievements:</h4>
								<ul>
									{#each exp.achievements as achievement (achievement)}
										<li>{achievement}</li>
									{/each}
								</ul>
							</div>
						{/if}

						<div class="tags">
							{#each exp.technologies as tech (tech)}
								<span class="tag">{tech}</span>
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="section">
		<h2>Education</h2>
		<div class="timeline">
			{#each education as edu (edu.degree)}
				<div class="timeline-item">
					<div class="timeline-marker"></div>
					<div class="timeline-content">
						<div class="timeline-header">
							<h3>{edu.degree}</h3>
							<span class="period">{edu.period}</span>
						</div>
						<div class="company">{edu.institution}</div>
						<p>{edu.description}</p>

						{#if edu.achievements && edu.achievements.length > 0}
							<div class="achievements">
								<h4>Achievements:</h4>
								<ul>
									{#each edu.achievements as achievement (achievement)}
										<li>{achievement}</li>
									{/each}
								</ul>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="section">
		<h2>Skills</h2>
		<div class="skills-container">
			<div class="skills-column">
				<h3>Technical Skills</h3>
				<ul class="skills-list">
					{#each skills.technical as skill (skill)}
						<li>{skill}</li>
					{/each}
				</ul>
			</div>
			<div class="skills-column">
				<h3>Soft Skills</h3>
				<ul class="skills-list">
					{#each skills.soft as skill (skill)}
						<li>{skill}</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>
</div>

<style>
	.cv-page {
		max-width: 800px;
		margin: 0 auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 2.5rem;
		margin: 0;
	}

	.download-btn {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background-color: var(--primary);
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 0.375rem;
		font-weight: 500;
		transition: background-color 0.2s;
	}

	.download-btn:hover {
		background-color: var(--primary-dark);
	}

	.section {
		margin-bottom: 3rem;
	}

	h2 {
		font-size: 1.75rem;
		margin-bottom: 1.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--primary);
	}

	.timeline {
		position: relative;
		padding-left: 2rem;
	}

	.timeline:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 2px;
		background-color: var(--border);
	}

	.timeline-item {
		position: relative;
		margin-bottom: 2.5rem;
	}

	.timeline-marker {
		position: absolute;
		left: -2rem;
		top: 0.25rem;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background-color: var(--primary);
		border: 2px solid var(--bg);
	}

	.timeline-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		flex-wrap: wrap;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	h3 {
		font-size: 1.25rem;
		margin: 0;
	}

	.period {
		color: var(--text-light);
		font-size: 0.875rem;
	}

	.company {
		font-weight: 500;
		color: var(--primary);
		margin-bottom: 0.5rem;
	}

	p {
		margin-bottom: 1rem;
		line-height: 1.6;
	}

	.achievements {
		margin-bottom: 1rem;
	}

	.achievements h4 {
		font-size: 1rem;
		margin: 0 0 0.5rem 0;
		color: var(--text);
	}

	.achievements ul {
		margin: 0;
		padding-left: 1.5rem;
		list-style-type: none;
	}

	.achievements li {
		margin-bottom: 0.25rem;
		line-height: 1.5;
		position: relative;
		padding-left: 1.5rem;
	}

	.achievements li:before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--primary);
		font-weight: bold;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		background-color: var(--bg-alt);
		color: var(--text-light);
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.75rem;
		border: 1px solid var(--border);
	}

	.skills-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.skills-column h3 {
		margin-bottom: 1rem;
		color: var(--primary);
	}

	.skills-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 0.5rem;
	}

	.skills-list li {
		position: relative;
		padding-left: 1.5rem;
		line-height: 1.6;
	}

	.skills-list li:before {
		content: '•';
		position: absolute;
		left: 0;
		color: var(--primary);
		font-weight: bold;
	}

	@media (max-width: 640px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		.timeline-header {
			flex-direction: column;
			gap: 0.25rem;
		}
	}
</style>
