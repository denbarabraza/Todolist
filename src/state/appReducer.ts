export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type AppReducerType = {
    statusApp: RequestStatusType
    errorApp: string | null
}

const initialState: AppReducerType = {
    statusApp: 'loading' as RequestStatusType,
    errorApp: null
}

//Reducer
export const appReducer = (state = initialState, action: ActionsType): AppReducerType => {
    switch (action.type) {
        case 'APP/SET_STATUS': {
            return {...state, statusApp: action.payload.statusApp};
        }
        case 'APP/SET_ERROR': {
            return {...state, errorApp: action.payload.errorApp};
        }
        default:
            return state
    }
}
//Action Type
type ActionsType =
    | ReturnType<typeof setStatusAppAC>
    | ReturnType<typeof setErrorAppAC>

//Action Creator
export const setStatusAppAC = (statusApp: RequestStatusType) => {
    return {
        type: 'APP/SET_STATUS',
        payload: {
            statusApp
        }
    } as const
}
export const setErrorAppAC = (errorApp: string | null) => {
    return {
        type: 'APP/SET_ERROR',
        payload: {
            errorApp
        }
    } as const
}

