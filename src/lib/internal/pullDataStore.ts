import { writable } from 'svelte/store';
import { getIdb, setIdb } from './idb';

type PullDataStore<T = any> = {
	state: 'loading' | 'loaded from network' | 'loaded from cache' | 'no cached data & offline';
	data: T;
};

const init = <T = any>(initData: T) => {
	return {
		state: 'loading',
		data: initData
	} as const;
};

export const pullDataStore = <T = any | undefined>(url: string, initData: T) => {
	const { subscribe, set, update } = writable<PullDataStore<T>>(init(initData));

	return {
		subscribe,
		pull: async () => {
			const key = `PULL ${url}`;

			const cachedData = await getIdb(key);
			if (cachedData) {
				update((c) => {
					return { ...c, data: cachedData, state: 'loaded from cache' };
				});
			}

			// If we are online, let's refresh the data as well
			if (navigator && navigator.onLine) {
				const res = await fetch(url);
				const data = await res.json();
				update((c) => {
					return { ...c, data: data, state: 'loaded from network' };
				});
				setIdb(key, data);
			}

			if (!navigator.onLine && !cachedData) {
				update((c) => {
					return { ...c, state: 'no cached data & offline' };
				});
			}
		}
	};
};
