import React, { useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TodoType } from '../../api/api';
import { InputItemForm } from '../../common/components/InputItemForm';
import { RootDispatch, RootStoreType, useAppSelector } from '../../store/store';

import { Todolist } from './Todolist';
import { createTodoTC, setTodosTC } from './todoReducer';

export const TodolistItem = () => {
  const todolist = useSelector<RootStoreType, TodoType[]>(state => state.todolist);
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
  const dispatch = RootDispatch();

  useEffect(() => {
    if (!isLoggedIn) return;
    dispatch(setTodosTC());
  }, []);

  const addNewTodo = useCallback((value: string) => {
    dispatch(createTodoTC(value));
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <InputItemForm callback={addNewTodo} />
      </Grid>
      <Grid container spacing={3}>
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
