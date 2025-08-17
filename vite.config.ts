import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		// Optimize development server
		port: 5173,
		strictPort: true,
		host: true,
	},
	build: {
		// Optimize build performance
		target: 'esnext',
		minify: 'esbuild',
		sourcemap: false,
	},
	optimizeDeps: {
		// Pre-bundle dependencies for faster dev server
		include: ['svelte-i18n'],
	},
	preview: {
		port: 4173,
		strictPort: true,
		host: true,
	},
});
