import React from "react";

type ButtonPropsType={
    name: string
    callBack: ()=>void
}

export const Button: React.FC<ButtonPropsType>=(props)=>{
    const onClickButtonHandler=()=>{
        return (
            props.callBack()
        )
    }
    return(
        <button onClick={onClickButtonHandler}>{props.name}</button>
    )
}