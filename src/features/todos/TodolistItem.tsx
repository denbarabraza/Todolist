import React, { useCallback, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { isClosingModal, setModalStatus } from '../../app/appReducer';
import { ModalWrapper } from '../modal/ModalWrapper';

import { Todolist } from './Todolist';
import { setTodosTC } from './todoReducer';

import { TodoType } from 'api/api';
import { RootDispatch, RootStoreType, useAppSelector } from 'store/store';

export const TodolistItem = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const todolist = useSelector<RootStoreType, TodoType[]>(state => state.todolist);
  const status = useAppSelector(state => state.app.modalStatus);
  const isOpen = useAppSelector(state => state.app.isModalClosed);
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
  const dispatch = RootDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;
    if (isOpen) {
      setId('');
      dispatch(setTodosTC());
    }
  }, []);

  const addNewTodoModal = useCallback(() => {
    dispatch(setModalStatus('Add todo'));
    dispatch(isClosingModal(false));
  }, []);

  const onClickRemoveTodo = useCallback(
    (todoID: string, title: string) => {
      if (todoID.trim().length > 0) {
        setId(todoID);
        setName(title);
      }
      dispatch(setModalStatus('Delete todo'));
      dispatch(isClosingModal(false));
    },
    [id],
  );

  const onClickOpenTodo = useCallback(
    (todoID: string) => {
      setId(todoID);
      dispatch(setModalStatus('Open todo'));
      dispatch(isClosingModal(false));
    },
    [id],
  );

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid
        container
        style={{
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="outlined"
          onClick={addNewTodoModal}
          color="primary"
          size="small"
          style={{ margin: '5px 0' }}
        >
          Add new todo
        </Button>
      </Grid>
      <Grid container spacing={4}>
        {todolist.map(t => {
          return (
            <Grid item key={t.id}>
              <Paper style={{ padding: '10px' }} elevation={3}>
                <Todolist
                  todoID={t.id}
                  title={t.title}
                  onClickRemoveTodo={onClickRemoveTodo}
                  onClickOpenTodo={onClickOpenTodo}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <ModalWrapper isOpen={isOpen} status={status} todoID={id} name={name} />
    </>
  );
};
