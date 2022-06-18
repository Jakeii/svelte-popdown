<script>
	import Example from '$lib/Example.svelte';

	const horizontalOptions = ['outer-left', 'inner-left', 'center', 'inner-right', 'outer-right'];
	const verticalOptions = ['above', 'top', 'bottom', 'below', 'middle'];

	let overflow = false;
</script>

<h1>Popdown Demo</h1>

<div class="examples">
	{#each horizontalOptions as horizontalOption}
		{#each verticalOptions as verticalOption}
			<Example
				horizontal={horizontalOption}
				vertical={verticalOption}
				dropdownSize="small"
				{overflow}
			/>
			<Example
				horizontal={horizontalOption}
				vertical={verticalOption}
				dropdownSize="big"
				{overflow}
			/>
		{/each}
	{/each}
</div>

<style>
	.examples {
		display: flex;
		flex-wrap: wrap;
	}
</style>
