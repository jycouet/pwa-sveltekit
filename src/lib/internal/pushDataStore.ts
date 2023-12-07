import { writable } from 'svelte/store';
import { delIdb, getIdb, setIdb, updateIdb } from './idb';

type PushDataStore<T = any> = {
	idGenerated: string;
	date: Date;
	idApp: string;
	data: T;
};

export const pushDataStore = <T = any | undefined>(name: string) => {
	const idbKey = `PUSH ${name}`;

	const { subscribe, set, update } = writable<PushDataStore<T>[]>([]);

	return {
		subscribe,
		init: async () => {
			let vals = (await getIdb(idbKey)) ?? [];
			set(vals);
		},
		push: async <T>(idApp: string, data: T) => {
			const obj: PushDataStore = {
				idGenerated: (Math.random() + 1).toString(36).substring(2),
				date: new Date(),
				idApp,
				data
			};

			let vals = await getIdb(idbKey);
			if (vals) {
				updateIdb(idbKey, (old) => {
					return [...old, obj];
				});
			} else {
				setIdb(idbKey, [obj]);
			}

			vals = await getIdb(idbKey);
			set(vals);
		},
		sync: async (fnToSync: (fnToSync: PushDataStore<T>) => void) => {
			if (navigator && navigator.onLine) {
				const vals = await getIdb(idbKey);
				if (!vals) {
					console.log(`Nothing to sync`);
					return;
				}
				for (let index = 0; index < vals.length; index++) {
					const val = vals[index];
					fnToSync(val);
				}
				delIdb(idbKey);
				set([]);
			} else {
				console.log(`offline, we can't sync`);
			}
		}
	};
};
