import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./components/Button";

type addTodoItemPropsType = {
    addItem: (title: string) => void
}
export const AddTodoItem: React.FC<addTodoItemPropsType> = (props) => {
    const [newTask, setNewTask] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
        setError('')
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }
    const onClickHandler = () => {
        if (newTask.trim()) {
            props.addItem(newTask.trim())
            setNewTask('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <input
                value={newTask}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                className={error ? 'error' : ''}
            />
            <Button
                name={"Add"}
                callBack={onClickHandler}
            />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}