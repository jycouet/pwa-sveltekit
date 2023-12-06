<script lang="ts">
</script>

<svelte:head>
	<title>PWA SvelteKit</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css" />
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
		<div>Offline / Need to update / Online & Sync</div>
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
