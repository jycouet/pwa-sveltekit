<script lang="ts">
	import { page } from '$app/stores';
	import { pullDataStore } from '$lib/internal/pullDataStore';
	import { visits } from '$lib/visitsStore';
	import { onMount } from 'svelte';

	const getCountry = () => {
		const country = $page.url.searchParams.get('country');
		return country ?? '';

		// if (window) {
		// 	const spCountry = window.location.search.replace('?country=', '');
		// 	return spCountry ?? '';
		// }
		// return '';
	};

	// TODO: create the store outside of the onMount. Today we can't because at build, SvelteKit is conplaining about the serach param
	let countryStore: ReturnType<typeof pullDataStore>;

	onMount(async () => {
		countryStore = pullDataStore<{ name: { common: string } }>(
			`https://restcountries.com/v3.1/name/${getCountry()}`,
			{ name: { common: getCountry() } }
		);
		await countryStore.pull();
	});

	const visit = (visit: boolean) => () => {
		visits.push({
			visit,
			country: getCountry()
		});
	};
</script>

<h2>Country</h2>

<h3>Action</h3>
<button on:click={visit(true)}>Visit</button>
<button on:click={visit(false)}>Skip</button>

<h3>Info</h3>

{#if countryStore}
	{#if $countryStore.state === 'loading'}
		<p>Loading...</p>
	{:else if $countryStore.state === 'no cached data & offline'}
		<p>Go online to get data</p>
	{:else}
		<em>Info: {$countryStore.state}</em>
		<pre>{JSON.stringify($countryStore.data, null, 2)}</pre>
	{/if}
{/if}
