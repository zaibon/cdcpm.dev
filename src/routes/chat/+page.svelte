<script lang="ts">
	import { onMount } from 'svelte'; // Modified import
	import { fade, fly } from 'svelte/transition';
	import { messages, connectionStatus, connect, sendMessage } from '$lib/services/chatSocket';
	import { marked } from 'marked';

	let inputMessage = $state('');
	let isConnected = $derived($connectionStatus == 'connected');
	let isLoading = $state(false);
	let chatContainer: HTMLElement | null = null;
	let textarea: HTMLTextAreaElement | null = null;
	let isPanelOpen = $state(true); // Start with panel closed

	// Simulate connection to LLM
	onMount(() => {
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
				textarea?.focus();
			}
		});
	}

	// Auto-scroll to bottom when messages change
	$effect(() => {
		if ($messages && chatContainer) {
			scrollToBottom();
			if ($messages[$messages.length - 1]?.sender === 'bot') {
				isLoading = false;
			}
		}
	});

	// Handle Enter key press
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			handleSubmit();
		}
	}

	async function handleSubmit() {
		// Made function async
		isLoading = true;
		if (inputMessage.trim()) {
			sendMessage(inputMessage);
			inputMessage = '';
			scrollToBottom();
		}
		console.log('focus', textarea);
	}

	// Example prompts
	const examplePrompts = [
		'What projects have Christophe worked on?',
		// 'What is his technical skills?',
		'How can I contact Christophe?',
		"What's christophe background in software development?"
	];

	// Function to use an example prompt
	function useExamplePrompt(prompt: string) {
		inputMessage = prompt;
		// Focus the textarea
		document.querySelector('textarea')?.focus();

		// Close panel after selecting a prompt
		isPanelOpen = false;
	}
</script>

<svelte:head>
	<title>Get to know me | Christophe de Carvalho Pereira Martins</title>
	<meta name="description" content="Chat with Christophe's AI assistant" />
</svelte:head>

<div class="chat-page {isPanelOpen ? 'panel-open' : ''}">
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
			{#each $messages as message (message.id)}
				<div
					class="message {message.sender === 'user' ? 'user-message' : 'system-message'}"
					in:fly={{ y: 20, duration: 300 }}
				>
					<div class="message-content">
						{#if message.sender === 'bot'}
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html marked.parse(message.text)}
						{:else}
							{message.text}
						{/if}
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
				bind:this={textarea}
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

	<!-- Info Panel (Overlay) -->
	<div class="info-panel" class:open={isPanelOpen}>
		<div class="panel-content">
			<h2>The AI-Powered Professional Profile - My Personal MCP Server</h2>

			<div class="info-section">
				<h4>Bridging My Profile with the Future of Information Retrieval</h4>
				<p>
					In an era where Large Language Models (LLMs) are rapidly becoming a primary interface for information
					discovery, I began to think about how professionals like myself could present their skills and experience in a
					way that's not just human-readable, but also optimally structured for AI consumption. The static nature of
					traditional resumes and online profiles, while valuable, often requires manual updates and can lack the
					dynamic, queryable depth that modern AI systems are capable of leveraging.
				</p>
				<p>
					My goal was to create a "living resume". A dynamic, always up-to-date, and interactive source of truth for my
					professional journey. I envisioned a system where an AI could directly and reliably access detailed
					information about my skills, projects, experiences, and even recent contributions, going beyond what's
					typically available on a standard LinkedIn page or PDF resume. This led me to explore the <strong
						>Model Context Protocol (MCP)</strong
					>.
				</p>
				<h4>What is It? My Personal Professional MCP Server</h4>
				<p>
					This project is a custom-built MCP Server designed to provide comprehensive, structured, and real-time
					information about my professional profile. Instead of an LLM relying solely on its potentially outdated
					training data or general web scraping to "know" about me, it can (with the right setup) directly connect to my
					personal MCP server.
				</p>
				<p>This server exposes various aspects of my career as "tools" and "resources" that an AI can utilize:</p>
				<ul></ul>

				<li><strong>Core Profile</strong>: Biography, contact information, professional summary, and availability.</li>
				<li>
					<strong>Work Experience</strong>: Detailed descriptions of my roles, responsibilities, and achievements.
				</li>
				<!-- <li>
					<strong>Portfolio Projects</strong>: In-depth information about projects I've worked on, including
					technologies used and links to repositories or live demos.
				</li> -->
				<li><strong>Skills</strong>: A categorized and detailed list of my technical and soft skills.</li>
				<li><strong>Education & Certifications</strong>: My academic background and professional qualifications.</li>
				<li>
					<strong>GitHub Contributions</strong>: Real-time (or regularly updated) information about my recent pull
					requests and open-source activity.
				</li>
				<!-- <li>
					<strong>(Future Possibilities)</strong>: Blog posts, articles, talks, and even my current learning focus.
				</li> -->
				<p>
					In this page, I've integrated a chat interface that allows visitors to "talk" to an LLM that is, in turn,
					using my MCP server as its primary source of information about me. This offers an interactive way to explore
					my profile in depth.
					<br />
					You can also directly connect to the MCP server using this address:
				</p>
				<p class="connection-info">
					<code>https://staging-selfmpc-hf9i.encr.app/mcp/sse</code>
				</p>

				<div class="info-section">
					<h3>Technology & Architecture</h3>
					<p>
						Building this system required a modern, scalable, and developer-friendly backend architecture. Here is a
						high-level overview of the technology stack:
					</p>

					<p>
						<strong>Backend Framework</strong>: <a href="https://encore.dev/">Encore.dev</a> with Go.<br />

						I wanted to get familiar with Encore, this project was a good fit to experiment with it.<br />
						Its strong opinions on infrastructure, automatic boilerplate generation, built-in observability, and typed service-to-service
						calls allowed me to focus on the business logic of each data domain (profile, experience, projects, etc.) without
						getting bogged down in complex infrastructure setup. Each aspect of my professional profile is managed by a distinct
						Encore microservice.
					</p>
					<p>
						<strong>MCP Server Implementation</strong>: Also built with Encore, acts as the dedicated MCP Server. It
						receives requests from MCP clients, interprets them according to the Model Context Protocol, and then
						communicates with the various backend Encore data services to fetch the required information. The responses
						are then formatted according to the MCP specification.
					</p>
					<p>
						<strong>MCP Host Implementation</strong>: To facilitate the interaction between an LLM and my MCP Server for
						the portfolio chat, I've developed an MCP Host component. This host leverages the Go MCP library from
						<a href="https://pkg.go.dev/github.com/mark3labs/mcp-go">github.com/mark3labs/mcp-go</a>, which provides the
						necessary MCP Client functionality.<br />
						This MCP Host is responsible for managing communication with both the LLM and my the MCP Server.
					</p>
					<p>
						<strong> WebSocket Server (Chat Backend):</strong> A WebSocket server, also written in Go, provides the
						real-time communication layer for the chat interface on this portfolio.<br />
						When a user sends a message through the chat, the WebSocket server receives it and forwards the query to the
						MCP Host.<br />
						The MCP Host, using its MCP Client, interacts with an LLM. The LLM, in turn, can decide to use tools or resources
						by making requests to my MCP Server via the MCP Host.<br />
						The final response from the LLM (enriched with data from my MCP Server) is then relayed back through the WebSocket
						server to the user's chat interface.
					</p>

					<p>
						<strong>Data Storage</strong>: While some initial data is statically defined within the services for rapid
						prototyping, the architecture is designed for PostgreSQL databases managed by Encore, allowing for dynamic
						updates and scalability.
					</p>

					<p>
						<strong>External API Integration</strong>: For features like listing GitHub contributions, the system
						securely connects to the GitHub REST API.
					</p>

					<p>
						<strong>Frontend (This page)</strong>: The interactive chat on my portfolio uses standard web technologies.
						It establishes a WebSocket connection to the chat backend, sending user queries and displaying the LLM's
						responses.
					</p>
				</div>
			</div>

			<div class="info-section">
				<h3>Try These Examples</h3>
				<div class="example-prompts">
					{#each examplePrompts as prompt (prompt)}
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

	<!-- Overlay Background -->
	{#if isPanelOpen}
		<div
			class="panel-overlay"
			onclick={togglePanel}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					togglePanel();
				}
			}}
			role="button"
			tabindex="0"
		></div>
	{/if}
