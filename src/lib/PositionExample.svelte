<script lang="ts">
	import Popdown from '$lib/Popdown.svelte';
	export let horizontal: string;
	export let vertical: string;
	export let dropdownSize: string;
	export let overflow: boolean;

	let containerEl: HTMLElement;

	const isHTMLElement = (el: Element | null): el is HTMLElement => el instanceof HTMLElement;
</script>

<div class="container" bind:this={containerEl} class:overflow>
	<div class="popdown" class:overflow>
		<Popdown
			position="${horizontal} {vertical}"
			dropdownClass="dropdown {dropdownSize}"
			showContent={true}
			target={overflow
				? containerEl
				: isHTMLElement(document.scrollingElement)
				? document.scrollingElement
				: undefined}
		>
			<svelte:fragment slot="trigger">{horizontal} {vertical} Trigger</svelte:fragment>
			<svelte:fragment slot="content"
				>{horizontal}
				{vertical} content</svelte:fragment
			>
		</Popdown>
	</div>
</div>

<style lang="scss">
	.container {
		width: 500px;
		height: 500px;
		position: relative;
		flex: 0 0 500px;

		&.overflow {
			overflow: scroll;
		}

		border: 1px solid #000;
		background-color: rgb(179, 141, 141);
	}

	.popdown.overflow {
		width: 1000px;
		height: 1000px;
	}

	.popdown :global(.trigger) {
		transform: translate(100px, 50px);
		position: absolute;
		border: 1px solid #000;
		background-color: rgb(141, 179, 170);
	}

	:global(.dropdown) {
		border: 1px solid #000;
		background-color: rgb(120, 139, 204);

		&:global(.small) {
			width: 50px;
			height: 50px;
		}

		&:global(.big) {
			width: 150px;
			height: 150px;
		}
	}
</style>
