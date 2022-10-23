import {FilteredType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id: string) => void
    filteredTask: (v: FilteredType) => void
    addTasks: (title: string) => void
}


export const Todolist = (props: TodolistPropsType) => {

    //Добавление таски
    const [newTask, setNewTask] = useState('')

    //Функции
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTasks(newTask)
            setNewTask('')
        }
    }
    const onClickHandler = () => {
        props.addTasks(newTask)
        setNewTask('')
    }
    const filterAllTasksHandler =() => {
        props.filteredTask('All')
    }
    const filterActiveTasksHandler =() => {
        props.filteredTask('Active')
    }
    const filterCompletedTasksHandler =() => {
        props.filteredTask('Completed')
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTask}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={onClickHandler}> Add  </button>
            </div>

            <ul>
                {props.tasks.map((el) => {
                    const remTaskHandler=() => {
                        props.removeTask(el.id)
                    }
                    return (
                        <li key={el.id}>
                            <button onClick={remTaskHandler}> X
                            </button>
                            <input type={"checkbox"} checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>

            <button onClick={filterAllTasksHandler}> All </button>
            <button onClick={filterActiveTasksHandler}> Active </button>
            <button onClick={filterCompletedTasksHandler}> Completed </button>
        </div>
    )
}