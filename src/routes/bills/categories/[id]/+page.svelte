<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Single Category Details</h1>
<p>Title: {data.category?.title}</p>
