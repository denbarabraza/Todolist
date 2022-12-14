import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";
import {SuperButton} from "./SuperButton";

type SuperInput={
    callback:(value:string)=>void
}

export const SuperInput:React.FC<SuperInput> = (
    {
        callback
    }) => {
    //LocalState
    const [value, setValue] = useState('')
    const [error, setError] = useState<null | string>(null)
    //Function
    const onChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setValue(e.currentTarget.value)
    }
    const onClickAddTask = () => {
        if (value.trim() !== '') {
            callback(value.trim())
            setValue('')
        } else {
            setError('Enter your value')
        }
    }
    const onKeyUpAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }

    return (
        <div>
            <div>
                <input
                    value={value}
                    onChange={onChangeValueInput}
                    onKeyUp={onKeyUpAddTask}
                    className={error ? s.inputError : ''}
                />
                <SuperButton title={'+'} callback={onClickAddTask}/>
            </div>
            {error && <div className={s.textError}>{error}</div>}
        </div>
    )
}

