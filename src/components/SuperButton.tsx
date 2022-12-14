import React from 'react';
import {FilterType} from "../Todolist";
import s from '../Todolist.module.css'

type SuperButtonPropsType = {
    title: string
    callback: () => void
    filter?: FilterType
}

export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        title,
        callback,
        filter
    }) => {

    const onClickHandler = () => {
        callback()
    }

    return (
        <button
            onClick={onClickHandler}
            className={filter === title ? s.active : ''}
        >
            {title}
        </button>
    );
};

