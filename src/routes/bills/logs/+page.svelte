<script lang="ts">
	import { DateInput, DatePicker } from 'date-picker-svelte';
	import Card from '$lib/components/Elements/Card.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data: PageData;
	$: logs = data.logs ?? [];
	$: if (data.error && browser) {
		goto(`/error-page?msg=${data.error}`);
	}

	let date = new Date();
</script>

<h1>Logs</h1>
<Card bg="bg-sky-400">
	{#each logs as log}
		<Card>
			<p>{log.title}</p>
			<p>{log.amount}</p>
			<p>{log.categoryId}</p>
			<p>{log.scale}</p>
			<p>{new Date(log.createdAt)}</p>
		</Card>
	{/each}
</Card>

<p>{date}</p>
<DateInput closeOnSelection format="MM/dd/yyyy HH:mm" bind:value={date} />
