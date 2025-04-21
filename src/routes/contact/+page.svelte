<script>
	let name = $state('');
	let email = $state('');
	let message = $state('');
	let isSubmitting = $state(false);
	let isSubmitted = $state(false);
	let error = $state('');

	async function sendEmail(email) {
		return fetch(`/api/mail`, {
			method: 'POST',
			body: JSON.stringify(email)
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();

		// Validate form
		if (!name || !email || !message) {
			error = 'Please fill in all fields.';
			return;
		}

		if (!isValidEmail(email)) {
			error = 'Please enter a valid email address.';
			return;
		}

		error = '';
		isSubmitting = true;

		// Simulate form submission
		const resp = await sendEmail({
			name: name,
			email: email,
			message: message
		});
		if (!resp.ok) {
			const errorData = await resp.json();
			console.error('Failed to send email:', errorData);

			error = 'Failed to send message. Please try again later.';
			isSubmitting = false;
			return;
		}

		isSubmitting = false;
		isSubmitted = true;

		// Reset form after submission
		name = '';
		email = '';
		message = '';
	}

	function isValidEmail(email) {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	}
</script>

<svelte:head>
	<title>Contact | Christophe de Carvalho Pereira Martins</title>
	<meta name="description" content="Get in touch with Christophe de Carvalho Pereira Martins, Software Engineer." />
</svelte:head>

<div class="contact-page">
	<h1>Get In Touch</h1>
	<p class="intro">
		Have a question or want to work together? Feel free to reach out using the form below or connect with me on social
		media.
	</p>

	<div class="contact-container">
		<div class="contact-info">
			<div class="info-item">
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
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
						<polyline points="22,6 12,13 2,6"></polyline>
					</svg>
				</div>
				<div class="info-content">
					<h3>Email</h3>
					<p><a href="mailto:contact@cdcpm.dev">contact@cdcpm.dev</a></p>
				</div>
			</div>

			<!-- <div class="info-item">
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
						<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
						<circle cx="12" cy="10" r="3"></circle>
					</svg>
				</div>
				<div class="info-content">
					<h3>Lisboa</h3>
					<p>Portugal, CA</p>
				</div>
			</div> -->

			<div class="social-links">
				<h3>Connect With Me</h3>
				<div class="social-icons">
					<a href="https://github.com/zaibon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
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
							<path
								d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
							></path>
						</svg>
					</a>
					<a
						href="https://www.linkedin.com/in/christophe-de-carvalho-pereira-martins-919504a1/"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					>
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
							<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
							<rect x="2" y="9" width="4" height="12"></rect>
							<circle cx="4" cy="4" r="2"></circle>
						</svg>
					</a>
					<a
						href="https://matrix.to/#/@zaibon:matrix.org"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Matrix"
					>
						<svg width="66" height="28" viewBox="0 0 66 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M0.975097 0.640961V27.359H2.89517V28H0.238281V0H2.89517V0.640961H0.975097Z"
								fill="currentColor"
							/>
							<path
								d="M8.37266 9.11071V10.4628H8.4111C8.7712 9.94812 9.20494 9.54849 9.71306 9.26518C10.2208 8.98235 10.8029 8.84036 11.4586 8.84036C12.0885 8.84036 12.664 8.96298 13.1846 9.2074C13.7054 9.45223 14.1009 9.88336 14.371 10.5015C14.6665 10.0638 15.0683 9.67744 15.5764 9.34266C16.0842 9.00804 16.6852 8.84036 17.3797 8.84036C17.9069 8.84036 18.3953 8.90487 18.8457 9.03365C19.2955 9.16242 19.6812 9.36843 20.0027 9.65166C20.3239 9.93515 20.5746 10.3053 20.755 10.7621C20.9349 11.2196 21.025 11.7698 21.025 12.4139V19.0966H18.2861V13.4373C18.2861 13.1027 18.2734 12.7872 18.2475 12.4908C18.2216 12.1949 18.1512 11.9375 18.0354 11.7183C17.9196 11.4996 17.7491 11.3256 17.5243 11.1967C17.2993 11.0684 16.9938 11.0037 16.6081 11.0037C16.2225 11.0037 15.9106 11.0782 15.6727 11.2257C15.4346 11.374 15.2483 11.5673 15.1134 11.8052C14.9784 12.0438 14.8884 12.314 14.8435 12.6168C14.7982 12.9192 14.7759 13.2252 14.7759 13.5342V19.0966H12.0372V13.4955C12.0372 13.1994 12.0305 12.9063 12.0181 12.6168C12.005 12.3269 11.9506 12.0598 11.8539 11.815C11.7575 11.5706 11.5967 11.374 11.3717 11.2257C11.1467 11.0782 10.8156 11.0037 10.3785 11.0037C10.2497 11.0037 10.0794 11.0327 9.86746 11.0908C9.65528 11.1487 9.44941 11.2584 9.25027 11.4191C9.05071 11.5802 8.88053 11.812 8.73908 12.1143C8.59754 12.4171 8.5269 12.8128 8.5269 13.3021V19.0966H5.78833V9.11071H8.37266Z"
								fill="currentColor"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M23.8596 9.55506C23.4223 9.81286 23.0621 10.1539 22.7794 10.5789C22.4962 11.0036 22.3357 11.5382 22.2974 12.1818H25.036C25.0872 11.6412 25.2676 11.2547 25.5761 11.023C25.8847 10.7912 26.309 10.6752 26.8491 10.6752C27.0931 10.6752 27.3215 10.6917 27.5338 10.7234C27.7458 10.7558 27.9322 10.8202 28.093 10.9167C28.2537 11.0132 28.3823 11.1487 28.4787 11.3224C28.5752 11.4962 28.6233 11.7313 28.6233 12.0273C28.6359 12.3108 28.5523 12.5264 28.3726 12.6745C28.1924 12.8227 27.9483 12.9352 27.6397 13.0124C27.3311 13.0897 26.9774 13.1477 26.5789 13.1864C26.1802 13.225 25.7753 13.2766 25.3638 13.3408C24.9523 13.4056 24.5441 13.4923 24.1392 13.6016C23.734 13.711 23.374 13.8752 23.0592 14.094C22.7437 14.3131 22.4867 14.6059 22.2876 14.9731C22.0879 15.3398 21.9884 15.8067 21.9884 16.3731C21.9884 16.8879 22.0753 17.3326 22.2489 17.706C22.4225 18.0793 22.6635 18.3884 22.9722 18.6327C23.2807 18.8778 23.6406 19.0579 24.0522 19.1739C24.4636 19.2896 24.9072 19.3476 25.3831 19.3476C26.0003 19.3476 26.6046 19.2572 27.1963 19.0774C27.7873 18.897 28.3018 18.5815 28.739 18.1308C28.7517 18.2983 28.7741 18.4625 28.8065 18.6232C28.8385 18.7843 28.8804 18.9418 28.932 19.0965H31.7091C31.5805 18.8906 31.4903 18.5815 31.4393 18.1693C31.3877 17.7573 31.362 17.3264 31.362 16.8751V11.6798C31.362 11.0745 31.227 10.5883 30.957 10.2214C30.6868 9.85459 30.3398 9.56787 29.9155 9.36194C29.4911 9.15619 29.0217 9.0176 28.5074 8.94652C27.9931 8.87594 27.4854 8.84036 26.9838 8.84036C26.431 8.84036 25.8812 8.89531 25.3348 9.00463C24.7882 9.1142 24.2966 9.2976 23.8596 9.55506ZM27.6302 14.5965C27.8293 14.5578 28.0159 14.5096 28.1893 14.4518C28.363 14.3937 28.5076 14.3134 28.6235 14.21V15.2339C28.6235 15.3884 28.6072 15.5944 28.5754 15.8519C28.5431 16.1098 28.4562 16.3636 28.3149 16.6146C28.1732 16.8659 27.9548 17.0817 27.6592 17.2618C27.3632 17.4423 26.9455 17.5322 26.4055 17.5322C26.1868 17.5322 25.9747 17.5129 25.7692 17.4742C25.5632 17.4358 25.3833 17.368 25.2291 17.2715C25.0748 17.175 24.9525 17.0431 24.8625 16.8754C24.7724 16.7084 24.7275 16.502 24.7275 16.2576C24.7275 16.0001 24.7724 15.7876 24.8625 15.6201C24.9525 15.4531 25.0713 15.3145 25.2194 15.205C25.3671 15.0956 25.5407 15.0089 25.7402 14.9441C25.9393 14.88 26.1418 14.828 26.3476 14.7897C26.566 14.7511 26.7846 14.719 27.0034 14.693C27.2219 14.6674 27.4308 14.6352 27.6302 14.5965Z"
								fill="currentColor"
							/>
							<path
								d="M38.5753 9.11176V10.9467H36.5696V15.8914C36.5696 16.3547 36.6467 16.6639 36.8011 16.8183C36.9552 16.9728 37.264 17.05 37.7268 17.05C37.8812 17.05 38.0288 17.0437 38.1704 17.0307C38.3117 17.0181 38.4468 16.9985 38.5753 16.9729V19.0975C38.3439 19.1362 38.0866 19.1618 37.8039 19.1749C37.521 19.1873 37.2446 19.194 36.9746 19.194C36.5503 19.194 36.1484 19.1649 35.7692 19.1069C35.3897 19.0491 35.0555 18.9367 34.7663 18.7691C34.4769 18.602 34.2486 18.3635 34.0816 18.0544C33.9143 17.7457 33.8308 17.3399 33.8308 16.8375V10.9467H32.1722V9.11176H33.8308V6.11795H36.5696V9.11176H38.5753Z"
								fill="currentColor"
							/>
							<path
								d="M42.4905 9.11088V10.9652H42.5291C42.6575 10.6559 42.831 10.3697 43.0498 10.1055C43.2684 9.84179 43.519 9.61625 43.8019 9.42953C44.0845 9.24315 44.3869 9.09824 44.7086 8.99491C45.0297 8.89207 45.3642 8.84036 45.7115 8.84036C45.8914 8.84036 46.0905 8.87278 46.3093 8.93705V11.4868C46.1806 11.4608 46.0263 11.4382 45.8465 11.4191C45.6663 11.3997 45.4928 11.39 45.3256 11.39C44.8242 11.39 44.3999 11.474 44.0529 11.6411C43.7057 11.8086 43.4262 12.0369 43.2139 12.3267C43.0018 12.6166 42.8504 12.9544 42.7605 13.3408C42.6706 13.727 42.6256 14.1457 42.6256 14.5963V19.0966H39.8869V9.11088H42.4905Z"
								fill="currentColor"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M47.467 5.3064V7.56622H50.2059V5.3064H47.467ZM50.2054 19.0974V9.11166H47.4665V19.0974H50.2054Z"
								fill="currentColor"
							/>
							<path
								d="M51.6319 9.1106H54.7563L56.5115 11.7181L58.2473 9.1106H61.2753L57.9966 13.7849L61.6805 19.0964H58.5559L56.4729 15.9482L54.3898 19.0964H51.3235L54.9107 13.843L51.6319 9.1106Z"
								fill="currentColor"
							/>
							<path d="M65.0246 27.359V0.640961H63.1046V0H65.7616V28H63.1046V27.359H65.0246Z" fill="currentColor" />
						</svg>
					</a>
				</div>
			</div>
		</div>

		<div class="contact-form">
			{#if isSubmitted}
				<div class="success-message">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="48"
						height="48"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
						<polyline points="22 4 12 14.01 9 11.01"></polyline>
					</svg>
					<h3>Message Sent!</h3>
					<p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
					<button class="btn" onclick={() => (isSubmitted = false)}>Send Another Message</button>
				</div>
			{:else}
				<form onsubmit={handleSubmit}>
					<div class="form-group">
						<label for="name">Name</label>
						<input type="text" id="name" bind:value={name} placeholder="Your name" disabled={isSubmitting} />
					</div>

					<div class="form-group">
						<label for="email">Email</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							placeholder="Your email address"
							disabled={isSubmitting}
						/>
					</div>

					<div class="form-group">
						<label for="message">Message</label>
						<textarea id="message" bind:value={message} placeholder="Your message" rows="5" disabled={isSubmitting}
						></textarea>
					</div>

					{#if error}
						<div class="error-message">{error}</div>
					{/if}

					<button type="submit" class="submit-btn" disabled={isSubmitting}>
						{#if isSubmitting}
							<span class="spinner"></span>
							Sending...
						{:else}
							Send Message
						{/if}
					</button>
				</form>
			{/if}
		</div>
	</div>
</div>

<style>
	.contact-page {
		max-width: 1000px;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.intro {
		text-align: center;
		max-width: 700px;
		margin: 0 auto 3rem;
		color: var(--text-light);
		line-height: 1.6;
	}

	.contact-container {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 3rem;
		background-color: var(--bg-alt);
		border-radius: 0.5rem;
		overflow: hidden;
		border: 1px solid var(--border);
	}

	.contact-info {
		padding: 2rem;
		background-color: var(--primary);
		color: white;
	}

	.info-item {
		display: flex;
		align-items: flex-start;
		margin-bottom: 2rem;
	}

	.icon {
		margin-right: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
	}

	.info-content h3 {
		margin: 0 0 0.5rem;
		font-size: 1.125rem;
	}

	.info-content p {
		margin: 0;
		opacity: 0.9;
	}

	.info-content a {
		color: white;
		text-decoration: underline;
	}

	.social-links h3 {
		margin: 0 0 1rem;
		font-size: 1.125rem;
	}

	.social-icons {
		display: flex;
		gap: 1rem;
	}

	.social-icons a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background-color: rgba(255, 255, 255, 0.2);
		border-radius: 50%;
		transition: background-color 0.2s;
	}

	.social-icons a:hover {
		background-color: rgba(255, 255, 255, 0.3);
	}

	.contact-form {
		padding: 2rem;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	input,
	textarea {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		background-color: var(--bg);
		color: var(--text);
		font-family: inherit;
		font-size: 1rem;
		transition: border-color 0.2s;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--primary);
	}

	.error-message {
		color: #e53e3e;
		margin-bottom: 1rem;
		font-size: 0.875rem;
	}

	.submit-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 0.75rem 1.5rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: 0.375rem;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.submit-btn:hover:not(:disabled) {
		background-color: var(--primary-dark);
	}

	.submit-btn:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.spinner {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: white;
		animation: spin 1s ease-in-out infinite;
		margin-right: 0.5rem;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.success-message {
		text-align: center;
		padding: 2rem;
	}

	.success-message svg {
		color: var(--primary);
		margin-bottom: 1rem;
	}

	.success-message h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.success-message p {
		margin-bottom: 2rem;
		color: var(--text-light);
	}

	.btn {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: 0.375rem;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.btn:hover {
		background-color: var(--primary-dark);
	}

	@media (max-width: 768px) {
		.contact-container {
			grid-template-columns: 1fr;
		}

		.contact-info {
			padding: 1.5rem;
		}

		.contact-form {
			padding: 1.5rem;
		}
	}
</style>
