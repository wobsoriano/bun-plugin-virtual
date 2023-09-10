import dts from 'bun-plugin-dts'
import virtual from './src'

await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  plugins: [dts()]
})
