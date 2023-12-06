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

declare let self: ServiceWorkerGlobalScope;

// TODO: If you need to cache at Service Worker level, you can use this
// const countryPagesCache = 'countries-pages';
// self.addEventListener('install', (event) => {
// 	event.waitUntil(
// 		self.caches
// 			.open(countryPagesCache)
// 			.then(() => console.info(`Opened cache: ${countryPagesCache}`))
// 	);
// });

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

const everyThing = /./;

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST, { ignoreURLParametersMatching: [everyThing] });

// clean old assets
cleanupOutdatedCaches();

registerRoute(new NavigationRoute(createHandlerBoundToURL('/')));
