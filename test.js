import test from 'ava'
import merge from '.'
import clone from '@ianwalter/clone'

test('shallow Arrays get added together', t => {
  const arr1 = [1, 2, 3]
  const arr2 = [4, 5, 6]
  const arr3 = [7, 8, 9]
  t.deepEqual(merge(clone(arr1), arr2, arr3), [...arr1, ...arr2, ...arr3])
})

test('shallow Objects get merged', t => {
  const obj1 = { count: 1, color: 'green' }
  const obj2 = { count: 1, shape: 'triangle' }
  const obj3 = { count: 1, size: 'large' }
  t.deepEqual(merge(obj1, obj2, obj3), { ...obj1, ...obj2, ...obj3 })
})

test('nested Arrays get added together', t => {
  const obj1 = { count: 1, items: [1] }
  const obj2 = { count: 1, items: [2] }
  const obj3 = { count: 1, items: [3] }
  t.deepEqual(merge(obj1, obj2, obj3), { ...obj3, items: [1, 2, 3] })
})

test('nested Arrays get replaced when mergeType is "replace"', t => {
  const obj1 = { count: 1, items: [1] }
  const obj2 = { count: 1, items: [2] }
  const obj3 = { count: 1, items: [3] }
  t.deepEqual(merge('replace', obj1, obj2, obj3), obj3)
})

test('nested Objects get merged', t => {
  const general = { screwdriver: 'Phillips-Head' }
  const auto = { safety: ['Welding Gloves'] }
  const obj1 = { id: 'a', tools: { auto: ['Lift'], general } }
  const obj2 = { id: 'b', tools: { auto: ['Pressure Gauge'] } }
  const obj3 = { id: 'c', tools: { auto } }
  t.deepEqual(merge(obj1, obj2, obj3), { id: 'c', tools: { auto, general } })
})

test('Objects in nested Arrays are merged when mergeType is "merge"', t => {
  const color = 'green'
  const shape = 'triangle'
  const size = 'large'
  const obj1 = { id: 2, items: [{ color }] }
  const obj2 = { id: 2, items: [{ shape }] }
  const obj3 = { id: 2, items: [{ size }] }
  const expected = { id: 2, items: [{ color, shape, size }] }
  t.deepEqual(merge('merge', obj1, obj2, obj3), expected)
})

test('Arrays in nested Arrays are merged when mergeType is "merge"', t => {
  const color = 'green'
  const shape = 'triangle'
  const size = 'large'
  const obj1 = { id: 2, items: [[ color ]] }
  const obj2 = { id: 2, items: [[ shape ]] }
  const obj3 = { id: 2, items: [[ size ]] }
  t.deepEqual(merge('merge', obj1, obj2, obj3), obj3)
})
