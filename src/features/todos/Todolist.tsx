import React, { FC, memo, useCallback, useEffect } from 'react'

import Button from '@mui/material/Button'

import { updateTodoTC } from './todoReducer'

import { TodoType } from 'api/api'
import countTask from 'assets/countTask.png'
import dateValue from 'assets/dateValue.png'
import todo from 'assets/todo.png'
import { SuperEditbleSpan } from 'common/components/SuperEditbleSpan'
import s from 'common/styles/Todolist.module.css'
import { dateHandler } from 'common/utils/dateHandler'
import { RootDispatch } from 'store/store'

type TodolistPropsType = {
  todoID: string
  title: string
  taskCount: number
  todolist: TodoType
  onClickRemoveTodo: (todoID: string, title: string) => void
  onClickOpenTodo: (todoID: string, title: string) => void
}

export const Todolist: FC<TodolistPropsType> = memo(
  ({ todoID, title, onClickRemoveTodo, onClickOpenTodo, taskCount, todolist }) => {
    const dispatch = RootDispatch()

    const createDate = dateHandler(todolist.addedDate)

    useEffect(() => {
      if (!todoID) return
    }, [])

    const onClickRemoveTodoHandler = () => {
      onClickRemoveTodo(todoID, title)
    }
    const onClickOpenTodoHandler = () => {
      onClickOpenTodo(todoID, title)
    }

    const setUpTodoTitle = useCallback((upValue: string) => {
      dispatch(updateTodoTC(todoID, upValue))
    }, [])

    return (
      <div className={s.todoBlock}>
        <div className={s.description}>
          <SuperEditbleSpan title={title} callback={setUpTodoTitle} />
          <div className={s.todoIMG} style={{ backgroundImage: `url(${todo})` }} />
        </div>
        <div className={s.taskDescription}>
          <TaskCount taskCount={taskCount} />
          <div className={s.block}>
            <img src={dateValue} alt="Date" title="Date" className={s.dateValue} />
            <span className={s.value}>{createDate}</span>
          </div>
        </div>
        <Button
          variant="outlined"
          onClick={onClickOpenTodoHandler}
          color="primary"
          size="small"
          style={{ margin: '5px 0' }}
        >
          Open
        </Button>
        <Button
          variant="outlined"
          onClick={onClickRemoveTodoHandler}
          color="error"
          size="small"
          style={{ margin: '5px 0' }}
        >
          Delete
        </Button>
      </div>
    )
  }
)

type TaskCountType = {
  taskCount: number
}

const TaskCount: FC<TaskCountType> = memo(({ taskCount }) => {
  useEffect(() => {}, [taskCount])

  return (
    <div className={s.block}>
      <img src={countTask} alt="Task count" title="Task count" className={s.countTask} />
      <span className={s.value}>{taskCount}</span>
    </div>
  )
})
