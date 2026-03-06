<script lang="ts">
	import RedirectClient from '$lib/components/RedirectClient.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<RedirectClient data={data.link} isLoading={false} />
