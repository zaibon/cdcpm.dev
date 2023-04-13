<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let name = '';
	let email = '';
	let message = '';

	function handleSubmit() {
		// Handle form submission logic
		console.log({ name, email, message });
	}
</script>

<svelte:head>
	<title>{data.headers.title} - Contact form</title>
</svelte:head>

<section class="section">
	<div class="container">
		<h1 class="title">Contact</h1>
		<form on:submit|preventDefault={handleSubmit}>
			<div class="field">
				<label class="label" for="name">Name</label>
				<div class="control" id="name">
					<input class="input" type="text" placeholder="Your name" bind:value={name} required />
				</div>
			</div>
			<div class="field">
				<label class="label" for="email">Email</label>
				<div class="control" id="email">
					<input class="input" type="email" placeholder="Your email" bind:value={email} required />
				</div>
			</div>
			<div class="field">
				<label class="label" for="message">Message</label>
				<div class="control" id="message">
					<textarea class="textarea" placeholder="Your message" bind:value={message} required />
				</div>
			</div>
			<div class="field">
				<div class="control">
					<button class="button is-link" type="submit">Submit</button>
				</div>
			</div>
		</form>
	</div>
</section>
