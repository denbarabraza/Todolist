import {v1} from "uuid";

export const todolistId1 = v1()
export const todolistId2 = v1()

export type TodoType = {
    id: string
    title: string
}

const initialState: TodoType[] = [
    // {id: todolistId1, title: "What to learn"},
    // {id: todolistId2, title: "What to buy"}
]

//Reducer
export const todoReducer = (state = initialState, action: ActionsType): TodoType[] => {
    switch (action.type) {
        case 'REMOVE_TODO': {
            return state.filter(e => e.id !== action.payload.todoID);
        }
        case 'ADD_TODO': {
            let newTodo = {id: action.payload.todoID, title: action.payload.value}
            return [newTodo, ...state];
        }
        case 'SET_UPDATE_TITLE_TODO': {
            return state.map(t => t.id === action.payload.todoID
                    ? {...t, title: action.payload.upValue}
                    : t
                )
        }
        default:
            return state
    }
}


type ActionsType = ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addNewTodoAC>
    | ReturnType<typeof setUpTodoTitleAC>

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
export const setUpTodoTitleAC = (todoID: string, upValue: string) => {
    return {
        type: 'SET_UPDATE_TITLE_TODO',
        payload: {
            upValue,
            todoID
        }
    } as const
}
