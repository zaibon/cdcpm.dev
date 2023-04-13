<script lang="ts">
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import { socialMeta as data } from '$lib/data/social';
</script>

<svelte:head>
	<!-- Open Graph meta tags -->
	<meta property="og:title" content={data.title} />
	<meta property="og:description" content={data.description} />
	<meta property="og:image" content={data.image} />
	<meta property="og:url" content={data.siteURL} />
	<meta property="og:type" content="website" />

	<!-- Twitter Card meta tags -->
	<meta name="twitter:card" content={data.description} />
	<meta name="twitter:title" content={data.title} />
	<meta name="twitter:description" content={data.description} />
	<meta name="twitter:image" content={data.image} />
	<meta name="twitter:site" content={data.twitterHandler} />
</svelte:head>

<Navbar />
<slot />
<Footer />
