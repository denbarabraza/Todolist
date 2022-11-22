import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {InputItem} from "./components/InputItem";
import EditableSpan from "./components/EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    updateTitleTask:(todolistId: string, taskID: string, uptitle:string)=>void
    updateTitleTodo:(todolistId: string,  uptitle:string)=>void
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const setInputValue=(title:string)=>{
        props.addTask(title,props.id)
    }
    const upTitle=(taskID:string,uptitle:string)=>{
        props.updateTitleTask(props.id,taskID,uptitle)
    }
    const upTodo=(uptitle:string)=>{
        props.updateTitleTodo(props.id,uptitle)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callback={upTodo}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <InputItem callback={(title)=>setInputValue(title)}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={(uptitle)=>{upTitle(t.id, uptitle)}}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


