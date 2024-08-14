import { useContext } from 'react'
import { CyclesContext } from '~/contexts'
import { formatDate, getStatusColor } from '~/utils'

import {
  Container,
  Content,
  TableBox,
  TableStatus
} from './styles'

export const TimerHistory = () => {
  const { cycles } = useContext(CyclesContext)

  return (
    <Container>
      <Content>
        <h2>Meu histórico</h2>

        <TableBox>
          <table>
            <thead>
              <tr>
                <th>Tarefa:</th>
                <th>Duração:</th>
                <th>Início:</th>
                <th>Status:</th>
              </tr>
            </thead>

            <tbody>
              {cycles.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>{task.task}</td>
                    <td>{task.minutesAmount} minutos</td>
                    <td>{formatDate(new Date(task.start)).publishedRelativeToNow}</td>
                    {task.finishedCycle &&(
                      <TableStatus $statusbg={getStatusColor('Concluída')}>Concluída</TableStatus>
                    )}
                    {task.interruptedCycle && (
                      <TableStatus $statusbg={getStatusColor('Interrompida')}>Interrompida</TableStatus>
                    )}
                    {(!task.interruptedCycle && !task.finishedCycle) && (
                      <TableStatus $statusbg={getStatusColor('Em andamento')}>Em andamento</TableStatus>
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableBox>
      </Content>
    </Container>
  )
}