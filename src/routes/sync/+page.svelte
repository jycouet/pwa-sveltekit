<script>
	import { objToSyncStore } from '$lib/objToSyncStore';

	const sync = () => {
		// TODO if offline don't do it. (button disabled)
		console.log($objToSyncStore);
		$objToSyncStore = [];
	};
</script>

<h2>Sync view</h2>

<button on:click={sync}>Sync All</button>

{#each $objToSyncStore as obj}
	<div>
		<pre>{JSON.stringify(obj, null, 2)}</pre>
	</div>
{/each}
