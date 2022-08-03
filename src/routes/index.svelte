<script lang="ts">
	import Popdown from '$lib/Popdown.svelte';
	import PositionExample from '$lib/PositionExample.svelte';
	import { fade } from 'svelte/transition';

	const horizontalOptions = ['outer-left', 'inner-left', 'center', 'inner-right', 'outer-right'];
	const verticalOptions = ['above', 'top', 'bottom', 'below', 'middle'];

	let overflow = true;
	let clickDropdownVisible = false;
	let hoverDropdownVisible = false;

	const onClickOutside = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (!target.closest('.dropdown') && !target.closest('.trigger')) {
			clickDropdownVisible = false;
		}
	};
</script>

<svelte:body on:click={onClickOutside} />

<h1>Popdown Demo</h1>
<h2>Onclick dropdown:</h2>
<div>
	<Popdown position="below middle">
		<svelte:fragment slot="trigger">
			<button on:click={() => (clickDropdownVisible = !clickDropdownVisible)}>click me</button>
		</svelte:fragment>
		<svelte:fragment slot="content">
			{#if clickDropdownVisible}
				<div class="dropdown" transition:fade>dropdown</div>
			{/if}
		</svelte:fragment>
	</Popdown>
</div>
<h2>onhover popover</h2>
<Popdown position="outer-right middle">
	<button
		on:mouseover={() => (hoverDropdownVisible = true)}
		on:focus={() => (hoverDropdownVisible = true)}
		on:mouseout={() => (hoverDropdownVisible = false)}
		on:blur={() => (hoverDropdownVisible = false)}
		slot="trigger"
	>
		hover me
	</button>
	<svelte:fragment slot="content">
		{#if hoverDropdownVisible}
			<div class="dropdown" transition:fade>dropdown</div>
		{/if}
	</svelte:fragment>
</Popdown>
<h2>Positioning:</h2>
<label>
	<input type="checkbox" bind:checked={overflow} />
	container is scrollable
</label>
<div class="postion-examples">
	{#each horizontalOptions as horizontalOption}
		{#each verticalOptions as verticalOption}
			<PositionExample
				horizontal={horizontalOption}
				vertical={verticalOption}
				dropdownSize="small"
				{overflow}
			/>
			<PositionExample
				horizontal={horizontalOption}
				vertical={verticalOption}
				dropdownSize="big"
				{overflow}
			/>
		{/each}
	{/each}
</div>

<style>
	.postion-examples {
		display: flex;
		flex-wrap: wrap;
	}
</style>
