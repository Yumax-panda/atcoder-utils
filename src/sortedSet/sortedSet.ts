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

  get size() {
    return this._size
  }

  get array() {
    return this._array.flatMap((bucket) => bucket)
  }

  equals(other: any) {
    return (
      other instanceof SortedSet &&
      this.size === other.size &&
      this.array.every((value, index) => value === other.array[index])
    )
  }

  has(value: T) {
    if (this.size === 0) return false
    const [array, _, i] = this.position(value)
    return i != array.length && this._comparator(array[i], value) === 0
  }

  add(value: T): boolean {
    if (this.size === 0) {
      this._array = [[value]]
      this._size = 1
      return true
    }
    const [array, b, i] = this.position(value)
    if (i != array.length && this._comparator(array[i], value) === 0)
      return false
    array.splice(i, 0, value)
    this._size++
    if (array.length > this.array.length * this._splitRatio) {
      const mid = array.length >>> 1
      const left = array.slice(0, mid)
      const right = array.slice(mid)
      this._array.splice(b, 1, left, right)
    }
    return true
  }

  private position(value: T): [T[], number, number] {
    const comparator = this._comparator
    for (let i = 0; i < this._array.length; i++) {
      const array = this._array[i]
      const length = array.length
      if (comparator(value, array[length - 1]) <= 0) {
        return [array, i, bisectLeft({ array, value })]
      }
    }
    return [this._array[this._array.length - 1], this._array.length - 1, 0]
  }
}
