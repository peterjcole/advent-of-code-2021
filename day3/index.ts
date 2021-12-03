import { input } from './input'

export const getPowerConsumption: (
  DiagnosticReport
) => PowerConsumptionReport = (report) => {
  const gammaRate = getRate(report, mostCommonBitCalculator)
  const epsilonRate = getRate(report, leastCommonBitCalculator)

  return { gammaRate, epsilonRate }
}

export const getLifeSupportRating: (DiagnosticReport) => LifeSupportReport = (
  report
) => {
  const oxygenGenerator = getGasRating(report, mostCommonBitCalculator)
  const co2Scrubber = getGasRating(report, leastCommonBitCalculator)

  return { oxygenGenerator, co2Scrubber }
}

const getGasRating = (report: DiagnosticReport, calculator: Calculator) => {
  const bitAccumulator = accumulateBits(report)

  const rating = bitAccumulator.reduce(
    ({ filteredReport, bitAccumulator }, _, bitIndex) => {
      if (filteredReport.length === 1) return { filteredReport, bitAccumulator }

      const currentBitCounter = bitAccumulator[bitIndex]

      const mostCommonBit = calculator(currentBitCounter)

      const newFilteredReport = filteredReport.filter(
        (diagnosticNumber) =>
          parseInt(diagnosticNumber.charAt(bitIndex), 10) === mostCommonBit
      )

      const newBitAccumulator = accumulateBits(newFilteredReport)
      return {
        filteredReport: newFilteredReport,
        bitAccumulator: newBitAccumulator,
      }
    },
    { filteredReport: [...report], bitAccumulator }
  ).filteredReport[0]

  return parseInt(rating, 2)
}

const accumulateBits: (DiagnosticReport) => Accumulator = (report) =>
  report.reduce((accumulator, diagnosticNumber) => {
    diagnosticNumber.split('').forEach((bit, index) => {
      accumulator[index][bit] += 1
    })
    return accumulator
  }, getAccumulator(report))

const mostCommonBitCalculator: Calculator = (currentBitCounter) =>
  currentBitCounter[0] > currentBitCounter[1] ? 0 : 1

const leastCommonBitCalculator: Calculator = (currentBitCounter) =>
  currentBitCounter[0] > currentBitCounter[1] ? 1 : 0

const getRate: (DiagnosticReport, Calculator) => number = (
  report,
  calculator
) => {
  const bitAccumulator = accumulateBits(report)

  return parseInt(
    bitAccumulator.reduce((commonValueAccumulator, currentBitCounter) => {
      const mostCommonValue = calculator(currentBitCounter)
      return commonValueAccumulator + mostCommonValue
    }, ''),
    2
  )
}

const getBitCounter: () => BitCounter = () => ({ 0: 0, 1: 0 })

const getAccumulator: (report: DiagnosticReport) => Accumulator = (report) =>
  report[0].split('').map(() => getBitCounter())

// Challenge result

console.log('Power consumption:')
const powerConsumption = getPowerConsumption(input)

console.log(powerConsumption)
console.log(powerConsumption.gammaRate * powerConsumption.epsilonRate)

console.log('Life support rating:')

const lifeSupportRating = getLifeSupportRating(input)

console.log(lifeSupportRating)
console.log(lifeSupportRating.co2Scrubber * lifeSupportRating.oxygenGenerator)

// Types

type DiagnosticReport = string[]

type BitCounter = {
  0: number
  1: number
}

type Accumulator = BitCounter[]

type Calculator = (BitCounter) => number

type LifeSupportReport = {
  co2Scrubber: number
  oxygenGenerator: number
}

type PowerConsumptionReport = {
  gammaRate: number
  epsilonRate: number
}
