import React, {useEffect, useState} from 'react';
import {todoAPI} from "../API/api";

export default {
    title: 'API/TODO',
}

export const GetTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todoAPI.getTodo()
            .then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let title = 'New Todo'
        todoAPI.createTodo(title)
            .then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoID = 'd19406f8-a865-4102-bb6b-891f6eb97cdd'
        todoAPI.deleteTodo(todoID)
            .then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolists = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoID = '11012a36-82c2-4743-b354-6cf083403349'
        let title = 'New TodoUpdate'
        todoAPI.updateTodo(todoID, title)
            .then((data) => setState(data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


