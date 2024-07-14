<script lang="ts">
	import InfiniteScroll from 'svelte-infinite-scroll';
	import type { Project } from '$lib/types';
	import ProjectCard from './ProjectCard.svelte';
	import { fade } from 'svelte/transition';

	export let title: string = 'Projects';
	export let projects: Project[];
	export let nextPage: string = '';

	async function fetchData() {
		encodeURI;
		const response = await fetch(`/projects?count=12&nextPage=${encodeURIComponent(nextPage)}`);
		const { projects: newBatch, nextPage: np } = await response.json();
		nextPage = np;

		projects = [...projects, ...newBatch];
	}
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
		<InfiniteScroll hasMore={nextPage != ''} threshold={100} window={true} on:loadMore={() => fetchData()} />
	</button>
</div>
