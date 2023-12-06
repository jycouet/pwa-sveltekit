import { writable } from 'svelte/store';

export const objToSyncStore = writable<
	{
		id: string;
		date: Date;
		info: Record<string, any>;
	}[]
>([]);
