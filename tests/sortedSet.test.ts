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
