<script lang="ts">
	import PwaState from '$lib/components/PWAState.svelte';
	import { visits } from '$lib/visitsStore';
	import { onMount } from 'svelte';
	import { pwaInfo } from 'virtual:pwa-info';

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : '';

	onMount(() => {
		visits.init();
	});
</script>

<svelte:head>
	<title>PWA SvelteKit</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css" />

	<link rel="icon" href="/favicon.png" sizes="any" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
	<meta name="theme-color" content="#ffffff" />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html webManifest}
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
		{#if $visits.length > 0}
			<a href="/sync">Need to Sync: {$visits.length}</a>
			|
		{/if}
		<PwaState></PwaState>
	</div>
</div>

<hr />

<slot />

{#await import('$lib/components/PWAPrompt.svelte') then { default: PWAPrompt }}
	<PWAPrompt />
{/await}

<style>
	.flex-between {
		display: flex;
		justify-content: space-between;
	}
</style>
