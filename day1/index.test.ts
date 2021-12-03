import { getNumberOfDepthIncreases, getSlidingWindowIncreases } from './index'

const exampleData = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]

test('gets number of depth increases', () => {
  const increases = getNumberOfDepthIncreases(exampleData)

  expect(increases).toEqual(7)
})

test('gets number of sliding window increases', () => {
  const increases = getSlidingWindowIncreases(exampleData)

  expect(increases).toEqual(5)
})
