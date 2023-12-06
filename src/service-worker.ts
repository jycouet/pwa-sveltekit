/// <reference lib="WebWorker" />
/// <reference types="vite/client" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
import {
	cleanupOutdatedCaches,
	createHandlerBoundToURL,
	precacheAndRoute
} from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

declare let self: ServiceWorkerGlobalScope;

const countryPagesCache = 'countries-pages';

self.addEventListener('install', (event) => {
	// TODO: replace log with empty function
	event.waitUntil(
		self.caches
			.open(countryPagesCache)
			.then(() => console.info(`Opened cache: ${countryPagesCache}`))
	);
});

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

const countriesRegex = /^\/countries\/.*/i;
const denylist = [countriesRegex];
let allowlist: undefined | RegExp[];
if (import.meta.env.DEV) allowlist = [/^\/$/];

registerRoute(
	({ sameOrigin, url }) => sameOrigin && url.pathname.match(countriesRegex),
	new NetworkFirst({
		cacheName: countryPagesCache,
		matchOptions: {
			ignoreVary: true,
			ignoreSearch: true
		},
		plugins: [
			{
				// TODO: we can add custom logic here adding some params to the response, then hanlde it on the custom page
				handlerDidError: async () => Response.redirect('/error?offline', 302)
			},
			new CacheableResponsePlugin({ statuses: [200] })
		]
	})
);
// to allow work offline
registerRoute(new NavigationRoute(createHandlerBoundToURL('/'), { allowlist, denylist }));
