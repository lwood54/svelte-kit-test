<script lang="ts">
	export let gap = 'gap-2';
	export let bg = 'bg-slate-100';
	export let p = 'p-4';
</script>

<!-- <div class={`flex flex-col ${getGap(gap)} border-2 border-slate-600 bg-slate-100 text-slate-800`}> -->
<div class={`flex flex-col ${p} ${gap} border-2 border-slate-600 ${bg} text-slate-800`}>
	<slot />
</div>
