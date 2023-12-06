import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

const localDevBuild =
	process.env.NODE_ENV === 'production' && process.env.ENABLE_DEV_PWA !== 'true';

// in ms seconds
const periodicSwUpdates = localDevBuild
	? 60 * 60 * 1000 // 1 hour
	: 20000; // 20 seconds

// enable workbox debug logs when using build + preview
const mode = localDevBuild ? '"production"' : '"development"';

export default defineConfig({
	mode,
	define: {
		__RELOAD_SW__: `${periodicSwUpdates}`,
		'process.env.NODE_ENV': `${mode}`
	},
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			injectRegister: false,
			strategies: 'injectManifest',
			base: '/',
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
			},
			devOptions: {
				enabled: process.env.ENABLE_DEV_PWA === 'true',
				suppressWarnings: true,
				navigateFallback: '/',
				type: 'module'
			}
		})
	],
	optimizeDeps: {
		include: ['workbox-precaching', 'workbox-routing', 'workbox-window']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
