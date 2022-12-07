import {v1} from "uuid";
import {addTodoAC, removeTodoAC} from "./todoReducer";

export type InTaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskType = {
    [key: string]: InTaskType[]
}

export const taskReducer = (state: TaskType, action: ActionType) => {
    let todoID = action.payload.todoID
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {...state, [todoID]: state[todoID].filter(t => t.id !== action.payload.taskID)}
        }
        case 'CHANGE_CHECKED': {
            return {...state,
                [todoID]: state[todoID].map(e => e.id === action.payload.taskID ? {
                    ...e,
                    isDone: action.payload.isDone
                } : e)
            }
        }
        case 'ADD_TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [todoID]: [newTask, ...state[todoID]]}
        }
        case 'ADD_TODO': {
            return {[action.payload.todoID]: [], ...state}
        }
        case 'REMOVE_TODO': {
            const stateCopy={...state}
            delete stateCopy[action.payload.todoID]
            return stateCopy
        }
        case 'UPDATE_TASK_TITLE': {
            return {...state,
                [todoID]: state[todoID].map(e => e.id === action.payload.taskID ? {
                    ...e,
                    title:action.payload.upTitle
                } : e)
            }
        }
        default:
            return state
    }
};


//Action Creator

type ActionType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeCheckedAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof updateTitleTaskAC>
    | ReturnType<typeof removeTodoAC>


export const removeTaskAC = (todoID: string, taskID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todoID,
            taskID
        }
    } as const
}

export const changeCheckedAC = (todoID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE_CHECKED',
        payload: {
            todoID,
            taskID,
            isDone
        }
    } as const
}

export const addTaskAC = (todoID: string, title: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoID,
            title
        }
    } as const
}
/*export const addTodoInTaskAC = (todoID: string) => {
    return {
        type: 'ADD_TODO',
        payload: {
            todoID
        }
    } as const
}*/

export const updateTitleTaskAC = (todoID: string, taskID: string, upTitle: string) => {
    return {
        type: 'UPDATE_TASK_TITLE',
        payload: {
            todoID,
            taskID,
            upTitle
        }
    } as const
}
