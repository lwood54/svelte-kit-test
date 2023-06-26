<script lang="ts">
	import { Input } from '$lib/components/Elements';
	import Modal from '$lib/components/Modal.svelte';
	export let onClose: () => void;
	let amount: number;
	let balance: number;
	let dayDue: number;
	let limit: number;
	let rate: number;
	let title: string;
</script>

<Modal {onClose} title="create bill" formName="create-bill-form">
	<form id="create-bill-form" method="POST">
		<Input name="title" val={title}>Account Nickname</Input>
		<Input name="balance" val={balance} variant="number">Current Balance</Input>
		<Input name="amount" val={amount} variant="number">Payment Amount</Input>
		<Input name="daydue" val={dayDue} variant="number">Day of Month Due</Input>
		<Input name="limit" val={limit} variant="number">Credit Limit</Input>
		<Input name="rate" val={rate} variant="number" step="0.01">Interest Rate</Input>
	</form>
</Modal>
