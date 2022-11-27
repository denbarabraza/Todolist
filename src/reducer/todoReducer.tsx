import {FilterValuesType, TodolistType} from "../App";

type ActionTodoType =
    ReturnType<typeof changeFilterAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addNewTodoAC>
    | ReturnType<typeof updateTitleTodoAC>

export const todoReducer = (state: TodolistType[], action: ActionTodoType) => {

    let todoID = action.payload.todolistId

    switch (action.type) {
        case 'CHANGE_FILTER': {
            return state.map(e => e.id === todoID ? {...e, filter: action.payload.value} : e)
        }
        case 'REMOVE_TODO': {
            return state.filter(e => e.id !== todoID)
        }
        case 'ADD_NEW_TODO': {
            let newTodo: TodolistType = {
                id: todoID,
                title: action.payload.title,
                filter: "all"
            }
            return [newTodo, ...state]
        }
        case 'UPDATE_TITLE_TODO': {
            return state.map(e => e.id === todoID ? {...e, title: action.payload.title} : e)
        }
        default:
            return state
    }
}

export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'CHANGE_FILTER',
        payload: {
            value,
            todolistId
        }
    } as const
}
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODO',
        payload: {
            todolistId
        }
    } as const
}
export const addNewTodoAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_NEW_TODO',
        payload: {
            title,
            todolistId
        }
    } as const
}
export const updateTitleTodoAC = (todolistId: string, title: string) => {
    return {
        type: 'UPDATE_TITLE_TODO',
        payload: {
            title,
            todolistId
        }
    } as const
}