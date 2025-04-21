<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let darkMode = $state(false);
	let mounted = $state(false);

	onMount(() => {
		// Check for dark mode preference in localStorage or system preference
		darkMode = localStorage.getItem('darkMode') === 'true' || window.matchMedia('(prefers-color-scheme: dark)').matches;
		mounted = true;
	});

	$effect(() => {
		if (mounted) {
			localStorage.setItem('darkMode', darkMode);
			if (darkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
	}
</script>

<div class="app {darkMode ? 'dark' : 'light'}">
	<Header {darkMode} {toggleDarkMode} currentPath={$page.url.pathname} />

	<main transition:fade={{ duration: 200 }}>
		<slot />
	</main>

	<Footer />
</div>

<style>
	:global(:root) {
		--primary: #06b6d4;
		--primary-dark: #0891b2;
		--text: #1e293b;
		--text-light: #64748b;
		--bg: #ffffff;
		--bg-alt: #f8fafc;
		--border: #e2e8f0;

		font-family:
			'Inter',
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;
	}

	:global(.dark) {
		--primary: #22d3ee;
		--primary-dark: #06b6d4;
		--text: #f1f5f9;
		--text-light: #94a3b8;
		--bg: #0f172a;
		--bg-alt: #1e293b;
		--border: #334155;
	}

	:global(body) {
		margin: 0;
		padding: 0;
		background-color: var(--bg);
		color: var(--text);
		transition:
			background-color 0.3s,
			color 0.3s;
	}

	:global(a) {
		color: var(--primary);
		text-decoration: none;
		transition: color 0.2s;
	}

	:global(a:hover) {
		color: var(--primary-dark);
	}

	:global(button) {
		cursor: pointer;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		margin-top: 0;
		font-weight: 700;
		line-height: 1.2;
	}

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		padding: 2rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
	}

	@media (min-width: 768px) {
		main {
			padding: 3rem 2rem;
		}
	}
</style>
