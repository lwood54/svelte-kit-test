<script lang="ts">
	import { Button, Input } from '$lib/components/Elements';
	import Toast from '$lib/components/Elements/Toast.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
	$: showToast = form?.isSuccess;
	$: if (showToast) {
		setTimeout(() => {
			showToast = false;
		}, 3_000);
	}
	$: {
		console.info('result??', form);
	}
	$: bill = data.bill;
	$: amount = bill?.amount ?? 0;
	$: balance = bill?.balance ?? 0;
	$: dayDue = bill?.dayDue ?? 1;
	$: limit = bill?.limit ?? 0;
	$: rate = bill?.rate ?? 0;
	$: title = bill?.title ?? '';
</script>

<div class="flex flex-col p-4 gap-4 items-center">
	<h1 class="text-xl">Bill Edit</h1>
	<form
		class="flex flex-col gap-2 w-full lg:w-[500px]"
		id="update-bill-form"
		method="POST"
		action="?/update"
	>
		<Input name="title" val={title}>Account Nickname</Input>
		<Input name="balance" val={balance} variant="number">Current Balance</Input>
		<Input name="amount" val={amount} variant="number">Payment Amount</Input>
		<Input name="daydue" val={dayDue} variant="number">Day of Month Due</Input>
		<Input name="limit" val={limit} variant="number">Credit Limit</Input>
		<Input name="rate" val={rate} variant="number" step="0.01">Interest Rate</Input>
		<div class="flex justify-end w-full">
			<Button icon={showToast ? 'mdi:check' : ''} formName="update-bill-form" type="submit"
				>Update</Button
			>
		</div>
	</form>
	<Toast show={showToast} message="Bill updated." variant="success" />
</div>
