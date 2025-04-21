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
					<img src="/images/profile.jpg" alt="Christophe" />
				</div>
			</div>
		</div>
	{/if}
</section>

<!-- <section class="skills">
	<h2>What I Do</h2>
	<div class="skills-grid">
		<div class="skill-card">
			<div class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<polyline points="16 18 22 12 16 6"></polyline>
					<polyline points="8 6 2 12 8 18"></polyline>
				</svg>
			</div>
			<h3>Web Development</h3>
			<p>Building responsive and performant web applications with modern frameworks and best practices.</p>
		</div>
		<div class="skill-card">
			<div class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
					<line x1="8" y1="21" x2="16" y2="21"></line>
					<line x1="12" y1="17" x2="12" y2="21"></line>
				</svg>
			</div>
			<h3>Frontend Development</h3>
			<p>Creating intuitive user interfaces with attention to detail, accessibility, and user experience.</p>
		</div>
		<div class="skill-card">
			<div class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M12 2L2 7l10 5 10-5-10-5z"></path>
					<path d="M2 17l10 5 10-5"></path>
					<path d="M2 12l10 5 10-5"></path>
				</svg>
			</div>
			<h3>Backend Development</h3>
			<p>Designing and implementing robust APIs, databases, and server-side applications.</p>
		</div>
	</div>
</section> -->

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

	.skills {
		padding: 4rem 0;
	}

	.skills h2 {
		text-align: center;
		margin-bottom: 3rem;
		font-size: 2rem;
	}

	.skills-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.skill-card {
		background-color: var(--bg-alt);
		border-radius: 0.5rem;
		padding: 2rem;
		transition:
			transform 0.3s,
			box-shadow 0.3s;
		border: 1px solid var(--border);
	}

	.skill-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	}

	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 50px;
		height: 50px;
		background-color: var(--primary);
		color: white;
		border-radius: 50%;
		margin-bottom: 1.5rem;
	}

	.skill-card h3 {
		font-size: 1.25rem;
		margin-bottom: 1rem;
	}

	.skill-card p {
		font-size: 1rem;
		margin-bottom: 0;
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
