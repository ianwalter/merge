# @ianwalter/merge
> Recursively merge JavaScript objects

[![npm page][npmImage]][npmUrl]

## About

Inspired by and created as an alternative for [deepmerge][deepmergeUrl].

## Usage

```js
import merge from '@ianwalter/merge'

const item1 = { id: 1, details: { name: 'Civilian', lists: ['Folk'] } }
const item3 = { id: 2, details: { plays: 2 } }
const item2 = { id: 3, details: { lists: ['Chill', 'Alt'] } }

merge(item1, item2, item3) //=> {
//    id: 3,
//    details: {
//      name: 'Civilian',
//      plays: 2,
//      lists: ['Chill', 'Alt']
//    }
//  }
```

## Note

Like `Object.assign`, `merge` will treat the first passed item as the
"destination" and mutate it. If you want a new "destination" object simply
add [@ianwalter/clone][cloneUrl] and clone the first item beforehand, e.g.
`merge(clone(item1), item2)`.

## API

`merge(mergeType, item1, item2[, item3...]`

* **mergeType** - A `string` describing how to merge nested Arrays
  * `replace` - (default) Replace the source array with the new Array
  * `merge` - Attempt to merge Array items by index
  * `add` - Add new items into the source Array

## License

Apache 2.0 with Commons Clause - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://iankwalter.com)

[npmImage]: https://img.shields.io/npm/v/@ianwalter/merge.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/merge
[cloneUrl]: https://github.com/ianwalter/clone
[deepmergeUrl]: https://github.com/TehShrike/deepmerge
[licenseUrl]: https://github.com/ianwalter/merge/blob/master/LICENSE
