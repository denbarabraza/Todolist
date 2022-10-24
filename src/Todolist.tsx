import {FilteredType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./components/Button";

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
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTask) {
            props.addTasks(newTask)
            setNewTask('')
        }
    }
    const onClickHandler = () => {
        if (newTask) {
            props.addTasks(newTask)
            setNewTask('')
        }
    }
    const remTaskHandler = (elID: string) => {
        props.removeTask(elID)
    }
    const filterTsarTasksHandler = (v: FilteredType) => {
        props.filteredTask(v)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTask}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Button
                    name={"Add"}
                    callBack={onClickHandler}
                />
            </div>

            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li key={el.id}>
                            <Button
                                name={'X'}
                                callBack={() => remTaskHandler(el.id)}
                            />
                            <input type={"checkbox"} checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>

            <Button
                name={'All'}
                callBack={() => {
                    filterTsarTasksHandler('All')
                }}
            />
            <Button
                name={'Active'}
                callBack={() => {
                    filterTsarTasksHandler('Active')
                }}
            />
            <Button
                name={'Completed'}
                callBack={() => {
                    filterTsarTasksHandler('Completed')
                }}
            />
        </div>
    )
}