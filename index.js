function runMerge (mergeType, destination, key, value) {
  if (value !== undefined) {
    const valueIsArray = Array.isArray(value)
    const keyIsUndefined = key === undefined
    const newDestination = keyIsUndefined ? destination : destination[key]
    const newDestinationIsArray = Array.isArray(newDestination)
    const areObjects = newDestination &&
      value &&
      typeof newDestination === 'object' &&
      typeof value === 'object'
    const areNotArrays = !valueIsArray && !newDestinationIsArray
    if (valueIsArray && newDestinationIsArray && mergeType === 'add') {
      if (keyIsUndefined) {
        newDestination.push.apply(newDestination, value)
      } else {
        destination[key] = newDestination.concat(value)
      }
    } else if (areObjects && (areNotArrays || mergeType === 'merge')) {
      Object.keys(value).forEach(newKey =>
        runMerge(mergeType, newDestination, newKey, value[newKey])
      )
    } else if (!keyIsUndefined) {
      destination[key] = value
    }
  }
}

export default function merge (...items) {
  let mergeType = 'add'
  if (typeof items[0] === 'string') {
    mergeType = items.shift()
  }
  const destination = items.shift()
  items.forEach(value => runMerge(mergeType, destination, undefined, value))
  return destination
}
