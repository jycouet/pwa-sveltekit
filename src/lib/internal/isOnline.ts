import { readable, writable } from 'svelte/store';

export const isOnline = readable(navigator.onLine, (set) => {
	const check = () => {
		setTimeout(() => {
			set(navigator.onLine);
			check();
		}, 1000);
	};
	check();
});
