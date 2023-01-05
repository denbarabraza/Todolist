import React, {useEffect, useState} from 'react';
import {ObjNewTask, taskAPI, todoAPI} from "../API/api";

export default {
    title: 'API/TASK',
}

export const GetTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoID='983878b7-8d20-409c-af0a-3ee4125c93d5'
        taskAPI.getTask(todoID)
            .then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {

        let todoID='983878b7-8d20-409c-af0a-3ee4125c93d5'
        let title='New Task Value'

        taskAPI.createTask(todoID,title)
            .then((data) => {
                return setState(data)})
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoID='983878b7-8d20-409c-af0a-3ee4125c93d5'
        let taskID='983878b7-8d20-409c-af0a-3ee4125c93d5'
        let obj:ObjNewTask={
            title: 'new Title',
            description: '',
            completed: true,
            status: 1,
            priority: 1,
            startDate: '05.01.2023',
            deadline: '55.01.2023',
        }
        taskAPI.updateTask(todoID,taskID,obj)
            .then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoID='983878b7-8d20-409c-af0a-3ee4125c93d5'
        let taskID='983878b7-8d20-409c-af0a-3ee4125c93d5'
        taskAPI.deleteTask(todoID,taskID)
            .then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}