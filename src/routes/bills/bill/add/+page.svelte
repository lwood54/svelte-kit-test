<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { Button, Input } from '$lib/components/Elements';
	import Spinner from '$lib/components/Elements/Spinner.svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;
	let amount: number;
	let balance: number;
	let dayDue: number;
	let limit: number;
	let rate: number;
	let title: string;
	$: if (form?.isSuccess && browser) {
		goto('/bills/list');
	}
</script>

{#if form}
	<Spinner scale="l" />
{:else}
	<div class="flex flex-col p-4 gap-4 items-center">
		<h1 class="text-xl">Add a new bill</h1>
		<form class="flex flex-col gap-2 w-full lg:w-[500px]" id="create-bill-form" method="POST">
			<Input name="title" val={title}>Account Nickname</Input>
			<Input name="balance" val={balance} variant="number">Current Balance</Input>
			<Input name="amount" val={amount} variant="number">Payment Amount</Input>
			<Input name="daydue" val={dayDue} variant="number">Day of Month Due</Input>
			<Input name="limit" val={limit} variant="number">Credit Limit</Input>
			<Input name="rate" val={rate} variant="number" step="0.01">Interest Rate</Input>
			<div class="flex justify-end w-full">
				<Button formName="create-bill-form" type="submit">Submit</Button>
			</div>
		</form>
	</div>
{/if}
