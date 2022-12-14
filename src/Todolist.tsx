import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {addNewTaskAC, changeCheckedAC, removeTaskAC, TaskType, upTaskTitleAC} from "./state/taskReducer";
import {SuperButton} from "./components/SuperButton";
import {SuperInput} from "./components/SuperInput";
import {SuperEditSpan} from "./components/SuperEditSpan";
import {filteredTodoAC, removeTodoAC, upTodoTitleAC} from "./state/todoReducer";

export type FilterType = 'All' | 'Active' | 'Completed'
type TodolistPropsType = {
    todoID: string
    title: string
    filter: FilterType
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        todoID,
        title,
        filter,
    }) => {

    //Redux
    const dispatch = useDispatch()
    const tasks = useSelector<RootStateType, TaskType>(state => state.tasks)
    //Function
    const removeTask = (taskID: string) => {
        dispatch(removeTaskAC(todoID, taskID))

    }
    const onClickSuperFilter = (value: FilterType) => {
        dispatch(filteredTodoAC(todoID,value))
    }
    const onChangeChecked = (taskID: string, check: boolean) => {
        dispatch(changeCheckedAC(todoID, taskID, check))
    }
    const onClickRemoveTodo = () => {
        dispatch(removeTodoAC(todoID))
    }
    const addNewTask=(value:string)=>{
        dispatch(addNewTaskAC(todoID, value))
    }
    const setNewValueTodo=(upTitle: string)=>{
        dispatch(upTodoTitleAC(todoID,upTitle))
    }
    const setNewValueTask=(taskID:string,upTitle: string)=>{
        dispatch(upTaskTitleAC(todoID,taskID,upTitle))
    }

    let filteredTask = tasks[todoID]
    if (filter === 'Active') {
        filteredTask = tasks[todoID].filter(e => !e.isDone)
    }
    if (filter === 'Completed') {
        filteredTask = tasks[todoID].filter(e => e.isDone)
    }

    return (
        <div>
            <h3>
                <SuperEditSpan
                    title={title}
                    callback={setNewValueTodo}
                />
                <SuperButton title={'X'} callback={onClickRemoveTodo}/>
            </h3>
           <SuperInput
               callback={addNewTask}
           />
            <ul>
                {filteredTask.map(t => {
                    return (
                        <li key={t.id}>
                            <input
                                type={"checkbox"}
                                checked={t.isDone}
                                onChange={(e) => onChangeChecked(t.id, e.currentTarget.checked)}
                            />
                            <SuperEditSpan
                                title={t.title}
                                callback={(upTitle)=>setNewValueTask(t.id,upTitle)}
                            />
                            <SuperButton title={'X'} callback={() => removeTask(t.id)}/>
                        </li>
                    )
                })}
            </ul>

            <SuperButton
                title={'All'}
                callback={() => onClickSuperFilter('All')}
                filter={filter}
            />
            <SuperButton
                title={'Active'}
                callback={() => onClickSuperFilter('Active')}
                filter={filter}
            />
            <SuperButton
                title={'Completed'}
                callback={() => onClickSuperFilter('Completed')}
                filter={filter}
            />
        </div>
    )
}