import {InTaskType} from "./state/taskReducer";
import React from "react";
import {FilterType} from "./App";
import s from './Todolist.module.css'
import {Button} from "./components/Button";
import {InputItem} from "./components/InputItem";
import {EditableSpan} from "./components/EditableSpan";


type TodolistPropsType = {
    title: string
    todoID: string
    task: InTaskType[]
    removeTask: (todoID: string, taskID: string) => void
    changeChecked: (todoID: string, taskID: string, isDone: boolean) => void
    filteredTask: (todoID: string, filter: FilterType) => void
    addTask: (todoID: string, title: string) => void
    removeTodo: (todoID: string) => void
    filter: FilterType
    updateTitleTask: (todoID: string, taskID: string, upTitle: string) => void
    updateTodoTitle: (todoID: string, uptitle: string) => void
}
export const Todolist: React.FC<TodolistPropsType> = (
    {
        todoID,
        task,
        removeTask,
        changeChecked,
        filteredTask,
        addTask,
        removeTodo,
        filter,
        ...props
    }) => {

    const onclickRemoveTaskHandler = (taskID: string,) => {
        removeTask(todoID, taskID)
    }
    const onChangeChecked = (taskID: string, isDone: boolean) => {
        changeChecked(todoID, taskID, isDone)
    }
    const onClickSuperFilter = (filter: FilterType) => {
        filteredTask(todoID, filter)
    }
    const onClickRemoveTodoHandler = () => {
        removeTodo(todoID)
    }
    const setInputItem = (title: string) => {
        addTask(todoID, title)
    }
    const setUpTodoTitle = (upTodoTitle: string) => {
        props.updateTodoTitle(todoID, upTodoTitle)
    }
    const setUpTaskTitle = (taskID: string, uptitle: string) => {
        props.updateTitleTask(todoID, taskID, uptitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={setUpTodoTitle}/>
                <Button
                    title={'X'}
                    callback={onClickRemoveTodoHandler}
                />
            </h3>
            <InputItem callback={(value) => setInputItem(value)}/>
            <ul key={todoID}>
                {task.map(t => {
                    return (
                        <li key={t.id}>
                            <input
                                type={'checkbox'}
                                checked={t.isDone}
                                onChange={(e) => onChangeChecked(t.id, e.currentTarget.checked)}
                            />
                            <EditableSpan title={t.title} callback={(uptitle) => setUpTaskTitle(t.id, uptitle)}/>
                            <Button title={'X'} callback={() => onclickRemoveTaskHandler(t.id)}/>
                        </li>
                    )
                })}
            </ul>

            <Button
                title={'All'}
                callback={() => onClickSuperFilter('All')}
                className={s.active}
                filter={filter}
            />
            <Button
                title={'Active'}
                callback={() => onClickSuperFilter('Active')}
                className={s.active}
                filter={filter}
            />
            <Button
                title={'Completed'}
                callback={() => onClickSuperFilter('Completed')}
                className={s.active}
                filter={filter}
            />
        </div>
    )
}