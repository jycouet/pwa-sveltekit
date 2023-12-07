<script lang="ts">
	import { isOnline } from '$lib/internal/isOnline';
	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	const { needRefresh } = useRegisterSW();
</script>

{#if $isOnline}
	{#if $needRefresh}
		Online (needs update) 🔵
	{:else}
		Online 🟢
	{/if}
{:else}
	Offline 🟠
{/if}
