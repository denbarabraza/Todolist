
type ButtonPropsType={
    name: string
    callBack: ()=>void
}

export const Button=(props:ButtonPropsType)=>{
    const onClickButtonHandler=()=>{
        return (
            props.callBack()
        )
    }
    return(
        <button onClick={onClickButtonHandler}>{props.name}</button>
    )
}