import { bisectRight, bisectLeft } from '../bisect'

type SortedSetProps<T> = {
  array?: T[]
  comparator?: (a: T, b: T) => any
  bucketRatio?: number
  splitRatio?: number
}

export class SortedSet<T> {
  private _array: T[][]
  private _comparator: (a: T, b: T) => any
  private _bucketRatio: number
  private _splitRatio: number
  private _size: number

  constructor({
    array = [],
    comparator,
    bucketRatio,
    splitRatio,
  }: SortedSetProps<T> = {}) {
    const n = array.length
    const _array = array
    const _bucketRatio = bucketRatio ?? 16
    const _splitRatio = splitRatio ?? 24
    const _comparator = comparator ?? ((a: any, b: any) => a - b)

    this._size = n
    this._bucketRatio = _bucketRatio
    this._splitRatio = _splitRatio
    this._comparator = _comparator

    if (
      _array.some(
        (value, index) =>
          index > 0 && _comparator(value, _array[index - 1]) < 0,
      )
    )
      _array.sort(_comparator)
    if (
      _array.some(
        (value, index) =>
          index > 0 && _comparator(value, _array[index - 1]) <= 0,
      )
    ) {
      const newArr: T[] = []
      _array.forEach((value) => {
        if (
          !newArr.length ||
          _comparator(newArr[newArr.length - 1], value) !== 0
        )
          newArr.push(value)
      })
    }
    const bucketSize = Math.trunc(Math.ceil(Math.sqrt(n / _bucketRatio)))
    this._array = [...Array(bucketSize)].map((_, index) => {
      const start = Math.floor((index * n) / bucketSize)
      const end = Math.floor(((index + 1) * n) / bucketSize)
      return _array.slice(start, end)
    })
  }

  [Symbol.iterator]() {
    return this._array.flatMap((bucket) => bucket)[Symbol.iterator]()
  }
}
