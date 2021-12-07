import {
  calculateScore,
  getBestWinningNumPositionFor,
  getWinningBoard,
  getWinningPositionFor,
  parseBoards,
} from './index'

const exampleDrawnNumbers = [
  7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
  20, 8, 19, 3, 26, 1,
]

const exampleBoards = `22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`

const expectedParsedBoards = [
  {
    rows: [
      [22, 13, 17, 11, 0],
      [8, 2, 23, 4, 24],
      [21, 9, 14, 16, 7],
      [6, 10, 3, 18, 5],
      [1, 12, 20, 15, 19],
    ],
    columns: [
      [22, 8, 21, 6, 1],
      [13, 2, 9, 10, 12],
      [17, 23, 14, 3, 20],
      [11, 4, 16, 18, 15],
      [0, 24, 7, 5, 19],
    ],
  },
  {
    rows: [
      [3, 15, 0, 2, 22],
      [9, 18, 13, 17, 5],
      [19, 8, 7, 25, 23],
      [20, 11, 10, 24, 4],
      [14, 21, 16, 12, 6],
    ],
    columns: [
      [3, 9, 19, 20, 14],
      [15, 18, 8, 11, 21],
      [0, 13, 7, 10, 16],
      [2, 17, 25, 24, 12],
      [22, 5, 23, 4, 6],
    ],
  },
  {
    rows: [
      [14, 21, 17, 24, 4],
      [10, 16, 15, 9, 19],
      [18, 8, 23, 26, 20],
      [22, 11, 13, 6, 5],
      [2, 0, 12, 3, 7],
    ],
    columns: [
      [14, 10, 18, 22, 2],
      [21, 16, 8, 11, 0],
      [17, 15, 23, 13, 12],
      [24, 9, 26, 6, 3],
      [4, 19, 20, 5, 7],
    ],
  },
]

it('parses the boards', () => {
  const result = parseBoards(exampleBoards)
  expect(result).toEqual(expectedParsedBoards)
})

it('gets the position of a winning number', () => {
  const result = getWinningPositionFor([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])
  expect(result).toEqual(4)
})

it('gets the index of the winning row', () => {
  const rows = [
    [1, 2, 3, 4, 5],
    [1, 2, 3, 4, 6],
    [18, 8, 23, 26, 20],
    [22, 11, 13, 6, 5],
    [2, 0, 12, 3, 7],
  ]

  const drawnNumbers = [1, 2, 3, 4, 5, 6]

  const result = getBestWinningNumPositionFor(rows, drawnNumbers)

  expect(result).toEqual(4)
})

it('gets the winning board and number', () => {
  const result = getWinningBoard(expectedParsedBoards, exampleDrawnNumbers)
  expect(result).toEqual({
    winningBoard: expectedParsedBoards[2],
    numbersWhichWereDrawn: [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24],
  })
})

it('calculates the winning score', () => {
  const result = calculateScore(
    expectedParsedBoards[2],
    [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24]
  )

  expect(result).toEqual(4512)
})
