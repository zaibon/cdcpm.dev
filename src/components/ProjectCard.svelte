<script lang="ts">
	import type { Project } from '$lib/types';
	import { ellipses } from '$lib/strings';
	import { link } from '$lib/images';

	export let project: Project;
	const detail = project.links.find((link) => link.name === 'Github');
	let image = link(project.image);
	const description = ellipses(project.description, 250);
</script>

<div class="column is-one-third">
	<div class="card">
		{#if image}
			<div class="card-image">
				<figure class="image is-4by3">
					<img src={image} alt={project.title} />
				</figure>
			</div>
		{/if}
		<div class="card-content">
			<h4 class="title is-4">
				{project.title}
			</h4>
			<p class="content">
				{description}
			</p>
		</div>
		<footer class="card-footer">
			<div class="card-footer-item">
				<a href={detail?.target}>GitHub</a>
				<span class="icon-text ml-5">
					<span class="stars">{project.stars}</span>
					<span class="icon is-small">
						<i class="fas fa-star" />
					</span>
				</span>
			</div>
			<a href="/projects/{project.title}" class="card-footer-item">Details</a>
		</footer>
	</div>
</div>

<style>
	.stars {
		line-height: 1;
	}
</style>
