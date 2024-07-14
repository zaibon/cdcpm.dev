<script lang="ts">
	import { reduceSkills } from '$lib/map';
	import type { Skill } from '$lib/types';

	export let skills: Skill[];

	const sortPerItems = (skills: Skill[]) => {
		return new Map([...reduceSkills(skills).entries()].sort((a, b) => b[1].length - a[1].length));
	};
	const data = sortPerItems(skills);
</script>

<section class="section">
	<div class="container">
		<h3 class="title is-3">Skills</h3>
		<div class="columns is-multiline">
			{#each [...data] as [title, items]}
				<div class="column is-one-fifth">
					<div class="box">
						<h4 class="title is-4">{title}</h4>
						<ul>
							{#each items as item}
								<li>
									<span class="icon-text"><span class="icon"><i class={item.icon} /></span> {item.name}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
