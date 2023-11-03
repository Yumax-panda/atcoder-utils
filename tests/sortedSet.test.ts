import { SortedSet } from '../src/sortedSet'

test('sortedSet', () => {
  const s = new SortedSet<number>({
    array: [5, 3, 1, 10, 1],
  })
  expect(s.size).toBe(5)
  expect(s.buckets.every((a) => !!a.length)).toBe(true)
  expect(s.getItem(0)).toBe(1)
  expect(s.getItem(-1)).toBe(10)
})

test('sortedSet.add', () => {
  const s = new SortedSet<number>({
    array: [5, 3, 1, 10],
  })
  expect(s.add(5)).toBe(false)
  expect(s.add(4)).toBe(true)
  expect(s.size).toBe(5)
  expect(s.has(4)).toBe(true)
  expect(s.getItem(1)).toBe(3)
  expect(s.getItem(2)).toBe(4)
})

test('sortedSet.equals', () => {
  const a = new SortedSet<number>({
    array: [5, 3, 1, 10],
  })
  const b = new SortedSet<number>({
    array: [3, 5, 1, 10],
  })
  const c = new SortedSet<number>({
    array: [3, 5, 1],
  })
  const d = new SortedSet<number>({
    array: [3, 5, 1, 10, 11],
  })

  expect(a.equals(b)).toBe(true)
  expect(a.equals(c)).toBe(false)
  expect(a.equals(d)).toBe(false)
})

test('sortedSet.discard', () => {
  const s = new SortedSet<number>({
    array: [5, 3, 1, 10],
  })
  expect(s.discard(4)).toBe(false)
  expect(s.discard(5)).toBe(true)
  expect(s.size).toBe(3)
  expect(s.has(5)).toBe(false)
  expect(s.getItem(0)).toBe(1)
  expect(s.getItem(-1)).toBe(10)
})

test('sortedSet.count.le', () => {
  const s = new SortedSet<number>({
    array: [5, 3, 1, 10],
  })
  expect(s.count.le(3)).toBe(2)
  expect(s.count.le(4)).toBe(2)
  expect(s.count.le(0)).toBe(0)
  expect(s.count.le(10)).toBe(4)
  expect(s.count.le(11)).toBe(4)
})

test('sortedSet.count.lt', () => {
  const s = new SortedSet<number>({
    array: [5, 3, 1, 10],
  })
  expect(s.count.lt(3)).toBe(1)
  expect(s.count.lt(4)).toBe(2)
  expect(s.count.lt(0)).toBe(0)
  expect(s.count.lt(10)).toBe(3)
  expect(s.count.lt(11)).toBe(4)
})
