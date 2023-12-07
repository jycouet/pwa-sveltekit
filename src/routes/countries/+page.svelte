<script lang="ts">
	import { pullDataStore } from '$lib/pullDataStore';
	import { onMount } from 'svelte';

	let countriesStore = pullDataStore<{ name: { common: string } }[]>(
		'https://restcountries.com/v3.1/all',
		[]
	);

	onMount(async () => {
		await countriesStore.pull();
	});
</script>

<h2>Countries</h2>

{#if $countriesStore.state === 'loading'}
	<p>Loading...</p>
{:else if $countriesStore.state === 'no cached data & offline'}
	<p>Go online to get data</p>
{:else}
	<em>Info: {$countriesStore.state}</em>
	<ul>
		{#each $countriesStore.data as country}
			<li>
				<a href="/countries/country?country={country.name.common}">{country.name.common}</a>
			</li>
		{/each}
	</ul>
{/if}
