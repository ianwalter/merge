const isObj = i => typeof i === 'object' && i && !Array.isArray(i)

function merge (...items) {
  const circulars = (this && this.circulars) || []
  const destination = items.shift()
  for (const item of items) {
    circulars.push(item)
    if (isObj(item)) {
      for (const key in item) {
        const descriptor = Object.getOwnPropertyDescriptor(item, key)
        const val = item[key]
        const to = destination[key]
        if (circulars.includes(val)) {
          continue
        } else if (isObj(val)) {
          descriptor.value = merge.call({ circulars }, isObj(to) ? to : {}, val)
          Object.defineProperty(destination, key, descriptor)
        } else if (val !== undefined) {
          if (descriptor) {
            Object.defineProperty(destination, key, descriptor)
          } else {
            destination[key] = val
          }
        }
      }
    }
  }
  return destination
}

export default merge
