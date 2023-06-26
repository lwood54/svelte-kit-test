<script lang="ts">
	import { rootStore } from '$lib/stores/root';
</script>

{#if $rootStore.username}
	<h1>Welcome to Bills IO {$rootStore.username}!</h1>
{:else}
	<h1>Welcome to Bills IO!</h1>
	<p>Here, you can keep track of your current bills.</p>
	<p>You can also log and categorise purchases, then view your spending patterns.</p>
{/if}
