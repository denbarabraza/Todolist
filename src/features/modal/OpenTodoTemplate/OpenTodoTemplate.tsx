import React, { FC, memo, useCallback, useEffect } from 'react'

import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'

import { TaskStatuses, TodoType } from '../../../api/api'
import { InputItemForm } from '../../../common/components/InputItemForm'
import { SuperEditbleSpan } from '../../../common/components/SuperEditbleSpan'
import { RootDispatch, RootStoreType, useAppSelector } from '../../../store/store'
import { Task } from '../../tasks/Task'
import {
  changeFilterValueAC,
  createTasksSC,
  FilterValueType,
  TaskCommonType,
} from '../../tasks/taskReducer'
import { updateTodoTC } from '../../todos/todoReducer'

import s from 'common/styles/OpenTodoTemplate.module.css'

type OpenTodoTemplateType = {
  close: () => void
  todoID: string | undefined
}

export const OpenTodoTemplate: FC<OpenTodoTemplateType> = memo(({ close, todoID }) => {
  const todoActive = useSelector<RootStoreType, TodoType[]>(state => state.todolist)
  const isOpen = useAppSelector(state => state.app.isModalClosed)
  const task = useSelector<RootStoreType, TaskCommonType>(state => state.task)
  const dispatch = RootDispatch()

  const onClickSuperButtonHandler = useCallback(
    (filter: FilterValueType) => {
      if (todoID) {
        dispatch(changeFilterValueAC(todoID, filter))
      }
    },
    [todoID]
  )

  const addNewTask = useCallback(
    (value: string) => {
      if (todoID) {
        dispatch(createTasksSC(todoID, value))
      }
    },
    [todoID]
  )

  const setUpTodoTitle = useCallback((upValue: string) => {
    if (todoID) {
      dispatch(updateTodoTC(todoID, upValue))
    }
  }, [])

  let filteredTask

  if (todoID) {
    filteredTask = task[todoID].data
  }

  if (todoID && task[todoID].filter === 'Active') {
    filteredTask = task[todoID].data.filter(e => e.status === TaskStatuses.New)
  }
  if (todoID && task[todoID].filter === 'Completed') {
    filteredTask = task[todoID].data.filter(e => e.status === TaskStatuses.Completed)
  }

  let todo

  if (todoID) {
    todo = todoActive.find(e => e.id === todoID)
  }

  useEffect(() => {
    if (!todoID) return
  }, [task])

  return (
    <div className={s.openingTodoBlock}>
      {todo && <SuperEditbleSpan title={todo.title} callback={setUpTodoTitle} />}
      <InputItemForm callback={addNewTask} close={close} status="Add task" />
      <div>
        {filteredTask &&
          todoID &&
          filteredTask.map(t => (
            <Task
              key={t.id}
              task={t}
              todoID={todoID}
              disabled={task[todoID].entityStatus === 'loading'}
            />
          ))}
      </div>
      <div className={s.buttonBlock}>
        <Button
          variant={todoID && task[todoID].filter === 'All' ? 'contained' : 'outlined'}
          onClick={() => onClickSuperButtonHandler('All')}
          color="primary"
          size="small"
          style={{ margin: '1px' }}
        >
          All
        </Button>
        <Button
          variant={todoID && task[todoID].filter === 'Completed' ? 'contained' : 'outlined'}
          onClick={() => onClickSuperButtonHandler('Completed')}
          color="primary"
          size="small"
          style={{ margin: '1px' }}
        >
          Completed
        </Button>
        <Button
          variant={todoID && task[todoID].filter === 'Active' ? 'contained' : 'outlined'}
          onClick={() => onClickSuperButtonHandler('Active')}
          color="primary"
          size="small"
          style={{ margin: '1px' }}
        >
          Active
        </Button>
      </div>
    </div>
  )
})
