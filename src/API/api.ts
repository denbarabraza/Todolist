import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '8f06781b-9aa8-47ca-9636-db5da3b1bd57'
    }
});

export const todoAPI = {
    getTodo() {
        return instance.get<TodoType[]>('todo-lists')
            .then((res) => res.data)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>('todo-lists', {title})
            .then((res) => res.data)
    },
    deleteTodo(todoID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoID}`)
            .then((res) => res.data)
    },
    updateTodo(todoID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoID}`, {title})
            .then((res) => res.data)
    }
}

export const taskAPI = {
    getTask(todoID: string) {
        return instance.get<GetTaskType>(`todo-lists/${todoID}/tasks`)
            .then((res) => res.data)
    },
    createTask(todoID: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoID}/tasks`, {title})
            .then((res) => {
                return res.data
            })
    },
    updateTask(todoID: string, taskID: string, obj: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todoID}/tasks/${taskID}`, obj)
            .then((res) => {
                return res.data
            })
    },
    deleteTask(todoID: string, taskID: string) {
        return instance.delete<ResponseType<{ item: TaskType }>>(`todo-lists/${todoID}/tasks/${taskID}`)
            .then((res) => {
                return res.data
            })
    }
}

export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}

type GetTaskType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}