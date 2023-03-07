import * as React from 'react';

import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import { setErrorAppAC } from '../../app/appReducer';
import { RootDispatch, useAppSelector } from '../../store/store';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
  const errorApp = useAppSelector<string | null>(state => state.app.errorApp);
  const dispatch = RootDispatch();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setErrorAppAC(null));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={errorApp !== null} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errorApp}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
