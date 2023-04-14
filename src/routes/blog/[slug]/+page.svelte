<script lang="ts">
	import type { PageData } from './$types';
	import type { Comment } from '$lib/types';
	import Comments from '../../../components/comments.svelte';
	export let data: PageData;

	$: addComment = (event: { detail: { comment: string } }) => {
		if (event.detail.comment === '') return;

		data.comments = [
			...data.comments,
			{
				id: 'uuid1',
				email: '',
				author: 'Anonymous',
				content: event.detail.comment,
				date: new Date()
			}
		];
	};
</script>

<section class="section">
	<nav class="breadcrumb" aria-label="breadcrumbs">
		<ul>
			<li><a href="/blog">Posts</a></li>
			<li class="is-active">
				<a href="/blog/{data.slug}" aria-current="page">{data.title}</a>
			</li>
		</ul>
	</nav>
	<div class="container">
		<h1 class="title">{data.title}</h1>
		<p class="subtitle">{data.date?.toLocaleString()}</p>

		<div class="tags">
			{#each data.tags || [] as tag}
				<span class="tag">{tag}</span>
			{/each}
		</div>

		<div class="content">{@html data.content}</div>
	</div>

	<Comments comments={data.comments || []} on:addComment={addComment} />
</section>
