import { derived } from 'svelte/store';
import { pushDataStore, type PushDataStore } from './internal/pushDataStore';

export const visits = pushDataStore('visits');

export const currentVisitStore = (country: string) =>
	derived<typeof visits, PushDataStore | undefined>(visits, ($s, set) => {
		if ($s) {
			set($s.find((v) => v.idApp === country));
		} else {
			set(undefined);
		}
	});
