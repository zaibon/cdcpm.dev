<script lang="ts">
	import type { Project } from '$lib/types';
	import ProjectCard from './ProjectCard.svelte';

	export let title: string = 'Projects';
	export let projects: Project[];
</script>

<section class="section">
	<div class="container">
		<h3 class="title is-3">{title}</h3>
		<div class="columns is-multiline">
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>

<div class="columns is-mobile is-centered mt-3">
	<button class="button is-large is-responsive is-rounded">
		<span class="icon is-medium">
			<i class="fab fa-github"></i>
		</span>
		<a href="https://github.com/zaibon" target="_blank">Explore all projects on Github</a>
	</button>
</div>
