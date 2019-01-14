import test from 'ava'
import merge from '.'

test('merge adds shallow arrays together', t => {
  const arr1 = [1, 2, 3]
  const arr2 = [4, 5, 6]
  const arr3 = [7, 8, 9]
  const expected = [...arr1, ...arr2, ...arr3]
  t.deepEqual(merge(arr1, arr2, arr3), expected)
})

test('merge merges shallow objects', t => {
  const obj1 = { count: 1, color: 'green' }
  const obj2 = { count: 1, shape: 'triangle' }
  const obj3 = { count: 1, size: 'large' }
  t.deepEqual(merge(obj1, obj2, obj3), { ...obj1, ...obj2, ...obj3 })
})

test('merge adds nested arrays together', t => {
  const obj1 = { count: 1, items: [1] }
  const obj2 = { count: 1, items: [2] }
  const obj3 = { count: 1, items: [3] }
  t.deepEqual(merge(obj1, obj2, obj3), { ...obj3, items: [1, 2, 3] })
})

test('merge replaces nested arrays when replace is specified', t => {
  const obj1 = { count: 1, items: [1] }
  const obj2 = { count: 1, items: [2] }
  const obj3 = { count: 1, items: [3] }
  t.deepEqual(merge(obj1, obj2, obj3), obj3)
})

test('merge merges nested objects', t => {
  const msrp = [50, 20, 30]
  const discount = 10
  const obj1 = { id: 'a', price: { msrp: [msrp[0]], discount } }
  const obj2 = { id: 'b', price: { msrp: [msrp[1]] } }
  const obj3 = { id: 'c', price: { msrp: [msrp[2]] } }
  t.deepEqual(merge(obj1, obj2, obj3), { id: 'c', price: { msrp, discount } })
})
