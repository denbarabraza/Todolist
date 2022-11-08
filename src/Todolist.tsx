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
    todolistsID:string
    tasks: Array<TasksPropsType>
    removeTask: (todolistsID:string, taskID: string) => void
    filteredTask: (todolistsID:string, v: FilteredType) => void
    addTasks: (todolistsID:string ,title: string) => void
    changeTaskStatus: (todolistsID:string,taskID: string, isDone: boolean) => void
    filter: FilteredType
    removeTodolist:(todolistsID:string)=>void
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
            props.addTasks(props.todolistsID,newTask.trim())
            setNewTask('')
        } else {
            setError('Title is required')
        }
    }
    const remTaskHandler = (elID: string) => {
        props.removeTask(props.todolistsID,elID)
    }
    const filterTsarTasksHandler = (v: FilteredType) => {
        props.filteredTask(props.todolistsID, v)
    }
    const onChangeStatus = (tID: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistsID,tID, isDone)
    }

    const onClickRemoveTodolistHandler=()=>{
        props.removeTodolist(props.todolistsID)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickRemoveTodolistHandler}> X </button>
            </h3>
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

                    return (
                        <li key={el.id} className={el.isDone ? 'is-done' : ''}>
                            <Button
                                name={'X'}
                                callBack={() => remTaskHandler(el.id)}
                            />
                            <input
                                type={"checkbox"}
                                checked={el.isDone}
                                onChange={(event) => onChangeStatus(el.id, event.currentTarget.checked)}
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
                filter={props.filter}
            />
            <Button
                name={'Active'}
                callBack={() => {
                    filterTsarTasksHandler('Active')
                }}
                filter={props.filter}
            />
            <Button
                name={'Completed'}
                callBack={() => {
                    filterTsarTasksHandler('Completed')
                }}
                filter={props.filter}
            />
        </div>
    )
}