import {FilteredType} from "./App";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
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
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    //Добавление таски
    const [newTask, setNewTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    //Функции
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
        setError('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newTask) {
            onClickHandler()
        }
    }
    const onClickHandler = () => {
        if (newTask.trim()) {
            props.addTasks(newTask.trim())
            setNewTask('')
        } else {
            setError('Title is required')
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
                    className={error ? 'error' : ''}
                />
                <Button
                    name={"Add"}
                    callBack={onClickHandler}
                />
                {error && <div className={'error-message'}>{error}</div>}
            </div>

            <ul>
                {props.tasks.map((el) => {

                    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(el.id, e.currentTarget.checked)
                    }

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <Button
                                name={'X'}
                                callBack={() => remTaskHandler(el.id)}
                            />
                            <input
                                type={"checkbox"}
                                checked={el.isDone}
                                onChange={onChangeStatus}
                            />
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