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

<style>
	.section {
		background-image: linear-gradient(180deg, #a5c79b8c, #fafafa);
	}
</style>
