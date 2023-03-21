import { TaskType } from '../../api/api'
import { RequestStatusType } from '../../app/appReducer'
import { addNewTodoAC, removeTodoAC, setTodosAC } from '../todos/todoReducer'

import { UpdateDomainTaskModelType } from './taskSagas'

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

const initialState: TaskCommonType = {}

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
