import React from 'react'

import { CircularProgress } from '@mui/material'

import s from 'common/styles/Loader.module.css'

const Loader = () => {
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <CircularProgress variant="indeterminate" color="inherit" />
      </div>
    </div>
  )
}

export default Loader
