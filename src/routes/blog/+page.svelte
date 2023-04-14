<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let selectedTags: string[] = [];
	$: posts = [...data.posts].filter((post) => {
		if (selectedTags.length === 0) {
			return true;
		}
		let t = post.tags.some((tag) => selectedTags.includes(tag));
		return t;
	});

	const toggleTag = (tag: string) => {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	};
</script>

<section class="section">
	<div class="container">
		<h1 class="title">Blog</h1>
		<div class="columns">
			<div class="column is-two-thirds">
				{#each posts as post (post.id)}
					<div class="box">
						<div class="media">
							<div class="media-left">
								<figure class="image is-128x128">
									<img src={post.image} alt={post.title} />
								</figure>
							</div>
							<div class="media-content">
								<div class="content">
									<h2 class="title is-4">{post.title}</h2>
									<p>{post.excerpt}</p>
									<time datetime={post.date.toString()}>{post.date.toLocaleDateString()}</time>
									<span class="vplsit">|</span>
									{#each post.tags as tag}
										<span class="tag">{tag}</span>
									{/each}
									<br />
									<a href="/blog/{post.slug}">Read more</a>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
			<div class="column">
				<aside class="menu">
					<p class="menu-label">Timeline</p>
					<ul class="menu-list">
						{#each Object.entries(data.timeline) as [year, months]}
							<li>
								<p class="menu-label">{year}</p>
								<ul>
									{#each Object.entries(months) as [month, monthPosts]}
										<li>
											<p>{month} ({monthPosts.length})</p>
											<ul>
												{#each monthPosts as post}
													<li>
														<a href="/blog/{post.slug}">{post.title}</a>
													</li>
												{/each}
											</ul>
										</li>
									{/each}
								</ul>
							</li>
						{/each}
					</ul>
					<p class="menu-label">Tags</p>
					{#each Object.entries(data.tagCloud) as [tag, count]}
						<button
							on:click={toggleTag(tag)}
							class="tag is-primary button"
							class:is-inverted={selectedTags.includes(tag)}>{tag} ({count})</button
						>
					{/each}
				</aside>
			</div>
		</div>
	</div>
</section>

<style>
	.vplit {
		margin: 0 2rem;
		color: #5d6d7e;
	}
	.tag {
		margin: 0 0.1rem;
	}
</style>
