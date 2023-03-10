import React, { FC, memo, useCallback, useEffect } from 'react';

import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

import {
  changeFilterValueAC,
  createTasksTC,
  FilterValueType,
  setTasksTC,
  TaskCommonType,
} from '../tasks/taskReducer';

import s from './Todolist.module.css';
import { updateTodoTC } from './todoReducer';

import { TaskStatuses } from 'api/api';
import todo from 'assets/todo.png';
import { SuperEditbleSpan } from 'common/components/SuperEditbleSpan';
import { RootDispatch, RootStoreType } from 'store/store';

type TodolistPropsType = {
  todoID: string;
  title: string;
  onClickRemoveTodo: (todoID: string, title: string) => void;
};

export const Todolist: FC<TodolistPropsType> = memo(
  ({ todoID, title, onClickRemoveTodo }) => {
    const task = useSelector<RootStoreType, TaskCommonType>(state => state.task);

    const dispatch = RootDispatch();

    useEffect(() => {
      dispatch(setTasksTC(todoID));
    }, []);

    const onClickRemoveTodoHandler = () => {
      onClickRemoveTodo(todoID, title);
    };

    const onClickSuperButtonHandler = useCallback(
      (filter: FilterValueType) => {
        dispatch(changeFilterValueAC(todoID, filter));
      },
      [todoID],
    );

    const addTaskHandler = useCallback(
      (value: string) => {
        dispatch(createTasksTC(todoID, value));
      },
      [todoID],
    );

    const setUpTodoTitle = useCallback((upValue: string) => {
      dispatch(updateTodoTC(todoID, upValue));
    }, []);

    let filteredTask = task[todoID].data;

    if (task[todoID].filter === 'Active') {
      filteredTask = task[todoID].data.filter(e => e.status === TaskStatuses.New);
    }
    if (task[todoID].filter === 'Completed') {
      filteredTask = task[todoID].data.filter(e => e.status === TaskStatuses.Completed);
    }

    return (
      <div className={s.todoBlock}>
        <div className={s.description}>
          <SuperEditbleSpan title={title} callback={setUpTodoTitle} />
          <div className={s.todoIMG} style={{ backgroundImage: `url(${todo})` }} />
        </div>
        <div className={s.taskDescription}>Task count: {task[todoID].taskCount}</div>

        <Button
          variant="outlined"
          onClick={() => {}}
          color="primary"
          size="small"
          disabled={task[todoID].entityStatus === 'loading'}
          style={{ margin: '5px 0' }}
        >
          Open
        </Button>
        <Button
          variant="outlined"
          onClick={onClickRemoveTodoHandler}
          color="error"
          size="small"
          disabled={task[todoID].entityStatus === 'loading'}
          style={{ margin: '5px 0' }}
        >
          Delete
        </Button>

        {/* <div>
        {filteredTask.map(t => (
          <Task
            key={t.id}
            task={t}
            todoID={todoID}
            disabled={task[todoID].entityStatus === 'loading'}
          />
        ))}
      </div> */}

        {/* <Button
        variant={task[todoID].filter === 'All' ? 'contained' : 'outlined'}
        onClick={() => onClickSuperButtonHandler('All')}
        color="primary"
        size="small"
        style={{ margin: '1px' }}
      >
        All
      </Button>
      <Button
        variant={task[todoID].filter === 'Completed' ? 'contained' : 'outlined'}
        onClick={() => onClickSuperButtonHandler('Completed')}
        color="primary"
        size="small"
        style={{ margin: '1px' }}
      >
        Completed
      </Button>
      <Button
        variant={task[todoID].filter === 'Active' ? 'contained' : 'outlined'}
        onClick={() => onClickSuperButtonHandler('Active')}
        color="primary"
        size="small"
        style={{ margin: '1px' }}
      >
        Active
      </Button> */}
      </div>
    );
  },
);
