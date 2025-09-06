<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { messages, connectionStatus, connect, sendMessage } from '../services/chatSocket';

	let userInput = $state('');
	let isChatOpen = $state(false);
	let chatBody = $state<HTMLElement | null>(null);

	// Track if the AI is thinking
	let isThinking = $state(false);

	function handleSubmit() {
		if (userInput.trim()) {
			isThinking = true; // Set thinking state to true
			sendMessage(userInput);
			userInput = '';
			scrollToBottom();
		}
	}

	function toggleChat() {
		isChatOpen = !isChatOpen;
		if (isChatOpen && $connectionStatus !== 'connected' && $connectionStatus !== 'connecting') {
			connect();
		}
	}

	function scrollToBottom() {
		// Ensure chatBody is rendered and then scroll
		requestAnimationFrame(() => {
			if (chatBody) {
				chatBody.scrollTop = chatBody.scrollHeight;
			}
		});
	}

	// Update isThinking when a new message is received
	$effect(() => {
		console.log('Messages updated:', $messages);
		if ($messages && chatBody) {
			if ($messages.length > 0) {
				const lastMessage = $messages[$messages.length - 1];
				if (lastMessage?.sender === 'bot') {
					isThinking = false; // Reset thinking state when bot responds
				}
			}
			scrollToBottom();
		}
	});

	onMount(() => {
		// Optionally connect when component mounts if you want it always active
		// if (isChatOpen) connect();
	});

	onDestroy(() => {
		// Disconnect when the component is destroyed if it's the only place managing the connection
		// This might be too aggressive if the widget can be hidden and shown.
		// Consider if disconnect should be called only when navigating away from the site.
		// disconnect();
	});
</script>

<div class="chat-widget-container">
	{#if isChatOpen}
		<div class="chat-window">
			<header class="chat-header">
				<span>Get to know me !</span>
				<span class="connection-status {$connectionStatus}">
					{#if $connectionStatus === 'connected'}
						<span class="status-indicator connected"></span> Connected
					{:else if $connectionStatus === 'connecting'}
						<span class="status-indicator connecting"></span> Connecting...
					{:else if $connectionStatus === 'error'}
						<span class="status-indicator error"></span> Error
					{:else}
						<span class="status-indicator disconnected"></span> Disconnected
					{/if}
				</span>
				<button class="close-button" onclick={toggleChat}>&times;</button>
			</header>
			<div class="chat-body" bind:this={chatBody}>
				{#each $messages as message (message.id)}
					<div class="message {message.sender === 'user' ? 'user-message' : 'bot-message'}">
						<p>{message.text}</p>
						<span class="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
					</div>
				{/each}
				{#if $connectionStatus === 'connecting'}
					<div class="status-message">Connecting to chat...</div>
				{/if}
				{#if $connectionStatus === 'error'}
					<div class="status-message error">Connection error. Please try again later.</div>
				{/if}
				{#if isThinking}
					<div class="spinner"></div>
				{/if}
			</div>
			<footer class="chat-footer">
				<input
					type="text"
					bind:value={userInput}
					onkeypress={(e) => e.key === 'Enter' && handleSubmit()}
					placeholder="Ask me anything..."
					disabled={$connectionStatus !== 'connected'}
				/>
				<button onclick={handleSubmit} disabled={$connectionStatus !== 'connected'}>Send</button>
			</footer>
		</div>
	{/if}

	{#if !isChatOpen}
		<button class="chat-toggle-button" onclick={toggleChat} aria-label="Open chat">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg
			>
		</button>
	{/if}
</div>

<style>
	.chat-widget-container {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 1000;
	}

	.chat-toggle-button {
		background-color: var(--bulma-primary, #06b6d4); /* Using Bulma primary as a fallback */
		color: white;
		border: none;
		border-radius: 50%;
		width: 60px;
		height: 60px;
		font-size: 24px;
		cursor: pointer;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.chat-toggle-button svg {
		width: 30px;
		height: 30px;
	}

	.chat-window {
		width: 350px;
		height: 500px;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 1px solid #dbdbdb;
	}

	.chat-header {
		background-color: var(--bulma-primary, #06b6d4);
		color: white;
		padding: 10px 15px;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.chat-header .close-button {
		background: none;
		border: none;
		color: white;
		font-size: 20px;
		cursor: pointer;
	}

	.connection-status {
		font-size: 0.9em;
		margin-left: auto;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.status-indicator {
		width: 10px;
		height: 10px;
		border-radius: 50%;
	}

	.status-indicator.connected {
		background-color: var(--bulma-success, #23d160);
	}

	.status-indicator.connecting {
		background-color: var(--bulma-warning, #ffdd57);
	}

	.status-indicator.error {
		background-color: var(--bulma-danger, #ff3860);
	}

	.status-indicator.disconnected {
		background-color: var(--bulma-grey-light, #dbdbdb);
	}

	.chat-body {
		flex-grow: 1;
		padding: 10px;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
		background-color: #f5f5f5;
	}

	.message {
		padding: 8px 12px;
		border-radius: 18px;
		max-width: 75%;
		word-wrap: break-word;
	}

	.user-message {
		background-color: var(--bulma-link, #3273dc); /* Using Bulma link color */
		color: white;
		align-self: flex-end;
		border-bottom-right-radius: 4px;
	}

	.bot-message {
		background-color: #e9e9eb; /* A light grey for bot messages */
		color: #333;
		align-self: flex-start;
		border-bottom-left-radius: 4px;
	}
	.message p {
		margin: 0;
		padding: 0;
	}
	.message .timestamp {
		font-size: 0.7em;
		display: block;
		text-align: right;
		margin-top: 4px;
		opacity: 0.7;
	}
	.user-message .timestamp {
		text-align: right;
	}
	.bot-message .timestamp {
		text-align: left;
	}

	.status-message {
		text-align: center;
		color: #777;
		font-style: italic;
		padding: 10px;
	}
	.status-message.error {
		color: var(--bulma-danger, #ff3860);
	}

	.chat-footer {
		padding: 10px;
		display: flex;
		gap: 10px;
		border-top: 1px solid #dbdbdb;
		background-color: #fff;
	}

	.chat-footer input {
		flex-grow: 1;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 20px;
		outline: none;
	}
	.chat-footer input:focus {
		border-color: var(--bulma-primary, #06b6d4);
	}

	.chat-footer button {
		background-color: var(--bulma-primary, #06b6d4);
		color: white;
		border: none;
		padding: 10px 15px;
		border-radius: 20px;
		cursor: pointer;
		font-weight: bold;
	}
	.chat-footer button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}

	.spinner {
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-left-color: var(--bulma-primary, #06b6d4);
		border-radius: 50%;
		width: 30px;
		height: 30px;
		animation: spin 1s linear infinite;
		margin: 10px auto;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
