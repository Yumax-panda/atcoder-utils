type BisectProps<T> = {
  array: T[]
  value: T
  lo?: number
  hi?: number
  comparator?: (a: T, b: T) => any
}

export function bisectRight<T>({
  array,
  value,
  lo = 0,
  hi,
  comparator,
}: BisectProps<T>) {
  if (lo < 0) throw new Error('start must be >= 0')
  let _hi = hi ?? array.length
  let _lo = lo

  const _comparator = comparator ?? ((a: any, b: any) => a - b)

  while (_lo < _hi) {
    const mid = (_lo + _hi) >>> 1
    if (_comparator(array[mid], value) > 0) _hi = mid
    else _lo = mid + 1
  }
  return _lo
}

export function bisectLeft<T>({
  array,
  value,
  lo = 0,
  hi,
  comparator,
}: BisectProps<T>) {
  if (lo < 0) throw new Error('start must be >= 0')
  let _hi = hi ?? array.length
  let _lo = lo

  const _comparator = comparator ?? ((a: any, b: any) => a - b)

  while (_lo < _hi) {
    const mid = (_lo + _hi) >>> 1
    if (_comparator(array[mid], value) < 0) _lo = mid + 1
    else _hi = mid
  }
  return _lo
}
