import { useContext, useEffect } from 'react'

import { differenceInSeconds } from 'date-fns'

import { CyclesContext } from '~/contexts'

export const CycleContdown = () => {
  const { activeCycle, activeCycleId, amountSecondPassed, markCurrentCycleAsFinished, setSecondsPassed } = useContext(CyclesContext)
  const totalCycleSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: any

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.start)
        if (secondsDifference >= totalCycleSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalCycleSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
      activeCycle,
      totalCycleSeconds,
      activeCycleId,
      markCurrentCycleAsFinished,
      setSecondsPassed
    ])

  const currentCycleSeconds = activeCycle ? totalCycleSeconds - amountSecondPassed : 0

  const currentCycleMinutes = Math.floor(currentCycleSeconds / 60)
  const currentCycleMinutesRest = currentCycleSeconds % 60

  const cycleMinutes = String(currentCycleMinutes).padStart(2, '0')
  const cycleSeconds = String(currentCycleMinutesRest).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer | ${cycleMinutes}:${cycleSeconds}`
    }
  }, [cycleMinutes, cycleSeconds, activeCycle])

  return (
    <div>
      <span>{cycleMinutes[0]}</span>
      <span>{cycleMinutes[1]}</span>
      <span>:</span>
      <span>{cycleSeconds[0]}</span>
      <span>{cycleSeconds[1]}</span>
    </div>
  )
}