<script lang="ts">
	import { page } from '$app/stores';
	import { pullDataStore } from '$lib/internal/pullDataStore';
	import { visits } from '$lib/visitsStore';
	import { onMount } from 'svelte';

	let info: Record<string, any> = {};

	const country = () => {
		const country = $page.url.searchParams.get('country');
		return country ?? '';
		// const spCountry = window.location.search.replace('?country=', '');
		// return spCountry;
	};

	let countryStore = pullDataStore<{ name: { common: string } }>(
		`https://restcountries.com/v3.1/name/${country()}`,
		{ name: { common: country() } }
	);

	onMount(async () => {
		await countryStore.pull();
	});

	const visit = (visit: boolean) => () => {
		visits.push({
			visit,
			country: country()
		});
	};
</script>

<h2>Country</h2>

<h3>Action</h3>
<button on:click={visit(true)}>Visit</button>
<button on:click={visit(false)}>Skip</button>

<h3>Info</h3>

{#if $countryStore.state === 'loading'}
	<p>Loading...</p>
{:else if $countryStore.state === 'no cached data & offline'}
	<p>Go online to get data</p>
{:else}
	<em>Info: {$countryStore.state}</em>
	<pre>{JSON.stringify($countryStore.data, null, 2)}</pre>
{/if}
