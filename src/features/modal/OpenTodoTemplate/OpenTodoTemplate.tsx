import React, { FC, memo, useCallback, useEffect } from 'react';

import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

import { TaskStatuses } from '../../../api/api';
import { InputItemForm } from '../../../common/components/InputItemForm';
import { RootDispatch, RootStoreType } from '../../../store/store';
import { Task } from '../../tasks/Task';
import {
  changeFilterValueAC,
  createTasksTC,
  FilterValueType,
  TaskCommonType,
} from '../../tasks/taskReducer';

import s from 'common/styles/OpenTodoTemplate.module.css';

type OpenTodoTemplateType = {
  close: () => void;
  todoID: string | undefined;
};

export const OpenTodoTemplate: FC<OpenTodoTemplateType> = memo(({ close, todoID }) => {
  const task = useSelector<RootStoreType, TaskCommonType>(state => state.task);
  const dispatch = RootDispatch();

  const onClickSuperButtonHandler = useCallback(
    (filter: FilterValueType) => {
      if (todoID) {
        dispatch(changeFilterValueAC(todoID, filter));
      }
    },
    [todoID],
  );

  const addNewTask = useCallback(
    (value: string) => {
      if (todoID) {
        dispatch(createTasksTC(todoID, value));
      }
    },
    [todoID],
  );

  let filteredTask;

  if (todoID) {
    filteredTask = task[todoID].data;
  }

  if (todoID && task[todoID].filter === 'Active') {
    filteredTask = task[todoID].data.filter(e => e.status === TaskStatuses.New);
  }
  if (todoID && task[todoID].filter === 'Completed') {
    filteredTask = task[todoID].data.filter(e => e.status === TaskStatuses.Completed);
  }

  useEffect(() => {
    if (!todoID) return;
  }, []);

  console.log(todoID);

  return (
    <div className={s.openingTodoBlock}>
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
          variant={
            todoID && task[todoID].filter === 'Completed' ? 'contained' : 'outlined'
          }
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
  );
});
