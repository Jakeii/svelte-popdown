<script lang="ts">
	import { createDropdownTransformStyleStore } from './stores/popdown';
	import { portal } from 'svelte-portal';
	import { type Writable, writable, derived } from 'svelte/store';
	import { browser } from '$app/env';

	export let dropdownClass = '';
	export let position = 'outer-bottom inner-left';
	export let target: string | HTMLElement =
		browser && document.scrollingElement instanceof HTMLElement ? document.scrollingElement : null;
	export let calcLeft: null | ((triggerLeft: number) => number) = null;
	export let calcTop: null | ((triggerTop: number) => number) = null;

	let trigger: Writable<HTMLElement> = writable();
	let windowSize: Writable<number[]> = writable();
	let dropdown: Writable<HTMLElement> = writable();

	const bindTrigger = (el: HTMLElement) => {
		$trigger = el.firstChild instanceof HTMLElement ? el.firstChild : el;
	};

	let targetElement: Writable<HTMLElement> = writable();

	$: browser &&
		targetElement.set(target instanceof HTMLElement ? target : document.querySelector(target));

	const dropdownTransformStyle = createDropdownTransformStyleStore(
		windowSize,
		targetElement,
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

{#if target}
	<div
		class="dropdown {dropdownClass}"
		bind:this={$dropdown}
		style:transform={$dropdownTransformStyle}
		use:portal={target}
		hidden
	>
		<slot name="content" />
	</div>
{/if}

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
