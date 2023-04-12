<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	const image = data.project.image.startsWith('http')
		? data.project.image
		: `/images/${data.project.image}`;
</script>

<section class="section">
	<div class="container">
		<nav class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li><a href="/projects">Projects</a></li>
				<li class="is-active"><a href="#" aria-current="page">{data.project.title}</a></li>
			</ul>
		</nav>

		<h1 class="title">{data.project.title}</h1>
		<div class="columns">
			<div class="column is-one-third">
				<figure class="image is-square m-auto">
					<img src={image} alt="{data.project.title} image" />
				</figure>
			</div>
			<div class="column is-two-thirds">
				<h2 class="subtitle">Description</h2>
				<p class="content">{data.project.description}</p>
				<h2 class="subtitle">Links</h2>
				{#each data.project.links as link}
					<p>
						<a href={link.target} alt={link.name} target="_blank" rel="noopener noreferrer"
							>{link.name}</a
						>
					</p>
				{/each}
			</div>
		</div>
	</div>
</section>
