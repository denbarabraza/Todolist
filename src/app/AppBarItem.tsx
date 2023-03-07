import React from 'react';

import { Menu } from '@mui/icons-material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { logOutTC } from '../features/auth/authReducer';
import { RootDispatch } from '../store/store';

const AppBarItem = () => {
  const dispatch = RootDispatch();

  const logOutHandler = () => {
    dispatch(logOutTC());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">News</Typography>
        <Button color="inherit" onClick={logOutHandler}>
          Log Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarItem;
