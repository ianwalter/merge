import test from 'ava'
import merge from '.'

test('shallow Objects get merged', t => {
  const obj1 = { count: 1, color: 'green' }
  const obj2 = { count: 1, shape: 'triangle' }
  const obj3 = { count: 1, size: 'large' }
  t.deepEqual(merge(obj1, obj2, obj3), { ...obj1, ...obj2, ...obj3 })
})

test('nested Objects get merged', t => {
  const general = { screwdriver: { type: 'Phillips-Head' } }
  const auto = { safety: ['Welding Gloves'] }
  const obj1 = { id: 'a', tools: { auto: ['Lift'] } }
  const obj2 = { id: 'b', tools: { auto: ['Pressure Gauge'], general } }
  const obj3 = { id: 'c', tools: { auto } }
  t.deepEqual(merge(obj1, obj2, obj3), { id: 'c', tools: { auto, general } })
})

test('nested Arrays get replaced', t => {
  const obj1 = { count: 1, items: [1] }
  const obj2 = { count: 1, items: [2] }
  const obj3 = { count: 1, items: [3] }
  t.deepEqual(merge(obj1, obj2, obj3), obj3)
})

test('null values are not treated as objects', t => {
  const obj1 = { id: 'a', tools: { auto: { safety: ['Welding Gloves'] } } }
  const obj2 = { id: 'b', tools: { auto: null } }
  t.deepEqual(merge(obj1, obj2), obj2)
})

test('prototype properties get merged', t => {
  const obj1 = { run: () => 'RUN', log: () => 'LOG' }
  Object.setPrototypeOf(obj1, { dog: () => 'DOG' })
  const obj2 = { run: v => `RUN: ${v}` }
  Object.setPrototypeOf(obj2, { fog: () => 'FOG' })
  const obj3 = merge({}, obj1, obj2)
  t.is(obj3.run('now'), 'RUN: now')
  t.is(obj3.log(), 'LOG')
  t.is(obj3.dog(), 'DOG')
  t.is(obj3.fog(), 'FOG')
})
