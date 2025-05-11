import { writable, type Writable } from 'svelte/store';

// Define the structure of a chat message
export interface ChatMessage {
	id: string;
	text: string;
	sender: 'user' | 'bot';
	timestamp: Date;
}

// Define the state of the WebSocket connection
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

// Create Svelte stores to manage messages and connection status
export const messages: Writable<ChatMessage[]> = writable([]);
export const connectionStatus: Writable<ConnectionStatus> = writable('disconnected');

// const WEBSOCKET_URL = 'ws://localhost:4000/chat'; // Default Encore local dev URL
const WEBSOCKET_URL = 'wss://staging-selfmpc-hf9i.encr.app/chat';
const RECONNECT_DELAY = 200; // Initial delay in ms for reconnection attempts
const MAX_RECONNECT_DELAY = 30000; // Maximum delay in ms for reconnection attempts
let reconnectAttempts = 0;
let socket: WebSocket | null = null;

function addMessage(text: string, sender: 'user' | 'bot') {
	messages.update((msgs) => [
		...msgs,
		{ id: crypto.randomUUID(), text, sender, timestamp: new Date() }
	]);
}

export function connect() {
	if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
		console.log('WebSocket already connected or connecting.');
		return;
	}

	connectionStatus.set('connecting');
	try {
		socket = new WebSocket(WEBSOCKET_URL);

		socket.onopen = () => {
			connectionStatus.set('connected');
			reconnectAttempts = 0; // Reset reconnect attempts on successful connection
			console.log('WebSocket connection established.');
		};

		socket.onmessage = (event) => {
			const receivedText = event.data as string;
			addMessage(receivedText, 'bot');
		};

		socket.onclose = (event) => {
			connectionStatus.set('disconnected');
			console.log('WebSocket connection closed:', event.reason);
			scheduleReconnect(); // Schedule reconnection attempt
		};

		socket.onerror = (error) => {
			connectionStatus.set('error');
			console.error('WebSocket error:', error);
			if (socket) {
				socket.close();
				socket = null;
			}
			scheduleReconnect(); // Schedule reconnection attempt
		};
	} catch (err) {
		console.error('Failed to create WebSocket:', err);
		connectionStatus.set('error');
		scheduleReconnect(); // Schedule reconnection attempt
	}
}

function scheduleReconnect() {
	if (reconnectAttempts === 0) {
		console.log('Attempting to reconnect...');
	}

	connectionStatus.set('connecting');
	const delay = Math.min(RECONNECT_DELAY * Math.pow(2, reconnectAttempts), MAX_RECONNECT_DELAY);
	setTimeout(() => {
		reconnectAttempts++;
		connect();
	}, delay);
}

export function sendMessage(text: string) {
	if (!socket || socket.readyState !== WebSocket.OPEN) {
		console.error('WebSocket is not connected.');
		// Optionally, try to reconnect or queue the message
		addMessage('Error: Not connected to chat server.', 'bot');
		return;
	}
	if (text.trim() === '') return;

	addMessage(text, 'user');
	socket.send(text);
}

export function disconnect() {
	if (socket) {
		socket.close();
		socket = null;
	}
	connectionStatus.set('disconnected');
	console.log('WebSocket disconnected by user.');
}

// Attempt to connect when the module is loaded, or call connect() explicitly from a component.
// For a chat widget, you might want to connect only when the user opens it.
// connect();