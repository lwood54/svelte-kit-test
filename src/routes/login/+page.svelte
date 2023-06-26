<script lang="ts">
	import { goto } from '$app/navigation';
	import type { ActionData, PageData } from './$types';
	import { browser } from '$app/environment';
	import { rootStore } from '$lib/stores/root';

	let username: string;
	let password: string;
	export let data: PageData;
	export let form: ActionData;

	$: if (data.isLoggedIn && browser && $rootStore.username) {
		// NOTE: page is on sever before mounting, so need to check for browser to ensure
		// this is now client-side. https://github.com/sveltejs/kit/discussions/3245
		goto('/');
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login page" />
</svelte:head>

<form method="POST" action="?/login">
	<label
		>Username
		<div>
			<input class="text-field" name="username" type="text" bind:value={username} />
		</div>
	</label>
	<label
		>Password
		<div>
			<input name="password" type="password" bind:value={password} />
		</div>
	</label>
	<button type="submit">Submit</button>
</form>
<!-- <div>{$rootStore.}</div> -->
{#if form?.error}
	<p>{form.error}</p>
	<a href="/signup">Want to Sign Up?</a>
{/if}

<style>
	.text-field {
		color: black;
	}
</style>
