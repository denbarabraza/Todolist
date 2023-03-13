import React, { useEffect } from 'react'

import { Menu } from '@mui/icons-material'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { useSelector } from 'react-redux'

import { logOutTC } from '../../features/auth/authReducer'
import { RootDispatch, RootStoreType, useAppSelector } from '../../store/store'
import s from '../styles/AppBarItem.module.css'

import logout from 'assets/logout.png'

const AppBarItem = () => {
  const loginName = useSelector<RootStoreType, string>(state => state.auth.loginName)
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = RootDispatch()

  const logOutHandler = () => {
    dispatch(logOutTC())
  }

  useEffect(() => {}, [isLoggedIn])

  return (
    <div>
      <AppBar position="static" style={{ position: 'relative' }}>
        <Toolbar>
          {isLoggedIn && (
            <div className={s.toolbarBlock}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <Menu />
              </IconButton>
              <div className={s.loginBlock}>
                <div className={s.loginName}>{loginName}</div>
                <img src={logout} alt="" onClick={logOutHandler} className={s.imgLogOut} />
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppBarItem
