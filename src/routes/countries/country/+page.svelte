<script lang="ts">
	import { page } from '$app/stores';
	import { get, set } from '$lib/idb';
	import { objToSyncStore } from '$lib/objToSyncStore';
	import { onMount } from 'svelte';

	let info: Record<string, any> = {};

	onMount(async () => {
		const c = window.location.search.replace('?country=', '');

		const key = `country - ${c}`;
		const cachedData = await get(key);
		if (cachedData) {
			info = cachedData;
			return;
		}

		// TODO if offline, get from cache first. if there is nothing and we are offline... Display that we don't have data
		const res = await fetch(`https://restcountries.com/v3.1/name/${c}`);
		const data = await res.json();
		info = data;
		set(key, info);
	});

	const visit = (visit: boolean) => () => {
		const c = window.location.search.replace('?country=', '');
		const obj = {
			id: (Math.random() + 1).toString(36).substring(2),
			date: new Date(),
			info: {
				visit,
				country: c
			}
		};
		$objToSyncStore = [...$objToSyncStore, obj];
		// TODO PWA state
		// TODO if offline, save to cache and sync later
		console.log(obj);
	};
</script>

<h2>Country</h2>

<button on:click={visit(true)}>Visit</button>
<button on:click={visit(false)}>Skip</button>

<p>Info</p>

<div>
	<pre>{JSON.stringify(info, null, 2)}</pre>
</div>
