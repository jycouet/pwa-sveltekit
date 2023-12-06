<script lang="ts">
	import { objToSyncStore } from '$lib/objToSyncStore';
</script>

<svelte:head>
	<title>PWA SvelteKit</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css" />

	<link rel="icon" href="/favicon.png" sizes="any" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
</svelte:head>

<h1>PWA SvelteKit</h1>

<hr />

<div class="flex-between">
	<div>
		<a href="/">Home</a> |
		<a href="/countries">Countries</a> |
		<a href="/about">About</a>
	</div>
	<div>
		{#if $objToSyncStore.length > 0}
			<a href="/sync">Need to Sync: {$objToSyncStore.length}</a>
			|
		{/if}
		<!-- TODO PWA state -->
		Offline / Need to update / Online & Sync
	</div>
</div>

<hr />

<slot />

<style>
	.flex-between {
		display: flex;
		justify-content: space-between;
	}
</style>
