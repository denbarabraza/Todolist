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
        return instance.get<TodoItemType[]>('todo-lists')
            .then((res) => res.data)
    },
    createTodo(title: string) {
        return instance.post<ResponseTodoType<{ item: TodoItemType }>>('todo-lists', {title})
            .then((res) => res.data)
    },
    deleteTodo(todoID: string) {
        return instance.delete<ResponseTodoType>(`todo-lists/${todoID}`)
            .then((res) => res.data)
    },
    updateTodo(todoID: string, title: string) {
        return instance.put<ResponseTodoType>(`todo-lists/${todoID}`, {title})
            .then((res) => res.data)
    }
}

export const taskAPI = {
    getTask(todoID: string) {
        return instance.get(`todo-lists/${todoID}/tasks`)
            .then((res) => res.data)
    },
    createTask(todoID: string, title: string) {
        return instance.post(`todo-lists/${todoID}/tasks`, {title})
            .then((res) => {
                return res.data
            })
    },
    updateTask(todoID: string, taskID: string, obj: ObjNewTask) {
        return instance.put(`todo-lists/${todoID}/tasks/${taskID}`, {obj})
            .then((res) => {
                return res.data
            })
    },
    deleteTask(todoID: string, taskID: string) {
        return instance.delete(`todo-lists/${todoID}/tasks/${taskID}`)
            .then((res) => {
                return res.data
            })
    }
}

type TodoItemType = {
    id: string
    title: string
    addedDate: string
    order: 0
}

type ResponseTodoType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export type ObjNewTask = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}