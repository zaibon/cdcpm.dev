<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Comment } from '$lib/types';
	const dispatch = createEventDispatcher();

	export let comments: Comment[] = [];
	let newComment = '';
	const addComment = () => {
		if (newComment === '') return;

		dispatch('addComment', {
			comment: newComment
		});
		newComment = '';
	};
</script>

<section class="section">
	<div class="container">
		<h2 class="subtitle">Comments</h2>

		{#each comments as comment}
			<article class="media">
				<figure class="media-left">
					<p class="image is-64x64">
						<img src="https://via.placeholder.com/64" alt="Placeholder image" />
					</p>
				</figure>
				<div class="media-content">
					<div class="content">
						<p>
							<strong>{comment.author}</strong>
							<br />
							{comment.content}
							<br />
							<small>{new Date(comment.date).toLocaleString()}</small>
						</p>
					</div>
				</div>
			</article>
		{/each}

		<h2 class="subtitle">Leave a comment</h2>
		<div class="field">
			<div class="control">
				<textarea
					class="textarea"
					placeholder="Write your comment here..."
					bind:value={newComment}
				/>
			</div>
		</div>
		<div class="field">
			<div class="control">
				<button class="button is-primary" on:click={addComment}> Submit </button>
			</div>
		</div>
	</div>
</section>
