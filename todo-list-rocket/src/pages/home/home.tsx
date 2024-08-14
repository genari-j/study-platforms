import { FormEvent, useState } from 'react'

import { TaskProps } from '~/types'

import { FaTrash } from 'react-icons/fa'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import styles from './home.module.css'
import toast from 'react-hot-toast'

export const Home = () => {
  const [tasks, setTasks] = useState([
    { id: 1, task: 'Estudar React + Node.js', isComplete: false },
    { id: 2, task: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima perferendis laudantium delectus cupiditate, culpa soluta maxime? Similique recusandae quas error incidunt amet blanditiis corrupti. Error doloremque qui exercitationem earum fuga.', isComplete: false }
  ])
  const [taskMessage, setTaskMessage] = useState('')
  const [totalTasksSolved, setTotalTasksSolved] = useState(0)
  

  const newTaskEmpty = taskMessage.length === 0

  const handleAddNewTask = (event: FormEvent) => {
    event.preventDefault()

    if (!taskMessage) { return toast.error('Tarefa inválida.') }

    const newId = tasks.length + 1

    const payload = { id: newId, task: taskMessage, isComplete: false }

    setTasks([...tasks, payload])
    toast.success('Tarefa adicionada.')
    setTaskMessage('')
  }

  const handleDeleteTask = (selectedTask: TaskProps) => {
    const newTasks = tasks.filter(task => task !== selectedTask)
    setTotalTasksSolved(newTasks.filter(task => task.isComplete === true).length)
    setTasks(newTasks)
    toast.success('Tarefa removida.')
  }

  const handleToggleTaskCompletion = (id: number) => {
    const newTasks = tasks.map(task => task.id === id ? { ...task, isComplete: !task.isComplete } : task)
    setTotalTasksSolved(newTasks.filter(task => task.isComplete === true).length)
    setTasks(newTasks)
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>

        <form onSubmit={handleAddNewTask}>
          <input
            type='text'
            placeholder='Adicione uma nova tarefa'
            value={taskMessage}
            onChange={(event) => setTaskMessage(event.target.value)}
          />

          <button type='submit' disabled={newTaskEmpty}>Criar <AiOutlinePlusCircle /></button>
        </form>

        <div className={styles.tasksContainer}>
          <div className={styles.tasksHeader}>
            <p>Tarefas criadas <span>{tasks.length}</span></p>
            <p>Concluídas <span>{totalTasksSolved} de {tasks.length}</span></p>
          </div>

          <div className={styles.tasksContent}>
            {tasks.map((task) => {
              return (
                <div key={task.id}>
                  <div>
                    <input
                      type='radio'
                      checked={task.isComplete}
                      onChange={() => task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <p className={task.isComplete ? styles.lineThrough : ''}>{task.task}</p>
                  </div>
                  <button type='button' onClick={() => handleDeleteTask(task)}><FaTrash /></button>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </main>
  )
}