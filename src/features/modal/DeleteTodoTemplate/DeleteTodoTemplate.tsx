import React, { FC, memo, useCallback, useEffect } from 'react';

import Button from '@mui/material/Button';

import s from '../../../common/styles/TodoItem.module.css';
import { RootDispatch } from '../../../store/store';
import { deleteTodoTC } from '../../todos/todoReducer';

type DeleteTodoTemplateType = {
  title: string;
  close: () => void;
  todoID: string | undefined;
};

export const DeleteTodoTemplate: FC<DeleteTodoTemplateType> = memo(
  ({ title, close, todoID }) => {
    const dispatch = RootDispatch();
    /* const name = useAppSelector(state =>
                              state.todolist.find(e => (e.id === todoID ? e.title : 'Unknown')),
                            ); */

    const onClickRemoveTodo = useCallback(() => {
      debugger;
      if (todoID) {
        debugger;
        dispatch(deleteTodoTC(todoID));
      }
    }, [todoID]);

    useEffect(() => {
      if (!todoID) return;
    }, []);

    return (
      <div className={s.blockTodoItem}>
        <h3>{title}</h3>
        <div className={s.description}>
          Do you really want to remove name? All tasks will be deleted.
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
    );
  },
);
