# Svelte Popdown

Ultra minimal popover/dropdown component

Generate a popover/dropdown in the body element so it's above all other elements, but positioned next to another element (like the element where it was triggered), powered by `svelte-portal`, inspired by `ember-basic-dropdown`.

This purely does the positioning logic, no styling, no opening/closing logic, see example below on how to do that.

## Usage

Popover options:

- `position` string Where to position the popdown relative to the trigger e.g. inner/outer-top/left/right/bottom or middle default is "inner-left outer-bottom"
- `dropdownClass` string class for the dropdown element
- `target` optional target element if you want the popover in a specific parent element, default is `document.scrollingElement`
- `calcX` optional - provide your own logic to calculate the X translation
- `calcY` optional - provide your own logic to calculate the Y translation

## Examples

#### Dropdown

```html
  <script>
    import Popdown from 'svelte-popdown';
    let clickDropdownVisible = false;

	const onClickOutside = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (!target.closest('.dropdown') && !target.closest('.trigger')) {
			clickDropdownVisible = false;
		}
	};
  </script>

  <svelte:body on:click={onClickOutside} />
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
```

#### Popover

```html
  <script>
    import Popdown from 'svelte-popdown';
	let hoverDropdownVisible = false;
  </script>
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
```

## Developing

Once you've created a project and installed dependencies with `yarn`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

```

```

````

## Building

```bash
npm run package
```
````
