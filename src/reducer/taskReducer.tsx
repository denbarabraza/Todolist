import {TasksStateType} from "../App";
import {v1} from "uuid";

//Type
type ActionTaskType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeStatusAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof updateTitleTaskAC>

//Reducer
export const taskReducer = (state: TasksStateType, action: ActionTaskType) => {

    let todoID = action.payload.todolistId

    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state, [todoID]: state[todoID].filter(e => e.id !== action.payload.id)}
        }
        case 'ADD_TASK':{
            let newTask={id: v1(), title: action.payload.title, isDone: true}
            return {...state, [todoID]:[newTask,...state[todoID]]}
        }
        case 'CHANGE_STATUS':{
            return {...state, [todoID]:[...state[todoID].map(e=>e.id===action.payload.id ? {...e, isDone:action.payload.isDone}:e)]}
        }
        case 'ADD_TODO': {
            return {[todoID]:[],...state}
        }
        case 'UPDATE_TITLE_TASK': {
            return {...state, [todoID]:state[todoID].map(e=>e.id===action.payload.taskID ? {...e, title:action.payload.uptitle}:e)}
        }
        default:
            return state
    }
}

//ActionCreator
export const removeTaskAC = (id: string, todolistId: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            id,
            todolistId
        }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            title,
            todolistId
        }
    } as const
}
export const addTodoAC = (todolistId: string) => {
    return {
        type: 'ADD_TODO',
        payload: {
            todolistId
        }
    } as const
}
export const changeStatusAC=(id: string, isDone: boolean, todolistId: string)=>{
    return {
        type: 'CHANGE_STATUS',
        payload:{
            id,
            isDone,
            todolistId
        }
    } as const
}
export const updateTitleTaskAC=(todolistId: string, taskID: string, uptitle: string)=>{
    return{
        type: 'UPDATE_TITLE_TASK',
        payload:{
            todolistId,
            taskID,
            uptitle
        }
    }as const
}
