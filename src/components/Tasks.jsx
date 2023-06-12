import { Empty } from "./Empty";
import { WithTasks } from "./WithTasks.jsx";

import { PlusCircle } from "phosphor-react";

import styles from "./Tasks.module.css";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const initialTasks = [
  {
    id: uuidv4(),
    title: "Marcar Dermatologista",
    isDone: false,
  },
  {
    id: uuidv4(),
    title: "Ir no Pilates",
    isDone: true,
  },
  {
    id: uuidv4(),
    title: "Deixar de ser burra",
    isDone: false,
  },
];

export function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    event.preventDefault();

    const newTask = {
      id: uuidv4(),
      title: newTaskTitle,
      isDone: false,
    };

    setTasks([...tasks, newTask]);

    setNewTaskTitle("");
  }

  function deleteTask(taskToDelete) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskToDelete;
    });

    setTasks(tasksWithoutDeletedOne);
  }

  function checkedTask(taskToCheck) {
    const checkedTask = tasks.find((task) => {
      return task.id === taskToCheck;
    });

    if (checkedTask) {
      checkedTask.isDone = !checkedTask.isDone;
    }

    setTasks([...tasks]);
  }

  function onNewTaskChanged() {
    setNewTaskTitle(event.target.value);
  }

  const isEmptyTask = newTaskTitle.length === 0;

  return (
    <div className={styles.tasks}>
      <form onSubmit={handleCreateNewTask} className={styles.newTask}>
        <textarea
          type="text"
          name="task"
          required
          value={newTaskTitle}
          onChange={onNewTaskChanged}
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit" disabled={isEmptyTask}>
          Criar
          <PlusCircle size={20} weight="bold" />
        </button>
      </form>

      <div className={styles.info}>
        <div>
          <span className={styles.created}>Tarefas criadas</span>
          <span className={styles.counter}>{tasks.length}</span>
        </div>
        <div>
          <span className={styles.done}>Concluídas</span>
          <span className={styles.counter}>
            {`${tasks.filter((task) => task.isDone).length} de ${tasks.length}`}
          </span>
        </div>
      </div>

      <div>
        {tasks.length === 0 ? (
          <Empty />
        ) : (
          <div>
            {tasks.map((task) => {
              return (
                <WithTasks
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  isDone={task.isDone}
                  onDeleteTask={deleteTask}
                  onCheckedTask={checkedTask}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
