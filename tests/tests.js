const { test } = require('@ianwalter/bff')
const merge = require('..')

test`shallow Objects get merged ${t => {
  const obj1 = { count: 1, color: 'green' }
  const obj2 = { count: 1, shape: 'triangle' }
  const obj3 = { count: 1, size: 'large' }
  const shallow = { ...obj1, ...obj2, ...obj3 }
  t.expect(merge(obj1, obj2, obj3)).toStrictEqual(shallow)
}}`

test`nested Objects get merged ${t => {
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
  t.expect(merged).toMatchSnapshot()
  t.expect(obj1).toMatchSnapshot()
  t.expect(obj2).toMatchSnapshot()
}}`

test`nested Arrays get replaced ${t => {
  const obj1 = { count: 1, items: [1] }
  const obj2 = { count: 1, items: [2] }
  const obj3 = { count: 1, items: [3] }
  t.expect(merge(obj1, obj2, obj3)).toStrictEqual(obj3)
}}`

test`null values are not treated as objects ${t => {
  const obj1 = { id: 'a', tools: { auto: { safety: ['Welding Gloves'] } } }
  const obj2 = { id: 'b', tools: { auto: null } }
  t.expect(merge(obj1, obj2)).toStrictEqual(obj2)
}}`

test`prototype properties get merged ${t => {
  const obj1 = { run: () => 'RUN', log: () => 'LOG' }
  Object.setPrototypeOf(obj1, { dog: () => 'DOG' })
  const obj2 = { run: v => `RUN: ${v}` }
  Object.setPrototypeOf(obj2, { fog: () => 'FOG' })
  const obj3 = merge({}, obj1, obj2)
  t.expect(obj3.run('now')).toBe('RUN: now')
  t.expect(obj3.log()).toBe('LOG')
  t.expect(obj3.dog()).toBe('DOG')
  t.expect(obj3.fog()).toBe('FOG')
}}`

test`circulars ${t => {
  function Podcast () {
    this.name = 'Beanicles'
    this.circular = this
  }
  function Episode () {
    this.episodeName = 'Choo Choo'
    this.episode = this
  }
  const merged = merge({}, new Podcast(), new Episode())
  t.expect(merged).toMatchSnapshot()
}}`
