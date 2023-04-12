<script lang="ts">
	import type { Project } from '$lib/types';
	import { ellipses } from '$lib/strings';

	export let project: Project;
	const detail = project.links.find((link) => link.name === 'Github');
	const image = project.image.startsWith('http') ? project.image : `/images/${project.image}`;
	const description = ellipses(project.description, 250);
</script>

<div class="column is-one-third">
	<div class="card">
		<div class="card-image">
			<figure class="image is-4by3">
				<img src={image} alt={project.title} />
			</figure>
		</div>
		<div class="card-content">
			<h4 class="title is-4">{project.title}</h4>
			<p class="content">
				{description}
			</p>
		</div>
		<footer class="card-footer">
			<a href={detail?.target} class="card-footer-item">GitHub</a>
			<a href="/projects/{project.title}" class="card-footer-item">Details</a>
		</footer>
	</div>
</div>
