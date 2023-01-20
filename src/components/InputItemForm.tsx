import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import s from "../Todolist.module.css";
import {AddBox} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';

type InputItemFormPropsType = {
    callback: (value: string) => void
}

export const InputItemForm: React.FC<InputItemFormPropsType> = memo((props) => {
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
            <TextField
                value={value}
                error={!!error}
                onChange={onChangeInputHandler}
                onKeyUp={onKeyUpHandler}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                helperText={error}
                size={'small'}
            />
            <IconButton
                onClick={onClickAddTaskHandler}
                color={'primary'}
            >
                <AddBox/>
            </IconButton>
        </div>
    );
});
