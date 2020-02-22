const { test } = require('@ianwalter/bff')
const merge = require('.')

test('shallow Objects get merged', ({ expect }) => {
  const obj1 = { count: 1, color: 'green' }
  const obj2 = { count: 1, shape: 'triangle' }
  const obj3 = { count: 1, size: 'large' }
  expect(merge({}, obj1, obj2, obj3)).toEqual({ ...obj1, ...obj2, ...obj3 })
})

test('nested Objects get merged', ({ expect }) => {
  const general = { screwdriver: { type: 'Phillips-Head' } }
  const auto = { safety: ['Welding Gloves'] }
  const obj1 = { id: 'a', tools: { auto: ['Lift'] } }
  const obj2 = { id: 'b', tools: { auto: ['Pressure Gauge'], general } }
  const obj3 = { id: 'c', tools: { auto } }
  expect(merge(obj1, obj2, obj3)).toEqual({ id: 'c', tools: { auto, general } })
})

test('nested Arrays get replaced', ({ expect }) => {
  const obj1 = { count: 1, items: [1] }
  const obj2 = { count: 1, items: [2] }
  const obj3 = { count: 1, items: [3] }
  expect(merge(obj1, obj2, obj3)).toEqual(obj3)
})

test('null values are not treated as objects', ({ expect }) => {
  const obj1 = { id: 'a', tools: { auto: { safety: ['Welding Gloves'] } } }
  const obj2 = { id: 'b', tools: { auto: null } }
  expect(merge(obj1, obj2)).toEqual(obj2)
})

test('prototype properties get merged', ({ expect }) => {
  const obj1 = { run: () => 'RUN', log: () => 'LOG' }
  Object.setPrototypeOf(obj1, { dog: () => 'DOG' })
  const obj2 = { run: v => `RUN: ${v}` }
  Object.setPrototypeOf(obj2, { fog: () => 'FOG' })
  const obj3 = merge({}, obj1, obj2)
  expect(obj3.run('now')).toBe('RUN: now')
  expect(obj3.log()).toBe('LOG')
  expect(obj3.dog()).toBe('DOG')
  expect(obj3.fog()).toBe('FOG')
})
