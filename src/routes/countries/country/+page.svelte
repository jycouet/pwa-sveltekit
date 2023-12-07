<script lang="ts">
	import { page } from '$app/stores';
	import { pullDataStore } from '$lib/internal/pullDataStore';
	import { currentVisitStore, visits } from '$lib/visitsStore';
	import { onMount } from 'svelte';

	const getCountry = () => {
		const country = $page.url.searchParams.get('country');
		return country ?? '';
	};

	let countryStore = pullDataStore<{ name: { common: string } }>(
		`https://restcountries.com/v3.1/name/${getCountry()}`,
		{ name: { common: getCountry() } }
	);

	const currentVisit = currentVisitStore(getCountry());

	onMount(async () => {
		await countryStore.pull();
	});

	const addVisit = (visit: boolean) => () => {
		visits.push(getCountry(), {
			visit,
			country: getCountry()
		});
	};

	const resetVisit = () => () => {
		visits.remove(getCountry());
	};
</script>

<h2>Country</h2>

<h3>Do you want to</h3>
<div>
	<button on:click={addVisit(true)} disabled={$currentVisit !== undefined}>Visit</button>
	<button on:click={addVisit(false)} disabled={$currentVisit !== undefined}>Skip</button>
	<button on:click={resetVisit()} disabled={$currentVisit === undefined}>Reset</button>
	{#if $currentVisit}
		(current whish is: {$currentVisit?.data.visit ? 'Visit' : 'Skip'})
	{/if}
</div>

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
