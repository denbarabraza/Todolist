import axios, { AxiosError } from 'axios'
import { call, put } from 'redux-saga/effects'

import {
  GetTaskType,
  ResponseResult,
  ResponseType,
  taskAPI,
  TaskType,
  UpdateTaskModelType,
} from '../../api/api'
import { RequestStatusType, setErrorAppAC, setStatusAppAC } from '../../app/appReducer'
import { addNewTodoAC, removeTodoAC, setTodosAC } from '../todos/todoReducer'

// Type
export type FilterValueType = 'All' | 'Active' | 'Completed'

type InTaskType = {
  data: TaskType[]
  filter: FilterValueType
  taskCount: number
  entityStatus: RequestStatusType
}
export type TaskCommonType = {
  [key: string]: InTaskType
}

// State
const initialState: TaskCommonType = {}

// Reducer
export const taskReducer = (state = initialState, action: ActionsType): TaskCommonType => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.payload.todoID]: {
          ...state[action.payload.todoID],
          data: state[action.payload.todoID].data.filter(e => e.id !== action.payload.taskID),
        },
      }
    }
    case 'UPDATE_TASK': {
      return <TaskCommonType>{
        ...state,
        [action.payload.todoID]: {
          ...state[action.payload.todoID],
          data: state[action.payload.todoID].data.map(e =>
            e.id === action.payload.taskID ? { ...e, ...action.payload.model } : e
          ),
        },
      }
    }
    case 'CHANGE_FILTER': {
      return {
        ...state,
        [action.payload.todoID]: {
          ...state[action.payload.todoID],
          filter: action.payload.filter,
        },
      }
    }
    case 'ADD_TASK': {
      return {
        ...state,
        [action.payload.todoID]: {
          ...state[action.payload.todoID],
          data: [action.payload.task, ...state[action.payload.todoID].data],
        },
      }
    }
    case 'REMOVE_TODO': {
      const stateCopy = { ...state }

      delete stateCopy[action.payload.todoID]

      return stateCopy
    }
    case 'ADD_TODO': {
      return {
        [action.payload.newTodo.id]: {
          data: [],
          filter: 'All',
          entityStatus: 'idle',
          taskCount: 0,
        },
        ...state,
      }
    }
    case 'SET_TODO_FROM_BACK': {
      return action.payload.todos.reduce((res: TaskCommonType, t) => {
        res[t.id] = { data: [], filter: 'All', entityStatus: 'idle', taskCount: 0 }

        return res
      }, {})
    }
    case 'SET_TASKS_FROM_BACK': {
      return {
        ...state,
        [action.payload.todoID]: {
          ...state[action.payload.todoID],
          data: action.payload.tasks,
          filter: 'All',
          taskCount: action.payload.taskCount,
        },
      }
    }
    case 'CHANGE_ENTITY_STATUS': {
      return {
        ...state,
        [action.payload.todoID]: {
          ...state[action.payload.todoID],
          entityStatus: action.payload.entityStatus,
        },
      }
    }
    default:
      return state
  }
}

// Action Type
type ActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof changeFilterValueAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTodoAC>
  | ReturnType<typeof addNewTodoAC>
  | ReturnType<typeof setTodosAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof updateTasksAC>
  | ReturnType<typeof changeEntityStatusAC>

// Action Creator
export const removeTaskAC = (todoID: string, taskID: string) => {
  return {
    type: 'REMOVE_TASK',
    payload: {
      todoID,
      taskID,
    },
  } as const
}
export const changeFilterValueAC = (todoID: string, filter: FilterValueType) => {
  return {
    type: 'CHANGE_FILTER',
    payload: {
      todoID,
      filter,
    },
  } as const
}
export const addTaskAC = (todoID: string, task: TaskType) => {
  return {
    type: 'ADD_TASK',
    payload: {
      todoID,
      task,
    },
  } as const
}
export const setTasksAC = (todoID: string, tasks: TaskType[], taskCount: number) => {
  return {
    type: 'SET_TASKS_FROM_BACK',
    payload: {
      todoID,
      tasks,
      taskCount,
    },
  } as const
}
export const updateTasksAC = (todoID: string, taskID: string, model: UpdateDomainTaskModelType) => {
  return {
    type: 'UPDATE_TASK',
    payload: {
      todoID,
      taskID,
      model,
    },
  } as const
}
export const changeEntityStatusAC = (todoID: string, entityStatus: RequestStatusType) => {
  return {
    type: 'CHANGE_ENTITY_STATUS',
    payload: {
      todoID,
      entityStatus,
    },
  } as const
}

//Sagas
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
