<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	import Hero from '../components/Hero.svelte';
	import Projects from '../components/Projects.svelte';
	import Skills from '../components/Skills.svelte';
</script>

<Hero profile={data.profile} />
<Skills skills={data.skills} />
<Projects projects={data.projects} title="Featured projects" />
