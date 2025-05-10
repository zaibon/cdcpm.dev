<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import { messages, connectionStatus, connect, sendMessage, disconnect } from '$lib/services/chatSocket';

	let inputMessage = $state('');
	let isConnected = $derived($connectionStatus == 'connected');
	let isLoading = $state(false);
	let chatContainer: HTMLElement | null = null;
	let isPanelOpen = $state(true); // Start with panel open

	// Simulate connection to LLM
	onMount(() => {
		// Close panel on mobile by default
		if (window.innerWidth < 768) {
			isPanelOpen = false;
		}

		connect();
	});

	// Toggle info panel
	function togglePanel() {
		isPanelOpen = !isPanelOpen;
	}

	function scrollToBottom() {
		requestAnimationFrame(() => {
			if (chatContainer) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}
		});
	}

	// Auto-scroll to bottom when messages change
	$effect(() => {
		if (messages && chatContainer) {
			scrollToBottom();
		}
	});

	// Handle Enter key press
	function handleKeydown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSubmit();
		}
	}

	function handleSubmit() {
		if (inputMessage.trim()) {
			sendMessage(inputMessage);
			inputMessage = '';
			scrollToBottom();
		}
	}

	// Example prompts
	const examplePrompts = [
		'Tell me about your experience with React',
		'What projects have you worked on?',
		'What are your technical skills?',
		'How can I contact you?',
		"What's your background in software development?"
	];

	// Function to use an example prompt
	function useExamplePrompt(prompt: string) {
		inputMessage = prompt;
		// Focus the textarea
		document.querySelector('textarea')?.focus();

		// Close panel on mobile after selecting a prompt
		if (window.innerWidth < 768) {
			isPanelOpen = false;
		}
	}
</script>

<svelte:head>
	<title>Get to know me | Christophe de Carvalho Pereira Martins</title>
	<meta name="description" content="Chat with Christophe's AI assistant" />
</svelte:head>

