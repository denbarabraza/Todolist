import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { appReducer } from '../app/appReducer'
import { authReducer } from '../features/auth/authReducer'
import { taskReducer } from '../features/tasks/taskReducer'
import { todoReducer } from '../features/todos/todoReducer'

const rootReducer = combineReducers({
  task: taskReducer,
  todolist: todoReducer,
  app: appReducer,
  auth: authReducer,
})

export type RootStoreType = ReturnType<typeof rootReducer>
export type RootDispatchThunkType = ThunkDispatch<RootStoreType, any, AnyAction>
export const useAppSelector: TypedUseSelectorHook<RootStoreType> = useSelector
export const RootDispatch = () => useDispatch<RootDispatchThunkType>()

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
