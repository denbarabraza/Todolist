import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { RequestStatusType } from '../../app/appReducer';
import { RootDispatch } from '../../store/store';

import s from 'common/styles/InputItemForm.module.css';

type InputItemFormPropsType = {
  callback: (value: string) => void;
  entityStatus?: RequestStatusType;
  close?: () => void;
};

export const InputItemForm: React.FC<InputItemFormPropsType> = memo(
  ({ callback, close }) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState<null | string>(null);

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value);
      setError('');
    };
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onClickAddHandler();
      }
    };
    const onClickAddHandler = () => {
      if (value.trim() !== '') {
        callback(value.trim());
        setValue('');
      } else {
        setError('Enter your value');
      }
    };

    return (
      <div className={s.inputItemForm}>
        <TextField
          value={value}
          error={!!error}
          onChange={onChangeInputHandler}
          onKeyUp={onKeyUpHandler}
          id="outlined-basic"
          label="Title"
          variant="outlined"
          helperText={error}
          size="small"
        />
        <div className={s.buttonBlock}>
          <Button
            variant="outlined"
            onClick={close}
            color="inherit"
            size="small"
            style={{ margin: '5px 0' }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={onClickAddHandler}
            color="primary"
            size="small"
            style={{ margin: '5px 0' }}
          >
            Add
          </Button>
        </div>
        {/* <IconButton
        onClick={onClickAddHandler}
        color="primary"
        disabled={props.entityStatus === 'loading'}
      >
        <AddBox />
      </IconButton> */}
      </div>
    );
  },
);
