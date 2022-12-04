import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../Todolist.module.css";
import {Button} from "./Button";

type InputItemPropsType={
   callback:(value:string)=>void
}

export const InputItem:React.FC<InputItemPropsType> = (
    {
       callback
    }) => {

    const [value, setValue] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onClickAddHandler = () => {
        if (value.trim() !== '') {
            callback(value.trim())
            setValue('')
        } else {
            setError('Enter correct value')
            setValue('')
        }
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setValue(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddHandler()
        }
    }

    return (
        <div>
            <input
                value={value}
                onChange={onChangeInputHandler}
                onKeyUp={onKeyUpHandler}
                className={error ? s.inputError : ''}
            />
            <Button
                title={'+'}
                callback={onClickAddHandler}
            />
            {error && <div className={s.textError}>{error}</div>}
        </div>
    );
};
