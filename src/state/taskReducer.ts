import {addNewTodoAC, removeTodoAC, setTodosAC} from "./todoReducer";
import {ObjNewTask, taskAPI, TaskStatuses, TaskType} from "../API/api";
import {Dispatch} from "redux";
import {RootStoreType} from "./store";

//Type
export type FilterValueType = 'All' | 'Active' | 'Completed'

type InTaskType = {
    data: TaskType[]
    filter: FilterValueType
}
export type TaskCommonType = {
    [key: string]: InTaskType
}

//State
const initialState: TaskCommonType = {
    // [todolistId1]: {
    //     data: [
    //         {id: v1(), title: "HTML&CSS", description:' ', status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId1, order: 0,addedDate: ''},
    //         {id: v1(), title: "JS",description:'', status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId1, order: 0,addedDate: ''}
    //     ],
    //     filter: "All"
    // },
    // [todolistId2]: {
    //     data: [
    //         {id: v1(), title: "Milk",description:' ', status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId2, order: 0,addedDate: ''},
    //         {id: v1(), title: "Salt",description:'', status: TaskStatuses.Completed, priority: TaskPriorities.Low, startDate: '', deadline: '',todoListId: todolistId2, order: 0,addedDate: ''}
    //     ],
    //     filter: "All"
    // }
}

//Reducer
export const taskReducer = (state = initialState, action: ActionsType): TaskCommonType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: state[action.payload.todoID]
                        .data.filter(e => e.id !== action.payload.taskID)
                }
            };
        }
        case 'CHANGE_STATUS': {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: state[action.payload.todoID].data.map(e => e.id === action.payload.taskID
                        ? {...e, status: action.payload.status}
                        : e
                    )
                }
            }
        }
        case 'CHANGE_FILTER': {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    filter: action.payload.filter
                }
            }
        }
        case 'ADD_TASK': {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: [action.payload.task, ...state[action.payload.todoID].data]
                }
            }
        }
        case 'REMOVE_TODO': {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoID]
            return stateCopy
        }
        case 'ADD_TODO': {
            return {
                [action.payload.newTodo.id]: {data: [], filter: 'All'},
                ...state
            }
        }
        case "SET_UPDATE_TITLE_TASK": {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: state[action.payload.todoID].data.map(t => t.id === action.payload.taskID
                        ? {...t, title: action.payload.upValue}
                        : t
                    )
                }
            }
        }
        case "SET_TODO_FROM_BACK": {
            return action.payload.todos
                .reduce((res: TaskCommonType, t) => {
                    res[t.id] = {data: [], filter: 'All'}
                    return res
                }, {})
            // const copyState = {...state}
            // const todoID = action.payload.todos.map(e => e.id)
            // todoID.forEach((t) => {
            //     copyState[t] = {
            //         data: [],
            //         filter: 'All'
            //     }
            // })
            // return copyState
        }
        case "SET_TASKS_FROM_BACK": {
            return {
                ...state,
                [action.payload.todoID]: {
                    ...state[action.payload.todoID],
                    data: action.payload.tasks,
                    filter: 'All'
                }
            }
        }
        default:
            return state
    }
}

//Action Type
type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof onChangeTaskStatusAC>
    | ReturnType<typeof changeFilterValueAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTodoAC>
    | ReturnType<typeof addNewTodoAC>
    | ReturnType<typeof setUpTasksTitleAC>
    | ReturnType<typeof setTodosAC>
    | ReturnType<typeof setTasksAC>


//Action Creator
export const removeTaskAC = (todoID: string, taskID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todoID,
            taskID
        }
    } as const
}
export const onChangeTaskStatusAC = (todoID: string, taskID: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE_STATUS',
        payload: {
            todoID,
            taskID,
            status
        }
    } as const
}
export const changeFilterValueAC = (todoID: string, filter: FilterValueType) => {
    return {
        type: 'CHANGE_FILTER',
        payload: {
            todoID,
            filter
        }
    } as const
}
export const addTaskAC = (todoID: string, task: TaskType) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todoID,
            task
        }
    } as const
}
export const setUpTasksTitleAC = (todoID: string, taskID: string, upValue: string) => {
    return {
        type: 'SET_UPDATE_TITLE_TASK',
        payload: {
            todoID,
            taskID,
            upValue,
        }
    } as const
}
export const setTasksAC = (todoID: string, tasks: TaskType[]) => {
    return {
        type: 'SET_TASKS_FROM_BACK',
        payload: {
            todoID,
            tasks
        }
    } as const
}

//Thunk Creator
export const setTasksTC = (todoID: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.getTask(todoID)
            .then((res) => {
                dispatch(setTasksAC(todoID, res.items))
            })
    }
}
export const createTasksTC = (todoID: string, title: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.createTask(todoID, title)
            .then((res) => {
                dispatch(addTaskAC(todoID, res.data.item))
            })
    }
}
export const removeTasksTC = (todoID: string, taskID: string) => {
    return (dispatch: Dispatch) => {
        taskAPI.deleteTask(todoID, taskID)
            .then((res) => {
                dispatch(removeTaskAC(todoID, taskID))
            })
    }
}
export const onChangeTaskStatusTC = (todoID: string, taskID: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => RootStoreType) => {

        const task = getState().task[todoID].data.find((t) => t.id === taskID)

        if (task) {
            const model: ObjNewTask = {
                title: task.title,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                status
            }
            taskAPI.updateTask(todoID, taskID, model)
                .then((res) => {
                    dispatch(onChangeTaskStatusAC(todoID, taskID, status))
                })
        }

    }
}
export const onChangeTaskTitleTC = (todoID: string, taskID: string, title: string) => {
    return (dispatch: Dispatch, getState: () => RootStoreType) => {

        const task = getState().task[todoID].data.find((t) => t.id === taskID)

        if (task) {
            const model: ObjNewTask = {
                title,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                status:task.status
            }
            taskAPI.updateTask(todoID, taskID, model)
                .then((res) => {
                    dispatch(setUpTasksTitleAC(todoID, taskID, title))
                })
        }

    }
}