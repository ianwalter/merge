const isObj = i => i && typeof i === 'object' && !Array.isArray(i)

function merge (...items) {
  const circulars = (this && this.circulars) || []
  const destination = items.shift()
  for (const item of items) {
    if (isObj(item)) {
      circulars.push(item)
      const props = Object.entries(Object.getOwnPropertyDescriptors(item))
      for (const [key, descriptor] of props) {
        const srcVal = item[key]
        const destVal = destination[key] || {}
        if (circulars.includes(srcVal)) {
          continue
        } else if (isObj(srcVal)) {
          descriptor.value = merge.call({ circulars }, destVal, srcVal)
          delete descriptor.get
          delete descriptor.set
        }
        if (srcVal !== undefined) {
          Object.defineProperty(destination, key, descriptor)
        }
      }
    }
  }
  return destination
}

export default merge
