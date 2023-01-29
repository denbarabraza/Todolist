import {authAPI, LoginDataType, ResponseResult} from "../API/api";
import {Dispatch} from "redux";
import {setErrorAppAC, setInitializedAC, setStatusAppAC} from "./appReducer";
import axios from "axios";

const InitialStateAuth = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateAuthType = InitialStateAuth, action: ActionsType): InitialStateAuthType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        default:
            return state
    }
}

//Action Creator
export const setLoggedInAC = (isLoggedIn: boolean) => {
    return {
        type: 'auth/SET-IS-LOGGED-IN',
        payload: {
            isLoggedIn
        }
    } as const
}
//Thunk
export const setLoggedInTC = (loginData: LoginDataType) => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'))
    try {
        let res = await authAPI.logIN(loginData)
        if (res.resultCode === ResponseResult.OK) {
            dispatch(setLoggedInAC(true))
            dispatch(setStatusAppAC('succeeded'))
        } else {
            if (res.messages.length) {
                dispatch(setErrorAppAC(res.messages[0]))
            } else {
                dispatch(setErrorAppAC('Some error'))
            }
            dispatch(setStatusAppAC('failed'))
        }
    } catch (e) {
        if (axios.isAxiosError<{ message: string }>(e)) {
            let err = e.response ? e.response?.data.message : e.message
            dispatch(setErrorAppAC(err))
            dispatch(setStatusAppAC('failed'))
        }
    }
}

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'))
    try {
        let res = await authAPI.me()
        if (res.resultCode === ResponseResult.OK) {
            dispatch(setLoggedInAC(true))
            dispatch(setStatusAppAC('succeeded'))
        } else {
            if (res.messages.length) {
                dispatch(setErrorAppAC(res.messages[0]))
            } else {
                dispatch(setErrorAppAC('Some error'))
            }
            dispatch(setStatusAppAC('failed'))
        }
    }
    catch (e) {
        if (axios.isAxiosError<{ message: string }>(e)) {
            let err = e.response ? e.response?.data.message : e.message
            dispatch(setErrorAppAC(err))
            dispatch(setStatusAppAC('failed'))
        }
    }finally {
        dispatch(setInitializedAC(true))
    }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'))
    try {
        let res = await authAPI.logOUT()
        if (res.resultCode === ResponseResult.OK) {
            dispatch(setLoggedInAC(false))
            dispatch(setStatusAppAC('succeeded'))
        } else {
            if (res.messages.length) {
                dispatch(setErrorAppAC(res.messages[0]))
            } else {
                dispatch(setErrorAppAC('Some error'))
            }
            dispatch(setStatusAppAC('failed'))
        }
    } catch (e) {
        if (axios.isAxiosError<{ message: string }>(e)) {
            let err = e.response ? e.response?.data.message : e.message
            dispatch(setErrorAppAC(err))
            dispatch(setStatusAppAC('failed'))
        }
    }
}

//types
type InitialStateAuthType = {
    isLoggedIn: boolean
}
type ActionsType = ReturnType<typeof setLoggedInAC>