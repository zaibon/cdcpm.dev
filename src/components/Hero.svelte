<script lang="ts">
	import type { Profile } from '$lib/types';
	export let profile: Profile;
</script>

<section class="hero is-small">
	<div class="hero-body">
		<div class="container">
			<div class="columns">
				<div class="column is-half">
					<div class="is-flex is-flex-direction-row">
						<figure class="image profile">
							<img alt="profil" src="/images/profile.jpg" class="is-rounded" />
						</figure>

						<h1 class="title">{profile.firstName}<br />{profile.lastName}</h1>
					</div>
				</div>
				<div class="column is-half">
					<h2 class="title">{profile.title}</h2>
					<p>
						{profile.introduction}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.profile {
		width: 200px;
		height: 200px;
		margin-right: 2rem;
	}
</style>
