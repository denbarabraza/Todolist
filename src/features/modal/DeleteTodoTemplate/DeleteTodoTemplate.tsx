import React, { FC, memo, useCallback, useEffect } from 'react'

import Button from '@mui/material/Button'

import s from '../../../common/styles/TodoItem.module.css'
import { resetModalValue } from '../../../common/utils/resetModalValue'
import { RootDispatch } from '../../../store/store'
import { deleteTodoTC } from '../../todos/todoReducer'

type DeleteTodoTemplateType = {
  title: string
  close: () => void
  todoID: string | undefined
  name?: string
}

export const DeleteTodoTemplate: FC<DeleteTodoTemplateType> = memo(
  ({ title, close, todoID, name }) => {
    const dispatch = RootDispatch()

    const onClickRemoveTodo = useCallback(() => {
      if (todoID) {
        dispatch(deleteTodoTC(todoID))
        resetModalValue(dispatch)
      }
    }, [])

    useEffect(() => {
      if (!todoID) return
    }, [todoID])

    return (
      <div className={s.blockTodoItem}>
        <h3>{title}</h3>
        <div className={s.description}>
          Do you really want to remove <b>{name}</b>? All tasks will be deleted.
        </div>
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
            onClick={onClickRemoveTodo}
            color="primary"
            size="small"
            style={{ margin: '5px 0' }}
          >
            Delete
          </Button>
        </div>
      </div>
    )
  }
)
