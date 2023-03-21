import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { takeEvery } from 'redux-saga/effects'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { appReducer } from '../app/appReducer'
import { authReducer } from '../features/auth/authReducer'
import {
  createTasksSaga,
  removeTasksSaga,
  setTaskWorkerSaga,
  taskReducer,
  updateTaskSaga,
} from '../features/tasks/taskReducer'
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

const sagaMiddleware = createSagaMiddleware()

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware))

sagaMiddleware.run(rootWatcher)

function* rootWatcher() {
  yield takeEvery('TASK/SET_TASK', setTaskWorkerSaga)
  yield takeEvery('TASK/CREATE_TASK', createTasksSaga)
  yield takeEvery('TASK/REMOVE_TASK', removeTasksSaga)
  yield takeEvery('TASK/UPDATE_TASK', updateTaskSaga)
}
