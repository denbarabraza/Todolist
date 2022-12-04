import React from 'react';
import {FilterType} from "../App";

type ButtonPropsType={
    title:string
    callback:()=>void
    className?:string
    filter?:FilterType
}

export const Button:React.FC<ButtonPropsType> = (
    {
        title,
        callback,
        className,
        filter
    }) => {

    const onClickButtonHandler=()=>{
        callback()
    }

    return (
        <button
            onClick={onClickButtonHandler}
            className={filter===title
                        ? className
                        :''
        }
        >
            {title}
        </button>
    );
};

