import React, { memo } from 'react'

import s from '../styles/Styles.module.css'

import { FilterValueType } from 'features/tasks/taskReducer'

type ButtonPropsType = {
  title: string
  callback: () => void
  filter?: FilterValueType
}

export const Button: React.FC<ButtonPropsType> = memo(({ title, callback, filter }) => {
  const onClickHandler = () => {
    callback()
  }

  return (
    <button className={filter === title ? s.active : ''} onClick={onClickHandler}>
      {title}
    </button>
  )
})
