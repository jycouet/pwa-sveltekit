<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	const { needRefresh } = useRegisterSW({
		onRegisteredSW(swUrl, r) {
			// TODO: make interval ms configurable via define +
			r &&
				setInterval(async () => {
					if (!(!r.installing && navigator)) {
						return;
					}

					if ('connection' in navigator && !navigator.onLine) {
						return;
					}

					const resp = await fetch(swUrl, {
						cache: 'no-store',
						headers: {
							cache: 'no-store',
							'cache-control': 'no-cache'
						}
					});

					if (resp?.status === 200) {
						await r.update();
					}
				}, __RELOAD_SW__);
		}
	});
</script>

{#if navigator && navigator.onLine}
	{#if $needRefresh}
		Online (need update) 🔵
	{:else}
		Online 🟢
	{/if}
{:else}
	Offline 🟠
{/if}
