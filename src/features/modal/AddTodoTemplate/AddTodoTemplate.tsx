import React, { FC, memo, useCallback } from 'react';

import todo from '../../../assets/todo.png';
import { resetModalValue } from '../../../common/utils/resetModalValue';
import { createTodoTC } from '../../todos/todoReducer';

import { InputItemForm } from 'common/components/InputItemForm';
import s from 'common/styles/TodoItem.module.css';
import { RootDispatch } from 'store/store';

type AddTodoType = {
  title: string;
  close: () => void;
};

export const AddTodoTemplate: FC<AddTodoType> = memo(({ title, close }) => {
  const dispatch = RootDispatch();

  const addNewTodo = useCallback((value: string) => {
    dispatch(createTodoTC(value));
    resetModalValue(dispatch);
  }, []);

  return (
    <div className={s.blockTodoItem}>
      <h3>{title}</h3>
      <div className={s.todoIMG} style={{ backgroundImage: `url(${todo})` }} />
      <div className={s.description}>Please enter the title</div>
      <InputItemForm callback={addNewTodo} close={close} status="Add todo" />
    </div>
  );
});
