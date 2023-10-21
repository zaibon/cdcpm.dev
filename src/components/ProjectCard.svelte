<script lang="ts">
	import type { Project } from '$lib/types';
	import { ellipses } from '$lib/strings';

	export let project: Project;
	let detail: { name: string; target: string };
	let description: string;
	$: {
		detail = {
			target: project.repo.html_url,
			name: 'Home page'
		};
		description = ellipses(project.repo.description, 250);
	}
</script>

<div class="card">
	<div class="card-content">
		<h4 class="title is-4">
			{project.repo.name}
		</h4>
		<p class="content">
			{description}
		</p>
	</div>
	<footer class="card-footer">
		<div class="card-footer-item">
			<a href={detail?.target}>GitHub</a>
			<span class="icon-text ml-5">
				<span class="stars">{project.repo.stargazers_count}</span>
				<span class="icon is-small">
					<i class="fas fa-star" />
				</span>
			</span>
		</div>
		<a href="/projects/{project.repo.name}" class="card-footer-item">Details</a>
	</footer>
</div>

<style>
	.stars {
		line-height: 1;
	}
</style>
