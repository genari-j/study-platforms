import { ReactNode, createContext, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: number
  task: string
  minutesAmount: number
  start: Date
  interruptedCycle?: Date
  finishedCycle?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: number | null
  amountSecondPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  handleInterruptCycle: () => void
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export const CyclesContextProvider = ({ children }: CyclesContextProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<number | null>(null)
  const [amountSecondPassed, setAmountSecondPassed] = useState(0)

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  const markCurrentCycleAsFinished = () => {
    setCycles((state) => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishedCycle: new Date() }
      } else {
        return cycle
      }
    }))
  }

  const setSecondsPassed = (seconds: number) => setAmountSecondPassed(seconds)

  const createNewCycle = (data: CreateCycleData) => {
    const newId = cycles.length + 1

    const payload: Cycle = {
      id: newId,
      task: data.task,
      minutesAmount: data.minutesAmount,
      start: new Date()
    }
    setActiveCycleId(newId)

    setCycles((state) => [...state, payload])
    setAmountSecondPassed(0)
  }

  const handleInterruptCycle = () => {
    setCycles((state) => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, interruptedCycle: new Date() }
      } else {
        return cycle
      }
    }))

    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        handleInterruptCycle
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}