<script lang="ts">
	import { deleteDatabases, get, set } from '$lib/idb';
	import { onMount } from 'svelte';

	let list: { name: string }[] = [];
	let info = '';

	onMount(async () => {
		// TODO => Make a store for this
		const cachedData = await get('countries');
		if (cachedData) {
			list = cachedData;
			console.log(`cachedData`, cachedData);
			return;
		}

		// I'M I online?
		if (navigator.onLine) {
			const res = await fetch('https://restcountries.com/v3.1/all');
			const data = await res.json();
			list = data.map((country: any) => ({ name: country.name.common }));
			set('countries', list);
		} else {
			info = `Not online, and I don't have data in cachedData, sorry!`;
		}
	});
</script>

<h2>Countries</h2>

<p>List of countries, fetched while online</p>

<button
	on:click={() => {
		deleteDatabases();
		list = [];
	}}>Delete Offline Data (just for demo)</button
>

<div>
	<ul>
		{#each list as country}
			<li>
				<a href="/countries/country?country={country.name}">{country.name}</a>
			</li>
		{/each}
		{#if info}
			<p>{info}</p>
		{/if}
	</ul>
</div>
