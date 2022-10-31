import React from "react";
import {FilteredType} from "../App";

type ButtonPropsType = {
    name: string
    callBack: () => void
    filter?: FilteredType
}

export const Button: React.FC<ButtonPropsType> = (props) => {
    const onClickButtonHandler = () => {
        return (
            props.callBack()
        )
    }
    return (
        <button
            onClick={onClickButtonHandler}
            className={props.name === props.filter ? 'active-filter' : ''}>
            {props.name}
        </button>
    )
}