import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import s from "../Todolist.module.css";

type InputItemFormPropsType={
    callback:(value:string)=>void
}

export const InputItemForm:React.FC<InputItemFormPropsType> = memo((props) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<null | string>(null)

    console.log('InputItemForm rendring')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError('')
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }
    const onClickAddTaskHandler = () => {
        if (value.trim() !== '') {
            props.callback(value.trim())
            setValue('')
        } else {
            setError('Enter your value')
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
            <button onClick={onClickAddTaskHandler}>
                +
            </button>
            <div className={s.textError}>{error}</div>
        </div>
    );
});
