import React, { FC, useEffect } from 'react'

import { Menu } from '@mui/icons-material'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'

import { logOutTC } from '../../features/auth/authReducer'
import { RootDispatch } from '../../store/store'
import s from '../styles/AppBarItem.module.css'

import logout from 'assets/logout.png'

type AppBarItemPropsType = {
  loginName: string
  isLoggedIn: boolean
}

const AppBarItem: FC<AppBarItemPropsType> = ({ isLoggedIn, loginName }) => {
  const dispatch = RootDispatch()

  const logOutHandler = () => {
    dispatch(logOutTC())
  }

  useEffect(() => {
    console.log(loginName)
  }, [isLoggedIn, loginName])

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
