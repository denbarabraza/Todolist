import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'

import { ResponseResult, todoAPI, TodoType } from '../../api/api'
import { setErrorAppAC, setStatusAppAC } from '../../app/appReducer'
import { RootDispatchThunkType } from '../../store/store'
import { changeEntityStatusAC, setTasksAC } from '../tasks/taskReducer'
import { setTaskSC } from '../tasks/taskSagas'

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: TodoType[] = []

export const todoReducer = (state = initialState, action: ActionsType): TodoType[] => {
  switch (action.type) {
    case 'REMOVE_TODO': {
      return state.filter(e => e.id !== action.payload.todoID)
    }
    case 'ADD_TODO': {
      return [action.payload.newTodo, ...state]
    }
    case 'SET_UPDATE_TITLE_TODO': {
      return state.map(t =>
        t.id === action.payload.todoID ? { ...t, title: action.payload.upValue } : t
      )
    }
    case 'SET_TODO_FROM_BACK': {
      return [...action.payload.todos]
    }
    case 'RESET_TODO': {
      return initialState
    }
    default:
      return state
  }
}

type ActionsType =
  | ReturnType<typeof removeTodoAC>
  | ReturnType<typeof addNewTodoAC>
  | ReturnType<typeof setUpTodoTitleAC>
  | ReturnType<typeof setTodosAC>
  | ReturnType<typeof resetTodoAC>
  | ReturnType<typeof setTasksAC>

export const removeTodoAC = (todoID: string) => {
  return {
    type: 'REMOVE_TODO',
    payload: {
      todoID,
    },
  } as const
}
export const addNewTodoAC = (newTodo: TodoType) => {
  return {
    type: 'ADD_TODO',
    payload: {
      newTodo,
    },
  } as const
}
export const setUpTodoTitleAC = (todoID: string, upValue: string) => {
  return {
    type: 'SET_UPDATE_TITLE_TODO',
    payload: {
      upValue,
      todoID,
    },
  } as const
}
export const setTodosAC = (todos: TodoType[]) => {
  return {
    type: 'SET_TODO_FROM_BACK',
    payload: {
      todos,
    },
  } as const
}
export const resetTodoAC = () => {
  return {
    type: 'RESET_TODO',
  } as const
}

export const setTodosTC = () => async (dispatch: RootDispatchThunkType) => {
  try {
    dispatch(setStatusAppAC('loading'))
    const res = await todoAPI.getTodo()

    if (res.length) {
      res.forEach(t => dispatch(setTaskSC(t.id)))
    }

    dispatch(setTodosAC(res))
    dispatch(setStatusAppAC('succeeded'))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const err = e.response ? e.response?.data.message : e.message

      dispatch(setErrorAppAC(err))
    }
    dispatch(setStatusAppAC('failed'))
  }
}

export const createTodoTC = (title: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setStatusAppAC('loading'))
    const res = await todoAPI.createTodo(title)

    if (res.resultCode === ResponseResult.OK) {
      dispatch(addNewTodoAC(res.data.item))
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
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const err = e.response ? e.response?.data.message : e.message

      dispatch(setErrorAppAC(err))
    }
    dispatch(setStatusAppAC('failed'))
  }
}
export const deleteTodoTC = (todoID: string) => async (dispatch: RootDispatchThunkType) => {
  try {
    dispatch(changeEntityStatusAC(todoID, 'loading'))
    dispatch(setStatusAppAC('loading'))
    const res = await todoAPI.deleteTodo(todoID)

    if (res.resultCode === ResponseResult.OK) {
      await dispatch(setTodosTC())
      dispatch(setStatusAppAC('succeeded'))
      dispatch(changeEntityStatusAC(todoID, 'succeeded'))
    } else {
      if (res.messages.length) {
        dispatch(setErrorAppAC(res.messages[0]))
      } else {
        dispatch(setErrorAppAC('Some error'))
      }
      dispatch(setStatusAppAC('succeeded'))
    }
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const err = e.response ? e.response?.data.message : e.message

      dispatch(setErrorAppAC(err))
    }
    dispatch(setStatusAppAC('failed'))
    dispatch(changeEntityStatusAC(todoID, 'failed'))
  }
}
export const updateTodoTC = (todoID: string, title: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setStatusAppAC('loading'))
    const res = await todoAPI.updateTodo(todoID, title)

    if (res.resultCode === ResponseResult.OK) {
      dispatch(setUpTodoTitleAC(todoID, title))
      dispatch(setStatusAppAC('succeeded'))
    } else {
      if (res.messages.length) {
        dispatch(setErrorAppAC(res.messages[0]))
      } else {
        dispatch(setErrorAppAC('Some error'))
      }
      dispatch(setStatusAppAC('succeeded'))
    }
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const err = e.response ? e.response?.data.message : e.message

      dispatch(setErrorAppAC(err))
    }
    dispatch(setStatusAppAC('failed'))
    dispatch(changeEntityStatusAC(todoID, 'failed'))
  }
}
