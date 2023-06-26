<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;

	$: categories = data.categories ?? [];
	$: if (data.error && browser) {
		goto(`/error-page?msg=${data.error}`);
	}
</script>

<h1>Categories</h1>

<div class="flex flex-col gap-2">
	{#each categories as category}
		<div class="border-solid border-2 border-slate-500">
			<p>{category.title}</p>
		</div>
	{/each}
</div>
