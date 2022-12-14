import {v1} from "uuid";
import {FilterType} from "../Todolist";

export type TodoType = {
    id: string
    title: string
    filter: FilterType
}

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: TodoType[] = [
    {id: todolistId1, title: "What to learn", filter: "All"},
    {id: todolistId2, title: "What to buy", filter: "Active"},
]

export const todoReducer = (state: TodoType[] = initialState, action: ActionsType): TodoType[] => {
    switch (action.type) {
        case "FILTERED_TODO": {
            return state.map(e => e.id === action.payload.todoID
                ? {...e, filter: action.payload.value}
                : e
            )
        }
        case "REMOVE_TODO": {
            return state.filter(e => e.id !== action.payload.todoID)
        }
        case "ADD_TODO": {
            let newTodo: TodoType = {
                id: action.payload.todoID,
                title: action.payload.value,
                filter: "All"
            }
            return [newTodo, ...state]
        }
        case "UPDATE_TODO_TITLE": {
            return state.map(e => e.id === action.payload.todoID
                ? {...e, title: action.payload.upTitle}
                : e)
        }
        default:
            return state
    }
}

//ActionCreator
type ActionsType =
    ReturnType<typeof filteredTodoAC>
    | ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addNewTodoAC>
    | ReturnType<typeof upTodoTitleAC>

export const filteredTodoAC = (todoID: string, value: FilterType) => {
    return {
        type: 'FILTERED_TODO',
        payload: {
            value,
            todoID
        }
    } as const
}
export const removeTodoAC = (todoID: string) => {
    return {
        type: 'REMOVE_TODO',
        payload: {
            todoID
        }
    } as const
}
export const addNewTodoAC = (value: string) => {
    return {
        type: 'ADD_TODO',
        payload: {
            value,
            todoID: v1()
        }
    } as const
}
export const upTodoTitleAC = (todoID: string, upTitle: string) => {
    return {
        type: 'UPDATE_TODO_TITLE',
        payload: {
            upTitle,
            todoID
        }
    } as const
}