import { useContext } from 'react'

import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '~/contexts'

import { Minus, Plus } from '~/assets'

export const CycleForm = () => {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <fieldset>
      <legend>Tarefas</legend>

      <label htmlFor='task'>Vou trabalhar em</label>
      <input
        type='text'
        id='task'
        placeholder='descrição tarefa'
        disabled={!!activeCycle}
        {...register('task')}
      />

      <label htmlFor='minutesAmount'>durante</label>
      <button type='button'> <img src={Minus} alt='Sinal menos' title='Sinal menos' /> </button>
      <input
        type='number'
        id='minutesAmount'
        placeholder='00'
        disabled={!!activeCycle}
        step={5}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <button type='button'> <img src={Plus} alt='Sinal mais' title='Sinal mais' /> </button>

      <span>minutos.</span>
    </fieldset>
  )
}