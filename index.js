const isObj = i => typeof i === 'object' && i && !Array.isArray(i)

export default function merge (...items) {
  const destination = items.shift()
  for (const item of items) {
    if (isObj(item)) {
      for (const key in item) {
        const val = item[key]
        const destVal = destination[key]
        if (isObj(val)) {
          destination[key] = merge(isObj(destVal) ? destVal : {}, val)
        } else if (val !== undefined) {
          destination[key] = val
        }
      }
    }
  }
  return destination
}
