import React, { useEffect } from 'react';
import '../common/styles/App.module.css';
import { RootDispatch, store, useAppSelector } from '../store/store';
import Container from '@mui/material/Container';
import { TodolistItem } from '../features/todos/TodolistItem';
import AppBarItem from './AppBarItem';
import LinearProgress from '@mui/material/LinearProgress';
import { RequestStatusType } from './appReducer';
import { ErrorSnackbar } from '../common/components/ErrorSnackbar';
import { Login } from '../features/login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import { initializeAppTC } from '../features/auth/authReducer';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
  let status = useAppSelector<RequestStatusType>(state => state.app.statusApp);
  let isInitialized = useAppSelector<boolean>(state => state.app.isInitialized);
  const dispatch = RootDispatch();

  useEffect(() => {
    debugger;
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <AppBarItem />
      {status === 'loading' && <LinearProgress />}
      <Container maxWidth={'xl'}>
        <Routes>
          <Route path={'/'} element={<TodolistItem />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
      </Container>
      <ErrorSnackbar />
    </div>
  );
}

export default App;
