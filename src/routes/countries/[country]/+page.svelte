<script lang="ts">
	import { page } from '$app/stores';
	import { objToSyncStore } from '$lib/objToSyncStore';
	import { onMount } from 'svelte';

	let info: Record<string, any> = {};

	onMount(async () => {
		// TODO if offline, get from cache first. if there is nothing and we are offline... Display that we don't have data
		const res = await fetch(`https://restcountries.com/v3.1/name/${$page.params.country}`);
		const data = await res.json();
		info = data;
	});

	const visit = (visit: boolean) => () => {
		const obj = {
			id: (Math.random() + 1).toString(36).substring(2),
			date: new Date(),
			info: {
				visit,
				country: $page.params.country
			}
		};
		$objToSyncStore = [...$objToSyncStore, obj];
		// TODO PWA state
		// TODO if offline, save to cache and sync later
		console.log(obj);
	};
</script>

<h2>Country {$page.params.country}</h2>

<button on:click={visit(true)}>Visit</button>
<button on:click={visit(false)}>Skip</button>

<p>Info</p>

<div>
	<pre>{JSON.stringify(info, null, 2)}</pre>
</div>
