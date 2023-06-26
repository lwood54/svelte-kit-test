<script lang="ts">
	export let isActive = false;
	export let href: string;
	export let onClick: () => void = () => {};
	export let preLoadAction: 'tap' | 'hover' = 'hover';
	$: twClass = `h-full px-4 py-2 border-b-2 hover:border-sky-600 ${
		isActive ? 'border-green-400' : 'border-transparent'
	}`;
</script>

<a {href} on:click={onClick} data-sveltekit-preload-data={preLoadAction}>
	<div class={twClass}>
		<slot />
	</div>
</a>
