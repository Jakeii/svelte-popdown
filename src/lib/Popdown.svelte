<script lang="ts">
	import { createDropdownTransformStyleStore } from '../stores/popdown';
	import { portal } from 'svelte-portal';
	import { type Writable, writable, derived } from 'svelte/store';

	export let dropdownClass = '';
	export let position = 'outer-bottom inner-left';
	export let target: string | HTMLElement = null;
	export let calcLeft: null | ((triggerLeft: number) => number) = null;
	export let calcTop: null | ((triggerTop: number) => number) = null;

	let trigger: Writable<HTMLElement> = writable();
	let windowSize: Writable<number[]> = writable();
	let dropdown: Writable<HTMLElement> = writable();

	const bindTrigger = (el: HTMLElement) => {
		$trigger = el.firstChild instanceof HTMLElement ? el.firstChild : el;
	};

	// traverses trigger ancestors to find a scrollable element, otherwise use document.scrollingElement
	const scrollParent = derived(trigger, ($trigger: HTMLElement) => {
		if ($trigger) {
			let style = window.getComputedStyle($trigger);
			const excludeStaticParent = style.position === 'absolute';
			const overflowRegex = /(auto|scroll)/;

			if (style.position === 'fixed') return document.body;
			for (let parent: HTMLElement | null = $trigger; (parent = parent.parentElement); ) {
				style = window.getComputedStyle(parent);
				if (excludeStaticParent && style.position === 'static') {
					continue;
				}
				if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
					return parent;
				}
			}
			return document.scrollingElement as HTMLElement;
		}
		return;
	});
	const dropdownTransformStyle = createDropdownTransformStyleStore(
		windowSize,
		scrollParent,
		trigger,
		calcLeft,
		calcTop,
		position
	);
</script>

<svelte:window
	on:resize={(e) => ($windowSize = [e.currentTarget.innerWidth, e.currentTarget.innerHeight])}
/>

<div class="trigger" use:bindTrigger>
	<slot name="trigger" />
</div>

<div
	class="dropdown {dropdownClass}"
	bind:this={$dropdown}
	style:transform={$dropdownTransformStyle}
	use:portal={target || $scrollParent}
	hidden
>
	<slot name="content" />
</div>

<style>
	/* .trigger { */
	/* display: inline-flex; */
	/* position: relative;
		cursor: pointer;
		display: flex;
		height: 100%;
		align-items: center; */
	/* } */

	.dropdown {
		position: absolute;
		top: 0;
		left: 0;

		border: 1px solid #efefef;
		border-radius: 6px;
	}

	.hidden {
		visibility: hidden;
	}
</style>
