import { expect, test } from 'bun:test'
import virtual from '../src'

Bun.plugin(virtual({
  'batman.js': 'export default "batman"',
  'src/robin.js': 'export const name = "robin"',
  'user.js': {
    name: 'Anthony Stark'
  }
}))

test('string - default export', async () => {
  const { default: mod } = await import('batman.js');
  expect(mod).toBe('batman')
})

test('string - named exports', async () => {
  const { name } = await import('src/robin.js');
  expect(name).toBe('robin')
})

test('object', async () => {
  const { name } = await import('user.js');
  expect(name).toBe('Anthony Stark')
})
