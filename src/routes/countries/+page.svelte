<script lang="ts">
	import { deleteDatabases, get, set } from '$lib/idb';
	import { onMount } from 'svelte';

	let list: { name: string }[] = [];

	onMount(async () => {
		const cachedData = await get('countries');
		if (cachedData) {
			list = cachedData;
			console.log(`cachedData`, cachedData);
			return;
		}

		console.log(`fetching data`);

		// TODO if offline, get from cache first.
		const res = await fetch('https://restcountries.com/v3.1/all?dt=' + new Date().valueOf());
		const data = await res.json();
		console.log(`data`, data);

		list = data.map((country: any) => ({ name: country.name.common }));
		set('countries', list);
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
	</ul>
</div>
