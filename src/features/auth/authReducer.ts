import axios from 'axios'
import { Dispatch } from 'redux'

import { authAPI, LoginDataType, ResponseResult } from '../../api/api'
import { setErrorAppAC, setInitializedAC, setStatusAppAC } from '../../app/appReducer'
import { resetTodoAC } from '../todos/todoReducer'

const InitialStateAuth = {
  isLoggedIn: false,
  loginName: '',
}

export const authReducer = (
  state: InitialStateAuthType = InitialStateAuth,
  action: ActionsType
): InitialStateAuthType => {
  switch (action.type) {
    case 'auth/SET-IS-LOGGED-IN':
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    case 'auth/SET-LOGIN_NAME':
      return { ...state, loginName: action.payload.loginName }
    default:
      return state
  }
}

// Action Creator
export const setLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: 'auth/SET-IS-LOGGED-IN',
    payload: {
      isLoggedIn,
    },
  } as const
}
export const setLoginName = (loginName: string) => {
  return {
    type: 'auth/SET-LOGIN_NAME',
    payload: {
      loginName,
    },
  } as const
}
// Thunk
export const setLoggedInTC = (loginData: LoginDataType) => async (dispatch: Dispatch) => {
  dispatch(setStatusAppAC('loading'))
  try {
    const res = await authAPI.logIN(loginData)

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
      const err = e.response ? e.response?.data.message : e.message

      dispatch(setErrorAppAC(err))
      dispatch(setStatusAppAC('failed'))
    }
  }
}

export const initializeAppTC = () => async (dispatch: Dispatch) => {
  dispatch(setStatusAppAC('loading'))
  try {
    const res = await authAPI.me()

    if (res.resultCode === ResponseResult.OK) {
      dispatch(setLoginName(res.data.login))
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
      const err = e.response ? e.response?.data.message : e.message

      dispatch(setErrorAppAC(err))
      dispatch(setStatusAppAC('failed'))
    }
  } finally {
    dispatch(setInitializedAC(true))
  }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
  dispatch(setStatusAppAC('loading'))
  dispatch(resetTodoAC())
  try {
    const res = await authAPI.logOUT()

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
      const err = e.response ? e.response?.data.message : e.message

      dispatch(setErrorAppAC(err))
      dispatch(setStatusAppAC('failed'))
    }
  }
}

// types
type InitialStateAuthType = {
  isLoggedIn: boolean
  loginName: string
}
type ActionsType = ReturnType<typeof setLoggedInAC> | ReturnType<typeof setLoginName>
