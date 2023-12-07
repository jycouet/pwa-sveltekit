<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	const { needRefresh } = useRegisterSW();
</script>

{#if navigator && navigator.onLine}
	{#if $needRefresh}
		Online (needs update) 🔵
	{:else}
		Online 🟢
	{/if}
{:else}
	Offline 🟠
{/if}
