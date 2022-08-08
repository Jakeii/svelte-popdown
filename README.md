# Svelte Popdown

Ultra minimal popover/dropdown component

Generate a popover/dropdown in the body element so it's above all other elements, but positioned next to another element (like the element where it was triggered), powered by `svelte-portal`, inspired by `ember-basic-dropdown`.

This purely does the positioning logic, no styling, no opening/closing logic, see example below on how to do that.

## Usage

Popover options:

- `position` string Where to position the popdown relative to the trigger e.g. (inner|outer)-(top|left|right|bottom) or center (horizontal)/middle (vertical) default is "inner-left outer-bottom"
- `contentClass` string class for the content element
- `target` optional target element if you want the popover in a specific parent element, default is `document.scrollingElement`
- `showContent` show the content slot, default is `false`
- `calcX` optional - provide your own logic to calculate the X translation
- `calcY` optional - provide your own logic to calculate the Y translation

## Examples

#### Content

```html
  <script>
    import Popdown, { onClickOutside } from 'svelte-popdown';
    let clickContentVisible = false;

  </script>
  <Popdown position="below middle" showContent={clickContentVisible}>
    <button
      slot="trigger"
      on:click={() => (clickContentVisible = !clickContentVisible)}
      use:onClickOutside={() => (clickContentVisible = false)}
    >
      click me
    </button>
    <div class="content" slot="content" transition:fade>content</div>
  </Popdown>
```

#### Popover

```html
  <script>
    import Popdown from 'svelte-popdown';
	let hoverContentVisible = false;
  </script>
  <Popdown position="outer-right middle" showContent={hoverContentVisible}>
	<button
		on:mouseover={() => (hoverContentVisible = true)}
		on:focus={() => (hoverContentVisible = true)}
		on:mouseout={() => (hoverContentVisible = false)}
		on:blur={() => (hoverContentVisible = false)}
		slot="trigger"
	>
		hover me
	</button>
	<div class="content" slot="content" transition:fade>content</div>
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
