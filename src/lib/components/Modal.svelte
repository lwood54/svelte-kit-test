<script lang="ts">
	import { slide } from 'svelte/transition';
	import { Button } from './Elements';
	export let onClose: () => void;
	export let title = '';
	export let formName = '';
</script>

<div
	on:click={onClose}
	on:keydown={onClose}
	class="fixed top-0 left-0 w-full h-full bg-slate-600/75 z-50"
	id="background"
>
	<div transition:slide class="flex flex-col justify-center items-center h-full">
		<div
			on:click={(e) => e.stopPropagation()}
			on:keydown={(e) => e.stopPropagation()}
			class="flex flex-col justify-center w-96 bg-slate-800 p-4"
		>
			<h1 class="w-full text-center text-lg">{title}</h1>
			<div class="flex justify-end w-full">
				<button on:click|stopPropagation={onClose}>X</button>
			</div>
			<slot />
			<div class="flex justify-end w-full gap-4">
				<Button
					on:click={(e) => {
						e.preventDefault();
						onClose();
					}}
					variant="negative">Cancel</Button
				>
				<Button {formName} type="submit">Submit</Button>
			</div>
		</div>
	</div>
</div>
