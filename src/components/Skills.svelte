<script lang="ts">
	import type { Skill } from '$lib/types';

	export let skills: Skill[];

	$: data = skills.reduce((acc, curr) => {
		const { category, ...rest } = curr;
		if (acc[category]) {
			acc[category].push(rest);
		} else {
			acc[category] = [rest];
		}
		return acc;
	}, {});
</script>

<section class="section">
	<div class="container">
		<h3 class="title is-3">Skills</h3>
		<div class="columns is-multiline">
			{#each Object.entries(data) as [title, items]}
				<div class="column is-one-third">
					<div class="box">
						<h4 class="title is-4">{title}</h4>
						<ul>
							{#each items as item}
								<li>
									<span class="icon-text"
										><span class="icon"><i class={item.icon} /></span> {item.name}</span
									>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
