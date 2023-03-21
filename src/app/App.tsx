import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import Container from '@mui/material/Container'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'

import AppBarItem from '../common/components/AppBarItem'
import Loader from '../common/components/Loader'

import { RequestStatusType } from './appReducer'

import { ErrorSnackbar } from 'common/components/ErrorSnackbar'
import { initializeAppTC } from 'features/auth/authReducer'
import { Login } from 'features/login/Login'
import { TodolistItem } from 'features/todos/TodolistItem'
import { RootDispatch, RootStoreType, useAppSelector } from 'store/store'

const App = () => {
  const status = useAppSelector<RequestStatusType>(state => state.app.statusApp)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const loginName = useSelector<RootStoreType, string>(state => state.auth.loginName)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = RootDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [isLoggedIn])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <AppBarItem loginName={loginName} isLoggedIn={isLoggedIn} />
      {status === 'loading' && <Loader />}

      <Container>
        <Routes>
          <Route path="/" element={<TodolistItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
      <ErrorSnackbar />
    </div>
  )
}

export default App
