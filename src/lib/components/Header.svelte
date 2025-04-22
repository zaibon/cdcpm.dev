<script>
	let { darkMode, toggleDarkMode, currentPath } = $props();

	let menuOpen = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	const navItems = [
		{ path: '/', label: 'Home' },
		{ path: '/cv', label: 'CV' },
		{ path: '/projects', label: 'Projects' },
		{ path: '/contact', label: 'Contact' }
	];
</script>

<header>
	<div class="container">
		<div class="logo">
			<a href="/">
				<span class="name">Christophe de Carvalho Pereira Martins</span>
				<span class="title">Software Engineer</span>
			</a>
		</div>

		<button class="menu-toggle" aria-label="Toggle menu" onclick={toggleMenu}>
			<span class="bar"></span>
			<span class="bar"></span>
			<span class="bar"></span>
		</button>

		<nav class:open={menuOpen}>
			<ul>
				{#each navItems as { path, label }}
					<li>
						<a href={path} class:active={currentPath === path}>{label}</a>
					</li>
				{/each}
				<li>
					<button class="theme-toggle" onclick={toggleDarkMode} aria-label="Toggle dark mode">
						{#if darkMode}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="5"></circle>
								<line x1="12" y1="1" x2="12" y2="3"></line>
								<line x1="12" y1="21" x2="12" y2="23"></line>
								<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
								<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
								<line x1="1" y1="12" x2="3" y2="12"></line>
								<line x1="21" y1="12" x2="23" y2="12"></line>
								<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
								<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
							</svg>
						{:else}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
							</svg>
						{/if}
					</button>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
	header {
		background-color: var(--bg);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	}

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.logo a {
		display: flex;
		flex-direction: column;
		color: var(--text);
		text-decoration: none;
	}

	.name {
		font-weight: 700;
		font-size: 1.25rem;
	}

	.title {
		font-size: 0.875rem;
		color: var(--text-light);
	}

	nav {
		display: flex;
	}

	ul {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		gap: 1.5rem;
		align-items: center;
	}

	nav a {
		color: var(--text);
		font-weight: 500;
		padding: 0.5rem 0;
		position: relative;
	}

	nav a:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 0;
		height: 2px;
		background-color: var(--primary);
		transition: width 0.3s;
	}

	nav a:hover:after,
	nav a.active:after {
		width: 100%;
	}

	.theme-toggle {
		background: none;
		border: none;
		color: var(--text);
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background-color 0.2s;
	}

	.theme-toggle:hover {
		background-color: var(--bg-alt);
	}

	.menu-toggle {
		display: none;
		flex-direction: column;
		justify-content: space-between;
		width: 30px;
		height: 21px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 10;
	}

	.bar {
		height: 3px;
		width: 100%;
		background-color: var(--text);
		border-radius: 10px;
		transition: all 0.3s;
	}

	@media (max-width: 768px) {
		.menu-toggle {
			display: flex;
		}

		nav {
			position: fixed;
			top: 0;
			right: -100%;
			width: 70%;
			height: 100vh;
			background-color: var(--bg);
			box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
			transition: right 0.3s ease;
			padding: 5rem 2rem 2rem;
			box-sizing: border-box;
		}

		nav.open {
			right: 0;
		}

		ul {
			flex-direction: column;
			align-items: flex-start;
			width: 100%;
		}

		nav a {
			display: block;
			width: 100%;
			padding: 1rem 0;
		}
	}
</style>
