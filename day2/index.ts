import { input } from './input'

export const modifiersWithoutAim: Modifiers = {
  forward: ({ depth, horizontal }, amount) => ({
    depth,
    horizontal: horizontal + amount,
  }),
  up: ({ depth, horizontal }, amount) => ({
    depth: depth - amount,
    horizontal,
  }),
  down: ({ depth, horizontal }, amount) => ({
    depth: depth + amount,
    horizontal,
  }),
}

export const modifiersWithAim: Modifiers = {
  forward: ({ depth, horizontal, aim }, amount) => ({
    depth: depth + aim * amount,
    horizontal: horizontal + amount,
    aim,
  }),
  up: ({ depth, horizontal, aim }, amount) => ({
    depth,
    horizontal,
    aim: aim - amount,
  }),
  down: ({ depth, horizontal, aim }, amount) => ({
    depth,
    horizontal,
    aim: aim + amount,
  }),
}

export const getSubmarinePosition = (commands, modifiers) => {
  return commands.reduce(
    (previousPosition, currentCommand) => {
      const [command, amount] = currentCommand.split(' ')
      const amountInt = parseInt(amount)
      return modifiers[command](previousPosition, amountInt)
    },
    { depth: 0, horizontal: 0, aim: 0 }
  )
}

type SubmarinePosition = {
  depth: number
  horizontal: number
  aim?: number
}

type Modifier = (SubmarinePosition, number) => SubmarinePosition

type Modifiers = {
  forward: Modifier
  up: Modifier
  down: Modifier
}

const submarinePosition = getSubmarinePosition(input, modifiersWithoutAim)
console.log(submarinePosition)
console.log(submarinePosition.depth * submarinePosition.horizontal)

const submarinePositionWithAim = getSubmarinePosition(input, modifiersWithAim)
console.log(submarinePositionWithAim)
console.log(
  submarinePositionWithAim.depth * submarinePositionWithAim.horizontal
)
