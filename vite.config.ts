import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig, loadEnv, type ServerOptions } from 'vite';

export default defineConfig(({ mode: vite_mode }) => {
	const env = loadEnv(vite_mode, process.cwd(), '');

	// In PWA, you don't wan't to mess up with the default port.
	// So let's change it, like this the service worker will be installed on the new port.
	const server: ServerOptions = {
		host: env.HOST ?? '127.0.0.1',
		port: parseInt(env.PORT ?? '5183')
	};

	// PWA needs "production" mode to work properly (can be convinent set "ENABLE_DEV_PWA" to get it working in dev mode)
	const localDevBuild = process.env.NODE_ENV === 'production' && env.ENABLE_DEV_PWA !== 'true';

	// enable workbox debug logs when using build + preview
	const mode = localDevBuild ? '"production"' : '"development"';

	// in ms seconds
	const periodicSwUpdates = localDevBuild
		? 60 * 60 * 1000 // 1 hour
		: 20000; // 20 seconds

	return {
		server,
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
					enabled: env.ENABLE_DEV_PWA === 'true',
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
	};
});
