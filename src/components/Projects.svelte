<script lang="ts">
	import type { Project } from '$lib/types';
	import { onMount } from 'svelte';

	import ProjectCard from './ProjectCard.svelte';
	import { fade } from 'svelte/transition';

	export let title: string = 'Projects';
	export let count: number;
	let projects: Project[] = [];

	async function loadProjects() {
		const response = await fetch(`/projects?count=${count}`);
		projects = (await response.json()) as Project[];
	}
	onMount(loadProjects);
</script>

<section class="section">
	<div class="container">
		<h3 class="title is-3">{title}</h3>
		<div class="columns is-multiline">
			{#each projects as project}
				<div class="column is-one-third" transition:fade>
					<ProjectCard {project} />
				</div>
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
