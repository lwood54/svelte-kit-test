<script lang="ts">
	import { format } from 'date-fns';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	export let data: PageData;

	$: bills = data.bills ?? [];
	$: if (data.error && browser) {
		goto(`/error-page?msg=${data.error}`);
	}
	const handleDelete = () => {};
</script>

<div class="flex flex-col p-2 sm:p-4 items-center relative">
	<h1 class="text-2xl mb-4">Bills</h1>
	<div class="flex flex-col w-full sm:flex-row sm:justify-center sm:flex-wrap gap-2 items-center">
		{#each bills as bill}
			<div class="flex w-full sm:w-fit">
				<div
					on:click={() => goto(`/bills/bill/view/${bill.id}`)}
					on:keydown={() => goto(`/bills/bill/view/${bill.id}`)}
					class="w-full p-2 sm:w-[600px] border-solid border-2 border-slate-500 hover:bg-slate-600 hover:cursor-pointer"
				>
					<div>
						<h1 class="w-full text-lg">{bill.title}</h1>
					</div>
					<div class="flex flex-wrap sm:flex-row flex-col mt-4">
						<p class="sm:w-1/2 w-full">Payment: {bill.amount}</p>
						<p class="sm:w-1/2 w-full">Current Balance: {bill.balance}</p>
						<p class="sm:w-1/2 w-full">Day of Month due: {bill.dayDue}</p>
						<p class="sm:w-1/2 w-full">Credit Limit: {bill.limit}</p>
						<p class="sm:w-1/2 w-full">Interest Rate: {bill.rate}</p>
						<p class="sm:w-1/2 w-52">
							Last updated: {format(new Date(bill.updatedAt), 'mm/dd/yy h:mm aaa')}
						</p>
					</div>
				</div>
				<div>
					<button
						class="w-25 h-25 p-1 rounded-full bg-gray-500 text-red-800 hover:text-red-900 active:text-red-600"
						on:click|stopPropagation={handleDelete}
					>
						<Icon icon="mdi:delete" width="25" height="25" />
					</button>
					<button
						class="w-25 h-25 p-1 rounded-full bg-gray-500 text-blue-800 hover:text-red-900 active:text-red-600"
						on:click|stopPropagation={() => goto(`/bills/bill/edit/${bill.id}`)}
					>
						<Icon icon="mdi:pencil-outline" width="25" height="25" />
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>
