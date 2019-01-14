function runMerge (mergeType, items, dest, key, value) {
  if (value !== undefined) {
    const isArray = Array.isArray(value)
    if (isArray && mergeType === 'add') {
      if (key === undefined) {
        dest.unshift(...value)
      } else {
        dest[key] = [...value, ...dest[key]]
      }
    } else if (!isArray && key !== undefined && dest[key] === undefined) {
      dest[key] = value
    } else if (!isArray && typeof value === 'object') {
      Object.keys(value).forEach(newKey => {
        const newItems = items.map(item => item[newKey])
        runMerge(mergeType, newItems, dest[key] || dest, newKey, value[newKey])
      })
    }
  }
}

export default function merge (...items) {
  let mergeType = 'add'
  if (typeof items[0] === 'string') {
    mergeType = items.shift()
  }
  const dest = items.pop()
  items.reverse().forEach(v => runMerge(mergeType, items, dest, undefined, v))
  return dest
}
