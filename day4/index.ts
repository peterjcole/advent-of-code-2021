import { boards, drawnNumbers } from './input'

export const getWinningPositionFor: (Group, DrawnNumbers) => number = (
  group,
  drawnNumbers
) =>
  group.reduce(
    ({ isWinningRow, largestIndex }, number) => {
      if (!isWinningRow) return { isWinningRow, largestIndex }

      const index = drawnNumbers.indexOf(number)

      return index >= 0
        ? {
            isWinningRow: true,
            largestIndex: index > largestIndex ? index : largestIndex,
          }
        : { isWinningRow: false, largestIndex: null }
    },
    { isWinningRow: true, largestIndex: 0 }
  ).largestIndex

export const getBestWinningNumPositionFor: (
  RowOrColumn,
  DrawnNumbers
) => number = (rowOrColumn, drawnNumbers) => {
  return rowOrColumn.reduce(
    ({ winningRowIndex, winningNumIndex }, row, rowIndex) => {
      const winningNumIndexForRow = getWinningPositionFor(row, drawnNumbers)

      if (
        !winningNumIndex ||
        (winningNumIndexForRow && winningNumIndexForRow < winningNumIndex)
      ) {
        return {
          winningRowIndex: rowIndex,
          winningNumIndex: winningNumIndexForRow,
        }
      } else {
        return { winningRowIndex, winningNumIndex }
      }
    },
    { winningRowIndex: null, winningNumIndex: null }
  ).winningNumIndex
}

export const getWinningBoard: (
  GameBoards,
  DrawnNumbers
) => { winningBoard: Board; numbersWhichWereDrawn: number[] } = (
  boards,
  drawnNumbers
) => {
  const { winningBoard, winningIndex } = boards.reduce(
    ({ winningBoard, winningIndex }, board) => {
      const bestWinningNumPositionForRows = getBestWinningNumPositionFor(
        board.rows,
        drawnNumbers
      )

      const bestWinningNumPositionForCols = getBestWinningNumPositionFor(
        board.columns,
        drawnNumbers
      )

      const lowestIndex =
        bestWinningNumPositionForRows < bestWinningNumPositionForCols
          ? bestWinningNumPositionForRows
          : bestWinningNumPositionForCols

      if (!winningBoard || lowestIndex < winningIndex) {
        return { winningBoard: board, winningIndex: lowestIndex }
      } else {
        return { winningBoard, winningIndex }
      }
    },
    { winningBoard: null, winningIndex: null }
  )

  return {
    winningBoard,
    numbersWhichWereDrawn: drawnNumbers.splice(0, winningIndex + 1),
  }
}

export const parseBoards: (string) => GameBoards = (boardsInput) => {
  return boardsInput.split(/\n\n/).map((board) => {
    const rows = board.split(/\n/).map((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((numString) => parseInt(numString, 10))
    )

    const columns = rows[0].map((_, colIndex) =>
      rows.map((row) => row[colIndex])
    )
    return { rows, columns }
  })
}

export const calculateScore = (board, numbersWhichWereDrawn) => {
  const lastDrawnNumber =
    numbersWhichWereDrawn[numbersWhichWereDrawn.length - 1]

  return (
    board.rows
      .flat()
      .filter((num) => !numbersWhichWereDrawn.includes(num))
      .reduce((sum, num) => sum + num) * lastDrawnNumber
  )
}

// Challenge result

console.log('Final score:')
const { winningBoard, numbersWhichWereDrawn } = getWinningBoard(
  parseBoards(boards),
  drawnNumbers
)

console.log(calculateScore(winningBoard, numbersWhichWereDrawn))

// types
type GameBoards = Board[]

type Board = {
  rows: Group
  columns: Group
}

type Group = RowOrColumn[]

type RowOrColumn = number[]

type DrawnNumbers = number[]
