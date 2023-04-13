<script lang="ts">
	import { link } from '$lib/images';
	import type { PageData } from './$types';
	export let data: PageData;

	const project = data;
	const image = link(project.image);
</script>

<section class="section">
	<div class="container">
		<nav class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li><a href="/projects">Projects</a></li>
				<li class="is-active">
					<a href="/project/{project.title}" aria-current="page">{project.title}</a>
				</li>
			</ul>
		</nav>

		<h1 class="title">{project.title}</h1>
		<div class="columns">
			{#if image}
				<div class="column is-one-third">
					<figure class="image is-square m-auto">
						<img src={image} alt="{project.title} image" />
					</figure>
				</div>
			{/if}
			<div class="column is-two-thirds">
				<h2 class="subtitle">Description</h2>
				<p class="content">{project.description}</p>
				<h2 class="subtitle">Links</h2>
				{#each project.links || [] as link}
					<p>
						<a href={link.target} target="_blank" rel="noopener noreferrer">{link.name}</a>
					</p>
				{/each}
			</div>
		</div>
	</div>
</section>
