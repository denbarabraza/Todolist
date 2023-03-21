//Sagas
import axios, { AxiosError } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GetTaskType,
  ResponseResult,
  ResponseType,
  taskAPI,
  TaskType,
  UpdateTaskModelType,
} from '../../api/api'
import { setErrorAppAC, setStatusAppAC } from '../../app/appReducer'

import {
  addTaskAC,
  changeEntityStatusAC,
  removeTaskAC,
  setTasksAC,
  TaskCommonType,
  updateTasksAC,
} from './taskReducer'

export function* setTaskWorkerSaga(action: ReturnType<typeof setTaskSC>) {
  yield put(setStatusAppAC('loading'))
  try {
    const res: GetTaskType = yield call(taskAPI.getTask, action.payload.todoID)

    yield put(setTasksAC(action.payload.todoID, res.items, res.totalCount))
    yield put(setStatusAppAC('succeeded'))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const err = e.response ? e.response?.data.message : e.message

      yield put(setErrorAppAC(err))
    }
    yield put(setStatusAppAC('failed'))
  }
}

export const setTaskSC = (todoID: string) => {
  return {
    type: 'TASK/SET_TASK',
    payload: {
      todoID,
    },
  }
}

export function* createTasksSaga(action: ReturnType<typeof createTasksSC>) {
  yield put(setStatusAppAC('loading'))
  yield put(changeEntityStatusAC(action.payload.todoID, 'loading'))
  try {
    const res: ResponseType<{ item: TaskType }> = yield call(
      taskAPI.createTask,
      action.payload.todoID,
      action.payload.title
    )

    if (res.resultCode === ResponseResult.OK) {
      yield put(addTaskAC(action.payload.todoID, res.data.item))
      yield put(setTaskSC(action.payload.todoID))
    } else if (res.messages.length) {
      yield put(setErrorAppAC(res.messages[0]))
    } else {
      yield put(setErrorAppAC('Some error'))
    }
    yield put(setStatusAppAC('succeeded'))
    yield put(changeEntityStatusAC(action.payload.todoID, 'succeeded'))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const err = e.response ? e.response?.data.message : e.message

      yield put(setErrorAppAC(err))
    }
    yield put(setStatusAppAC('failed'))
    yield put(changeEntityStatusAC(action.payload.todoID, 'failed'))
  }
}

export const createTasksSC = (todoID: string, title: string) => {
  return {
    type: 'TASK/CREATE_TASK',
    payload: {
      todoID,
      title,
    },
  }
}

export function* removeTasksSaga(action: ReturnType<typeof removeTasksSC>) {
  yield put(setStatusAppAC('loading'))
  yield put(changeEntityStatusAC(action.payload.todoID, 'loading'))
  try {
    const res: ResponseType<{ item: TaskType }> = yield call(
      taskAPI.deleteTask,
      action.payload.todoID,
      action.payload.taskID
    )

    yield put(removeTaskAC(action.payload.todoID, action.payload.taskID))
    yield put(setTaskSC(action.payload.todoID))
    yield put(setStatusAppAC('succeeded'))
    yield put(changeEntityStatusAC(action.payload.todoID, 'succeeded'))
  } catch (e) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
      const err = e.response ? e.response?.data.message : e.message

      yield put(setErrorAppAC(err))
    }
    yield put(setStatusAppAC('failed'))
    yield put(changeEntityStatusAC(action.payload.todoID, 'failed'))
  }
}

export const removeTasksSC = (todoID: string, taskID: string) => {
  return {
    type: 'TASK/REMOVE_TASK',
    payload: {
      todoID,
      taskID,
    },
  }
}
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string | null
  deadline?: string | null
}

export function* updateTaskSaga(action: ReturnType<typeof updateTaskSC>) {
  const task = action.payload.taskAll[action.payload.todoID].data.find(
    t => t.id === action.payload.taskID
  )

  if (task) {
    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...action.payload.model,
    }

    yield put(setStatusAppAC('loading'))
    yield put(changeEntityStatusAC(action.payload.todoID, 'loading'))
    try {
      const res: ResponseType<{ item: TaskType }> = yield call(
        taskAPI.updateTask,
        action.payload.todoID,
        action.payload.taskID,
        apiModel
      )

      if (res.resultCode === ResponseResult.OK) {
        yield put(updateTasksAC(action.payload.todoID, action.payload.taskID, apiModel))
      } else if (res.messages.length) {
        yield put(setErrorAppAC(res.messages[0]))
      } else {
        yield put(setErrorAppAC('Some error'))
      }
      yield put(setStatusAppAC('succeeded'))
      yield put(changeEntityStatusAC(action.payload.todoID, 'succeeded'))
    } catch (e) {
      if (axios.isAxiosError<AxiosError<{ message: string }>>(e)) {
        const err = e.response ? e.response?.data.message : e.message

        yield put(setErrorAppAC(err))
      }
      yield put(setStatusAppAC('failed'))
      yield put(changeEntityStatusAC(action.payload.todoID, 'failed'))
    }
  }
}

export const updateTaskSC = (
  todoID: string,
  taskID: string,
  model: UpdateDomainTaskModelType,
  taskAll: TaskCommonType
) => {
  return {
    type: 'TASK/UPDATE_TASK',
    payload: {
      todoID,
      taskID,
      model,
      taskAll,
    },
  }
}

export function* taskWatcher() {
  yield takeEvery('TASK/SET_TASK', setTaskWorkerSaga)
  yield takeEvery('TASK/CREATE_TASK', createTasksSaga)
  yield takeEvery('TASK/REMOVE_TASK', removeTasksSaga)
  yield takeEvery('TASK/UPDATE_TASK', updateTaskSaga)
}
