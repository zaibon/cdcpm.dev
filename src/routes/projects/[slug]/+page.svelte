<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import type { PageData } from './$types';
	export let data: PageData;

	const links = [
		{
			target: data.repo?.html_url,
			name: 'Github'
		}
	];
</script>

<svelte:head>
	<title>{data.headers.title} - Project - {data.repo?.name}</title>
</svelte:head>

<section class="section">
	<div class="container">
		<nav class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li><a href="/projects" class="has-text-grey">Projects</a></li>
				<li class="is-active">
					<a href="/project/{data.repo?.name}" aria-current="page">{data.repo?.name}</a>
				</li>
			</ul>
		</nav>

		<div class="columns">
			<div class="column is-10">
				<p class="content">
					{#if data.readme}
						<SvelteMarkdown source={data.readme} />
					{:else}
						{data.repo?.description}
					{/if}
				</p>
			</div>
			<div class="column is-2">
				{#each links || [] as link}
					<a href={link.target} target="_blank" rel="noopener noreferrer">
						<span class="icon is-medium" style="color:black">
							<i class="fab fa-github"></i>
						</span>
						{link.name}
					</a>
				{/each}

				<hr />

				<p>
					<span class="icon-text is-large">
						<i class="fas fa-star" />
					</span>
					<span>Star {data.repo?.stargazers_count}</span>
				</p>
				<p>
					<span class="icon-text is-large">
						<i class="fa-solid fa-circle-exclamation"></i>
					</span>
					<span>Issues {data.repo?.open_issues_count}</span>
				</p>
				<p>
					<span class="icon-text is-large">
						<i class="fa-solid fa-code-fork"></i>
					</span>
					<span>Forks {data.repo?.forks_count}</span>
				</p>
			</div>
		</div>
	</div>
</section>
