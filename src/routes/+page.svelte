<script lang="ts">
  import Popdown from '$lib/Popdown.svelte';
  import PositionExample from '../components/PositionExample.svelte';
  import { fade } from 'svelte/transition';
  import { onClickOutside } from '$lib/util/on-click-outside';

  const horizontalOptions = ['outer-left', 'inner-left', 'center', 'inner-right', 'outer-right'];
  const verticalOptions = ['above', 'top', 'bottom', 'below', 'middle'];

  let overflow = true;
  let clickContentVisible = false;
  let hoverContentVisible = false;
</script>

<h1>Popdown Demo</h1>
<h2>Onclick content:</h2>
<div>
  <Popdown position="below center" showContent={clickContentVisible}>
    <svelte:fragment slot="trigger">
      <button
        on:click={() => (clickContentVisible = !clickContentVisible)}
        use:onClickOutside={() => (clickContentVisible = false)}>click me</button
      >
    </svelte:fragment>
    <svelte:fragment slot="content">
      <div class="content" transition:fade|global>content</div>
    </svelte:fragment>
  </Popdown>
</div>
<h2>onhover popover</h2>
<Popdown position="outer-right center" showContent={hoverContentVisible}>
  <button
    on:mouseover={() => (hoverContentVisible = true)}
    on:focus={() => (hoverContentVisible = true)}
    on:mouseout={() => (hoverContentVisible = false)}
    on:blur={() => (hoverContentVisible = false)}
    slot="trigger"
  >
    hover me
  </button>
  <svelte:fragment slot="content">
    <div class="content" transition:fade|global>content</div>
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
      <PositionExample horizontal={horizontalOption} vertical={verticalOption} contentSize="small" {overflow} />
      <PositionExample horizontal={horizontalOption} vertical={verticalOption} contentSize="big" {overflow} />
    {/each}
  {/each}
</div>

<style>
  .postion-examples {
    display: flex;
    flex-wrap: wrap;
  }
</style>
