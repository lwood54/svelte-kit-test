<script lang="ts">
	import { rootStore } from '$lib/stores/root';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import './styles.css';
	import '../app.css';
	import NavItem from '$lib/components/nav/NavItem.svelte';

	export let data: PageData;
	$: pageRoute = $page.route.id;
	$: logoutQueryParam = $page.route.id === '/login' ? '?src=login' : '';
	$: {
		$rootStore = { email: data.userInfo?.email, username: data.userInfo?.username };
	}

	const clearStore = () => {
		$rootStore = {};
	};
</script>

<div class="flex bg-slate-800 px-4 py-2 justify-between">
	<div class="flex gap-4">
		<NavItem href="/" isActive={pageRoute === '/'}>Home</NavItem>
		{#if $rootStore.username}
			<NavItem href="/bills" isActive={Boolean(pageRoute?.includes('/bills'))}>Bills</NavItem>
		{/if}
	</div>
	<div class="nav-group-2">
		{#if $rootStore.username}
			<NavItem onClick={clearStore} href={`/logout${logoutQueryParam}`} preLoadAction="tap"
				>Logout</NavItem
			>
		{:else if $page.route.id === '/login'}
			<NavItem href="/signup">Sign Up</NavItem>
		{:else}
			<NavItem href="/login">Login</NavItem>
		{/if}
	</div>
</div>
<slot />
