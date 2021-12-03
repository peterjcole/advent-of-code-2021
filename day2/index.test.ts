import {
  getSubmarinePosition,
  modifiersWithoutAim,
  modifiersWithAim,
} from './index'

const exampleData = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
]

test('it gets the final position', () => {
  const position = getSubmarinePosition(exampleData, modifiersWithoutAim)

  expect(position).toEqual({ depth: 10, horizontal: 15 })
})

test('it gets the final position with aim', () => {
  const position = getSubmarinePosition(exampleData, modifiersWithAim)

  expect(position.depth).toEqual(60)
  expect(position.horizontal).toEqual(15)
})
