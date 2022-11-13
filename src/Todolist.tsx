import {FilteredType} from "./App";
import React from "react";
import {Button} from "./components/Button";
import {AddTodoItem} from "./AddTodoItem";

type TasksPropsType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    todolistsID: string
    tasks: Array<TasksPropsType>
    removeTask: (todolistsID: string, taskID: string) => void
    filteredTask: (todolistsID: string, v: FilteredType) => void
    addTasks: (todolistsID: string, title: string) => void
    changeTaskStatus: (todolistsID: string, taskID: string, isDone: boolean) => void
    filter: FilteredType
    removeTodolist: (todolistsID: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const remTaskHandler = (elID: string) => {
        props.removeTask(props.todolistsID, elID)
    }
    const filterTsarTasksHandler = (v: FilteredType) => {
        props.filteredTask(props.todolistsID, v)
    }
    const onChangeStatus = (tID: string, isDone: boolean) => {
        props.changeTaskStatus(props.todolistsID, tID, isDone)
    }
    const onClickRemoveTodolistHandler = () => {
        props.removeTodolist(props.todolistsID)
    }
    const addTaskHandler = (title: string) => {
        props.addTasks(props.todolistsID, title)
    }

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickRemoveTodolistHandler}> X</button>
            </h3>

            <AddTodoItem addItem={addTaskHandler}/>

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

