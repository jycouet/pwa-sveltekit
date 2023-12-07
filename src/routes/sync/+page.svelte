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

{#each $visits as obj}
	<div>
		<pre>{JSON.stringify(obj, null, 2)}</pre>
	</div>
{/each}
