const { test } = require('@ianwalter/bff')
const merge = require('.')

test('shallow Objects get merged', ({ expect }) => {
  const obj1 = { count: 1, color: 'green' }
  const obj2 = { count: 1, shape: 'triangle' }
  const obj3 = { count: 1, size: 'large' }
  const shallow = { ...obj1, ...obj2, ...obj3 }
  expect(merge(obj1, obj2, obj3)).toStrictEqual(shallow)
})

test('nested Objects get merged', async ({ expect }) => {
  const obj1 = {
    shouldThrow: true,
    logLevel: 'info',
    headers: {
      'user-agent': '@ianwalter/requester'
    },
    timeout: 60000
  }
  const obj2 = {
    headers: {
      'content-type': 'application/json',
      'content-length': '18'
    }
  }
  const merged = merge({}, obj1, obj2)
  expect(merged).toMatchSnapshot()
  expect(obj1).toMatchSnapshot()
  expect(obj2).toMatchSnapshot()
})

test('nested Arrays get replaced', ({ expect }) => {
  const obj1 = { count: 1, items: [1] }
  const obj2 = { count: 1, items: [2] }
  const obj3 = { count: 1, items: [3] }
  expect(merge(obj1, obj2, obj3)).toStrictEqual(obj3)
})

test('null values are not treated as objects', ({ expect }) => {
  const obj1 = { id: 'a', tools: { auto: { safety: ['Welding Gloves'] } } }
  const obj2 = { id: 'b', tools: { auto: null } }
  expect(merge(obj1, obj2)).toStrictEqual(obj2)
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

test('circulars', ({ expect }) => {
  function Podcast () {
    this.name = 'Beanicles'
    this.circular = this
  }
  function Episode () {
    this.episodeName = 'Choo Choo'
    this.episode = this
  }
  const merged = merge({}, new Podcast(), new Episode())
  expect(merged).toMatchSnapshot()
})
