import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Play, Handpalm } from '~/assets'
import { CycleForm, CycleContdown } from './components'

import { Container, Content, StartCycle, StopCycle } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '~/contexts'

const newCycleValidatorSchema = z.object({
  task:
    z.string()
    .min(1, 'Atividade inválida.'),
  minutesAmount:
    z.number()
    .min(5, 'A atividade deve conter no mínimo 5 minutos.')
    .max(60, 'A atividade deve conter no máximo 60 minutos.')
})

type NewCycleFormData = z.infer<typeof newCycleValidatorSchema>

export const Home = () => {
  const { createNewCycle, handleInterruptCycle, activeCycle } = useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidatorSchema),
    defaultValues: { task: '', minutesAmount: 0 }
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const emptyFormValues = !task

  return (
    <Container>
      <Content>
        <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <CycleForm />
          </FormProvider>
          <CycleContdown />

          {activeCycle ? (
            <StopCycle type='button' onClick={handleInterruptCycle}>
              <img src={Handpalm} alt='Play' title='Play' />
              Interromper
            </StopCycle>
          ) : (
            <StartCycle type='submit' disabled={emptyFormValues}>
              <img src={Play} alt='Play' title='Play' />
              Começar
            </StartCycle>
          )}
        </form>
      </Content>
    </Container>
  )
}