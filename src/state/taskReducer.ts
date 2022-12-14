import {addNewTodoAC, removeTodoAC, todolistId1, todolistId2} from "./todoReducer";
import {v1} from "uuid";

type TaskItem = {
    id: string
    title: string
    isDone: boolean
}
export type TaskType = {
    [key: string]: TaskItem[]
}

const initialState: TaskType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state: TaskType = initialState, action: ActionsType): TaskType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID]
                    .filter(e => e.id !== action.payload.taskID)
            }
        }
        case 'CHANGE_STATUS': {
            return {
                ...state, [action.payload.todoID]: state[action.payload.todoID].map(e => e.id === action.payload.taskID
                    ? {...e, isDone: action.payload.check}
                    : e
                )
            }
        }
        case "ADD_TASK": {
            let newTask: TaskItem = {
                id: v1(),
                title: action.payload.value,
                isDone: false
            }
            return {...state, [action.payload.todoID]: [newTask, ...state[action.payload.todoID]]}
        }
        case "REMOVE_TODO": {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoID]
            return stateCopy
        }
        case 'ADD_TODO': {
            return {
                ...state,
                [action.payload.todoID]: []
            }
        }
        case 'UPDATE_TASK_TITLE': {
            return {
                ...state, [action.payload.todoID]: state[action.payload.todoID].map(
                    e => e.id === action.payload.taskID
                        ? {...e, title: action.payload.upTitle}
                        : e
                )
            }
        }
        default:
            return state
    }
}

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeCheckedAC>
    | ReturnType<typeof addNewTaskAC>
    | ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addNewTodoAC>
    | ReturnType<typeof upTaskTitleAC>

export const removeTaskAC = (todoID: string, taskID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todoID,
            taskID
        }
    } as const
}
export const changeCheckedAC = (todoID: string, taskID: string, check: boolean) => {
    return {
        type: 'CHANGE_STATUS',
        payload: {
            todoID,
            taskID,
            check
        }
    } as const
}
export const addNewTaskAC = (todoID: string, value: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoID,
            value
        }
    } as const
}
export const upTaskTitleAC = (todoID: string, taskID: string, upTitle: string) => {
    return {
        type: 'UPDATE_TASK_TITLE',
        payload: {
            todoID,
            taskID,
            upTitle
        }
    } as const
}