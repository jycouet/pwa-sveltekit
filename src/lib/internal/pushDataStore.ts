import { writable } from 'svelte/store';
import { delIdb, getIdb, setIdb, updateIdb } from './idb';

type PushDataStore<T = any> = {
	id: string;
	date: Date;
	data: T;
};

export const pushDataStore = <T = any | undefined>(name: string) => {
	const key = `PUSH ${name}`;

	const { subscribe, set, update } = writable<PushDataStore<T>[]>([]);

	return {
		subscribe,
		init: async () => {
			let vals = (await getIdb(key)) ?? [];
			set(vals);
		},
		push: async <T>(data: T) => {
			const obj: PushDataStore = {
				id: (Math.random() + 1).toString(36).substring(2),
				date: new Date(),
				data
			};

			let vals = await getIdb(key);
			if (vals) {
				updateIdb(key, (old) => {
					return [...old, obj];
				});
			} else {
				setIdb(key, [obj]);
			}

			vals = await getIdb(key);
			set(vals);
		},
		sync: async (fnToSync: (fnToSync: PushDataStore<T>) => void) => {
			if (navigator && navigator.onLine) {
				const vals = await getIdb(key);
				if (!vals) {
					console.log(`Nothing to sync`);
					return;
				}
				for (let index = 0; index < vals.length; index++) {
					const val = vals[index];
					fnToSync(val);
				}
				delIdb(key);
				set([]);
			} else {
				console.log(`offline, we can't sync`);
			}
		}
	};
};
