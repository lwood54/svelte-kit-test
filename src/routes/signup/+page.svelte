<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;

	let username: string;
	let password: string;
	let email: string;
	let firstName: string;
	let lastName: string;
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login page" />
</svelte:head>

<form method="POST">
	<label
		>Username
		<div>
			<input class="text-slate-800" name="username" type="text" bind:value={username} />
		</div>
	</label>
	<label
		>Email
		<div>
			<input class="text-slate-800" name="email" type="email" bind:value={email} />
		</div>
	</label>
	<label
		>First Name
		<div>
			<input class="text-slate-800" name="firstname" type="text" bind:value={firstName} />
		</div>
	</label>
	<label
		>Last Name
		<div>
			<input class="text-slate-800" name="lastname" type="text" bind:value={lastName} />
		</div>
	</label>
	<label
		>Password
		<div>
			<input class="text-slate-800" name="password" type="password" bind:value={password} />
		</div>
	</label>
	<button type="submit">Sign Me Up!</button>
</form>
{#if form?.error}
	{form.error}
{/if}

<style>
</style>
