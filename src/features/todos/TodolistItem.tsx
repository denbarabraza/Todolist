import React, { useCallback, useEffect } from 'react';

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
  const todolist = useSelector<RootStoreType, TodoType[]>(state => state.todolist);
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
  const dispatch = RootDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(setTodosTC());
  }, []);

  const addNewTodoModal = useCallback(() => {
    dispatch(setModalStatus('Add todo'));
    dispatch(isClosingModal(false));
  }, []);

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
                <Todolist todoID={t.id} title={t.title} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
