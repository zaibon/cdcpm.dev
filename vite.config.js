import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';

export default defineConfig(({ mode }) => {
	let plugins = [sveltekit()];
	if (mode === 'development') {
		plugins = [nodeLoaderPlugin(), ...plugins];
	}
	return {
		plugins: plugins,
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	};
});
