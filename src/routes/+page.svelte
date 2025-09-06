<script>
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	function yearsOfExperience() {
		const now = new Date();
		const start = new Date(2014, 11, 1);
		return Math.abs(start.getFullYear() - now.getFullYear());
	}

	let visible = $state(false);

	onMount(() => {
		visible = true;
	});
</script>

<svelte:head>
	<title>Christophe de Carvalho Pereira Martins | Software Engineer</title>
	<meta
		name="description"
		content="Portfolio of Christophe de Carvalho Pereira Martins, Software Engineer specializing in backend development, system design and problem solving."
	/>
</svelte:head>

<section class="hero">
	{#if visible}
		<div class="content" in:fade={{ duration: 500, delay: 200 }}>
			<div class="text">
				<h1 in:fly={{ y: 20, duration: 800, delay: 300 }}>Hi, I'm Christophe</h1>
				<h2 in:fly={{ y: 20, duration: 800, delay: 500 }}>Software Engineer & Problem Solver</h2>
				<p in:fly={{ y: 20, duration: 800, delay: 700 }}>
					Software Engineer with {yearsOfExperience()} years of experience in designing and developing scalable and efficient
					software solutions across diverse industries.<br />
					I am passionate about leveraging technology to create innovative solutions that make a positive impact on the world.
				</p>
				<div class="cta-buttons" in:fly={{ y: 20, duration: 800, delay: 900 }}>
					<a href="/projects" class="btn primary">View My Work</a>
					<a href="/contact" class="btn secondary">Get In Touch</a>
				</div>
			</div>
			<div class="image" in:fade={{ duration: 1000, delay: 300 }}>
				<div class="profile-image">
					<img src="/images/profile.webp" alt="Christophe" />
				</div>
			</div>
		</div>
	{/if}
</section>

<style>
	.hero {
		min-height: calc(100vh - 200px);
		display: flex;
		align-items: center;
		padding: 2rem 0;
	}

	.content {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.text {
		flex: 1;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 0.5rem;
		color: var(--text);
	}

	h2 {
		font-size: 1.5rem;
		color: var(--primary);
		margin-bottom: 1.5rem;
		font-weight: 600;
	}

	p {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--text-light);
		margin-bottom: 2rem;
		max-width: 600px;
	}

	.cta-buttons {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: 0.375rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	.btn.primary {
		background-color: var(--primary);
		color: white;
	}

	.btn.primary:hover {
		background-color: var(--primary-dark);
	}

	.btn.secondary {
		background-color: transparent;
		border: 1px solid var(--border);
		color: var(--text);
	}

	.btn.secondary:hover {
		background-color: var(--bg-alt);
	}

	.image {
		flex: 1;
		display: flex;
		justify-content: center;
	}

	.profile-image {
		width: 300px;
		height: 300px;
		border-radius: 50%;
		overflow: hidden;
		border: 4px solid var(--primary);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	}

	.profile-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 768px) {
		.content {
			flex-direction: column-reverse;
			text-align: center;
		}

		.text {
			margin-top: 2rem;
		}

		p {
			margin-left: auto;
			margin-right: auto;
		}

		.cta-buttons {
			justify-content: center;
		}

		h1 {
			font-size: 2.5rem;
		}

		.profile-image {
			width: 250px;
			height: 250px;
		}
	}
</style>
