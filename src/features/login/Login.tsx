import React from 'react'

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { validate } from '../../common/utils/ValidateLogin'
import { RootDispatch, useAppSelector } from '../../store/store'
import { setLoggedInTC } from '../auth/authReducer'
import { Todolist } from '../todos/Todolist'

export const Login = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = RootDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
    onSubmit: values => {
      dispatch(setLoggedInTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <Grid
      container
      justifyContent="center"
      style={{ position: 'absolute', top: '100px', left: '0' }}
    >
      <Grid item justifyContent="center" alignItems="center">
        <Paper style={{ padding: '30px' }} elevation={3}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel>
                <p>
                  To log in get registered
                  <a href="https://social-network.samuraijs.com/" target="_blank" rel="noreferrer">
                    {' '}
                    here
                  </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
              </FormLabel>

              <FormGroup>
                <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: 'red' }}>{formik.errors.email}</div>
                ) : null}
                <TextField
                  type="password"
                  label="Password"
                  margin="normal"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: 'red' }}>{formik.errors.password}</div>
                ) : null}
                <FormControlLabel
                  label="Remember me"
                  control={<Checkbox />}
                  checked={formik.values.rememberMe}
                  {...formik.getFieldProps('rememberMe')}
                />
                <Button type="submit" variant="contained" color="primary">
                  Login
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Paper>
      </Grid>
    </Grid>
  )
}
