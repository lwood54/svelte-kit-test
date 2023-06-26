<script lang="ts">
	import { page } from '$app/stores';
	import NavItem from '$lib/components/nav/NavItem.svelte';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	$: pageRoute = $page.route.id;

	const addItem = () => {
		const root = pageRoute?.split('/')[2];
		if (root) {
			const pathChunk = root === 'list' ? 'bill' : root;
			goto(`/bills/${pathChunk}/add`);
		}
	};
</script>

<div class="flex items-center justify-between bg-slate-600 px-4 py-2 gap-4">
	<div class="flex">
		<NavItem href="/bills/logs" isActive={pageRoute === '/bills/logs'}>Logs</NavItem>
		<NavItem href="/bills/categories" isActive={pageRoute === '/bills/categories'}
			>Categories</NavItem
		>
		<NavItem href="/bills/list" isActive={pageRoute === '/bills/list'}>List</NavItem>
	</div>
	<button class="p-2" on:click={addItem}>
		<Icon
			class="text-green-400 hover:text-green-600 active:text-green-200"
			icon="mdi:plus-circle-outline"
			width="45"
			height="45"
		/>
	</button>
</div>
<slot />
