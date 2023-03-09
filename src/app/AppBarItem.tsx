import React from 'react';

import { Menu } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import { logOutTC } from '../features/auth/authReducer';
import { RootDispatch } from '../store/store';

const AppBarItem = () => {
  const dispatch = RootDispatch();

  const logOutHandler = () => {
    dispatch(logOutTC());
  };

  return (
    <AppBar position="static" style={{ position: 'relative' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Button
          color="inherit"
          onClick={logOutHandler}
          style={{ position: 'absolute', right: '17px' }}
        >
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarItem;
