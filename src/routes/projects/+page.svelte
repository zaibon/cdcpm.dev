<script lang="ts">
	import Projects from '../../components/Projects.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>{data.headers.title} - List of projects</title>
</svelte:head>

<Projects projects={data.projects ?? []} nextPage={data.nextPage ?? ''} />
