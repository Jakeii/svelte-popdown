<script>import { createContentTransformStyleStore } from './stores/popdown';
import { portal } from 'svelte-portal';
import { writable } from 'svelte/store';
const isBrowser = 'document' in global && 'querySelector' in document;
export let contentClass = '';
export let position = 'outer-bottom inner-left';
export let target = isBrowser ? document.scrollingElement : 'body';
export let showContent = false;
export let calcLeft = null;
export let calcTop = null;
let trigger = writable();
let windowSize = writable();
let content = writable();
const bindTrigger = (el) => {
    $trigger = el.firstChild instanceof HTMLElement ? el.firstChild : el;
};
let targetElement = writable();
const updateTargetElement = (target) => {
    if (isBrowser && typeof target === 'string') {
        const query = document.querySelector(target);
        if (!query) {
            throw new Error(`Could not find target element: ${target}`);
        }
        $targetElement = query;
    }
    else if (isBrowser && target instanceof HTMLElement) {
        $targetElement = target;
    }
};
$: updateTargetElement(target);
const contentTransformStyle = createContentTransformStyleStore(windowSize, targetElement, trigger, calcLeft, calcTop, position);
</script>

<svelte:window on:resize={(e) => ($windowSize = [e.currentTarget.innerWidth, e.currentTarget.innerHeight])} />

<div class="trigger" use:bindTrigger>
  <slot name="trigger" />
</div>

{#if target && showContent}
  <div class="content {contentClass}" bind:this={$content} style:transform={$contentTransformStyle} use:portal={target}>
    <slot name="content" />
  </div>
{/if}

<style>
  .content {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
