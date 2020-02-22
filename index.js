const isObj = i => typeof i === 'object' && i && !Array.isArray(i)

function merge (...items) {
  const circulars = (this && this.circulars) || []
  const destination = items.shift()
  for (const item of items) {
    circulars.push(item)
    if (isObj(item)) {
      for (const key in item) {
        const val = item[key]
        const to = destination[key]
        if (circulars.includes(val)) {
          continue
        } else if (isObj(val)) {
          destination[key] = merge.call({ circulars }, isObj(to) ? to : {}, val)
        } else if (val !== undefined) {
          destination[key] = val
        }
      }
    }
  }
  return destination
}

export default merge
