import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

// in ms seconds
const periodiSwUpdates =
	process.env.NODE_ENV === 'production'
		? 60 * 60 * 1000 // 1 hour
		: 20000; // 20 seconds

export default defineConfig({
	define: {
		__RELOAD_SW__: `${periodiSwUpdates}`,
		'process.env.NODE_ENV': process.env.NODE_ENV === 'production' ? '"production"' : '"development"'
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			injectRegister: false,
			strategies: 'injectManifest',
			scope: '/',
			srcDir: 'src',
			filename: 'service-worker.ts',
			registerType: 'prompt',
			includeManifestIcons: false,
			manifest: {
				short_name: 'PWA SvelteKit',
				name: 'PWA SvelteKit',
				start_url: '/',
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'maskable-icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
