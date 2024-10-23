# Sly Boop

A Svelte action for creating 3D rotation effects on elements based on mouse movement.

## Installation

```bash
pnpm install sly-boop
```

## Usage

```svelte
<script>
  import boop from 'sly-boop';
</script>


<main>
    <div class="root" use:boop={{selector: 'img', variablesOnNode: true}}>
        <img src={imgTest} alt="test"/>
    </div>
</main>
```

## API

### boop(node, params)

- `node`: The HTML element to apply the effect to.
- `params` (optional): Configuration object

#### Parameters

- `selector`: CSS selector for the target element (child of `node`).
- `variablesOnNode`: Set to `true` to apply CSS variables to the node instead of the target element.
- `initialStyle`: Custom initial style for the target element.

## License

MIT
