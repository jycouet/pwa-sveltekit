<script lang="ts">
	import { visits } from '$lib/visitsStore';

	const sync = () => {
		visits.sync((e) => {
			// TODO send to the server...
			console.log(`To SYNC somewhere`, e);
		});
	};
</script>

<h2>Sync view</h2>

<button on:click={sync}>Sync All</button>

<ul>
	{#each $visits as obj}
		<li>
			<pre>I want to {obj.data.visit ? 'Visit' : 'Skip'} {obj.idApp}   </pre>
		</li>
	{/each}
</ul>
