import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'

import { AddBox } from '@mui/icons-material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import { RequestStatusType } from '../../app/appReducer'

import s from 'common/styles/InputItemForm.module.css'

type TypeValueType = 'Add todo' | 'Add task'

type InputItemFormPropsType = {
  callback: (value: string) => void
  status: TypeValueType
  entityStatus?: RequestStatusType
  close?: () => void
}

export const InputItemForm: React.FC<InputItemFormPropsType> = memo(
  ({ callback, close, status }) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
      setError('')
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onClickAddHandler()
      }
    }
    const onClickAddHandler = () => {
      if (value.trim() !== '') {
        callback(value.trim())
        setValue('')
      } else {
        setError('Enter your value')
      }
    }

    const textField = (
      <TextField
        value={value}
        error={!!error}
        onChange={onChangeInputHandler}
        onKeyUp={onKeyUpHandler}
        id="outlined-basic"
        label="Title"
        variant="outlined"
        helperText={error}
        size="small"
      />
    )

    return (
      <div className={s.inputItemForm}>
        {status === `Add todo` ? (
          <>
            {textField}
            <div className={s.buttonBlock}>
              <Button
                variant="outlined"
                onClick={close}
                color="inherit"
                size="small"
                style={{ margin: '5px 0' }}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                onClick={onClickAddHandler}
                color="primary"
                size="small"
                style={{ margin: '5px 0' }}
              >
                Add
              </Button>
            </div>
          </>
        ) : (
          <div className={s.inputItemWithButton}>
            {textField}
            <IconButton onClick={onClickAddHandler} color="primary">
              <AddBox />
            </IconButton>
          </div>
        )}
      </div>
    )
  }
)
