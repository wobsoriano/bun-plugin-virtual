# bun-plugin-virtual

Virtual modules plugin for Bun.

## Installation

```bash
bun add bun-plugin-virtual -d
```

## Bundler usage

```ts
import virtual from "bun-plugin-virtual";

Bun.build({
  // other config
  plugins: [
    virtual({
      // An extension is required. You can use any extension you want.
      'batman.js': `export default 'na na na na na'`,
      'src/robin.mjs': `export const robin = 'batmannnnn'`,
      'config.js': {
        hello: 'world'
      }
    })
  ],
});
```

In your sources you can now import the virtual modules

```ts
import batman from 'batman.js'
import { robin } from 'src/robin.mjs'
import { hello } from 'config.js'

console.log(batman) // na na na na na
console.log(robin) // batmannnnn
console.log(hello) // world
```

The contents of the virtual module will be inlined into your bundle.

## Runtime usage

To use as a runtime plugin, create a file that registers the plugin:

```ts
// virtual.ts
import virtual from 'bun-plugin-virtual'

Bun.plugin(virtual({}));
```

Then preload it in your `bunfig.toml`:

```toml
preload = ['./virtual.ts']
```

Inspired by [@rollup/plugin-virtual](https://www.npmjs.com/package/@rollup/plugin-virtual).

## License

MIT
