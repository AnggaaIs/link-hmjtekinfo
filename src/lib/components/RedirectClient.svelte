<script lang="ts">
	import type { Link } from '$lib/types/redirect';

	interface Props {
		data: Link | null;
		isLoading: boolean;
	}

	let { data, isLoading }: Props = $props();

	let status = $state<'loading' | 'redirecting' | 'fallback'>('loading');

	const pageTitle = $derived(
		status === 'loading'
			? 'Mencari tautan... | HMJ Tekinfo'
			: status === 'redirecting'
				? `${data?.title || 'Mengalihkan'} | HMJ Tekinfo`
				: 'Tautan tidak ditemukan | HMJ Tekinfo'
	);

	$effect(() => {
		if (!isLoading) {
			if (data?.url) {
				status = 'redirecting';
				const timer = setTimeout(() => {
					window.location.replace(data.url);
				}, 800);
				return () => clearTimeout(timer);
			} else {
				status = 'fallback';
				const timer = setTimeout(() => {
					window.location.replace('https://hmjtekinfo.web.id');
				}, 1500);
				return () => clearTimeout(timer);
			}
		}
	});

	const displayUrl = $derived(
		data?.url ? data.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'hmjtekinfo.web.id'
	);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div
	class="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black antialiased"
>
	<main class="flex w-full max-w-[320px] flex-col items-center">
		<div class="mb-8">
			<div
				class="relative h-16 w-16 overflow-hidden rounded-[1.25rem] border border-zinc-100 bg-zinc-50/50 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/50"
			>
				<img src="/HMJTekinfo.png" alt="Logo HMJ Tekinfo" class="object-contain p-1" />
			</div>
		</div>

		<div class="mb-10 flex flex-col items-center space-y-1.5 text-center">
			<h1 class="text-[14px] font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
				{#if status === 'loading'}
					Mencari tautan...
				{:else if status === 'redirecting'}
					{data?.title || 'Mengalihkan'}
				{:else}
					Tautan tidak ditemukan
				{/if}
			</h1>

			<p class="max-w-[240px] truncate text-[13px] text-zinc-400 dark:text-zinc-500">
				{#if status === 'loading'}
					Memvalidasi tujuan...
				{:else if status === 'redirecting'}
					{displayUrl}
				{:else}
					Kembali ke beranda utama
				{/if}
			</p>
		</div>

		<div class="flex h-6 items-center justify-center">
			<!-- spinner -->
			<div class="relative h-5 w-5">
				{#each Array(12) as _, i}
					<div
						class="absolute left-[45%] top-0 h-[25%] w-[10%] animate-geist-spinner rounded-full bg-zinc-400 dark:bg-zinc-600"
						style="transform: rotate({i * 30}deg) translate(0, -120%); animation-delay: {-1.2 +
							i * 0.1}s;"
					></div>
				{/each}
			</div>
		</div>
	</main>
</div>
