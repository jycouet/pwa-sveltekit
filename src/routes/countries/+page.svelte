<script lang="ts">
	import { onMount } from 'svelte';

	let list: { name: string }[] = [];

	onMount(async () => {
		// TODO if offline, get from cache first.
		const res = await fetch('https://restcountries.com/v3.1/all');
		const data = await res.json();
		list = data.map((country: any) => ({ name: country.name.common }));
	});
</script>

<h2>Countries</h2>

<p>List of countries, fetched while online</p>

<div>
	<ul>
		{#each list as country}
			<li>
				<a href="/countries/{country.name}">{country.name}</a>
			</li>
		{/each}
	</ul>
</div>
