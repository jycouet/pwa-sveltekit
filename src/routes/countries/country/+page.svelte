<script lang="ts">
	import { page } from '$app/stores';
	import { get, set } from '$lib/idb';
	import { objToSyncStore } from '$lib/objToSyncStore';
	import { onMount } from 'svelte';

	let info: Record<string, any> = {};

	const getSpCountry = () => {
		const spCountry = $page.url.searchParams.get('country');
		return spCountry;
		// const spCountry = window.location.search.replace('?country=', '');
		// return spCountry;
	};

	onMount(async () => {
		// TODO => Make a store for this
		// loading... / Data from cache / Data from API / No Data

		const key = `country - ${getSpCountry()}`;
		const cachedData = await get(key);
		if (cachedData) {
			info = cachedData;
			return;
		}

		// I'M I online?
		if (navigator.onLine) {
			const res = await fetch(`https://restcountries.com/v3.1/name/${getSpCountry()}`);
			const data = await res.json();
			info = data;
			set(key, info);
		} else {
			info = { info: `Not online, and I don't have data in cachedData, sorry!` };
		}
	});

	const visit = (visit: boolean) => () => {
		const obj = {
			id: (Math.random() + 1).toString(36).substring(2),
			date: new Date(),
			info: {
				visit,
				country: getSpCountry()
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
