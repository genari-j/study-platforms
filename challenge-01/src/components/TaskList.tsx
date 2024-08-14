import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    // Evitando que seja possível criar tasks em branco. Dados armazenados em (newtasktitle)
    if (!newTaskTitle) return;

    // Criando a interface das novas tasks conforme for adicionando pelo input, terá somente 3 campos
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false
    }

    // Pegando os dados de tasks anteriores, copiando eles na página novamente e adicionando uma nova task
    setTasks(oldState => [...oldState, newTask]);
    // Resetando o valor de dentro do input (Quando incluir uma nova task, o input ficará limpo)
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // Mapeando todas tasks, selecionando cada task mapeada e verificando se a task.id e o id são os mesmos ..
    // Na sequência fazemos um if ternário, ou seja, se for igual a true, se a task id for igual ao id
    // iremos retornar um objeto, que será nossa nova task pq se ela for igual, queremos alterar ela
    // Então iremos pegar os valores antigos da task, e informar que ele agora será negação de isComplete
    // Isso irá exatamente pegar a task antiga e subescrever suas propriedades adicionando uma nova
    // Que será o valor contrário dela
    // Já se o id for diferente, a gente retorna a task do jeito que ela já era ..
    // e por fim, setamos o setTasks para executar tudo

    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    } : task);

    setTasks(newTasks)

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // Tasks - Lista
    // Task - cada uma
    // Entrando em todas tasks e filtrando. Selecionando todas pelo id e avisando que se for diferente do id selecionado lá na tela, ele pode deletar.
    const filteredTasks = tasks.filter(task => task.id !== id);

    // Passando nossa informação acima para o filteredTasks
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>

          {tasks.map(task => (
            <li key={task.id}>

              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >

                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>

              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>

            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}