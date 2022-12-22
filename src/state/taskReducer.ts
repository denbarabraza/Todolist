import {addNewTodoAC, removeTodoAC, todolistId1, todolistId2} from "./todoReducer";
import {v1} from "uuid";

//Type
export type FilterValueType = 'All' | 'Active' | 'Completed'
export type InDataTaskType = {
    id: string
    title: string
    isDone: boolean
}
type objType = {
    data: InDataTaskType[]
    filter: FilterValueType
}
export type TaskType = {
    [key: string]: objType
}

//State
const initialState: TaskType = {
    // [todolistId1]: {
    //     data: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: false}
    //     ],
    //     filter: "All"
    // },
    // [todolistId2]: {
    //     data: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "Salt", isDone: true}
    //     ],
    //     filter: "All"
    // }
}

//Reducer
export const taskReducer = (state = initialState, action: ActionsType): TaskType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: state[action.payload.todoID].data.filter(e => e.id !== action.payload.taskID)
                }
            };
        }
        case 'CHANGE_STATUS': {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: state[action.payload.todoID].data.map(e => e.id === action.payload.taskID
                        ? {...e, isDone: action.payload.isDone}
                        : e
                    )
                }
            }
        }
        case 'CHANGE_FILTER': {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    filter: action.payload.filter
                }
            }
        }
        case 'ADD_TASK': {
            let newTask = {id: v1(), title: action.payload.value, isDone: true}
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: [newTask, ...state[action.payload.todoID].data]
                }
            }
        }
        case 'REMOVE_TODO': {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoID]
            return stateCopy
        }
        case 'ADD_TODO': {
            return {
                [action.payload.todoID]: {data: [], filter: 'All'},
                ...state
            }
        }
        case "SET_UPDATE_TITLE_TASK": {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: state[action.payload.todoID].data.map(t => t.id === action.payload.taskID
                        ? {...t, title: action.payload.upValue}
                        : t
                    )
                }
            }
        }
        default:
            return state
    }
}


type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof onChangeTaskStatusAC>
    | ReturnType<typeof changeFilterValueAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addNewTodoAC>
    | ReturnType<typeof setUpTasksTitleAC>

export const removeTaskAC = (todoID: string, taskID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todoID,
            taskID
        }
    } as const
}

export const onChangeTaskStatusAC = (todoID: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE_STATUS',
        payload: {
            todoID,
            taskID,
            isDone
        }
    } as const
}

export const changeFilterValueAC = (todoID: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE_FILTER',
        payload: {
            todoID,
            filter
        }
    } as const
}

export const addTaskAC = (todoID: string, value: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoID,
            value
        }
    } as const
}

export const setUpTasksTitleAC = (todoID: string, taskID: string, upValue: string) => {
    return {
        type: 'SET_UPDATE_TITLE_TASK',
        payload: {
            todoID,
            taskID,
            upValue,
        }
    } as const
}