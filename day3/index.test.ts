import { getLifeSupportRating, getPowerConsumption } from './index'

const exampleData = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
]

it('gets the power consumption', () => {
  expect(getPowerConsumption(exampleData)).toEqual({
    gammaRate: 22,
    epsilonRate: 9,
  })
})

it('gets the life support rating', () => {
  expect(getLifeSupportRating(exampleData)).toEqual({
    oxygenGenerator: 23,
    co2Scrubber: 10,
  })
})
