import React, { memo } from 'react';

import { FilterValueType } from '../../features/tasks/taskReducer';
// @ts-ignore
import s from '../styles/Styles.module.css';

type ButtonPropsType = {
  title: string;
  callback: () => void;
  filter?: FilterValueType;
};

export const Button: React.FC<ButtonPropsType> = memo(({ title, callback, filter }) => {
  const onClickHandler = () => {
    callback();
  };

  return (
    <button className={filter === title ? s.active : ''} onClick={onClickHandler}>
      {title}
    </button>
  );
});
