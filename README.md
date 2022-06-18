# Svelte Popdown

Ultra minimal popover/dropdown component

Generate a popover/dropdown in the body element so it's above all other elements, but positioned next to another element (like the element where it was triggered), powered by `svelte-portal`, inspired by `ember-basic-dropdown`.

This purely does the positioning logic, no styling, no opening/closing logic, see example below on how to do that.

## Usage

Popover options:

- `position` string Where to position the popdown relative to the trigger e.g. inner/outer-top/left/right/bottom or middle default is "inner-left outer-bottom"
- `dropdownClass` string class for the dropdown element
- `target` optional target element if you want the popover in a specific parent element, default behavior is to find the closest scrollable element
- `calcX` optional - provide your own logic to calculate the X translation
- `calcY` optional - provide your own logic to calculate the Y translation

## Examples

dropdown:

```md
  <script>
    import Popdown from 'svelte-popdown';
    let isOpen = false;
  </script>
  <Popdown position="bottom left">
    <svelte:fragment slot="trigger">
      <div class="link trigger" on:click={() => isOpen = true}>
        Open the dropdown
      </div>
    </svelte:fragment>
    {#if isOpen}
      <svelte:fragment slot="content">
        <ul>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
        </ul>
      </svelte:fragment>
    {/if}
  </Popdown>
```

popover

```md
  <script>
    let isOpen = false;
  </script>
  <Popdown position="right">
    <svelte:fragment slot="trigger">
      <div class="link trigger" on:mouseover={() => isOpen = true} on:mouseout={() => isOpen = false}>
        Confusing UX
      </div>
    </svelte:fragment>
    {#if isOpen}
    <svelte:fragment slot="content">
      Description of UX
    </svelte:fragment>
    {/if}
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
