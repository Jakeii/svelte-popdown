<script lang="ts">
  import { createContentTransformStyleStore, type CalcPosition } from './stores/popdown';
  import { portal } from 'svelte-portal';
  import { type Writable, writable } from 'svelte/store';

  const isBrowser = typeof document !== 'undefined';

  export let contentClass = '';
  export let position = 'outer-bottom inner-left';
  export let target: string | HTMLElement = isBrowser ? (document.scrollingElement as HTMLElement) : 'body';
  export let showContent = false;
  export let calcLeft: null | CalcPosition = null;
  export let calcTop: null | CalcPosition = null;
  export let zIndex: null | number = null;

  const trigger: Writable<HTMLElement> = writable();
  const windowSize: Writable<number[]> = writable();
  const content: Writable<HTMLElement> = writable();
  const displayContent: Writable<boolean> = writable(showContent);

  $: displayContent.set(showContent);

  const bindTrigger = (el: HTMLElement) => {
    $trigger = el.firstChild instanceof HTMLElement ? el.firstChild : el;
  };

  const targetElement: Writable<HTMLElement> = writable();

  const updateTargetElement = (target: string | HTMLElement): void => {
    if (isBrowser && typeof target === 'string') {
      const query = document.querySelector<HTMLElement>(target);
      if (!query) {
        throw new Error(`Could not find target element: ${target}`);
      }
      $targetElement = query;
    } else if (isBrowser && target instanceof HTMLElement) {
      $targetElement = target;
    }
  };

  $: updateTargetElement(target);

  const contentTransformStyle = createContentTransformStyleStore(
    displayContent,
    windowSize,
    targetElement,
    trigger,
    calcLeft,
    calcTop,
    position,
  );
</script>

<svelte:window on:resize={(e) => ($windowSize = [e.currentTarget.innerWidth, e.currentTarget.innerHeight])} />

<div class="trigger" use:bindTrigger>
  <slot name="trigger" />
</div>

{#if target && showContent}
  <div
    class="content {contentClass}"
    bind:this={$content}
    style:transform={$contentTransformStyle}
    style:--z-index={zIndex}
    use:portal={target}
  >
    <slot name="content" />
  </div>
{/if}

<style>
  .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: var(--z-index, 100);
  }
</style>
