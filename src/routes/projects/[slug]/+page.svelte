<script>
	// Replace with the actual project information
	let project = {
		title: 'Project 1',
		description: 'Detailed description of Project 1...',
		image: 'path/to/project1-image.jpg',
		github: 'https://github.com/username/project1',
		demo: 'https://project1-demo.com'
	};
</script>

<section class="section">
	<div class="container">
		<h1 class="title">{project.title}</h1>
		<div class="columns">
			<div class="column is-two-thirds">
				<figure class="image is-16by9">
					<img src={project.image} alt="{project.title} image" />
				</figure>
			</div>
			<div class="column">
				<h2 class="subtitle">Description</h2>
				<p class="content">{project.description}</p>
				<h2 class="subtitle">Links</h2>
				<p>
					<a href={project.github} target="_blank" rel="noopener noreferrer">GitHub Repository</a>
				</p>
				<p>
					<a href={project.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>
				</p>
			</div>
		</div>
	</div>
</section>
