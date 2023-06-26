<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	$: message = data.message;
</script>

<h1>Error Page</h1>
<p class="text-center">{message}</p>
