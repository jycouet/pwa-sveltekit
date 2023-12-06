// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import 'vite-plugin-pwa/svelte';
import 'vite-plugin-pwa/info';

declare global {
	declare const __RELOAD_SW__: number;
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
