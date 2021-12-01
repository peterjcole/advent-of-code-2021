import { input } from './input'

export const getNumberOfDepthIncreases = (input: number[]) => {
  return input.reduce((previousValue, currentValue, currentIndex, array) => {
    return currentValue > array[currentIndex - 1]
      ? previousValue + 1
      : previousValue
  }, 0)
}

console.log(getNumberOfDepthIncreases(input))

export const getSlidingWindowIncreases = (input: number[]) => {
  const windows = [...Array(input.length - 2).keys()].map((index) => {
    return input.slice(index, index + 3)
  })

  console.log(windows)

  return windows.reduce(
    ({ previousSum, numberOfIncreases }, currentValue) => {
      const currentSum = currentValue.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        0
      )

      return previousSum && currentSum > previousSum
        ? {
            previousSum: currentSum,
            numberOfIncreases: numberOfIncreases + 1,
          }
        : {
            previousSum: currentSum,
            numberOfIncreases,
          }
    },
    { previousSum: null, numberOfIncreases: 0 }
  ).numberOfIncreases
}

console.log(getSlidingWindowIncreases(input))
