<script lang="ts">
	export let val: string | number;
	export let name: string;
	export let variant: 'text' | 'number' | 'password' = 'text';
	export let step: string | undefined = undefined;
	const style = 'bg-slate-800 bg-opacity-10 w-full text-slate-300 px-2 py-1 rounded border';
</script>

<label>
	<slot />
	<div>
		{#if variant === 'password'}
			<input class={style} {name} type="password" bind:value={val} />
		{:else if variant === 'number'}
			<input class={style} {name} type="number" {step} bind:value={val} />
		{:else}
			<input class={style} {name} type="text" bind:value={val} />
		{/if}
	</div>
</label>
