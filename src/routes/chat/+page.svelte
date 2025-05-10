<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { messages, connectionStatus, connect, sendMessage, disconnect } from '$lib/services/chatSocket';

	let userInput = '';
	let chatBody: HTMLElement;

	function handleSubmit() {
		if (userInput.trim()) {
			sendMessage(userInput);
			userInput = '';
			scrollToBottom();
		}
	}

	function scrollToBottom() {
		requestAnimationFrame(() => {
			if (chatBody) {
				chatBody.scrollTop = chatBody.scrollHeight;
			}
		});
	}

	$: if (messages && chatBody) {
		scrollToBottom();
	}

	onMount(() => {
		connect();
	});

	onDestroy(() => {
		disconnect();
	});
</script>

<div class="chat-page">
	<header class="chat-header">
		<h1>Corey - AI Assistant</h1>
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
	</header>
	<div class="chat-body" bind:this={chatBody}>
		{#each $messages as message (message.id)}
			<div class="message {message.sender === 'user' ? 'user-message' : 'bot-message'}">
				<p>{message.text}</p>
				<span class="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
			</div>
		{/each}
	</div>
	<footer class="chat-footer">
		<input
			type="text"
			bind:value={userInput}
			on:keypress={(e) => e.key === 'Enter' && handleSubmit()}
			placeholder="Type your message..."
			disabled={$connectionStatus !== 'connected'}
		/>
		<button on:click={handleSubmit} disabled={$connectionStatus !== 'connected'}>Send</button>
	</footer>
</div>

<style>
	.chat-page {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: var(--bulma-light, #f5f5f5);
		color: var(--text, #333);
		font-family: Arial, sans-serif;
	}

	.chat-header {
		width: 100%;
		padding: 1rem;
		background-color: var(--bulma-primary, #06b6d4);
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.connection-status {
		font-size: 0.9em;
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
		width: 100%;
		padding: 1rem;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
		background-color: #ffffff;
		max-height: calc(100vh - 160px); /* Adjusts for header and footer height */
	}

	.message {
		padding: 10px;
		border-radius: 10px;
		max-width: 70%;
		word-wrap: break-word;
	}

	.user-message {
		align-self: flex-end;
		background-color: var(--bulma-link, #3273dc);
		color: white;
	}

	.bot-message {
		align-self: flex-start;
		background-color: #e9e9eb;
		color: #333;
	}

	.timestamp {
		font-size: 0.8em;
		margin-top: 5px;
		opacity: 0.7;
	}

	.chat-footer {
		width: 100%;
		padding: 1rem;
		background-color: #f5f5f5;
		display: flex;
		gap: 10px;
		border-top: 1px solid #dbdbdb;
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
</style>
