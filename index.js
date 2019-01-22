function runMerge (destination, key, value) {
  if (value !== undefined) {
    const keyIsUndefined = key === undefined
    const newDestination = keyIsUndefined ? destination : destination[key]
    if (
      typeof value === 'object' &&
      typeof newDestination === 'object' &&
      value &&
      newDestination &&
      !Array.isArray(value) &&
      !Array.isArray(newDestination)
    ) {
      Object.keys(value).forEach(newKey =>
        runMerge(newDestination, newKey, value[newKey])
      )
    } else if (!keyIsUndefined) {
      destination[key] = value
    }
  }
}

export default function merge (...items) {
  const destination = items.shift()
  items.forEach(value => runMerge(destination, undefined, value))
  return destination
}
