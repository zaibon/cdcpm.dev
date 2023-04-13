<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.headers.title} - Resume / CV</title>
</svelte:head>

<section class="section">
	<div class="container">
		<h1 class="title">Resume</h1>
		<div class="columns">
			<div class="column">
				<h2 class="subtitle">Experience</h2>
				{#each data.experience as experience}
					<div class="content">
						<h3>{experience.job}</h3>
						<p><em>{experience.company}</em>, {experience.start} - {experience.end}</p>
						<p>{experience.description}</p>
						<ul>
							{#each experience.responsibilities as responsibility}
								<li>{responsibility}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
			<div class="column">
				<h2 class="subtitle">Education</h2>
				{#each data.education as education}
					<div class="content">
						<h3>{education.degree}</h3>
						<p>{education.school}, {education.graduation}</p>
					</div>
				{/each}

				<h2 class="subtitle">Skills</h2>
				<div class="content">
					{#each Object.entries(data.skills) as [title, items]}
						<p class="subtitle">{title}</p>
						<ul>
							{#each items as item}
								<li>{item.name}</li>
							{/each}
						</ul>
					{/each}
				</div>

				<h2 class="subtitle">Certifications</h2>
				<div class="content">
					<ul>
						{#each data.certifications as certification}
							<li>{certification.name} - {certification.issuer}</li>
						{/each}
					</ul>
				</div>

				<h2 class="subtitle">Language</h2>
				<div class="content">
					<ul>
						{#each data.languages as language}
							<li>{language.name} - {language.level}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.title {
		margin-bottom: 1.5rem;
		color: #7aa385;
	}
	.subtitle {
		margin-bottom: 1rem;
		color: var(--color-secondary);
	}
	.content {
		margin-bottom: 1.5rem;
		border-left: 4px solid rgba(163, 217, 177, 0.6);
		padding-left: 1rem;
	}
	.content h3 {
		margin-bottom: 0.5rem;
		color: #5d6d7e;
	}
	.content em {
		font-style: normal;
		font-weight: bold;
	}
</style>
