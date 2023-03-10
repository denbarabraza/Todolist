import React, { FC, memo, useCallback, useEffect } from 'react';

import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

import { setTasksTC, TaskCommonType } from '../tasks/taskReducer';

import s from './Todolist.module.css';
import { updateTodoTC } from './todoReducer';

import countTask from 'assets/countTask.png';
import todo from 'assets/todo.png';
import { SuperEditbleSpan } from 'common/components/SuperEditbleSpan';
import { RootDispatch, RootStoreType } from 'store/store';

type TodolistPropsType = {
  todoID: string;
  title: string;
  onClickRemoveTodo: (todoID: string, title: string) => void;
  onClickOpenTodo: (todoID: string) => void;
};

export const Todolist: FC<TodolistPropsType> = memo(
  ({ todoID, title, onClickRemoveTodo, onClickOpenTodo }) => {
    const task = useSelector<RootStoreType, TaskCommonType>(state => state.task);

    const dispatch = RootDispatch();

    useEffect(() => {
      dispatch(setTasksTC(todoID));
    }, []);

    const onClickRemoveTodoHandler = () => {
      onClickRemoveTodo(todoID, title);
    };
    const onClickOpenTodoHandler = () => {
      onClickOpenTodo(todoID);
    };

    const setUpTodoTitle = useCallback((upValue: string) => {
      dispatch(updateTodoTC(todoID, upValue));
    }, []);

    return (
      <div className={s.todoBlock}>
        <div className={s.description}>
          <SuperEditbleSpan title={title} callback={setUpTodoTitle} />
          <div className={s.todoIMG} style={{ backgroundImage: `url(${todo})` }} />
        </div>
        <div className={s.taskDescription}>
          <img
            src={countTask}
            alt="Task count"
            title="Task count"
            className={s.countTask}
          />
          <span>{task[todoID].taskCount}</span>
        </div>

        <Button
          variant="outlined"
          onClick={onClickOpenTodoHandler}
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
      </div>
    );
  },
);