<div class="chat-page {isPanelOpen ? 'panel-open' : 'panel-closed'}">
	<!-- Info Panel -->
	<div class="info-panel" class:open={isPanelOpen}>
		<div class="panel-content">
			<h2>Chat Assistant</h2>

			<div class="info-section">
				<h3>About</h3>
				<p>
					This chat assistant can help you learn more about my background, skills, projects, and experience. Feel free
					to ask any questions!
				</p>
			</div>

			<div class="info-section">
				<h3>How It Works</h3>
				<p>
					The assistant uses natural language processing to understand your questions and provide relevant information
					about my professional profile.
				</p>
				<p>All conversations are private and not stored beyond this session.</p>
			</div>

			<div class="info-section">
				<h3>Try These Examples</h3>
				<div class="example-prompts">
					{#each examplePrompts as prompt}
						<button class="example-prompt" onclick={() => useExamplePrompt(prompt)}>
							{prompt}
						</button>
					{/each}
				</div>
			</div>
		</div>

		<button class="panel-close-button" onclick={togglePanel} aria-label="Close info panel">
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
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
	</div>

	<!-- Main Chat Container -->
	<div class="chat-container">
		<div class="chat-header">
			<button class="panel-toggle" onclick={togglePanel} aria-label="Toggle info panel">
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
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				</svg>
			</button>

			<h1>Chat Assistant</h1>

			<div class="status-indicator">
				{#if isConnected}
					<span class="status connected">
						<span class="status-dot"></span>
						Connected
					</span>
				{:else}
					<span class="status disconnected">
						<span class="status-dot"></span>
						Connecting...
					</span>
				{/if}
			</div>
		</div>

		<div class="messages-container" bind:this={chatContainer}>
			{#each $messages as message, i (i)}
				<div
					class="message {message.sender === 'user' ? 'user-message' : 'system-message'}"
					in:fly={{ y: 20, duration: 300 }}
				>
					<div class="message-content">
						{message.text}
					</div>
				</div>
			{/each}

			{#if isLoading}
				<div class="message system-message typing" in:fade={{ duration: 200 }}>
					<div class="typing-indicator">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			{/if}
		</div>

		<div class="input-container">
			<textarea
				bind:value={inputMessage}
				onkeydown={handleKeydown}
				placeholder="Type your message here..."
				rows="1"
				disabled={!isConnected || isLoading}
			></textarea>
			<button
				class="send-button"
				onclick={handleSubmit}
				disabled={!inputMessage.trim() || !isConnected || isLoading}
				aria-label="Send message"
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
					<line x1="22" y1="2" x2="11" y2="13"></line>
					<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
				</svg>
			</button>
		</div>
	</div>

	<!-- Overlay for mobile -->
	{#if isPanelOpen}
		<div class="panel-overlay" onclick={togglePanel}></div>
	{/if}
</div>

<style>
	.chat-page {
		display: flex;
		height: calc(100vh - 140px); /* Adjust based on your header/footer height */
		position: relative;
		max-width: 1200px;
		margin: 0 auto;
	}

	/* Panel open/closed states */
	.panel-closed .info-panel {
		width: 0;
		min-width: 0;
		overflow: hidden;
		border-right: none;
	}

	.panel-open .info-panel {
		width: 300px;
		min-width: 300px;
	}

	/* Info Panel */
	.info-panel {
		background-color: var(--bg);
		border-right: 1px solid var(--border);
		border-radius: 0.5rem 0 0 0.5rem;
		overflow-y: auto;
		transition: transform 0.3s ease;
		position: relative;
		z-index: 10;
	}

	.panel-content {
		padding: 1.5rem;
		width: 250px;
	}

	.info-panel h2 {
		font-size: 1.5rem;
		margin: 0 0 1.5rem 0;
		color: var(--primary);
	}

	.info-section {
		margin-bottom: 2rem;
	}

	.info-section h3 {
		font-size: 1.125rem;
		margin: 0 0 0.75rem 0;
		color: var(--text);
	}

	.info-section p {
		margin: 0 0 1rem 0;
		line-height: 1.6;
		color: var(--text-light);
		font-size: 0.95rem;
	}

	.example-prompts {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.example-prompt {
		text-align: left;
		background-color: var(--bg-alt);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.75rem 1rem;
		font-size: 0.875rem;
		color: var(--text);
		cursor: pointer;
		transition: all 0.2s;
	}

	.example-prompt:hover {
		background-color: var(--primary);
		color: white;
		border-color: var(--primary);
	}

	.panel-close-button {
		display: none;
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: none;
		border: none;
		color: var(--text-light);
		cursor: pointer;
		padding: 0.25rem;
	}

	/* Chat Container */
	.chat-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-alt);
		border-radius: 0.5rem;
		overflow: hidden;
		border: 1px solid var(--border);
		border-left: none;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
	}

	.panel-open .chat-container {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-left: none;
	}

	.chat-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		background-color: var(--bg);
		border-bottom: 1px solid var(--border);
	}

	.panel-toggle {
		background: none;
		border: none;
		color: var(--text);
		cursor: pointer;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.2s;
	}

	.panel-toggle:hover {
		color: var(--primary);
	}

	.chat-header h1 {
		font-size: 1.5rem;
		margin: 0;
	}

	.status-indicator {
		display: flex;
		align-items: center;
	}

	.status {
		display: flex;
		align-items: center;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.status-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin-right: 0.5rem;
	}

	.connected {
		color: var(--primary);
	}

	.connected .status-dot {
		background-color: var(--primary);
		box-shadow: 0 0 0 2px rgba(46, 139, 87, 0.2);
		animation: pulse 2s infinite;
	}

	.disconnected {
		color: #e11d48;
	}

	.disconnected .status-dot {
		background-color: #e11d48;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0 rgba(46, 139, 87, 0.4);
		}
		70% {
			box-shadow: 0 0 0 6px rgba(46, 139, 87, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(46, 139, 87, 0);
		}
	}

	.messages-container {
		flex: 1;
		overflow-y: auto;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.message {
		max-width: 80%;
		padding: 0.75rem 1rem;
		border-radius: 0.75rem;
		animation: fadeIn 0.3s ease;
	}

	.user-message {
		align-self: flex-end;
		background-color: var(--primary);
		color: white;
		border-bottom-right-radius: 0.25rem;
	}

	.system-message {
		align-self: flex-start;
		background-color: var(--bg);
		color: var(--text);
		border: 1px solid var(--border);
		border-bottom-left-radius: 0.25rem;
	}

	.message-content {
		line-height: 1.5;
		word-break: break-word;
	}

	.typing {
		padding: 0.75rem 1rem;
	}

	.typing-indicator {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.typing-indicator span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--text-light);
		animation: bounce 1.4s infinite ease-in-out;
	}

	.typing-indicator span:nth-child(1) {
		animation-delay: 0s;
	}

	.typing-indicator span:nth-child(2) {
		animation-delay: 0.2s;
	}

	.typing-indicator span:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-6px);
		}
	}

	.input-container {
		display: flex;
		align-items: flex-end;
		gap: 0.75rem;
		padding: 1rem 1.5rem;
		background-color: var(--bg);
		border-top: 1px solid var(--border);
	}

	textarea {
		flex: 1;
		padding: 0.75rem 1rem;
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		background-color: var(--bg);
		color: var(--text);
		font-family: inherit;
		font-size: 1rem;
		resize: none;
		max-height: 120px;
		overflow-y: auto;
		transition: border-color 0.2s;
	}

	textarea:focus {
		outline: none;
		border-color: var(--primary);
	}

	.send-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background-color: var(--primary);
		color: white;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.send-button:hover:not(:disabled) {
		background-color: var(--primary-dark);
	}

	.send-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.panel-overlay {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 5;
	}

	/* Mobile Styles */
	@media (max-width: 768px) {
		.chat-page {
			height: calc(100vh - 120px);
		}

		.panel-closed .info-panel,
		.panel-open .info-panel {
			width: 280px;
			min-width: 280px;
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 280px;
			transform: translateX(-100%);
			z-index: 100;
			border-radius: 0;
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		}

		.panel-closed .info-panel {
			transform: translateX(-100%);
		}

		.panel-open .info-panel {
			transform: translateX(0);
		}

		.panel-close-button {
			display: block;
		}

		.chat-container {
			border-radius: 0.5rem;
			border-left: 1px solid var(--border);
		}

		.panel-open .chat-container {
			border-top-left-radius: 0.5rem;
			border-bottom-left-radius: 0.5rem;
		}

		.message {
			max-width: 90%;
		}

		.panel-overlay {
			display: block;
		}
	}
</style>
