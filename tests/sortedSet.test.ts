import { SortedSet } from '../src/sortedSet'

test('sortedSet', () => {
  const s = new SortedSet<number>({
    array: [5, 3, 1, 10],
  })
  expect(s.size).toBe(4)
  expect(s.has(5)).toBe(true)
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
