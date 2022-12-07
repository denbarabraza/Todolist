import {FilterType} from "../App";
import {v1} from "uuid";

export type TodoType = InTodoType[]
type InTodoType = {
    id: string
    title: string
    filter: FilterType
}

export const todoReducer = (state: TodoType, action: ActionsType) => {

    switch (action.type) {
        case "FILTERED_TASK": {
            return state.map(e => e.id === action.payload.todoID
                ? {...e, filter: action.payload.filter}
                : e
            )
        }
        case 'REMOVE_TODO':{
            return state.filter(t=>t.id!==action.payload.todoID)
        }
        case 'ADD_TODO':{
            let newTodo:InTodoType={id: action.payload.todoID, title: action.payload.value, filter: "All"}
            return [newTodo,...state]
        }
        case 'UPDATE_TITLE_TODO': {
            return state.map(e => e.id === action.payload.todoID
                ? {...e, title:action.payload.title}
                : e
            )
        }
        default:
            return state
    }
};

type ActionsType =
    ReturnType<typeof filteredTaskAC>
    | ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addTodoAC>
    | ReturnType<typeof updateTitleTodoAC>

//Action Creator
export const filteredTaskAC = (todoID: string, filter: FilterType) => {
    return {
        type: 'FILTERED_TASK',
        payload: {
            todoID,
            filter
        }
    } as const
}

export const removeTodoAC = (todoID: string) => {
    return {
        type: 'REMOVE_TODO',
        payload: {
            todoID,
        }
    } as const
}

export const addTodoAC = (value:string) => {
    return {
        type: 'ADD_TODO',
        payload: {
            value,
            todoID:v1()
        }
    } as const
}
export const updateTitleTodoAC = (todoID: string, title: string) => {
    return {
        type: 'UPDATE_TITLE_TODO',
        payload: {
            title,
            todoID
        }
    } as const
}
