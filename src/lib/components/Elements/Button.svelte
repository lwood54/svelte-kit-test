<script lang="ts">
	import Icon from '@iconify/svelte';

	export let type: undefined | 'button' | 'submit' = 'submit';
	export let variant: undefined | 'negative' | 'positive' = 'positive';
	export let formName = '';
	export let icon: string = '';
	const buttonBase = 'flex relative items-center justify-center rounded w-full px-3 py-1';
	const negative = 'bg-red-500 hover:bg-red-600 focus:bg-red-800';
	const positive = 'bg-green-500 hover:bg-green-600 focus:bg-green-800';
	const variantClass = variant === 'negative' ? negative : positive;
	const buttonClass = `${buttonBase} ${variantClass}`;
</script>

<button
	form={formName}
	type={type === 'submit' ? 'submit' : 'button'}
	class={buttonClass}
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:focus
>
	{#if icon}
		<div class="absolute top-1 left-4 stroke-2">
			<Icon {icon} width="28" height="28" />
		</div>
	{/if}
	<slot />
</button>
