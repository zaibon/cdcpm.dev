<script>
	let isMenuActive = false;

	function toggleMenu() {
		isMenuActive = !isMenuActive;
	}
</script>

<nav class="navbar" aria-label="main navigation">
	<div class="navbar-brand">
		<a class="navbar-item" href="/"> About me </a>

		<button
			class="navbar-burger"
			data-target="navbarBasicExample"
			on:click={toggleMenu}
			class:is-active={isMenuActive}
		>
			<span />
			<span />
			<span />
		</button>
	</div>

	<div id="navbarBasicExample" class="navbar-menu" class:is-active={isMenuActive}>
		<div class="navbar-start">
			<a class="navbar-item" href="/resume"> Resume </a>
			<a class="navbar-item" href="/projects"> Projects </a>
			<a class="navbar-item" href="/blog"> Blog </a>
			<!-- <a class="navbar-item" href="/contact"> Contact </a> -->
		</div>
	</div>
	<div class="navbar-end">
		<!-- navbar items -->
	</div>
</nav>

<style>
	.navbar-item {
		font-weight: bold;
	}
</style>
