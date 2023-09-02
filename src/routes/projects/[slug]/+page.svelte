<script lang="ts">
	import { link } from '$lib/images';
	import type { PageData } from './$types';
	export let data: PageData;

	const image = link(data.image);
</script>

<svelte:head>
	<title>{data.headers.title} - Project - {data.title}</title>
</svelte:head>

<section class="section">
	<div class="container">
		<nav class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li><a href="/projects">Projects</a></li>
				<li class="is-active">
					<a href="/project/{data.title}" aria-current="page">{data.title}</a>
				</li>
			</ul>
		</nav>

		<h1 class="title">{data.title}</h1>
		<div class="columns">
			{#if image}
				<div class="column is-one-third">
					<figure class="image is-square m-auto">
						<img src={image} alt="{data.title} image" />
					</figure>
				</div>
			{/if}
			<div class="column is-two-thirds">
				<p class="content">{data.description}</p>
				<h2 class="subtitle">Links</h2>
				{#each data.links || [] as link}
					<p>
						<a href={link.target} target="_blank" rel="noopener noreferrer">
							<span class="icon is-medium" style="color:black">
								<i class="fab fa-github"></i>
							</span>
							{link.name}
						</a>
					</p>
				{/each}
			</div>
		</div>
	</div>
</section>