</div>

<style>
	.chat-page {
		position: relative;
		height: calc(100vh - 140px); /* Adjust based on your header/footer height */
		max-width: 1200px;
		margin: 0 auto;
		overflow: hidden;
	}

	/* Chat Container */
	.chat-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-alt);
		border-radius: 0.5rem;
		overflow: hidden;
		border: 1px solid var(--border);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		position: relative;
		z-index: 1;
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
		z-index: 5;
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

	/* Info Panel (Overlay) */
	.info-panel {
		position: fixed;
		top: 0;
		left: 0;
		width: 75%;
		max-width: 900px;
		height: 100%;
		background-color: var(--bg);
		border-right: 1px solid var(--border);
		overflow-y: auto;
		z-index: 100;
		transform: translateX(-100%);
		transition: transform 0.3s ease;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	}

	.info-panel.open {
		transform: translateX(0);
	}

	.panel-content {
		padding: 2rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.info-panel h2 {
		font-size: 1.75rem;
		margin: 0 0 1.5rem 0;
		color: var(--primary);
	}

	.info-section {
		margin-bottom: 2.5rem;
	}

	.info-section h3 {
		font-size: 1.25rem;
		margin: 0 0 1rem 0;
		color: var(--text);
	}

	.info-section p {
		margin: 0 0 1rem 0;
		line-height: 1.6;
		color: var(--text-light);
		font-size: 1rem;
	}

	.info-section li {
		margin: 0 0 0.5rem 0;
		line-height: 1.6;
		color: var(--text-light);
		font-size: 1rem;
	}

	.connection-info {
		margin: 1rem 0;
		padding: 0.5rem;
		background-color: var(--bg-alt);
		border-radius: 0.375rem;
		font-size: 0.875rem;
		color: var(--text-light);
	}

	.example-prompts {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
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
		position: absolute;
		top: 1.5rem;
		right: 1.5rem;
		background: none;
		border: none;
		color: var(--text-light);
		cursor: pointer;
		padding: 0.5rem;
		z-index: 101;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: background-color 0.2s;
	}

	.panel-close-button:hover {
		background-color: var(--bg-alt);
		color: var(--primary);
	}

	/* Overlay Background */
	.panel-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 90;
		animation: fadeIn 0.3s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Mobile Styles */
	@media (max-width: 768px) {
		.chat-page {
			height: calc(100vh - 120px);
		}

		.info-panel {
			width: 85%;
		}

		.panel-content {
			padding: 1.5rem;
		}

		.message {
			max-width: 90%;
		}
	}
</style>
